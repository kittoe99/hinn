import { createClient } from '@supabase/supabase-js'

/**
 * Debug endpoint to fix plans stuck in 'pending_onboarding' status
 * This will update plans that have an associated onboarding_submission_id
 * but are still marked as 'pending_onboarding'
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
    
    // Get authenticated user from session
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

    // Find plans with pending_onboarding status that have an onboarding submission
    const { data: pendingPlans, error: fetchError } = await supabase
      .from('plans')
      .select('id, status, onboarding_submission_id, product_type')
      .eq('user_id', userId)
      .eq('status', 'pending_onboarding')

    if (fetchError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch plans: ${fetchError.message}`
      })
    }

    console.log('[Fix Onboarding] Found pending plans:', pendingPlans)

    // Check which plans have completed onboarding submissions
    const plansToUpdate = []
    
    for (const plan of pendingPlans || []) {
      // Check if there's an onboarding submission for this user
      const { data: submissions, error: submissionError } = await supabase
        .from('onboarding_submissions')
        .select('id, status')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)

      if (!submissionError && submissions && submissions.length > 0) {
        plansToUpdate.push({
          planId: plan.id,
          submissionId: submissions[0].id
        })
      }
    }

    console.log('[Fix Onboarding] Plans to update:', plansToUpdate)

    // Update the plans
    const updates = []
    for (const { planId, submissionId } of plansToUpdate) {
      const { error: updateError } = await supabase
        .from('plans')
        .update({
          status: 'onboarding_completed',
          onboarding_submission_id: submissionId
        })
        .eq('id', planId)

      if (updateError) {
        console.error('[Fix Onboarding] Failed to update plan:', planId, updateError)
        updates.push({ planId, success: false, error: updateError.message })
      } else {
        console.log('[Fix Onboarding] Updated plan:', planId)
        updates.push({ planId, success: true })
      }
    }

    return {
      success: true,
      message: 'Fixed onboarding status',
      pendingPlansFound: pendingPlans?.length || 0,
      plansUpdated: updates.filter(u => u.success).length,
      details: updates
    }
  } catch (error: any) {
    console.error('[Fix Onboarding] Error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to fix onboarding status'
    })
  }
})
