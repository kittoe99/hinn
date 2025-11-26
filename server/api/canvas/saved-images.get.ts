import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
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

    // Fetch user's saved images
    const { data: images, error } = await supabase
      .from('saved_canvas_images')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      images: images || []
    }
  } catch (error: any) {
    console.error('Error fetching saved images:', error)
    return {
      success: false,
      error: error.message || 'Failed to fetch saved images'
    }
  }
})
