export default defineEventHandler(async (event) => {
  return {
    supabase: {
      url: !!process.env.NUXT_PUBLIC_SUPABASE_URL,
      anonKey: !!process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceRoleKey: !!process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY
    },
    other: {
      firecrawl: !!process.env.FIRECRAWL_API_KEY,
      deepseek: !!process.env.DEEPSEEK_API_KEY
    }
  }
})
