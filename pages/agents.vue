<template>
  <div class="pb-8 md:pb-12">
    <!-- Hero -->
    <section class="pt-12 md:pt-16">
      <div class="max-w-5xl mx-auto px-4 lg:px-6">
        <div class="grid gap-8 md:gap-10 md:grid-cols-2 md:items-center">
          <header class="max-w-3xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-600"></span>
              Autonomous AI agents
            </div>
            <h1 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              AI Agents that work 24/7—built & managed for you
            </h1>
            <p class="mt-4 text-base md:text-lg text-neutral-600 leading-relaxed">
              We build, train, and manage autonomous agents that handle support, qualify leads, and automate workflows. You just watch them work—no technical setup required.
            </p>
          </header>
          <div class="flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"
              alt="AI agents and workflow illustration"
              class="w-full max-w-md md:max-w-lg aspect-[4/3] object-cover rounded-xl border border-neutral-200 shadow-sm"
              loading="lazy"
            />
          </div>
        </div>
        <div class="relative mt-10 grid gap-6 rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-lg backdrop-blur md:grid-cols-[0.95fr_1fr] md:p-8">
          <div class="absolute inset-0 pointer-events-none rounded-3xl bg-white" aria-hidden="true" />
          <div class="relative space-y-6">
            <div>
              <h2 class="text-sm font-semibold uppercase tracking-wide text-neutral-500">Real results from day one</h2>
              <p class="mt-2 text-sm text-neutral-700">We handle setup, training, and monitoring—you get agents that actually work.</p>
            </div>
            <dl class="grid gap-3 md:grid-cols-2">
              <div
                v-for="metric in heroMetrics"
                :key="metric.label"
                class="rounded-2xl border border-neutral-200 bg-white/95 p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-600 hover:shadow-xl"
              >
                <dt class="text-xs uppercase tracking-wide text-neutral-500">{{ metric.label }}</dt>
                <dd class="mt-1 text-xl font-semibold text-neutral-900">{{ metric.value }}</dd>
              </div>
            </dl>
            <div class="flex flex-wrap gap-3">
              <NuxtLink to="/get-started" class="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800">
                Get started
              </NuxtLink>
              <a href="#catalog" class="rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 hover:border-blue-300">
                Browse templates
              </a>
            </div>
          </div>
          <div class="relative rounded-3xl border border-neutral-200 bg-neutral-50/90 p-6 shadow-inner shadow-white/60">
            <div class="absolute inset-x-6 -top-4 flex justify-center">
              <span class="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Guardrails
              </span>
            </div>
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-wide text-neutral-500">Realtime oversight</p>
                <p class="mt-1 text-lg font-semibold text-neutral-900">Humans stay in the loop</p>
              </div>
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-7 w-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <ul class="mt-5 space-y-3 text-sm text-neutral-700">
              <li v-for="guardrail in oversightGuardrails" :key="guardrail" class="flex items-start gap-2">
                <span class="mt-0.5 text-blue-600">•</span>
                <span>{{ guardrail }}</span>
              </li>
            </ul>
            <div class="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50 px-4 py-3 text-xs text-neutral-700">
              <p class="font-medium text-neutral-900">Live transcript review</p>
              <p class="mt-1 leading-relaxed">
                View every interaction in real-time, tag improvements, and push updated behaviors instantly across your agents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <header class="text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">What we build for you</h2>
          <p class="mt-3 text-sm md:text-base text-neutral-600 max-w-3xl mx-auto">
            Autonomous agents that handle the work you don't want to do—trained on your data, integrated with your tools, and monitored 24/7.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-3 gap-5">
          <article v-for="capability in agentCapabilities" :key="capability.title" class="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" :d="capability.icon" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-neutral-900">{{ capability.title }}</h3>
            <p class="text-sm text-neutral-600">{{ capability.desc }}</p>
            <ul class="mt-1 space-y-1 text-sm text-neutral-700">
              <li v-for="item in capability.examples" :key="item" class="flex items-start gap-2">
                <span class="mt-0.5 text-blue-600">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Catalog -->
    <section id="catalog" class="mt-12 md:mt-16 bg-neutral-50 py-10 md:py-14">
      <div class="max-w-6xl mx-auto px-3 sm:px-4">
        <header class="text-center">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">Pick a template, we'll customize it</h2>
          <p class="mt-3 text-sm md:text-base text-neutral-600 max-w-3xl mx-auto">
            Start with proven agent templates. We'll adapt them to your business, train them on your data, and connect them to your systems—all included in your monthly subscription.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="agent in agentTemplates" :key="agent.title" class="rounded-2xl border border-neutral-200 bg-white p-5 text-left">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-wide text-neutral-500">{{ agent.category }}</p>
                <h3 class="mt-1 text-sm font-semibold text-neutral-900">{{ agent.title }}</h3>
              </div>
              <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="agent.icon" />
                </svg>
              </div>
            </div>
            <p class="mt-3 text-sm text-neutral-600">{{ agent.desc }}</p>
            <ul class="mt-4 space-y-2 text-sm text-neutral-700">
              <li v-for="highlight in agent.highlights" :key="highlight" class="flex items-start gap-2">
                <span class="mt-0.5 text-blue-600">•</span>
                <span>{{ highlight }}</span>
              </li>
            </ul>
            <button class="mt-5 w-full rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 hover:border-blue-300">
              Configure this agent
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-6xl mx-auto px-4">
        <header class="text-center">
          <h2 class="text-2xl font-semibold tracking-tight text-neutral-900">How it works</h2>
          <p class="mt-3 text-sm md:text-base text-neutral-600">
            Subscribe, tell us your goals, and we'll handle everything—from setup to daily monitoring to weekly improvements.
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
          <div v-for="stage in operatingStages" :key="stage.title" class="rounded-2xl border border-neutral-200 bg-white p-5">
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


    <!-- CTA -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-2xl font-semibold tracking-tight text-neutral-900">Ready to automate your business?</h2>
        <p class="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
          Subscribe today and we'll build your first agent this week. No setup fees, no technical work—just results. Cancel anytime.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/get-started" class="rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">
            Get started
          </NuxtLink>
          <a href="#catalog" class="rounded-full border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 hover:border-blue-300">
            Browse templates
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

useHead({
  title: 'Autonomous AI Agents | Customer Service & Sales Automation | Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Deploy autonomous AI agents powered by GPT-4 that handle customer support, qualify sales leads, schedule meetings, and automate workflows. Includes CRM integration, multi-step task execution, and human oversight.'
    }
  ]
})

const heroMetrics = [
  { label: 'Median deflection', value: '68%', detail: 'Tickets resolved without human intervention' },
  { label: 'Lead response', value: '<2 min', detail: 'Average speed-to-lead across inbound channels' },
  { label: 'Human review', value: '24/7', detail: 'Supervisors alerted instantly for sensitive intents' }
]

const oversightGuardrails = [
  'Every response grounded in your approved sources',
  'Escalations triggered on sentiment, intent, or confidence thresholds',
  'Team can intercept and reply as the agent in real time'
]

const agentCapabilities = [
  {
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    title: 'Autonomous customer support',
    desc: 'AI agents that independently resolve tickets, process refunds, update accounts, and escalate complex issues.',
    examples: ['Autonomously troubleshoot and resolve technical issues', 'Process cancellations, refunds, and account changes', 'Update CRM records and create follow-up tasks']
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Sales & lead automation',
    desc: 'AI agents that qualify leads, schedule demos, send proposals, and nurture prospects through the sales funnel.',
    examples: ['Autonomous lead qualification and scoring', 'Schedule meetings and send calendar invites', 'Generate and send personalized proposals']
  },
  {
    icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z',
    title: 'Workflow automation',
    desc: 'AI agents that execute multi-step business processes, from order processing to employee onboarding.',
    examples: ['Process orders and update inventory systems', 'Automate employee onboarding workflows', 'Generate reports and send to stakeholders']
  }
]

const agentTemplates = [
  {
    category: 'Support',
    title: 'Success Navigator',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    desc: 'Always-on customer concierge that understands your product configuration and contracts.',
    highlights: ['Integrates with Zendesk, Intercom, Freshdesk', 'Understands entitlements and SLAs', 'Escalates mission-critical incidents with context']
  },
  {
    category: 'Revenue',
    title: 'Pipeline Partner',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    desc: 'Conversational SDR that captures leads across web chat, email, and LinkedIn and books meetings automatically.',
    highlights: ['Two-way calendar + CRM sync', 'Lead scoring based on firmographics', 'Hand-off notes for human reps']
  },
  {
    category: 'Onboarding',
    title: 'Activation Coach',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    desc: 'Guides new customers through setup tasks, training content, and milestone check-ins.',
    highlights: ['Automated email + chat nudges', 'Tracks progress across your product', 'Flags churn risk indicators early']
  },
  {
    category: 'Operations',
    title: 'Ops Desk',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    desc: 'Internal assistant for inventory, logistics, and vendor coordination.',
    highlights: ['Connects to ERP and inventory feeds', 'Raises alerts on supply gaps', 'Automates weekly status reporting']
  },
  {
    category: 'People',
    title: 'HR Ally',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    desc: 'Answers policy questions, helps with benefits enrollment, and gathers sentiment anonymously.',
    highlights: ['Understands region-specific policies', 'Collects pulse surveys', 'Escalates compliance or safety concerns']
  },
  {
    category: 'Product',
    title: 'Insights Analyst',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    desc: 'Transforms customer conversations into structured product feedback and trends.',
    highlights: ['Summarizes weekly feedback themes', 'Prioritizes issues by revenue impact', 'Pushes insights to Jira or Linear']
  }
]

const operatingCommitments = [
  'Monthly tuning sprints',
  'Dashboards for accuracy & CSAT',
  'Clear escalation playbooks'
]

const operatingStages = [
  {
    phase: '01',
    label: 'Modeling',
    title: 'Knowledge setup',
    detail: 'Ingest docs and data. Define intents and rules.'
  },
  {
    phase: '02',
    label: 'Simulation',
    title: 'Scenario testing',
    detail: 'Simulate conversations to validate accuracy and tone.'
  },
  {
    phase: '03',
    label: 'Launch',
    title: 'Deploy & handoff',
    detail: 'Launch across channels and connect to your stack.'
  },
  {
    phase: '04',
    label: 'Optimization',
    title: 'Continuous improvement',
    detail: 'Review transcripts and ship weekly improvements.'
  }
]

const integrationStack = [
  'Salesforce & HubSpot',
  'Zendesk, Intercom & Help Scout',
  'Slack & Microsoft Teams',
  'Notion, Confluence, Guru',
  'Custom REST & GraphQL APIs',
  'Voice & telephony platforms'
]

const securityPractices = [
  'Role-based access, SSO, and audit logging',
  'PII redaction and secure vector storage',
  'Regional hosting options and data residency controls',
  'SOC 2-ready policies with documentation on request'
]
</script>
