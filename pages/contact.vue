<template>
  <div class="pb-8 md:pb-12">
    <!-- Intro -->
    <section class="px-3 pb-20 sm:px-4">
      <div class="mx-auto max-w-5xl pt-16">
        <div class="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10">
          <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-600"></span>
            Contact Us
          </div>
          <h1 class="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Ready to get started?
          </h1>
          <p class="mt-3 text-base leading-relaxed text-neutral-600">
            Tell us what you need and we'll handle the rest. Subscribe today and we'll start building this week. No contracts, cancel anytime.
          </p>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <!-- Contact Info -->
          <aside class="space-y-6 rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-sm shadow-neutral-900/5 backdrop-blur">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-neutral-500">Response time</p>
              <p class="mt-2 text-sm text-neutral-600">We respond to every message within one business day. Most clients start within the same week.</p>
            </div>

            <div class="space-y-5">
              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold text-neutral-900">Email</h3>
                  <a href="mailto:hello@hinn.studio" class="mt-1 text-sm text-neutral-600 hover:text-blue-700 transition-colors">
                    hello@hinn.studio
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold text-neutral-900">Location</h3>
                  <p class="mt-1 text-sm text-neutral-600">
                    Remote-first team<br />
                    Serving clients worldwide
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div class="rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-5">
                <h3 class="text-base font-semibold text-neutral-900">What happens next</h3>
                <p class="mt-2 text-sm text-neutral-600 leading-relaxed">We'll review your message and send you a calendar link to schedule a quick call. Most clients start within the same week.</p>
              </div>
            </div>
          </aside>

          <!-- Contact Form -->
          <div class="rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-lg shadow-neutral-900/5 backdrop-blur sm:p-8">
            <!-- Success Message -->
            <div v-if="submitted" class="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <svg class="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-emerald-900">Message sent successfully!</h3>
              <p class="mt-2 text-sm text-emerald-800">Thank you for contacting us. We'll get back to you within one business day.</p>
              <button
                @click="submitted = false"
                class="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Send another message
              </button>
            </div>

            <!-- Error Message -->
            <div v-else-if="submitError" class="rounded-2xl border border-red-200 bg-red-50 p-4 mb-4">
              <p class="text-sm font-semibold text-red-900">Error submitting form</p>
              <p class="mt-1 text-sm text-red-800">{{ submitError }}</p>
              <button
                @click="submitError = null"
                class="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                Dismiss
              </button>
            </div>

            <!-- Form Steps -->
            <div v-if="!submitted" class="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step {{ currentStep }} of {{ steps.length }}</p>
              <h2 class="mt-1 text-lg font-semibold text-neutral-900">{{ steps[currentStep - 1].title }}</h2>
              <p class="mt-1 text-sm text-neutral-600">{{ steps[currentStep - 1].headline }}</p>
            </div>

            <form @submit.prevent="nextStep" class="mt-6 space-y-6" v-if="!submitted && currentStep === 1">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-1 block text-sm font-medium text-neutral-900">First Name *</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-neutral-900">Last Name *</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label class="mb-1 block text-sm font-medium text-neutral-900">Work Email *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-neutral-900">Company</label>
                  <input
                    v-model="form.company"
                    type="text"
                    class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-neutral-900">Phone (optional)</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div class="rounded-2xl bg-neutral-50 px-4 py-3 text-xs text-neutral-600">
                <p>We’ll send scheduling details and prep materials to your inbox after this step.</p>
              </div>

              <div class="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-xs text-neutral-600">Prefer async updates only? Let us know in the notes.</p>
                <button type="submit" class="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800">
                  Continue
                </button>
              </div>
            </form>

            <form @submit.prevent="nextStep" class="mt-6 space-y-6" v-else-if="!submitted && currentStep === 2">
              <div>
                <label class="mb-1 block text-sm font-medium text-neutral-900">What do you need help with? *</label>
                <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <button
                    v-for="option in interestOptions"
                    :key="option.value"
                    type="button"
                    @click="toggleInterest(option.value)"
                    :class="[
                      'rounded-2xl border px-4 py-2 text-sm transition',
                      form.interests.includes(option.value)
                        ? 'border-blue-600 bg-blue-50 text-neutral-900 shadow-sm'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-blue-300 hover:text-neutral-900'
                    ]"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>

              <div>
                <label class="mb-1 block text-sm font-medium text-neutral-900">Project timeline *</label>
                <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <button
                    v-for="timeline in timelineOptions"
                    :key="timeline"
                    type="button"
                    @click="form.timeline = timeline"
                    :class="[
                      'rounded-2xl border px-4 py-2 text-sm transition',
                      form.timeline === timeline
                        ? 'border-blue-600 bg-blue-50 text-neutral-900 shadow-sm'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-blue-300 hover:text-neutral-900'
                    ]"
                  >
                    {{ timeline }}
                  </button>
                </div>
              </div>

              <div>
                <label class="mb-1 block text-sm font-medium text-neutral-900">Notes or link to brief</label>
                <textarea
                  v-model="form.notes"
                  rows="4"
                  class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Share anything else we should know."
                />
              </div>

              <div class="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" @click="prevStep" class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50">
                  Back
                </button>
                <button type="submit" class="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800">
                  Continue
                </button>
              </div>
            </form>

            <form @submit.prevent="handleSubmit" class="mt-6 space-y-6" v-else-if="!submitted && currentStep === 3">
              <div>
                <label class="mb-1 block text-sm font-medium text-neutral-900">Message *</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Tell us about your project, success metrics, or constraints."
                />
              </div>

              <div class="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-4 text-xs text-neutral-600">
                <p class="font-semibold text-neutral-900">Here's what happens next:</p>
                <p class="mt-2 leading-6">We'll review your note, match you with a strategist, and send an intro email with next steps and suggested time slots.</p>
              </div>

              <div class="flex flex-col gap-3">
                <button
                  type="submit"
                  :disabled="submitting"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="submitting" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ submitting ? 'Sending...' : 'Send message' }}
                </button>
              </div>

              <p class="text-xs text-center text-tertiary">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mt-16 md:mt-24 pb-16">
      <div class="max-w-5xl mx-auto px-4 lg:px-6">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">Common Questions</h2>
          <p class="mt-3 text-base text-neutral-600">
            Quick answers to questions you might have before reaching out
          </p>
        </div>
        <div class="mt-10 space-y-4">
          <details
            v-for="faq in faqs"
            :key="faq.question"
            class="group rounded-3xl border border-neutral-200 bg-white p-5 transition-colors open:border-blue-200 open:bg-blue-50/50"
          >
            <summary class="flex cursor-pointer items-center justify-between text-left text-base font-semibold text-neutral-900 marker:hidden">
              <span>{{ faq.question }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4 text-neutral-500 transition-transform group-open:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="mt-3 text-sm text-neutral-600">{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'Contact Us | Get Started with Hinn',
  meta: [
    {
      name: 'description',
      content:
        'Contact Hinn for custom website development, AI agent deployment, or digital marketing services. Get a response within 24 hours.'
    }
  ]
})

const steps = [
  {
    id: 'contact',
    title: 'Contact details',
    headline: 'Share who we’ll be speaking with and how to reach you.'
  },
  {
    id: 'context',
    title: 'Project context',
    headline: 'Help us understand the problem, desired outcomes, and timing.'
  },
  {
    id: 'message',
    title: 'Final message',
    headline: 'Add any final notes and we’ll schedule next steps.'
  }
]

const interestOptions = [
  { label: 'Website', value: 'website' },
  { label: 'AI agents', value: 'agents' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Automation', value: 'automation' },
  { label: 'Branding', value: 'branding' },
  { label: 'Consulting', value: 'consulting' },
  { label: 'Training', value: 'training' },
  { label: 'Other', value: 'other' }
]

const timelineOptions = ['ASAP', '2-4 weeks', '1-2 months', 'Flexible']

const currentStep = ref(1)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  interests: [],
  timeline: '',
  notes: '',
  message: ''
})

const toggleInterest = value => {
  if (form.value.interests.includes(value)) {
    form.value.interests = form.value.interests.filter(item => item !== value)
  } else {
    form.value.interests = [...form.value.interests, value]
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextStep = event => {
  const formElement = event?.target
  if (formElement && !formElement.checkValidity()) {
    formElement.reportValidity()
    return
  }

  if (currentStep.value < steps.length) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const submitting = ref(false)
const submitted = ref(false)
const submitError = ref(null)

const handleSubmit = async (event) => {
  const formElement = event?.target
  if (formElement && !formElement.checkValidity()) {
    formElement.reportValidity()
    return
  }

  submitting.value = true
  submitError.value = null

  try {
    console.log('[contact] Submitting form...', form.value)
    
    const response = await fetch('/api/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.statusMessage || 'Failed to submit form')
    }

    const data = await response.json()
    console.log('[contact] Submission successful:', data)

    submitted.value = true
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      interests: [],
      timeline: '',
      notes: '',
      message: ''
    }
    
    currentStep.value = 1
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error('[contact] Submission error:', error)
    submitError.value = error.message
  } finally {
    submitting.value = false
  }
}

const faqs = [
  {
    question: 'How quickly can we get started?',
    answer: 'After our initial discovery call, we can typically begin work within 3-5 business days. For website projects, we aim to launch within 21 days. AI agents and marketing campaigns have similar timelines depending on scope.'
  },
  {
    question: 'What information do you need to provide a quote?',
    answer: 'We need to understand your goals, target audience, current challenges, and desired outcomes. For websites, knowing your content needs and integrations helps. For AI agents, understanding your workflows and data sources is key.'
  },
  {
    question: 'Do you work with startups or only established businesses?',
    answer: 'We work with both! We have flexible plans for early-stage startups as well as comprehensive solutions for established businesses. Our subscription model makes professional services accessible at any stage.'
  },
  {
    question: 'Can we schedule a demo before committing?',
    answer: 'Absolutely! We offer free 30-minute discovery calls where we can show you relevant examples, discuss your needs, and outline a potential approach. No commitment required.'
  }
]
</script>
