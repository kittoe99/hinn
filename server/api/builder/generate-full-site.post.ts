import { GoogleGenAI } from "@google/genai";
import { GENERATE_FULL_SITE_PROMPT } from "../../utils/builder-prompts";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { projectId, prompt, useSearch } = body;

    if (!prompt) {
      throw createError({ statusCode: 400, message: 'Prompt is required' });
    }

    const config = useRuntimeConfig();
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw createError({ statusCode: 500, message: 'Gemini API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const tools = useSearch ? [{ googleSearch: {} }] : undefined;

    const result = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: { parts: [{ text: `Create a new web project. User Request: ${prompt}` }] },
      config: {
        systemInstruction: GENERATE_FULL_SITE_PROMPT,
        temperature: 0.7,
        tools: tools,
      }
    });

    setResponseHeaders(event, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result) {
            const chunkText = chunk.text || '';
            const sources = (chunk as any).groundingMetadata?.searchEntryPoint?.renderedContent || '';
            
            const data = JSON.stringify({
              text: chunkText,
              sources: sources ? [{ title: 'Search Results', url: sources }] : []
            });
            
            controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
          }
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error: any) {
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: error.message })}\n\n`));
          controller.close();
        }
      }
    });

    return stream;

  } catch (error: any) {
    console.error('Generate Full Site Error:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to generate site'
    });
  }
});
