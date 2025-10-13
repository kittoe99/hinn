<template>
  <div class="pb-8 md:pb-12">
    <!-- Hero -->
    <section class="relative overflow-hidden pt-4 md:pt-6">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-subtle via-white to-white" aria-hidden="true" />
      <div class="relative max-w-6xl mx-auto px-3 sm:px-4 grid lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center">
        <div class="text-center lg:text-left">
          <p class="inline-flex items-center gap-2 rounded-full border border-accent-subtle/60 bg-white px-3 py-1 text-xs font-medium text-accent-primary">
            Professional website development on monthly subscription
          </p>
          <h1 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-primary">
            Custom Website Design & Development with Ongoing Support
          </h1>
          <p class="mt-4 text-sm md:text-base text-secondary max-w-xl mx-auto lg:mx-0">
            Full-service web design, React/Vue.js development, responsive UI/UX, headless CMS integration, technical SEO, and cloud hosting—all included in one predictable monthly subscription.
          </p>
          <div class="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <button class="w-full sm:w-auto rounded-full bg-accent-primary px-5 py-3 text-sm md:text-base font-medium text-white shadow-sm shadow-accent-primary/20 transition hover:bg-accent-focus">
              Start your build
            </button>
            <a
              href="#plans"
              class="w-full sm:w-auto rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm md:text-base font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Explore plans
            </a>
          </div>
          <dl class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div
              v-for="stat in heroStats"
              :key="stat.label"
              class="rounded-2xl border border-soft bg-white/80 px-4 py-3 backdrop-blur"
            >
              <dt class="text-xs uppercase tracking-wide text-neutral-500">{{ stat.label }}</dt>
              <dd class="mt-1 text-xl font-semibold text-primary">{{ stat.value }}</dd>
              <p class="mt-1 text-xs text-secondary">{{ stat.detail }}</p>
            </div>
          </dl>
        </div>
        <div class="relative">
          <div class="rounded-3xl border border-soft bg-white/90 p-5 shadow-lg shadow-accent-subtle/40">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-neutral-500">Launch blueprint</p>
                <p class="mt-1 text-lg font-semibold text-primary">From kickoff to live in weeks</p>
              </div>
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-subtle text-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-7 w-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c1.657 0 3 4.03 3 9s-1.343 9-3 9-3-4.03-3-9 1.343-9 3-9z" />
                </svg>
              </div>
            </div>
            <ol class="mt-5 space-y-3">
              <li
                v-for="step in heroRoadmap"
                :key="step.title"
                class="flex items-start gap-3"
              >
                <span class="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent-primary/10 text-xs font-semibold text-accent-primary">
                  {{ step.step }}
                </span>
                <div class="text-left">
                  <p class="text-sm font-medium text-primary">{{ step.title }}</p>
                  <p class="mt-0.5 text-xs text-secondary">{{ step.detail }}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Outcomes -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <header class="text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">High-Performance Websites Built for Conversions & SEO</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
            Every website includes UX strategy, conversion-focused design, modern JavaScript frameworks, technical SEO optimization, and performance tuning for exceptional Core Web Vitals scores.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-3 gap-5">
          <article
            v-for="pillar in outcomePillars"
            :key="pillar.title"
            class="flex flex-col gap-3 rounded-2xl border border-soft bg-white p-5"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" :d="pillar.icon" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-primary">{{ pillar.title }}</h3>
            <p class="text-sm text-secondary">{{ pillar.desc }}</p>
            <ul class="mt-1 space-y-1 text-sm text-neutral-700">
              <li v-for="point in pillar.points" :key="point" class="flex items-start gap-2">
                <span class="mt-0.5 text-accent-primary">•</span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Feature grid -->
    <section id="features" class="mt-12 md:mt-16 bg-neutral-50 py-10 md:py-14">
      <div class="max-w-6xl mx-auto px-3 sm:px-4">
        <header class="text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Complete Web Development Services Included</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-3xl mx-auto">
            No hidden fees. Every subscription includes UX research, responsive web design, front-end development, CMS setup, SSL certificates, CDN hosting, Google Analytics integration, and ongoing optimization.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="feature in allFeatures"
            :key="feature.title"
            class="rounded-2xl border border-soft bg-white p-5"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="mt-3 text-sm font-semibold text-primary">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-secondary">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Launch timeline -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <div class="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight text-primary">Our collaborative launch timeline</h2>
            <p class="mt-3 text-sm md:text-base text-secondary">
              We run a proven sprint model that keeps your team in the loop without dragging projects for months. Weekly check-ins, async updates, and clear next steps at every milestone.
            </p>
            <ul class="mt-5 space-y-3 text-sm text-neutral-700">
              <li v-for="commitment in timelineCommitments" :key="commitment" class="flex items-start gap-2">
                <span class="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-subtle text-xs font-semibold text-accent-primary">✓</span>
                <span>{{ commitment }}</span>
              </li>
            </ul>
          </div>
          <div class="relative pl-5 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-neutral-200">
            <div
              v-for="phase in launchTimeline"
              :key="phase.title"
              class="relative mb-6 last:mb-0"
            >
              <span class="absolute -left-[11px] top-1 h-5 w-5 rounded-full border border-accent-primary bg-white text-xs font-semibold text-accent-primary flex items-center justify-center">{{ phase.week }}</span>
              <div class="rounded-2xl border border-soft bg-white p-4">
                <p class="text-xs uppercase tracking-wide text-neutral-500">{{ phase.label }}</p>
                <h3 class="mt-1 text-sm font-semibold text-primary">{{ phase.title }}</h3>
                <p class="mt-2 text-sm text-secondary">{{ phase.detail }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Plans -->
    <section id="plans" class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <header class="text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Choose the plan that matches your pace</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
            Each subscription includes proactive improvements, hosting, analytics instrumentation, and a dedicated point of contact.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <div
            v-for="plan in pricingTiers"
            :key="plan.name"
            class="flex flex-col gap-4 rounded-3xl border border-soft bg-white p-6 text-left shadow-sm hover:shadow-md transition"
          >
            <div class="flex items-baseline justify-between">
              <div>
                <p class="text-xs uppercase tracking-wide text-neutral-500">{{ plan.segment }}</p>
                <h3 class="mt-1 text-base font-semibold text-primary">{{ plan.name }}</h3>
              </div>
              <p class="text-lg font-semibold text-primary">{{ plan.price }}</p>
            </div>
            <p class="text-sm text-secondary">{{ plan.desc }}</p>
            <ul class="space-y-2 text-sm text-neutral-700">
              <li v-for="item in plan.features" :key="item" class="flex items-start gap-2">
                <span class="mt-0.5 text-accent-primary">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
            <button class="mt-auto rounded-full border border-accent-primary bg-accent-primary/10 px-4 py-2 text-sm font-medium text-accent-primary transition hover:bg-accent-primary hover:text-white">
              Talk to us about {{ plan.cta }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Assurance CTA -->
    <section class="mt-12 md:mt-16 bg-neutral-900 py-10 md:py-14 text-white">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">Ready when you are.</h2>
        <p class="mt-3 text-sm md:text-base text-neutral-200">
          Schedule a working session to review your goals, see relevant work, and build the roadmap for your launch.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <button class="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200">
            Book a kickoff call
          </button>
          <button class="rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Download deliverable checklist
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

const heroStats = [
  { label: 'Average launch window', value: '21 days', detail: 'From kickoff to go-live for typical builds' },
  { label: 'Included updates', value: 'Monthly sprints', detail: 'Dedicated capacity for optimization and new pages' },
  { label: 'Support access', value: 'Same-day', detail: 'Slack + email with your strategist and engineer' }
]

const heroRoadmap = [
  { step: '01', title: 'Discover & Align', detail: 'Audit your current presence, audience, and goals to shape the build roadmap.' },
  { step: '02', title: 'Prototype & Copy', detail: 'Collaborative wireframes, messaging, and content structure for every page.' },
  { step: '03', title: 'Design & Develop', detail: 'High-fidelity visuals, responsive dev, integrations, and QA across devices.' },
  { step: '04', title: 'Launch & Optimize', detail: 'Publish, instrument analytics, and plan the next improvements together.' }
]

const outcomePillars = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Strategy baked in',
    desc: 'Every site starts with positioning, messaging, and user journeys tailored to your buyers.',
    points: ['Persona-backed narrative', 'Conversion-focused architecture', 'Search-friendly content planning']
  },
  {
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    title: 'Design that feels like you',
    desc: 'Custom UI systems, animation, and brand extensions so your experience is unmistakably yours.',
    points: ['Component libraries for growth', 'Illustration & photography direction', 'Accessibility-first layouts']
  },
  {
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'Infrastructure handled',
    desc: 'Hosting, performance, monitoring, and security updates handled by the team that built it.',
    points: ['Managed hosting & SSL', 'Analytics + funnel instrumentation', 'Iterative optimizations every month']
  }
]

const allFeatures = [
  {
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    title: 'Story-driven copywriting',
    desc: 'Voice-of-customer interviews and tailored messaging to communicate why clients should choose you.'
  },
  { icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z', title: 'Experience architecture', desc: 'Information architecture, UX flows, and component design mapped to your customer journey.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Responsive development', desc: 'Clean, performant code that works across browsers, devices, and assistive technology.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Launch management', desc: 'Domain, DNS, analytics, redirects, QA, and punch-list handled for a smooth go-live.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Conversion optimization', desc: 'Heatmaps, funnel tracking, and iterative experiments to keep improving results.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title: 'Ongoing partnership', desc: 'Monthly planning calls, async updates, and a dedicated Slack channel with your pod.' }
]

const timelineCommitments = [
  'Weekly working sessions to keep momentum',
  'Async Loom recaps after every milestone',
  'Shared project hub with timelines and assets',
  'Clear scope guardrails with room for iteration'
]

const launchTimeline = [
  {
    week: 'WK1',
    label: 'Kickoff',
    title: 'Insight & strategy sprint',
    detail: 'Stakeholder interviews, analytics review, positioning and sitemap confirmation.'
  },
  {
    week: 'WK2',
    label: 'Structure',
    title: 'Copy and UX prototypes',
    detail: 'Draft page outlines, copy decks, and wireframes for core conversion paths.'
  },
  {
    week: 'WK3',
    label: 'Design',
    title: 'Visual exploration & system build',
    detail: 'Create moodboards, component library, and design proofs ready for dev handoff.'
  },
  {
    week: 'WK4',
    label: 'Build',
    title: 'Development & integrations',
    detail: 'Code responsive templates, configure CMS integrations, and connect analytics.'
  },
  {
    week: 'WK5',
    label: 'Launch',
    title: 'QA, training & go-live',
    detail: 'Full device QA, governance handoff, domain updates, and launch announcement assets.'
  }
]

const pricingTiers = [
  {
    segment: 'For founders',
    name: 'Core Launch',
    price: '$79/mo',
    desc: 'Perfect for new ventures that need a polished home base and clear storytelling.',
    features: ['Up to 6 custom pages', 'Foundational SEO + analytics setup', 'Monthly optimization sprint'],
    cta: 'a core launch'
  },
  {
    segment: 'For growing teams',
    name: 'Growth Site',
    price: '$129/mo',
    desc: 'Designed for teams iterating quickly with campaigns, landing pages, and integrations.',
    features: ['Unlimited page iterations', 'Conversion experiments + reporting', 'CRM & marketing integrations'],
    cta: 'a growth build'
  },
  {
    segment: 'For complex orgs',
    name: 'Experience Platform',
    price: 'Custom',
    desc: 'Match multi-region, multi-brand, or product ecosystem needs with a dedicated squad.',
    features: ['Advanced localization & accessibility', 'Systems architecture + documentation', 'Priority roadmap planning'],
    cta: 'an experience platform'
  }
]
</script>
