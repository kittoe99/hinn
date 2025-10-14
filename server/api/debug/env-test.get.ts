export default defineEventHandler(async (event) => {
  // Check all possible ways environment variables might be accessed
  return {
    processEnv: {
      NUXT_PUBLIC_SUPABASE_URL: process.env.NUXT_PUBLIC_SUPABASE_URL ? 'SET (' + process.env.NUXT_PUBLIC_SUPABASE_URL.substring(0, 20) + '...)' : 'NOT SET',
      NUXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (length: ' + process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY.length + ')' : 'NOT SET',
      NUXT_SUPABASE_SERVICE_ROLE_KEY: process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY ? 'SET (length: ' + process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY.length + ')' : 'NOT SET',
    },
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('SUPABASE') || key.includes('supabase')),
    nodeEnv: process.env.NODE_ENV,
    platform: process.platform
  }
})
