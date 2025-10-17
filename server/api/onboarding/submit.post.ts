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
    
    // For now, allow submissions without authentication (can be changed later)
    // if (!userId) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: 'Unauthorized - Please sign in to submit onboarding'
    //   })
    // }

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
    
    // Prepare data for insertion
    const submissionData = {
      user_id: userId,
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
      status: 'submitted'
    }

    const { data, error } = await supabase
      .from('onboarding_submissions')
      .insert(submissionData)
      .select()
      .single()

    if (error) {
      console.error('[Onboarding Submit] Database error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to save onboarding: ${error.message}`
      })
    }

    console.log('[Onboarding Submit] Success:', data.id)

    return {
      success: true,
      id: data.id,
      message: 'Onboarding submitted successfully'
    }
  } catch (error: any) {
    console.error('[Onboarding Submit] Error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to submit onboarding'
    })
  }
})
