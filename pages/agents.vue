<template>
  <div class="py-12 md:py-16">
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-subtle via-white to-white" aria-hidden="true" />
      <div class="relative max-w-6xl mx-auto px-3 sm:px-4 grid lg:grid-cols-[1.05fr_1fr] items-center gap-8 md:gap-12">
        <div class="text-center lg:text-left">
          <p class="inline-flex items-center gap-2 rounded-full border border-accent-subtle/60 bg-white px-3 py-1 text-xs font-medium text-accent-primary">
            AI agents tailored to your data, workflows, and brand voice
          </p>
          <h1 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-primary">
            Launch a bench of AI teammates that actually know your business
          </h1>
          <p class="mt-4 text-sm md:text-base text-secondary max-w-xl mx-auto lg:mx-0">
            From support to sales to operations, deploy specialists trained on your knowledge base, policies, and product data. Each agent is monitored, iterated, and aligned with your KPIs.
          </p>
          <div class="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <button class="w-full sm:w-auto rounded-full bg-accent-primary px-5 py-3 text-sm md:text-base font-medium text-white shadow-sm shadow-accent-primary/20 transition hover:bg-accent-focus">
              Design my agent squad
            </button>
            <a
              href="#catalog"
              class="w-full sm:w-auto rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm md:text-base font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Browse templates
            </a>
          </div>
          <dl class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div v-for="metric in heroMetrics" :key="metric.label" class="rounded-2xl border border-soft bg-white/80 px-4 py-3 backdrop-blur">
              <dt class="text-xs uppercase tracking-wide text-neutral-500">{{ metric.label }}</dt>
              <dd class="mt-1 text-xl font-semibold text-primary">{{ metric.value }}</dd>
              <p class="mt-1 text-xs text-secondary">{{ metric.detail }}</p>
            </div>
          </dl>
        </div>
        <div class="relative">
          <div class="rounded-3xl border border-soft bg-white/90 p-6 shadow-lg shadow-accent-subtle/40">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-neutral-500">Realtime oversight</p>
                <p class="mt-1 text-lg font-semibold text-primary">Humans stay in the loop</p>
              </div>
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-subtle text-2xl text-accent-primary">🤖</span>
            </div>
            <ul class="mt-5 space-y-3 text-left text-sm text-neutral-700">
              <li v-for="guardrail in oversightGuardrails" :key="guardrail" class="flex items-start gap-2">
                <span class="mt-0.5 text-accent-primary">•</span>
                <span>{{ guardrail }}</span>
              </li>
            </ul>
            <div class="mt-6 rounded-2xl border border-dashed border-accent-subtle bg-accent-subtle/40 px-4 py-3 text-left text-xs text-neutral-600">
              <p class="font-medium text-primary">Live transcript review</p>
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
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Purpose-built agents for the entire customer journey</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-3xl mx-auto">
            Blend proactive outreach, responsive support, and internal automation. Each agent leverages your docs, CRM, and product systems while staying on-brand.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-3 gap-5">
          <article v-for="capability in agentCapabilities" :key="capability.title" class="flex flex-col gap-3 rounded-2xl border border-soft bg-white p-5">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle text-xl">{{ capability.emoji }}</div>
            <h3 class="text-base font-semibold text-primary">{{ capability.title }}</h3>
            <p class="text-sm text-secondary">{{ capability.desc }}</p>
            <ul class="mt-1 space-y-1 text-sm text-neutral-700">
              <li v-for="item in capability.examples" :key="item" class="flex items-start gap-2">
                <span class="mt-0.5 text-accent-primary">•</span>
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
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Choose a starting template, then tailor every behavior</h2>
          <p class="mt-3 text-sm md:text-base text-secondary max-w-3xl mx-auto">
            Our library of agent templates accelerates setup. We import your knowledge base, map intents, configure integrations, and run simulations before going live.
          </p>
        </header>
        <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="agent in agentTemplates" :key="agent.title" class="rounded-2xl border border-soft bg-white p-5 text-left">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-wide text-neutral-500">{{ agent.category }}</p>
                <h3 class="mt-1 text-sm font-semibold text-primary">{{ agent.title }}</h3>
              </div>
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-lg text-accent-primary">{{ agent.emoji }}</span>
            </div>
            <p class="mt-3 text-sm text-secondary">{{ agent.desc }}</p>
            <ul class="mt-4 space-y-2 text-sm text-neutral-700">
              <li v-for="highlight in agent.highlights" :key="highlight" class="flex items-start gap-2">
                <span class="mt-0.5 text-accent-primary">•</span>
                <span>{{ highlight }}</span>
              </li>
            </ul>
            <button class="mt-5 w-full rounded-full border border-accent-primary bg-accent-primary/10 px-4 py-2 text-sm font-medium text-accent-primary transition hover:bg-accent-primary hover:text-white">
              Configure this agent
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Operating model -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <div class="grid md:grid-cols-[1fr_1.1fr] gap-8 items-start">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight text-primary">A managed operating model that keeps improving</h2>
            <p class="mt-3 text-sm md:text-base text-secondary">
              Agents are only as good as the feedback loops around them. We pair instrumentation, human QA, and business context so they keep getting smarter.
            </p>
            <ul class="mt-5 space-y-3 text-sm text-neutral-700">
              <li v-for="commitment in operatingCommitments" :key="commitment" class="flex items-start gap-2">
                <span class="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-subtle text-xs font-semibold text-accent-primary">✓</span>
                <span>{{ commitment }}</span>
              </li>
            </ul>
          </div>
          <div class="relative pl-5 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-neutral-200">
            <div v-for="stage in operatingStages" :key="stage.title" class="relative mb-6 last:mb-0">
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

    <!-- Integrations & security -->
    <section class="mt-12 md:mt-16 bg-neutral-900 py-10 md:py-14 text-white">
      <div class="max-w-6xl mx-auto px-3 sm:px-4">
        <div class="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
          <div>
            <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">Connect to the tools your team already uses</h2>
            <p class="mt-3 text-sm md:text-base text-neutral-200">
              We integrate directly into CRMs, support desks, knowledge bases, and internal APIs. No copy-paste maintenance or brittle workflows.
            </p>
            <ul class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-100">
              <li v-for="integration in integrationStack" :key="integration" class="rounded-2xl border border-white/20 bg-white/5 px-4 py-3">
                {{ integration }}
              </li>
            </ul>
          </div>
          <div class="rounded-3xl border border-white/20 bg-white/5 p-6 text-left">
            <h3 class="text-lg font-semibold">Security, privacy & compliance</h3>
            <ul class="mt-4 space-y-3 text-sm text-neutral-100">
              <li v-for="policy in securityPractices" :key="policy" class="flex items-start gap-2">
                <span class="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">✓</span>
                <span>{{ policy }}</span>
              </li>
            </ul>
            <button class="mt-6 rounded-full border border-white/40 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
              Request compliance packet
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mt-12 md:mt-16">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-2xl font-semibold tracking-tight text-primary">Ready to meet your first agent?</h2>
        <p class="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Share your goals and systems—we will propose an agent mix, draft scripts, and schedule a live simulation within a week.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <button class="rounded-full bg-accent-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-focus">
            Schedule a discovery call
          </button>
          <button class="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50">
            View sample transcripts
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'AI Agents — Automate Support, Sales & Ops with Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Deploy managed AI agents trained on your business data to handle support, sales, onboarding, and internal operations with human oversight.'
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
    emoji: '💬',
    title: 'Customer support',
    desc: 'Resolve billing, technical, and onboarding questions with context-aware responses.',
    examples: ['Troubleshoot product issues with logs and KBs', 'Capture CSAT and escalate high-impact tickets', 'Trigger workflows in your help desk']
  },
  {
    emoji: '🧲',
    title: 'Revenue & growth',
    desc: 'Qualify and nurture leads, recommend plans, and book meetings while you sleep.',
    examples: ['Automated discovery call scheduling', 'Personalized product walkthroughs', 'Upsell prompts based on usage signals']
  },
  {
    emoji: '📦',
    title: 'Operations & enablement',
    desc: 'Keep internal teams unblocked with proactive alerts, SOP lookups, and task automation.',
    examples: ['Answer policy & HR questions instantly', 'Generate project briefs from templates', 'Create tickets, tasks, and follow-ups in connected tools']
  }
]

const agentTemplates = [
  {
    category: 'Support',
    title: 'Success Navigator',
    emoji: '🧭',
    desc: 'Always-on customer concierge that understands your product configuration and contracts.',
    highlights: ['Integrates with Zendesk, Intercom, Freshdesk', 'Understands entitlements and SLAs', 'Escalates mission-critical incidents with context']
  },
  {
    category: 'Revenue',
    title: 'Pipeline Partner',
    emoji: '📈',
    desc: 'Conversational SDR that captures leads across web chat, email, and LinkedIn and books meetings automatically.',
    highlights: ['Two-way calendar + CRM sync', 'Lead scoring based on firmographics', 'Hand-off notes for human reps']
  },
  {
    category: 'Onboarding',
    title: 'Activation Coach',
    emoji: '🚀',
    desc: 'Guides new customers through setup tasks, training content, and milestone check-ins.',
    highlights: ['Automated email + chat nudges', 'Tracks progress across your product', 'Flags churn risk indicators early']
  },
  {
    category: 'Operations',
    title: 'Ops Desk',
    emoji: '🗂️',
    desc: 'Internal assistant for inventory, logistics, and vendor coordination.',
    highlights: ['Connects to ERP and inventory feeds', 'Raises alerts on supply gaps', 'Automates weekly status reporting']
  },
  {
    category: 'People',
    title: 'HR Ally',
    emoji: '🧑‍💼',
    desc: 'Answers policy questions, helps with benefits enrollment, and gathers sentiment anonymously.',
    highlights: ['Understands region-specific policies', 'Collects pulse surveys', 'Escalates compliance or safety concerns']
  },
  {
    category: 'Product',
    title: 'Insights Analyst',
    emoji: '🔍',
    desc: 'Transforms customer conversations into structured product feedback and trends.',
    highlights: ['Summarizes weekly feedback themes', 'Prioritizes issues by revenue impact', 'Pushes insights to Jira or Linear']
  }
]

const operatingCommitments = [
  'Monthly optimization sprints to refine prompts and flows',
  'Transparent dashboards for accuracy, containment, and CSAT',
  'Shared playbooks for escalation and exception handling',
  'Dedicated strategist and ML engineer monitoring performance'
]

const operatingStages = [
  {
    phase: '01',
    label: 'Modeling',
    title: 'Knowledge ingestion & alignment',
    detail: 'Clean and structure your docs, transcripts, and product data. Define intents and escalation rules.'
  },
  {
    phase: '02',
    label: 'Simulation',
    title: 'Scenario stress testing',
    detail: 'Run thousands of simulated conversations to validate accuracy, tone, and guardrails before launch.'
  },
  {
    phase: '03',
    label: 'Launch',
    title: 'Channel deployment & handoff',
    detail: 'Deploy across chat, email, SMS, and voice while integrating with CRM, ticketing, and analytics stacks.'
  },
  {
    phase: '04',
    label: 'Optimization',
    title: 'Continuous learning loops',
    detail: 'Review transcripts, gather human feedback, and push improvements weekly for compounding performance.'
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
