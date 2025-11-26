export default defineEventHandler(async (event) => {
  console.log('🔧 Simple edit element API called')
  
  try {
    const body = await readBody(event)
    
    return {
      success: true,
      message: 'API is working',
      received: {
        hasFiles: !!body.currentFiles,
        hasElement: !!body.elementHtml,
        hasRequest: !!body.userRequest
      }
    }
  } catch (error: any) {
    console.error('❌ Error:', error)
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }
})
