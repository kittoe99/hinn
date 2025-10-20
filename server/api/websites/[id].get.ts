import { getSupabaseServer } from '~/lib/supabaseServer'
import { getSupabaseClient } from '~/lib/supabaseClient'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Website ID is required'
      })
    }

    // Get auth header from request
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    // Verify user session with client
    const clientSupabase = getSupabaseClient()
    const { data: { user }, error: authError } = await clientSupabase.auth.getUser(authHeader.replace('Bearer ', ''))
    
    if (authError || !user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired token'
      })
    }

    // Use server client to bypass RLS for data fetching
    const supabase = getSupabaseServer()

    // Fetch website first
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('*')
      .eq('id', id)
      .single()

    if (websiteError) {
      throw createError({
        statusCode: 404,
        message: `Website not found: ${websiteError.message}`
      })
    }

    // Fetch linked onboarding submission if exists
    let submission = null
    console.log('Website onboarding_submission_id:', website.onboarding_submission_id)
    
    if (website.onboarding_submission_id) {
      const { data: onboardingData, error: onboardingError } = await supabase
        .from('onboarding_submissions')
        .select('*')
        .eq('id', website.onboarding_submission_id)
        .single()
      
      console.log('Onboarding fetch error:', onboardingError)
      console.log('Onboarding data:', onboardingData ? 'Found' : 'Not found')
      
      if (!onboardingError && onboardingData) {
        submission = onboardingData
      }
    } else {
      console.log('No onboarding_submission_id on website')
    }

    // Transform onboarding submission data to match requested JSON structure
    console.log('Submission object:', submission)
    console.log('Creating structured data...')
    
    const structuredData = submission ? {
      business_name: submission.business_name || '',
      business_type: submission.site_type || '',
      category: submission.category || '',
      description: submission.description || '',
      contact_info: {
        email: submission.business_email || '',
        phone: submission.business_phone || '',
        preferred_contact_method: submission.contact_method || ''
      },
      services: submission.selected_services || [],
      service_area: {
        primary_location: submission.service_areas?.[0]?.displayName || submission.service_areas?.[0]?.name || '',
        radius_km: submission.service_areas?.[0]?.radiusKm || '',
        coverage_type: submission.coverage_type || ''
      },
      operation_details: {
        on_site_mode: submission.on_site_mode || '',
        business_hours: submission.business_hours_mode || ''
      },
      website_info: {
        has_current_website: submission.has_current_website || false,
        current_website_url: submission.current_website_url || '',
        primary_goal: submission.primary_goal || ''
      },
      design_preferences: {
        styles: submission.design_styles || [],
        emotional_impact: submission.emotional_impact || [],
        color_theme: submission.color_theme || '',
        brand_colors: submission.brand_colors || '',
        high_contrast: submission.high_contrast || false,
        has_logo: submission.has_logo || false,
        inspiration_sites: submission.inspiration_sites || ''
      },
      language: submission.primary_language || '',
      languages: submission.languages || [],
      additional_notes: submission.additional_notes || '',
      envisioned_pages: submission.envisioned_pages || [],
      status: submission.status || 'submitted',
      created_at: submission.created_at,
      updated_at: submission.updated_at
    } : null

    console.log('Structured data created:', structuredData ? 'YES' : 'NULL')
    console.log('Returning response with onboarding_data:', !!structuredData)

    return {
      success: true,
      website: {
        id: website.id,
        name: website.name,
        slug: website.slug,
        domain: website.domain,
        custom_domain: website.custom_domain,
        status: website.status,
        vercel_project_id: website.vercel_project_id,
        created_at: website.created_at,
        updated_at: website.updated_at,
        onboarding_data: structuredData
      }
    }
  } catch (err: any) {
    console.error('Error fetching website:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || 'Failed to fetch website'
    })
  }
})
