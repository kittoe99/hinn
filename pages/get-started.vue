<template>
  <div>
    <!-- Hero -->
    <section class="pt-20 pb-24 md:pt-32 md:pb-40">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 class="text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
          Choose your plan
        </h1>
        <p class="mt-8 text-lg md:text-xl text-neutral-600 leading-relaxed">
          Select the plan that fits your needs. Start building today.
        </p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="pb-20 md:pb-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8 py-20">
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="plan in plans" :key="plan.name" class="border border-neutral-200 bg-white p-8">
            <h3 class="text-2xl font-medium text-neutral-900">{{ plan.name }}</h3>
            <p class="mt-4 text-base text-neutral-600">{{ plan.description }}</p>
            
            <div class="mt-8">
              <span class="text-4xl font-medium text-neutral-900">${{ plan.price }}</span>
              <span class="text-base text-neutral-600">/month</span>
            </div>

            <ul class="mt-8 space-y-4">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3">
                <svg class="h-5 w-5 text-neutral-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-sm text-neutral-600">{{ feature }}</span>
              </li>
            </ul>

            <button
              @click="selectPlan(plan)"
              class="mt-8 w-full px-6 py-3 text-base font-medium transition-colors"
              :class="plan.featured ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'border border-neutral-200 text-neutral-900 hover:bg-neutral-50'"
            >
              {{ plan.cta }}
            </button>
          </div>
        </div>

        <p class="mt-12 text-center text-sm text-neutral-600">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Compare plans</h2>
          <p class="text-lg text-neutral-600">
            See what's included in each plan.
          </p>
        </div>

        <div class="border border-neutral-200 bg-white">
          <div class="grid grid-cols-4 gap-px bg-neutral-200">
            <div class="bg-white p-6">
              <span class="text-sm font-medium text-neutral-900">Features</span>
            </div>
            <div class="bg-white p-6 text-center">
              <span class="text-sm font-medium text-neutral-900">Starter</span>
            </div>
            <div class="bg-white p-6 text-center">
              <span class="text-sm font-medium text-neutral-900">Professional</span>
            </div>
            <div class="bg-white p-6 text-center">
              <span class="text-sm font-medium text-neutral-900">Enterprise</span>
            </div>
          </div>

          <div v-for="feature in comparisonFeatures" :key="feature.name" class="grid grid-cols-4 gap-px bg-neutral-200">
            <div class="bg-white p-6">
              <span class="text-sm text-neutral-600">{{ feature.name }}</span>
            </div>
            <div class="bg-white p-6 text-center">
              <span v-if="typeof feature.starter === 'boolean'">
                <svg v-if="feature.starter" class="h-5 w-5 text-neutral-900 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else class="text-neutral-400">—</span>
              </span>
              <span v-else class="text-sm text-neutral-600">{{ feature.starter }}</span>
            </div>
            <div class="bg-white p-6 text-center">
              <span v-if="typeof feature.professional === 'boolean'">
                <svg v-if="feature.professional" class="h-5 w-5 text-neutral-900 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else class="text-neutral-400">—</span>
              </span>
              <span v-else class="text-sm text-neutral-600">{{ feature.professional }}</span>
            </div>
            <div class="bg-white p-6 text-center">
              <span v-if="typeof feature.enterprise === 'boolean'">
                <svg v-if="feature.enterprise" class="h-5 w-5 text-neutral-900 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else class="text-neutral-400">—</span>
              </span>
              <span v-else class="text-sm text-neutral-600">{{ feature.enterprise }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Frequently asked questions</h2>
          <p class="text-lg text-neutral-600">
            Everything you need to know about our plans.
          </p>
        </div>

        <div class="space-y-4">
          <details v-for="faq in faqs" :key="faq.question" class="border border-neutral-200 bg-white p-6 group">
            <summary class="flex items-center justify-between cursor-pointer text-base font-medium text-neutral-900">
              {{ faq.question }}
              <svg class="h-5 w-5 text-neutral-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-4 text-sm text-neutral-600">{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-32">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6">Ready to get started?</h2>
        <p class="text-lg text-neutral-600 mb-10">
          Start your 14-day free trial today. No credit card required.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink 
            to="/signup"
            class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
          >
            Start free trial
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink 
            to="/contact"
            class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
          >
            Contact sales
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Get Started | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Choose your plan and start building with Hinn.'
    }
  ]
})

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small projects and testing.',
    price: 99,
    features: [
      '1 website or agent',
      'AI-powered features',
      'Basic analytics',
      'Email support',
      'Cancel anytime'
    ],
    cta: 'Start free trial',
    featured: false
  },
  {
    name: 'Professional',
    description: 'For growing businesses and teams.',
    price: 299,
    features: [
      '5 websites or agents',
      'Advanced AI features',
      'Priority support',
      'Custom integrations',
      'Analytics dashboard',
      'Cancel anytime'
    ],
    cta: 'Start free trial',
    featured: true
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom needs.',
    price: 999,
    features: [
      'Unlimited websites & agents',
      'White-label options',
      'Dedicated support',
      'Custom development',
      'SLA guarantees',
      'Flexible contracts'
    ],
    cta: 'Contact sales',
    featured: false
  }
]

const comparisonFeatures = [
  { name: 'Websites/Agents', starter: '1', professional: '5', enterprise: 'Unlimited' },
  { name: 'AI-powered features', starter: true, professional: true, enterprise: true },
  { name: 'Basic analytics', starter: true, professional: true, enterprise: true },
  { name: 'Advanced analytics', starter: false, professional: true, enterprise: true },
  { name: 'Email support', starter: true, professional: true, enterprise: true },
  { name: 'Priority support', starter: false, professional: true, enterprise: true },
  { name: 'Dedicated support', starter: false, professional: false, enterprise: true },
  { name: 'Custom integrations', starter: false, professional: true, enterprise: true },
  { name: 'White-label options', starter: false, professional: false, enterprise: true },
  { name: 'Custom development', starter: false, professional: false, enterprise: true },
  { name: 'SLA guarantees', starter: false, professional: false, enterprise: true }
]

const faqs = [
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges.'
  },
  {
    question: 'What happens after the free trial?',
    answer: 'After your 14-day free trial, you\'ll be charged for your selected plan. You can cancel anytime before the trial ends with no charge.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, contact us within 30 days for a full refund.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time from your dashboard. You\'ll continue to have access until the end of your billing period.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Enterprise plans can also pay via invoice.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No, there are no setup fees or hidden charges. You only pay the monthly subscription cost for your chosen plan.'
  }
]

const selectPlan = (plan) => {
  if (plan.name === 'Enterprise') {
    navigateTo('/contact')
  } else {
    navigateTo('/signup')
  }
}
</script>
