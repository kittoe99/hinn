// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-simple-sitemap'],
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
      title: 'WPScanvas - AI-Powered Website Builder | Create Professional Websites in Minutes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'WPScanvas is an AI-powered website builder that helps you create stunning, professional websites in minutes. No coding required. Build, customize, and deploy with intelligent AI assistance.' },
        { name: 'keywords', content: 'AI website builder, website creator, no-code website, professional website design, AI web design, website builder tool, create website, WPScanvas' },
        { name: 'author', content: 'WPScanvas' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'WPScanvas - AI-Powered Website Builder' },
        { property: 'og:description', content: 'Create stunning professional websites in minutes with AI-powered tools. No coding required.' },
        { property: 'og:site_name', content: 'WPScanvas' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'WPScanvas - AI-Powered Website Builder' },
        { name: 'twitter:description', content: 'Create stunning professional websites in minutes with AI-powered tools. No coding required.' },
        { name: 'theme-color', content: '#d97759' }
      ],
      link: [
        { rel: 'canonical', href: 'https://wpscanvas.com' }
      ]
    }
  },
  site: {
    url: 'https://wpscanvas.com'
  },
  sitemap: {
    exclude: ['/dashboard', '/api/**']
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
