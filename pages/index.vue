<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20">
      <div class="absolute inset-0 bg-white" aria-hidden="true" />
      
      <div class="relative max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 rounded-full bg-white border border-accent-subtle/60 px-4 py-1.5 text-xs font-semibold text-accent-primary shadow-sm">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-accent-primary" />
            Pay monthly, cancel anytime
          </div>
          <h1 class="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Professional Website Design & Development <span class="text-accent-primary">on Monthly Subscription</span>
          </h1>
          <p class="mt-6 text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Custom web design, full-stack development, cloud hosting, and AI-powered marketing automation—all included in one predictable monthly plan.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <NuxtLink
              to="/get-started"
              class="w-full sm:w-auto rounded-full bg-accent-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-primary/30 transition hover:bg-accent-focus hover:shadow-xl hover:shadow-accent-primary/40"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline-block ml-2 h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <a
              href="#features"
              class="w-full sm:w-auto rounded-full border-2 border-neutral-300 bg-white px-8 py-4 text-base font-semibold text-primary transition hover:border-accent-primary hover:bg-accent-subtle/20"
            >
              Learn More
            </a>
          </div>
        </div>
        
        <!-- Hero Image -->
        <div class="mt-12 relative max-w-4xl mx-auto">
          <div class="rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-8 shadow-xl">
            <img src="/website-hero.svg" alt="Professional Web Services" class="w-full" />
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Section -->
    <section id="features" class="mt-16 md:mt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="mx-auto max-w-3xl text-center">
          <div class="text-xs uppercase tracking-widest text-tertiary">What's Included</div>
          <h2 class="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Everything You Need to Succeed Online</h2>
          <p class="mt-3 text-base text-secondary">
            Design, development, hosting, and marketing—all in one subscription.
          </p>
        </div>
        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="feature in featureHighlights"
            :key="feature.title"
            class="group rounded-2xl border border-soft bg-white p-5 transition-all hover:border-accent-primary hover:shadow-md"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="mt-4 text-base font-semibold text-primary">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-secondary leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="subscription" class="mt-16 md:mt-20">
      <div class="max-w-5xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-12">
          <div class="text-xs uppercase tracking-wider text-tertiary">What We Build</div>
          <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Choose Your Service</h2>
          <p class="mt-3 text-base text-secondary max-w-2xl mx-auto">Everything you need to grow your business online—no upfront fees, just one predictable monthly subscription.</p>
        </div>

        <div class="space-y-4">
          <NuxtLink
            v-for="product in subscriptionProducts"
            :key="product.title"
            :to="product.href"
            class="group flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-accent-primary hover:shadow-lg"
          >
            <div class="flex-1">
              <h3 class="text-2xl md:text-3xl font-bold text-primary">{{ product.title }}</h3>
              <p class="mt-3 text-base text-secondary max-w-2xl">{{ product.description }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span v-for="tag in product.tags" :key="tag" class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="flex-shrink-0">
              <span class="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary group-hover:gap-3 transition-all">
                {{ product.cta }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="mt-16 md:mt-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-white" aria-hidden="true" />
      <div class="relative max-w-6xl mx-auto px-4 lg:px-6 py-12 md:py-16">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 rounded-full bg-accent-subtle px-4 py-1.5 text-xs font-semibold text-accent-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Our Process
          </div>
          <h2 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-primary">From Concept to Launch in 5 Steps</h2>
          <p class="mt-3 text-base text-secondary max-w-2xl mx-auto">Our proven agile methodology delivers high-quality websites quickly while maintaining flexibility for your evolving needs.</p>
        </div>
        
        <div class="relative">
          <!-- Timeline line -->
          <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent-primary/30" aria-hidden="true" />
          
          <div class="space-y-8">
            <div
              v-for="(step, index) in processSteps"
              :key="step.title"
              :class="[
                'relative grid lg:grid-cols-2 gap-8 items-center',
                index % 2 === 0 ? 'lg:text-right' : 'lg:flex-row-reverse'
              ]"
            >
              <!-- Content -->
              <div :class="index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:col-start-2'">
                <div class="group rounded-3xl border border-soft bg-white p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div class="flex items-start gap-4" :class="index % 2 === 0 ? 'lg:flex-row-reverse lg:text-right' : ''">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-primary text-lg font-bold text-white shadow-lg shadow-accent-primary/30">
                      {{ index + 1 }}
                    </div>
                    <div class="flex-1">
                      <h3 class="text-xl font-semibold text-primary">{{ step.title }}</h3>
                      <p class="mt-2 text-sm text-secondary leading-relaxed">{{ step.description }}</p>
                      <div class="mt-4 flex flex-wrap gap-2" :class="index % 2 === 0 ? 'lg:justify-end' : ''">
                        <span v-for="item in step.highlights" :key="item" class="inline-flex items-center gap-1.5 rounded-full bg-accent-subtle/60 px-3 py-1 text-xs font-medium text-accent-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {{ item }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Timeline dot -->
              <div class="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div class="h-4 w-4 rounded-full bg-accent-primary ring-4 ring-white shadow-lg" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <div class="inline-flex items-center gap-3 rounded-2xl border border-accent-subtle bg-white px-6 py-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6 text-accent-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div class="text-left">
              <p class="text-sm font-semibold text-primary">Enterprise Solutions Available</p>
              <p class="text-xs text-secondary">Custom SaaS platforms, e-commerce sites, and enterprise applications</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section id="showcase" class="mt-16 md:mt-24 bg-neutral-50 py-12 md:py-16">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 rounded-full bg-white border border-accent-subtle/60 px-4 py-1.5 text-xs font-semibold text-accent-primary shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Portfolio
          </div>
          <h2 class="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-primary">Recent Projects</h2>
          <p class="mt-3 text-base md:text-lg text-secondary max-w-2xl mx-auto">
            High-converting websites optimized for performance, mobile responsiveness, and search rankings.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            v-for="project in showcaseProjects"
            :key="project.title"
            href="#"
            class="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-accent-primary hover:shadow-lg"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-neutral-100">
              <img
                loading="lazy"
                :src="project.image"
                :alt="project.title"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span v-if="project.tag" class="absolute top-2 left-2 rounded-full bg-white/95 backdrop-blur px-2 py-0.5 text-xs font-semibold text-neutral-700 shadow-sm">
                {{ project.tag }}
              </span>
            </div>
            <div class="p-3">
              <h3 class="text-sm font-semibold text-primary group-hover:text-accent-primary transition-colors">{{ project.title }}</h3>
              <p class="mt-1 text-xs text-secondary line-clamp-2">{{ project.description }}</p>
              <div class="mt-2 flex items-center gap-1 text-xs font-semibold text-accent-primary">
                <span>View</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3 transition-transform group-hover:translate-x-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        </div>
        
        <div class="mt-10 text-center">
          <a href="#" class="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:border-accent-primary hover:bg-accent-subtle/20">
            View all projects
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="mt-16 md:mt-24">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 rounded-full bg-accent-subtle px-4 py-1.5 text-xs font-semibold text-accent-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Client Success Stories
          </div>
          <h2 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Trusted by Growing Businesses</h2>
          <p class="mt-3 text-base text-secondary max-w-2xl mx-auto">See how we've helped companies launch faster, convert better, and scale their digital presence.</p>
        </div>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <article
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.name"
            class="group relative flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <!-- Quote icon -->
            <div class="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-16 w-16 text-accent-primary">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <div class="relative">
              <p class="text-base text-neutral-700 leading-relaxed italic">"{{ testimonial.quote }}"</p>
            </div>
            
            <div class="mt-8 flex items-center gap-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-primary text-base font-bold text-white shadow-lg shadow-accent-primary/20">
                {{ testimonial.initials }}
              </div>
              <div>
                <div class="text-base font-semibold text-primary">{{ testimonial.name }}</div>
                <div class="text-sm text-secondary">{{ testimonial.role }}</div>
                <div class="mt-1 flex gap-0.5">
                  <svg v-for="star in 5" :key="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 text-amber-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </article>
        </div>
        
        <div class="mt-10 text-center">
          <p class="text-sm text-secondary">Join 50+ companies that trust us with their digital presence</p>
          <div class="mt-4 flex items-center justify-center gap-8 opacity-40">
            <div class="text-2xl font-bold text-neutral-400">Company</div>
            <div class="text-2xl font-bold text-neutral-400">Brand</div>
            <div class="text-2xl font-bold text-neutral-400">Startup</div>
            <div class="text-2xl font-bold text-neutral-400">Agency</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mt-16 md:mt-24 pb-16 md:pb-24">
      <div class="max-w-5xl mx-auto px-4 lg:px-6">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-primary">Frequently asked questions</h2>
          <p class="mt-3 text-base text-secondary">Straight answers about how the subscription works, what’s included, and how we collaborate.</p>
        </div>
        <div class="mt-10 space-y-4">
          <details
            v-for="faq in faqs"
            :key="faq.question"
            class="group rounded-3xl border border-neutral-200 bg-white p-6 transition-colors open:border-accent-subtle open:bg-accent-subtle/20"
          >
            <summary class="flex cursor-pointer items-center justify-between text-left text-base font-semibold text-primary marker:hidden">
              <span>{{ faq.question }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4 text-neutral-500 transition-transform group-open:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-3 text-sm text-secondary">{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Professional Website Design & Development Services | Monthly Subscription | Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Custom web design, React/Vue.js development, SEO optimization, and AI chatbot integration on a monthly subscription. Launch your website in 10 days with ongoing support and optimization.'
    }
  ]
})

const heroBenefits = [
  {
    title: 'Fractional product pod',
    description: 'Partner with a strategist, designer, and engineer who launch together every sprint.',
    icon: 'M5 13l4 4L19 7'
  },
  {
    title: 'Iterate without limits',
    description: 'Drop in new pages, experiments, and UX tune-ups whenever you need momentum.',
    icon: 'M4 7v6a5 5 0 005 5h7m4-4V8a5 5 0 00-5-5H8'
  },
  {
    title: 'Ops handled for you',
    description: 'Hosting, monitoring, analytics, and SEO upkeep are bundled so nothing slips.',
    icon: 'M12 6v12m6-6H6'
  },
  {
    title: 'Connect your stack',
    description: 'Integrations with your CRM, marketing tools, and data sources come standard.',
    icon: 'M4 7h16M4 12h12M4 17h8'
  }
]


const subscriptionHighlights = [
  {
    title: 'Launch-ready in weeks',
    description: 'We run design sprints, QA, and launch support so your team can focus on storytelling and distribution.',
    icon: 'M9 5l7 7-7 7'
  },
  {
    title: 'Continuous optimization',
    description: 'Proactive experiments, UX updates, and growth playbooks based on analytics and user interviews.',
    icon: 'M5 12h14M12 5l7 7-7 7'
  },
  {
    title: 'Deep integrations',
    description: 'Connect to HubSpot, Airtable, Zapier, and internal tools to keep your marketing stack humming.',
    icon: 'M12 6v12m6-6H6'
  }
]

const featureHighlights = [
  {
    title: 'Design & UX',
    description: 'Beautiful, conversion-focused designs that work seamlessly across all devices.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    title: 'Development',
    description: 'Fast, modern websites built with React, Vue.js, and optimized for performance.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  },
  {
    title: 'SEO & Analytics',
    description: 'Technical SEO, keyword optimization, and analytics to drive organic traffic.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  },
  {
    title: 'Hosting & Support',
    description: 'Managed cloud hosting with 99.9% uptime, security, and ongoing support.',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
  }
]

const subscriptionProducts = [
  {
    title: 'Websites',
    description: 'Modern, high-performing websites built for you—no upfront fees. Design system, CMS & updates, and analytics included.',
    tags: ['Design system', 'CMS & updates', 'Analytics'],
    href: '/website',
    cta: 'Explore'
  },
  {
    title: 'AI Agents',
    description: 'Automate support, lead-qualifying, and ops with reliable agents integrated into your stack.',
    tags: ['RAG & tools', 'Workflows', 'Observability'],
    href: '/agents',
    cta: 'See details'
  },
  {
    title: 'Marketing & Branding',
    description: 'Positioning, visual identity, and campaigns that match your goals and amplify your reach.',
    tags: ['Brand identity', 'Content', 'Campaigns'],
    href: '/marketing',
    cta: 'See details'
  }
]

const processSteps = [
  {
    title: 'Discovery & Strategy',
    description: 'Comprehensive website audit, competitor analysis, user research, and technical requirements gathering to define project scope and goals.',
    highlights: ['SEO audit', 'User persona development', 'Technical architecture planning']
  },
  {
    title: 'Design & Prototyping',
    description: 'Mobile-first wireframes, high-fidelity mockups in Figma, interactive prototypes, and conversion-optimized copywriting for all pages.',
    highlights: ['Responsive mockups', 'Brand style guide', 'Content strategy']
  },
  {
    title: 'Development & Integration',
    description: 'Front-end development with React/Vue.js, back-end API integration, CMS implementation, and third-party service connections.',
    highlights: ['Code optimization', 'API integrations', 'CMS training']
  },
  {
    title: 'Testing & Launch',
    description: 'Cross-browser testing, mobile responsiveness checks, performance optimization, SEO validation, and smooth deployment to production.',
    highlights: ['QA testing', 'Performance tuning', 'DNS & SSL setup']
  },
  {
    title: 'Optimization & Growth',
    description: 'Ongoing A/B testing, conversion rate optimization, content updates, technical SEO improvements, and feature enhancements.',
    highlights: ['Analytics monitoring', 'CRO experiments', 'Monthly reporting']
  }
]

const testimonials = [
  {
    name: 'Melissa Ward',
    role: 'Head of Marketing, Northwind SaaS',
    quote: 'Hinn shipped a new site in 12 days and continues to deliver fresh campaign pages every sprint without needing to brief multiple vendors.',
    initials: 'MW'
  },
  {
    name: 'Sujay Patel',
    role: 'Founder, Summit Outdoors',
    quote: 'Our subscription gives us product design, copy, and technical help in one place. Conversions are up 28% and we finally have momentum.',
    initials: 'SP'
  },
  {
    name: 'Alexis Romero',
    role: 'Director of Growth, Evergreen Nonprofit',
    quote: 'The team handles updates, analytics, and donor journeys weekly. We just drop ideas in Slack and they’re live within days.',
    initials: 'AR'
  },
  {
    name: 'Tyler Chan',
    role: 'COO, Bluegrain Coffee',
    quote: 'It feels like having a full product squad on retainer. They iterate quickly and give us clarity on what’s driving results.',
    initials: 'TC'
  }
]

const faqs = [
  {
    question: 'What does the monthly subscription include?',
    answer:
      'Every plan includes a dedicated cross-functional team, design and development hours, hosting and maintenance, analytics reporting, and weekly strategy reviews. You can request new pages, experiments, and enhancements anytime.'
  },
  {
    question: 'How quickly can we launch?',
    answer:
      'Most clients launch in around ten days. We begin with discovery and design sprints, then develop, QA, and deploy. We handle DNS, CMS migration, and on-call support for the first weeks after launch.'
  },
  {
    question: 'Can you work with our existing tools?',
    answer:
      'Yes. We regularly integrate with HubSpot, Salesforce, Airtable, Webflow, Supabase, and proprietary APIs. We coordinate with your team to ensure security and compliance requirements are met.'
  },
  {
    question: 'What if we need to pause or cancel?',
    answer:
      'Subscriptions are billed monthly. You can pause or cancel with 30 days notice. When you return, we pick up where we left off with the same context, assets, and roadmap.'
  }
]

const showcaseProjects = [
  {
    title: 'Aurora Fitness',
    description: 'Sleek site with schedules, trainer bios, and conversion pages.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',
    tag: 'Website'
  },
  {
    title: 'Summit Outdoors',
    description: 'Catalog layout with product stories and lightweight ecommerce.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    tag: 'CMS'
  },
  {
    title: 'Bluegrain Coffee Co.',
    description: 'Editorial design, storytelling pages, newsletter growth.',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop',
    tag: 'Brand'
  },
  {
    title: 'Northstar Consulting',
    description: 'Professional presence with case study templates.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    tag: 'Case study'
  },
  {
    title: 'Evergreen Nonprofit',
    description: 'Accessible site with donation flows and impact highlights.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
    tag: null
  }
]
</script>
