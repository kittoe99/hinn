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
      title: 'WPS Canvas | Create Websites and Print Your Art on Canvas',
      titleTemplate: '%s | WPS Canvas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Create a website in minutes and turn images into gallery‑quality canvas prints with WPS Canvas. AI tools, easy publishing, fast delivery.' },
        { name: 'keywords', content: 'WPS Canvas, AI website builder, website creator, no-code website, professional website design, AI web design, website builder tool, create website, canvas printing, print canvas art' },
        { name: 'author', content: 'WPS Canvas' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'WPS Canvas | Create Websites and Print Your Art on Canvas' },
        { property: 'og:description', content: 'Create a website in minutes and turn images into gallery‑quality canvas prints with WPS Canvas. AI tools, easy publishing, fast delivery.' },
        { property: 'og:site_name', content: 'WPS Canvas' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'WPS Canvas | Create Websites and Print Your Art on Canvas' },
        { name: 'twitter:description', content: 'Create a website in minutes and turn images into gallery‑quality canvas prints with WPS Canvas. AI tools, easy publishing, fast delivery.' },
        { name: 'theme-color', content: '#d97759' }
      ],
      link: [
        { rel: 'canonical', href: 'https://wpscanvas.com' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'WPS Canvas',
            url: 'https://wpscanvas.com'
          })
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'WPS Canvas',
            url: 'https://wpscanvas.com'
          })
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Canvas Printing',
            brand: { '@type': 'Brand', name: 'WPS Canvas' },
            description: 'Print your generated or uploaded images on premium canvas.',
            url: 'https://wpscanvas.com'
          })
        }
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
    geminiApiKey: process.env.GEMINI_API_KEY || process.env.NUXT_GEMINI_API_KEY || '',
    
    // Public keys (exposed to client)
    // Nuxt automatically maps NUXT_PUBLIC_SUPABASE_URL to public.supabaseUrl
    public: {
      supabaseUrl: '',
      supabaseAnonKey: ''
    }
  }
})
