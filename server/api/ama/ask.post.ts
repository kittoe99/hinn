import { scrapeWebsite } from '~/lib/firecrawl'
import { dsComplete, type DSMessage } from '~/lib/deepseek'

// Cache for site content to avoid re-scraping
const siteContentCache = new Map<string, { content: string; timestamp: number }>()
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { question, siteUrl } = body

    console.log('[ama] Received question:', question)
    console.log('[ama] Site URL:', siteUrl)

    if (!question || !siteUrl) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Question and siteUrl are required'
      })
    }

    // Check if it's localhost/development
    const isLocalhost = siteUrl.includes('localhost') || siteUrl.includes('127.0.0.1')
    
    if (isLocalhost) {
      console.log('[ama] Localhost detected - cannot scrape. Using fallback response.')
      
      // Provide a helpful message for localhost
      return {
        answer: `I'm currently running in development mode on localhost. To use the AI assistant with real website content, please:\n\n1. Deploy your site to a public URL\n2. Test the AMA feature on the live site\n\nFirecrawl requires a public domain to scrape content. For now, I can answer general questions about web development services!\n\nYour question was: "${question}"`
      }
    }

    // Check if API keys are configured
    if (!process.env.FIRECRAWL_API_KEY) {
      throw createError({
        statusCode: 500,
        statusMessage: 'FIRECRAWL_API_KEY not configured'
      })
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      throw createError({
        statusCode: 500,
        statusMessage: 'DEEPSEEK_API_KEY not configured'
      })
    }

    // Get or fetch site content
    let siteContent = ''
    const cached = siteContentCache.get(siteUrl)
    const now = Date.now()

    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      console.log('[ama] Using cached site content')
      siteContent = cached.content
    } else {
      console.log('[ama] Scraping site homepage...')
      
      try {
        // Scrape just the homepage for faster, more reliable results
        const scrapeResult = await scrapeWebsite(siteUrl)
        
        console.log('[ama] Scrape result:', scrapeResult ? 'exists' : 'null')
        
        if (!scrapeResult) {
          throw new Error('Scrape returned null')
        }

        // Extract content from scrape result
        const title = scrapeResult.details?.name || 'Homepage'
        const summary = scrapeResult.summary || ''
        const about = scrapeResult.about || ''
        const rawContent = scrapeResult.rawContent || ''

        // Combine all available content
        siteContent = `
Title: ${title}

Summary:
${summary}

About:
${about}

Full Content:
${rawContent}
        `.trim().slice(0, 15000) // Limit to 15k chars

        console.log('[ama] Extracted content length:', siteContent.length)

        if (!siteContent || siteContent.length < 50) {
          throw new Error('Not enough content extracted from site')
        }

        // Cache the content
        siteContentCache.set(siteUrl, {
          content: siteContent,
          timestamp: now
        })
      } catch (scrapeError: any) {
        console.error('[ama] Scrape error:', scrapeError.message)
        console.error('[ama] Scrape error stack:', scrapeError.stack)
        throw new Error(`Failed to scrape site: ${scrapeError.message}`)
      }
    }

    if (!siteContent || siteContent.trim().length === 0) {
      throw new Error('No content extracted from site')
    }

    console.log('[ama] Site content length:', siteContent.length)
    console.log('[ama] Generating answer with DeepSeek...')

    // Use DeepSeek to answer the question based on site content
    const messages: DSMessage[] = [
      {
        role: 'system',
        content: `You are a helpful assistant that answers questions about a website based on its content. 
Be concise, accurate, and friendly. Only answer based on the provided content. 
If you don't find the answer in the content, say so politely and suggest contacting the team.
Format your response in a conversational way, using bullet points when listing multiple items.`
      },
      {
        role: 'user',
        content: `Website Content:\n\n${siteContent}\n\n---\n\nQuestion: ${question}\n\nPlease answer this question based only on the website content provided above.`
      }
    ]

    const response = await dsComplete(messages, {
      temperature: 0.3,
      max_tokens: 500,
      reasoning: false
    })

    const answer = response.choices?.[0]?.message?.content || 'I could not generate an answer.'

    console.log('[ama] Answer generated, length:', answer.length)

    return {
      answer: answer.trim(),
      cached: !!cached
    }
  } catch (error: any) {
    console.error('[ama] Error:', error.message || error)
    console.error('[ama] Stack:', error.stack)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to answer question'
    })
  }
})
