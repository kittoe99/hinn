// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    // Exclude dev-only endpoints that pull large deps (@openai/codex-sdk, debug tooling)
    ignore: process.env.NODE_ENV === 'production' ? [
      'server/api/codex/agent.post.ts',
      'server/api/debug/**',
    ] : [],
    // Add CORS and timeout configuration for mobile compatibility
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    }
  },
  app: {
    head: {
      title: 'WPScanvas - AI-Powered Website Builder',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Build professional websites with AI-powered tools. Create, customize, and deploy stunning websites in minutes.' }
      ]
    }
  },
  runtimeConfig: {
    // Private keys (server-side only)
    // Nuxt automatically maps NUXT_SUPABASE_SERVICE_ROLE_KEY to supabaseServiceRoleKey
    supabaseServiceRoleKey: '',
    openaiApiKey: process.env.OPENAI_API_KEY || process.env.NUXT_OPENAI_API_KEY || '',
    githubToken: process.env.GITHUB_TOKEN || process.env.NUXT_GITHUB_TOKEN || '',
    
    // Public keys (exposed to client)
    // Nuxt automatically maps NUXT_PUBLIC_SUPABASE_URL to public.supabaseUrl
    public: {
      supabaseUrl: '',
      supabaseAnonKey: ''
    }
  }
})
