import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const supabaseUrl = config.public.supabaseUrl
    const supabaseKey = config.supabaseServiceRoleKey || config.public.supabaseAnonKey

    if (!supabaseUrl || !supabaseKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Supabase configuration missing'
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Auth
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const token = authHeader.substring(7)
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
    }

    const body = await readBody<{
      websiteId?: string
      label?: string
      html?: string
    }>(event)

    const websiteId = body.websiteId
    const label = body.label || 'AI generated'
    const html = body.html?.toString() || ''

    if (!websiteId) {
      throw createError({ statusCode: 400, statusMessage: 'websiteId is required' })
    }

    if (!html.trim()) {
      throw createError({ statusCode: 400, statusMessage: 'html is required' })
    }

    const versionId = randomUUID()
    const storageRoot = `${websiteId}/${versionId}`
    const indexPath = `${storageRoot}/index.html`

    const { error: versionError } = await supabase
      .from('website_versions')
      .insert({
        id: versionId,
        website_id: websiteId,
        label,
        storage_path: storageRoot,
        source_type: 'generated',
        status: 'ready',
        created_by: user.id
      })

    if (versionError) {
      console.error('[Hosting] Failed to create website_version (generated):', versionError)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to create website version: ${versionError.message}`
      })
    }

    const content = new TextEncoder().encode(html)

    const { error: uploadError } = await supabase.storage
      .from('websites')
      .upload(indexPath, content, {
        contentType: 'text/html; charset=utf-8',
        upsert: false,
        cacheControl: '3600'
      })

    if (uploadError) {
      console.error('[Hosting] Storage upload error (generated):', uploadError)
      throw createError({
        statusCode: 500,
        statusMessage: `Upload failed: ${uploadError.message}`
      })
    }

    return {
      success: true,
      websiteId,
      versionId,
      storageRoot,
      indexPath
    }
  } catch (error: any) {
    console.error('[Hosting] Generate error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'AI hosting generate failed'
    })
  }
})
