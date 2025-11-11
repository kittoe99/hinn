import { createClient } from '@supabase/supabase-js'

let supabaseClient = null

export const useSupabaseClient = () => {
  if (supabaseClient) return supabaseClient

  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl || process.env.NUXT_PUBLIC_SUPABASE_URL
  const supabaseKey = config.public.supabaseAnonKey || process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key not configured')
    return null
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey)
  return supabaseClient
}

export const useSupabaseUser = () => {
  const supabase = useSupabaseClient()
  const user = useState('supabase-user', () => null)

  if (process.client && supabase) {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      user.value = session?.user ?? null
    })

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user ?? null
    })
  }

  return user
}
