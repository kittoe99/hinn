<template>
  <div class="relative overflow-hidden scroll-smooth bg-[#f9f8f6]">
    <!-- Hero Section -->
    <section class="relative pt-16 pb-20 md:pt-24 md:pb-24">
      <!-- Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 right-10 w-96 h-96 bg-[#d97759]/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-[#d97759]/3 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-5xl mx-auto px-6 lg:px-8 relative">
        <div class="text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-neutral-200 mb-6 opacity-0 animate-fade-in" style="animation-delay: 0ms">
            <span class="inline-block w-2 h-2 rounded-full bg-[#d97759] animate-pulse"></span>
            <span class="text-sm font-medium text-neutral-700">Trusted by 500+ companies</span>
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05] opacity-0 animate-fade-in mb-6" style="animation-delay: 50ms">
            Build, launch, and
            <span class="block mt-2">
              <span :class="['typewriter-word text-[#d97759]', { 'flipping': isFlipping }]">{{ currentWord }}</span> faster
            </span>
          </h1>
          
          <p class="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in mb-8" style="animation-delay: 100ms">
            Build professional websites with AI and print your images on premium canvas—all in one place.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in mb-16" style="animation-delay: 150ms">
            <NuxtLink
              to="/dashboard"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Building
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Website Showcase Grid -->
          <div class="opacity-0 animate-fade-in" style="animation-delay: 200ms">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-semibold text-neutral-900">From the Community</h3>
                <p class="text-sm text-neutral-600">Explore what the community is building</p>
              </div>
              <button class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Browse All →
              </button>
            </div>
            
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <!-- Card 1 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-50 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80" 
                    alt="SaaS Landing Page"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <!-- View Details Button -->
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">SaaS Landing Page</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Technology</span>
                    <span>•</span>
                    <span>Landing Page</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Nov 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" 
                    alt="Photography Portfolio"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">Photography Portfolio</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Creative</span>
                    <span>•</span>
                    <span>Portfolio</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Oct 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80" 
                    alt="AI Gateway Starter"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">AI Gateway Starter</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>AI & Tech</span>
                    <span>•</span>
                    <span>Dashboard</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Nov 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 4 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-800 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80" 
                    alt="AI Agents Dashboard"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">AI Agents Dashboard</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Enterprise</span>
                    <span>•</span>
                    <span>Analytics</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Oct 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 5 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" 
                    alt="Marketing Analytics"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">Marketing Analytics</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Marketing</span>
                    <span>•</span>
                    <span>Dashboard</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Sep 2024</span>
                  </div>
                </div>
              </div>

              <!-- Card 6 -->
              <div class="group relative rounded-xl overflow-hidden bg-[#e8e3d8] hover:bg-[#ded9cc] transition-all duration-300">
                <div class="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80" 
                    alt="Brand Studio"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors"></div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-neutral-900 mb-1 text-left">Brand Studio</h4>
                  <div class="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Design</span>
                    <span>•</span>
                    <span>Branding</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">Nov 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 md:py-32">
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-4">Everything you need to succeed online</h2>
          <p class="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Professional websites built with AI, designed to convert visitors into customers—all in one subscription
          </p>
        </div>

        <!-- Feature Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Feature 1 -->
          <div class="p-6 rounded-2xl bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mb-4">
              <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">AI-Powered Design</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">Custom designs generated by AI, tailored to your brand and industry in minutes</p>
          </div>

          <!-- Feature 2 -->
          <div class="p-6 rounded-2xl bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mb-4">
              <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Lightning Fast</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">Launch in days, not months. Optimized for speed and performance out of the box</p>
          </div>

          <!-- Feature 3 -->
          <div class="p-6 rounded-2xl bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mb-4">
              <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">SEO Optimized</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">Built-in SEO best practices to help you rank higher and get discovered</p>
          </div>

          <!-- Feature 4 - Hidden on mobile initially -->
          <div :class="['p-6 rounded-2xl bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all', showMoreFeatures ? 'block' : 'hidden md:block']">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mb-4">
              <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Mobile First</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">Responsive designs that look perfect on every device, from phone to desktop</p>
          </div>

          <!-- Feature 5 - Hidden on mobile initially -->
          <div :class="['p-6 rounded-2xl bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all', showMoreFeatures ? 'block' : 'hidden md:block']">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mb-4">
              <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Continuous Updates</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">Monthly updates and improvements included. Your site stays fresh and secure</p>
          </div>

          <!-- Feature 6 - Hidden on mobile initially -->
          <div :class="['p-6 rounded-2xl bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all', showMoreFeatures ? 'block' : 'hidden md:block']">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mb-4">
              <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Analytics & Insights</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">Track visitors, conversions, and performance with built-in analytics</p>
          </div>
        </div>

        <!-- Show More Button - Only visible on mobile -->
        <div v-if="!showMoreFeatures" class="mt-8 text-center md:hidden">
          <button
            @click="showMoreFeatures = true"
            class="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-neutral-900 bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all"
          >
            <span>Show More Features</span>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- CTA -->
        <div class="mt-16 text-center">
          <NuxtLink
            to="/website"
            class="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore All Features
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Canvas Printing Section -->
    <section class="py-20 md:py-32 bg-white">
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-4">Canvas Printing</h2>
          <p class="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Turn your generated or uploaded images into gallery‑quality canvas prints. Premium materials, vivid colors, fast delivery.
          </p>
        </div>

        <!-- Canvas Features Grid -->
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <!-- Canvas Feature 1 -->
          <div class="p-6 rounded-2xl bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mb-4">
              <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Upload or Generate</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">Print AI-generated images or upload your own photos. Any image, any size.</p>
          </div>

          <!-- Canvas Feature 2 -->
          <div class="p-6 rounded-2xl bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mb-4">
              <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Premium Quality</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">Museum-grade canvas, archival inks, and hand-stretched frames for lasting beauty.</p>
          </div>

          <!-- Canvas Feature 3 -->
          <div class="p-6 rounded-2xl bg-[#f0ebe3] hover:bg-[#e8e3d8] transition-all">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10 mb-4">
              <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Fast Delivery</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">Printed and shipped within days. Track your order every step of the way.</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center">
          <NuxtLink
            to="/canvas-printing"
            class="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Canvas Printing
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-24 relative overflow-hidden bg-[#f0ebe3] rounded-3xl mx-6 lg:mx-8 mb-12">
      <div class="max-w-6xl mx-auto px-8 lg:px-12">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <!-- Left Column: Heading and CTA -->
          <div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 leading-tight">
              Ready to transform your digital presence?
            </h2>
            <p class="text-lg text-neutral-700 mb-8 leading-relaxed">
              Join hundreds of companies building faster with AI-powered tools
            </p>
            <NuxtLink
              to="/dashboard"
              class="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-300"
            >
              Get Started Free
            </NuxtLink>
          </div>

          <!-- Right Column: Links -->
          <div class="space-y-1">
            <div class="text-sm font-medium text-neutral-600 mb-4">Learn more</div>
            <NuxtLink
              to="/website"
              class="group flex items-center justify-between py-4 border-b border-neutral-300 hover:border-neutral-400 transition-colors"
            >
              <span class="text-lg font-medium text-neutral-900">Build professional websites</span>
              <svg class="w-5 h-5 text-neutral-900 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/canvas-printing"
              class="group flex items-center justify-between py-4 border-b border-neutral-300 hover:border-neutral-400 transition-colors"
            >
              <span class="text-lg font-medium text-neutral-900">Print your art on canvas</span>
              <svg class="w-5 h-5 text-neutral-900 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Page-level SEO inherits from global nuxt.config.ts
// No need to override unless this page needs different meta

// Typewriter effect with flip transition
const words = ['scale', 'grow', 'innovate', 'succeed']
const currentWord = ref(words[0])
let wordIndex = 0
let charIndex = words[0].length
let isTyping = true
let typewriterTimeout = null
const isFlipping = ref(false)

const typeWriter = () => {
  const currentFullWord = words[wordIndex]
  
  if (isTyping) {
    currentWord.value = currentFullWord.substring(0, charIndex + 1)
    charIndex++
    
    if (charIndex === currentFullWord.length) {
      // Word complete, pause then flip to next word
      typewriterTimeout = setTimeout(() => {
        isFlipping.value = true
        setTimeout(() => {
          wordIndex = (wordIndex + 1) % words.length
          charIndex = 0
          currentWord.value = ''
          isFlipping.value = false
          typewriterTimeout = setTimeout(typeWriter, 100)
        }, 600) // Flip animation duration
      }, 2500) // Pause before flip
      return
    }
    
    typewriterTimeout = setTimeout(typeWriter, 120)
  }
}

onMounted(() => {
  // First word is already shown, wait then start the flip cycle
  setTimeout(() => {
    // Trigger flip to second word after pause
    isFlipping.value = true
    setTimeout(() => {
      wordIndex = 1
      charIndex = 0
      currentWord.value = ''
      isFlipping.value = false
      typewriterTimeout = setTimeout(typeWriter, 100)
    }, 600) // Flip animation duration
  }, 3500) // Pause on first word before starting animation
})

onUnmounted(() => {
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout)
  }
})

const subscriptionProducts = [
  {
    title: 'Websites',
    description: 'AI-powered websites that sell and book on autopilot. Built-in sales automation, lead qualification, and appointment booking—all working 24/7.',
    href: '/website',
    cta: 'Explore Websites',
    tags: ['AI site builder', 'Sales automation', 'Lead qualification', 'Auto-booking'],
    image: '/website-v2.png',
    delay: 0
  }
]
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.typewriter-word {
  display: inline;
  will-change: opacity;
  -webkit-font-smoothing: antialiased;
}

.typewriter-word.flipping {
  animation: fadeOut 0.4s ease-in-out;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

</style>

