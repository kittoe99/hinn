import { GoogleGenAI } from "@google/genai";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { prompt } = body;

    const config = useRuntimeConfig();
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        message: 'Gemini API key not configured'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const result = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    const summary = result.text || 'Generated files successfully!';

    return { summary };
  } catch (error: any) {
    console.error('Summary generation error:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to generate summary'
    });
  }
});
