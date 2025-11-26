import { GoogleGenAI } from "@google/genai"
import { IntelligentRouter } from '../../lib/rag/intelligentRouter'

const TARGETED_EDIT_INSTRUCTION = `
You are a SURGICAL code editor. Your job is to make MINIMAL, PRECISE changes to existing code.

⚠️⚠️⚠️ MOST IMPORTANT RULE - READ THIS FIRST ⚠️⚠️⚠️

**NEVER KEEP BOTH OLD AND NEW VALUES**

When you change something, you MUST DELETE the old value.
- If old phone is "555-0000" and new is "555-1234" → DELETE "555-0000", only keep "555-1234"
- If old email is "old@email.com" and new is "new@email.com" → DELETE "old@email.com", only keep "new@email.com"
- REPLACE means: old disappears, new appears in its place
- You should NEVER have both values in the final output

🚨 **CRITICAL REPLACEMENT RULES** 🚨

**WHEN USER SAYS "CHANGE X TO Y":**
1. Find the EXISTING X in the code
2. DELETE X completely from the code
3. PUT Y in the exact same location where X was
4. Return the file with ONLY Y (X must be gone)

**EXAMPLES OF CORRECT REPLACEMENT:**

Example 1: "Change the phone number to 555-1234"
❌ WRONG:
<p>Call us: 555-0000</p>
<p>Call us: 555-1234</p>  ← Added new, kept old

✅ CORRECT:
<p>Call us: 555-1234</p>  ← Replaced old with new

Example 2: "Change the email to new@email.com"
❌ WRONG:
<a href="mailto:old@email.com">old@email.com</a>
<a href="mailto:new@email.com">new@email.com</a>  ← Duplicated

✅ CORRECT:
<a href="mailto:new@email.com">new@email.com</a>  ← Replaced

Example 3: "Change button text to 'Submit'"
❌ WRONG:
<button>Click Me</button>
<button>Submit</button>  ← Added new button

✅ CORRECT:
<button>Submit</button>  ← Replaced text only

Example 4: "Update the title to 'New Title'"
❌ WRONG:
<h1>Old Title</h1>
<h1>New Title</h1>  ← Duplicated heading

✅ CORRECT:
<h1>New Title</h1>  ← Replaced content

**WHEN USER SAYS "ADD X":**
- Then you can add new elements
- But if they say "CHANGE", "UPDATE", "REPLACE" → REPLACE, don't add!

**OUTPUT FORMAT:**
Return the COMPLETE file with your changes:
<file path="filename.html">
[COMPLETE FILE WITH REPLACEMENTS, NOT ADDITIONS]
</file>

**CRITICAL REMINDERS:**
- "Change X to Y" = REPLACE X with Y (remove old X)
- "Update X to Y" = REPLACE X with Y (remove old X)  
- "Replace X with Y" = REPLACE X with Y (remove old X)
- Do NOT keep both old and new values
- Do NOT duplicate elements
- REPLACE means DELETE old + INSERT new
`

const FULL_GENERATION_INSTRUCTION = `
You are an expert full-stack web developer creating a complete web project from scratch.

**YOUR TASK:**
Generate a complete, production-ready web application based on the user's requirements.

**OUTPUT FORMAT:**
<file path="index.html">
[Complete HTML file]
</file>
<file path="style.css">
[Complete CSS file]
</file>

Use Tailwind CSS via CDN, modern design, responsive layout, and best practices.
`

export default defineEventHandler(async (event) => {
  console.log('🧠 Smart generation API called')
  
  try {
    const body = await readBody(event)
    const { prompt, currentFiles, elementHtml, elementText, useSearch } = body

    if (!prompt) {
      throw createError({
        statusCode: 400,
        message: 'Missing prompt'
      })
    }

    const hasExistingFiles = currentFiles && Object.keys(currentFiles).length > 0
    const hasSelectedElement = !!elementHtml
    const fileCount = hasExistingFiles ? Object.keys(currentFiles).length : 0

    // STEP 1: Intelligent routing decision
    console.log('🎯 Analyzing request...')
    const decision = IntelligentRouter.analyzeRequest(
      prompt,
      hasExistingFiles,
      hasSelectedElement,
      fileCount
    )

    console.log(`📊 Decision: ${decision.mode} (confidence: ${(decision.confidence * 100).toFixed(0)}%)`)
    console.log(`💡 Reasoning: ${decision.reasoning}`)

    // STEP 2: Route to appropriate handler
    if (decision.mode === 'targeted_edit') {
      return await handleTargetedEdit(event, body, decision)
    } else {
      return await handleFullGeneration(event, body)
    }

  } catch (error: any) {
    console.error('❌ Smart generation error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Generation failed'
    })
  }
})

// Handle targeted editing
async function handleTargetedEdit(event: any, body: any, decision: any) {
  console.log('✂️ Performing targeted edit...')
  
  const { prompt, currentFiles, elementHtml, elementText } = body
  
  // Identify target files
  const targetFiles = IntelligentRouter.identifyTargetFiles(
    prompt,
    Object.keys(currentFiles)
  )
  
  console.log(`📁 Target files: ${targetFiles.join(', ')}`)
  
  // Build context with ONLY target files
  const fileList = targetFiles.map(f => `- ${f}`).join('\n')
  let codeContext = ''
  
  for (const file of targetFiles) {
    if (currentFiles[file]) {
      codeContext += `\n--- FILE: ${file} ---\n${currentFiles[file].content}\n--- END FILE ---\n`
    }
  }
  
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY
  
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'Gemini API key not configured'
    })
  }
  
  const ai = new GoogleGenAI({ apiKey })
  
  const editPrompt = `
**EXISTING CODE:**
${codeContext}

**USER REQUEST:**
${prompt}

${elementHtml ? `**SELECTED ELEMENT:**\n${elementHtml}\n` : ''}

**YOUR TASK - STEP BY STEP:**

Step 1: IDENTIFY what exists in the code
- Find the OLD value/element/text that needs to change
- Note its exact location

Step 2: DETERMINE the action
- If request says "change/update/replace" → REPLACE old with new
- If request says "add" → ADD new (keep old)
- If request says "remove/delete" → DELETE old

Step 3: EXECUTE the change
- For REPLACE: Remove old, insert new in same location
- For ADD: Insert new without touching old
- For DELETE: Remove old completely

Step 4: RETURN the complete file
- Include ALL original code
- With ONLY the requested change applied
- Do NOT duplicate elements
- Do NOT keep both old and new when replacing

**CRITICAL:** If the user says "change X to Y", you MUST:
1. Find X in the code
2. Delete X
3. Put Y in X's place
4. Return file with Y, not both X and Y

**FINAL CHECK BEFORE RETURNING:**
- Scan your output for duplicates
- If you see both old and new values, DELETE the old one
- Only the NEW value should exist in your output
`

  // Use extremely low temperature for precise replacements
  const result = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-exp',
    contents: { parts: [{ text: editPrompt }] },
    config: {
      systemInstruction: TARGETED_EDIT_INSTRUCTION,
      temperature: 0.1, // Very low for precise edits
      topP: 0.8,
      topK: 20,
    }
  })

  // Set up SSE headers
  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result) {
          const chunkText = chunk.text || ''
          
          const data = JSON.stringify({
            text: chunkText,
            mode: 'targeted_edit',
            targetFiles: targetFiles
          })
          
          controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
        }
        
        controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
        controller.close()
      } catch (error: any) {
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: error.message })}\n\n`))
        controller.close()
      }
    }
  })

  return stream
}

// Handle full generation
async function handleFullGeneration(event: any, body: any) {
  console.log('🏗️ Performing full generation...')
  
  const { prompt, currentFiles, useSearch } = body
  
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY
  
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'Gemini API key not configured'
    })
  }
  
  const ai = new GoogleGenAI({ apiKey })
  
  let fullPrompt = prompt
  
  // If there are existing files, mention them
  if (currentFiles && Object.keys(currentFiles).length > 0) {
    const fileList = Object.keys(currentFiles).join(', ')
    fullPrompt = `
User wants to rebuild/recreate the project.

Current files: ${fileList}

User request: ${prompt}

Create a complete new project based on this request.
`
  }
  
  const tools = useSearch ? [{ googleSearch: {} }] : undefined
  
  const result = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-exp',
    contents: { parts: [{ text: fullPrompt }] },
    config: {
      systemInstruction: FULL_GENERATION_INSTRUCTION,
      temperature: 0.7,
      tools: tools,
    }
  })

  // Set up SSE headers
  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result) {
          const chunkText = chunk.text || ''
          const sources = (chunk as any).groundingMetadata?.searchEntryPoint?.renderedContent || ''
          
          const data = JSON.stringify({
            text: chunkText,
            mode: 'full_generation',
            sources: sources ? [{ title: 'Search Results', url: sources }] : []
          })
          
          controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
        }
        
        controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
        controller.close()
      } catch (error: any) {
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: error.message })}\n\n`))
        controller.close()
      }
    }
  })

  return stream
}
