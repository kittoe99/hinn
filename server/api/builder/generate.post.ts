import OpenAI from 'openai'
import { defineEventHandler, readBody, createError, sendError, setResponseHeader } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ messages?: Array<{ role: string; content: any }> }>(event)
    const messages = body?.messages || []
    const config = useRuntimeConfig()
    const apiKey = (config as any).openaiApiKey || process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY')
    }

    const openai = new OpenAI({ apiKey })
    
    // Set headers for SSE streaming
    setResponseHeader(event, 'Content-Type', 'text/event-stream')
    setResponseHeader(event, 'Cache-Control', 'no-cache')
    setResponseHeader(event, 'Connection', 'keep-alive')

    const systemPrompt = `You are Gpt-5-codex, an advanced AI web builder engine.
Your goal is to generate production-ready, responsive, and beautiful websites based on user prompts.

RULES:
1. Output ONLY valid HTML code with embedded CSS (<style>) and JS (<script>).
2. Do NOT use markdown code blocks (no \`\`\`html).
3. Do NOT output explanations or text before/after the code.
4. The output must be a complete, standalone HTML document starting with <!DOCTYPE html>.
5. Use modern design principles (Tailwind CSS via CDN is allowed and recommended).
6. Use <script src="https://cdn.tailwindcss.com"></script> for styling if needed.
7. Make it look professional, clean, and modern.
`

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o', // Using the most advanced available model to simulate "Gpt-5-codex" capability
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ] as any,
      stream: true,
    })

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
