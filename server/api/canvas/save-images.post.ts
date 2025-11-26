import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { images, originalPrompt } = body

    if (!images || !Array.isArray(images) || images.length === 0) {
      return {
        success: false,
        error: 'No images provided'
      }
    }

    const config = useRuntimeConfig()
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    )

    // Get authenticated user
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      return {
        success: false,
        error: 'Not authenticated'
      }
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      return {
        success: false,
        error: 'Authentication failed'
      }
    }

    const savedImages = []

    // Process each image
    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      
      try {
        // Fetch the image data
        const imageResponse = await fetch(image.src)
        const imageBlob = await imageResponse.blob()
        const arrayBuffer = await imageBlob.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Generate unique filename
        const timestamp = Date.now()
        const filename = `${user.id}/${timestamp}-${i}.png`

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('saved-canvas-images')
          .upload(filename, buffer, {
            contentType: 'image/png',
            upsert: false
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)
          continue
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('saved-canvas-images')
          .getPublicUrl(filename)

        // Save metadata to database
        const { data: dbData, error: dbError } = await supabase
          .from('saved_canvas_images')
          .insert({
            user_id: user.id,
            storage_path: filename,
            original_prompt: originalPrompt || '',
            modification_prompt: image.modificationPrompt || '',
            image_url: urlData.publicUrl,
            is_variation: image.isVariation || false
          })
          .select()
          .single()

        if (dbError) {
          console.error('Database error:', dbError)
          continue
        }

        savedImages.push(dbData)
      } catch (error) {
        console.error('Error processing image:', error)
        continue
      }
    }

    return {
      success: true,
      savedCount: savedImages.length,
      images: savedImages
    }
  } catch (error: any) {
    console.error('Error saving images:', error)
    return {
      success: false,
      error: error.message || 'Failed to save images'
    }
  }
})
