import { Codex } from '@openai/codex-sdk'
import { defineEventHandler, readBody, createError, sendError, setResponseHeader } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ 
      messages?: Array<{ role: string; content: string }>,
      repo_url?: string,
      branch?: string
    }>(event)
    
    const messages = body?.messages || []
    const repo_url = body?.repo_url
    const branch = body?.branch
    
    // Set headers for SSE streaming
    setResponseHeader(event, 'Content-Type', 'text/event-stream')
    setResponseHeader(event, 'Cache-Control', 'no-cache')
    setResponseHeader(event, 'Connection', 'keep-alive')

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Build prompt with context
          const lastUserMessage = messages.findLast(m => m.role === 'user')
          if (!lastUserMessage) {
            throw new Error('No user message found')
          }

          let prompt = lastUserMessage.content
          if (repo_url) {
            prompt = `Repository: ${repo_url}\nBranch: ${branch || 'main'}\n\nTask: ${prompt}`
          }

          // Use Codex SDK
          const codex = new Codex()
          const thread = codex.startThread({
            skipGitRepoCheck: true,
          })
          
          // Get streaming response
          const { events } = await thread.runStreamed(prompt)
          
          for await (const event of events) {
            if (event.type === 'item.completed' && event.item) {
              const item = event.item as any
              if (item.content) {
                for (const content of item.content) {
                  if (content.type === 'text' && content.text) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: content.text })}\n\n`))
                  }
                }
              }
            }
          }
          
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (e: any) {
          const errorMsg = e?.message || String(e)
          let helpText = ''
          
          if (errorMsg.includes('3221225781') || errorMsg.includes('binary') || errorMsg.includes('codex')) {
            helpText = '\n\n⚠️ Codex Agent requires Windows dependencies:\n\n'
            helpText += '1. Install Visual C++ Redistributable:\n'
            helpText += '   https://aka.ms/vs/17/release/vc_redist.x64.exe\n\n'
            helpText += '2. Restart your terminal/IDE\n\n'
            helpText += '3. Try again\n\n'
            helpText += 'Or use GPT-4 Chat mode (toggle off "Use Codex Agent")'
          }
          
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: errorMsg + helpText })}\n\n`))
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        }
      },
    })

    return readable
  } catch (e: any) {
    return sendError(event, createError({ statusCode: 500, statusMessage: e?.message || String(e) }))
  }
})
