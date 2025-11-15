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
    let systemMessage = `You are an expert web developer and designer. Generate COMPLETE, FULL-LENGTH, PRODUCTION-READY websites.

⚠️ CRITICAL: DO NOT TRUNCATE OR SHORTEN YOUR RESPONSE. Generate the ENTIRE website code.

MANDATORY REQUIREMENTS:
1. COMPLETE HTML Structure:
   - Full <!DOCTYPE html> with all sections
   - <head> with meta tags, title, and FULL embedded CSS (150+ lines)
   - <body> with ALL sections: nav, hero, features, about, testimonials, contact, footer
   - Embedded CSS in <style> tags - NO external files
   - JavaScript in <script> tags if needed
   - MINIMUM 300 lines of code for landing pages

2. Design Excellence:
   - Modern, professional, beautiful design
   - Rich color schemes and gradients
   - Responsive (mobile, tablet, desktop)
   - CSS Grid and Flexbox layouts
   - Animations, transitions, hover effects
   - Icons using Unicode or SVG

3. Content Richness:
   - Hero section with headline, subheadline, CTA
   - Features section (3-6 feature cards)
   - About/Story section
   - Testimonials or social proof
   - Contact form with validation
   - Footer with multiple columns
   - Navigation menu
   - Realistic content (NO "Lorem ipsum")

4. Code Quality:
   - Wrap in: \`\`\`html
   - Self-contained (all CSS/JS inline)
   - Well-commented
   - Production-ready
   - Copy-paste functional

⚠️ GENERATE THE COMPLETE CODE. DO NOT STOP EARLY. DO NOT USE PLACEHOLDERS.`

    if (generatedCode) {
      systemMessage += `\n\nPreviously generated: ${generatedCode.fileName} (${generatedCode.type})
You can reference or modify this code.`
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

    // Call OpenAI with GPT-4o
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: chatMessages as any,
      temperature: 0.7,
      stream: false
    })

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
