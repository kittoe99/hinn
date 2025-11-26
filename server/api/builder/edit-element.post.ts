import { CodeAnalyzer } from '../../lib/rag/codeAnalyzer'
import { CodeInjector } from '../../lib/rag/codeInjector'
import { GoogleGenAI } from "@google/genai"

const ELEMENT_EDIT_INSTRUCTION = `
You are a precise code editor. Your ONLY job is to generate the EXACT replacement code for a specific HTML element.

CRITICAL RULES:
1. Generate ONLY the replacement HTML for the selected element
2. Do NOT include any explanation, commentary, or markdown
3. Do NOT wrap the code in backticks or code fences
4. Do NOT include any text before or after the HTML
5. Preserve the element's structure unless specifically asked to change it
6. Keep the same indentation level (we'll handle indentation automatically)

OUTPUT FORMAT:
Just return the raw HTML element, nothing else.

EXAMPLES:

User: "Make this button blue"
Element: <button class="bg-red-500 px-4 py-2">Click me</button>
Output: <button class="bg-blue-500 px-4 py-2">Click me</button>

User: "Add a shadow to this card"
Element: <div class="bg-white rounded-lg p-6">Content</div>
Output: <div class="bg-white rounded-lg p-6 shadow-lg">Content</div>

User: "Change the text to 'Learn More'"
Element: <a href="#" class="text-blue-500">Read More</a>
Output: <a href="#" class="text-blue-500">Learn More</a>
`

export default defineEventHandler(async (event) => {
  console.log('🔧 Edit element API called')
  
  try {
    const body = await readBody(event)
    console.log('📦 Request body received:', {
      hasFiles: !!body.currentFiles,
      hasElement: !!body.elementHtml,
      hasRequest: !!body.userRequest
    })
    
    const { 
      currentFiles, 
      elementHtml, 
      elementText, 
      userRequest 
    } = body

    if (!currentFiles || !elementHtml || !userRequest) {
      console.error('❌ Missing required fields')
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: currentFiles, elementHtml, userRequest'
      })
    }

    // Step 1: Use RAG to find the exact location of the element
    console.log('🔍 Analyzing code to find element location...')
    const matches = CodeAnalyzer.findElementLocation(
      currentFiles,
      elementHtml,
      elementText
    )

    if (matches.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Could not locate the element in the codebase'
      })
    }

    // Use the best match (highest confidence)
    const bestMatch = matches[0]
    console.log(`✅ Found element in ${bestMatch.location.file} at line ${bestMatch.location.startLine}`)
    console.log(`   Confidence: ${(bestMatch.confidence * 100).toFixed(0)}%`)
    console.log(`   Matched by: ${bestMatch.matchedBy}`)

    // Step 2: Generate the replacement code using AI
    console.log('🤖 Generating replacement code...')
    const config = useRuntimeConfig()
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        message: 'Gemini API key not configured'
      })
    }

    const ai = new GoogleGenAI({ apiKey })

    const prompt = `
Current Element:
${bestMatch.location.content}

User Request:
${userRequest}

Context (surrounding code):
${bestMatch.location.context}

Generate the replacement HTML for this element based on the user's request.
Remember: Output ONLY the raw HTML, no explanations, no markdown, no code fences.
`

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: { parts: [{ text: prompt }] },
      config: {
        systemInstruction: ELEMENT_EDIT_INSTRUCTION,
        temperature: 0.3, // Lower temperature for more precise edits
      }
    })

    const generatedCode = (result.text || '').trim()
    
    if (!generatedCode) {
      throw createError({
        statusCode: 500,
        message: 'AI failed to generate replacement code'
      })
    }
    
    console.log('✅ Generated replacement code')

    // Step 3: Inject the new code at the exact location
    console.log('💉 Injecting code at precise location...')
    const fileContent = currentFiles[bestMatch.location.file].content
    
    const injectionResult = CodeInjector.replaceElement(
      fileContent,
      bestMatch.location,
      generatedCode
    )

    if (!injectionResult.success) {
      throw createError({
        statusCode: 500,
        message: `Code injection failed: ${injectionResult.error}`
      })
    }

    // Validate the injection
    if (!CodeInjector.validate(injectionResult)) {
      console.warn('⚠️ Injection validation warning - HTML structure may be affected')
    }

    console.log(`✅ Successfully injected code at lines ${injectionResult.linesChanged.join(', ')}`)

    // Return the updated file
    return {
      success: true,
      file: bestMatch.location.file,
      content: injectionResult.modifiedContent,
      location: {
        startLine: bestMatch.location.startLine,
        endLine: bestMatch.location.endLine,
        linesChanged: injectionResult.linesChanged
      },
      match: {
        confidence: bestMatch.confidence,
        matchedBy: bestMatch.matchedBy
      },
      generatedCode
    }

  } catch (error: any) {
    console.error('❌ Element edit error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to edit element'
    })
  }
})
