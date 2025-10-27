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

    // Fetch website with all onboarding data (now merged into websites table)
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

    console.log('Website fetched:', website.id)
    
    // Transform website data to match requested JSON structure
    // All onboarding fields are now directly on the website record
    const structuredData = {
      business_name: website.business_name || '',
      business_type: website.site_type || '',
      category: website.category || '',
      description: website.description || '',
      contact_info: {
        email: website.business_email || '',
        phone: website.business_phone || '',
        preferred_contact_method: website.contact_method || ''
      },
      services: website.selected_services || [],
      service_area: {
        primary_location: website.service_areas?.[0]?.displayName || website.service_areas?.[0]?.name || '',
        radius_km: website.service_areas?.[0]?.radiusKm || '',
        coverage_type: website.coverage_type || ''
      },
      operation_details: {
        on_site_mode: website.on_site_mode || '',
        business_hours: website.business_hours_mode || ''
      },
      website_info: {
        has_current_website: website.has_current_website || false,
        current_website_url: website.current_website_url || '',
        primary_goal: website.primary_goal || ''
      },
      design_preferences: {
        styles: website.design_styles || [],
        emotional_impact: website.emotional_impact || [],
        color_theme: website.color_theme || '',
        brand_colors: website.brand_colors || '',
        high_contrast: website.high_contrast || false,
        has_logo: website.has_logo || false,
        inspiration_sites: website.inspiration_sites || ''
      },
      language: website.primary_language || '',
      languages: website.languages || [],
      additional_notes: website.additional_notes || '',
      envisioned_pages: website.envisioned_pages || [],
      status: website.submission_status || 'submitted',
      created_at: website.created_at,
      updated_at: website.updated_at
    }

    console.log('Structured data created from website record')

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
