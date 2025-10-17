<template>
  <div class="relative overflow-hidden bg-neutral-50">
    <div class="absolute inset-x-0 -top-48 h-[420px] bg-transparent" />

    <div class="relative">
      <section class="px-3 pb-24 sm:px-4">
        <div class="mx-auto max-w-4xl pt-16">
          <header class="text-center">
            <h1 class="text-3xl font-semibold text-primary">Onboarding</h1>
            <p class="mt-2 text-sm text-secondary">Follow the steps to provide everything we need for kickoff.</p>
          </header>

          <div class="mt-10 space-y-6">
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
                  v-else-if="stepSummaries[currentStep - 1].icon === 'palette'"
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15.75 3.75a6.75 6.75 0 0 1 0 13.5h-1.13a2.25 2.25 0 0 0-1.592.658l-1.66 1.66A1.5 1.5 0 0 1 8.321 18h-.571A6.75 6.75 0 0 1 8.25 4.5m7.5-.75a1.125 1.125 0 1 1-1.125 1.125A1.125 1.125 0 0 1 15.75 3.75Zm-4.5 0a1.125 1.125 0 1 1-1.125 1.125A1.125 1.125 0 0 1 11.25 3.75Zm-4.5 0a1.125 1.125 0 1 1-1.125 1.125A1.125 1.125 0 0 1 6.75 3.75Z"
                  />
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

                <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <button
                    v-for="type in siteTypes"
                    :key="type"
                    type="button"
                    @click="formData.siteType = type"
                    :class="[
                      'flex h-full flex-col justify-center rounded-2xl border-2 p-4 text-left transition',
                      formData.siteType === type
                        ? 'border-accent-primary bg-accent-subtle shadow-sm'
                        : 'border-neutral-200 bg-white hover:border-accent-soft'
                    ]"
                  >
                    <span class="text-sm font-semibold text-primary">{{ type }}</span>
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
            </div>

            <!-- Step 2: Business Basics -->
            <div v-if="currentStep === 2" class="space-y-6">
              <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-base font-semibold text-primary">Business basics</h3>
                <p class="mt-1 text-sm text-secondary">Tell us about your company and how we can reach you.</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Business/Project Name *</label>
                      <input
                        v-model="formData.businessName"
                        type="text"
                        required
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="Your company or product name"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Industry/Category *</label>
                      <FormSelect v-model="formData.category" :options="categories" placeholder="Select a category" required />
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Business Email *</label>
                      <input
                        v-model="formData.businessEmail"
                        type="email"
                        required
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Business Phone</label>
                      <input
                        v-model="formData.businessPhone"
                        type="tel"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="(000) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-primary">Preferred contact method</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <button
                        v-for="method in contactMethods"
                        :key="method.value"
                        type="button"
                        @click="formData.contactMethod = method.value"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm font-medium transition',
                          formData.contactMethod === method.value
                            ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                            : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                        ]"
                      >
                        {{ method.label }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-primary">Describe what you offer</label>
                    <textarea
                      v-model="formData.description"
                      rows="3"
                      class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                      placeholder="Share your core services, audience, and goals"
                    />
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
            </div>

            <!-- Step 3: Existing Website -->
            <div v-if="currentStep === 3" class="space-y-6">
              <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-base font-semibold text-primary">Existing website</h3>
                <p class="mt-1 text-sm text-secondary">Do you have a current website we can analyze?</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  <div>
                    <label class="block text-sm font-medium text-primary mb-3">Do you have a current website?</label>
                    <div class="flex gap-3">
                      <button
                        v-for="option in [{value: 'yes', label: 'Yes'}, {value: 'no', label: 'No'}]"
                        :key="option.value"
                        type="button"
                        @click="hasCurrent = option.value"
                        :class="[
                          'rounded-2xl border px-6 py-3 text-sm font-medium transition',
                          hasCurrent === option.value
                            ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                            : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                        ]"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>

                  <div v-if="hasCurrent === 'yes'" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Website URL or domain</label>
                      <input
                        v-model="currentUrl"
                        :disabled="searching"
                        type="text"
                        placeholder="example.com or https://example.com"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft disabled:opacity-60"
                      />
                    </div>

                    <div class="flex items-center gap-3">
                      <button
                        type="button"
                        @click="analyzeWebsite"
                        :disabled="!currentUrl || searching"
                        class="rounded-full bg-accent-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-focus disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {{ searching ? 'Analyzing…' : 'Analyze site' }}
                      </button>
                      <button
                        type="button"
                        @click="skipped = true; siteAdded = false; siteSummary = null; siteError = null"
                        class="text-sm text-secondary hover:text-primary hover:underline"
                      >
                        Skip
                      </button>
                    </div>

                    <!-- Progress indicator -->
                    <div v-if="searching" class="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <div class="text-sm font-medium text-primary mb-2">Analyzing your website…</div>
                      <div class="h-2 w-full rounded-full bg-neutral-100">
                        <div class="h-2 rounded-full bg-accent-primary transition-all duration-300" :style="{ width: `${searchProgress}%` }" />
                      </div>
                      <ul class="mt-3 space-y-1 text-xs text-secondary">
                        <li v-for="(log, idx) in searchLogs" :key="idx" class="flex items-center gap-2">
                          <span class="inline-block h-1.5 w-1.5 rounded-full bg-accent-primary" />
                          {{ log }}
                        </li>
                      </ul>
                    </div>

                    <!-- Error message -->
                    <div v-if="siteError" class="text-sm text-red-600">{{ siteError }}</div>
                    <div v-if="siteNotFound" class="text-sm text-secondary">No info found. You can skip or add details manually.</div>

                    <!-- Summary -->
                    <div v-if="siteSummary?.summary && !searching" class="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm">
                      <div class="text-sm font-medium text-primary mb-2">Summary</div>
                      <div class="text-sm text-secondary whitespace-pre-wrap">{{ siteSummary.summary }}</div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      @click="prevStep"
                      class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      :disabled="hasCurrent === 'yes' && !siteAdded && !skipped"
                      class="inline-flex items-center justify-center rounded-full bg-accent-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-focus disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Step 4: Services & Coverage -->
            <div v-if="currentStep === 4" class="space-y-6">
              <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-base font-semibold text-primary">Services & coverage</h3>
                <p class="mt-1 text-sm text-secondary">Define what you offer and where you operate.</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">

                  <div>
                    <label class="mb-2 block text-sm font-medium text-primary">Services you provide</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <button
                        v-for="service in serviceOptions"
                        :key="service"
                        type="button"
                        @click="toggleService(service)"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm transition',
                          formData.selectedServices.includes(service)
                            ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                            : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                        ]"
                      >
                        {{ service }}
                      </button>
                    </div>

                    <!-- Custom service input -->
                    <div class="mt-4">
                      <label class="mb-2 block text-xs font-medium text-secondary">Add custom service</label>
                      <div class="flex gap-2">
                        <input
                          v-model="customService"
                          type="text"
                          placeholder="e.g., Custom consulting"
                          class="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                          @keydown.enter.prevent="addCustomService"
                        />
                        <button
                          type="button"
                          @click="addCustomService"
                          :disabled="!customService.trim()"
                          class="rounded-xl bg-accent-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-focus disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <!-- Display selected services with remove option -->
                    <div v-if="formData.selectedServices.length" class="mt-4 flex flex-wrap gap-2">
                      <div
                        v-for="(service, index) in formData.selectedServices"
                        :key="index"
                        class="inline-flex items-center gap-2 rounded-full border border-accent-primary bg-accent-subtle px-3 py-1.5 text-sm text-primary"
                      >
                        <span>{{ service }}</span>
                        <button
                          type="button"
                          @click="removeService(index)"
                          class="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-accent-primary hover:text-white transition"
                        >
                          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-primary">Service areas</label>
                    <ServiceAreaPicker v-model="formData.serviceAreas" />
                    <div
                      v-if="availableSeedAreas.length"
                      class="mt-3 rounded-2xl border border-dashed border-accent-soft bg-accent-subtle/40 p-4 text-xs text-secondary"
                    >
                      <p class="text-sm font-semibold text-primary">Detected location</p>
                      <p class="mt-1">We detected your location. Click to add it as a service area.</p>
                      <div class="mt-3 flex flex-wrap gap-2">
                        <button
                          v-for="area in availableSeedAreas"
                          :key="area.placeId || area.name"
                          type="button"
                          class="rounded-full border border-accent-soft bg-white px-3 py-1.5 text-xs font-semibold text-primary transition hover:border-accent-primary"
                          @click="useSeedArea(area)"
                        >
                          Add {{ area.displayName || area.name }}
                        </button>
                        <button
                          v-if="availableSeedAreas.length > 1"
                          type="button"
                          class="rounded-full border border-transparent bg-accent-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-accent-focus"
                          @click="useAllSeedAreas"
                        >
                          Add all
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-primary">Coverage type</label>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          v-for="option in coverageOptions"
                          :key="option.value"
                          type="button"
                          @click="formData.coverageType = option.value"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.coverageType === option.value
                              ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                              : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                          ]"
                        >
                          {{ option.label }}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-medium text-primary">Service delivery</label>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          v-for="option in onSiteModes"
                          :key="option.value"
                          type="button"
                          @click="formData.onSiteMode = option.value"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.onSiteMode === option.value
                              ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                              : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                          ]"
                        >
                          {{ option.label }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
            </div>

            <!-- Step 5: Operations -->
            <div v-if="currentStep === 5" class="space-y-6">
              <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-base font-semibold text-primary">Operations</h3>
                <p class="mt-1 text-sm text-secondary">Tell us about your hours, goals, and language preferences.</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-primary">Business hours</label>
                      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <button
                          v-for="option in hoursOptions"
                          :key="option.value"
                          type="button"
                          @click="formData.businessHoursMode = option.value"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.businessHoursMode === option.value
                              ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                              : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                          ]"
                        >
                          {{ option.label }}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Primary goal</label>
                      <FormSelect
                        v-model="formData.primaryGoal"
                        :options="goalOptions"
                        placeholder="Select a goal"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-primary">Languages your site needs</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <button
                        v-for="language in languageOptions"
                        :key="language"
                        type="button"
                        @click="toggleLanguage(language)"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm transition',
                          formData.languages.includes(language)
                            ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                            : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                        ]"
                      >
                        {{ language }}
                      </button>
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Primary language</label>
                      <FormSelect
                        v-model="formData.primaryLanguage"
                        :options="primaryLanguageOptions"
                        placeholder="Choose a primary language"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Logo availability</label>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          v-for="option in logoOptions"
                          :key="option.value"
                          type="button"
                          @click="formData.hasLogo = option.value === 'yes'"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.hasLogo === (option.value === 'yes')
                              ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                              : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                          ]"
                        >
                          {{ option.label }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
            </div>

            <!-- Step 6: Design -->
            <div v-if="currentStep === 6" class="space-y-6">
              <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-base font-semibold text-primary">Share the look and feel</h3>
                <p class="mt-1 text-sm text-secondary">Choose the options that feel closest—we'll fine-tune the details together.</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-primary">Overall look</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <button
                        v-for="style in designStyles"
                        :key="style"
                        type="button"
                        @click="toggleDesignStyle(style)"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm transition',
                          formData.designStyles.includes(style)
                            ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                            : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                        ]"
                      >
                        {{ style }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-primary">Mood</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <button
                        v-for="tone in emotionalOptions"
                        :key="tone"
                        type="button"
                        @click="toggleEmotion(tone)"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm transition',
                          formData.emotionalImpact.includes(tone)
                            ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                            : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                        ]"
                      >
                        {{ tone }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-primary">Color theme</label>
                    <p class="text-xs text-secondary">Pick a starting palette—we can adjust or add brand colors later.</p>
                    <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        v-for="theme in colorThemes"
                        :key="theme.value"
                        type="button"
                        @click="formData.colorTheme = theme.value"
                        :class="[
                          'flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition',
                          formData.colorTheme === theme.value
                            ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                            : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                        ]"
                      >
                        <div class="flex items-center gap-3">
                          <div class="flex items-center gap-1">
                            <span
                              v-for="swatch in theme.swatches"
                              :key="swatch"
                              class="h-6 w-6 rounded-full border border-white/70 shadow-sm"
                              :style="{ backgroundColor: swatch }"
                            />
                          </div>
                          <span class="text-sm font-medium">{{ theme.label }}</span>
                        </div>
                        <svg
                          v-if="formData.colorTheme === theme.value"
                          class="h-4 w-4 text-accent-primary"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-primary">Text contrast</label>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          @click="formData.highContrast = false"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.highContrast === false
                              ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                              : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                          ]"
                        >
                          Standard
                        </button>
                        <button
                          type="button"
                          @click="formData.highContrast = true"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.highContrast === true
                              ? 'border-accent-primary bg-accent-subtle text-primary shadow-sm'
                              : 'border-neutral-200 bg-white text-secondary hover:border-accent-soft hover:text-primary'
                          ]"
                        >
                          High contrast
                        </button>
                      </div>
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Extra color notes (optional)</label>
                      <input
                        v-model="formData.brandColors"
                        type="text"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="Share any specific colors or hex codes"
                      />
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Websites you like</label>
                      <textarea
                        v-model="formData.inspirationSites"
                        rows="2"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="Add any links that inspire you"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium text-primary">Anything else we should know?</label>
                      <textarea
                        v-model="formData.additionalNotes"
                        rows="2"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft"
                        placeholder="Special requests, must-have sections, or questions"
                      />
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
            </div>

            <!-- Step 7: Logo & Assets -->
            <div v-if="currentStep === 7" class="space-y-6">
              <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-base font-semibold text-primary">Logo & brand assets</h3>
                <p class="mt-1 text-sm text-secondary">Upload your logo and any brand materials you'd like us to use.</p>

                <form @submit.prevent="handleSubmit" class="mt-8 space-y-8">
                  
                  <!-- Logo Upload -->
                  <div>
                    <label class="mb-3 block text-sm font-medium text-primary">Company logo</label>
                    <div class="space-y-4">
                      <!-- No Logo Option -->
                      <label class="flex items-center gap-3 cursor-pointer">
                        <input
                          v-model="formData.noLogo"
                          type="checkbox"
                          class="h-4 w-4 rounded border-neutral-300 text-accent-primary focus:ring-accent-soft"
                        />
                        <span class="text-sm text-secondary">I don't have a logo yet (we can help create one)</span>
                      </label>

                      <!-- Upload Area -->
                      <div
                        v-if="!formData.noLogo"
                        @dragover.prevent="logoDropping = true"
                        @dragleave.prevent="logoDropping = false"
                        @drop.prevent="handleLogoDrop"
                        :class="[
                          'relative rounded-2xl border-2 border-dashed transition-all',
                          logoDropping
                            ? 'border-accent-primary bg-accent-subtle/50'
                            : 'border-neutral-200 bg-neutral-50/50 hover:border-accent-soft hover:bg-accent-subtle/20'
                        ]"
                      >
                        <input
                          ref="logoInput"
                          type="file"
                          accept="image/*"
                          @change="handleLogoSelect"
                          class="hidden"
                        />
                        
                        <!-- Upload Prompt -->
                        <div v-if="!uploadedLogo" class="flex flex-col items-center justify-center px-6 py-12 text-center">
                          <div class="rounded-full bg-accent-subtle p-4 mb-4">
                            <svg class="h-8 w-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p class="text-sm font-medium text-primary mb-1">Drop your logo here, or click to browse</p>
                          <p class="text-xs text-secondary mb-4">PNG, JPG, SVG up to 10MB</p>
                          <button
                            type="button"
                            @click="$refs.logoInput.click()"
                            class="inline-flex items-center gap-2 rounded-full bg-accent-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent-focus"
                          >
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Choose file
                          </button>
                        </div>

                        <!-- Logo Preview -->
                        <div v-else class="relative p-6">
                          <div class="flex items-center gap-4">
                            <div class="flex-shrink-0 h-20 w-20 rounded-xl border border-neutral-200 bg-white p-2 flex items-center justify-center overflow-hidden">
                              <img :src="uploadedLogo.preview" :alt="uploadedLogo.name" class="max-h-full max-w-full object-contain" />
                            </div>
                            <div class="flex-1 min-w-0">
                              <p class="text-sm font-medium text-primary truncate">{{ uploadedLogo.name }}</p>
                              <p class="text-xs text-secondary mt-1">{{ formatFileSize(uploadedLogo.size) }}</p>
                            </div>
                            <button
                              type="button"
                              @click="removeLogo"
                              class="flex-shrink-0 rounded-full p-2 text-secondary hover:bg-red-50 hover:text-red-600 transition"
                            >
                              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Additional Assets -->
                  <div>
                    <label class="mb-3 block text-sm font-medium text-primary">Brand assets (optional)</label>
                    <p class="text-xs text-secondary mb-3">Upload any brand guidelines, color palettes, fonts, or reference images</p>
                    
                    <div
                      @dragover.prevent="assetsDropping = true"
                      @dragleave.prevent="assetsDropping = false"
                      @drop.prevent="handleAssetsDrop"
                      :class="[
                        'relative rounded-2xl border-2 border-dashed transition-all',
                        assetsDropping
                          ? 'border-accent-primary bg-accent-subtle/50'
                          : 'border-neutral-200 bg-neutral-50/50 hover:border-accent-soft hover:bg-accent-subtle/20'
                      ]"
                    >
                      <input
                        ref="assetsInput"
                        type="file"
                        accept="image/*,.pdf,.doc,.docx"
                        multiple
                        @change="handleAssetsSelect"
                        class="hidden"
                      />
                      
                      <div class="flex flex-col items-center justify-center px-6 py-8 text-center">
                        <div class="rounded-full bg-neutral-100 p-3 mb-3">
                          <svg class="h-6 w-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p class="text-xs text-secondary mb-3">Drop files here or click to browse</p>
                        <button
                          type="button"
                          @click="$refs.assetsInput.click()"
                          class="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-semibold text-primary transition hover:bg-neutral-50"
                        >
                          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                          Add files
                        </button>
                      </div>
                    </div>

                    <!-- Assets List -->
                    <div v-if="uploadedAssets.length" class="mt-4 space-y-2">
                      <div
                        v-for="(asset, index) in uploadedAssets"
                        :key="index"
                        class="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3"
                      >
                        <div class="flex-shrink-0 rounded-lg bg-neutral-50 p-2">
                          <svg class="h-5 w-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-primary truncate">{{ asset.name }}</p>
                          <p class="text-xs text-secondary">{{ formatFileSize(asset.size) }}</p>
                        </div>
                        <button
                          type="button"
                          @click="removeAsset(index)"
                          class="flex-shrink-0 rounded-full p-1.5 text-secondary hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      @click="prevStep"
                      class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="inline-flex items-center justify-center rounded-full bg-accent-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-focus disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span v-if="isSubmitting">Saving…</span>
                      <span v-else>Complete onboarding</span>
                    </button>
                  </div>
                </form>
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
                <div v-if="submissionResult" class="mt-5 rounded-2xl border border-neutral-200 bg-white p-4 text-xs text-secondary">
                  <p class="text-sm font-semibold text-primary">Quick recap</p>
                  <dl class="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt class="font-medium text-primary">Site type</dt>
                      <dd>{{ submissionResult.siteType || 'Not provided' }}</dd>
                    </div>
                    <div>
                      <dt class="font-medium text-primary">Primary goal</dt>
                      <dd>{{ submissionResult.primaryGoal || 'Not provided' }}</dd>
                    </div>
                    <div>
                      <dt class="font-medium text-primary">Contact</dt>
                      <dd>{{ submissionResult.businessEmail }}</dd>
                    </div>
                    <div>
                      <dt class="font-medium text-primary">Services</dt>
                      <dd>{{ submissionResult.selectedServices?.length ? submissionResult.selectedServices.join(', ') : 'Not provided' }}</dd>
                    </div>
                  </dl>
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
import { computed, ref, watch } from 'vue'
import FormSelect from '~/components/FormSelect.vue'
import ServiceAreaPicker from '~/components/ServiceAreaPicker.vue'

useHead({
  title: 'Onboarding - Hinn',
  meta: [
    { name: 'description', content: 'Complete your onboarding to get started' }
  ]
})

const currentStep = ref(1)

// Custom service input
const customService = ref('')

// File upload state
const logoInput = ref(null)
const assetsInput = ref(null)
const uploadedLogo = ref(null)
const uploadedAssets = ref([])
const logoDropping = ref(false)
const assetsDropping = ref(false)

// Website URL analysis state
const hasCurrent = ref(null)
const currentUrl = ref('')
const searching = ref(false)
const siteSummary = ref(null)
const siteError = ref(null)
const siteNotFound = ref(false)
const siteAdded = ref(false)
const skipped = ref(false)
const searchProgress = ref(0)
const searchLogs = ref([])
const searchedPreview = ref([])
const showSources = ref(false)

const onboardingSeed = ref({
  name: '',
  cities: [],
  hasLogo: false,
  category: '',
  siteType: '',
  languages: [],
  primaryLanguage: '',
  selectedServices: [],
  businessEmail: '',
  businessPhone: '',
  contactMethod: '',
  primaryGoal: '',
  coverageType: '',
  onSiteMode: '',
  businessHoursMode: '',
  designStyles: [],
  highContrast: false,
  emotionalImpact: [],
  envisionedPages: [],
  noLogo: false
})

// Fetch user location via IP on mount
const fetchUserLocation = async () => {
  try {
    // Using ipapi.co free API (no key required, 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/')
    if (!response.ok) throw new Error('Failed to fetch location')
    
    const data = await response.json()
    
    if (data.city && data.latitude && data.longitude) {
      const locationName = [data.city, data.region, data.country_name].filter(Boolean).join(', ')
      
      onboardingSeed.value.cities = [
        {
          lat: data.latitude,
          lon: data.longitude,
          name: locationName,
          radiusKm: 10,
          displayName: locationName
        }
      ]
    }
  } catch (error) {
    console.warn('Could not detect location:', error)
    // Fallback to empty - user can add manually
  }
}

// Fetch location when component mounts
if (process.client) {
  fetchUserLocation()
}

const stepSummaries = [
  {
    id: 'type',
    title: 'Site type',
    headline: 'We\'ll tailor the structure and CMS to match your model.',
    description: 'Choose the closest fit so we can recommend the right feature set.',
    icon: 'layout'
  },
  {
    id: 'business',
    title: 'Business basics',
    headline: 'Share your company name and industry.',
    description: 'Tell us about your business.',
    icon: 'clipboard'
  },
  {
    id: 'website',
    title: 'Existing website',
    headline: 'Do you have a current website?',
    description: 'We can analyze your existing site to better understand your needs.',
    icon: 'globe'
  },
  {
    id: 'services',
    title: 'Services & coverage',
    headline: 'What you offer and where you operate.',
    description: 'Define your service offerings and locations.',
    icon: 'clipboard'
  },
  {
    id: 'operations',
    title: 'Operations',
    headline: 'How you work and your goals.',
    description: 'Share your hours, delivery mode, and objectives.',
    icon: 'clipboard'
  },
  {
    id: 'design',
    title: 'Brand & style',
    headline: 'Capture the visual direction that feels right.',
    description: 'Tell us how it should look, feel, and sound.',
    icon: 'palette'
  },
  {
    id: 'assets',
    title: 'Logo & assets',
    headline: 'Share your brand materials.',
    description: 'Upload your logo and any brand assets.',
    icon: 'upload'
  }
]

const totalSteps = stepSummaries.length

const formData = ref({
  siteType: '',
  businessName: '',
  category: '',
  description: '',
  businessEmail: '',
  businessPhone: '',
  contactMethod: '',
  selectedServices: [],
  serviceAreas: [],
  coverageType: '',
  onSiteMode: '',
  businessHoursMode: '',
  primaryGoal: '',
  languages: [],
  primaryLanguage: '',
  hasLogo: null,
  highContrast: false,
  brandColors: '',
  colorTheme: '',
  inspirationSites: '',
  additionalNotes: '',
  designStyles: [],
  emotionalImpact: []
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
  'Transportation',
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

const designStyles = ['Clean & simple', 'Bold & bright', 'Elegant & classic', 'Playful & friendly']

const contactMethods = [
  { label: 'Email', value: 'email' },
  { label: 'Phone call', value: 'phone' },
  { label: 'Text message', value: 'text' },
  { label: 'Video call', value: 'video' }
]

const servicesByIndustry = {
  'Transportation': ['Vehicle transport', 'Freight', 'Courier', 'Logistics planning', 'Warehousing', 'Moving services'],
  'Restaurants': ['Dine-in', 'Takeout', 'Delivery', 'Catering', 'Private events', 'Meal prep'],
  'Retail': ['In-store shopping', 'Online orders', 'Curbside pickup', 'Personal shopping', 'Gift services', 'Repairs'],
  'Health & Wellness': ['Consultations', 'Treatments', 'Therapy', 'Fitness training', 'Nutrition coaching', 'Wellness programs'],
  'Professional Services': ['Consulting', 'Legal services', 'Accounting', 'Marketing', 'Design', 'Strategy'],
  'Home Services': ['Cleaning', 'Repairs', 'Maintenance', 'Landscaping', 'Renovation', 'Installation'],
  'Technology': ['Software development', 'IT support', 'Cloud services', 'Cybersecurity', 'Training', 'Consulting'],
  'Education': ['Tutoring', 'Classes', 'Workshops', 'Online courses', 'Certification', 'Training programs'],
  'Entertainment': ['Events', 'Performances', 'Rentals', 'Production', 'Photography', 'Videography'],
  'Other': ['Consulting', 'Custom services', 'Project-based work', 'Subscription services', 'Rentals', 'Support']
}

const serviceOptions = computed(() => {
  const category = formData.value.category
  return category && servicesByIndustry[category] ? servicesByIndustry[category] : servicesByIndustry['Other']
})

const coverageOptions = [
  { label: 'Single location', value: 'single' },
  { label: 'Multiple locations', value: 'multi' }
]

const onSiteModes = [
  { label: 'On-site', value: 'onsite' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' }
]

const hoursOptions = [
  { label: 'Standard (Mon–Fri)', value: 'standard' },
  { label: 'Extended (Mon–Sat)', value: 'extended' },
  { label: '24/7 availability', value: 'always' },
  { label: 'Weekends only', value: 'weekends' },
  { label: 'By appointment', value: 'appointment' },
  { label: 'Seasonal or custom', value: 'custom' }
]

const goalOptions = [
  'Sell more products or services',
  'Book more appointments',
  'Get more inquiries',
  'Share updates or content',
  'Something else'
]

const languageOptions = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Other']

const primaryLanguageOptions = languageOptions

const logoOptions = [
  { label: 'Yes, we have one', value: 'yes' },
  { label: 'Not yet, need help', value: 'no' }
]

const emotionalOptions = ['Friendly', 'Energetic', 'Trustworthy', 'Calm']

const colorThemes = [
  { value: 'ocean', label: 'Ocean blues', swatches: ['#1D4ED8', '#3B82F6', '#93C5FD'] },
  { value: 'sunrise', label: 'Sunrise glow', swatches: ['#BE123C', '#F97316', '#FACC15'] },
  { value: 'fresh', label: 'Fresh greens', swatches: ['#047857', '#10B981', '#6EE7B7'] },
  { value: 'slate', label: 'Slate neutrals', swatches: ['#0F172A', '#475569', '#E2E8F0'] }
]

const milestones = [
  'Kickoff call within two business days',
  'Design alignment and sitemap within week one',
  'First build handoff with review links in week two',
  'Iterate and launch with analytics baseline in week three'
]

const mapCityToArea = city => ({
  placeId: city.displayName || city.name,
  name: city.name,
  displayName: city.displayName || city.name,
  lat: city.lat,
  lon: city.lon,
  radiusKm: city.radiusKm || 10
})

const seedAreaSuggestions = computed(() => (onboardingSeed.value.cities || []).map(mapCityToArea))

const availableSeedAreas = computed(() =>
  seedAreaSuggestions.value.filter(area => {
    const key = area.placeId || area.name
    return !formData.value.serviceAreas.some(current => (current.placeId || current.name) === key)
  })
)

const toggleArrayValue = (array, value) => {
  const next = array.slice()
  const index = next.indexOf(value)
  if (index > -1) {
    next.splice(index, 1)
  } else {
    next.push(value)
  }
  return next
}

const toggleService = service => {
  formData.value.selectedServices = toggleArrayValue(formData.value.selectedServices, service)
}

const addCustomService = () => {
  const service = customService.value.trim()
  if (!service) return
  
  // Check if service already exists (case-insensitive)
  const exists = formData.value.selectedServices.some(
    s => s.toLowerCase() === service.toLowerCase()
  )
  
  if (!exists) {
    formData.value.selectedServices.push(service)
  }
  
  // Clear input
  customService.value = ''
}

const removeService = (index) => {
  formData.value.selectedServices.splice(index, 1)
}

const toggleLanguage = language => {
  formData.value.languages = toggleArrayValue(formData.value.languages, language)
}

const toggleDesignStyle = style => {
  formData.value.designStyles = toggleArrayValue(formData.value.designStyles, style)
}

const toggleEmotion = tone => {
  formData.value.emotionalImpact = toggleArrayValue(formData.value.emotionalImpact, tone)
}

const addServiceArea = area => {
  if (!area) return
  const key = area.placeId || area.name
  const exists = formData.value.serviceAreas.some(current => (current.placeId || current.name) === key)
  if (!exists) {
    formData.value.serviceAreas = [...formData.value.serviceAreas, { ...area }]
  }
}

const useSeedArea = area => {
  addServiceArea(area)
}

const useAllSeedAreas = () => {
  availableSeedAreas.value.forEach(area => addServiceArea(area))
}

// File upload handlers
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const handleLogoSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processLogoFile(file)
  }
}

const handleLogoDrop = (event) => {
  logoDropping.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processLogoFile(file)
  }
}

const processLogoFile = (file) => {
  if (file.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB')
    return
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    uploadedLogo.value = {
      file,
      name: file.name,
      size: file.size,
      preview: e.target.result
    }
  }
  reader.readAsDataURL(file)
}

const removeLogo = () => {
  uploadedLogo.value = null
  if (logoInput.value) {
    logoInput.value.value = ''
  }
}

const handleAssetsSelect = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => processAssetFile(file))
}

const handleAssetsDrop = (event) => {
  assetsDropping.value = false
  const files = Array.from(event.dataTransfer.files)
  files.forEach(file => processAssetFile(file))
}

const processAssetFile = (file) => {
  if (file.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB')
    return
  }
  
  uploadedAssets.value.push({
    file,
    name: file.name,
    size: file.size
  })
}

const removeAsset = (index) => {
  uploadedAssets.value.splice(index, 1)
}

// Website URL analysis
const analyzeWebsite = async () => {
  if (!currentUrl.value) return
  
  siteError.value = null
  siteSummary.value = null
  searching.value = true
  siteNotFound.value = false
  siteAdded.value = false
  skipped.value = false
  searchProgress.value = 0
  searchLogs.value = []
  searchedPreview.value = []
  showSources.value = false
  
  // Simulate progress
  const messages = [
    'Searching website',
    'Crawling pages',
    'Extracting content',
    'Analyzing structure',
    'Processing information',
    'Generating summary'
  ]
  
  const progressInterval = setInterval(() => {
    if (searchProgress.value < 90) {
      searchProgress.value += 10
      const logIndex = Math.floor((searchProgress.value / 100) * messages.length)
      if (logIndex < messages.length && !searchLogs.value.includes(messages[logIndex])) {
        searchLogs.value.push(messages[logIndex])
      }
    }
  }, 500)
  
  try {
    const response = await fetch('/api/onboarding/analyze-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: currentUrl.value })
    })
    
    if (!response.ok) {
      let errorMessage = 'Analysis failed'
      try {
        const errorData = await response.json()
        errorMessage = errorData?.statusMessage || errorData?.message || errorData?.error || errorMessage
      } catch (e) {
        errorMessage = `Server error: ${response.status} ${response.statusText}`
      }
      throw new Error(errorMessage)
    }
    
    const data = await response.json()
    
    if (data.summary) {
      siteSummary.value = data
      siteAdded.value = true
      searchProgress.value = 100
    } else if (data.error) {
      throw new Error(data.error)
    } else {
      siteNotFound.value = true
    }
  } catch (error) {
    console.error('Website analysis error:', error)
    siteError.value = String(error?.message || error || 'Failed to analyze website')
  } finally {
    clearInterval(progressInterval)
    searching.value = false
    searchProgress.value = 100
  }
}

watch(
  () => formData.value.languages,
  newLanguages => {
    if (!newLanguages.length) {
      formData.value.primaryLanguage = ''
      return
    }

    if (!newLanguages.includes(formData.value.primaryLanguage)) {
      formData.value.primaryLanguage = newLanguages[0]
    }
  },
  { deep: true }
)

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

const submissionErrors = ref([])
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submissionResult = ref(null)

const requiredFields = [
  { key: 'siteType', label: 'Site type' },
  { key: 'businessName', label: 'Business or project name' },
  { key: 'businessEmail', label: 'Business email' },
  { key: 'contactMethod', label: 'Preferred contact method' },
  { key: 'primaryGoal', label: 'Primary goal' }
]

const handleSubmit = async () => {
  submissionErrors.value = []

  const missing = requiredFields.filter(field => {
    const value = formData.value[field.key]
    return value === '' || value === null || value === undefined
  })

  if (missing.length) {
    submissionErrors.value = missing.map(field => `${field.label} is required.`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 400))
  submissionResult.value = JSON.parse(JSON.stringify(formData.value))
  isSubmitting.value = false
  isSubmitted.value = true
  console.log('Onboarding submission:', submissionResult.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(currentStep, step => {
  if (step !== totalSteps) {
    submissionErrors.value = []
  }
})
</script>
