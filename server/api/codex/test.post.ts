import OpenAI from 'openai'
import { defineEventHandler, readBody, createError, sendError, setResponseHeader } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ messages?: Array<{ role: string; content: string }> }>(event)
    const messages = body?.messages || [{ role: 'user', content: 'Say hello' }]
    const config = useRuntimeConfig()
    const apiKey = (config as any).openaiApiKey || process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY. Add it to your .env and restart the server.')
    }

    const openai = new OpenAI({ apiKey })
    
    // Set headers for SSE streaming
    setResponseHeader(event, 'Content-Type', 'text/event-stream')
    setResponseHeader(event, 'Cache-Control', 'no-cache')
    setResponseHeader(event, 'Connection', 'keep-alive')

    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      stream: true,
    })

    // Stream the response
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              const data = `data: ${JSON.stringify({ content })}\n\n`
              controller.enqueue(encoder.encode(data))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (e: any) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: e.message })}\n\n`))
          controller.close()
        }
      },
    })

    return readable
  } catch (e: any) {
    return sendError(event, createError({ statusCode: 500, statusMessage: e?.message || String(e) }))
  }
})
