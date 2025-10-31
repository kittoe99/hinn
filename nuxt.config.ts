// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Hinn - Professional Web Services',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional websites, AI agents, and marketing services' }
      ]
    }
  },
  runtimeConfig: {
    // Private keys (server-side only)
    // Nuxt automatically maps NUXT_SUPABASE_SERVICE_ROLE_KEY to supabaseServiceRoleKey
    supabaseServiceRoleKey: '',
    openaiApiKey: process.env.OPENAI_API_KEY || process.env.NUXT_OPENAI_API_KEY || '',
    
    // Public keys (exposed to client)
    // Nuxt automatically maps NUXT_PUBLIC_SUPABASE_URL to public.supabaseUrl
    public: {
      supabaseUrl: '',
      supabaseAnonKey: ''
    }
  }
})
