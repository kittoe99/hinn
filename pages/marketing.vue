<template>
  <div class="min-h-screen bg-[#f5f3ef]">
    <!-- Hero -->
    <section class="pt-20 pb-16 md:pt-32 md:pb-24 relative">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#d97759]/5 rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
              Marketing that drives results
            </h1>
            <p class="mt-6 text-lg text-neutral-600 leading-relaxed">
              Email campaigns, social media, and content strategy—all managed monthly.
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
              src="/marketing-v2.png" 
              alt="Marketing & Branding Tools"
              class="w-full h-auto rounded-2xl shadow-2xl border border-neutral-200"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-16 md:py-24">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 mb-3">What's included</h2>
          <p class="text-base text-neutral-600">
            Complete marketing services in one subscription.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="service in services" :key="service.title" class="bg-[#e8e3d8] hover:bg-[#ded9cc] rounded-2xl p-6 transition-all">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d97759]/10 mb-4">
              <svg class="h-5 w-5 text-[#d97759]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" :d="service.icon" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-neutral-900 mb-2">{{ service.title }}</h3>
            <p class="text-sm text-neutral-600">{{ service.desc }}</p>
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
              Ready to amplify your reach?
            </h2>
            <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
              Launch data-driven marketing campaigns that convert visitors into customers and grow your business.
            </p>
            <NuxtLink 
              to="/dashboard"
              class="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all"
            >
              Start Your Campaign
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Right: Quick Links -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-6">Marketing Services</h3>
            <NuxtLink to="/dashboard" class="group flex items-center justify-between p-4 rounded-xl bg-white hover:bg-neutral-50 transition-all">
              <span class="text-base font-medium text-neutral-900">SEO Optimization</span>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/dashboard" class="group flex items-center justify-between p-4 rounded-xl bg-white hover:bg-neutral-50 transition-all">
              <span class="text-base font-medium text-neutral-900">Content Marketing</span>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/dashboard" class="group flex items-center justify-between p-4 rounded-xl bg-white hover:bg-neutral-50 transition-all">
              <span class="text-base font-medium text-neutral-900">Social Media Ads</span>
              <svg class="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/dashboard" class="group flex items-center justify-between p-4 rounded-xl bg-white hover:bg-neutral-50 transition-all">
              <span class="text-base font-medium text-neutral-900">Email Campaigns</span>
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
  title: 'Marketing Services | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Email campaigns, social media, and content strategy managed monthly.'
    }
  ]
})

const services = [
  {
    title: 'Email Marketing',
    desc: 'Campaigns, automation, and list management.',
    icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
  },
  {
    title: 'Social Media',
    desc: 'Content creation and community management.',
    icon: 'M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
  },
  {
    title: 'Content Strategy',
    desc: 'Blog posts, guides, and SEO optimization.',
    icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
  },
  {
    title: 'Paid Advertising',
    desc: 'Google Ads, Facebook, and retargeting campaigns.',
    icon: 'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46'
  },
  {
    title: 'Analytics & Reporting',
    desc: 'Track performance and ROI across all channels.',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
  },
  {
    title: 'Brand Strategy',
    desc: 'Positioning, messaging, and visual identity.',
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
  }
]

</script>

