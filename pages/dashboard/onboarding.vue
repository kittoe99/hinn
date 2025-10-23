<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Dashboard Header (same as main dashboard) -->
    <header class="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-8">
            <NuxtLink to="/dashboard" class="flex items-center gap-2">
              <span class="text-xl font-bold text-primary">H</span>
              <span class="text-lg font-semibold text-primary">Hinn</span>
            </NuxtLink>
          </div>
          
          <div class="flex items-center gap-4">
            <button class="rounded-lg p-2 hover:bg-neutral-100 transition-colors">
              <svg class="h-5 w-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Onboarding Content -->
    <main class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <button @click="navigateTo('/dashboard')" class="mb-6 flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Dashboard
      </button>

      <!-- Onboarding Form Content (copied from onboarding.vue) -->
      <div class="relative overflow-hidden bg-neutral-50 rounded-2xl border border-neutral-200 p-8">
        <div class="relative">
          <header class="text-center mb-8">
            <h1 class="inline-flex items-center gap-3 text-3xl font-semibold text-primary">
              <svg class="h-8 w-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Complete Your Onboarding
            </h1>
            <p class="mt-2 text-sm text-secondary">Provide your business details to get started</p>
          </header>

          <!-- Progress Indicator -->
          <div class="mb-8 rounded-3xl border border-neutral-200 bg-white/90 p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-secondary">Step {{ currentStep }} of {{ totalSteps }}</p>
                <h2 class="mt-1 text-lg font-semibold text-primary">{{ stepSummaries[currentStep - 1].title }}</h2>
                <p class="mt-1 text-sm text-secondary">{{ stepSummaries[currentStep - 1].headline }}</p>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="mt-4 h-2 w-full rounded-full bg-neutral-200">
              <div 
                class="h-2 rounded-full bg-accent-primary transition-all duration-300"
                :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Placeholder for form content -->
          <div class="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
            <p class="text-secondary">Onboarding form steps will be displayed here</p>
            <p class="text-sm text-secondary mt-2">This is a placeholder - integrate the full onboarding form from onboarding.vue</p>
            
            <!-- Test Complete Button -->
            <button 
              @click="handleComplete"
              class="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-primary px-8 py-3 text-sm font-semibold text-white hover:bg-accent-focus transition-colors"
            >
              Complete Onboarding (Test)
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: false,
  middleware: ['auth']
})

useHead({
  title: 'Onboarding - Dashboard',
  meta: [
    { name: 'description', content: 'Complete your onboarding' }
  ]
})

const currentStep = ref(1)
const totalSteps = 8

const stepSummaries = [
  { id: 'type', title: 'Site type', headline: 'Choose your website type' },
  { id: 'business', title: 'Business basics', headline: 'Share your company details' },
  { id: 'website', title: 'Existing website', headline: 'Do you have a current website?' },
  { id: 'services', title: 'Services & coverage', headline: 'What you offer and where' },
  { id: 'operations', title: 'Operations', headline: 'How you work and your goals' },
  { id: 'design', title: 'Brand & style', headline: 'Visual direction' },
  { id: 'assets', title: 'Logo & assets', headline: 'Share your brand materials' },
  { id: 'review', title: 'Review & submit', headline: 'Review before submitting' }
]

const handleComplete = async () => {
  // In a real implementation, this would submit the onboarding data
  // For now, just redirect back to dashboard
  await navigateTo('/dashboard')
  
  // The dashboard will automatically hide the banner once onboarding is completed
  // because checkOnboardingStatus will detect no pending plans
}
</script>
