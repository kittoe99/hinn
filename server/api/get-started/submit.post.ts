import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    // Get Supabase configuration
    const config = useRuntimeConfig(event)
    const supabaseUrl = config.public.supabaseUrl
    const supabaseKey = config.supabaseServiceRoleKey || config.public.supabaseAnonKey
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('[Get Started Submit] Missing Supabase config')
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
    
    // Require authentication for get-started submissions
    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - Please sign in to submit'
      })
    }

    const body = await readBody(event)
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'selectedPlan']
    const missing = requiredFields.filter(field => !body[field])
    
    if (missing.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required fields: ${missing.join(', ')}`
      })
    }
    
    // Prepare data for insertion
    const submissionData = {
      user_id: userId,
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone || null,
      company: body.company || null,
      selected_plan: body.selectedPlan,
      status: 'pending_payment'
    }

    const { data, error } = await supabase
      .from('get_started_submissions')
      .insert(submissionData)
      .select()
      .single()

    if (error) {
      console.error('[Get Started Submit] Database error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to save submission: ${error.message}`
      })
    }

    console.log('[Get Started Submit] Success:', data.id)

    return {
      success: true,
      id: data.id,
      message: 'Submission saved successfully'
    }
  } catch (error: any) {
    console.error('[Get Started Submit] Error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to submit'
    })
  }
})
