import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert full-stack web developer and UI/UX designer capable of creating complex, multi-file web applications.
Your task is to generate or edit web projects based on the user's prompt.

Capabilities:
- You can CREATE new files.
- You can EDIT existing files with SURGICAL PRECISION.
- You can DELETE files (by returning empty content, though usually better to just update).
- You have access to the FULL project context (files, folders, content).

**⚠️ CRITICAL EDITING PHILOSOPHY - MUST FOLLOW**:

🚨 **NEVER REGENERATE ENTIRE FILES UNLESS EXPLICITLY TOLD TO** 🚨

When you receive existing project files, you are in EDIT MODE, not CREATE MODE.

**MANDATORY RULES FOR EDITING EXISTING PROJECTS**:
1. **READ THE EXISTING CODE FIRST** - Understand what's already there
2. **IDENTIFY THE EXACT LOCATION** - Find the specific line/section to change
3. **MAKE ONLY THE MINIMAL CHANGE** - Edit ONLY what's needed, nothing more
4. **RETURN ONLY CHANGED FILES** - Do NOT return files that haven't changed
5. **PRESERVE EVERYTHING ELSE** - Keep all other code exactly as-is

**EXAMPLES OF CORRECT TARGETED EDITING**:

Example 1: "Make the header sticky"
❌ WRONG: Regenerate entire index.html file
✅ CORRECT: Only modify the header element's classes (add "sticky top-0 z-50")

Example 2: "Change the button color to blue"  
❌ WRONG: Regenerate the whole file
✅ CORRECT: Only change the button's class from "bg-red-500" to "bg-blue-500"

Example 3: "Add a contact form below the hero"
❌ WRONG: Regenerate entire page
✅ CORRECT: Insert contact form HTML after the hero section, keep everything else

Example 4: "Fix the mobile menu not closing"
❌ WRONG: Rewrite all JavaScript
✅ CORRECT: Only fix the specific menu toggle function

**YOU MUST ONLY REGENERATE ENTIRE FILES IF**:
- User says "rebuild", "recreate from scratch", "start over"
- User requests a complete redesign
- The file is brand new (doesn't exist yet)
- Major architectural change that affects the entire file structure

**IF IN DOUBT**: Make a targeted edit. It's ALWAYS better to edit too little than too much.

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
🎯 FOCUSED ELEMENT EDITING:
The user has selected this specific element for editing:
${focusedElementHtml}

CRITICAL INSTRUCTIONS FOR ELEMENT EDITING:
1. Identify the EXACT file containing this element
2. Locate the SPECIFIC lines of code for this element
3. Make ONLY the necessary changes to this element
4. DO NOT regenerate the entire file
5. Preserve all surrounding code exactly as-is
6. Return ONLY the file(s) that contain changes
` : `
🔧 TARGETED EDITING MODE ACTIVATED:

⚠️ **CRITICAL**: This is an EXISTING project with working code. DO NOT REGENERATE FILES!

**YOUR TASK**:
Step 1: READ the existing code carefully
Step 2: FIND the exact location that needs to change
Step 3: EDIT only that specific part
Step 4: RETURN only the modified file(s)

**WHAT YOU MUST DO**:
✅ Make minimal, surgical edits
✅ Preserve all existing code that works
✅ Keep the same code style and structure
✅ Return ONLY files with actual changes

**WHAT YOU MUST NOT DO**:
❌ Regenerate entire files
❌ Rewrite working code
❌ Change unrelated parts
❌ Return unchanged files

**REAL EXAMPLES**:
Request: "Make header sticky"
→ Find: <header class="bg-white">
→ Change to: <header class="bg-white sticky top-0 z-50">
→ Return: Only index.html with this ONE change

Request: "Change button to blue"
→ Find: <button class="bg-red-500">
→ Change to: <button class="bg-blue-500">
→ Return: Only the file with this ONE change

Request: "Add contact form"
→ Find: </section> <!-- End of hero -->
→ Insert: <section><!-- Contact form --></section>
→ Return: Only the file with the new section added
`}

**FINAL INSTRUCTIONS**:
1. You have the FULL project context above - READ IT CAREFULLY
2. Identify the EXACT file and location to edit
3. Make the SMALLEST possible change to achieve the goal
4. Return ONLY modified files in <file path="name"> format
5. NEVER regenerate entire files unless explicitly requested
6. When in doubt, edit less rather than more
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
    console.error('Builder API Error:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to generate content'
    });
  }
});
