import { createClient } from '@supabase/supabase-js'

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
    
    // Get authenticated user
    const authHeader = getHeader(event, 'authorization')
    let userId = null
    
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const { data: { user }, error: authError } = await supabase.auth.getUser(token)
      
      if (!authError && user) {
        userId = user.id
      }
    }
    
    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    // Parse multipart form data
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No files uploaded'
      })
    }

    const uploadedFiles = []
    const websiteId = formData.find(item => item.name === 'websiteId')?.data?.toString() || 'temp'
    const fileType = formData.find(item => item.name === 'fileType')?.data?.toString() || 'asset'

    // Allowed file types for validation
    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp', 'image/gif']
    const allowedDocTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const allowedTypes = [...allowedImageTypes, ...allowedDocTypes]
    
    // Max file size: 50MB
    const maxFileSize = 50 * 1024 * 1024

    for (const item of formData) {
      if (item.name === 'file' && item.filename && item.data) {
        const filename = item.filename
        const fileSize = item.data.length
        const mimeType = item.type || 'application/octet-stream'
        
        // Validate file size
        if (fileSize > maxFileSize) {
          throw createError({
            statusCode: 400,
            statusMessage: `File ${filename} exceeds maximum size of 50MB`
          })
        }
        
        // Validate file type
        if (!allowedTypes.includes(mimeType)) {
          throw createError({
            statusCode: 400,
            statusMessage: `File type ${mimeType} not allowed. Allowed types: images (PNG, JPG, SVG, WebP, GIF) and documents (PDF, DOC, DOCX)`
          })
        }
        
        const fileExt = filename.split('.').pop()?.toLowerCase() || 'bin'
        const timestamp = Date.now()
        const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
        
        // Determine storage path based on file type
        let storagePath: string
        if (fileType === 'logo') {
          storagePath = `${userId}/${websiteId}/logo-${timestamp}.${fileExt}`
        } else {
          storagePath = `${userId}/${websiteId}/assets/${sanitizedFilename.substring(0, 100)}-${timestamp}.${fileExt}`
        }

        console.log(`[Upload] Uploading file: ${filename} (${fileSize} bytes) to ${storagePath}`)

        // Upload to Supabase Storage with proper options
        const { data, error } = await supabase.storage
          .from('website-assets')
          .upload(storagePath, item.data, {
            contentType: mimeType,
            upsert: false,
            cacheControl: '3600' // Cache for 1 hour
          })

        if (error) {
          console.error('[Upload] Storage error:', error)
          throw createError({
            statusCode: 500,
            statusMessage: `Upload failed for ${filename}: ${error.message}`
          })
        }

        console.log(`[Upload] Successfully uploaded: ${storagePath}`)

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('website-assets')
          .getPublicUrl(storagePath)

        // Store comprehensive file metadata
        uploadedFiles.push({
          name: filename,
          url: publicUrl,
          path: storagePath,
          size: fileSize,
          type: mimeType,
          uploadedAt: new Date().toISOString()
        })
      }
    }

    if (uploadedFiles.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No valid files found'
      })
    }

    return {
      success: true,
      files: uploadedFiles
    }
  } catch (error: any) {
    console.error('[Upload] Error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Upload failed'
    })
  }
})
