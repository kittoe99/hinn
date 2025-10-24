<template>
  <div class="min-h-screen bg-white">
    <div class="mx-auto max-w-3xl px-4 py-16">
      <header class="text-center mb-12">
        <h1 class="text-3xl font-bold text-neutral-900">Website Onboarding</h1>
        <p class="mt-3 text-base text-neutral-600">Help us understand your needs so we can build the perfect website for you</p>
      </header>

      <!-- Progress Indicator -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-medium text-neutral-900">Step {{ currentStep }} of {{ totalSteps }}</span>
          <span class="text-sm text-neutral-600">{{ Math.round((currentStep / totalSteps) * 100) }}% complete</span>
        </div>
        <div class="h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div class="h-full bg-neutral-900 transition-all duration-300" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
        </div>
      </div>

      <!-- Step Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-neutral-900">{{ stepSummaries[currentStep - 1].title }}</h2>
        <p class="mt-2 text-base text-neutral-600">{{ stepSummaries[currentStep - 1].headline }}</p>
      </div>

      <div class="space-y-6">
        <!-- Step 1 -->
        <div v-if="currentStep === 1" class="space-y-6">
              <!-- Validation Error Banner -->
              <div v-if="showValidation && Object.keys(validationErrors).length > 0" class="rounded-lg border border-red-200 bg-red-50 p-4">
                <div class="flex items-start gap-3">
                  <svg class="h-5 w-5 flex-shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-red-800">Please complete all required fields</p>
                    <p class="mt-1 text-xs text-red-700">Fields marked with * are required to continue.</p>
                  </div>
                </div>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 class="text-lg font-semibold text-neutral-900">What type of site do you need? *</h3>
                <p class="mt-2 text-sm text-neutral-600">Choose the option that best describes your project.</p>

                <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <button
                    v-for="type in siteTypes"
                    :key="type"
                    type="button"
                    @click="formData.siteType = type; validationErrors.siteType = false"
                    :class="[
                      'flex h-full flex-col justify-center rounded-lg border-2 p-4 text-left transition',
                      formData.siteType === type
                        ? 'border-neutral-900 bg-neutral-50'
                        : validationErrors.siteType
                        ? 'border-red-300 bg-red-50 hover:border-red-400'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    ]"
                  >
                    <span class="text-sm font-semibold text-neutral-900">{{ type }}</span>
                  </button>
                </div>
                <p v-if="validationErrors.siteType" class="mt-2 text-xs text-red-600">Please select a site type</p>

                <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p class="text-xs text-neutral-500">Not sure? Pick the closest fit—we'll refine together.</p>
                  <button
                    type="button"
                    @click="nextStep"
                    :disabled="!formData.siteType"
                    class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 2: Business Basics -->
            <div v-if="currentStep === 2" class="space-y-6">
              <!-- Validation Error Banner -->
              <div v-if="showValidation && Object.keys(validationErrors).length > 0" class="rounded-lg border border-red-200 bg-red-50 p-4">
                <div class="flex items-start gap-3">
                  <svg class="h-5 w-5 flex-shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-red-800">Please complete all required fields</p>
                    <p class="mt-1 text-xs text-red-700">Fields marked with * are required to continue.</p>
                  </div>
                </div>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 class="text-lg font-semibold text-neutral-900">Business basics</h3>
                <p class="mt-1 text-sm text-secondary">Tell us about your company and how we can reach you.</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Business/Project Name *</label>
                      <input
                        v-model="formData.businessName"
                        type="text"
                        required
                        @input="validationErrors.businessName = false"
                        :class="[
                          'w-full rounded-xl border px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2',
                          validationErrors.businessName
                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200'
                            : 'border-neutral-200 bg-white focus:border-neutral-400 focus:ring-0'
                        ]"
                        placeholder="Your company or product name"
                      />
                      <p v-if="validationErrors.businessName" class="mt-1 text-xs text-red-600">Business name is required</p>
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Industry/Category *</label>
                      <FormSelect v-model="formData.category" :options="categories" placeholder="Select a category" required />
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Business Email *</label>
                      <input
                        v-model="formData.businessEmail"
                        type="email"
                        required
                        @input="validationErrors.businessEmail = false"
                        :class="[
                          'w-full rounded-xl border px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2',
                          validationErrors.businessEmail
                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200'
                            : 'border-neutral-200 bg-white focus:border-neutral-400 focus:ring-0'
                        ]"
                        placeholder="you@company.com"
                      />
                      <p v-if="validationErrors.businessEmail" class="mt-1 text-xs text-red-600">Business email is required</p>
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Business Phone</label>
                      <input
                        v-model="formData.businessPhone"
                        type="tel"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:border-neutral-400 focus:outline-none focus:ring-0"
                        placeholder="(000) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-neutral-900">Preferred contact method *</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <button
                        v-for="method in contactMethods"
                        :key="method.value"
                        type="button"
                        @click="formData.contactMethod = method.value"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm font-medium transition',
                          formData.contactMethod === method.value
                            ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                        ]"
                      >
                        {{ method.label }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-neutral-900">Describe what you offer *</label>
                    <div class="space-y-3">
                      <textarea
                        v-model="formData.description"
                        rows="4"
                        required
                        @input="validationErrors.description = false"
                        :class="[
                          'w-full rounded-xl border px-4 py-3 text-sm text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-neutral-300',
                          validationErrors.description
                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200'
                            : 'border-neutral-200 bg-white focus:border-neutral-400 focus:ring-0'
                        ]"
                        placeholder="Share your core services, audience, and goals"
                      />
                      <p v-if="validationErrors.description" class="mt-1 text-xs text-red-600">Description is required</p>
                      <div class="flex items-center gap-3">
                        <button
                          type="button"
                          @click="enhanceDescription"
                          :disabled="!formData.description.trim() || isEnhancing"
                          class="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <svg v-if="!isEnhancing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 22.5l-.394-1.933a2.25 2.25 0 00-1.423-1.423L12.75 18.75l1.933-.394a2.25 2.25 0 001.423-1.423l.394-1.933.394 1.933a2.25 2.25 0 001.423 1.423l1.933.394-1.933.394a2.25 2.25 0 00-1.423 1.423z" />
                          </svg>
                          <svg v-else class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{{ isEnhancing ? 'Enhancing...' : 'Enhance with AI' }}</span>
                        </button>
                        <p v-if="enhanceError" class="text-sm text-red-500">{{ enhanceError }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      @click="prevStep"
                      class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Step 3: Existing Website -->
            <div v-if="currentStep === 3" class="space-y-6">
              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 class="text-lg font-semibold text-neutral-900">Existing website</h3>
                <p class="mt-1 text-sm text-secondary">Do you have a current website we can analyze?</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  <div>
                    <label class="block text-sm font-medium text-neutral-900 mb-3">Do you have a current website?</label>
                    <div class="flex gap-3">
                      <button
                        v-for="option in [{value: 'yes', label: 'Yes'}, {value: 'no', label: 'No'}]"
                        :key="option.value"
                        type="button"
                        @click="formData.hasCurrentWebsite = option.value; hasCurrent = option.value"
                        :class="[
                          'rounded-2xl border px-6 py-3 text-sm font-medium transition',
                          formData.hasCurrentWebsite === option.value
                            ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                        ]"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>

                  <div v-if="formData.hasCurrentWebsite === 'yes'" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-neutral-900 mb-2">Website URL or domain</label>
                      <input
                        v-model="formData.currentWebsiteUrl"
                        :disabled="searching"
                        type="text"
                        placeholder="example.com or https://example.com"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-neutral-400 focus:outline-none focus:ring-0 disabled:opacity-60"
                        @input="currentUrl = formData.currentWebsiteUrl"
                      />
                    </div>

                    <div class="flex items-center gap-3">
                      <button
                        type="button"
                        @click="analyzeWebsite"
                        :disabled="!formData.currentWebsiteUrl || searching"
                        class="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {{ searching ? 'Analyzing…' : 'Analyze site' }}
                      </button>
                      <button
                        type="button"
                        @click="formData.websiteSkipped = true; skipped = true; siteAdded = false; siteSummary = null; siteError = null"
                        class="text-sm text-blue-700 hover:text-blue-800 hover:underline"
                      >
                        Skip
                      </button>
                    </div>

                    <!-- Progress indicator -->
                    <div v-if="searching" class="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <div class="text-sm font-medium text-neutral-900 mb-2">Analyzing your website…</div>
                      <div class="h-2 w-full rounded-full bg-neutral-100">
                        <div class="h-2 rounded-full bg-blue-600 transition-all duration-300" :style="{ width: `${searchProgress}%` }" />
                      </div>
                      <ul class="mt-3 space-y-1 text-xs text-neutral-600">
                        <li v-for="(log, idx) in searchLogs" :key="idx" class="flex items-center gap-2">
                          <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                          {{ log }}
                        </li>
                      </ul>
                    </div>

                    <!-- Error message -->
                    <div v-if="siteError" class="text-sm text-red-600">{{ siteError }}</div>
                    <div v-if="siteNotFound" class="text-sm text-neutral-600">No info found. You can skip or add details manually.</div>

                    <!-- Summary -->
                    <div v-if="siteSummary?.summary && !searching" class="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm">
                      <div class="text-sm font-medium text-neutral-900 mb-2">Summary</div>
                      <div class="text-sm text-neutral-600 whitespace-pre-wrap">{{ siteSummary.summary }}</div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      @click="prevStep"
                      class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      :disabled="formData.hasCurrentWebsite === 'yes' && !siteAdded && !formData.websiteSkipped"
                      class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Step 4: Services & Coverage -->
            <div v-if="currentStep === 4" class="space-y-6">
              <!-- Validation Error Banner -->
              <div v-if="showValidation && Object.keys(validationErrors).length > 0" class="rounded-lg border border-red-200 bg-red-50 p-4">
                <div class="flex items-start gap-3">
                  <svg class="h-5 w-5 flex-shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-red-800">Please complete all required fields</p>
                    <p class="mt-1 text-xs text-red-700">Fields marked with * are required to continue.</p>
                  </div>
                </div>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 class="text-lg font-semibold text-neutral-900">Services & coverage</h3>
                <p class="mt-1 text-sm text-secondary">What services do you offer and where?</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-neutral-900">Services you provide</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <button
                        v-for="service in serviceOptions"
                        :key="service"
                        type="button"
                        @click="toggleService(service)"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm transition',
                          formData.selectedServices.includes(service)
                            ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                        ]"
                      >
                        {{ service }}
                      </button>
                    </div>

                    <!-- Custom service input -->
                    <div class="mt-4">
                      <label class="mb-2 block text-xs font-medium text-neutral-600">Add custom service</label>
                      <div class="flex gap-2">
                        <input
                          v-model="customService"
                          type="text"
                          placeholder="e.g., Custom consulting"
                          class="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 shadow-inner focus:border-neutral-400 focus:outline-none focus:ring-0"
                          @keydown.enter.prevent="addCustomService"
                        />
                        <button
                          type="button"
                          @click="addCustomService"
                          :disabled="!customService.trim()"
                          class="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        :class="['inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm', chipColorClasses[index % chipColorClasses.length]]"
                      >
                        <span>{{ service }}</span>
                        <button
                          type="button"
                          @click="removeService(index)"
                          class="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-neutral-900 hover:text-white transition"
                        >
                          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-neutral-900">Service areas</label>
                    <ServiceAreaPicker v-model="formData.serviceAreas" />
                    <div
                      v-if="availableSeedAreas.length"
                      class="mt-3 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-4 text-xs text-neutral-700"
                    >
                      <p class="text-sm font-semibold text-neutral-900">Detected location</p>
                      <p class="mt-1">We detected your location. Click to add it as a service area.</p>
                      <div class="mt-3 flex flex-wrap gap-2">
                        <button
                          v-for="area in availableSeedAreas"
                          :key="area.placeId || area.name"
                          type="button"
                          class="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                          @click="useSeedArea(area)"
                        >
                          Add {{ area.displayName || area.name }}
                        </button>
                        <button
                          v-if="availableSeedAreas.length > 1"
                          type="button"
                          class="rounded-full border border-transparent bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-neutral-800"
                          @click="useAllSeedAreas"
                        >
                          Add all
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Coverage type</label>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          v-for="option in coverageOptions"
                          :key="option.value"
                          type="button"
                          @click="formData.coverageType = option.value"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.coverageType === option.value
                              ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                          ]"
                        >
                          {{ option.label }}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Service delivery *</label>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          v-for="option in onSiteModes"
                          :key="option.value"
                          type="button"
                          @click="formData.onSiteMode = option.value; validationErrors.onSiteMode = false"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.onSiteMode === option.value
                              ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                              : validationErrors.onSiteMode
                              ? 'border-red-300 bg-red-50 hover:border-red-400'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                          ]"
                        >
                          {{ option.label }}
                        </button>
                      </div>
                      <p v-if="validationErrors.onSiteMode" class="mt-2 text-xs text-red-600">Please select a service delivery mode</p>
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      @click="prevStep"
                      class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Step 5: Operations -->
            <div v-if="currentStep === 5" class="space-y-6">
              <!-- Validation Error Banner -->
              <div v-if="showValidation && Object.keys(validationErrors).length > 0" class="rounded-lg border border-red-200 bg-red-50 p-4">
                <div class="flex items-start gap-3">
                  <svg class="h-5 w-5 flex-shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-red-800">Please complete all required fields</p>
                    <p class="mt-1 text-xs text-red-700">Fields marked with * are required to continue.</p>
                  </div>
                </div>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 class="text-lg font-semibold text-neutral-900">Operations</h3>
                <p class="mt-1 text-sm text-secondary">Tell us about your hours, goals, and language preferences.</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Business hours *</label>
                      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <button
                          v-for="option in hoursOptions"
                          :key="option.value"
                          type="button"
                          @click="formData.businessHoursMode = option.value; validationErrors.businessHoursMode = false"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.businessHoursMode === option.value
                              ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                              : validationErrors.businessHoursMode
                              ? 'border-red-300 bg-red-50 hover:border-red-400'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                          ]"
                        >
                          {{ option.label }}
                        </button>
                      </div>
                      <p v-if="validationErrors.businessHoursMode" class="mt-2 text-xs text-red-600">Please select business hours</p>
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Primary goal *</label>
                      <FormSelect
                        v-model="formData.primaryGoal"
                        :options="goalOptions"
                        placeholder="Select a goal"
                        required
                        @update:modelValue="validationErrors.primaryGoal = false"
                      />
                      <p v-if="validationErrors.primaryGoal" class="mt-1 text-xs text-red-600">Please select a primary goal</p>
                    </div>
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-neutral-900">Languages your site needs</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <button
                        v-for="language in languageOptions"
                        :key="language"
                        type="button"
                        @click="toggleLanguage(language)"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm transition',
                          formData.languages.includes(language)
                            ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                        ]"
                      >
                        {{ language }}
                      </button>
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Primary language</label>
                      <FormSelect
                        v-model="formData.primaryLanguage"
                        :options="primaryLanguageOptions"
                        placeholder="Choose a primary language"
                      />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Logo availability</label>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          v-for="option in logoOptions"
                          :key="option.value"
                          type="button"
                          @click="formData.hasLogo = option.value === 'yes'"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.hasLogo === (option.value === 'yes')
                              ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
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
                      class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Step 6: Design -->
            <div v-if="currentStep === 6" class="space-y-6">
              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 class="text-lg font-semibold text-neutral-900">Share the look and feel</h3>
                <p class="mt-1 text-sm text-secondary">Choose the options that feel closest—we'll fine-tune the details together.</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-neutral-900">Overall look</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <button
                        v-for="style in designStyles"
                        :key="style"
                        type="button"
                        @click="toggleDesignStyle(style)"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm transition',
                          formData.designStyles.includes(style)
                            ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                        ]"
                      >
                        {{ style }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-neutral-900">Mood</label>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <button
                        v-for="tone in emotionalOptions"
                        :key="tone"
                        type="button"
                        @click="toggleEmotion(tone)"
                        :class="[
                          'rounded-2xl border px-4 py-2 text-sm transition',
                          formData.emotionalImpact.includes(tone)
                            ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                        ]"
                      >
                        {{ tone }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-neutral-900">Color theme</label>
                    <p class="text-xs text-neutral-600">Pick a starting palette—we can adjust or add brand colors later.</p>
                    <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        v-for="theme in colorThemes"
                        :key="theme.value"
                        type="button"
                        @click="formData.colorTheme = theme.value"
                        :class="[
                          'flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition',
                          formData.colorTheme === theme.value
                            ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
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
                          class="h-4 w-4 text-neutral-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Text contrast</label>
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          @click="formData.highContrast = false"
                          :class="[
                            'rounded-2xl border px-4 py-2 text-sm transition',
                            formData.highContrast === false
                              ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
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
                              ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                          ]"
                        >
                          High contrast
                        </button>
                      </div>
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Extra color notes (optional)</label>
                      <input
                        v-model="formData.brandColors"
                        type="text"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-neutral-400 focus:outline-none focus:ring-0"
                        placeholder="Share any specific colors or hex codes"
                      />
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Websites you like</label>
                      <textarea
                        v-model="formData.inspirationSites"
                        rows="2"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-neutral-400 focus:outline-none focus:ring-0"
                        placeholder="Add any links that inspire you"
                      />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-900">Anything else we should know?</label>
                      <textarea
                        v-model="formData.additionalNotes"
                        rows="2"
                        class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-inner focus:border-neutral-400 focus:outline-none focus:ring-0"
                        placeholder="Special requests, must-have sections, or questions"
                      />
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      @click="prevStep"
                      class="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Step 7: Logo & Assets -->
            <div v-if="currentStep === 7" class="space-y-6">
              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 class="text-lg font-semibold text-neutral-900">Logo & brand assets</h3>
                <p class="mt-1 text-sm text-secondary">Upload your logo and any brand materials you'd like us to use.</p>

                <form @submit.prevent="nextStep" class="mt-8 space-y-8">
                  
                  <!-- Logo Upload -->
                  <div>
                    <label class="mb-3 block text-sm font-medium text-neutral-900">Company logo</label>
                    <div class="space-y-4">
                      <!-- No Logo Option -->
                      <label class="flex items-center gap-3 cursor-pointer">
                        <input
                          v-model="formData.noLogo"
                          type="checkbox"
                          class="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-300"
                        />
                        <span class="text-sm text-neutral-600">I don't have a logo yet (we can help create one)</span>
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
                            ? 'border-neutral-900 bg-neutral-100'
                            : 'border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 hover:bg-neutral-100'
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
                          <div class="rounded-full bg-neutral-100 p-4 mb-4">
                            <svg class="h-8 w-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p class="text-sm font-medium text-primary mb-1">Drop your logo here, or click to browse</p>
                          <p class="text-xs text-secondary mb-4">PNG, JPG, SVG up to 10MB</p>
                          <button
                            type="button"
                            @click="$refs.logoInput.click()"
                            class="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
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
                          ? 'border-neutral-900 bg-neutral-100'
                          : 'border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 hover:bg-neutral-100'
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
                      class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>

            </div>

            <!-- Step 8: Review & Submit -->
            <div v-if="currentStep === 8" class="space-y-6">
              <!-- Success Message -->
              <div v-if="isSubmitted" class="rounded-3xl border border-green-200 bg-green-50 p-8 shadow-sm text-center">
                <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-green-900 mb-2">Onboarding Complete!</h3>
                <p class="text-sm text-green-800 mb-6">Your submission has been received successfully. We'll synthesize your inputs, share a first-week roadmap, and invite you to our collaboration hub.</p>
                <NuxtLink
                  to="/get-started"
                  class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
                >
                  Review subscription options
                  <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>

              <!-- Submission Error Banner -->
              <div v-if="!isSubmitted && submissionErrors.length > 0" class="rounded-2xl border border-red-200 bg-red-50 p-4">
                <div class="flex items-start gap-3">
                  <svg class="h-5 w-5 flex-shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-red-800">Cannot submit onboarding</p>
                    <ul class="mt-2 space-y-1 text-xs text-red-700">
                      <li v-for="(error, index) in submissionErrors" :key="index">• {{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div v-if="!isSubmitted" class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                <h3 class="text-lg font-semibold text-neutral-900">Review your information</h3>
                <p class="mt-1 text-sm text-secondary">Check everything below and make any final edits before submitting.</p>

                <div class="mt-8 space-y-6">
                  <!-- Site Type -->
                  <div class="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1">
                        <p class="text-xs font-medium uppercase tracking-wide text-secondary">Site Type</p>
                        <p class="mt-1 text-sm font-semibold text-primary">{{ formData.siteType || 'Not provided' }}</p>
                      </div>
                      <button
                        type="button"
                        @click="jumpTo(1)"
                        class="text-xs font-medium text-neutral-900 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <!-- Business Basics -->
                  <div class="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1 space-y-3">
                        <div>
                          <p class="text-xs font-medium uppercase tracking-wide text-secondary">Business Information</p>
                          <p class="mt-1 text-sm font-semibold text-primary">{{ formData.businessName || 'Not provided' }}</p>
                          <p class="text-sm text-secondary">{{ formData.category || 'No category' }}</p>
                        </div>
                        <div v-if="formData.description">
                          <p class="text-xs font-medium uppercase tracking-wide text-secondary">Description</p>
                          <p class="mt-1 text-sm text-secondary">{{ formData.description }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium uppercase tracking-wide text-secondary">Contact</p>
                          <p class="mt-1 text-sm text-secondary">{{ formData.businessEmail || 'No email' }}</p>
                          <p v-if="formData.businessPhone" class="text-sm text-secondary">{{ formData.businessPhone }}</p>
                          <p v-if="formData.contactMethod" class="text-sm text-secondary">Preferred: {{ formData.contactMethod }}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="jumpTo(2)"
                        class="text-xs font-medium text-neutral-900 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <!-- Existing Website -->
                  <div class="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1">
                        <p class="text-xs font-medium uppercase tracking-wide text-secondary">Existing Website</p>
                        <div class="mt-2 space-y-1 text-sm text-secondary">
                          <p v-if="formData.hasCurrentWebsite === 'yes'">
                            <span class="font-medium">URL:</span> {{ formData.currentWebsiteUrl || 'Not provided' }}
                          </p>
                          <p v-else-if="formData.hasCurrentWebsite === 'no'">
                            No existing website
                          </p>
                          <p v-else>Not specified</p>
                          <p v-if="formData.websiteSummary" class="mt-2 text-xs">{{ formData.websiteSummary }}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="jumpTo(3)"
                        class="text-xs font-medium text-neutral-900 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <!-- Services & Coverage -->
                  <div class="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1 space-y-3">
                        <div>
                          <p class="text-xs font-medium uppercase tracking-wide text-secondary">Services</p>
                          <p v-if="formData.selectedServices.length" class="mt-1 text-sm text-secondary">
                            {{ formData.selectedServices.join(', ') }}
                          </p>
                          <p v-else class="mt-1 text-sm text-secondary">No services selected</p>
                        </div>
                        <div v-if="formData.serviceAreas.length">
                          <p class="text-xs font-medium uppercase tracking-wide text-secondary">Service Areas</p>
                          <p class="mt-1 text-sm text-secondary">
                            {{ formData.serviceAreas.map(a => a.displayName || a.name).join(', ') }}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="jumpTo(4)"
                        class="text-xs font-medium text-neutral-900 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <!-- Operations -->
                  <div class="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1 space-y-2">
                        <p class="text-xs font-medium uppercase tracking-wide text-secondary">Operations</p>
                        <div class="grid gap-2 text-sm text-secondary sm:grid-cols-2">
                          <div v-if="formData.primaryGoal">
                            <span class="font-medium">Goal:</span> {{ formData.primaryGoal }}
                          </div>
                          <div v-if="formData.businessHoursMode">
                            <span class="font-medium">Hours:</span> {{ formData.businessHoursMode }}
                          </div>
                          <div v-if="formData.onSiteMode">
                            <span class="font-medium">Mode:</span> {{ formData.onSiteMode }}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="jumpTo(5)"
                        class="text-xs font-medium text-neutral-900 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <!-- Design Preferences -->
                  <div class="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1 space-y-2">
                        <p class="text-xs font-medium uppercase tracking-wide text-secondary">Design & Branding</p>
                        <div class="space-y-2 text-sm text-secondary">
                          <div v-if="formData.designStyles.length">
                            <span class="font-medium">Styles:</span> {{ formData.designStyles.join(', ') }}
                          </div>
                          <div v-if="formData.emotionalImpact.length">
                            <span class="font-medium">Tone:</span> {{ formData.emotionalImpact.join(', ') }}
                          </div>
                          <div v-if="formData.colorTheme">
                            <span class="font-medium">Color theme:</span> {{ formData.colorTheme }}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="jumpTo(6)"
                        class="text-xs font-medium text-neutral-900 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <!-- Logo & Assets -->
                  <div class="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1">
                        <p class="text-xs font-medium uppercase tracking-wide text-secondary">Logo & Assets</p>
                        <div class="mt-2 space-y-2 text-sm text-secondary">
                          <p v-if="uploadedLogo">Logo: {{ uploadedLogo.name }}</p>
                          <p v-else>No logo uploaded</p>
                          <p v-if="uploadedAssets.length">Additional assets: {{ uploadedAssets.length }} file(s)</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="jumpTo(7)"
                        class="text-xs font-medium text-neutral-900 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                    class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span v-if="isSubmitting">Submitting…</span>
                    <span v-else>Complete onboarding</span>
                  </button>
                </div>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getSupabaseClient } from '~/lib/supabaseClient'
import FormSelect from '~/components/FormSelect.vue'
import ServiceAreaPicker from '~/components/ServiceAreaPicker.vue'

// Check if embedded in iframe
const route = useRoute()
const isEmbedded = computed(() => route.query.embedded === 'true')

// Disable layout if embedded
definePageMeta({
  layout: false,
  middleware: ['auth']
})

useHead({
  title: 'Onboarding - Hinn',
  meta: [
    { name: 'description', content: 'Complete your onboarding to get started' }
  ]
})

// Subtle color palette for chips ("stickers") in selected services
const chipColorClasses = [
  'border border-blue-200 bg-blue-50 text-blue-700',
  'border border-amber-200 bg-amber-50 text-amber-700',
  'border border-emerald-200 bg-emerald-50 text-emerald-700',
  'border border-purple-200 bg-purple-50 text-purple-700'
]

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

// AI enhancement state
const isEnhancing = ref(false)
const enhanceError = ref('')

// Validation state
const validationErrors = ref({})
const showValidation = ref(false)

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
  },
  {
    id: 'review',
    title: 'Review & submit',
    headline: 'Review your information before submitting.',
    description: 'Check everything looks good and make any final edits.',
    icon: 'clipboard'
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
  hasCurrentWebsite: null,
  currentWebsiteUrl: '',
  websiteSummary: '',
  websiteSkipped: false,
  selectedServices: [],
  serviceAreas: [],
  coverageType: '',
  onSiteMode: '',
  businessHoursMode: '',
  primaryGoal: '',
  languages: [],
  primaryLanguage: '',
  hasLogo: null,
  noLogo: false,
  highContrast: false,
  brandColors: '',
  colorTheme: '',
  inspirationSites: '',
  additionalNotes: '',
  designStyles: [],
  emotionalImpact: [],
  envisionedPages: []
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
  if (!formData.value.currentWebsiteUrl) return
  
  currentUrl.value = formData.value.currentWebsiteUrl
  siteError.value = null
  siteSummary.value = null
  searching.value = true
  siteNotFound.value = false
  siteAdded.value = false
  formData.value.websiteSkipped = false
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
      formData.value.websiteSummary = data.summary
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
  // Validate required fields for current step
  const stepValidations = {
    1: ['siteType'],
    2: ['businessName', 'category', 'businessEmail', 'contactMethod', 'description'],
    4: ['onSiteMode'],
    5: ['primaryGoal', 'businessHoursMode']
  }

  const requiredForStep = stepValidations[currentStep.value] || []
  const errors = {}
  
  requiredForStep.forEach(key => {
    const value = formData.value[key]
    if (value === '' || value === null || value === undefined) {
      errors[key] = true
    }
  })

  if (Object.keys(errors).length > 0) {
    validationErrors.value = errors
    showValidation.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  // Clear validation errors on successful validation
  validationErrors.value = {}
  showValidation.value = false

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
  { key: 'category', label: 'Industry/Category' },
  { key: 'description', label: 'Description' },
  { key: 'contactMethod', label: 'Preferred contact method' },
  { key: 'primaryGoal', label: 'Primary goal' },
  { key: 'businessHoursMode', label: 'Business hours' },
  { key: 'onSiteMode', label: 'Service delivery mode' }
]

const handleSubmit = async () => {
  console.log('[Onboarding] handleSubmit called')
  submissionErrors.value = []

  const missing = requiredFields.filter(field => {
    const value = formData.value[field.key]
    const isEmpty = value === '' || value === null || value === undefined
    if (isEmpty) {
      console.log(`[Onboarding] Missing field: ${field.key}`, value)
    }
    return isEmpty
  })

  if (missing.length) {
    console.log('[Onboarding] Validation failed, missing fields:', missing)
    submissionErrors.value = missing.map(field => `${field.label} is required.`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  
  console.log('[Onboarding] Validation passed, proceeding with submission')

  isSubmitting.value = true
  submissionErrors.value = []
  
  try {
    // Create complete payload with all form data and file uploads
    const payload = {
      ...JSON.parse(JSON.stringify(formData.value)),
      uploadedLogo: uploadedLogo.value ? {
        name: uploadedLogo.value.name,
        size: uploadedLogo.value.size,
        preview: uploadedLogo.value.preview
      } : null,
      uploadedAssets: uploadedAssets.value.map(asset => ({
        name: asset.name,
        size: asset.size
      }))
    }
    
    console.log('[Onboarding] Submitting payload:', payload)
    
    const response = await fetch('/api/onboarding/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.statusMessage || errorData.message || 'Failed to submit onboarding')
    }
    
    const data = await response.json()
    console.log('[Onboarding] Submission successful:', data)
    
    // Update user profile and website product status
    const supabase = getSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // Update user profile
      await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          has_completed_onboarding: true,
          onboarding_submission_id: data.id
        }, {
          onConflict: 'user_id'
        })

      // Update pending plan status and create website
      const { data: pendingPlans } = await supabase
        .from('plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending_onboarding')
        .order('created_at', { ascending: false })
        .limit(1)

      if (pendingPlans && pendingPlans.length > 0) {
        const plan = pendingPlans[0]
        
        // Create website entry if it's a website plan
        if (plan.product_type === 'website') {
          const businessName = formData.value.businessName || 'My Website'
          const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
          
          const { data: website, error: websiteError } = await supabase
            .from('websites')
            .insert({
              user_id: user.id,
              plan_id: plan.id,
              name: businessName,
              slug: slug,
              status: 'active',
              onboarding_submission_id: data.id
            })
            .select()
            .single()

          if (websiteError) {
            console.error('[Onboarding] Error creating website:', websiteError)
          } else {
            console.log('[Onboarding] Website created:', website)
            
            // Update plan with website_id
            await supabase
              .from('plans')
              .update({
                status: 'onboarding_completed',
                onboarding_submission_id: data.id,
                website_id: website.id
              })
              .eq('id', plan.id)
          }
        } else {
          // For non-website products, just update status
          await supabase
            .from('plans')
            .update({
              status: 'onboarding_completed',
              onboarding_submission_id: data.id
            })
            .eq('id', plan.id)
        }
        
        console.log('[Onboarding] Updated plan status to onboarding_completed')
      }
    }
    
    submissionResult.value = { ...payload, id: data.id }
    isSubmitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Notify parent window if in iframe (dashboard)
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'onboarding-complete' }, '*')
    }
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 2000)
  } catch (error) {
    console.error('[Onboarding] Submission error:', error)
    submissionErrors.value = [error.message || 'Failed to submit onboarding. Please try again.']
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    isSubmitting.value = false
  }
}

watch(currentStep, (newStep, oldStep) => {
  // Clear submission errors when leaving step 8
  if (oldStep === totalSteps) {
    submissionErrors.value = []
  }
  
  // Don't clear validation errors when moving between steps
  // They should only clear when user fixes the field or successfully validates
})

const enhanceDescription = async () => {
  if (isEnhancing.value) return
  
  const description = formData.value.description?.trim()
  if (!description) {
    enhanceError.value = 'Please enter a description first'
    return
  }

  isEnhancing.value = true
  enhanceError.value = ''

  try {
    const response = await fetch('/api/onboarding/enhance-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.statusMessage || 'Failed to enhance description')
    }

    const data = await response.json()
    if (data.enhanced) {
      formData.value.description = data.enhanced
    } else {
      throw new Error('No enhanced description returned')
    }
  } catch (error) {
    console.error('[Onboarding] Enhancement error:', error)
    enhanceError.value = error.message || 'Could not enhance description. Please try again.'
  } finally {
    isEnhancing.value = false
  }
}
</script>
