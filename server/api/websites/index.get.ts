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

    // Create authenticated Supabase client with user's token for RLS
    const config = useRuntimeConfig()
    const { createClient } = await import('@supabase/supabase-js')
    const authenticatedSupabase = createClient(
      config.public.supabaseUrl as string,
      config.public.supabaseKey as string,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    )

    // Fetch websites for this user with plan information using authenticated client
    const { data: websites, error } = await authenticatedSupabase
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
