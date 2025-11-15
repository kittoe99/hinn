import { defineEventHandler, readBody, createError } from 'h3'
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

    const body = await readBody(event)
    const { websiteId, messages, title, chatId } = body

    if (!websiteId) {
      throw createError({
        statusCode: 400,
        message: 'websiteId is required'
      })
    }

    if (!messages || !Array.isArray(messages)) {
      throw createError({
        statusCode: 400,
        message: 'messages array is required'
      })
    }

    // If chatId is provided, update existing chat
    if (chatId) {
      const { data: chat, error } = await supabase
        .from('chats')
        .update({
          messages: messages,
          title: title || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', chatId)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('[Chats] Update error:', error)
        throw createError({
          statusCode: 500,
          message: 'Failed to update chat'
        })
      }

      return {
        success: true,
        chat
      }
    }

    // Otherwise, create new chat
    const { data: chat, error } = await supabase
      .from('chats')
      .insert({
        website_id: websiteId,
        user_id: user.id,
        messages: messages,
        title: title || null
      })
      .select()
      .single()

    if (error) {
      console.error('[Chats] Create error:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to create chat'
      })
    }

    return {
      success: true,
      chat
    }
  } catch (error: any) {
    console.error('[Chats] Post error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to save chat'
    })
  }
})
