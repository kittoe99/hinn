<template>
  <div class="pb-8 md:pb-12">
    <!-- Hero -->
    <section class="relative overflow-hidden pt-4 md:pt-6">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-subtle via-white to-white" aria-hidden="true" />
      <div class="relative max-w-6xl mx-auto px-3 sm:px-4 grid lg:grid-cols-[1.05fr_1fr] gap-8 md:gap-12 items-center">
        <div class="text-center lg:text-left">
          <p class="inline-flex items-center gap-2 rounded-full border border-accent-subtle/60 bg-white px-3 py-1 text-xs font-medium text-accent-primary">
            Digital marketing services on monthly subscription
          </p>
          <h1 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-primary">
            Digital Marketing Services & Campaign Management
          </h1>
          <p class="mt-4 text-sm md:text-base text-secondary max-w-xl mx-auto lg:mx-0">
            Comprehensive marketing strategy, content creation, email marketing automation, social media management, PPC advertising, SEO content, and performance analytics—delivered by a dedicated team in monthly sprints.
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
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-subtle text-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-7 w-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
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
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Full-Service Digital Marketing Solutions</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-3xl mx-auto">
            Integrated marketing campaigns combining brand strategy, content marketing, email automation, social media advertising, SEO optimization, and conversion rate optimization—all managed by expert strategists and designers.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-3 gap-5">
          <article v-for="lane in marketingLanes" :key="lane.title" class="flex flex-col gap-3 rounded-2xl border border-soft bg-white p-5">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" :d="lane.icon" />
              </svg>
            </div>
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
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Marketing Campaigns & Content Strategy</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-3xl mx-auto">
            Data-driven marketing campaigns including landing page optimization, email sequences, social media content calendars, paid advertising creative, and content marketing strategies tailored to your business goals.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-2 gap-5">
          <article v-for="campaign in campaignLibrary" :key="campaign.title" class="rounded-2xl border border-soft bg-white p-5 text-left">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-wide text-neutral-500">{{ campaign.goal }}</p>
                <h3 class="mt-1 text-base font-semibold text-primary">{{ campaign.title }}</h3>
              </div>
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="campaign.icon" />
                </svg>
              </div>
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
  title: 'Digital Marketing Services | Email Marketing & Social Media Management | Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Full-service digital marketing including content strategy, email automation, PPC advertising, social media management, SEO content, and analytics. Monthly subscription with dedicated marketing team.'
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
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Acquisition engine',
    desc: 'Launch and optimize paid, organic, and partner campaigns that fuel consistent pipeline.',
    deliverables: ['Growth experiments and CRO roadmap', 'Paid media creative + copy refreshes', 'SEO content briefs & publishing calendar']
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'Lifecycle momentum',
    desc: 'Turn signups into loyal customers with automated journeys, nurture programs, and CX collaboration.',
    deliverables: ['Onboarding + education sequences', 'Product launch kits & retention campaigns', 'Feedback loops with CS & product']
  },
  {
    icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
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
    icon: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9',
    desc: 'Own a moment in your market with narrative, creative, and promotion that coordinates across channels.',
    assets: ['Launch landing hub + microsite', 'Email + SMS nurture sequences', 'Paid + organic social asset suite', 'PR pitch angles and talking points']
  },
  {
    goal: 'Revenue expansion',
    title: 'Lifecycle upsell program',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    desc: 'Convert existing customers with contextual education, upgrade offers, and CX enablement.',
    assets: ['Usage-triggered email journeys', 'In-product announcements & banners', 'Customer webinar + playbook kit', 'Sales enablement one-pagers']
  },
  {
    goal: 'Awareness & authority',
    title: 'Thought leadership series',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    desc: 'Publish a high-signal editorial series and distribute it across owned and earned channels.',
    assets: ['Research report & gated asset', 'Podcast or video interview kit', 'LinkedIn & blog content calendar', 'Media outreach toolkit']
  },
  {
    goal: 'Community activation',
    title: 'Event & partner campaign',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
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
