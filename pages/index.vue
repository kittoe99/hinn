<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20">
      <div class="absolute inset-0 bg-white" aria-hidden="true" />
      
      <div class="relative max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 opacity-0 animate-fade-in" style="animation-delay: 0ms">
            Websites, Branding & AI Agents
          </h1>
          <p class="mt-6 text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto opacity-0 animate-fade-in" style="animation-delay: 200ms">
            Everything you need to grow your business, delivered monthly.
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 sm:flex-row sm:gap-4 opacity-0 animate-fade-in" style="animation-delay: 400ms">
            <NuxtLink
              to="/get-started"
              class="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 sm:px-8 sm:py-4 sm:text-base"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline-block ml-2 h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <a
              href="#features"
              class="rounded-full border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 hover:border-blue-300 sm:px-8 sm:py-4 sm:text-base"
            >
              Learn More
            </a>
          </div>
        </div>
        
        <!-- Hero Image -->
        <div class="mt-8 relative max-w-2xl mx-auto">
          <div class="rounded-xl border border-neutral-200 bg-white p-4">
            <div class="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                alt="Design team collaborating in a modern workspace"
                class="h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/10" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Section -->
    <section id="features" class="mt-16 md:mt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">What's Included</h2>
          <p class="mt-4 text-base text-neutral-600">
            Websites, branding, and AI agents—delivered monthly.
          </p>
        </div>
        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(feature, index) in featureHighlights"
            :key="feature.title"
            class="group relative rounded-md border border-neutral-200 bg-white p-5 transition-all duration-300 hover:bg-neutral-50 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-900 opacity-0 animate-fade-in-up overflow-hidden"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-neutral-900/0 to-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-0 right-0 w-20 h-20 bg-neutral-900/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="flex h-10 w-10 items-center justify-center rounded border border-neutral-200 bg-neutral-50 text-neutral-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 group-hover:rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
                </svg>
              </div>
              <h3 class="mt-4 text-base font-semibold text-neutral-900 group-hover:text-neutral-900 transition-colors">{{ feature.title }}</h3>
              <p class="mt-2 text-sm text-neutral-600 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="subscription" class="mt-16 md:mt-20">
      <div class="max-w-5xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">Choose Your Service</h2>
          <p class="mt-3 text-base text-neutral-600 max-w-xl mx-auto">Pick what you need. Switch anytime.</p>
        </div>

        <div class="space-y-4">
          <NuxtLink
            v-for="product in subscriptionProducts"
            :key="product.title"
            :to="product.href"
            class="group relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-md border border-neutral-200 bg-white p-8 transition-all duration-300 hover:bg-neutral-50 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-900 opacity-0 animate-fade-in-up overflow-hidden"
            :style="{ animationDelay: `${product.delay}ms` }"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-neutral-900/0 via-neutral-900/0 to-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="flex-1 relative z-10">
              <h3 class="text-2xl md:text-3xl font-bold text-neutral-900 group-hover:text-neutral-900 transition-colors">{{ product.title }}</h3>
              <p class="mt-3 text-base text-neutral-600 max-w-2xl">{{ product.description }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span 
                  v-for="(tag, index) in product.tags" 
                  :key="tag" 
                  :class="['rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 hover:opacity-90', chipColorClasses[index % chipColorClasses.length]]"
                  :style="{ transitionDelay: `${index * 50}ms` }"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="flex-shrink-0 relative z-10">
              <span class="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover:gap-3 transition-all duration-300">
                {{ product.cta }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Business Branding Section -->
    <section class="mt-16 md:mt-24 py-20 bg-gradient-to-b from-white to-neutral-50">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">Brand Identity</h2>
          <p class="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Complete visual systems that make you memorable
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="(item, index) in brandFeatures" 
            :key="item.title"
            class="group relative rounded-lg border border-neutral-200 bg-white p-8 opacity-0 animate-fade-in-up transition-all duration-300 hover:border-neutral-900 hover:shadow-lg"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="absolute top-0 left-0 w-1 h-full bg-blue-200 transform scale-y-0 group-hover:scale-y-100 group-hover:bg-blue-300 transition-[transform,background-color] duration-300 origin-top"></div>
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-900 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">{{ item.title }}</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink 
            to="/marketing" 
            class="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:gap-3"
          >
            View Branding Services
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section id="showcase" class="mt-16 md:mt-24 py-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">Portfolio</h2>
          <p class="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Recent launches that shipped fast and converted.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            v-for="(project, index) in showcaseProjects"
            :key="project.title"
            href="#"
            class="group relative overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-xl opacity-0 animate-fade-in-up"
            :style="{ animationDelay: `${index * 75}ms` }"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <div class="relative aspect-[4/3] overflow-hidden bg-neutral-100">
              <img
                loading="lazy"
                :src="project.image"
                :alt="project.title"
                class="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-90"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span v-if="project.tag" :class="['absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow-md transition-all duration-300', projectTagColor(project.tag)]">
                {{ project.tag }}
              </span>
            </div>
            <div class="relative p-5 z-20">
              <h3 class="text-base font-bold text-neutral-900 transition-colors">{{ project.title }}</h3>
              <p class="mt-2 text-sm text-neutral-600 line-clamp-2">{{ project.description }}</p>
              <div class="mt-3 flex items-center gap-2 text-sm font-semibold text-blue-700 group-hover:gap-3 transition-all duration-300">
                <span>View Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        </div>
        
        <div class="mt-12 text-center">
          <NuxtLink 
            to="/showcase" 
            class="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:gap-3"
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mt-16 md:mt-24 py-20 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-4 lg:px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">FAQ</h2>
          <p class="mt-4 text-lg text-neutral-600">Common questions answered.</p>
        </div>
        <div class="space-y-3">
          <details
            v-for="(faq, index) in faqs"
            :key="faq.question"
            class="group rounded-lg border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-neutral-900 hover:shadow-lg opacity-0 animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <summary class="flex cursor-pointer items-center justify-between text-left text-base font-semibold text-neutral-900 marker:hidden">
              <span>{{ faq.question }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-blue-600 transition-transform duration-300 group-open:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-4 text-sm text-neutral-600 leading-relaxed">{{ faq.answer }}</p>
          </details>
        </div>
        
        <div class="mt-12 text-center">
          <p class="text-sm text-neutral-600 mb-4">Still have questions?</p>
          <NuxtLink 
            to="/contact" 
            class="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:gap-3"
          >
            Contact Us
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
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

// Subtle color palette for chips ("stickers")
const chipColorClasses = [
  'border border-blue-200 bg-blue-50 text-blue-700',
  'border border-amber-200 bg-amber-50 text-amber-700',
  'border border-emerald-200 bg-emerald-50 text-emerald-700',
  'border border-purple-200 bg-purple-50 text-purple-700'
]

// Marker/badge color by tag label
const projectTagColor = (tag) => {
  const key = String(tag || '').toLowerCase()
  if (key.includes('brand')) return 'border border-purple-200 bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white'
  if (key.includes('case')) return 'border border-amber-200 bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white'
  if (key.includes('cms')) return 'border border-emerald-200 bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
  if (key.includes('web')) return 'border border-blue-200 bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
  return 'border border-neutral-200 bg-neutral-100 text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white'
}


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
    title: 'Websites',
    description: 'Fast, modern sites built to convert visitors into customers.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    title: 'Branding',
    description: 'Logos, colors, and assets that make you memorable.',
    icon: 'M3 5h18M8 5v14m8-14v14M4 19h16'
  },
  {
    title: 'AI Agents',
    description: 'Smart bots that qualify leads and support customers 24/7.',
    icon: 'M9 5v2a2 2 0 002 2h2a2 2 0 002-2V5m-2 6v7m-6-7v7m-4 0h12'
  },
  {
    title: 'Support',
    description: 'Hosting, analytics, and ongoing optimization included.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  }
]

const subscriptionProducts = [
  {
    title: 'Websites',
    description: 'Modern, high-performing websites built for you—no upfront fees. Design system, CMS & updates, and analytics included.',
    tags: ['Design system', 'CMS & updates', 'Analytics'],
    href: '/website',
    cta: 'Explore',
    delay: 0
  },
  {
    title: 'AI Agents',
    description: 'Automate support, lead-qualifying, and ops with reliable agents integrated into your stack.',
    tags: ['RAG & tools', 'Workflows', 'Observability'],
    href: '/agents',
    cta: 'See details',
    delay: 150
  },
  {
    title: 'Marketing & Branding',
    description: 'Positioning, visual identity, and campaigns that match your goals and amplify your reach.',
    tags: ['Brand identity', 'Content', 'Campaigns'],
    href: '/marketing',
    cta: 'See details',
    delay: 300
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

const brandFeatures = [
  {
    title: 'Logo & Identity',
    description: 'Complete logo system with typography and color guidelines.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    title: 'Brand Assets',
    description: 'Templates for social media, presentations, and marketing.',
    icon: 'M3 5h18M8 5v14m8-14v14M4 19h16'
  },
  {
    title: 'Style Guide',
    description: 'Documentation to keep your brand consistent everywhere.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
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

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
</style>
