export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  // Check all possible environment variable variations
  const envCheck = {
    // Direct process.env check
    processEnv: {
      NUXT_PUBLIC_SUPABASE_URL: process.env.NUXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
      NUXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
      NUXT_SUPABASE_SERVICE_ROLE_KEY: process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
    },
    
    // Runtime config check (what Nuxt sees)
    runtimeConfig: {
      supabaseUrl: config.public?.supabaseUrl ? 'SET' : 'NOT SET',
      supabaseAnonKey: config.public?.supabaseAnonKey ? 'SET' : 'NOT SET',
      supabaseServiceRoleKey: config.supabaseServiceRoleKey ? 'SET' : 'NOT SET',
    },
    
    // Show what keys are available
    availableConfigKeys: {
      root: Object.keys(config).filter(k => k !== 'public' && k !== 'app'),
      public: config.public ? Object.keys(config.public) : []
    },
    
    // Check for common misspellings
    commonMistakes: {
      SUPABASE_URL: process.env.SUPABASE_URL ? 'FOUND (missing NUXT_PUBLIC_ prefix!)' : 'not found',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'FOUND (missing NUXT_PUBLIC_ prefix!)' : 'not found',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'FOUND (missing NUXT_ prefix!)' : 'not found',
    },
    
    // Show actual values (first 20 chars only for security)
    partialValues: {
      url: config.public?.supabaseUrl?.substring(0, 30) || 'MISSING',
      anonKey: config.public?.supabaseAnonKey?.substring(0, 30) || 'MISSING',
      serviceKey: config.supabaseServiceRoleKey?.substring(0, 30) || 'MISSING',
    }
  }
  
  return envCheck
})
