<template>
  <div class="py-12 md:py-16">
    <div class="max-w-5xl mx-auto px-3 sm:px-4">
      <h1 class="text-2xl md:text-3xl font-semibold tracking-tight text-primary">Welcome! Let's Build Your Site</h1>
      <p class="mt-2 text-sm md:text-base text-secondary">
        Tell us about your project so we can create the perfect website for you.
      </p>

      <!-- Progress Steps -->
      <div class="mt-8 flex items-center justify-center gap-2">
        <div 
          v-for="i in totalSteps" 
          :key="i"
          :class="[
            'h-2 rounded-full transition-all',
            i === currentStep ? 'w-8 bg-accent-primary' : 
            i < currentStep ? 'w-2 bg-accent-primary' : 
            'w-2 bg-neutral-200'
          ]"
        />
      </div>

      <div class="mt-8">
        <!-- Step 1: Site Type -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div class="rounded-3xl border border-soft bg-white p-5 sm:p-6">
            <h2 class="text-lg font-semibold text-primary">What type of site do you need?</h2>
            <p class="mt-1 text-sm text-secondary">Choose the option that best describes your project.</p>
            
            <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                v-for="type in siteTypes"
                :key="type"
                @click="formData.siteType = type"
                :class="[
                  'p-4 rounded-xl border-2 text-left transition-all',
                  formData.siteType === type 
                    ? 'border-accent-primary bg-accent-subtle' 
                    : 'border-neutral-200 hover:border-accent-soft'
                ]"
              >
                <div class="text-sm font-semibold text-primary">{{ type }}</div>
              </button>
            </div>

            <div class="flex justify-end pt-6">
              <button
                @click="nextStep"
                :disabled="!formData.siteType"
                class="px-6 py-2.5 rounded-full bg-accent-primary text-white text-sm font-semibold hover:bg-accent-focus transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        <!-- Step 2: Business Details -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div class="rounded-3xl border border-soft bg-white p-5 sm:p-6">
            <h2 class="text-lg font-semibold text-primary">Tell us about your business</h2>
            <p class="mt-1 text-sm text-secondary">Help us understand what you do.</p>
            
            <form @submit.prevent="nextStep" class="mt-5 space-y-4">
              <div>
                <label class="block text-sm font-medium text-primary mb-1">Business/Project Name *</label>
                <input
                  v-model="formData.businessName"
                  type="text"
                  required
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-1">Industry/Category</label>
                <select
                  v-model="formData.category"
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                >
                  <option value="">Select a category</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-1">Brief Description</label>
                <textarea
                  v-model="formData.description"
                  rows="3"
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                  placeholder="Tell us what makes your business unique..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-1">Target Location</label>
                <select
                  v-model="formData.country"
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                >
                  <option value="">Select a country</option>
                  <option v-for="country in countries" :key="country.code" :value="country.code">
                    {{ country.name }}
                  </option>
                </select>
              </div>

              <div class="flex justify-between pt-4">
                <button
                  type="button"
                  @click="prevStep"
                  class="px-6 py-2.5 rounded-full border border-neutral-300 bg-white text-sm font-semibold hover:bg-neutral-50 transition-colors"
                >
                  Back
                </button>
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

        <!-- Step 3: Pages & Features -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div class="rounded-3xl border border-soft bg-white p-5 sm:p-6">
            <h2 class="text-lg font-semibold text-primary">What pages do you need?</h2>
            <p class="mt-1 text-sm text-secondary">Select the pages you'd like on your website.</p>
            
            <div class="mt-5 space-y-3">
              <label
                v-for="page in suggestedPages"
                :key="page"
                class="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="page"
                  v-model="formData.selectedPages"
                  class="w-4 h-4 text-accent-primary rounded focus:ring-accent-soft"
                />
                <span class="text-sm text-primary">{{ page }}</span>
              </label>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-primary mb-1">Additional Pages (optional)</label>
              <input
                v-model="formData.customPages"
                type="text"
                class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                placeholder="e.g., Team, Careers, Press"
              />
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
                class="px-6 py-2.5 rounded-full bg-accent-primary text-white text-sm font-semibold hover:bg-accent-focus transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        <!-- Step 4: Design Preferences -->
        <div v-if="currentStep === 4" class="space-y-6">
          <div class="rounded-3xl border border-soft bg-white p-5 sm:p-6">
            <h2 class="text-lg font-semibold text-primary">Design Preferences</h2>
            <p class="mt-1 text-sm text-secondary">Help us understand your style.</p>
            
            <div class="mt-5 space-y-4">
              <div>
                <label class="block text-sm font-medium text-primary mb-2">Style Preference</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    v-for="style in designStyles"
                    :key="style"
                    @click="formData.designStyle = style"
                    :class="[
                      'p-3 rounded-lg border-2 text-sm text-center transition-all',
                      formData.designStyle === style 
                        ? 'border-accent-primary bg-accent-subtle' 
                        : 'border-neutral-200 hover:border-accent-soft'
                    ]"
                  >
                    {{ style }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-1">Brand Colors (if any)</label>
                <input
                  v-model="formData.brandColors"
                  type="text"
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                  placeholder="e.g., Blue and gold, or #1E40AF"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-1">Inspiration Sites (optional)</label>
                <textarea
                  v-model="formData.inspirationSites"
                  rows="2"
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                  placeholder="Share URLs of sites you like..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-1">Additional Notes</label>
                <textarea
                  v-model="formData.additionalNotes"
                  rows="3"
                  class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                  placeholder="Any other details we should know..."
                />
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
                Complete Onboarding
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Onboarding - Hinn',
  meta: [
    { name: 'description', content: 'Complete your onboarding to get started' }
  ]
})

const currentStep = ref(1)
const totalSteps = 4

const formData = ref({
  siteType: '',
  businessName: '',
  category: '',
  description: '',
  country: '',
  selectedPages: [],
  customPages: '',
  designStyle: '',
  brandColors: '',
  inspirationSites: '',
  additionalNotes: ''
})

const siteTypes = [
  'Small business',
  'Ecommerce',
  'Portfolio',
  'Blog',
  'SaaS',
  'Agency',
  'Nonprofit',
  'Community',
  'Personal brand',
  'Hobby site'
]

const categories = [
  'Restaurants',
  'Retail',
  'Health & Wellness',
  'Professional Services',
  'Home Services',
  'Technology',
  'Education',
  'Entertainment',
  'Other'
]

const countries = [
  { code: 'us', name: 'United States' },
  { code: 'ca', name: 'Canada' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'au', name: 'Australia' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'in', name: 'India' },
  { code: 'mx', name: 'Mexico' },
  { code: 'br', name: 'Brazil' },
  { code: 'other', name: 'Other' }
]

const suggestedPages = computed(() => {
  const basePages = ['Home', 'About', 'Contact']
  const typePages = {
    'Small business': ['Services', 'Pricing', 'FAQ'],
    'Ecommerce': ['Shop', 'Cart', 'Checkout'],
    'Portfolio': ['Work', 'Case Studies'],
    'Blog': ['Articles', 'Categories'],
    'SaaS': ['Features', 'Pricing', 'Docs'],
    'Agency': ['Services', 'Work', 'Testimonials'],
    'Nonprofit': ['Mission', 'Donate', 'Volunteer'],
    'Community': ['Forums', 'Events', 'Members'],
    'Personal brand': ['Speaking', 'Coaching', 'Newsletter'],
    'Hobby site': ['Articles', 'Gallery', 'Guides']
  }
  
  const additional = typePages[formData.value.siteType] || []
  return [...basePages, ...additional]
})

const designStyles = [
  'Modern',
  'Minimal',
  'Bold',
  'Classic',
  'Playful',
  'Professional'
]

const nextStep = () => {
  if (currentStep.value < totalSteps) {
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
  // In a real app, this would save to database
  console.log('Onboarding data:', formData.value)
  alert('Onboarding complete! In production, this would save your preferences and redirect you to your dashboard.')
  
  // Redirect to dashboard or next step
  // navigateTo('/dashboard')
}
</script>
