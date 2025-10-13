<template>
  <div class="relative overflow-hidden bg-neutral-50">
    <div class="absolute inset-x-0 -top-48 h-[420px] bg-gradient-to-b from-primary/10 via-accent-subtle/30 to-transparent" />

    <div class="relative">
      <section class="px-3 sm:px-4">
        <div class="mx-auto max-w-5xl pb-12 pt-16">
          <div class="flex flex-col gap-6 rounded-4xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-neutral-900/5 backdrop-blur sm:p-8">
            <div class="flex flex-col gap-3">
              <p class="w-fit rounded-full border border-accent-soft/70 bg-accent-subtle px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-primary">
                Onboarding checklist
              </p>
              <h1 class="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                Welcome! Let’s design your launch plan
              </h1>
              <p class="text-sm leading-6 text-secondary md:text-base">
                Answer a few questions so we can craft your site structure, recommend deliverables, and schedule your kickoff call. You’re {{ Math.round((currentStep / totalSteps) * 100) }}% done.
              </p>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
              <div
                v-for="card in introCards"
                :key="card.title"
                class="rounded-2xl border border-soft bg-white p-4 text-sm shadow-sm"
              >
                <p class="text-xs font-semibold uppercase tracking-wide text-secondary">{{ card.kicker }}</p>
                <p class="mt-1 text-sm font-semibold text-primary">{{ card.title }}</p>
                <p class="mt-2 text-xs leading-5 text-secondary">{{ card.copy }}</p>
              </div>
            </div>

            <div class="flex flex-col gap-3 rounded-2xl border border-dashed border-accent-soft bg-white p-4 text-sm text-secondary md:flex-row md:items-center md:justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-primary">Kickoff scheduled in minutes</p>
                  <p class="text-xs">Submit the flow to unlock a booking link for your intro call.</p>
                </div>
              </div>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm transition hover:bg-neutral-50"
              >
                Preview calendar
                <svg class="ml-2 h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="relative px-3 pb-24 sm:px-4">
        <div class="mx-auto max-w-6xl">
          <div class="grid gap-6 lg:grid-cols-[280px,minmax(0,1fr)]">
            <aside class="hidden lg:flex lg:flex-col lg:gap-6">
              <div class="rounded-3xl border border-soft bg-white/80 p-5 shadow-md shadow-neutral-900/5 backdrop-blur">
                <p class="text-xs font-semibold uppercase tracking-wide text-secondary">Progress</p>
                <div class="mt-4 space-y-3">
                  <button
                    v-for="(step, index) in stepSummaries"
                    :key="step.id"
                    type="button"
                    @click="jumpTo(index + 1)"
                    :class="[
                      'w-full rounded-2xl border px-4 py-3 text-left transition',
                      currentStep === index + 1
                        ? 'border-accent-primary bg-accent-subtle'
                        : index + 1 < currentStep
                          ? 'border-accent-soft bg-white'
                          : 'border-neutral-200 bg-white hover:border-accent-soft'
                    ]"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <p class="text-sm font-semibold text-primary">{{ step.title }}</p>
                        <p class="mt-1 text-xs leading-5 text-secondary">{{ step.description }}</p>
                      </div>
                      <span
                        :class="[
                          'mt-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold',
                          index + 1 <= currentStep ? 'bg-accent-primary text-white' : 'bg-neutral-100 text-secondary'
                        ]"
                      >
                        <span v-if="index + 1 < currentStep">✓</span>
                        <span v-else>{{ index + 1 }}</span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              <div class="rounded-3xl border border-dashed border-accent-soft bg-white/60 p-5 text-xs text-secondary">
                <p class="text-sm font-semibold text-primary">Launch milestones</p>
                <ul class="mt-3 space-y-2">
                  <li v-for="item in milestones" :key="item" class="flex items-start gap-2">
                    <span class="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent-primary" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <div class="rounded-3xl border border-soft bg-white/90 p-5 shadow-sm">
                <p class="text-sm font-semibold text-primary">Need support?</p>
                <p class="mt-2 text-xs leading-6 text-secondary">Message us anytime at <a class="font-medium text-accent-primary underline-offset-4 hover:underline" href="mailto:hello@hinn.studio">hello@hinn.studio</a>. We’ll respond within a few hours.</p>
              </div>
            </aside>

            <div class="space-y-6">
              <div class="flex items-center justify-between rounded-3xl border border-soft bg-white/90 p-4 shadow-sm shadow-neutral-900/5 backdrop-blur">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-secondary">Step {{ currentStep }} of {{ totalSteps }}</p>
                  <h2 class="mt-1 text-lg font-semibold text-primary">{{ stepSummaries[currentStep - 1].title }}</h2>
                  <p class="mt-1 text-sm text-secondary">{{ stepSummaries[currentStep - 1].headline }}</p>
                </div>
                <div class="hidden h-14 w-14 items-center justify-center rounded-full bg-accent-subtle text-accent-primary sm:flex">
                  <svg
                    v-if="stepSummaries[currentStep - 1].icon === 'layout'"
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3.75 6A2.25 2.25 0 0 1 6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6Z" />
                    <path d="M3.75 9h16.5M9 20.25V9" />
                  </svg>
                  <svg
                    v-else-if="stepSummaries[currentStep - 1].icon === 'clipboard'"
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5.25h6" />
                    <path d="M9 3.75h6a1.5 1.5 0 0 1 1.5 1.5v.75h1.125A2.625 2.625 0 0 1 20.25 8.625v9.75A2.625 2.625 0 0 1 17.625 21H6.375A2.625 2.625 0 0 1 3.75 18.375v-9.75A2.625 2.625 0 0 1 6.375 6h1.125V4.5A1.5 1.5 0 0 1 9 3Z" />
                    <path d="M9 12h6m-6 3h3" />
                  </svg>
                  <svg
                    v-else-if="stepSummaries[currentStep - 1].icon === 'pages'"
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.25 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9A2.25 2.25 0 0 1 3 16.5v-9A2.25 2.25 0 0 1 5.25 5.25Z" />
                    <path d="M9.75 3H18a3 3 0 0 1 3 3v8.25" />
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
                    <path d="M12 6.75A3.75 3.75 0 1 1 8.25 3 3.75 3.75 0 0 1 12 6.75Zm0 0a4.5 4.5 0 0 1 4.5 4.5V12a4.5 4.5 0 0 0 2.1 3.773l.008.005a2.25 2.25 0 0 1-1.208 4.222H6.6a2.25 2.25 0 0 1-1.208-4.222l.008-.005A4.5 4.5 0 0 0 7.5 12v-.75a4.5 4.5 0 0 1 4.5-4.5Z" />
                  </svg>
                </div>
              </div>

              <!-- Step 1 -->
              <div v-if="currentStep === 1" class="space-y-6">
                <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                  <h3 class="text-base font-semibold text-primary">What type of site do you need?</h3>
                  <p class="mt-1 text-sm text-secondary">Choose the option that best describes your project.</p>

                  <div class="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <button
                      v-for="type in siteTypes"
                      :key="type"
                      type="button"
                      @click="formData.siteType = type"
                      :class="[
                        'flex h-full flex-col justify-between rounded-2xl border-2 p-4 text-left transition',
                        formData.siteType === type
                          ? 'border-accent-primary bg-accent-subtle shadow-sm'
                          : 'border-neutral-200 bg-white hover:border-accent-soft'
                      ]"
                    >
                      <span class="text-sm font-semibold text-primary">{{ type }}</span>
                      <span class="mt-3 text-xs text-secondary">{{ siteTypeCopy[type] }}</span>
                    </button>
                  </div>

                  <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-xs text-secondary">Not sure? Pick the closest fit—we’ll refine together.</p>
                    <button
                      type="button"
                      @click="nextStep"
                      :disabled="!formData.siteType"
                      class="inline-flex items-center justify-center rounded-full bg-accent-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-focus disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Continue
                    </button>
                  </div>
                </div>

                <div class="rounded-3xl border border-dashed border-accent-soft bg-white/70 p-6 text-sm text-secondary">
                  <p class="font-semibold text-primary">Prefer to talk first?</p>
                  <p class="mt-2 leading-6">Skip ahead by emailing your project brief to <a href="mailto:start@hinn.studio" class="font-medium text-accent-primary underline-offset-4 hover:underline">start@hinn.studio</a>. We’ll complete onboarding for you.</p>
                </div>
              </div>

              <!-- Step 2 -->
              <div v-if="currentStep === 2" class="space-y-6">
                <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                  <h3 class="text-base font-semibold text-primary">Tell us about your business</h3>
                  <p class="mt-1 text-sm text-secondary">Help us understand what you do.</p>

                  <form @submit.prevent="nextStep" class="mt-6 space-y-5">
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Business/Project Name *</label>
                      <input
                        v-model="formData.businessName"
                        type="text"
                        required
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label class="mb-1 block text-sm font-medium text-primary">Industry/Category</label>
                        <select
                          v-model="formData.category"
                          class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        >
                          <option value="">Select a category</option>
                          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                      </div>
                      <div>
                        <label class="mb-1 block text-sm font-medium text-primary">Target Location</label>
                        <select
                          v-model="formData.country"
                          class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        >
                          <option value="">Select a country</option>
                          <option v-for="country in countries" :key="country.code" :value="country.code">
                            {{ country.name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Brief Description</label>
                      <textarea
                        v-model="formData.description"
                        rows="3"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="Tell us what makes your business unique..."
                      />
                    </div>

                    <div class="rounded-2xl bg-neutral-50 px-4 py-3 text-xs text-secondary">
                      <p>Share anything we should know about your audience, marketing channels, or conversion goals.</p>
                    </div>

                    <div class="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        @click="prevStep"
                        class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-neutral-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        class="inline-flex items-center justify-center rounded-full bg-accent-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-focus"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>

                <div class="rounded-3xl border border-soft bg-white/90 p-6 shadow-sm">
                  <p class="text-sm font-semibold text-primary">Helpful tips</p>
                  <ul class="mt-3 space-y-2 text-xs text-secondary">
                    <li v-for="tip in tips" :key="tip" class="flex items-start gap-2">
                      <svg class="mt-0.5 h-3.5 w-3.5 flex-none text-accent-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ tip }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Step 3 -->
              <div v-if="currentStep === 3" class="space-y-6">
                <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                  <h3 class="text-base font-semibold text-primary">What pages do you need?</h3>
                  <p class="mt-1 text-sm text-secondary">Select the pages you'd like on your website.</p>

                  <div class="mt-6 grid gap-3 sm:grid-cols-2">
                    <label
                      v-for="page in suggestedPages"
                      :key="page"
                      class="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3 text-sm text-primary transition hover:border-accent-soft hover:bg-neutral-50"
                    >
                      <input
                        type="checkbox"
                        :value="page"
                        v-model="formData.selectedPages"
                        class="h-4 w-4 rounded border-neutral-300 text-accent-primary focus:ring-accent-soft"
                      />
                      <span>{{ page }}</span>
                    </label>
                  </div>

                  <div class="mt-6">
                    <label class="mb-1 block text-sm font-medium text-primary">Additional Pages (optional)</label>
                    <input
                      v-model="formData.customPages"
                      type="text"
                      class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                      placeholder="e.g., Team, Careers, Press"
                    />
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
                      @click="nextStep"
                      class="inline-flex items-center justify-center rounded-full bg-accent-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-focus"
                    >
                      Continue
                    </button>
                  </div>
                </div>

                <div class="rounded-3xl border border-dashed border-accent-soft bg-white/70 p-6 text-sm text-secondary">
                  <p class="font-semibold text-primary">Page strategy tip</p>
                  <p class="mt-2 leading-6">We recommend prioritizing high-impact conversion pages first. Additional pages can be added once we understand visitor behavior.</p>
                </div>
              </div>

              <!-- Step 4 -->
              <div v-if="currentStep === 4" class="space-y-6">
                <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                  <h3 class="text-base font-semibold text-primary">Design preferences</h3>
                  <p class="mt-1 text-sm text-secondary">Help us understand your style.</p>

                  <div class="mt-6 space-y-5">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-primary">Style preference</label>
                      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <button
                          v-for="style in designStyles"
                          :key="style"
                          type="button"
                          @click="formData.designStyle = style"
                          :class="[
                            'flex h-full flex-col justify-between rounded-2xl border-2 p-4 text-sm transition',
                            formData.designStyle === style
                              ? 'border-accent-primary bg-accent-subtle shadow-sm'
                              : 'border-neutral-200 bg-white hover:border-accent-soft'
                          ]"
                        >
                          <span class="font-semibold text-primary">{{ style }}</span>
                          <span class="mt-3 text-xs text-secondary">{{ styleCopy[style] }}</span>
                        </button>
                      </div>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                      <div class="sm:col-span-2">
                        <label class="mb-1 block text-sm font-medium text-primary">Brand colors (if any)</label>
                        <input
                          v-model="formData.brandColors"
                          type="text"
                          class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                          placeholder="e.g., Blue and gold, or #1E40AF"
                        />
                      </div>
                      <div>
                        <label class="mb-1 block text-sm font-medium text-primary">Inspiration sites (optional)</label>
                        <textarea
                          v-model="formData.inspirationSites"
                          rows="2"
                          class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                          placeholder="Share URLs of sites you like..."
                        />
                      </div>
                      <div>
                        <label class="mb-1 block text-sm font-medium text-primary">Additional notes</label>
                        <textarea
                          v-model="formData.additionalNotes"
                          rows="3"
                          class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                          placeholder="Any other details we should know..."
                        />
                      </div>
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
                      class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                    >
                      Complete onboarding
                    </button>
                  </div>
                </div>

                <div class="rounded-3xl border border-soft bg-white/90 p-6 shadow-sm">
                  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p class="text-sm font-semibold text-primary">What happens next?</p>
                      <p class="mt-1 text-xs leading-6 text-secondary">We’ll synthesize your inputs, share a first-week roadmap, and invite you to our collaboration hub.</p>
                    </div>
                    <NuxtLink
                      to="/get-started"
                      class="inline-flex w-fit items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm transition hover:bg-neutral-50"
                    >
                      Review subscription options
                      <svg class="ml-2 h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24">
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </NuxtLink>
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
import { computed, ref } from 'vue'

useHead({
  title: 'Onboarding - Hinn',
  meta: [
    { name: 'description', content: 'Complete your onboarding to get started' }
  ]
})

const currentStep = ref(1)

const stepSummaries = [
  {
    id: 'type',
    title: 'Site type',
    headline: 'We’ll tailor the structure and CMS to match your model.',
    description: 'Choose the closest fit so we can recommend the right feature set.',
    icon: 'layout'
  },
  {
    id: 'business',
    title: 'Business context',
    headline: 'Share your brand story and target markets.',
    description: 'Tell us about your industry, goals, and audiences.',
    icon: 'clipboard'
  },
  {
    id: 'pages',
    title: 'Pages & features',
    headline: 'Select the pages and experiences you want at launch.',
    description: 'Pick the pages you need now—we can always expand later.',
    icon: 'pages'
  },
  {
    id: 'design',
    title: 'Design preferences',
    headline: 'Capture brand details, inspiration, and must-haves.',
    description: 'Share style cues, color palettes, and creative notes.',
    icon: 'profile'
  }
]

const totalSteps = stepSummaries.length

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

const siteTypeCopy = {
  'Small business': 'Service menus, trust signals, and booking-ready layouts.',
  Ecommerce: 'Product grids, conversion flows, and integrations for sales.',
  Portfolio: 'Gallery-first layouts to showcase case studies and work.',
  Blog: 'Editorial tooling with tagging, SEO, and newsletter capture.',
  SaaS: 'Feature storytelling, pricing, and onboarding experiments.',
  Agency: 'Project highlights, service mix, and lead capture funnels.',
  Nonprofit: 'Mission-driven storytelling with donation and volunteer flows.',
  Community: 'Membership directories, events, and engagement hubs.',
  'Personal brand': 'Personal narrative, offers, and list-building moments.',
  'Hobby site': 'Flexible blocks for content, tutorials, and monetization.'
}

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

const styleCopy = {
  Modern: 'Clean grids, generous whitespace, and confident typography.',
  Minimal: 'Calm palettes, refined interactions, and focus on essentials.',
  Bold: 'Expressive type, color pops, and high-impact storytelling.',
  Classic: 'Traditional layouts, serif-led type, and editorial sensibility.',
  Playful: 'Friendly colors, motion accents, and conversational tone.',
  Professional: 'Polished visuals, trusted patterns, and business-first clarity.'
}

const introCards = [
  {
    kicker: 'Time to complete',
    title: '5–7 minutes',
    copy: 'You can pause anytime—your answers save automatically in the background.'
  },
  {
    kicker: 'What we’ll do',
    title: 'Build a tailored plan',
    copy: 'Your responses inform the recommended architecture, design direction, and experiments.'
  },
  {
    kicker: 'After submission',
    title: 'Book your kickoff',
    copy: 'Receive a meeting link, shared workspace invite, and next-step checklist instantly.'
  }
]

const milestones = [
  'Kickoff call within two business days',
  'Design alignment and sitemap within week one',
  'First build handoff with review links in week two',
  'Iterate and launch with analytics baseline in week three'
]

const tips = [
  'Share your differentiators to help us highlight them on key pages.',
  'Mention any existing assets (brand guides, photography) we should use.',
  'Note critical integrations—CRM, booking tools, or automations.'
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

const jumpTo = step => {
  currentStep.value = step
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSubmit = () => {
  // In a real app, this would save to database
  console.log('Onboarding data:', formData.value)
  alert('Onboarding complete! In production, this would save your preferences and redirect you to your dashboard.')

  // Redirect to dashboard or next step
  // navigateTo('/dashboard')
}
</script>
