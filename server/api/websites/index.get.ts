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

    // Create Supabase client
    const supabase = getSupabaseClient()
    
    // Extract the token
    const token = authHeader.replace('Bearer ', '')
    
    // Verify user session
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired token'
      })
    }

    console.log('[API] Fetching websites for user:', user.id)

    // Fetch websites for this user with plan information
    // Using service role client which bypasses RLS
    const { data: websites, error } = await supabase
      .from('websites')
      .select(`
        *,
        plans:plan_id (
          id,
          product_type,
          plan_tier,
          status,
          is_active
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[API] Supabase error fetching websites:', error)
      throw createError({
        statusCode: 500,
        message: `Failed to fetch websites: ${error.message}`
      })
    }

    console.log('[API] Successfully fetched websites:', websites?.length || 0)
    console.log('[API] Websites data:', JSON.stringify(websites, null, 2))

    return {
      success: true,
      websites: websites || []
    }
  } catch (err: any) {
    console.error('[API] Error fetching websites:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || 'Failed to fetch websites'
    })
  }
})
