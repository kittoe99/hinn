<template>
  <div class="py-12 md:py-16">
    <div class="max-w-4xl mx-auto px-3 sm:px-4">
      <h1 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Get Started</h1>
      <p class="mt-2 text-sm md:text-base text-secondary">
        Complete a few quick steps to set up your account and choose your plan.
      </p>

      <!-- Progress Indicator -->
      <div class="mt-8 flex items-center justify-between">
        <div 
          v-for="(stepItem, index) in steps" 
          :key="index"
          class="flex items-center"
          :class="{ 'flex-1': index < steps.length - 1 }"
        >
          <div class="flex flex-col items-center">
            <div 
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                currentStep > index + 1 ? 'bg-accent-primary text-white' : 
                currentStep === index + 1 ? 'bg-accent-primary text-white' : 
                'bg-neutral-200 text-neutral-500'
              ]"
            >
              <span v-if="currentStep > index + 1">✓</span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span class="mt-2 text-xs text-secondary hidden sm:block">{{ stepItem }}</span>
          </div>
          <div 
            v-if="index < steps.length - 1"
            :class="[
              'flex-1 h-0.5 mx-2',
              currentStep > index + 1 ? 'bg-accent-primary' : 'bg-neutral-200'
            ]"
          />
        </div>
      </div>

      <!-- Step 1: Personal Info -->
      <div v-if="currentStep === 1" class="mt-8 space-y-6">
        <div class="rounded-3xl border border-soft bg-white p-5 sm:p-6">
          <h2 class="text-lg font-semibold text-primary">Personal Information</h2>
          <p class="mt-1 text-sm text-secondary">Tell us a bit about yourself.</p>
          
          <form @submit.prevent="nextStep" class="mt-5 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-primary mb-1">First Name *</label>
                <input
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                  placeholder="John"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-primary mb-1">Last Name *</label>
                <input
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-primary mb-1">Email *</label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-primary mb-1">Phone (optional)</label>
              <input
                v-model="formData.phone"
                type="tel"
                class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div class="flex justify-end pt-4">
              <button
                type="submit"
                class="px-6 py-2.5 rounded-full bg-accent-primary text-white text-sm font-semibold hover:bg-accent-focus transition-colors"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Step 2: Choose Plan -->
      <div v-if="currentStep === 2" class="mt-8 space-y-6">
        <div class="rounded-3xl border border-soft bg-white p-5 sm:p-6">
          <h2 class="text-lg font-semibold text-primary">Choose Your Plan</h2>
          <p class="mt-1 text-sm text-secondary">Select the plan that best fits your needs.</p>
          
          <div class="mt-5 space-y-4">
            <div 
              v-for="plan in plans" 
              :key="plan.id"
              @click="formData.selectedPlan = plan.id"
              :class="[
                'relative rounded-2xl border-2 p-4 cursor-pointer transition-all',
                formData.selectedPlan === plan.id 
                  ? 'border-accent-primary bg-accent-subtle' 
                  : 'border-neutral-200 hover:border-accent-soft'
              ]"
            >
              <div v-if="plan.recommended" class="absolute -top-3 left-4 px-2 py-0.5 bg-accent-primary text-white text-xs rounded-full">
                Recommended
              </div>
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-base font-semibold text-primary">{{ plan.name }}</h3>
                  <p class="mt-1 text-sm text-secondary">{{ plan.description }}</p>
                </div>
                <div class="text-right ml-4">
                  <div class="text-xl font-bold text-primary">{{ plan.price }}</div>
                </div>
              </div>
              <div 
                v-if="formData.selectedPlan === plan.id"
                class="absolute top-4 right-4 w-5 h-5 rounded-full bg-accent-primary flex items-center justify-center"
              >
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div class="flex justify-between pt-6">
            <button
              @click="prevStep"
              class="px-6 py-2.5 rounded-full border border-neutral-300 bg-white text-sm font-semibold hover:bg-neutral-50 transition-colors"
            >
              Back
            </button>
            <button
              @click="nextStep"
              :disabled="!formData.selectedPlan"
              class="px-6 py-2.5 rounded-full bg-accent-primary text-white text-sm font-semibold hover:bg-accent-focus transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <!-- Step 3: Review & Confirm -->
      <div v-if="currentStep === 3" class="mt-8 space-y-6">
        <div class="rounded-3xl border border-soft bg-white p-5 sm:p-6">
          <h2 class="text-lg font-semibold text-primary">Review & Confirm</h2>
          <p class="mt-1 text-sm text-secondary">Please review your information before proceeding.</p>
          
          <div class="mt-5 space-y-6">
            <!-- Personal Info Summary -->
            <div class="rounded-xl border border-neutral-200 p-4 bg-neutral-50">
              <h3 class="text-sm font-semibold text-primary mb-3">Personal Information</h3>
              <dl class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <dt class="text-secondary">Name:</dt>
                  <dd class="text-primary font-medium">{{ formData.firstName }} {{ formData.lastName }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-secondary">Email:</dt>
                  <dd class="text-primary font-medium">{{ formData.email }}</dd>
                </div>
                <div v-if="formData.phone" class="flex justify-between">
                  <dt class="text-secondary">Phone:</dt>
                  <dd class="text-primary font-medium">{{ formData.phone }}</dd>
                </div>
              </dl>
            </div>

            <!-- Plan Summary -->
            <div class="rounded-xl border border-neutral-200 p-4 bg-neutral-50">
              <h3 class="text-sm font-semibold text-primary mb-3">Selected Plan</h3>
              <div v-if="selectedPlanDetails">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="text-base font-semibold text-primary">{{ selectedPlanDetails.name }}</div>
                    <div class="text-sm text-secondary mt-1">{{ selectedPlanDetails.description }}</div>
                  </div>
                  <div class="text-xl font-bold text-accent-primary">{{ selectedPlanDetails.price }}</div>
                </div>
              </div>
            </div>

            <div class="rounded-xl border border-accent-soft bg-accent-subtle p-4">
              <p class="text-sm text-primary">
                <strong>Next step:</strong> You'll be redirected to a secure payment page to complete your subscription.
              </p>
            </div>
          </div>

          <div class="flex justify-between pt-6">
            <button
              @click="prevStep"
              class="px-6 py-2.5 rounded-full border border-neutral-300 bg-white text-sm font-semibold hover:bg-neutral-50 transition-colors"
            >
              Back
            </button>
            <button
              @click="handleSubmit"
              class="px-6 py-2.5 rounded-full bg-accent-primary text-white text-sm font-semibold hover:bg-accent-focus transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Get Started - Hinn',
  meta: [
    { name: 'description', content: 'Get started with your Hinn subscription' }
  ]
})

const currentStep = ref(1)
const steps = ['Personal Info', 'Choose Plan', 'Review']

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  selectedPlan: 'small'
})

const plans = [
  { 
    id: 'small', 
    name: 'Small Businesses', 
    price: '$59/mo', 
    description: 'Great for local and solo businesses',
    recommended: true 
  },
  { 
    id: 'ecom_large', 
    name: 'Ecommerce / Large Businesses', 
    price: '$99/mo', 
    description: 'Online store + growing operations' 
  },
  { 
    id: 'startup', 
    name: 'Large Businesses/Startups', 
    price: '$169/mo', 
    description: 'Advanced needs and faster support' 
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

const handleSubmit = () => {
  // In a real app, this would redirect to payment processor
  alert('In production, this would redirect to Stripe Checkout.\n\nYour selection:\n' + 
    `Name: ${formData.value.firstName} ${formData.value.lastName}\n` +
    `Email: ${formData.value.email}\n` +
    `Plan: ${selectedPlanDetails.value?.name} - ${selectedPlanDetails.value?.price}`)
}
</script>
