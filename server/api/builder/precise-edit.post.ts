import { GoogleGenAI } from "@google/genai"

/**
 * Two-step precise editing:
 * Step 1: Identify what to replace
 * Step 2: Perform the replacement
 */

export default defineEventHandler(async (event) => {
  console.log('✂️ Precise edit API called')
  
  try {
    const body = await readBody(event)
    const { prompt, currentFiles } = body

    if (!prompt || !currentFiles) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields'
      })
    }

    const config = useRuntimeConfig()
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        message: 'Gemini API key not configured'
      })
    }

    const ai = new GoogleGenAI({ apiKey })

    // Get the main file (usually index.html)
    const mainFile = currentFiles['index.html'] || Object.values(currentFiles)[0]
    const fileName = currentFiles['index.html'] ? 'index.html' : Object.keys(currentFiles)[0]
    
    if (!mainFile) {
      throw createError({
        statusCode: 400,
        message: 'No files provided'
      })
    }

    // STEP 1: Identify what to replace
    console.log('🔍 Step 1: Identifying what to replace...')
    
    const identifyPrompt = `
You are analyzing code to identify what needs to be replaced.

**CURRENT CODE:**
${mainFile.content}

**USER REQUEST:**
${prompt}

**YOUR TASK:**
Identify the EXACT text/element that needs to be replaced.

Output in this EXACT format:
OLD: [the exact text/element to be removed]
NEW: [the exact text/element to replace it with]

Example:
If user says "change phone to 555-1234" and code has <p>555-0000</p>
Output:
OLD: 555-0000
NEW: 555-1234

Be precise. Output ONLY the OLD and NEW lines, nothing else.
`

    const identifyResult = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: { parts: [{ text: identifyPrompt }] },
      config: {
        temperature: 0.1,
      }
    })

    const identification = (identifyResult.text || '').trim()
    console.log('📋 Identification result:', identification)

    // Parse OLD and NEW
    const oldMatch = identification.match(/OLD:\s*(.+?)(?=\nNEW:|$)/s)
    const newMatch = identification.match(/NEW:\s*(.+?)$/s)

    if (!oldMatch || !newMatch) {
      throw createError({
        statusCode: 500,
        message: 'Could not identify what to replace'
      })
    }

    const oldValue = oldMatch[1].trim()
    const newValue = newMatch[1].trim()

    console.log(`🎯 Will replace: "${oldValue}" → "${newValue}"`)

    // STEP 2: Perform the replacement
    console.log('✂️ Step 2: Performing replacement...')
    
    let modifiedContent = mainFile.content

    // Simple string replacement
    if (modifiedContent.includes(oldValue)) {
      // Replace ONLY the first occurrence
      modifiedContent = modifiedContent.replace(oldValue, newValue)
      console.log('✅ Replacement successful')
    } else {
      // Try with normalized whitespace
      const normalizedOld = oldValue.replace(/\s+/g, ' ')
      const normalizedContent = modifiedContent.replace(/\s+/g, ' ')
      
      if (normalizedContent.includes(normalizedOld)) {
        // Find the actual position in original content
        const index = normalizedContent.indexOf(normalizedOld)
        
        // Count actual characters up to that point
        let actualIndex = 0
        let normalizedIndex = 0
        
        while (normalizedIndex < index && actualIndex < modifiedContent.length) {
          if (!/\s/.test(modifiedContent[actualIndex])) {
            normalizedIndex++
          } else {
            // Skip whitespace in original
            while (actualIndex < modifiedContent.length && /\s/.test(modifiedContent[actualIndex])) {
              actualIndex++
            }
            normalizedIndex++ // Count as one space in normalized
            continue
          }
          actualIndex++
        }
        
        // Find the end
        let endIndex = actualIndex
        let charsMatched = 0
        while (charsMatched < normalizedOld.length && endIndex < modifiedContent.length) {
          if (!/\s/.test(modifiedContent[endIndex])) {
            charsMatched++
          }
          endIndex++
        }
        
        modifiedContent = 
          modifiedContent.substring(0, actualIndex) + 
          newValue + 
          modifiedContent.substring(endIndex)
        
        console.log('✅ Replacement successful (with whitespace normalization)')
      } else {
        throw createError({
          statusCode: 404,
          message: `Could not find "${oldValue}" in the code`
        })
      }
    }

    // Return the modified file
    return {
      success: true,
      file: fileName,
      content: modifiedContent,
      replaced: {
        old: oldValue,
        new: newValue
      }
    }

  } catch (error: any) {
    console.error('❌ Precise edit error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Edit failed'
    })
  }
})
