import Firecrawl from '@mendable/firecrawl-js'

// Lazy Firecrawl client to avoid build-time env requirement
let _firecrawl: Firecrawl | null = null

export function getFirecrawl(): Firecrawl {
  if (_firecrawl) return _firecrawl
  
  const apiKey = process.env.FIRECRAWL_API_KEY
  if (!apiKey) {
    throw new Error('Missing FIRECRAWL_API_KEY env var')
  }
  
  _firecrawl = new Firecrawl({ apiKey })
  return _firecrawl
}

export type SiteIntel = {
  summary: string
  details?: {
    name?: string
    tagline?: string
    industries?: string[]
    offerings?: string[]
    audience?: string[]
    locations?: string[]
    contact?: { email?: string; phone?: string }
    socialLinks?: string[]
  }
  about?: string
  purpose?: string
  services?: string[]
  rawContent?: string
}

/**
 * Scrape and analyze a website using Firecrawl
 */
export async function scrapeWebsite(url: string): Promise<SiteIntel | null> {
  if (!process.env.FIRECRAWL_API_KEY) {
    throw new Error('Missing FIRECRAWL_API_KEY env var')
  }

  const firecrawl = getFirecrawl()

  try {
    console.log('[firecrawl] Scraping URL:', url)

    // Scrape the website using the correct SDK method
    const scrapeResult: any = await firecrawl.scrape(url, {
      formats: ['markdown', 'html']
    })

    console.log('[firecrawl] Scrape result keys:', Object.keys(scrapeResult || {}))
    console.log('[firecrawl] Result structure:', JSON.stringify(scrapeResult, null, 2).slice(0, 500))

    // The result is returned directly with markdown, html, and metadata fields
    const content = scrapeResult?.markdown || ''
    const metadata = scrapeResult?.metadata || {}

    if (!content || content.trim().length === 0) {
      console.error('[firecrawl] No content extracted')
      return null
    }

    console.log('[firecrawl] Scrape successful, content length:', content.length)

    // Extract basic information from the scraped content
    const lines = content.split('\n').filter((line: string) => line.trim().length > 0)
    
    // Get meaningful text lines (skip headers, links, etc.)
    const textLines = lines.filter((line: string) => {
      const trimmed = line.trim()
      return trimmed.length > 20 && 
             !trimmed.startsWith('#') && 
             !trimmed.startsWith('[') &&
             !trimmed.startsWith('*')
    })

    // Create summary from first few meaningful paragraphs
    const firstParagraphs = textLines.slice(0, 5).join(' ').slice(0, 600).trim()

    // Extract title and description from metadata
    const title = metadata.title || metadata.ogTitle || metadata.name || 'Website'
    const metaDescription = metadata.description || metadata.ogDescription || ''
    
    // Use metadata description if available, otherwise use extracted content
    const description = metaDescription || firstParagraphs || 'No description available'

    // Build a more comprehensive summary
    let summary = description
    if (metaDescription && firstParagraphs && metaDescription !== firstParagraphs) {
      summary = `${metaDescription}\n\n${firstParagraphs}`
    }

    return {
      summary: summary.trim(),
      details: {
        name: title,
        tagline: metaDescription,
      },
      about: firstParagraphs,
      rawContent: content.slice(0, 5000) // First 5000 chars
    }
  } catch (error: any) {
    console.error('[firecrawl] Error:', error.message)
    throw error
  }
}

/**
 * Crawl multiple pages of a website
 */
export async function crawlWebsite(url: string, maxPages: number = 5): Promise<any> {
  if (!process.env.FIRECRAWL_API_KEY) {
    throw new Error('Missing FIRECRAWL_API_KEY env var')
  }

  const firecrawl = getFirecrawl()

  try {
    console.log('[firecrawl] Crawling URL:', url, 'max pages:', maxPages)

    // Use the correct crawl method
    const crawlResult: any = await firecrawl.crawl(url, {
      limit: maxPages,
      scrapeOptions: {
        formats: ['markdown']
      }
    })

    console.log('[firecrawl] Crawl result:', crawlResult)

    if (!crawlResult || !crawlResult.data) {
      console.error('[firecrawl] Crawl failed or no data')
      return null
    }

    console.log('[firecrawl] Crawl successful, pages:', crawlResult.data?.length || 0)

    return crawlResult.data
  } catch (error: any) {
    console.error('[firecrawl] Crawl error:', error.message)
    throw error
  }
}
