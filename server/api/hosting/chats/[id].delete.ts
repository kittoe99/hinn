import { defineEventHandler, getRouterParam, createError } from 'h3'
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

    const chatId = getRouterParam(event, 'id')

    if (!chatId) {
      throw createError({
        statusCode: 400,
        message: 'chatId is required'
      })
    }

    // Delete chat
    const { error } = await supabase
      .from('chats')
      .delete()
      .eq('id', chatId)
      .eq('user_id', user.id)

    if (error) {
      console.error('[Chats] Delete error:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to delete chat'
      })
    }

    return {
      success: true
    }
  } catch (error: any) {
    console.error('[Chats] Delete error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete chat'
    })
  }
})
