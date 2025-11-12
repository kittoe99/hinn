import Firecrawl from '@mendable/firecrawl-js'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const websiteId = query.websiteId as string
  
  if (!websiteId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'websiteId parameter is required'
    })
  }
  
  const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY
  const firecrawlKey = process.env.FIRECRAWL_API_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase configuration missing'
    })
  }
  
  if (!firecrawlKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'FIRECRAWL_API_KEY not configured'
    })
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    // Check if website exists and get its domain
    const { data: website, error: fetchError } = await supabase
      .from('websites')
      .select('id, domain, custom_domain, screenshot_url')
      .eq('id', websiteId)
      .single()
    
    if (fetchError || !website) {
      throw new Error('Website not found')
    }
    
    // If screenshot already exists, return it
    if (website.screenshot_url) {
      console.log('[screenshot] Using cached screenshot:', website.screenshot_url)
      return {
        success: true,
        screenshot: website.screenshot_url,
        cached: true
      }
    }
    
    const domain = website.custom_domain || website.domain
    if (!domain) {
      throw new Error('No domain configured for this website')
    }
    
    const url = `https://${domain}`
    console.log('[screenshot] Capturing new screenshot for:', url)
    
    const firecrawl = new Firecrawl({ apiKey: firecrawlKey })
    
    // Use Firecrawl's screenshot capability
    const result = await firecrawl.scrape(url, {
      formats: ['screenshot'],
      onlyMainContent: false,
      waitFor: 2000
    })
    
    if (!result?.screenshot) {
      throw new Error('No screenshot data returned from Firecrawl')
    }
    
    // Convert base64 to buffer
    let imageBuffer: Buffer
    if (result.screenshot.startsWith('data:image')) {
      const base64Data = result.screenshot.split(',')[1]
      imageBuffer = Buffer.from(base64Data, 'base64')
    } else {
      imageBuffer = Buffer.from(result.screenshot, 'base64')
    }
    
    // Upload to Supabase storage
    const fileName = `${websiteId}-${Date.now()}.png`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('screenshots')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        upsert: false
      })
    
    if (uploadError) {
      console.error('[screenshot] Upload error:', uploadError)
      throw new Error(`Failed to upload screenshot: ${uploadError.message}`)
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('screenshots')
      .getPublicUrl(fileName)
    
    const publicUrl = publicUrlData.publicUrl
    
    // Update website record with screenshot URL
    const { error: updateError } = await supabase
      .from('websites')
      .update({ screenshot_url: publicUrl })
      .eq('id', websiteId)
    
    if (updateError) {
      console.error('[screenshot] Failed to update website:', updateError)
    }
    
    console.log('[screenshot] Screenshot saved:', publicUrl)
    
    return {
      success: true,
      screenshot: publicUrl,
      cached: false
    }
    
  } catch (error: any) {
    console.error('[screenshot] Error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to capture screenshot: ${error.message}`
    })
  }
})
