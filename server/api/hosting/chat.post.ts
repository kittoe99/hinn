import OpenAI from 'openai'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { messages, generatedCode, selectedElement } = body
    
    const config = useRuntimeConfig()
    const apiKey = (config as any).openaiApiKey || process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      console.error('OpenAI API key not configured')
      throw createError({
        statusCode: 500,
        message: 'OpenAI API key is not configured'
      })
    }

    const openai = new OpenAI({ apiKey })
    
    // Build system message with context
    let systemMessage = `You are an expert web developer and code editor assistant. Your role is to make TARGETED, SURGICAL edits to existing code.

🎯 CRITICAL INSTRUCTIONS:

1. **READ THE EXISTING CODE FIRST**
   - Always analyze the current HTML structure provided
   - Understand what's already there before making changes
   - Identify the specific section that needs modification

2. **MAKE TARGETED EDITS ONLY**
   - DO NOT regenerate the entire file
   - DO NOT rewrite sections that don't need changes
   - Generate ONLY the specific code changes requested
   - Show exactly where the change should be applied

3. **RESPONSE FORMAT**
   When editing existing code, use this format:

   \`\`\`
   I'll help you [describe the change].

   **Location:** [Describe where in the HTML - e.g., "Inside the <header> tag", "After the hero section", "In the <style> block"]

   **Action:** [What to do - e.g., "Add", "Replace", "Insert after", "Modify"]

   **Code to add/change:**
   \`\`\`html
   [Only the specific code snippet to add or modify]
   \`\`\`

   **Explanation:** [Brief explanation of what this does]
   \`\`\`

4. **FOR NEW FILES ONLY**
   - Only generate complete HTML when explicitly asked to "create from scratch"
   - Include full structure with <!DOCTYPE html>, <head>, and <body>
   - Make it production-ready and self-contained

5. **EDITING EXAMPLES**

   ❌ WRONG (regenerating everything):
   \`\`\`html
   <!DOCTYPE html>
   <html>
   [entire 500 lines of code]
   </html>
   \`\`\`

   ✅ CORRECT (targeted edit):
   \`\`\`
   I'll add a contact form to your page.

   **Location:** After the features section, before the footer

   **Action:** Insert this code

   \`\`\`html
   <section class="contact">
     <h2>Contact Us</h2>
     <form>
       <input type="email" placeholder="Your email">
       <button type="submit">Send</button>
     </form>
   </section>
   \`\`\`

   **Explanation:** This adds a simple contact form with email input and submit button.
   \`\`\`

6. **STYLE CHANGES**
   - For CSS changes, show only the specific styles to add/modify
   - Indicate where in the <style> block to place them
   - Don't regenerate all existing styles

7. **JAVASCRIPT CHANGES**
   - For JS changes, show only the specific function or code to add
   - Indicate where in the <script> block to place it
   - Don't regenerate all existing scripts

8. **BE PRECISE**
   - Use clear location markers (line numbers, element selectors, or descriptive positions)
   - Make changes minimal and focused
   - Preserve existing code structure and formatting`

    if (generatedCode) {
      systemMessage += `\n\n📄 CURRENT FILE CONTENT:
File: ${generatedCode.fileName} (${generatedCode.type})

You have full access to the current file content below. Read it carefully before making any suggestions.

\`\`\`html
${generatedCode.content}
\`\`\`

IMPORTANT: 
- This is the COMPLETE current file content
- Analyze this code before suggesting changes
- Reference specific sections when making edits
- Do NOT regenerate sections that don't need changes
- Make targeted edits based on what's already there`
    }

    if (selectedElement) {
      systemMessage += `\n\n🎯 SELECTED ELEMENT CONTEXT:
Tag: <${selectedElement.tag}>
CSS Selector: ${selectedElement.selector}
HTML Content: ${selectedElement.html || 'N/A'}

When the user asks to modify, style, or edit something, they are referring to THIS specific element.
Provide targeted code changes for this element, including:
- CSS styles for this selector
- HTML modifications if needed
- JavaScript interactions if requested

Show the complete updated code with this element's changes integrated.`
    }

    // Prepare messages with system context
    const chatMessages = [
      { role: 'system', content: systemMessage },
      ...messages
    ]

    // Call OpenAI with GPT-5-Codex (fallback to gpt-4o if unavailable)
    let completion
    try {
      completion = await openai.chat.completions.create({
        model: 'gpt-5-codex',
        messages: chatMessages as any,
        temperature: 0.7,
        stream: false
      })
    } catch (modelError: any) {
      console.log('GPT-5-Codex not available, trying gpt-4o:', modelError.message)
      completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: chatMessages as any,
        temperature: 0.7,
        stream: false
      })
    }

    const response = completion.choices[0]?.message?.content || 'No response generated'
    
    // Log which model was used and response length
    console.log('AI Response:', {
      model: completion.model,
      responseLength: response.length,
      tokensUsed: completion.usage?.total_tokens
    })

    return {
      success: true,
      message: response,
      usage: completion.usage,
      model: completion.model
    }
  } catch (error: any) {
    console.error('Builder chat error:', {
      message: error.message,
      status: error.status,
      type: error.type,
      code: error.code,
      stack: error.stack
    })
    
    // Provide more specific error messages
    let errorMessage = 'Failed to process chat message'
    if (error.message?.includes('model')) {
      errorMessage = 'AI model error - the model may not be available. Please try again.'
    } else if (error.message?.includes('API key')) {
      errorMessage = 'API key error - please check configuration'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    throw createError({
      statusCode: error.status || error.statusCode || 500,
      message: errorMessage
    })
  }
})
