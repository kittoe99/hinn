import { createClient } from '@supabase/supabase-js'

/**
 * Debug endpoint to check all websites in the database
 * Uses service role key to bypass RLS
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

    console.log('[Debug Check Websites] Checking for user:', userId)

    // Fetch ALL websites (bypassing RLS with service role)
    const { data: allWebsites, error: allError } = await supabase
      .from('websites')
      .select('*')
      .order('created_at', { ascending: false })

    if (allError) {
      console.error('[Debug Check Websites] Error fetching all websites:', allError)
    }

    // Fetch user's websites
    const { data: userWebsites, error: userError } = await supabase
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
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (userError) {
      console.error('[Debug Check Websites] Error fetching user websites:', userError)
    }

    // Check for websites with NULL user_id
    const { data: orphanedWebsites, error: orphanedError } = await supabase
      .from('websites')
      .select('*')
      .is('user_id', null)

    if (orphanedError) {
      console.error('[Debug Check Websites] Error fetching orphaned websites:', orphanedError)
    }

    // Check plans for this user
    const { data: userPlans, error: plansError } = await supabase
      .from('plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (plansError) {
      console.error('[Debug Check Websites] Error fetching plans:', plansError)
    }

    return {
      success: true,
      userId,
      summary: {
        totalWebsites: allWebsites?.length || 0,
        userWebsites: userWebsites?.length || 0,
        orphanedWebsites: orphanedWebsites?.length || 0,
        userPlans: userPlans?.length || 0
      },
      data: {
        allWebsites: allWebsites?.map(w => ({
          id: w.id,
          name: w.name,
          user_id: w.user_id,
          status: w.status,
          created_at: w.created_at
        })),
        userWebsites: userWebsites?.map(w => ({
          id: w.id,
          name: w.name,
          user_id: w.user_id,
          status: w.status,
          plan_id: w.plan_id,
          created_at: w.created_at
        })),
        orphanedWebsites: orphanedWebsites?.map(w => ({
          id: w.id,
          name: w.name,
          user_id: w.user_id,
          status: w.status,
          created_at: w.created_at
        })),
        userPlans: userPlans?.map(p => ({
          id: p.id,
          product_type: p.product_type,
          plan_tier: p.plan_tier,
          status: p.status,
          website_id: p.website_id,
          created_at: p.created_at
        }))
      }
    }
  } catch (error: any) {
    console.error('[Debug Check Websites] Error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to check websites'
    })
  }
})
