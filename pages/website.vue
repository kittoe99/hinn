<template>
  <div class="pb-12 md:pb-16">
    <!-- Hero -->
    <section class="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-subtle/40 via-white to-white" aria-hidden="true" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" aria-hidden="true" />
      
      <div class="relative max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 rounded-full bg-white border border-accent-subtle/60 px-4 py-1.5 text-xs font-semibold text-accent-primary shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Website Development
          </div>
          <h1 class="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Modern Websites That <span class="text-accent-primary">Drive Results</span>
          </h1>
          <p class="mt-6 text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Professional web design and development with React/Vue.js, SEO optimization, and managed hosting. Launch in 10 days.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button class="w-full sm:w-auto rounded-full bg-accent-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-primary/30 transition hover:bg-accent-focus hover:shadow-xl hover:shadow-accent-primary/40">
              Start your project
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline-block ml-2 h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="#plans"
              class="w-full sm:w-auto rounded-full border-2 border-neutral-300 bg-white px-8 py-4 text-base font-semibold text-primary transition hover:border-accent-primary hover:bg-accent-subtle/20"
            >
              View pricing
            </a>
          </div>
          
          <!-- Stats -->
          <div class="mt-16 grid grid-cols-3 gap-6 md:gap-8">
            <div class="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-6 shadow-sm">
              <div class="text-3xl md:text-4xl font-bold text-accent-primary">10 days</div>
              <p class="mt-2 text-sm text-secondary">Average launch time</p>
            </div>
            <div class="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-6 shadow-sm">
              <div class="text-3xl md:text-4xl font-bold text-accent-primary">99.9%</div>
              <p class="mt-2 text-sm text-secondary">Uptime guarantee</p>
            </div>
            <div class="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-6 shadow-sm">
              <div class="text-3xl md:text-4xl font-bold text-accent-primary">24/7</div>
              <p class="mt-2 text-sm text-secondary">Support available</p>
            </div>
          </div>
        </div>
        
        <!-- Visual Element -->
        <div class="mt-10 relative max-w-3xl mx-auto">
          <div class="rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
            <div class="aspect-[16/9] rounded-lg bg-gradient-to-br from-accent-subtle via-neutral-100 to-white flex items-center justify-center">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-10 w-10 mx-auto text-accent-primary">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <p class="mt-2 text-xs font-medium text-neutral-500">Website Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What's Included -->
    <section class="mt-16 md:mt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-12">
          <div class="text-xs uppercase tracking-wider text-tertiary">What's Included</div>
          <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Complete Website Package</h2>
          <p class="mt-3 text-base text-secondary max-w-2xl mx-auto">
            Everything you need to launch and grow your online presence.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="pillar in outcomePillars"
            :key="pillar.title"
            class="group rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent-primary hover:shadow-xl"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-subtle to-accent-subtle/50 text-accent-primary group-hover:from-accent-primary group-hover:to-accent-focus group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" :d="pillar.icon" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold text-primary">{{ pillar.title }}</h3>
            <p class="mt-2 text-sm text-secondary leading-relaxed">{{ pillar.desc }}</p>
            <ul v-if="pillar.features" class="mt-4 space-y-2">
              <li v-for="feature in pillar.features" :key="feature" class="flex items-start gap-2 text-sm text-neutral-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 mt-0.5 flex-shrink-0 text-accent-primary">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="mt-16 md:mt-20 bg-neutral-50 py-12 md:py-16">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-12">
          <div class="text-xs uppercase tracking-wider text-tertiary">Technology</div>
          <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Built with Modern Tech</h2>
          <p class="mt-3 text-base text-secondary max-w-2xl mx-auto">
            We use cutting-edge frameworks and tools to ensure your website is fast, secure, and scalable.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-all hover:border-accent-primary hover:shadow-md"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6 text-accent-primary">
                <path stroke-linecap="round" stroke-linejoin="round" :d="tech.icon" />
              </svg>
            </div>
            <h3 class="mt-4 text-sm font-semibold text-primary">{{ tech.name }}</h3>
            <p class="mt-1 text-xs text-secondary">{{ tech.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="mt-16 md:mt-20 bg-white py-12 md:py-16">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-12">
          <div class="text-xs uppercase tracking-wider text-tertiary">Our Process</div>
          <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">From Idea to Launch</h2>
          <p class="mt-3 text-base text-secondary max-w-2xl mx-auto">
            Our proven process ensures your website launches on time and exceeds expectations.
          </p>
        </div>
        <div class="relative">
          <!-- Timeline line -->
          <div class="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-primary to-transparent" aria-hidden="true" />
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
            <div
              v-for="(phase, index) in launchTimeline"
              :key="phase.title"
              class="text-center"
            >
              <div class="relative inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-focus text-lg md:text-xl font-bold text-white shadow-lg shadow-accent-primary/20 mb-4">
                {{ index + 1 }}
              </div>
              <h3 class="text-base md:text-lg font-semibold text-primary">{{ phase.title }}</h3>
              <p class="mt-2 text-sm text-secondary leading-relaxed">{{ phase.detail }}</p>
              <div v-if="phase.duration" class="mt-3 inline-flex items-center gap-1 rounded-full bg-accent-subtle px-3 py-1 text-xs font-medium text-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ phase.duration }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="mt-16 md:mt-20 bg-neutral-50 py-12 md:py-16">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-12">
          <div class="text-xs uppercase tracking-wider text-tertiary">Features</div>
          <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Powerful Features Included</h2>
          <p class="mt-3 text-base text-secondary max-w-2xl mx-auto">
            Every website comes packed with features to help you succeed online.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="feature in additionalFeatures"
            :key="feature.title"
            class="rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:border-accent-primary hover:shadow-md"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-semibold text-primary">{{ feature.title }}</h3>
                <p class="mt-1 text-sm text-secondary">{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- CTA -->
    <section class="mt-16 md:mt-20 bg-gradient-to-br from-neutral-900 to-neutral-800 py-16 md:py-20 text-white">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight">Ready to Launch?</h2>
        <p class="mt-4 text-lg text-neutral-300">
          Start your project today. No contracts, cancel anytime.
        </p>
        <div class="mt-8">
          <button class="rounded-full bg-white px-8 py-4 text-base font-semibold text-neutral-900 transition hover:bg-neutral-100">
            Get started now
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Custom Website Development Services | Responsive Web Design | Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Professional web design and development with React/Vue.js, headless CMS, SEO optimization, and managed hosting. Launch your custom website in 21 days with ongoing support.'
    }
  ]
})

const outcomePillars = [
  {
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    title: 'Design & UX',
    desc: 'Beautiful, conversion-focused designs that work seamlessly across all devices.',
    features: ['Custom design system', 'Mobile-first approach', 'User experience optimization']
  },
  {
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    title: 'Development',
    desc: 'Fast, modern websites built with React, Vue.js, and optimized for performance.',
    features: ['Clean, maintainable code', 'Lightning-fast load times', 'Cross-browser compatible']
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'SEO & Analytics',
    desc: 'Technical SEO, keyword optimization, and analytics to drive organic traffic.',
    features: ['On-page SEO optimization', 'Google Analytics setup', 'Performance monitoring']
  },
  {
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    title: 'Hosting & Support',
    desc: 'Managed cloud hosting with 99.9% uptime, security, and ongoing support.',
    features: ['SSL certificates included', 'Daily backups', '24/7 technical support']
  },
  {
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    title: 'Content Management',
    desc: 'Easy-to-use CMS that lets you update content without touching code.',
    features: ['Intuitive admin panel', 'Media library', 'Content scheduling']
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Security & Compliance',
    desc: 'Enterprise-grade security to protect your website and customer data.',
    features: ['HTTPS encryption', 'Regular security updates', 'GDPR compliant']
  }
]

const techStack = [
  { name: 'React / Vue.js', desc: 'Modern JavaScript frameworks', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { name: 'Tailwind CSS', desc: 'Utility-first CSS framework', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
  { name: 'Headless CMS', desc: 'Flexible content management', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' },
  { name: 'Vercel / AWS', desc: 'Cloud hosting platforms', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' }
]

const additionalFeatures = [
  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Contact Forms', desc: 'Custom forms with spam protection and email notifications.' },
  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Blog Integration', desc: 'Built-in blog functionality for content marketing and SEO.' },
  { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title: 'E-commerce Ready', desc: 'Integrate payment gateways and start selling online.' },
  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', title: 'Video Integration', desc: 'Embed videos from YouTube, Vimeo, or custom hosting.' },
  { icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', title: 'Live Chat', desc: 'Real-time customer support with chat widget integration.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Performance Optimization', desc: 'Lightning-fast load times with image optimization and caching.' }
]

const launchTimeline = [
  { title: 'Discovery', detail: 'We learn about your business, goals, and target audience.', duration: '2-3 days' },
  { title: 'Design', detail: 'Create beautiful mockups and get your approval before development.', duration: '3-5 days' },
  { title: 'Development', detail: 'Build your website with modern tech, optimized for speed and SEO.', duration: '5-7 days' },
  { title: 'Launch', detail: 'Deploy your site and provide training on managing your content.', duration: '1-2 days' }
]

const pricingTiers = [
  {
    segment: 'Starter',
    name: 'Basic',
    price: '$995',
    desc: 'Perfect for small businesses and startups.',
    features: ['Up to 5 pages', 'Mobile responsive', 'Basic SEO setup', 'Contact form', '30 days support']
  },
  {
    segment: 'Most Popular',
    name: 'Professional',
    price: '$1,995',
    desc: 'Best for growing businesses that need more features.',
    features: ['Up to 10 pages', 'CMS integration', 'Advanced SEO', 'Analytics setup', 'Blog functionality', '90 days support']
  },
  {
    segment: 'Enterprise',
    name: 'Custom',
    price: 'Custom',
    desc: 'For complex projects with custom requirements.',
    features: ['Unlimited pages', 'Custom features', 'E-commerce ready', 'API integrations', 'Priority support', 'Ongoing maintenance']
  }
]
</script>
