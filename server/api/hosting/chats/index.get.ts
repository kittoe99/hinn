import { defineEventHandler, getQuery, createError } from 'h3'
import { getSupabaseServer } from '~/lib/supabaseServer'

export default defineEventHandler(async (event) => {
  try {
    const supabase = getSupabaseServer()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    const query = getQuery(event)
    const websiteId = query.websiteId as string

    if (!websiteId) {
      throw createError({
        statusCode: 400,
        message: 'websiteId is required'
      })
    }

    // Fetch chats for this website
    const { data: chats, error } = await supabase
      .from('chats')
      .select('*')
      .eq('website_id', websiteId)
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('[Chats] Fetch error:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch chats'
      })
    }

    return {
      success: true,
      chats: chats || []
    }
  } catch (error: any) {
    console.error('[Chats] Get error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to get chats'
    })
  }
})
