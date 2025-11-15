import { getSupabaseClient } from '~/lib/supabaseClient'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const websiteId = query.websiteId as string | undefined

    if (!websiteId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'websiteId is required'
      })
    }

    const authHeader = getHeader(event, 'authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const token = authHeader.substring(7)

    const supabase = getSupabaseClient()

    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
    }

    // Ensure website belongs to user
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('id, user_id')
      .eq('id', websiteId)
      .single()

    if (websiteError || !website) {
      throw createError({ statusCode: 404, statusMessage: 'Website not found' })
    }

    if (website.user_id !== user.id) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }

    // Fetch versions for this website
    const { data: versions, error: versionsError } = await supabase
      .from('website_versions')
      .select('id, website_id, label, storage_path, source_type, status, created_at')
      .eq('website_id', websiteId)
      .order('created_at', { ascending: false })

    if (versionsError) {
      console.error('[Hosting] Failed to fetch versions:', versionsError)
      throw createError({ statusCode: 500, statusMessage: 'Failed to load versions' })
    }

    return {
      success: true,
      versions: versions || []
    }
  } catch (error: any) {
    console.error('[Hosting] versions.get error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to load versions'
    })
  }
})
