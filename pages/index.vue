<template>
  <div class="bg-white text-neutral-900">
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_#fbe8de,_transparent_55%),_radial-gradient(circle_at_bottom,_#f5f3ff,_transparent_50%)]"></div>
      <div class="relative max-w-6xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div class="grid lg:grid-cols-[3fr_2fr] gap-16 items-center">
          <div class="space-y-8">
            <p class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm backdrop-blur">
              Full-stack creative and technical subscription
            </p>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Digital experiences that feel effortless and keep revenue moving forward.
            </h1>
            <p class="text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Hinn pairs strategy, design, engineering, and AI automation in one polished subscription. Launch faster, iterate weekly, and give your team a partner that obsesses over momentum.
            </p>
            <div class="rounded-2xl border border-neutral-200 shadow-lg overflow-hidden bg-neutral-900/90 text-white">
              <div class="aspect-video">
                <iframe
                  class="h-full w-full"
                  src="https://player.vimeo.com/video/938749652?h=adfe7d3e3f&title=0&byline=0&portrait=0"
                  title="Inside the Hinn subscription"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="px-6 py-4 text-sm text-white/80">
                <p class="font-medium text-white">See the subscription in action</p>
                <p>Preview how strategy, design, engineering, and automation come together in a single sprint.</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-4">
              <NuxtLink
                to="/dashboard"
                class="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Start your subscription
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
              <NuxtLink
                to="/showcase"
                class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                View recent launches
              </NuxtLink>
            </div>
            <dl class="grid sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
              <div v-for="stat in heroStats" :key="stat.label" class="space-y-1">
                <dt class="text-sm uppercase tracking-wide text-neutral-500">{{ stat.label }}</dt>
                <dd class="text-xl font-semibold">{{ stat.value }}</dd>
              </div>
            </dl>
          </div>
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-neutral-200 shadow-lg p-8 space-y-6">
            <div class="space-y-3">
              <h2 class="text-2xl font-semibold">Your fractional product pod</h2>
              <p class="text-neutral-600 leading-relaxed">
                Each plan unlocks a strategist, product designer, engineer, and AI specialist who ship together every sprint. No onboarding drag, no scope creep.
              </p>
            </div>
            <ul class="space-y-4">
              <li v-for="item in heroHighlights" :key="item.title" class="flex items-start gap-3">
                <div class="mt-1 h-8 w-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">{{ item.icon }}</div>
                <div>
                  <p class="font-medium">{{ item.title }}</p>
                  <p class="text-sm text-neutral-600 leading-relaxed">{{ item.description }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Logos -->
    <section class="py-12 border-t border-neutral-200 bg-white">
      <div class="max-w-6xl mx-auto px-6 lg:px-12">
        <p class="text-sm uppercase tracking-[0.3em] text-neutral-500 text-center mb-8">Trusted by marketing and product teams</p>
        <div class="flex flex-wrap items-center justify-center gap-10 text-neutral-400">
          <span v-for="logo in partnerLogos" :key="logo" class="text-base font-semibold tracking-wide uppercase">{{ logo }}</span>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-20 lg:py-28 bg-neutral-50">
      <div class="max-w-6xl mx-auto px-6 lg:px-12">
        <div class="lg:flex lg:items-end lg:justify-between gap-12 mb-14">
          <div>
            <p class="text-sm font-semibold text-[#d97759] uppercase tracking-[0.3em]">Capabilities</p>
            <h2 class="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">Everything you need to ship and optimize</h2>
          </div>
          <p class="mt-6 lg:mt-0 max-w-xl text-neutral-600">
            We blend brand storytelling with technical rigor. Each engagement is designed to feel calm and intentional while still driving measurable growth.
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
          <article
            v-for="service in services"
            :key="service.title"
            class="group relative bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div class="h-12 w-12 rounded-full bg-neutral-900 text-white flex items-center justify-center text-lg font-semibold mb-6">
              {{ service.icon }}
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ service.title }}</h3>
            <p class="text-neutral-600 leading-relaxed mb-6">{{ service.description }}</p>
            <ul class="space-y-2 text-sm text-neutral-500">
              <li v-for="detail in service.details" :key="detail" class="flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-[#d97759]"></span>
                <span>{{ detail }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Approach -->
    <section class="py-20 lg:py-24">
      <div class="max-w-6xl mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-[2fr_3fr] gap-16 items-start">
          <div class="space-y-4">
            <p class="text-sm font-semibold text-[#d97759] uppercase tracking-[0.3em]">Process</p>
            <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight">A calm, transparent operating rhythm</h2>
            <p class="text-neutral-600 leading-relaxed">
              We keep collaboration lightweight and proactive. Weekly sprints, async updates, and shared dashboards make it easy to see what shipped and what’s next.
            </p>
            <NuxtLink to="/contact" class="inline-flex items-center gap-2 text-neutral-900 font-medium hover:text-neutral-600 transition-colors">
              Book a working session
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
          <div class="grid gap-6">
            <div v-for="(step, index) in approachSteps" :key="step.title" class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <div class="flex items-start gap-4">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 font-semibold border border-neutral-200">0{{ index + 1 }}</span>
                <div class="space-y-2">
                  <h3 class="text-lg font-semibold">{{ step.title }}</h3>
                  <p class="text-neutral-600 leading-relaxed">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured work -->
    <section class="py-20 lg:py-28 bg-neutral-900 text-white">
      <div class="max-w-6xl mx-auto px-6 lg:px-12">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div>
            <p class="text-sm font-semibold text-[#f3b398] uppercase tracking-[0.3em]">Featured work</p>
            <h2 class="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">Launches engineered for growth</h2>
          </div>
          <NuxtLink to="/showcase" class="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
            View the full showcase
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
        <div class="grid gap-6 lg:grid-cols-3">
          <article v-for="project in featuredProjects" :key="project.title" class="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium uppercase tracking-wide text-[#f3b398]">{{ project.tag }}</span>
              <div class="flex gap-3 text-sm text-white/70">
                <span v-for="metric in project.metrics" :key="metric.label">{{ metric.label }}: <span class="font-semibold text-white">{{ metric.value }}</span></span>
              </div>
            </div>
            <h3 class="text-xl font-semibold">{{ project.title }}</h3>
            <p class="text-white/80 leading-relaxed">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 text-xs text-white/60">
              <span v-for="tech in project.tech" :key="tech" class="rounded-full border border-white/20 px-3 py-1">{{ tech }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 lg:py-24 bg-neutral-50">
      <div class="max-w-6xl mx-auto px-6 lg:px-12">
        <div class="lg:flex lg:items-end lg:justify-between gap-12 mb-14">
          <div>
            <p class="text-sm font-semibold text-[#d97759] uppercase tracking-[0.3em]">Testimonials</p>
            <h2 class="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">Teams that work with us stay with us</h2>
          </div>
          <p class="mt-6 lg:mt-0 max-w-xl text-neutral-600">
            We plug into your stack, lead with clarity, and make continuous improvement feel second nature.
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <figure v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
            <blockquote class="text-neutral-700 leading-relaxed mb-6">“{{ testimonial.quote }}”</blockquote>
            <figcaption class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-semibold">{{ testimonial.initials }}</div>
              <div>
                <p class="font-medium text-neutral-900">{{ testimonial.name }}</p>
                <p class="text-sm text-neutral-500">{{ testimonial.role }}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 lg:py-24">
      <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <p class="text-sm font-semibold text-[#d97759] uppercase tracking-[0.3em]">Let’s build</p>
        <h2 class="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">Ready for a quieter, faster way to launch?</h2>
        <p class="mt-4 text-neutral-600 leading-relaxed">
          Share your roadmap, and we’ll shape a sprint plan that pairs beautiful brand moments with powerful automation.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <NuxtLink
            to="/signup"
            class="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm"
          >
            Secure a kickoff slot
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
            Talk with our team
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Professional Website Design & Development Services | Monthly Subscription | Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Custom web design, AI automation, and marketing support in a single subscription. Launch in weeks and keep iterating without the overhead.'
    }
  ]
})

const heroStats = [
  { label: 'Launch timeline', value: '10 days avg.' },
  { label: 'Active partnerships', value: '40+' },
  { label: 'Avg. conversion lift', value: '+28%' }
]

const heroHighlights = [
  {
    icon: 'A',
    title: 'Automated growth ops',
    description: 'AI copilots, lead routing, and reporting built directly into your experience.'
  },
  {
    icon: 'S',
    title: 'Strategic creative',
    description: 'Brand, copy, and UX that stay on-message across every touchpoint.'
  },
  {
    icon: 'E',
    title: 'Engineering on demand',
    description: 'Full-stack development, integrations, and performance tuning every sprint.'
  }
]

const partnerLogos = ['Northwind', 'Evergreen', 'Summit', 'Bluegrain', 'Atrium', 'Revloop']

const services = [
  {
    icon: '01',
    title: 'Websites & product experiences',
    description: 'Launch high-performing sites, dashboards, and funnels engineered for reliability and speed.',
    details: ['UX research & journey mapping', 'Component-driven design systems', 'Headless CMS implementation']
  },
  {
    icon: '02',
    title: 'AI agents & automation',
    description: 'Deploy intelligent assistants that qualify leads, support customers, and run ops around the clock.',
    details: ['Knowledge base ingestion', 'Workflow orchestration', 'Analytics & governance']
  },
  {
    icon: '03',
    title: 'Marketing & brand systems',
    description: 'Craft campaigns, content, and identity systems that stay cohesive as you scale.',
    details: ['Messaging strategy', 'Visual identity refresh', 'Launch playbooks & reporting']
  }
]

const approachSteps = [
  {
    title: 'Kickoff & clarity',
    description: 'We synthesize goals, audit your stack, and align on the roadmap for the first 4–6 sprints.'
  },
  {
    title: 'Sprint production',
    description: 'Design, build, and ship in tight iterations with async updates, Figma previews, and QA baked in.'
  },
  {
    title: 'Launch & iterate',
    description: 'Monitor performance, automate insights, and layer in experiments that keep the wins compounding.'
  }
]

const featuredProjects = [
  {
    title: 'Northwind Commerce platform',
    description: 'Rebuilt a DTC storefront with AI-assisted merchandising and a reusable component library.',
    tag: 'Websites',
    metrics: [
      { label: 'Conversion', value: '+45%' },
      { label: 'Speed', value: '95/100' }
    ],
    tech: ['Nuxt', 'Supabase', 'Stripe']
  },
  {
    title: 'Evergreen donor experience',
    description: 'Designed an always-on donor journey with predictive insights for campaign teams.',
    tag: 'AI Agents',
    metrics: [
      { label: 'Automation', value: '80%' },
      { label: 'Response', value: '<2s' }
    ],
    tech: ['OpenAI', 'LangChain', 'HubSpot']
  },
  {
    title: 'Summit product launch',
    description: 'Led messaging, creative, and automation for a category launch across digital channels.',
    tag: 'Marketing',
    metrics: [
      { label: 'Leads', value: '2.4k+' },
      { label: 'ROI', value: '340%' }
    ],
    tech: ['Contentful', 'Segment', 'GA4']
  }
]

const testimonials = [
  {
    name: 'Melissa Ward',
    role: 'Head of Marketing, Northwind',
    quote: 'Hinn shipped a new site in under two weeks and now pushes fresh experiments live every sprint without disrupting our roadmap.',
    initials: 'MW'
  },
  {
    name: 'Tyler Chan',
    role: 'COO, Bluegrain Coffee',
    quote: 'They operate like an embedded squad—responsive, organized, and focused on metrics that matter.',
    initials: 'TC'
  },
  {
    name: 'Sujay Patel',
    role: 'Founder, Summit Outdoors',
    quote: 'We consolidated design, dev, and automation under one subscription. The pace and quality finally match our ambitions.',
    initials: 'SP'
  },
  {
    name: 'Alexis Romero',
    role: 'Director of Growth, Evergreen',
    quote: 'From strategic workshops to AI agent launches, the team keeps everything thoughtful and on brand.',
    initials: 'AR'
  }
]
</script>

<style scoped>
section {
  scroll-margin-top: 4rem;
}
</style>
