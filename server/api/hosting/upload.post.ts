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

    // Multipart form
    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'No files uploaded' })
    }

    const websiteId = formData.find((item) => item.name === 'websiteId')?.data?.toString()
    const label = formData.find((item) => item.name === 'label')?.data?.toString() || 'Manual upload'

    if (!websiteId) {
      throw createError({ statusCode: 400, statusMessage: 'websiteId is required' })
    }

    // Create website_version (uploaded)
    const versionId = randomUUID()
    const storageRoot = `${websiteId}/${versionId}`

    const { error: versionError } = await supabase
      .from('website_versions')
      .insert({
        id: versionId,
        website_id: websiteId,
        label,
        storage_path: storageRoot,
        source_type: 'uploaded',
        status: 'ready',
        created_by: user.id
      })

    if (versionError) {
      console.error('[Hosting] Failed to create website_version:', versionError)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to create website version: ${versionError.message}`
      })
    }

    const uploadedFiles: any[] = []

    for (const item of formData) {
      if (item.name === 'file' && item.filename && item.data) {
        const filename = item.filename
        const mimeType = item.type || 'application/octet-stream'
        const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '-')
        const path = `${storageRoot}/${sanitized}`

        const { error: uploadError } = await supabase.storage
          .from('websites')
          .upload(path, item.data, {
            contentType: mimeType,
            upsert: false,
            cacheControl: '3600'
          })

        if (uploadError) {
          console.error('[Hosting] Storage upload error:', uploadError)
          throw createError({
            statusCode: 500,
            statusMessage: `Upload failed: ${uploadError.message}`
          })
        }

        uploadedFiles.push({
          name: filename,
          path,
          type: mimeType
        })
      }
    }

    if (uploadedFiles.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'No file part found in request' })
    }

    return {
      success: true,
      websiteId,
      versionId,
      storageRoot,
      files: uploadedFiles
    }
  } catch (error: any) {
    console.error('[Hosting] Upload error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Hosting upload failed'
    })
  }
})
