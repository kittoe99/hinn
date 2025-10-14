export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  return {
    runtimeConfig: {
      hasPublic: !!config.public,
      hasSupabase: !!config.supabase,
      publicKeys: config.public ? Object.keys(config.public) : [],
      supabaseKeys: config.supabase ? Object.keys(config.supabase) : [],
      publicSupabase: config.public?.supabase ? Object.keys(config.public.supabase) : [],
    },
    envVars: {
      NUXT_PUBLIC_SUPABASE_URL: !!process.env.NUXT_PUBLIC_SUPABASE_URL,
      NUXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      NUXT_SUPABASE_SERVICE_ROLE_KEY: !!process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY,
    },
    values: {
      url: config.public?.supabase?.url ? 'SET' : 'NOT SET',
      key: config.public?.supabase?.key ? 'SET' : 'NOT SET',
      serviceKey: config.supabase?.serviceKey ? 'SET' : 'NOT SET',
    }
  }
})
