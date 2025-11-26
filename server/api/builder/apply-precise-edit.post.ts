import { GoogleGenAI } from "@google/genai";
import { APPLY_PRECISE_EDIT_PROMPT } from "../../utils/builder-prompts";

export default defineEventHandler(async (event) => {
  console.log('✂️ Apply Precise Edit API called');
  
  try {
    const body = await readBody(event);
    const { projectId, filePath, instructions, fileContent } = body;

    if (!instructions || !filePath || !fileContent) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: instructions, filePath, or fileContent'
      });
    }

    const config = useRuntimeConfig();
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        message: 'Gemini API key not configured'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // STEP 1: Identify what to replace
    console.log('🔍 Step 1: Identifying what to replace...');
    
    const identifyPrompt = `
${APPLY_PRECISE_EDIT_PROMPT}

**CURRENT CODE (${filePath}):**
${fileContent}

**INSTRUCTIONS:**
${instructions}
`;

    const identifyResult = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: [{ text: identifyPrompt }] },
      config: {
        temperature: 0.1,
      }
    });

    const identification = (identifyResult.text || '').trim();
    console.log('📋 Identification result:', identification);

    // Parse OLD and NEW
    const oldMatch = identification.match(/OLD:\s*(.+?)(?=\nNEW:|$)/s);
    const newMatch = identification.match(/NEW:\s*(.+?)$/s);

    if (!oldMatch || !newMatch) {
      throw createError({
        statusCode: 500,
        message: 'Could not identify what to replace'
      });
    }

    const oldValue = oldMatch[1].trim();
    const newValue = newMatch[1].trim();

    console.log(`🎯 Will replace: "${oldValue}" → "${newValue}"`);

    // STEP 2: Perform the replacement
    console.log('✂️ Step 2: Performing replacement...');
    
    let modifiedContent = fileContent;
    let success = false;

    // Simple string replacement
    if (modifiedContent.includes(oldValue)) {
      // Replace ONLY the first occurrence to be safe, or all? precise usually implies specific location.
      // The prompt asks for "the exact text".
      modifiedContent = modifiedContent.replace(oldValue, newValue);
      success = true;
      console.log('✅ Replacement successful');
    } else {
      // Try with normalized whitespace
      // ... (Normalization logic could go here, simplifying for now to match robust logic from previous file if needed)
      // For now, let's try a simpler normalization approach or fallback to AI replacement if string match fails?
      // Let's stick to the string match first.
       throw createError({
          statusCode: 404,
          message: `Could not find the exact text to replace in ${filePath}`
        });
    }

    // Return the modified file
    return {
      success: true,
      projectId,
      filePath,
      content: modifiedContent,
      updated: true
    };

  } catch (error: any) {
    console.error('❌ Precise edit error:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Edit failed'
    });
  }
});
