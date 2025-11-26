import { GoogleGenAI } from "@google/genai";
import { AGENTIC_IMPROVE_PROJECT_PROMPT } from "../../utils/builder-prompts";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { projectId, goal, maxIterations = 10, files: initialFiles } = body;

    if (!goal) throw createError({ statusCode: 400, message: 'Goal is required' });

    const config = useRuntimeConfig();
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) throw createError({ statusCode: 500, message: 'Gemini API key not configured' });

    const ai = new GoogleGenAI({ apiKey });

    // Simulated file system (in-memory for the session)
    let currentFiles = { ...initialFiles }; // keys are paths, values are { content: string }

    const tools = [
      {
        functionDeclarations: [
          {
            name: 'read_file',
            description: 'Read content of a file',
            parameters: {
              type: 'object',
              properties: {
                file_path: { type: 'string' }
              },
              required: ['file_path']
            }
          },
          {
            name: 'list_files',
            description: 'List all files in the project',
            parameters: { type: 'object', properties: {} }
          },
          {
            name: 'update_file',
            description: 'Update/Overwrite a file with new content',
            parameters: {
              type: 'object',
              properties: {
                file_path: { type: 'string' },
                content: { type: 'string' }
              },
              required: ['file_path', 'content']
            }
          },
          {
            name: 'create_file',
            description: 'Create a new file',
            parameters: {
              type: 'object',
              properties: {
                file_path: { type: 'string' },
                content: { type: 'string' }
              },
              required: ['file_path', 'content']
            }
          },
          {
            name: 'delete_file',
            description: 'Delete a file',
            parameters: {
              type: 'object',
              properties: {
                file_path: { type: 'string' }
              },
              required: ['file_path']
            }
          }
        ]
      }
    ];

    let history = [
      { role: 'user', parts: [{ text: `Goal: ${goal}. Start working.` }] }
    ];

    setResponseHeaders(event, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let iteration = 0;
          
          while (iteration < maxIterations) {
            iteration++;
            
            // Send update: Thinking
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'status', message: `Iteration ${iteration}: Thinking...` })}\n\n`));

            const result = await ai.models.generateContent({
              model: 'gemini-3-pro-preview',
              contents: history,
              config: {
                systemInstruction: AGENTIC_IMPROVE_PROJECT_PROMPT,
                temperature: 0.3,
                tools: tools as any
              }
            });

            const response = result as any; // Cast to any to avoid strict typing issues if SDK mismatch
            const functionCalls = response.functionCalls;

            if (!functionCalls || functionCalls.length === 0) {
              // Agent is done
               const text = response.text ? response.text() : (response.candidates?.[0]?.content?.parts?.[0]?.text || '');
               controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'message', content: text })}\n\n`));
               controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
               break;
            }

            // Execute tools
            const functionResponses = [];
            
            for (const call of functionCalls) {
              const name = call.name;
              const args = call.args;
              let output: any = { success: true };

              controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'action', tool: name, args })}\n\n`));

              try {
                if (name === 'read_file') {
                  const file = currentFiles[args.file_path];
                  output = file ? { content: file.content } : { error: 'File not found' };
                } else if (name === 'list_files') {
                  output = { files: Object.keys(currentFiles) };
                } else if (name === 'update_file' || name === 'create_file') {
                  currentFiles[args.file_path] = { content: args.content };
                  output = { success: true };
                  // Send file update to client
                  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'file_update', path: args.file_path, content: args.content })}\n\n`));
                } else if (name === 'delete_file') {
                  delete currentFiles[args.file_path];
                  output = { success: true };
                  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'file_delete', path: args.file_path })}\n\n`));
                }
              } catch (e: any) {
                output = { error: e.message };
              }

              functionResponses.push({
                functionResponse: {
                  name: name,
                  response: output
                }
              });
            }

            // Add to history
            // Note: GoogleGenAI SDK history management can be tricky with function calls.
            // We need to add the model's function call message AND the function response message.
            
            // 1. Add Model's Function Call (from candidate)
            // We need to reconstruct it or use the one from response?
            // response.candidates[0].content is the Content object.
            history.push(response.candidates![0].content);

            // 2. Add Function Response
            history.push({ 
              role: 'user', // 'function' role is usually treated as 'user' or specific 'function' role depending on SDK version. 
                            // In Google GenAI, it's often 'function' role for responses, but let's check types.
                            // Actually, for 'functionResponse', the role should be 'function' (or 'tool' in some APIs).
                            // Let's try 'function' as role.
              parts: functionResponses as any 
            }); 
            
            // If we are too deep, maybe stop? User defined maxIterations.
          }

          if (iteration >= maxIterations) {
             controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'message', content: 'Max iterations reached.' })}\n\n`));
             controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          }
          
          controller.close();
        } catch (error: any) {
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: error.message })}\n\n`));
          controller.close();
        }
      }
    });

    return stream;

  } catch (error: any) {
    console.error('Agentic Improve Project Error:', error);
    throw createError({ statusCode: 500, message: error.message });
  }
});
