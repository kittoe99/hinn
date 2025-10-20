import { getSupabaseClient } from '~/lib/supabaseClient'

export default defineEventHandler(async (event) => {
  try {
    // Get auth header from request
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    // Create Supabase client with user's session
    const supabase = getSupabaseClient()
    
    // Verify user session
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    
    if (authError || !user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired token'
      })
    }

    // Fetch websites for this user
    // Note: If you add owner_user_id to websites table later, filter by it
    // For now, return all websites (adjust based on your ownership model)
    const { data: websites, error } = await supabase
      .from('websites')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw createError({
        statusCode: 500,
        message: `Failed to fetch websites: ${error.message}`
      })
    }

    return {
      success: true,
      websites: websites || []
    }
  } catch (err: any) {
    console.error('Error fetching websites:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || 'Failed to fetch websites'
    })
  }
})
