export default defineEventHandler(async (event) => {
  return {
    status: 'ok',
    message: 'AMA API is working',
    env: {
      hasFirecrawl: !!process.env.FIRECRAWL_API_KEY,
      hasDeepseek: !!process.env.DEEPSEEK_API_KEY
    }
  }
})
