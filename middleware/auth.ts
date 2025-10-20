import { getSupabaseClient } from '~/lib/supabaseClient'

export default defineNuxtRouteMiddleware(async (to) => {
  // Run this check on client to avoid SSR false negatives (no persisted session on server)
  if (process.server) return
  const supabase = getSupabaseClient()
  const { data } = await supabase.auth.getSession()
  if (!data.session && to.path !== '/login' && to.path !== '/signup') {
    return navigateTo('/login')
  }
})
