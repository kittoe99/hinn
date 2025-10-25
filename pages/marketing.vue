<template>
  <div class="pb-8 md:pb-12">
    <!-- Hero -->
    <section class="pt-12 md:pt-16">
      <div class="max-w-5xl mx-auto px-4 lg:px-6">
        <div class="grid gap-8 md:grid-cols-2 md:items-center">
          <header class="max-w-3xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-600"></span>
              Marketing & Branding
            </div>
            <h1 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              Marketing & branding that actually drives growth—done for you
            </h1>
            <p class="mt-4 text-base md:text-lg text-neutral-600 leading-relaxed">
              We handle your brand identity, content creation, and campaign execution. You get professional marketing that works—no agencies to manage, no freelancers to chase.
            </p>
          </header>
          <div class="flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"
              alt="Marketing team collaboration"
              class="w-full max-w-md md:max-w-lg aspect-[4/3] object-cover rounded-xl border border-neutral-200 shadow-sm"
              loading="lazy"
            />
          </div>
        </div>
        <div class="relative mt-10 grid gap-6 rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-lg shadow-accent-subtle/20 backdrop-blur md:grid-cols-[0.95fr_1fr] md:p-8">
          <div class="absolute inset-0 pointer-events-none rounded-3xl bg-white" aria-hidden="true" />
          <div class="relative space-y-6">
            <div>
              <h2 class="text-sm font-semibold uppercase tracking-wide text-neutral-500">What's included</h2>
              <p class="mt-2 text-sm text-neutral-700">
                Brand identity, content creation, and campaign management—all handled for you monthly.
              </p>
            </div>
            <dl class="grid gap-3 md:grid-cols-2">
              <div
                v-for="signal in heroSignals"
                :key="signal.label"
                class="rounded-2xl border border-neutral-200 bg-white/95 p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-600 hover:shadow-xl"
              >
                <dt class="text-xs uppercase tracking-wide text-neutral-500">{{ signal.label }}</dt>
                <dd class="mt-1 text-xl font-semibold text-neutral-900">{{ signal.value }}</dd>
              </div>
            </dl>
            <div class="flex flex-wrap gap-3">
              <NuxtLink to="/get-started" class="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800">
                Get started
              </NuxtLink>
              <a href="#services" class="rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 hover:border-blue-300">
                See what's included
              </a>
            </div>
          </div>
          <div class="relative rounded-3xl border border-neutral-200 bg-neutral-50/90 p-6 shadow-inner shadow-white/60">
            <div class="absolute inset-x-6 -top-4 flex justify-center">
              <span class="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Deliverables
              </span>
            </div>
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-wide text-neutral-500">What you get</p>
                <p class="mt-1 text-lg font-semibold text-neutral-900">Everything you need to market your business</p>
              </div>
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-7 w-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </div>
            <ul class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700">
              <li v-for="artifact in sprintArtifacts" :key="artifact" class="rounded-2xl border border-neutral-200 bg-white/95 px-3 py-3 shadow-sm">
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
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">What we build for you</h2>
          <p class="mt-3 text-sm md:text-base text-neutral-600 max-w-3xl mx-auto">
            From brand identity to campaign execution—we handle everything so you can focus on running your business.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-3 gap-5">
          <article v-for="lane in marketingLanes" :key="lane.title" class="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" :d="lane.icon" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-neutral-900">{{ lane.title }}</h3>
            <p class="text-sm text-neutral-600">{{ lane.desc }}</p>
            <ul class="mt-1 space-y-1 text-sm text-neutral-700">
              <li v-for="deliverable in lane.deliverables" :key="deliverable" class="flex items-start gap-2">
                <span class="mt-0.5 text-blue-600">•</span>
                <span>{{ deliverable }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-6xl mx-auto px-4">
        <header class="text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">How it works</h2>
          <p class="mt-3 text-sm md:text-base text-neutral-600">
            Subscribe, share your goals, and we'll handle everything—from brand design to campaign execution.
          </p>
          <div class="mt-5 flex flex-wrap justify-center gap-2">
            <span
              v-for="chip in operatingCommitments"
              :key="chip"
              class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clip-rule="evenodd"/></svg>
              {{ chip }}
            </span>
          </div>
        </header>

        <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="stage in playbookStages" :key="stage.title" class="rounded-2xl border border-neutral-200 bg-white p-5">
            <div class="flex items-center justify-between">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 text-sm font-bold text-blue-700">{{ stage.phase }}</span>
              <span class="text-xs uppercase tracking-wide text-neutral-500">{{ stage.label }}</span>
            </div>
            <h3 class="mt-3 text-sm font-semibold text-neutral-900">{{ stage.title }}</h3>
            <p class="mt-2 text-sm text-neutral-600">{{ stage.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Campaign library -->
    <section class="mt-12 md:mt-16 bg-neutral-50 py-10 md:py-14">
      <div class="max-w-6xl mx-auto px-3 sm:px-4">
        <header class="text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">Campaign templates we customize for you</h2>
          <p class="mt-3 text-sm md:text-base text-neutral-600 max-w-3xl mx-auto">
            Pick a campaign type and we'll adapt it to your brand, create all the assets, and manage the execution—all included monthly.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-2 gap-4">
          <article v-for="campaign in campaignLibrary" :key="campaign.title" class="rounded-2xl border border-neutral-200 bg-white p-5 text-left">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-wide text-neutral-500">{{ campaign.goal }}</p>
                <h3 class="mt-1 text-sm font-semibold text-neutral-900">{{ campaign.title }}</h3>
              </div>
              <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="campaign.icon" />
                </svg>
              </div>
            </div>
            <p class="mt-3 text-sm text-neutral-600">{{ campaign.desc }}</p>
            <ul class="mt-4 space-y-2 text-sm text-neutral-700">
              <li v-for="asset in campaign.assets" :key="asset" class="flex items-start gap-2">
                <span class="mt-0.5 text-blue-600">•</span>
                <span>{{ asset }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-2xl font-semibold tracking-tight text-neutral-900">Ready to grow your brand?</h2>
        <p class="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
          Subscribe today and we'll start building your brand this week. No setup fees, no contracts—just professional marketing that works. Cancel anytime.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/get-started" class="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">
            Get started
          </NuxtLink>
          <a href="#services" class="rounded-full border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 hover:border-blue-300">
            See what's included
          </a>
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

const operatingCommitments = [
  'Cancel anytime',
  'Unlimited revisions',
  'Weekly updates'
]

const playbookStages = [
  {
    phase: '01',
    label: 'Subscribe',
    title: 'Pick your plan',
    detail: 'Choose monthly or annual. Cancel anytime.'
  },
  {
    phase: '02',
    label: 'Kickoff',
    title: 'Share your vision',
    detail: 'Tell us about your brand, goals, and target audience.'
  },
  {
    phase: '03',
    label: 'Build',
    title: 'We create everything',
    detail: 'Sit back while we design your brand and build campaigns.'
  },
  {
    phase: '04',
    label: 'Launch',
    title: 'Go live & iterate',
    detail: 'We launch, monitor results, and improve weekly.'
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
