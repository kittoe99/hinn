import { createClient } from '@supabase/supabase-js'

/**
 * Fix websites that are missing user_id or have incorrect ownership
 * This will link websites to the authenticated user based on:
 * 1. Associated plans
 * 2. Onboarding submissions
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

    console.log('[Fix Website Ownership] Fixing for user:', userId)

    const fixes = []

    // Strategy 1: Find websites linked to user's plans but with wrong/null user_id
    const { data: userPlans, error: plansError } = await supabase
      .from('plans')
      .select('id, website_id')
      .eq('user_id', userId)
      .not('website_id', 'is', null)

    if (plansError) {
      console.error('[Fix Website Ownership] Error fetching plans:', plansError)
    } else if (userPlans && userPlans.length > 0) {
      for (const plan of userPlans) {
        if (plan.website_id) {
          // Check if this website has the correct user_id
          const { data: website, error: websiteError } = await supabase
            .from('websites')
            .select('id, user_id, name')
            .eq('id', plan.website_id)
            .single()

          if (!websiteError && website && website.user_id !== userId) {
            console.log('[Fix Website Ownership] Found website with wrong user_id:', website.id)
            
            // Update the website's user_id
            const { error: updateError } = await supabase
              .from('websites')
              .update({ user_id: userId })
              .eq('id', website.id)

            if (updateError) {
              console.error('[Fix Website Ownership] Failed to update website:', website.id, updateError)
              fixes.push({
                websiteId: website.id,
                websiteName: website.name,
                method: 'plan_link',
                success: false,
                error: updateError.message
              })
            } else {
              console.log('[Fix Website Ownership] Updated website:', website.id)
              fixes.push({
                websiteId: website.id,
                websiteName: website.name,
                method: 'plan_link',
                success: true
              })
            }
          }
        }
      }
    }

    // Strategy 2: Find orphaned websites (null user_id) and try to match with onboarding
    const { data: orphanedWebsites, error: orphanedError } = await supabase
      .from('websites')
      .select('*')
      .is('user_id', null)

    if (orphanedError) {
      console.error('[Fix Website Ownership] Error fetching orphaned websites:', orphanedError)
    } else if (orphanedWebsites && orphanedWebsites.length > 0) {
      // Get user's onboarding submissions
      const { data: submissions, error: submissionsError } = await supabase
        .from('onboarding_submissions')
        .select('id, business_name')
        .eq('user_id', userId)

      if (!submissionsError && submissions && submissions.length > 0) {
        for (const website of orphanedWebsites) {
          // Try to match by business name
          const matchingSubmission = submissions.find(sub => 
            sub.business_name?.toLowerCase() === website.name?.toLowerCase()
          )

          if (matchingSubmission) {
            console.log('[Fix Website Ownership] Found orphaned website matching submission:', website.id)
            
            const { error: updateError } = await supabase
              .from('websites')
              .update({ user_id: userId })
              .eq('id', website.id)

            if (updateError) {
              console.error('[Fix Website Ownership] Failed to update orphaned website:', website.id, updateError)
              fixes.push({
                websiteId: website.id,
                websiteName: website.name,
                method: 'name_match',
                success: false,
                error: updateError.message
              })
            } else {
              console.log('[Fix Website Ownership] Updated orphaned website:', website.id)
              fixes.push({
                websiteId: website.id,
                websiteName: website.name,
                method: 'name_match',
                success: true
              })
            }
          }
        }
      }
    }

    return {
      success: true,
      message: 'Fixed website ownership',
      userId,
      totalFixed: fixes.filter(f => f.success).length,
      totalFailed: fixes.filter(f => !f.success).length,
      details: fixes
    }
  } catch (error: any) {
    console.error('[Fix Website Ownership] Error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to fix website ownership'
    })
  }
})
