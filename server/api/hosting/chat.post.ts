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
    let systemMessage = `You are an expert web developer and code assistant. You can both generate complete websites and make targeted edits.

🎯 CRITICAL INSTRUCTIONS:

**WHEN TO GENERATE COMPLETE CODE:**
- User asks to "create", "generate", "build" a new page/website from scratch
- No existing code is provided in the context
- User wants a complete landing page, portfolio, etc.
- Generate FULL, PRODUCTION-READY HTML with embedded CSS and JS

**WHEN TO MAKE TARGETED EDITS:**
- Existing code IS provided in the context below
- User asks to "add", "change", "modify", "update" something specific
- Generate the COMPLETE UPDATED FILE with the changes applied
- Wrap the entire updated HTML in a code block so it can be auto-applied

1. **READ THE EXISTING CODE FIRST** (if provided)
   - Always analyze the current HTML structure
   - Understand what's already there before making changes
   - Identify the specific section that needs modification

2. **FOR TARGETED EDITS - RETURN COMPLETE UPDATED FILE**
   - Make the requested changes to the existing code
   - Return the ENTIRE updated HTML file with changes applied
   - Preserve all existing code that doesn't need changes
   - Wrap the complete updated file in a code block

3. **RESPONSE FORMAT FOR EDITS**
   When editing existing code, use this format:

   I'll help you [describe the change]. I've [describe what was changed].

   Here's the updated HTML with your changes:

   \`\`\`html
   <!DOCTYPE html>
   <html>
   [COMPLETE UPDATED HTML FILE WITH CHANGES APPLIED]
   </html>
   \`\`\`

   **Changes made:**
   - [List the specific changes]
   - [What was added/modified]
   - [Where it was placed]

   IMPORTANT: 
   - Return the COMPLETE file, not just a snippet
   - Apply the changes directly to the existing code
   - Preserve all formatting and structure
   - The user should be able to deploy this immediately

4. **FOR COMPLETE NEW FILES**
   - Generate full HTML when user asks to "create", "generate", or "build" from scratch
   - Include full structure: <!DOCTYPE html>, <head> with meta tags and embedded CSS, <body> with all sections
   - Make it production-ready, responsive, and self-contained
   - Minimum 200-300 lines for landing pages
   - Include: navigation, hero, features, about, contact, footer sections
   - Embed all CSS in <style> tags and JS in <script> tags
   - Use modern design with animations and hover effects

5. **EDITING EXAMPLES**

   ✅ CORRECT (editing existing file):
   I'll help you add a contact form to your page. I've added it after the features section.

   Here's the updated HTML with your changes:

   \`\`\`html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     [... existing head content preserved ...]
   </head>
   <body>
     [... existing nav and hero preserved ...]
     
     <section class="features">
       [... existing features content preserved ...]
     </section>
     
     <!-- NEW: Contact form added here -->
     <section class="contact" style="padding: 4rem 2rem; background: #f9f9f9;">
       <div style="max-width: 600px; margin: 0 auto;">
         <h2 style="text-align: center; margin-bottom: 2rem;">Contact Us</h2>
         <form>
           <input type="email" placeholder="Your email" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;">
           <button type="submit" style="width: 100%; padding: 0.75rem; background: #d97759; color: white; border: none; border-radius: 4px;">Send</button>
         </form>
       </div>
     </section>
     
     [... existing footer preserved ...]
   </body>
   </html>
   \`\`\`

   **Changes made:**
   - Added contact form section after features
   - Included email input and submit button
   - Styled with inline CSS for immediate use

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
