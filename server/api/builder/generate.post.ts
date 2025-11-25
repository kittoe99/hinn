import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert full-stack web developer and UI/UX designer capable of creating complex, multi-file web applications.
Your task is to generate a COMPLETE web project based on the user's prompt.

Rules:
1. Output format: You MUST wrap the content of EACH file in XML tags.
   Example:
   <file path="index.html">
     <!DOCTYPE html>
     <html>
       <head>
         <style>/* CSS here */</style>
       </head>
       <body class="bg-zinc-900 text-white">
         <!-- HTML here -->
         <script>// JS here</script>
       </body>
     </html>
   </file>
   <file path="README.md">
     # Project Documentation
   </file>

2. Do not put markdown code fences around the XML tags. Just return the raw XML-like structure.
3. Use TAILWIND CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
4. **CRITICAL**: You MUST add a background color class to the <body> tag. 
   - For Dark Mode (default): class="bg-zinc-900 text-zinc-100" or similar.
   - For Light Mode: class="bg-white text-zinc-900".
   - DO NOT leave the body background transparent.
5. Use FontAwesome and Google Fonts.
6. Always include an 'index.html' as the entry point.
7. **COMBINATION PREFERENCE**: Prefer keeping CSS and JS inside the HTML files (using <style> and <script>) for simpler projects. Only create separate files if the project is complex or the user asks for it.
8. Create separate files for:
   - Additional HTML pages
   - Documentation (README.md)
   - Configuration (package.json)
9. If the user asks for edits, you will receive the current file structure. Update ONLY the necessary files or create new ones.
10. If you are just updating one file, still wrap it in the <file path="..."> tag.
11. Ensure the code is production-ready, accessible, and responsive.
12. If the user provides an image, replicate the design in the code.
`;

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { prompt, currentFiles, imageBase64, focusedElementHtml, useSearch } = body;

    const config = useRuntimeConfig();
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        message: 'Gemini API key not configured'
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    let contents: any = [];

    // Handle Image
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
      contents.push({
        inlineData: {
          mimeType: 'image/png',
          data: cleanBase64
        }
      });
    }

    // Context Construction
    const fileList = Object.keys(currentFiles || {}).map((path: string) => `- ${path}`).join('\n');
    
    let codeContext = '';
    const MAX_CONTEXT_CHARS = 50000;
    
    for (const [path, file] of Object.entries(currentFiles || {})) {
      const fileData = file as any;
      if (fileData.type === 'file' && codeContext.length < MAX_CONTEXT_CHARS) {
        codeContext += `\n--- START OF FILE ${path} ---\n${fileData.content}\n--- END OF FILE ${path} ---\n`;
      }
    }

    let textPrompt = prompt;

    if (Object.keys(currentFiles || {}).length > 0 && !imageBase64) {
      textPrompt = `
Current Project Structure:
${fileList}

Selected Code Context:
${codeContext}

User Request:
${prompt}

${focusedElementHtml ? `
IMPORTANT: The user is focused on this element:
${focusedElementHtml}
Update the relevant file(s) to modify this element.
` : ''}

Instructions:
1. Return the updated or new files in the <file path="name"> format.
2. If a file is not changing, do NOT return it.
3. If you are creating a new file, ensure it is linked in index.html if necessary.
`;
    } else if (imageBase64) {
      textPrompt = `
User Request: ${prompt}

Instructions:
1. Analyze the image and build a multi-file project (html, css, js) to replicate it.
2. Use <file path="..."> tags.
${Object.keys(currentFiles || {}).length > 0 ? `Merge into existing project:\n${fileList}` : ''}
`;
    }

    contents.push({ text: textPrompt });

    const tools = useSearch ? [{ googleSearch: {} }] : undefined;

    const result = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash-exp',
      contents: { parts: contents },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: tools,
      }
    });

    // Set up SSE headers
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
            const sources = chunk.groundingMetadata?.searchEntryPoint?.renderedContent || '';
            
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
    console.error('Builder API Error:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to generate content'
    });
  }
});
