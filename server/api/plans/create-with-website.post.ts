import { createClient } from '@supabase/supabase-js'

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
    
    const body = await readBody(event)
    const { product_type, plan_tier, price_monthly } = body
    
    // Validate required fields
    if (!product_type || !plan_tier) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: product_type and plan_tier'
      })
    }
    
    console.log('[Create Plan] Creating plan for user:', userId, 'Type:', product_type, 'Tier:', plan_tier)
    
    // Step 1: Create the plan
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .insert({
        user_id: userId,
        product_type,
        plan_tier,
        price_monthly: price_monthly || 29,
        status: 'pending_onboarding',
        billing_cycle: 'monthly'
      })
      .select()
      .single()
    
    if (planError) {
      console.error('[Create Plan] Error creating plan:', planError)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to create plan: ${planError.message}`
      })
    }
    
    console.log('[Create Plan] Plan created:', plan.id)
    
    // Step 2: If it's a website plan, create the website record with plan_id
    if (product_type === 'website') {
      const tempName = `Website ${Date.now()}`
      const tempSlug = `website-${Date.now()}`
      
      const { data: website, error: websiteError } = await supabase
        .from('websites')
        .insert({
          user_id: userId,
          plan_id: plan.id,
          name: tempName,
          slug: tempSlug,
          status: 'pending'
        })
        .select()
        .single()
      
      if (websiteError) {
        console.error('[Create Plan] Error creating website:', websiteError)
        // Rollback plan creation
        await supabase.from('plans').delete().eq('id', plan.id)
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to create website: ${websiteError.message}`
        })
      }
      
      console.log('[Create Plan] Website created:', website.id)
      
      // Step 3: Link the website back to the plan
      const { error: updateError } = await supabase
        .from('plans')
        .update({ website_id: website.id })
        .eq('id', plan.id)
      
      if (updateError) {
        console.error('[Create Plan] Error linking website to plan:', updateError)
      }
      
      return {
        success: true,
        plan_id: plan.id,
        website_id: website.id,
        message: 'Plan and website created successfully'
      }
    }
    
    return {
      success: true,
      plan_id: plan.id,
      message: 'Plan created successfully'
    }
    
  } catch (error: any) {
    console.error('[Create Plan] Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to create plan'
    })
  }
})
