export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string
  
  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL parameter is required'
    })
  }
  
  try {
    // Fetch the website content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }
    
    let html = await response.text()
    
    // Inject base tag to fix relative URLs
    const baseTag = `<base href="${url}" target="_blank">`
    html = html.replace(/<head>/i, `<head>${baseTag}`)
    
    // Remove X-Frame-Options and CSP headers that block embedding
    setHeader(event, 'Content-Type', 'text/html')
    setHeader(event, 'X-Frame-Options', 'ALLOWALL')
    setHeader(event, 'Content-Security-Policy', '')
    
    return html
    
  } catch (error: any) {
    console.error('[Proxy Website] Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to proxy website: ${error.message}`
    })
  }
})
