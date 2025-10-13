<template>
  <div class="py-12 md:py-16">
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-subtle via-white to-white" aria-hidden="true" />
      <div class="relative max-w-6xl mx-auto px-3 sm:px-4 grid lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center">
        <div class="text-center lg:text-left">
          <p class="inline-flex items-center gap-2 rounded-full border border-accent-subtle/60 bg-white px-3 py-1 text-xs font-medium text-accent-primary">
            Subscription websites built to launch fast and scale with you
          </p>
          <h1 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-primary">
            A modern website program without the huge upfront invoice
          </h1>
          <p class="mt-4 text-sm md:text-base text-secondary max-w-xl mx-auto lg:mx-0">
            Partner with a dedicated design + engineering pod that delivers the site, the content, the infrastructure, and the ongoing improvements—all on a predictable monthly plan.
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
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-subtle text-2xl text-accent-primary">🌐</span>
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
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Websites engineered for real business outcomes</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
            Every engagement combines product strategy, UX, creative, copy, and technical support so you launch with clarity and continue optimizing as you grow.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-3 gap-5">
          <article
            v-for="pillar in outcomePillars"
            :key="pillar.title"
            class="flex flex-col gap-3 rounded-2xl border border-soft bg-white p-5"
          >
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle text-xl">{{ pillar.emoji }}</div>
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
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Everything included in every website plan</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-3xl mx-auto">
            No hidden add-ons. We deliver the full stack—strategy, UX, visual design, development, hosting, and continuous improvement.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="feature in allFeatures"
            :key="feature.title"
            class="rounded-2xl border border-soft bg-white p-5"
          >
            <div class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-lg text-accent-primary">
              {{ feature.emoji }}
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
  title: 'Website Subscriptions — Launch & Grow with Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Launch a custom website with strategy, design, copy, development, hosting, and ongoing improvements on one predictable subscription.'
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
    emoji: '🧭',
    title: 'Strategy baked in',
    desc: 'Every site starts with positioning, messaging, and user journeys tailored to your buyers.',
    points: ['Persona-backed narrative', 'Conversion-focused architecture', 'Search-friendly content planning']
  },
  {
    emoji: '🎨',
    title: 'Design that feels like you',
    desc: 'Custom UI systems, animation, and brand extensions so your experience is unmistakably yours.',
    points: ['Component libraries for growth', 'Illustration & photography direction', 'Accessibility-first layouts']
  },
  {
    emoji: '⚙️',
    title: 'Infrastructure handled',
    desc: 'Hosting, performance, monitoring, and security updates handled by the team that built it.',
    points: ['Managed hosting & SSL', 'Analytics + funnel instrumentation', 'Iterative optimizations every month']
  }
]

const allFeatures = [
  {
    emoji: '📝',
    title: 'Story-driven copywriting',
    desc: 'Voice-of-customer interviews and tailored messaging to communicate why clients should choose you.'
  },
  { emoji: '📐', title: 'Experience architecture', desc: 'Information architecture, UX flows, and component design mapped to your customer journey.' },
  { emoji: '💻', title: 'Responsive development', desc: 'Clean, performant code that works across browsers, devices, and assistive technology.' },
  { emoji: '🚀', title: 'Launch management', desc: 'Domain, DNS, analytics, redirects, QA, and punch-list handled for a smooth go-live.' },
  { emoji: '📈', title: 'Conversion optimization', desc: 'Heatmaps, funnel tracking, and iterative experiments to keep improving results.' },
  { emoji: '🤝', title: 'Ongoing partnership', desc: 'Monthly planning calls, async updates, and a dedicated Slack channel with your pod.' }
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
