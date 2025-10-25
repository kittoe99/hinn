<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20">
      <div class="absolute inset-0 bg-white" aria-hidden="true" />
      
      <div class="relative max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 opacity-0 animate-fade-in" style="animation-delay: 0ms">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-600"></span>
            Monthly services
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 opacity-0 animate-fade-in" style="animation-delay: 0ms">
            Websites, marketing & AI agents—done for you
          </h1>
          <p class="mt-6 text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto opacity-0 animate-fade-in" style="animation-delay: 200ms">
            One monthly subscription. Zero technical work. We design, build, and maintain everything while you focus on growing your business.
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
          <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">Everything you need, nothing you don't</h2>
          <p class="mt-4 text-base text-neutral-600">
            No freelancers to manage. No agencies to chase. Just one team handling everything—from design to deployment to daily maintenance.
          </p>
        </div>
        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(feature, index) in featureHighlights"
            :key="feature.title"
            class="group relative rounded-md border border-neutral-200 bg-white p-5 transition-all duration-300 hover:bg-neutral-50 hover:-translate-y-1 hover:shadow-lg hover:border-blue-600 opacity-0 animate-fade-in-up overflow-hidden"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-neutral-900/0 to-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-0 right-0 w-20 h-20 bg-neutral-900/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="flex h-10 w-10 items-center justify-center rounded border border-blue-200 bg-blue-50 text-blue-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:rotate-3">
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
          <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">Pick your plan, we'll handle the rest</h2>
          <p class="mt-3 text-base text-neutral-600 max-w-xl mx-auto">Subscribe monthly. Cancel anytime. No contracts, no surprises—just results.</p>
        </div>

        <div class="space-y-4">
          <NuxtLink
            v-for="product in subscriptionProducts"
            :key="product.title"
            :to="product.href"
            class="group relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-md border border-neutral-200 bg-white p-8 transition-all duration-300 hover:bg-neutral-50 hover:-translate-y-1 hover:shadow-lg hover:border-blue-600 opacity-0 animate-fade-in-up overflow-hidden"
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
              <span class="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 group-hover:gap-3 transition-all duration-300">
                {{ product.cta }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-blue-700 group-hover:translate-x-1 transition-transform duration-300">
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
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">Stand out with professional branding</h2>
          <p class="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            We create complete brand identities—from logo to guidelines—so you look credible, professional, and ready to compete.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="(item, index) in brandFeatures" 
            :key="item.title"
            class="group relative rounded-lg border border-neutral-200 bg-white p-8 opacity-0 animate-fade-in-up transition-all duration-300 hover:border-blue-600 hover:shadow-lg"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="absolute top-0 left-0 w-1 h-full bg-blue-200 transform scale-y-0 group-hover:scale-y-100 group-hover:bg-blue-300 transition-[transform,background-color] duration-300 origin-top"></div>
            <div class="flex items-center justify-center w-12 h-12 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-transform duration-300">
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
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">Real sites we've built & launched</h2>
          <p class="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            From idea to live site in weeks, not months. See what we've shipped for businesses just like yours.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="category in showcaseCategories"
            :key="category.value"
            @click="selectedShowcaseCategory = category.value"
            :class="[
              'rounded-full px-5 py-2 text-sm font-semibold transition-all',
              selectedShowcaseCategory === category.value
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-blue-600 hover:text-blue-700'
            ]"
          >
            {{ category.label }}
          </button>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            v-for="(project, index) in filteredShowcaseProjects"
            :key="project.title"
            href="#"
            class="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:shadow-xl opacity-0 animate-fade-in-up"
            :style="{ animationDelay: `${index * 75}ms` }"
          >
            <!-- Top bar accent -->
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Category badge and featured -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <span v-if="project.tag" class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border border-blue-200 bg-blue-50 text-blue-700">
                  <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                  {{ project.tag }}
                </span>
                <span v-if="project.featured" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Featured
                </span>
              </div>
              <svg class="h-5 w-5 text-neutral-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>

            <!-- Project info -->
            <h3 class="text-lg font-bold text-neutral-900 mb-2 group-hover:text-blue-700 transition-colors">{{ project.title }}</h3>
            <p class="text-sm text-neutral-600 mb-4 line-clamp-2">{{ project.description }}</p>

            <!-- Metrics -->
            <div v-if="project.metrics" class="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-100">
              <div v-for="metric in project.metrics" :key="metric.label" class="flex items-center gap-1 text-xs">
                <span class="font-bold text-blue-700">{{ metric.value }}</span>
                <span class="text-neutral-600">{{ metric.label }}</span>
              </div>
            </div>

            <!-- Tech stack -->
            <div v-if="project.tech" class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="inline-flex items-center px-2 py-1 rounded-md bg-neutral-100 text-xs font-medium text-neutral-700 border border-neutral-200"
              >
                {{ tech }}
              </span>
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
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">Questions? We've got answers</h2>
          <p class="mt-4 text-lg text-neutral-600">Everything you need to know about our done-for-you monthly service.</p>
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
    description: 'We design, build, and launch your site—then keep it fast, secure, and converting.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    title: 'Branding',
    description: 'Complete visual identity—logo, colors, fonts—delivered ready to use everywhere.',
    icon: 'M3 5h18M8 5v14m8-14v14M4 19h16'
  },
  {
    title: 'AI Agents',
    description: 'Autonomous agents handle support, qualify leads, and work 24/7—no training required.',
    icon: 'M9 5v2a2 2 0 002 2h2a2 2 0 002-2V5m-2 6v7m-6-7v7m-4 0h12'
  },
  {
    title: 'Fully Managed',
    description: 'Hosting, security, backups, analytics\u2014we handle it all so you don\'t have to.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  }
]

const subscriptionProducts = [
  {
    title: 'Websites',
    description: 'We design, build, host, and maintain your site. You get unlimited revisions, weekly updates, and a site that actually converts—all for one monthly fee.',
    tags: ['Custom design', 'Hosting included', 'Weekly updates', 'SEO built-in'],
    href: '/website',
    cta: 'Learn more',
    delay: 0
  },
  {
    title: 'AI Agents',
    description: 'Autonomous agents that handle customer support, qualify leads, and automate workflows. We build, train, and manage them—you just watch them work.',
    tags: ['24/7 automation', 'CRM integration', 'Human oversight'],
    href: '/agents',
    cta: 'See how it works',
    delay: 150
  },
  {
    title: 'Marketing & Branding',
    description: 'Complete brand identity, content strategy, and campaign execution. We handle everything from logo design to email campaigns—you approve and launch.',
    tags: ['Brand identity', 'Content creation', 'Campaign management'],
    href: '/marketing',
    cta: 'Explore services',
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

const selectedShowcaseCategory = ref('all')

const showcaseCategories = [
  { label: 'All Projects', value: 'all' },
  { label: 'Websites', value: 'websites' },
  { label: 'AI Agents', value: 'agents' },
  { label: 'Marketing', value: 'marketing' }
]

const showcaseProjects = [
  {
    title: 'E-Commerce Platform Redesign',
    description: 'Complete redesign and development of a high-converting e-commerce platform with custom checkout flow.',
    tag: 'Websites',
    featured: true,
    metrics: [
      { label: 'conversion', value: '+45%' },
      { label: 'page speed', value: '95/100' }
    ],
    tech: ['Next.js', 'Stripe', 'Tailwind']
  },
  {
    title: 'AI Customer Support Agent',
    description: 'Intelligent chatbot trained on company knowledge base, handling 80% of customer inquiries automatically.',
    tag: 'AI Agents',
    featured: true,
    metrics: [
      { label: 'automation', value: '80%' },
      { label: 'response time', value: '<2s' }
    ],
    tech: ['OpenAI', 'LangChain', 'Supabase']
  },
  {
    title: 'SaaS Product Launch Campaign',
    description: 'Multi-channel marketing campaign for B2B SaaS product launch, including SEO, paid ads, and email automation.',
    tag: 'Marketing',
    metrics: [
      { label: 'leads', value: '2,400+' },
      { label: 'ROI', value: '340%' }
    ],
    tech: ['Google Ads', 'HubSpot', 'Analytics']
  },
  {
    title: 'Real Estate Listing Platform',
    description: 'Modern property listing website with advanced search, map integration, and virtual tour capabilities.',
    tag: 'Websites',
    metrics: [
      { label: 'listings', value: '5,000+' },
      { label: 'uptime', value: '99.9%' }
    ],
    tech: ['Vue.js', 'Mapbox', 'Firebase']
  },
  {
    title: 'Sales Qualification Bot',
    description: 'AI agent that qualifies leads through conversational interface and schedules demos automatically.',
    tag: 'AI Agents',
    metrics: [
      { label: 'qualified leads', value: '+120%' },
      { label: 'time saved', value: '15hrs/wk' }
    ],
    tech: ['GPT-4', 'Salesforce', 'Calendly']
  },
  {
    title: 'Content Marketing Strategy',
    description: 'SEO-focused content strategy with blog posts, case studies, and whitepapers driving organic traffic growth.',
    tag: 'Marketing',
    metrics: [
      { label: 'organic traffic', value: '+280%' },
      { label: 'keywords ranked', value: '450+' }
    ],
    tech: ['Ahrefs', 'WordPress', 'GA4']
  }
]

const filteredShowcaseProjects = computed(() => {
  if (selectedShowcaseCategory.value === 'all') {
    return showcaseProjects
  }
  return showcaseProjects.filter(p => p.tag.toLowerCase() === selectedShowcaseCategory.value)
})
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
