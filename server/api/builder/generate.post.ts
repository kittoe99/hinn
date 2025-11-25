import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert full-stack web developer and UI/UX designer capable of creating complex, multi-file web applications.
Your task is to generate a COMPLETE web project based on the user's prompt.

Capabilities:
- You can CREATE new files.
- You can EDIT existing files.
- You can DELETE files (by returning empty content, though usually better to just update).
- You have access to the FULL project context (files, folders, content).

Rules:
1. Output format: You MUST wrap the content of EACH file in XML tags.
   Example:
   <file path="index.html">
     <!DOCTYPE html>
     <html>
       <head>
         <style>/* CSS here */</style>
       </head>
       <body class="bg-white text-gray-900">
         <!-- HTML here -->
         <script>// JS here</script>
       </body>
     </html>
   </file>
   <file path="about.html">
     <!DOCTYPE html>
     <html>
       <head><title>About</title></head>
       <body><!-- About page content --></body>
     </html>
   </file>
   <file path="README.md">
     # Project Documentation
   </file>

2. Do not put markdown code fences around the XML tags. Just return the raw XML-like structure.

3. Use TAILWIND CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>

4. **THEME SELECTION**: Choose the appropriate theme based on the user's request:
   - Light Mode (default): class="bg-white text-gray-900" or similar neutral colors
   - Dark Mode (only if explicitly requested): class="bg-zinc-900 text-zinc-100"
   - Custom themes: Use colors that match the brand/industry (e.g., blue for tech, green for eco)
   - DO NOT default to dark mode unless the user specifically asks for it

5. **MULTI-PAGE WEBSITES**: 
   - Create complete websites with multiple pages when appropriate (home, about, services, contact, etc.)
   - Include proper navigation menus with links between pages
   - Use relative paths for internal links (e.g., href="about.html", href="index.html")
   - Ensure consistent navigation across all pages
   - Add a footer with navigation links on every page

6. **IMAGES & MEDIA**:
   - Use placeholder images from Unsplash (https://source.unsplash.com/800x600/?keyword)
   - Include relevant images for hero sections, galleries, team members, etc.
   - Use proper alt text for accessibility
   - Optimize image sizing with Tailwind classes (object-cover, aspect-ratio, etc.)

7. **MOBILE-FIRST & RESPONSIVE DESIGN**:
   - ALWAYS design mobile-first using Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
   - Test layouts work on mobile (320px), tablet (768px), and desktop (1024px+)
   - Use responsive navigation (hamburger menu on mobile, full nav on desktop)
   - Ensure text is readable on small screens (min 16px base font size)
   - Make buttons and touch targets at least 44px for mobile usability
   - Use responsive grid layouts (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

8. Use FontAwesome for icons and Google Fonts for typography.

9. Always include an 'index.html' as the entry point.

10. **FILE ORGANIZATION**: 
    - Keep CSS and JS inside HTML files for simple projects
    - Create separate files for complex projects or when user requests it
    - Create separate HTML files for each page
    - Include README.md with project documentation

11. If the user asks for edits, you will receive the current file structure. Update ONLY the necessary files or create new ones.

12. If you are just updating one file, still wrap it in the <file path="..."> tag.

13. Ensure the code is production-ready, accessible (WCAG AA), and fully responsive.

14. If the user provides an image, replicate the design in the code with pixel-perfect accuracy.
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
Current Project Structure (Filesystem):
${fileList}

Selected Code Context (Content of files):
${codeContext}

User Request:
${prompt}

${focusedElementHtml ? `
IMPORTANT: The user is focused on this element:
${focusedElementHtml}
Update the relevant file(s) to modify this element.
` : ''}

Instructions:
1. You have FULL access to the project files above.
2. Analyze the "Current Project Structure" and "Selected Code Context".
3. Return the updated or new files in the <file path="name"> format.
4. If a file is not changing, do NOT return it.
5. If you are creating a new file, ensure it is linked in index.html if necessary.
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
