import { dsComplete, type DSMessage } from '~/lib/deepseek'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { description } = body

    if (!description || typeof description !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Description is required'
      })
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      throw createError({
        statusCode: 500,
        statusMessage: 'DEEPSEEK_API_KEY not configured'
      })
    }

    const messages: DSMessage[] = [
      {
        role: 'system',
        content: `You are a professional copywriter helping businesses craft compelling service descriptions. 
Your task is to enhance the provided description to be more persuasive, specific, and customer-focused.
Keep it concise (under 120 words), highlight value propositions, and maintain a professional yet approachable tone.
Return ONLY the enhanced description text without any preamble or explanation.`
      },
      {
        role: 'user',
        content: `Enhance this service description:\n\n"${description}"\n\nProvide an improved version that is more compelling and customer-focused.`
      }
    ]

    const response = await dsComplete(messages, {
      temperature: 0.7,
      max_tokens: 300,
      reasoning: false
    })

    const enhanced = response.choices?.[0]?.message?.content?.trim()

    if (!enhanced) {
      throw new Error('No enhanced description returned')
    }

    return {
      enhanced
    }
  } catch (error: any) {
    console.error('[enhance-description] Error:', error.message || error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to enhance description'
    })
  }
})
