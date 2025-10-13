import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazily initialize the Supabase client so module evaluation does not throw during
// build when env vars are absent in that environment.
let _supabase: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase

  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string | undefined
  const supabaseAnonKey = config.public.supabaseAnonKey as string | undefined

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase env vars: set NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_ANON_KEY in .env'
    )
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}

// Backwards-compatible default export: behaves like a Supabase client but only
// initializes when actually used. This avoids throwing at import time.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, _receiver) {
    const client = getSupabaseClient() as any
    return client[prop]
  },
}) as SupabaseClient
