export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  return {
    runtimeConfig: {
      hasPublic: !!config.public,
      publicKeys: config.public ? Object.keys(config.public) : [],
      privateKeys: Object.keys(config).filter(k => k !== 'public' && k !== 'app'),
    },
    envVars: {
      NUXT_PUBLIC_SUPABASE_URL: !!process.env.NUXT_PUBLIC_SUPABASE_URL,
      NUXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      NUXT_SUPABASE_SERVICE_ROLE_KEY: !!process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY,
    },
    values: {
      supabaseUrl: config.public?.supabaseUrl ? 'SET' : 'NOT SET',
      supabaseAnonKey: config.public?.supabaseAnonKey ? 'SET' : 'NOT SET',
      supabaseServiceRoleKey: config.supabaseServiceRoleKey ? 'SET' : 'NOT SET',
    }
  }
})
