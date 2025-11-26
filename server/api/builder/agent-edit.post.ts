import { GoogleGenAI } from "@google/genai"

const AGENT_SYSTEM_INSTRUCTION = `
You are an expert code editing agent with the ability to read, analyze, and modify code files.

You have access to the following tools:

1. **read_file** - Read the content of a specific file
   Parameters: { file_path: string }
   Returns: { content: string, lines: string[] }

2. **find_element** - Find a specific HTML element in the code
   Parameters: { element_html: string, element_text?: string }
   Returns: { file: string, start_line: number, end_line: number, content: string }

3. **inject_code** - Inject code at a specific location
   Parameters: { file: string, start_line: number, end_line: number, new_code: string }
   Returns: { success: boolean, modified_content: string }

**YOUR WORKFLOW:**
1. Use read_file to understand the codebase structure
2. Use find_element to locate the exact element the user wants to edit
3. Analyze the code and determine the minimal change needed
4. Use inject_code to make the surgical edit
5. Return the result to the user

**CRITICAL RULES:**
- Always read the file first before making changes
- Make MINIMAL, TARGETED edits only
- Preserve all existing code that doesn't need to change
- Maintain proper indentation and formatting
- Only edit what's necessary to fulfill the user's request

When the user asks to edit something, follow this process:
1. Read the relevant files
2. Find the element
3. Determine the exact change
4. Inject the new code
5. Confirm success
`

interface ToolCall {
  name: string
  parameters: any
}

interface AgentContext {
  files: Record<string, { content: string }>
  elementHtml?: string
  elementText?: string
}

export default defineEventHandler(async (event) => {
  console.log('🤖 Agent-based editing API called')
  
  try {
    const body = await readBody(event)
    const { currentFiles, elementHtml, elementText, userRequest } = body

    if (!currentFiles || !userRequest) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields'
      })
    }

    const context: AgentContext = {
      files: currentFiles,
      elementHtml,
      elementText
    }

    // Initialize AI agent
    const config = useRuntimeConfig()
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        message: 'Gemini API key not configured'
      })
    }

    const ai = new GoogleGenAI({ apiKey })

    // Define tools for the agent
    const tools: any = [{
      functionDeclarations: [
        {
          name: 'read_file',
          description: 'Read the content of a specific file from the project',
          parameters: {
            type: 'object',
            properties: {
              file_path: {
                type: 'string',
                description: 'The path of the file to read (e.g., "index.html")'
              }
            },
            required: ['file_path']
          }
        },
        {
          name: 'find_element',
          description: 'Find a specific HTML element in the codebase and return its exact location',
          parameters: {
            type: 'object',
            properties: {
              element_html: {
                type: 'string',
                description: 'The HTML of the element to find'
              },
              element_text: {
                type: 'string',
                description: 'Optional text content of the element'
              }
            },
            required: ['element_html']
          }
        },
        {
          name: 'inject_code',
          description: 'Inject or replace code at a specific location in a file',
          parameters: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                description: 'The file path'
              },
              start_line: {
                type: 'number',
                description: 'Starting line number (0-indexed)'
              },
              end_line: {
                type: 'number',
                description: 'Ending line number (0-indexed)'
              },
              new_code: {
                type: 'string',
                description: 'The new code to inject'
              }
            },
            required: ['file', 'start_line', 'end_line', 'new_code']
          }
        }
      ]
    }]

    // Initial prompt
    let conversationHistory = [
      {
        role: 'user',
        parts: [{
          text: `I need you to edit this element:

Element HTML: ${elementHtml || 'Not provided'}
Element Text: ${elementText || 'Not provided'}

User Request: ${userRequest}

Available files: ${Object.keys(currentFiles).join(', ')}

Please use your tools to:
1. Read the relevant file(s)
2. Find the exact location of this element
3. Make the minimal change needed
4. Inject the updated code

Start by reading the files to understand the structure.`
        }]
      }
    ]

    let maxIterations = 10
    let iteration = 0
    let finalResult: any = null

    // Agent loop
    while (iteration < maxIterations) {
      iteration++
      console.log(`🔄 Agent iteration ${iteration}`)

      const result = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: conversationHistory,
        config: {
          systemInstruction: AGENT_SYSTEM_INSTRUCTION,
          temperature: 0.3,
          tools: tools
        }
      })

      const response = result
      const functionCalls = response.functionCalls

      // If no function calls, agent is done
      if (!functionCalls || functionCalls.length === 0) {
        console.log('✅ Agent completed')
        finalResult = {
          success: true,
          message: response.text || 'Edit completed',
          iterations: iteration
        }
        break
      }

      // Execute function calls
      const functionResponses = []
      
      for (const call of functionCalls) {
        console.log(`🔧 Executing tool: ${call.name}`)
        const toolResult = await executeTool(call.name || '', call.args || {}, context)
        
        functionResponses.push({
          name: call.name,
          response: toolResult
        })

        // If this was an inject_code call and it succeeded, capture the result
        if (call.name === 'inject_code' && toolResult.success) {
          const args = call.args || {}
          finalResult = {
            success: true,
            file: args.file,
            content: toolResult.modified_content,
            location: {
              startLine: args.start_line,
              endLine: args.end_line
            },
            iterations: iteration
          }
        }
      }

      // Add function responses to conversation
      conversationHistory.push({
        role: 'model',
        parts: functionCalls.map((call: any) => ({
          functionCall: call
        })) as any
      } as any)

      conversationHistory.push({
        role: 'user',
        parts: functionResponses.map(fr => ({
          functionResponse: fr
        })) as any
      } as any)
    }

    if (!finalResult) {
      throw createError({
        statusCode: 500,
        message: 'Agent failed to complete the edit'
      })
    }

    return finalResult

  } catch (error: any) {
    console.error('❌ Agent error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Agent edit failed'
    })
  }
})

// Tool execution functions
async function executeTool(
  toolName: string,
  args: any,
  context: AgentContext
): Promise<any> {
  switch (toolName) {
    case 'read_file':
      return readFile(args.file_path, context)
    
    case 'find_element':
      return findElement(args.element_html, args.element_text, context)
    
    case 'inject_code':
      return injectCode(args.file, args.start_line, args.end_line, args.new_code, context)
    
    default:
      return { error: `Unknown tool: ${toolName}` }
  }
}

function readFile(filePath: string, context: AgentContext) {
  const file = context.files[filePath]
  
  if (!file) {
    return {
      error: `File not found: ${filePath}`,
      available_files: Object.keys(context.files)
    }
  }

  const lines = file.content.split('\n')
  
  return {
    success: true,
    file_path: filePath,
    content: file.content,
    lines: lines,
    line_count: lines.length
  }
}

function findElement(elementHtml: string, elementText: string | undefined, context: AgentContext) {
  // Simple search through all files
  for (const [filePath, file] of Object.entries(context.files)) {
    const content = file.content
    const lines = content.split('\n')
    
    // Try to find the element by HTML
    const normalizedElement = elementHtml.replace(/\s+/g, ' ').trim()
    const normalizedContent = content.replace(/\s+/g, ' ')
    
    const index = normalizedContent.indexOf(normalizedElement)
    
    if (index !== -1) {
      // Find line numbers
      let charCount = 0
      let startLine = 0
      let endLine = 0
      
      for (let i = 0; i < lines.length; i++) {
        const lineLength = lines[i].length + 1
        if (charCount <= index && index < charCount + lineLength) {
          startLine = i
        }
        if (charCount <= index + normalizedElement.length && index + normalizedElement.length <= charCount + lineLength) {
          endLine = i
          break
        }
        charCount += lineLength
      }
      
      return {
        success: true,
        file: filePath,
        start_line: startLine,
        end_line: endLine,
        content: lines.slice(startLine, endLine + 1).join('\n'),
        context: lines.slice(Math.max(0, startLine - 2), Math.min(lines.length, endLine + 3)).join('\n')
      }
    }
  }
  
  return {
    error: 'Element not found in any file',
    searched_files: Object.keys(context.files)
  }
}

function injectCode(
  filePath: string,
  startLine: number,
  endLine: number,
  newCode: string,
  context: AgentContext
) {
  const file = context.files[filePath]
  
  if (!file) {
    return { error: `File not found: ${filePath}` }
  }

  const lines = file.content.split('\n')
  
  // Validate line numbers
  if (startLine < 0 || startLine >= lines.length || endLine < 0 || endLine >= lines.length) {
    return { 
      error: `Invalid line numbers: ${startLine}-${endLine} (file has ${lines.length} lines)` 
    }
  }
  
  // Get indentation from the original line
  const indentation = lines[startLine]?.match(/^(\s*)/)?.[1] || ''
  
  // Apply indentation to new code
  const indentedNewCode = newCode
    .split('\n')
    .map((line, i) => i === 0 ? line : indentation + line)
    .join('\n')
  
  // Replace ONLY the specified lines (not the entire file)
  const newLines = [...lines]
  newLines.splice(startLine, endLine - startLine + 1, indentedNewCode)
  
  const modifiedContent = newLines.join('\n')
  
  // DON'T update context - keep original files intact
  // Only return the modified content for this specific file
  
  return {
    success: true,
    file: filePath,
    modified_content: modifiedContent,
    lines_changed: [startLine, endLine],
    original_lines: lines.slice(startLine, endLine + 1).join('\n'),
    new_lines: indentedNewCode
  }
}
