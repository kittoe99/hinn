import { scrapeWebsite } from '~/lib/firecrawl'

export default defineEventHandler(async (event) => {
  try {
    console.log('[test-scrape] Starting test...')
    
    // Check API key
    if (!process.env.FIRECRAWL_API_KEY) {
      return {
        success: false,
        error: 'FIRECRAWL_API_KEY not found in environment'
      }
    }
    
    console.log('[test-scrape] API key found')
    
    // Try to scrape a simple public URL
    const testUrl = 'https://firecrawl.dev'
    console.log('[test-scrape] Scraping:', testUrl)
    
    const result = await scrapeWebsite(testUrl)
    
    console.log('[test-scrape] Result:', result ? 'success' : 'null')
    
    return {
      success: true,
      hasResult: !!result,
      summaryLength: result?.summary?.length || 0,
      contentLength: result?.rawContent?.length || 0
    }
  } catch (error: any) {
    console.error('[test-scrape] Error:', error.message)
    console.error('[test-scrape] Stack:', error.stack)
    
    return {
      success: false,
      error: error.message,
      stack: error.stack
    }
  }
})
