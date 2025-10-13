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
    supabaseServiceRoleKey: '',
    
    // Public keys (exposed to client)
    public: {
      supabaseUrl: '',
      supabaseAnonKey: '',
    }
  }
})
