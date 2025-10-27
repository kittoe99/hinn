<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="pt-20 pb-16 md:pt-32 md:pb-24">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 class="text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
          Let's get started
        </h1>
        <p class="mt-8 text-lg md:text-xl text-neutral-600 leading-relaxed">
          Tell us about your project so we can build exactly what you need.
        </p>
      </div>
    </section>

    <!-- Progress -->
    <section class="pb-20 md:pb-32">
      <div class="max-w-2xl mx-auto px-6 lg:px-8">
        <!-- Progress Bar -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-neutral-900">Step {{ currentStep }} of {{ totalSteps }}</span>
            <span class="text-sm text-neutral-600">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
          </div>
          <div class="h-1 bg-neutral-200">
            <div class="h-full bg-neutral-900 transition-all duration-300" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 border border-red-200 bg-red-50 p-4">
          <p class="text-sm text-red-900">{{ error }}</p>
        </div>

        <!-- Step 1: Project Type -->
        <form v-if="currentStep === 1" @submit.prevent="nextStep" class="space-y-8">
          <div>
            <h2 class="text-2xl font-medium text-neutral-900 mb-2">What are you building?</h2>
            <p class="text-base text-neutral-600">Choose the option that best fits your needs.</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              v-for="type in projectTypes"
              :key="type"
              type="button"
              @click="formData.projectType = type"
              class="border p-6 text-left transition-colors"
              :class="formData.projectType === type ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'"
            >
              <span class="text-base font-medium text-neutral-900">{{ type }}</span>
            </button>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="!formData.projectType"
              class="px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </form>

        <!-- Step 2: Business Info -->
        <form v-if="currentStep === 2" @submit.prevent="nextStep" class="space-y-8">
          <div>
            <h2 class="text-2xl font-medium text-neutral-900 mb-2">Tell us about your business</h2>
            <p class="text-base text-neutral-600">We'll use this to personalize your experience.</p>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Business name</label>
              <input
                v-model="formData.businessName"
                type="text"
                required
                class="w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Website URL (if you have one)</label>
              <input
                v-model="formData.websiteUrl"
                type="url"
                class="w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="https://yoursite.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Industry</label>
              <select
                v-model="formData.industry"
                required
                class="w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              >
                <option value="">Select industry</option>
                <option v-for="industry in industries" :key="industry" :value="industry">{{ industry }}</option>
              </select>
            </div>
          </div>

          <div class="flex justify-between">
            <button
              type="button"
              @click="prevStep"
              class="px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              Back
            </button>
            <button
              type="submit"
              class="px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              Continue
            </button>
          </div>
        </form>

        <!-- Step 3: Project Details -->
        <form v-if="currentStep === 3" @submit.prevent="handleSubmit" class="space-y-8">
          <div>
            <h2 class="text-2xl font-medium text-neutral-900 mb-2">Project details</h2>
            <p class="text-base text-neutral-600">Help us understand your goals and timeline.</p>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">What's your main goal?</label>
              <textarea
                v-model="formData.goal"
                rows="4"
                required
                class="w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
                placeholder="Describe what you want to achieve..."
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Timeline</label>
              <select
                v-model="formData.timeline"
                required
                class="w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-2-weeks">1-2 weeks</option>
                <option value="2-4-weeks">2-4 weeks</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Budget range</label>
              <select
                v-model="formData.budget"
                required
                class="w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              >
                <option value="">Select budget</option>
                <option value="starter">Starter ($99/mo)</option>
                <option value="professional">Professional ($299/mo)</option>
                <option value="enterprise">Enterprise ($999+/mo)</option>
              </select>
            </div>
          </div>

          <div class="flex justify-between">
            <button
              type="button"
              @click="prevStep"
              class="px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              Back
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ submitting ? 'Submitting...' : 'Complete onboarding' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

useHead({
  title: 'Onboarding | Hinn',
  meta: [
    {
      name: 'description',
      content: 'Complete your onboarding to get started with Hinn.'
    }
  ]
})

const currentStep = ref(1)
const totalSteps = 3
const error = ref(null)
const submitting = ref(false)

const formData = ref({
  projectType: '',
  businessName: '',
  websiteUrl: '',
  industry: '',
  goal: '',
  timeline: '',
  budget: ''
})

const projectTypes = [
  'Website',
  'AI Agent',
  'Marketing',
  'E-commerce',
  'Landing Page',
  'Other'
]

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Education',
  'Real Estate',
  'Professional Services',
  'Other'
]

const nextStep = () => {
  error.value = null
  if (currentStep.value < totalSteps) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  error.value = null
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleSubmit = async () => {
  submitting.value = true
  error.value = null

  try {
    // Submit onboarding data
    const response = await fetch('/api/onboarding/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    })

    if (!response.ok) {
      throw new Error('Failed to submit onboarding')
    }

    // Redirect to dashboard
    await navigateTo('/dashboard')
  } catch (err) {
    error.value = err.message || 'Something went wrong. Please try again.'
    submitting.value = false
  }
}
</script>
