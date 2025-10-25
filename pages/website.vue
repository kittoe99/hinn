<template>
  <div class="pb-16 md:pb-24">
    <!-- Hero Section -->
    <section class="relative pt-16 md:pt-24 pb-12 border-b border-neutral-200 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-neutral-50/50 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="relative grid gap-8 md:gap-10 md:grid-cols-2 md:items-center">
          <header>
            <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
              <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-600"></span>
              Website Development
            </div>
            <h1 class="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
              Your website, built & managed monthly
            </h1>
            <p class="mt-6 text-lg md:text-xl text-neutral-600 leading-relaxed">
              One monthly fee. Fully managed. We design, build, host, and maintain your site—so you can focus on your business.
            </p>
          </header>
          <div class="flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
              alt="Design team collaborating on a website project"
              class="w-full max-w-md md:max-w-lg aspect-[4/3] object-cover rounded-xl border border-neutral-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- What's Included -->
    <section class="pt-16 md:pt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900">Everything included, one monthly price</h2>
          <p class="mt-4 text-lg text-neutral-600">
            No surprises. No extra fees. Cancel anytime.
          </p>
        </div>

        <div class="mt-12 grid md:grid-cols-2 gap-6">
          <div v-for="(item, index) in included" :key="item.title" class="group relative rounded-lg border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-600 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="flex items-start gap-4">
              <div class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                </svg>
              </div>
              <div class="relative">
                <h3 class="text-lg font-semibold text-neutral-900">{{ item.title }}</h3>
                <p class="mt-2 text-base text-neutral-600 leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="pt-16 md:pt-20 bg-neutral-50">
      <div class="max-w-6xl mx-auto px-4 lg:px-6 py-16">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900">Fully managed, no tech skills needed</h2>
          <p class="mt-4 text-lg text-neutral-600">
            We handle the technical details so you don't have to.
          </p>
        </div>
        
        <div class="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(feature, index) in features" :key="feature.title" class="group rounded-lg border border-neutral-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-600">
            <div class="flex items-start gap-3">
              <div class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border border-blue-200 bg-blue-50 text-blue-700 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-semibold text-neutral-900">{{ feature.title }}</h3>
                <p class="mt-1 text-sm text-neutral-600">{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    

    <!-- How it works -->
    <section class="pt-16 md:pt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <header class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900">How it works</h2>
          <p class="mt-3 text-base text-neutral-600">Subscribe, share your vision, and we'll handle the rest.</p>
          <div class="mt-5 flex flex-wrap justify-center gap-2">
            <span v-for="chip in operatingCommitments" :key="chip" class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clip-rule="evenodd"/></svg>
              {{ chip }}
            </span>
          </div>
        </header>

        <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="(stage, index) in operatingStages" :key="stage.title" class="group rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-600">
            <div class="flex items-center justify-between">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 text-sm font-bold text-blue-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">{{ stage.phase }}</span>
              <span class="text-xs uppercase tracking-wide text-neutral-500">{{ stage.label }}</span>
            </div>
            <h3 class="mt-3 text-sm font-semibold text-neutral-900">{{ stage.title }}</h3>
            <p class="mt-2 text-sm text-neutral-600">{{ stage.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Add-ons -->
    <section class="pt-16 md:pt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-8">
          <h3 class="text-2xl md:text-3xl font-semibold text-neutral-900">Optional add‑ons</h3>
          <p class="mt-2 text-sm text-neutral-600">Upgrade your plan with these extras.</p>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(addon, index) in addons" :key="addon.title" class="group rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-600">
            <div class="flex items-start gap-3">
              <div class="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" :d="addon.icon"/></svg>
              </div>
              <div>
                <h4 class="text-base font-semibold text-neutral-900">{{ addon.title }}</h4>
                <p class="mt-1 text-sm text-neutral-600">{{ addon.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- CTA -->
    <section class="pt-16 md:pt-20">
      <div class="max-w-4xl mx-auto px-4 lg:px-6">
        <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-8 md:p-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900">Ready to launch your site?</h2>
          <p class="mt-4 text-lg text-neutral-600 max-w-2xl">
            Subscribe today and we'll start building this week. No contracts, cancel anytime.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink 
              to="/get-started"
              class="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3 text-base font-semibold text-white transition hover:bg-neutral-800"
            >
              Get Started
            </NuxtLink>
            <NuxtLink 
              to="/contact"
              class="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-8 py-3 text-base font-semibold text-blue-700 transition hover:bg-blue-100 hover:border-blue-300"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Website Development Services | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Professional website development services. Modern, fast, and built to convert.'
    }
  ]
})

const included = [
  {
    title: 'Custom Design',
    desc: 'We design your site from scratch—tailored to your brand. Mobile-first and conversion-optimized.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    title: 'Built & Deployed',
    desc: 'We handle all development and launch. Fast, secure, and built to scale as you grow.',
    icon: 'M4 7h16M4 12h12M4 17h8'
  },
  {
    title: 'SEO & Analytics',
    desc: 'Built-in SEO, tracking, and insights. We optimize for search engines so customers find you.',
    icon: 'M5 12h14M12 5l7 7-7 7'
  },
  {
    title: 'Hosting & Maintenance',
    desc: 'Hosting, security, backups, and updates—all managed for you. No technical work required.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  }
]

 

const features = [
  {
    title: 'Responsive Design',
    desc: 'Works perfectly on all devices and screen sizes',
    icon: 'M4 7h16M4 12h12M4 17h8'
  },
  {
    title: 'Fast Performance',
    desc: 'Optimized for speed and user experience',
    icon: 'M12 6v12m6-6H6'
  },
  {
    title: 'Content Management',
    desc: 'Easy-to-use CMS for quick updates',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343'
  },
  {
    title: 'Lead Capture',
    desc: 'Contact forms and conversion tools',
    icon: 'M5 13l4 4L19 7'
  },
  {
    title: 'Analytics',
    desc: 'Track visitors and measure success',
    icon: 'M4 7v6a5 5 0 005 5h7m4-4V8a5 5 0 00-5-5H8'
  },
  {
    title: 'Security',
    desc: 'SSL certificates and regular updates',
    icon: 'M9 5v2a2 2 0 002 2h2a2 2 0 002-2V5m-2 6v7m-6-7v7'
  },
  {
    title: 'Backups',
    desc: 'Automatic daily backups included',
    icon: 'M12 6v12m6-6H6'
  },
  {
    title: 'Support',
    desc: '24/7 technical support and maintenance',
    icon: 'M9 12l2 2 4-4'
  },
  {
    title: 'SEO Ready',
    desc: 'Optimized for search engines',
    icon: 'M5 12h14M12 5l7 7-7 7'
  }
]

// How it works (matches Agents page pattern)
const operatingCommitments = [
  'Cancel anytime',
  'Unlimited revisions',
  'Weekly updates'
]

const operatingStages = [
  { phase: '01', label: 'Subscribe', title: 'Pick your plan', detail: 'Choose monthly or annual. Cancel anytime.' },
  { phase: '02', label: 'Kickoff', title: 'Share your vision', detail: 'Tell us about your brand and goals in a quick call.' },
  { phase: '03', label: 'Build', title: 'We design & build', detail: 'Sit back while we create your site. Review drafts weekly.' },
  { phase: '04', label: 'Launch', title: 'Go live & iterate', detail: 'We launch, monitor, and improve based on your feedback.' }
]

// Add-ons cards
const addons = [
  { title: 'AI Agents', desc: 'Autonomous agents for customer support, lead qualification, and sales automation.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'Marketing', desc: 'Email campaigns, social media management, and content strategy.', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
  { title: 'Branding', desc: 'Logo design, brand guidelines, and complete visual identity system.', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' }
]

const process = [
  {
    title: 'Discovery',
    desc: 'We learn about your business, goals, and target audience to create the perfect strategy.'
  },
  {
    title: 'Design',
    desc: 'Create beautiful mockups and get your approval before we start building.'
  },
  {
    title: 'Development',
    desc: 'Build your website with modern technology, optimized for speed and conversions.'
  },
  {
    title: 'Launch',
    desc: 'Deploy your site and provide training on how to manage your content.'
  }
]
</script>
