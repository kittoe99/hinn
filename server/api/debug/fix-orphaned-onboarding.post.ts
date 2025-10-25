import { createClient } from '@supabase/supabase-js'

/**
 * Fix orphaned onboarding submissions that have no user_id
 * This will link them to the authenticated user making the request
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

    console.log('[Fix Orphaned] Fixing orphaned onboarding for user:', userId)

    // Find orphaned onboarding submissions (no user_id)
    const { data: orphanedSubmissions, error: fetchError } = await supabase
      .from('onboarding_submissions')
      .select('id, business_email, created_at')
      .is('user_id', null)
      .order('created_at', { ascending: false })

    if (fetchError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch orphaned submissions: ${fetchError.message}`
      })
    }

    console.log('[Fix Orphaned] Found orphaned submissions:', orphanedSubmissions)

    if (!orphanedSubmissions || orphanedSubmissions.length === 0) {
      return {
        success: true,
        message: 'No orphaned submissions found',
        fixed: 0
      }
    }

    // Get user's email to match with submission
    const { data: { user } } = await supabase.auth.getUser()
    const userEmail = user?.email

    console.log('[Fix Orphaned] User email:', userEmail)

    // Find submissions that match the user's email
    const matchingSubmissions = orphanedSubmissions.filter(sub => 
      sub.business_email?.toLowerCase() === userEmail?.toLowerCase()
    )

    console.log('[Fix Orphaned] Matching submissions:', matchingSubmissions)

    // Update matching submissions with user_id
    const updates = []
    for (const submission of matchingSubmissions) {
      const { error: updateError } = await supabase
        .from('onboarding_submissions')
        .update({ user_id: userId })
        .eq('id', submission.id)

      if (updateError) {
        console.error('[Fix Orphaned] Failed to update submission:', submission.id, updateError)
        updates.push({ id: submission.id, success: false, error: updateError.message })
      } else {
        console.log('[Fix Orphaned] Updated submission:', submission.id)
        updates.push({ id: submission.id, success: true })

        // Also update any pending plans with this submission
        const { error: planUpdateError } = await supabase
          .from('plans')
          .update({
            status: 'onboarding_completed',
            onboarding_submission_id: submission.id
          })
          .eq('user_id', userId)
          .eq('status', 'pending_onboarding')

        if (planUpdateError) {
          console.error('[Fix Orphaned] Failed to update plan:', planUpdateError)
        } else {
          console.log('[Fix Orphaned] Updated plan status')
        }
      }
    }

    return {
      success: true,
      message: 'Fixed orphaned onboarding submissions',
      totalOrphaned: orphanedSubmissions.length,
      matched: matchingSubmissions.length,
      fixed: updates.filter(u => u.success).length,
      details: updates
    }
  } catch (error: any) {
    console.error('[Fix Orphaned] Error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to fix orphaned submissions'
    })
  }
})
