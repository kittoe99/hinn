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
Your goal is to generate COMPLETE, production-ready, responsive, and beautiful websites based on user prompts.

CRITICAL REQUIREMENTS:
1. Generate FULL, COMPLETE websites with ALL necessary sections (header, hero, features, about, services, testimonials, pricing, contact, footer, etc.)
2. DO NOT generate partial or shortened websites - create comprehensive, multi-section pages
3. Include rich content, realistic text, and multiple content blocks for each section
4. Output ONLY valid HTML code with embedded CSS (<style>) and JS (<script>) - NO markdown code blocks
5. The output must be a complete, standalone HTML document starting with <!DOCTYPE html>
6. Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
7. Make it look professional, modern, and visually stunning with proper spacing, colors, and typography
8. Add interactive elements, animations, and smooth transitions where appropriate
9. Ensure mobile responsiveness and cross-browser compatibility
10. Generate AT LEAST 5-10 major sections for a complete website experience

DO NOT STOP EARLY - Generate the ENTIRE website with all sections fully implemented.
`

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o', // Using the most advanced available model to simulate "Gpt-5-codex" capability
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ] as any,
      stream: true,
      max_tokens: 16384, // Maximum tokens for gpt-4o to allow full website generation
      temperature: 0.7, // Balanced creativity and coherence
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
