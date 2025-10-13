<template>
  <div class="relative overflow-hidden bg-neutral-50">
    <div class="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-accent-subtle/60 via-white" />

    <!-- Hero Section -->
    <section class="pt-8 pb-16 md:pt-12 md:pb-24">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="mx-auto max-w-4xl text-center">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-200 backdrop-blur">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-accent-primary" />
            Pay monthly, cancel anytime
          </div>
          <h1 class="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-primary">
            Professional Website Design & Development <span class="text-accent-primary">on Monthly Subscription</span>
          </h1>
          <p class="mt-5 mx-auto max-w-2xl text-base md:text-lg text-secondary">
            Custom web design, full-stack development, cloud hosting, and AI-powered marketing automation—all included in one predictable monthly plan.
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            <NuxtLink
              to="/get-started"
              class="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-colors hover:bg-neutral-900"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-2 h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <a
              href="#features"
              class="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm md:text-base font-semibold text-primary transition-colors hover:bg-neutral-100"
            >
              Learn More
            </a>
          </div>
          
          <div class="mt-12 grid gap-6 text-left sm:grid-cols-3">
            <div class="rounded-2xl bg-white/80 p-5 ring-1 ring-neutral-200">
              <div class="text-2xl font-bold text-primary">$1,650/mo</div>
              <p class="mt-1 text-sm text-secondary">All-inclusive web services</p>
            </div>
            <div class="rounded-2xl bg-white/80 p-5 ring-1 ring-neutral-200">
              <div class="text-2xl font-bold text-primary">10-day</div>
              <p class="mt-1 text-sm text-secondary">Website launch timeline</p>
            </div>
            <div class="rounded-2xl bg-white/80 p-5 ring-1 ring-neutral-200">
              <div class="text-2xl font-bold text-primary">Unlimited</div>
              <p class="mt-1 text-sm text-secondary">Revisions & updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ask Me Anything -->
    <AmaBar />

    <!-- Feature Section -->
    <section id="features" class="mt-16 md:mt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="mx-auto max-w-3xl text-center">
          <div class="text-xs uppercase tracking-widest text-tertiary">Complete Web Solutions</div>
          <h2 class="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Full-Service Website Development & Digital Marketing</h2>
          <p class="mt-3 text-base text-secondary">
            From UX strategy and responsive web design to React/Vue development, SEO optimization, and AI chatbot integration—everything your business needs to succeed online.
          </p>
        </div>
        <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="feature in featureHighlights"
            :key="feature.title"
            class="group rounded-3xl border border-soft bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent-subtle hover:shadow-[0_30px_60px_-40px_rgba(15,23,42,0.45)]"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-accent-subtle text-accent-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="mt-4 text-xl font-semibold text-primary">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-secondary">{{ feature.description }}</p>
            <ul v-if="feature.points" class="mt-3 space-y-1 text-sm text-neutral-600">
              <li v-for="point in feature.points" :key="point" class="flex gap-2">
                <span class="mt-1 h-1.5 w-1.5 rounded-full bg-accent-primary/70" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="subscription" class="mt-16 md:mt-20">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div class="text-xs uppercase tracking-wider text-tertiary">Subscription Services</div>
            <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Custom Websites, AI Agents & Marketing Automation</h2>
          </div>
          <NuxtLink
            to="/onboarding"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-neutral-100 sm:w-auto"
          >
            Start your project →
          </NuxtLink>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <NuxtLink
            v-for="product in subscriptionProducts"
            :key="product.title"
            :to="product.href"
            class="group flex h-full flex-col justify-between rounded-3xl border border-soft bg-white p-6 ring-1 ring-transparent transition-all hover:-translate-y-1 hover:ring-accent-subtle"
          >
            <div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-accent-subtle text-accent-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" :d="product.icon" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-semibold text-primary">{{ product.title }}</h3>
                </div>
                <span class="text-xs font-medium uppercase tracking-wide text-neutral-400">{{ product.timeline }}</span>
              </div>
              <p class="mt-4 text-sm text-secondary">{{ product.description }}</p>
            </div>
            <div class="mt-6 flex flex-wrap gap-2 text-xs text-tertiary">
              <span v-for="tag in product.tags" :key="tag" class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1">{{ tag }}</span>
            </div>
            <div class="mt-6 inline-flex items-center text-sm font-semibold text-accent-primary">
              {{ product.cta }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-1.5 h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="mt-16 md:mt-24">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="grid gap-10 lg:grid-cols-[minmax(0,28rem),minmax(0,1fr)] lg:items-center">
          <div>
            <div class="text-xs uppercase tracking-wider text-tertiary">Our Process</div>
            <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Agile Web Development Process</h2>
            <p class="mt-3 text-base text-secondary">Our dedicated team of designers, developers, and digital strategists work in sprints to deliver your website quickly, then continuously optimize for conversions and performance.</p>
            <div class="mt-6 rounded-3xl border border-dashed border-accent-subtle bg-accent-subtle/40 p-5 text-sm text-neutral-600">
              <strong class="text-primary">Enterprise solutions available:</strong> We build custom SaaS platforms, e-commerce websites, membership portals, and enterprise web applications.
            </div>
          </div>
          <div class="space-y-5">
            <div
              v-for="(step, index) in processSteps"
              :key="step.title"
              class="flex gap-4 rounded-3xl border border-soft bg-white p-5 shadow-sm"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="text-lg font-semibold text-primary">{{ step.title }}</h3>
                <p class="mt-1 text-sm text-secondary">{{ step.description }}</p>
                <div class="mt-2 flex flex-wrap gap-2 text-xs text-tertiary">
                  <span v-for="item in step.highlights" :key="item" class="rounded-full bg-neutral-100 px-2 py-1">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section id="showcase" class="mt-16 md:mt-24">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <header class="mx-auto mb-8 max-w-3xl text-center">
          <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-primary">Website Portfolio & Case Studies</h2>
          <p class="mt-3 text-sm text-secondary">High-converting websites optimized for Core Web Vitals, mobile responsiveness, and organic search rankings.</p>
        </header>
        <div class="overflow-hidden rounded-3xl border border-neutral-200 bg-white/80 p-4">
          <div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            <a
              v-for="project in showcaseProjects"
              :key="project.title"
              href="#"
              class="group w-64 flex-none snap-start overflow-hidden rounded-2xl border border-soft bg-white transition-all hover:-translate-y-1 hover:border-accent-subtle"
            >
              <div class="relative">
                <img
                  loading="lazy"
                  :src="project.image"
                  :alt="project.title"
                  class="h-32 w-full object-cover"
                />
                <span v-if="project.tag" class="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-neutral-600 ring-1 ring-neutral-200">
                  {{ project.tag }}
                </span>
              </div>
              <div class="p-4">
                <h3 class="text-base font-semibold text-primary group-hover:underline">{{ project.title }}</h3>
                <p class="mt-2 text-sm text-secondary line-clamp-3">{{ project.description }}</p>
                <span class="mt-3 inline-flex items-center text-xs font-semibold text-accent-primary">View case study →</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="mt-16 md:mt-24">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,22rem),minmax(0,1fr)] lg:items-start">
          <div>
            <div class="text-xs uppercase tracking-wider text-tertiary">Client Success Stories</div>
            <h2 class="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-primary">Trusted by Growing Businesses</h2>
            <p class="mt-3 text-base text-secondary">Our clients partner with us for ongoing website optimization, landing page development, conversion rate optimization, and technical SEO improvements.</p>
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            <article
              v-for="testimonial in testimonials"
              :key="testimonial.name"
              class="flex h-full flex-col justify-between rounded-3xl border border-soft bg-white p-6 shadow-sm"
            >
              <div>
                <p class="text-sm text-neutral-700">“{{ testimonial.quote }}”</p>
              </div>
              <div class="mt-6 flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-accent-subtle text-sm font-semibold text-accent-primary">
                  {{ testimonial.initials }}
                </div>
                <div>
                  <div class="text-sm font-semibold text-primary">{{ testimonial.name }}</div>
                  <div class="text-xs text-secondary">{{ testimonial.role }}</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mt-16 md:mt-24 pb-16 md:pb-24">
      <div class="max-w-5xl mx-auto px-4 lg:px-6">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-primary">Frequently asked questions</h2>
          <p class="mt-3 text-base text-secondary">Straight answers about how the subscription works, what’s included, and how we collaborate.</p>
        </div>
        <div class="mt-10 space-y-4">
          <details
            v-for="faq in faqs"
            :key="faq.question"
            class="group rounded-3xl border border-soft bg-white p-5 transition-colors open:border-accent-subtle open:bg-accent-subtle/20"
          >
            <summary class="flex cursor-pointer items-center justify-between text-left text-base font-semibold text-primary marker:hidden">
              <span>{{ faq.question }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4 text-neutral-500 transition-transform group-open:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-3 text-sm text-secondary">{{ faq.answer }}</p>
          </details>
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
    title: 'UX Strategy & Information Architecture',
    description: 'User research, competitive analysis, and conversion-optimized site structure designed to turn visitors into qualified leads.',
    icon: 'M12 6l7 12H5l7-12z',
    points: ['User journey mapping', 'Conversion funnel design', 'SEO-friendly site structure']
  },
  {
    title: 'Responsive Web Design',
    description: 'Mobile-first design systems with reusable components, ensuring consistent brand experience across all devices and screen sizes.',
    icon: 'M4 7h16M4 12h16M4 17h16',
    points: ['Figma design systems', 'WCAG accessibility standards', 'Cross-browser compatibility']
  },
  {
    title: 'Modern Web Development',
    description: 'Built with React, Vue.js, and Next.js for lightning-fast performance, SEO optimization, and exceptional Core Web Vitals scores.',
    icon: 'M12 4v16m8-8H4',
    points: ['Sub-1s page load times', 'Google Analytics 4 setup', 'Automated QA testing']
  },
  {
    title: 'CRM & Marketing Integration',
    description: 'Seamless integration with HubSpot, Salesforce, Mailchimp, and marketing automation platforms to capture and nurture leads.',
    icon: 'M21 12.79A9 9 0 1111.21 3',
    points: ['HubSpot CRM integration', 'Email marketing automation', 'Lead scoring & tracking']
  },
  {
    title: 'SEO & Content Strategy',
    description: 'Technical SEO optimization, keyword research, and conversion-focused copywriting to improve organic search rankings and traffic.',
    icon: 'M8 21l4-4 4 4m0-8l-4 4-4-4',
    points: ['On-page SEO optimization', 'Schema markup implementation', 'Content marketing strategy']
  },
  {
    title: 'Managed Hosting & Support',
    description: 'Cloud hosting on AWS/Vercel with 99.9% uptime, automatic backups, security monitoring, and ongoing technical support.',
    icon: 'M18 11V5a3 3 0 00-3-3H9a3 3 0 00-3 3v6',
    points: ['CDN & caching optimization', 'SSL certificates included', '24/7 uptime monitoring']
  }
]

const subscriptionProducts = [
  {
    title: 'Custom Website Development',
    description: 'Full-service web design and development with React/Vue.js, headless CMS integration, SEO optimization, and conversion-focused landing pages.',
    tags: ['Responsive design', 'Headless CMS', 'Technical SEO', 'A/B testing'],
    timeline: 'Launch in 10 days',
    href: '/website',
    cta: 'Explore website services',
    icon: 'M3 7l9-4 9 4-9 4-9-4v10l9 4 9-4V7'
  },
  {
    title: 'AI Chatbot Development',
    description: 'Custom AI agents for lead qualification, customer support automation, and intelligent knowledge base search with GPT-4 integration.',
    tags: ['GPT-4 integration', 'Lead qualification', 'Support automation', 'CRM sync'],
    timeline: 'Deploy in 14 days',
    href: '/agents',
    cta: 'View AI agent features',
    icon: 'M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243L6.636 17.364m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636'
  },
  {
    title: 'Digital Marketing Services',
    description: 'Comprehensive marketing campaigns including brand strategy, content creation, email marketing, social media management, and PPC advertising.',
    tags: ['Brand identity', 'Content marketing', 'Email campaigns', 'Social media ads'],
    timeline: 'Ongoing campaigns',
    href: '/marketing',
    cta: 'View marketing packages',
    icon: 'M4 4h16v16H4z'
  },
  {
    title: 'Analytics & Optimization',
    description: 'Google Analytics 4 setup, conversion tracking, heatmap analysis, and data-driven optimization to maximize ROI and user engagement.',
    tags: ['GA4 implementation', 'Conversion tracking', 'Performance monitoring', 'CRO testing'],
    timeline: 'Continuous optimization',
    href: '/onboarding',
    cta: 'Start optimization',
    icon: 'M5 3v4M19 3v4M5 21v-4m14 4v-4M3 9h18M3 15h18'
  }
]

const processSteps = [
  {
    title: 'Discovery & Strategy',
    description: 'Comprehensive website audit, competitor analysis, user research, and technical requirements gathering to define project scope and goals.',
    highlights: ['SEO audit', 'User persona development', 'Technical architecture planning']
  },
  {
    title: 'Design & Prototyping',
    description: 'Mobile-first wireframes, high-fidelity mockups in Figma, interactive prototypes, and conversion-optimized copywriting for all pages.',
    highlights: ['Responsive mockups', 'Brand style guide', 'Content strategy']
  },
  {
    title: 'Development & Integration',
    description: 'Front-end development with React/Vue.js, back-end API integration, CMS implementation, and third-party service connections.',
    highlights: ['Code optimization', 'API integrations', 'CMS training']
  },
  {
    title: 'Testing & Launch',
    description: 'Cross-browser testing, mobile responsiveness checks, performance optimization, SEO validation, and smooth deployment to production.',
    highlights: ['QA testing', 'Performance tuning', 'DNS & SSL setup']
  },
  {
    title: 'Optimization & Growth',
    description: 'Ongoing A/B testing, conversion rate optimization, content updates, technical SEO improvements, and feature enhancements.',
    highlights: ['Analytics monitoring', 'CRO experiments', 'Monthly reporting']
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
