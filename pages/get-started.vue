<template>
  <div class="relative overflow-hidden bg-neutral-50">

    <div class="relative">
      <section class="px-3 pb-20 sm:px-4">
        <div class="mx-auto max-w-4xl pt-16">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex items-center justify-center py-24">
            <div class="text-center">
              <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent-primary border-r-transparent"></div>
              <p class="mt-4 text-sm text-secondary">Loading...</p>
            </div>
          </div>

          <div v-else>
          <header class="text-center">
            <h1 class="inline-flex items-center gap-3 text-3xl font-semibold text-primary">
              <svg class="h-8 w-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Get Started
            </h1>
            <p class="mt-2 text-sm text-secondary">Complete the steps below to set up your project.</p>
          </header>

          <div class="mt-10 space-y-6">
            <div class="flex items-center justify-between rounded-3xl border border-soft bg-white/90 p-4 shadow-sm shadow-neutral-900/5 backdrop-blur">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-secondary">Step {{ currentStep }} of {{ steps.length }}</p>
                <h2 class="mt-1 text-lg font-semibold text-primary">{{ steps[currentStep - 1].title }}</h2>
                <p class="mt-1 text-sm text-secondary">{{ steps[currentStep - 1].headline }}</p>
              </div>
              <div class="hidden h-14 w-14 items-center justify-center rounded-full bg-accent-subtle text-accent-primary sm:flex">
                <svg
                  v-if="steps[currentStep - 1].icon === 'user'"
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 19.235a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.663 0-5.216-.584-7.499-1.515Z" />
                </svg>
                <svg
                  v-else-if="steps[currentStep - 1].icon === 'folder'"
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.25 12.75V6.75A2.25 2.25 0 0 1 4.5 4.5h4.879c.414 0 .81.165 1.102.458l2.25 2.25c.292.293.688.458 1.102.458H19.5a2.25 2.25 0 0 1 2.25 2.25v3" />
                  <path d="m3 19.5 1.879-7.347a1.5 1.5 0 0 1 1.457-1.153H21a1.5 1.5 0 0 1 1.457 1.847l-1.414 5.3A2.25 2.25 0 0 1 18.87 20.25H5.25A2.25 2.25 0 0 1 3 19.5Z" />
                </svg>
                <svg
                  v-else
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12.75 11.25 15l3.75-3.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>

            <!-- Step 1 -->
            <div v-if="currentStep === 1" class="space-y-6">
              <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-base font-semibold text-primary">Personal Information</h3>
                <p class="mt-1 text-sm text-secondary">We’ll use this to create your workspace and share onboarding updates.</p>

                <form @submit.prevent="nextStep" class="mt-6 space-y-5">
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">First Name *</label>
                      <input
                        v-model="formData.firstName"
                        type="text"
                        required
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Last Name *</label>
                      <input
                        v-model="formData.lastName"
                        type="text"
                        required
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div class="sm:col-span-2">
                      <label class="mb-1 block text-sm font-medium text-primary">Work Email *</label>
                      <input
                        v-model="formData.email"
                        type="email"
                        required
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Phone (optional)</label>
                      <input
                        v-model="formData.phone"
                        type="tel"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Company or brand</label>
                      <input
                        v-model="formData.company"
                        type="text"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="Acme Co."
                      />
                    </div>
                  </div>

                  <div class="rounded-2xl bg-neutral-50 px-4 py-3 text-xs text-secondary">
                    <p>After submitting we’ll email you a kickoff checklist with a private upload link for your assets.</p>
                  </div>

                  <div class="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-xs text-secondary">We’ll never share your contact information.</p>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center rounded-full bg-accent-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-focus"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>

            </div>

            <!-- Step 2 -->
            <div v-if="currentStep === 2" class="space-y-6">
              <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-base font-semibold text-primary">Choose your subscription</h3>
                <p class="mt-1 text-sm text-secondary">Each plan includes design, development, analytics, and hosting. Pick what aligns with your roadmap.</p>

                <div class="mt-6 grid gap-4">
                  <button
                    v-for="plan in plans"
                    :key="plan.id"
                    type="button"
                    @click="formData.selectedPlan = plan.id"
                    :class="[
                      'relative flex flex-col gap-4 rounded-2xl border-2 p-5 text-left transition',
                      formData.selectedPlan === plan.id
                        ? 'border-accent-primary bg-accent-subtle shadow-sm'
                        : 'border-neutral-200 bg-white hover:border-accent-soft'
                    ]"
                  >
                    <div v-if="plan.recommended" class="absolute -top-3 left-5 rounded-full bg-accent-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
                      Most popular
                    </div>
                    <div class="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 class="text-lg font-semibold text-primary">{{ plan.name }}</h4>
                        <p class="mt-1 text-sm text-secondary">{{ plan.description }}</p>
                      </div>
                      <div class="text-right">
                        <p class="text-xl font-bold text-primary">{{ plan.price }}</p>
                        <p class="text-xs text-secondary">{{ plan.billing }}</p>
                      </div>
                    </div>
                    <ul class="grid gap-2 text-xs text-secondary sm:grid-cols-2">
                      <li v-for="perk in plan.perks" :key="perk" class="flex items-start gap-2">
                        <svg class="mt-0.5 h-3.5 w-3.5 flex-none text-accent-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        <span>{{ perk }}</span>
                      </li>
                    </ul>
                    <div
                      v-if="formData.selectedPlan === plan.id"
                      class="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary text-white"
                    >
                      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </button>
                </div>

                <div class="mt-6 flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    @click="prevStep"
                    class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-neutral-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    @click="nextStep"
                    :disabled="!formData.selectedPlan"
                    class="inline-flex items-center justify-center rounded-full bg-accent-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-focus disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div v-if="currentStep === 3" class="space-y-6">
              <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-base font-semibold text-primary">Review & confirm</h3>
                <p class="mt-1 text-sm text-secondary">Double-check your contact details and plan selection before continuing to checkout.</p>

                <div class="mt-6 grid gap-4">
                  <div class="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    <p class="text-xs font-semibold uppercase tracking-wide text-secondary">Contact</p>
                    <dl class="mt-3 space-y-2 text-sm">
                      <div class="flex justify-between gap-3">
                        <dt class="text-secondary">Name</dt>
                        <dd class="font-medium text-primary">{{ formData.firstName }} {{ formData.lastName }}</dd>
                      </div>
                      <div class="flex justify-between gap-3">
                        <dt class="text-secondary">Email</dt>
                        <dd class="font-medium text-primary">{{ formData.email }}</dd>
                      </div>
                      <div v-if="formData.phone" class="flex justify-between gap-3">
                        <dt class="text-secondary">Phone</dt>
                        <dd class="font-medium text-primary">{{ formData.phone }}</dd>
                      </div>
                      <div v-if="formData.company" class="flex justify-between gap-3">
                        <dt class="text-secondary">Company</dt>
                        <dd class="font-medium text-primary">{{ formData.company }}</dd>
                      </div>
                    </dl>
                  </div>

                  <div class="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    <p class="text-xs font-semibold uppercase tracking-wide text-secondary">Plan</p>
                    <div v-if="selectedPlanDetails" class="mt-3 space-y-3 text-sm">
                      <div class="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p class="font-semibold text-primary">{{ selectedPlanDetails.name }}</p>
                          <p class="text-xs text-secondary">{{ selectedPlanDetails.description }}</p>
                        </div>
                        <div class="text-right">
                          <p class="text-lg font-bold text-primary">{{ selectedPlanDetails.price }}</p>
                          <p class="text-xs text-secondary">{{ selectedPlanDetails.billing }}</p>
                        </div>
                      </div>
                      <ul class="space-y-2 text-xs text-secondary">
                        <li v-for="perk in selectedPlanDetails.perks" :key="perk" class="flex items-start gap-2">
                          <svg class="mt-0.5 h-3.5 w-3.5 flex-none text-accent-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          <span>{{ perk }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="rounded-2xl border border-dashed border-accent-soft bg-accent-subtle/60 p-4 text-sm text-secondary">
                    <p class="font-semibold text-primary">Next up</p>
                    <p class="mt-2 leading-6">We’ll route you to our secure Stripe checkout. After payment you’ll receive a booking link for your kickoff call and access to our project hub.</p>
                  </div>
                </div>

                <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    @click="prevStep"
                    class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-neutral-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    @click="handleSubmit"
                    :disabled="isSubmitting"
                    class="inline-flex items-center justify-center rounded-full bg-accent-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-focus disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isSubmitting ? 'Saving...' : 'Proceed to payment' }}
                  </button>
                </div>
              </div>

            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { getSupabaseClient } from '~/lib/supabaseClient'

useHead({
  title: 'Get Started - Hinn',
  meta: [
    { name: 'description', content: 'Get started with your Hinn subscription' }
  ]
})

definePageMeta({
  middleware: ['auth']
})

const currentStep = ref(1)
const isSubmitting = ref(false)
const submitError = ref(null)
const submitSuccess = ref(false)
const isLoading = ref(true)
const alreadyCompleted = ref(false)

const steps = [
  {
    id: 'personal',
    title: 'Personal details',
    headline: 'Tell us who will lead the engagement so we can personalize your workspace.',
    description: 'Share your contact information and we will send a kickoff checklist.',
    icon: 'user'
  },
  {
    id: 'plan',
    title: 'Choose a plan',
    headline: 'Pick the subscription tier that matches your roadmap and capacity needs.',
    description: 'Compare deliverables, cadence, and support across plans.',
    icon: 'folder'
  },
  {
    id: 'review',
    title: 'Review & confirm',
    headline: 'Confirm your details before completing checkout.',
    description: 'Verify contact info and make sure you selected the right plan.',
    icon: 'shield'
  }
]

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  selectedPlan: 'small'
})

const plans = [
  {
    id: 'small',
    name: 'Small Businesses',
    price: '$59/mo',
    description: 'Great for local and solo businesses',
    billing: 'Billed monthly — cancel anytime',
    recommended: true,
    perks: ['1 active request', 'Monthly strategy session', 'Speed-optimized build']
  },
  {
    id: 'ecom_large',
    name: 'Ecommerce / Large Businesses',
    price: '$99/mo',
    description: 'Online store + growing operations',
    billing: 'Billed monthly — pause or swap anytime',
    perks: ['2 active requests', 'Conversion playbook', 'Automations setup']
  },
  {
    id: 'startup',
    name: 'Large Businesses/Startups',
    price: '$169/mo',
    description: 'Advanced needs and faster support',
    billing: 'Billed monthly — concierge support',
    perks: ['Unlimited requests', 'Weekly growth reviews', 'Dedicated engineer']
  }
]

const selectedPlanDetails = computed(() => {
  return plans.find(p => p.id === formData.value.selectedPlan)
})

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Check if user has already completed get-started
const checkCompletion = async () => {
  try {
    const supabase = getSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      await navigateTo('/login')
      return
    }

    // Check if user has a profile with completed get-started
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('has_completed_get_started')
      .eq('user_id', user.id)
      .single()

    if (profile?.has_completed_get_started) {
      alreadyCompleted.value = true
      // Redirect to dashboard if already completed
      await navigateTo('/dashboard')
    }
  } catch (error) {
    console.error('[Get Started] Check completion error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  submitError.value = null
  
  try {
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      throw new Error('Not authenticated')
    }

    const response = await $fetch('/api/get-started/submit', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`
      },
      body: formData.value
    })

    console.log('[Get Started] Submission successful:', response)
    submitSuccess.value = true
    
    // Update user profile to mark get-started as completed
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // Upsert user profile
      await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          has_completed_get_started: true,
          get_started_submission_id: response.id
        }, {
          onConflict: 'user_id'
        })
    }
    
    // Redirect to dashboard after successful submission
    await navigateTo('/dashboard')
    
  } catch (error) {
    console.error('[Get Started] Submission error:', error)
    submitError.value = error.message || 'Failed to submit. Please try again.'
    alert('❌ Error: ' + submitError.value)
  } finally {
    isSubmitting.value = false
  }
}

// Check completion on mount
onMounted(() => {
  checkCompletion()
})
</script>
