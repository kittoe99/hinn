import { createClient } from '@supabase/supabase-js'

/**
 * Cleanup orphaned website_versions that have database records but no storage files
 * This can happen if storage upload fails after database insert
 */
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

    const body = await readBody<{ websiteId: string }>(event)
    const websiteId = body.websiteId

    if (!websiteId) {
      throw createError({ statusCode: 400, statusMessage: 'websiteId is required' })
    }

    // Get all versions for this website
    const { data: versions, error: fetchError } = await supabase
      .from('website_versions')
      .select('id, storage_path')
      .eq('website_id', websiteId)
      .eq('created_by', user.id)

    if (fetchError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch versions: ${fetchError.message}`
      })
    }

    if (!versions || versions.length === 0) {
      return {
        success: true,
        message: 'No versions found',
        orphanedCount: 0
      }
    }

    const orphanedVersions: string[] = []

    // Check each version to see if storage files exist
    for (const version of versions) {
      const indexPath = `${version.storage_path}/index.html`
      
      const { data: fileExists } = await supabase.storage
        .from('websites')
        .list(version.storage_path, {
          limit: 1,
          search: 'index.html'
        })

      // If no files found, this is orphaned
      if (!fileExists || fileExists.length === 0) {
        orphanedVersions.push(version.id)
      }
    }

    // Delete orphaned versions
    if (orphanedVersions.length > 0) {
      const { error: deleteError } = await supabase
        .from('website_versions')
        .delete()
        .in('id', orphanedVersions)

      if (deleteError) {
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to delete orphaned versions: ${deleteError.message}`
        })
      }
    }

    return {
      success: true,
      message: `Cleaned up ${orphanedVersions.length} orphaned version(s)`,
      orphanedCount: orphanedVersions.length,
      orphanedIds: orphanedVersions
    }
  } catch (error: any) {
    console.error('[Hosting] Cleanup error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Cleanup failed'
    })
  }
})
