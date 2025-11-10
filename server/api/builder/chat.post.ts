import OpenAI from 'openai'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { messages, loadedFile, selectedElement } = body
    
    const config = useRuntimeConfig()
    const apiKey = (config as any).openaiApiKey || process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      throw createError({
        statusCode: 500,
        message: 'OpenAI API key is not configured'
      })
    }

    const openai = new OpenAI({ apiKey })
    
    // Build system message with context
    let systemMessage = `You are an expert web developer and designer. You help users build and edit websites.

You have access to:
- HTML, CSS, JavaScript, React, Next.js, Vue.js, and modern web technologies
- GitHub repositories for reading and writing files
- Live preview with element selection

When editing code:
1. Provide complete, working code
2. Maintain existing structure and styling
3. Follow best practices and modern standards
4. Be concise but thorough in explanations`

    if (loadedFile) {
      systemMessage += `\n\nCurrently loaded file: ${loadedFile.path} (${(loadedFile.size / 1024).toFixed(1)} KB)
You can reference and edit this file.`
    }

    if (selectedElement) {
      systemMessage += `\n\nSelected element: <${selectedElement.tag}>
Selector: ${selectedElement.selector}
You can provide specific edits for this element.`
    }

    // Prepare messages with system context
    const chatMessages = [
      { role: 'system', content: systemMessage },
      ...messages
    ]

    // Call OpenAI with GPT-4 (or gpt-4-turbo for better performance)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview', // Use gpt-4-turbo or gpt-4 (GPT-5 not yet available, use latest GPT-4)
      messages: chatMessages as any,
      temperature: 0.7,
      max_tokens: 2000,
      stream: false
    })

    const response = completion.choices[0]?.message?.content || 'No response generated'

    return {
      success: true,
      message: response,
      usage: completion.usage
    }
  } catch (error: any) {
    console.error('Builder chat error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to process chat message'
    })
  }
})
