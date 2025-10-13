import { getSupabaseClient } from '~/lib/supabaseClient'

export const useSupabase = () => {
  return getSupabaseClient()
}
