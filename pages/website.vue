<template>
  <div class="min-h-screen bg-[#f9f8f6]">
    <!-- Hero Section -->
    <section class="pt-20 pb-16 md:pt-32 md:pb-24 relative">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 right-10 w-72 h-72 bg-[#d97759]/5 rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
              Websites that convert
            </h1>
            <p class="mt-6 text-lg text-neutral-600 leading-relaxed">
              AI-powered sites that qualify leads and book appointments automatically.
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-4">
              <NuxtLink
                to="/dashboard"
                class="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
              >
                Get Started
                <span>&rarr;</span>
              </NuxtLink>
            </div>
          </div>
          <div class="relative">
            <img 
              src="/website-v2.png" 
              alt="Website Builder Interface"
              class="w-full h-auto rounded-2xl shadow-2xl border border-neutral-200"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 md:py-24">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 mb-3">What's included</h2>
          <p class="text-base text-neutral-600">
            Everything you need to convert visitors into customers.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(item, index) in features" :key="item.title" class="bg-[#e8e3d8] hover:bg-[#ded9cc] rounded-2xl p-6 transition-all">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d97759]/10 mb-4">
              <svg class="h-5 w-5 text-[#d97759]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor">
                <path v-if="index === 0" stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                <path v-else-if="index === 1" stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                <path v-else-if="index === 2" stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                <path v-else-if="index === 3" stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                <path v-else-if="index === 4" stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 2.25c-2.998 0-5.74 1.1-7.843 2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-neutral-900 mb-2">{{ item.title }}</h3>
            <p class="text-sm text-neutral-600">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-24 relative overflow-hidden bg-[#e8e3d8] rounded-3xl mx-6 lg:mx-8 mb-12">
      <div class="max-w-6xl mx-auto px-8 lg:px-12">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <!-- Left: Heading & CTA -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
              Ready to launch your website?
            </h2>
            <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
              Get a professional, conversion-optimized website designed and deployed in days, not months.
            </p>
            <NuxtLink 
              to="/dashboard"
              class="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all"
            >
              Start Your Website
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Right: Quick Links -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-6">Website Types</h3>
            <NuxtLink to="/dashboard" class="group flex items-center justify-between p-4 rounded-xl bg-white hover:bg-neutral-50 transition-all">
              <span class="text-base font-medium text-neutral-900">Landing Pages</span>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/dashboard" class="group flex items-center justify-between p-4 rounded-xl bg-white hover:bg-neutral-50 transition-all">
              <span class="text-base font-medium text-neutral-900">E-commerce Stores</span>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/dashboard" class="group flex items-center justify-between p-4 rounded-xl bg-white hover:bg-neutral-50 transition-all">
              <span class="text-base font-medium text-neutral-900">Corporate Websites</span>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/dashboard" class="group flex items-center justify-between p-4 rounded-xl bg-white hover:bg-neutral-50 transition-all">
              <span class="text-base font-medium text-neutral-900">Portfolio Sites</span>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
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
useHead({
  title: 'Website Development | Hinn',
  meta: [
    {
      name: 'description',
      content: 'AI-powered websites that convert visitors into customers.'
    }
  ]
})

const features = [
  {
    title: 'AI Builder',
    desc: 'Generate complete websites in minutes with AI.'
  },
  {
    title: 'Smart Chat',
    desc: 'AI chatbot qualifies leads and answers questions 24/7.'
  },
  {
    title: 'Auto Booking',
    desc: 'Visitors book appointments instantly through AI chat.'
  },
  {
    title: 'Analytics',
    desc: 'Track performance and get actionable insights.'
  },
  {
    title: 'Secure & Fast',
    desc: 'SSL certificates, backups, and optimized performance.'
  },
  {
    title: 'Responsive',
    desc: 'Perfect on all devices and screen sizes.'
  }
]

</script>

