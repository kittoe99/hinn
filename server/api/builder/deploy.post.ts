import type { FileMap } from '~/types/builder'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { siteId, files } = body as { siteId: string; files: FileMap }

    if (!siteId || !files) {
      throw createError({
        statusCode: 400,
        message: 'Missing siteId or files'
      })
    }

    // Get Supabase configuration
    const config = useRuntimeConfig(event)
    const supabaseUrl = config.public.supabaseUrl
    const supabaseKey = config.supabaseServiceRoleKey || config.public.supabaseAnonKey
    
    if (!supabaseUrl || !supabaseKey) {
      throw createError({
        statusCode: 500,
        message: 'Supabase configuration missing'
      })
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get authenticated user
    const authHeader = getHeader(event, 'authorization')
    let userId = null
    
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const { data: { user }, error: authError } = await supabase.auth.getUser(token)
      
      if (authError || !user) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized'
        })
      }
      userId = user.id
    } else {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    // Verify site ownership
    const { data: site, error: siteError } = await supabase
      .from('generated_sites')
      .select('*')
      .eq('id', siteId)
      .eq('user_id', userId)
      .single()

    if (siteError || !site) {
      throw createError({
        statusCode: 404,
        message: 'Site not found or access denied'
      })
    }

    // Generate a unique subdomain based on site ID
    const subdomain = `site-${siteId.substring(0, 8)}`
    
    // In production, you would integrate with deployment services like:
    // - Vercel API
    // - Netlify API
    // - Cloudflare Pages
    // - Your own hosting infrastructure
    
    // For now, we'll simulate deployment by storing files in Supabase Storage
    const bucket = 'deployed-sites'
    const sitePath = `${userId}/${siteId}`

    // Upload each file to storage
    for (const [filePath, fileData] of Object.entries(files)) {
      const fullPath = `${sitePath}/${filePath}`
      const content = fileData.content

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fullPath, content, {
          contentType: getContentType(filePath),
          upsert: true
        })

      if (uploadError) {
        console.error(`Failed to upload ${filePath}:`, uploadError)
      }
    }

    // Get public URL for index.html
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(`${sitePath}/index.html`)

    const deployedUrl = urlData.publicUrl

    // Update site with deployment info
    const { error: updateError } = await supabase
      .from('generated_sites')
      .update({
        is_published: true,
        published_url: deployedUrl,
        metadata: {
          ...site.metadata,
          deployed_at: new Date().toISOString(),
          deployment_method: 'supabase-storage'
        }
      })
      .eq('id', siteId)

    if (updateError) {
      console.error('Failed to update site:', updateError)
    }

    return {
      success: true,
      url: deployedUrl,
      subdomain,
      message: 'Site deployed successfully'
    }
  } catch (error: any) {
    console.error('Deploy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to deploy site'
    })
  }
})

function getContentType(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase()
  const contentTypes: Record<string, string> = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'txt': 'text/plain'
  }
  return contentTypes[ext || ''] || 'application/octet-stream'
}
