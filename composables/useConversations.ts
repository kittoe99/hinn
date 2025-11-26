import type { FileMap } from '~/types/builder'

export interface Message {
  id?: string
  conversation_id?: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at?: string
  metadata?: Record<string, any>
}

export interface Conversation {
  id: string
  user_id?: string
  title: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
  messages?: Message[]
}

export interface ProjectSnapshot {
  id?: string
  conversation_id: string
  message_id?: string
  files: FileMap
  created_at?: string
}

export const useConversations = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  /**
   * Create a new conversation
   */
  const createConversation = async (title: string, metadata?: Record<string, any>): Promise<Conversation | null> => {
    if (!user.value) {
      console.error('User not authenticated')
      return null
    }

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: user.value.id,
        title,
        metadata: metadata || {}
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating conversation:', error)
      return null
    }

    return data
  }

  /**
   * Get all conversations for the current user
   */
  const getConversations = async (): Promise<Conversation[]> => {
    if (!user.value) return []

    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user.value.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching conversations:', error)
      return []
    }

    return data || []
  }

  /**
   * Get a single conversation with all its messages
   */
  const getConversation = async (conversationId: string): Promise<Conversation | null> => {
    if (!user.value) return null

    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .eq('user_id', user.value.id)
      .single()

    if (convError) {
      console.error('Error fetching conversation:', convError)
      return null
    }

    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (msgError) {
      console.error('Error fetching messages:', msgError)
      return conversation
    }

    return {
      ...conversation,
      messages: messages || []
    }
  }

  /**
   * Add a message to a conversation
   */
  const addMessage = async (
    conversationId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
    metadata?: Record<string, any>
  ): Promise<Message | null> => {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role,
        content,
        metadata: metadata || {}
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding message:', error)
      return null
    }

    return data
  }

  /**
   * Save a project snapshot
   */
  const saveProjectSnapshot = async (
    conversationId: string,
    files: FileMap,
    messageId?: string
  ): Promise<ProjectSnapshot | null> => {
    const { data, error } = await supabase
      .from('project_snapshots')
      .insert({
        conversation_id: conversationId,
        message_id: messageId,
        files
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving project snapshot:', error)
      return null
    }

    return data
  }

  /**
   * Get the latest project snapshot for a conversation
   */
  const getLatestSnapshot = async (conversationId: string): Promise<ProjectSnapshot | null> => {
    const { data, error } = await supabase
      .from('project_snapshots')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error('Error fetching snapshot:', error)
      return null
    }

    return data
  }

  /**
   * Update conversation title
   */
  const updateConversationTitle = async (conversationId: string, title: string): Promise<boolean> => {
    const { error } = await supabase
      .from('conversations')
      .update({ title })
      .eq('id', conversationId)

    if (error) {
      console.error('Error updating conversation title:', error)
      return false
    }

    return true
  }

  /**
   * Delete a conversation and all its messages
   */
  const deleteConversation = async (conversationId: string): Promise<boolean> => {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId)

    if (error) {
      console.error('Error deleting conversation:', error)
      return false
    }

    return true
  }

  /**
   * Generate a smart title from the first user message
   */
  const generateTitle = (firstMessage: string): string => {
    const maxLength = 50
    const cleaned = firstMessage.trim().replace(/\s+/g, ' ')
    
    if (cleaned.length <= maxLength) {
      return cleaned
    }
    
    return cleaned.substring(0, maxLength).trim() + '...'
  }

  return {
    createConversation,
    getConversations,
    getConversation,
    addMessage,
    saveProjectSnapshot,
    getLatestSnapshot,
    updateConversationTitle,
    deleteConversation,
    generateTitle
  }
}
