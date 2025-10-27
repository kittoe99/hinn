import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    // Get Supabase configuration from Nuxt runtime config
    const config = useRuntimeConfig(event)
    const supabaseUrl = config.public.supabaseUrl
    const supabaseKey = config.supabaseServiceRoleKey || config.public.supabaseAnonKey
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('[Onboarding Submit] Missing Supabase config:', { 
        hasUrl: !!supabaseUrl, 
        hasKey: !!supabaseKey 
      })
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
    
    // Require authentication for onboarding submissions
    if (!userId) {
      console.error('[Onboarding Submit] No user ID found in request')
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - Please sign in to submit onboarding'
      })
    }
    
    console.log('[Onboarding Submit] Authenticated user:', userId)

    const body = await readBody(event)
    
    // Validate required fields
    const requiredFields = [
      'businessName',
      'category',
      'description',
      'businessEmail',
      'contactMethod',
      'onSiteMode',
      'businessHoursMode',
      'primaryGoal'
    ]
    
    const missing = requiredFields.filter(field => !body[field])
    
    if (missing.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required fields: ${missing.join(', ')}`
      })
    }
    
    console.log('[Onboarding Submit] Processing onboarding for user:', userId)

    // Step 1: Find the pending plan for this user
    const { data: plans, error: plansFetchError } = await supabase
      .from('plans')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending_onboarding')
      .order('created_at', { ascending: false })
      .limit(1)

    if (plansFetchError) {
      console.error('[Onboarding Submit] Error fetching plans:', plansFetchError)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch plan: ${plansFetchError.message}`
      })
    }

    if (!plans || plans.length === 0) {
      console.error('[Onboarding Submit] No pending plan found for user:', userId)
      throw createError({
        statusCode: 404,
        statusMessage: 'No pending plan found. Please create a plan first.'
      })
    }

    const plan = plans[0]
    console.log('[Onboarding Submit] Found pending plan:', plan.id, 'Product type:', plan.product_type)

    // Step 2: Create or update website with all onboarding data
    if (plan.product_type === 'website') {
      const businessName = body.businessName || 'My Website'
      const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

      // Prepare complete website data with all onboarding fields
      const websiteData = {
        user_id: userId,
        plan_id: plan.id,
        name: businessName,
        slug: slug,
        status: 'active',
        // All onboarding fields
        site_type: body.siteType || null,
        business_name: body.businessName,
        category: body.category,
        description: body.description,
        business_email: body.businessEmail,
        business_phone: body.businessPhone || null,
        contact_method: body.contactMethod,
        has_current_website: body.hasCurrentWebsite || null,
        current_website_url: body.currentWebsiteUrl || null,
        website_summary: body.websiteSummary || null,
        website_skipped: body.websiteSkipped || false,
        selected_services: body.selectedServices || [],
        service_areas: body.serviceAreas || [],
        coverage_type: body.coverageType || null,
        on_site_mode: body.onSiteMode,
        business_hours_mode: body.businessHoursMode,
        primary_goal: body.primaryGoal,
        languages: body.languages || [],
        primary_language: body.primaryLanguage || null,
        has_logo: body.hasLogo || null,
        design_styles: body.designStyles || [],
        emotional_impact: body.emotionalImpact || [],
        high_contrast: body.highContrast || false,
        brand_colors: body.brandColors || null,
        color_theme: body.colorTheme || null,
        inspiration_sites: body.inspirationSites || null,
        envisioned_pages: body.envisionedPages || [],
        no_logo: body.noLogo || false,
        uploaded_logo: body.uploadedLogo || null,
        uploaded_assets: body.uploadedAssets || [],
        additional_notes: body.additionalNotes || null,
        submission_status: 'submitted'
      }

      // Find the website record that was created when the plan was selected
      const { data: existingWebsite } = await supabase
        .from('websites')
        .select('id')
        .eq('plan_id', plan.id)
        .maybeSingle()

      if (!existingWebsite) {
        console.error('[Onboarding Submit] No website found for plan:', plan.id)
        throw createError({
          statusCode: 404,
          statusMessage: 'Website record not found. Please try creating a new plan.'
        })
      }

      // Update the existing website with all onboarding data
      const { data: updatedWebsite, error: websiteUpdateError } = await supabase
        .from('websites')
        .update(websiteData)
        .eq('id', existingWebsite.id)
        .select()
        .single()

      if (websiteUpdateError) {
        console.error('[Onboarding Submit] Error updating website:', websiteUpdateError)
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to update website: ${websiteUpdateError.message}`
        })
      }

      const websiteId = updatedWebsite.id
      console.log('[Onboarding Submit] Updated website:', websiteId, 'with onboarding data')

      // Step 3: Update plan with website link
      const { error: planUpdateError } = await supabase
        .from('plans')
        .update({
          status: 'onboarding_completed',
          website_id: websiteId
        })
        .eq('id', plan.id)

      if (planUpdateError) {
        console.error('[Onboarding Submit] Failed to update plan:', planUpdateError)
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to link plan to website: ${planUpdateError.message}`
        })
      }

      console.log('[Onboarding Submit] Plan updated - ID:', plan.id, 'Website ID:', websiteId, 'Status: onboarding_completed')

      return {
        success: true,
        id: websiteId,
        user_id: userId,
        message: 'Onboarding submitted successfully'
      }
    } else {
      // For non-website products, just update status
      const { error: planUpdateError } = await supabase
        .from('plans')
        .update({
          status: 'onboarding_completed'
        })
        .eq('id', plan.id)

      if (planUpdateError) {
        console.error('[Onboarding Submit] Failed to update plan status:', planUpdateError)
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to update plan: ${planUpdateError.message}`
        })
      }
      
      console.log('[Onboarding Submit] Non-website plan updated:', plan.id)

      return {
        success: true,
        id: plan.id,
        user_id: userId,
        message: 'Onboarding submitted successfully'
      }
    }
  } catch (error: any) {
    console.error('[Onboarding Submit] Error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to submit onboarding'
    })
  }
})
