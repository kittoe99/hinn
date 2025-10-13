<template>
  <div class="py-12 md:py-16">
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-subtle via-white to-white" aria-hidden="true" />
      <div class="relative max-w-6xl mx-auto px-3 sm:px-4 grid lg:grid-cols-[1.05fr_1fr] gap-8 md:gap-12 items-center">
        <div class="text-center lg:text-left">
          <p class="inline-flex items-center gap-2 rounded-full border border-accent-subtle/60 bg-white px-3 py-1 text-xs font-medium text-accent-primary">
            Full-funnel marketing sprints designed for subscription brands
          </p>
          <h1 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-primary">
            Turn your positioning into campaigns that convert—month after month
          </h1>
          <p class="mt-4 text-sm md:text-base text-secondary max-w-xl mx-auto lg:mx-0">
            Strategy, creative, content, and analytics delivered by one dedicated team. We develop the playbook, produce the assets, launch campaigns, and report the impact every sprint.
          </p>
          <div class="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <button class="w-full sm:w-auto rounded-full bg-accent-primary px-5 py-3 text-sm md:text-base font-medium text-white shadow-sm shadow-accent-primary/20 transition hover:bg-accent-focus">
              Plan a campaign sprint
            </button>
            <a
              href="#services"
              class="w-full sm:w-auto rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm md:text-base font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Explore deliverables
            </a>
          </div>
          <dl class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div v-for="signal in heroSignals" :key="signal.label" class="rounded-2xl border border-soft bg-white/80 px-4 py-3 backdrop-blur">
              <dt class="text-xs uppercase tracking-wide text-neutral-500">{{ signal.label }}</dt>
              <dd class="mt-1 text-xl font-semibold text-primary">{{ signal.value }}</dd>
              <p class="mt-1 text-xs text-secondary">{{ signal.detail }}</p>
            </div>
          </dl>
        </div>
        <div class="relative">
          <div class="rounded-3xl border border-soft bg-white/90 p-6 shadow-lg shadow-accent-subtle/40">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-neutral-500">Sprint artifacts</p>
                <p class="mt-1 text-lg font-semibold text-primary">Everything you need to launch</p>
              </div>
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-subtle text-2xl text-accent-primary">🎨</span>
            </div>
            <ul class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700">
              <li v-for="artifact in sprintArtifacts" :key="artifact" class="rounded-2xl border border-soft bg-white/80 px-3 py-3">
                {{ artifact }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <header class="text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Strategic pods focused on impact</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-3xl mx-auto">
            Choose the motion that matches your goals. Each pod pairs a strategist, brand designer, content lead, and marketing engineer working in two-week cycles.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-3 gap-5">
          <article v-for="lane in marketingLanes" :key="lane.title" class="flex flex-col gap-3 rounded-2xl border border-soft bg-white p-5">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle text-xl">{{ lane.emoji }}</div>
            <h3 class="text-base font-semibold text-primary">{{ lane.title }}</h3>
            <p class="text-sm text-secondary">{{ lane.desc }}</p>
            <ul class="mt-1 space-y-1 text-sm text-neutral-700">
              <li v-for="deliverable in lane.deliverables" :key="deliverable" class="flex items-start gap-2">
                <span class="mt-0.5 text-accent-primary">•</span>
                <span>{{ deliverable }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Playbook -->
    <section class="mt-12 md:mt-16 bg-neutral-50 py-10 md:py-14">
      <div class="max-w-6xl mx-auto px-3 sm:px-4">
        <div class="grid md:grid-cols-[1fr_1.1fr] gap-8 items-start">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight text-primary">Our playbook for repeatable growth</h2>
            <p class="mt-3 text-sm md:text-base text-secondary">
              We pair deep research with agile execution. Every sprint ladders up to a quarterly growth thesis and is measured against shared KPIs.
            </p>
            <ul class="mt-5 space-y-3 text-sm text-neutral-700">
              <li v-for="principle in playbookPrinciples" :key="principle" class="flex items-start gap-2">
                <span class="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-subtle text-xs font-semibold text-accent-primary">✓</span>
                <span>{{ principle }}</span>
              </li>
            </ul>
          </div>
          <div class="relative pl-5 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-neutral-200">
            <div v-for="stage in playbookStages" :key="stage.title" class="relative mb-6 last:mb-0">
              <span class="absolute -left-[11px] top-1 h-5 w-5 rounded-full border border-accent-primary bg-white text-xs font-semibold text-accent-primary flex items-center justify-center">{{ stage.phase }}</span>
              <div class="rounded-2xl border border-soft bg-white p-4">
                <p class="text-xs uppercase tracking-wide text-neutral-500">{{ stage.label }}</p>
                <h3 class="mt-1 text-sm font-semibold text-primary">{{ stage.title }}</h3>
                <p class="mt-2 text-sm text-secondary">{{ stage.detail }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Campaign library -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <header class="text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Campaigns and content that ship every month</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-3xl mx-auto">
            Mix and match from our campaign library depending on what will move the metric right now. We help you prioritize with data and customer insights.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-2 gap-5">
          <article v-for="campaign in campaignLibrary" :key="campaign.title" class="rounded-2xl border border-soft bg-white p-5 text-left">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-wide text-neutral-500">{{ campaign.goal }}</p>
                <h3 class="mt-1 text-base font-semibold text-primary">{{ campaign.title }}</h3>
              </div>
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-lg text-accent-primary">{{ campaign.emoji }}</span>
            </div>
            <p class="mt-3 text-sm text-secondary">{{ campaign.desc }}</p>
            <ul class="mt-4 space-y-2 text-sm text-neutral-700">
              <li v-for="asset in campaign.assets" :key="asset" class="flex items-start gap-2">
                <span class="mt-0.5 text-accent-primary">•</span>
                <span>{{ asset }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Measurement -->
    <section class="mt-12 md:mt-16 bg-neutral-900 py-10 md:py-14 text-white">
      <div class="max-w-6xl mx-auto px-3 sm:px-4">
        <div class="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
          <div>
            <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">Clarity on what’s working every step of the way</h2>
            <p class="mt-3 text-sm md:text-base text-neutral-200">
              From attribution to creative testing, we set up dashboards that make it easy for stakeholders to see results and plan the next sprint.
            </p>
            <ul class="mt-5 space-y-3 text-sm text-neutral-100">
              <li v-for="insight in measurementInsights" :key="insight" class="flex items-start gap-2">
                <span class="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">✓</span>
                <span>{{ insight }}</span>
              </li>
            </ul>
          </div>
          <div class="rounded-3xl border border-white/20 bg-white/5 p-6 text-left">
            <h3 class="text-lg font-semibold">Reporting stack</h3>
            <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-100">
              <li v-for="tool in reportingTools" :key="tool" class="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">{{ tool }}</li>
            </ul>
            <button class="mt-6 rounded-full border border-white/40 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
              View sample reports
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-2xl font-semibold tracking-tight text-primary">Let’s co-create your next marketing chapter</h2>
        <p class="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Tell us what you’re solving for—pipeline, retention, awareness—and we’ll architect the roadmap and show you how we’ll measure success.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <button class="rounded-full bg-accent-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-focus">
            Request a strategy session
          </button>
          <button class="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50">
            Download our capabilities deck
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Marketing Subscriptions — Campaign Strategy & Creative by Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Run ongoing marketing sprints with strategy, creative, copy, and analytics delivered by one dedicated team focused on measurable growth.'
    }
  ]
})

const heroSignals = [
  { label: 'Average lift', value: '38%', detail: 'Pipeline increase across 90-day engagements' },
  { label: 'Creative velocity', value: '25+ assets', detail: 'Shipped every monthly sprint on average' },
  { label: 'Attribution clarity', value: 'Full-funnel', detail: 'Dashboards tying spend to revenue impact' }
]

const sprintArtifacts = [
  'Channel playbook & messaging hierarchy',
  'Creative concepts & visual explorations',
  'Copy decks for ads, email, and landing pages',
  'Analytics tagging plan & QA checklist',
  'Retrospective report with next sprint priorities',
  'Executive summary slides for stakeholders'
]

const marketingLanes = [
  {
    emoji: '🚀',
    title: 'Acquisition engine',
    desc: 'Launch and optimize paid, organic, and partner campaigns that fuel consistent pipeline.',
    deliverables: ['Growth experiments and CRO roadmap', 'Paid media creative + copy refreshes', 'SEO content briefs & publishing calendar']
  },
  {
    emoji: '🤝',
    title: 'Lifecycle momentum',
    desc: 'Turn signups into loyal customers with automated journeys, nurture programs, and CX collaboration.',
    deliverables: ['Onboarding + education sequences', 'Product launch kits & retention campaigns', 'Feedback loops with CS & product']
  },
  {
    emoji: '📣',
    title: 'Brand elevation',
    desc: 'Shape perception through storytelling, thought leadership, and experiential activations.',
    deliverables: ['Narrative frameworks & messaging updates', 'Signature content series & PR hooks', 'Event, webinar, and community toolkits']
  }
]

const playbookPrinciples = [
  'Quarterly growth thesis anchored in revenue targets',
  'Customer interviews feed positioning and creative briefs',
  'Two-week sprints with mid-sprint reviews and async recaps',
  'Transparent backlog prioritized with your leadership team'
]

const playbookStages = [
  {
    phase: '01',
    label: 'Discovery',
    title: 'Insights & alignment workshop',
    detail: 'Audit messaging, funnel performance, audience data, and goals to craft the quarterly thesis.'
  },
  {
    phase: '02',
    label: 'Strategy',
    title: 'Channel + creative roadmap',
    detail: 'Plot sprint themes, define KPIs, and select campaigns that support near-term and long-term growth.'
  },
  {
    phase: '03',
    label: 'Execution',
    title: 'Production & launch',
    detail: 'Design, write, develop, and deploy campaigns with QA, tracking, and enablement collateral included.'
  },
  {
    phase: '04',
    label: 'Optimization',
    title: 'Review & iterate',
    detail: 'Analyze performance, ship experiments, and adjust the backlog based on impact and learning velocity.'
  }
]

const campaignLibrary = [
  {
    goal: 'Demand acceleration',
    title: 'Flagship launch campaign',
    emoji: '🚩',
    desc: 'Own a moment in your market with narrative, creative, and promotion that coordinates across channels.',
    assets: ['Launch landing hub + microsite', 'Email + SMS nurture sequences', 'Paid + organic social asset suite', 'PR pitch angles and talking points']
  },
  {
    goal: 'Revenue expansion',
    title: 'Lifecycle upsell program',
    emoji: '💡',
    desc: 'Convert existing customers with contextual education, upgrade offers, and CX enablement.',
    assets: ['Usage-triggered email journeys', 'In-product announcements & banners', 'Customer webinar + playbook kit', 'Sales enablement one-pagers']
  },
  {
    goal: 'Awareness & authority',
    title: 'Thought leadership series',
    emoji: '📰',
    desc: 'Publish a high-signal editorial series and distribute it across owned and earned channels.',
    assets: ['Research report & gated asset', 'Podcast or video interview kit', 'LinkedIn & blog content calendar', 'Media outreach toolkit']
  },
  {
    goal: 'Community activation',
    title: 'Event & partner campaign',
    emoji: '🤝',
    desc: 'Activate your ecosystem with co-marketing, live experiences, and evergreen community assets.',
    assets: ['Co-branded landing experience', 'Event creative system & swag', 'Influencer + partner outreach', 'Post-event nurture & recap assets']
  }
]

const measurementInsights = [
  'Weekly dashboards covering pipeline, retention, and engagement',
  'Creative testing matrices with winning concept highlights',
  'Attribution modeling recommendations with clear next actions',
  'Executive-ready recaps summarizing signal, impact, and plan'
]

const reportingTools = [
  'Looker & Mode dashboards',
  'GA4 + server-side tagging',
  'HubSpot & Salesforce reports',
  'Mixpanel & Amplitude cohorts',
  'Figma & Notion collaboration hubs',
  'Airtable campaign tracker'
]
</script>
