// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
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
    supabase: {
      serviceKey: process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY || ''
    },
    
    // Public keys (exposed to client)
    public: {
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
        key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
      }
    }
  }
})
