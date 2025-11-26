import { GoogleGenAI } from "@google/genai";
import { EDIT_ELEMENT_HTML_PROMPT } from "../../utils/builder-prompts";

export default defineEventHandler(async (event) => {
  console.log('🔧 Edit Element HTML API called');
  
  try {
    const body = await readBody(event);
    const { projectId, selector, instructions, fileContent } = body;

    if (!instructions || !fileContent || !selector) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: instructions, fileContent, or selector'
      });
    }

    const config = useRuntimeConfig();
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw createError({ statusCode: 500, message: 'Gemini API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Step 1: Find the element and its context using AI (since we don't have a DOM parser)
    const findPrompt = `
You are an expert HTML parser.
Target File Content:
${fileContent}

Target Selector: "${selector}"

Your Task:
1. Find the HTML element that matches the CSS selector "${selector}".
2. Extract the COMPLETE HTML of that element (opening tag, content, closing tag).
3. Extract 3 lines of context before and after.

Output Format:
ELEMENT: [The complete HTML element]
CONTEXT_BEFORE: [3 lines before]
CONTEXT_AFTER: [3 lines after]

If multiple elements match, pick the first one. If no element matches, return "NOT_FOUND".
`;

    const findResult = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: [{ text: findPrompt }] },
      config: { temperature: 0.1 }
    });

    const findText = findResult.text || '';
    if (findText.includes('NOT_FOUND')) {
      throw createError({ statusCode: 404, message: `Element matching selector "${selector}" not found` });
    }

    const elementMatch = findText.match(/ELEMENT:\s*([\s\S]*?)(?=\nCONTEXT_BEFORE:|$)/);
    const elementHtml = elementMatch ? elementMatch[1].trim() : '';

    if (!elementHtml) {
       // Fallback if parsing failed
       throw createError({ statusCode: 404, message: `Could not extract HTML for selector "${selector}"` });
    }

    console.log(`✅ Found element for selector "${selector}"`);

    // Step 2: Generate replacement
    const editPrompt = `
${EDIT_ELEMENT_HTML_PROMPT}

Current Element:
${elementHtml}

User Instructions:
${instructions}
`;

    const editResult = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: [{ text: editPrompt }] },
      config: { temperature: 0.3 }
    });

    const newHtml = (editResult.text || '').trim();

    return {
      success: true,
      projectId,
      selector,
      before: elementHtml,
      after: newHtml
    };

  } catch (error: any) {
    console.error('Edit Element HTML Error:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to edit element'
    });
  }
});
