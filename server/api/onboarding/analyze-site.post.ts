import { scrapeWebsite } from '~/lib/firecrawl'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { url } = body

    console.log('[analyze-site] Received request for URL:', url)

    if (!url) {
      throw createError({
        statusCode: 400,
        statusMessage: 'URL is required'
      })
    }

    // Check if API key is configured
    if (!process.env.FIRECRAWL_API_KEY) {
      console.error('[analyze-site] Missing FIRECRAWL_API_KEY')
      throw createError({
        statusCode: 500,
        statusMessage: 'FIRECRAWL_API_KEY not configured. Please add it to your .env file.'
      })
    }

    console.log('[analyze-site] Starting Firecrawl scrape...')

    // Scrape the website using Firecrawl
    let intel
    try {
      intel = await scrapeWebsite(url)
    } catch (analysisError: any) {
      console.error('[analyze-site] Firecrawl error:', analysisError.message)
      console.error('[analyze-site] Stack:', analysisError.stack)
      throw new Error(`Scraping failed: ${analysisError.message}`)
    }

    console.log('[analyze-site] Scrape complete:', intel ? 'Success' : 'No data')

    if (!intel) {
      console.error('[analyze-site] Intel is null')
      return {
        summary: null,
        error: 'Could not scrape the website. Please check the URL and try again.'
      }
    }

    if (!intel.summary || intel.summary.trim().length === 0) {
      console.error('[analyze-site] Summary is empty')
      return {
        summary: null,
        error: 'No content could be extracted from the website.'
      }
    }

    console.log('[analyze-site] Returning summary, length:', intel.summary.length)

    return {
      summary: intel.summary,
      details: intel.details || {},
      about: intel.about || '',
      services: intel.services || [],
      rawContent: intel.rawContent || ''
    }
  } catch (error: any) {
    console.error('[analyze-site] Error:', error.message || error)
    console.error('[analyze-site] Stack:', error.stack)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to analyze website'
    })
  }
})
