import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const imageId = query.id as string

    if (!imageId) {
      return {
        success: false,
        error: 'Image ID is required'
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

    // Get image metadata to find storage path
    const { data: imageData, error: fetchError } = await supabase
      .from('saved_canvas_images')
      .select('storage_path')
      .eq('id', imageId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !imageData) {
      return {
        success: false,
        error: 'Image not found'
      }
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('saved-canvas-images')
      .remove([imageData.storage_path])

    if (storageError) {
      console.error('Storage deletion error:', storageError)
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('saved_canvas_images')
      .delete()
      .eq('id', imageId)
      .eq('user_id', user.id)

    if (dbError) {
      return {
        success: false,
        error: dbError.message
      }
    }

    return {
      success: true,
      message: 'Image deleted successfully'
    }
  } catch (error: any) {
    console.error('Error deleting image:', error)
    return {
      success: false,
      error: error.message || 'Failed to delete image'
    }
  }
})
