import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const {
      firstName,
      lastName,
      email,
      company,
      phone,
      interests,
      timeline,
      notes,
      message
    } = body

    console.log('[contact] Received submission:', { email, firstName, lastName })

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: firstName, lastName, email, and message are required'
      })
    }

    // Validate email format
    if (!email.includes('@')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // Get Supabase credentials directly from environment
    // This is more reliable than runtime config for server-side operations
    const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY
    
    console.log('[contact] Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseServiceKey,
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseServiceKey?.length || 0
    })
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[contact] Missing Supabase environment variables')
      console.error('[contact] NUXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
      console.error('[contact] NUXT_SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey)
      
      throw createError({
        statusCode: 500,
        statusMessage: `Supabase not configured. Missing: ${!supabaseUrl ? 'URL' : ''} ${!supabaseServiceKey ? 'Service Key' : ''}`
      })
    }
    
    console.log('[contact] Creating Supabase client...')
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Prepare data for insertion
    const contactData = {
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase().trim(),
      company: company || null,
      phone: phone || null,
      interests: interests || [],
      timeline: timeline || null,
      notes: notes || null,
      message: message,
      status: 'new',
      metadata: {
        submitted_at: new Date().toISOString(),
        full_name: `${firstName} ${lastName}`,
        user_agent: getHeader(event, 'user-agent'),
        ip: getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip'),
        referrer: getHeader(event, 'referer')
      }
    }

    console.log('[contact] Inserting into database...')

    // Insert into database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(contactData)
      .select()
      .single()

    if (error) {
      console.error('[contact] Database error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to save contact submission: ${error.message}`
      })
    }

    console.log('[contact] Submission saved successfully:', data.id)

    // TODO: Send email notification (optional)
    // await sendContactNotification(data)

    return {
      success: true,
      message: 'Thank you for contacting us! We\'ll get back to you within one business day.',
      submissionId: data.id
    }
  } catch (error: any) {
    console.error('[contact] Error:', error.message || error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to submit contact form'
    })
  }
})
