import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Server-side Supabase client using the service role key. Do NOT expose this key to the client.
// Lazy initialize to avoid crashing API route imports and return clearer JSON errors.
let _client: SupabaseClient | null = null

function init(): SupabaseClient {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string | undefined
  const serviceRoleKey = config.supabaseServiceRoleKey as string | undefined

  if (!supabaseUrl) {
    throw new Error('Missing NUXT_PUBLIC_SUPABASE_URL')
  }
  if (!serviceRoleKey) {
    throw new Error('Missing NUXT_SUPABASE_SERVICE_ROLE_KEY. Set it in your .env file')
  }
  return createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
}

export function getSupabaseServer(): SupabaseClient {
  if (_client) return _client
  _client = init()
  return _client
}
