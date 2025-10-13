<template>
  <div class="relative overflow-hidden bg-neutral-50">
    <div class="absolute inset-x-0 -top-48 h-[420px] bg-gradient-to-b from-primary/10 via-accent-subtle/30 to-transparent" />

    <div class="relative">
      <section class="px-3 sm:px-4">
        <div class="mx-auto max-w-4xl pb-10 pt-16">
          <div class="flex flex-col gap-4 rounded-4xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-neutral-900/5 backdrop-blur sm:p-8">
            <p class="w-fit rounded-full border border-accent-soft/70 bg-accent-subtle px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-primary">
              Onboarding
            </p>
            <h1 class="text-3xl font-semibold tracking-tight text-primary md:text-4xl">Kick off your site build</h1>
            <p class="max-w-2xl text-sm leading-6 text-secondary md:text-base">
              Share the essentials and we’ll configure your workspace, schedule kickoff, and start shaping your launch plan.
            </p>
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

              <!-- Step 2 -->
              <div v-if="currentStep === 2" class="space-y-6">
                <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                  <h3 class="text-base font-semibold text-primary">Business details & coverage</h3>
                  <p class="mt-1 text-sm text-secondary">A quick snapshot of your company helps us tailor the build plan.</p>

                  <form @submit.prevent="nextStep" class="mt-6 space-y-6">
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
                        <label class="mb-1 block text-sm font-medium text-primary">Industry/Category</label>
                        <FormSelect v-model="formData.category" :options="categories" placeholder="Select a category" />
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
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-primary">Service areas</label>
                      <ServiceAreaPicker v-model="formData.serviceAreas" />
                      <div
                        v-if="availableSeedAreas.length"
                        class="mt-3 rounded-2xl border border-dashed border-accent-soft bg-accent-subtle/40 p-4 text-xs text-secondary"
                      >
                        <p class="text-sm font-semibold text-primary">Quick add from saved info</p>
                        <p class="mt-1">Use locations you’ve already shared to jump-start your coverage.</p>
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

                    <div class="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
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

              <!-- Step 3 -->
              <div v-if="currentStep === 3" class="space-y-6">
                <div class="rounded-3xl border border-soft bg-white p-6 shadow-sm">
                  <h3 class="text-base font-semibold text-primary">Share the look and feel</h3>
                  <p class="mt-1 text-sm text-secondary">Choose the options that feel closest—we’ll fine-tune the details together.</p>

                  <div v-if="submissionErrors.length" class="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <p class="font-semibold">Almost there! Please complete the highlighted items:</p>
                    <ul class="mt-2 list-disc space-y-1 pl-5">
                      <li v-for="error in submissionErrors" :key="error">{{ error }}</li>
                    </ul>
                  </div>

                  <div v-if="isSubmitted" class="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                    <p class="font-semibold">Thanks! Your onboarding answers are saved.</p>
                    <p class="mt-1">We’ll review everything and reach out with next steps shortly.</p>
                  </div>

                  <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
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

                    <div class="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
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

const onboardingSeed = {
  name: 'Bello Site',
  cities: [
    {
      lat: 39.7392364,
      lon: -104.984862,
      name: 'Denver, Colorado, United States',
      radiusKm: 10,
      displayName: 'Denver, Colorado, United States'
    }
  ],
  hasLogo: false,
  category: 'Transportation',
  siteType: 'Small business',
  languages: ['English'],
  primaryLanguage: 'English',
  selectedServices: ['Vehicle transport', 'Freight', 'Courier'],
  businessEmail: 'kofikittoe35@gmail.com',
  businessPhone: '7208429167',
  contactMethod: 'phone',
  primaryGoal: 'Sales',
  coverageType: 'single',
  onSiteMode: 'onsite',
  businessHoursMode: 'standard',
  designStyles: ['Playful', 'Minimal'],
  highContrast: false,
  emotionalImpact: ['Exciting'],
  envisionedPages: ['Home', 'Services', 'Fleet', 'Get a quote']
}

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
    title: 'Business profile',
    headline: 'Share your services and where you operate.',
    description: 'Tell us about your offer, coverage, and goals.',
    icon: 'clipboard'
  },
  {
    id: 'design',
    title: 'Brand & style',
    headline: 'Capture the visual direction that feels right.',
    description: 'Tell us how it should look, feel, and sound.',
    icon: 'palette'
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

const serviceOptions = [
  'Vehicle transport',
  'Freight',
  'Courier',
  'Logistics planning',
  'Warehousing',
  'Consulting'
]

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

const seedAreaSuggestions = computed(() => (onboardingSeed.cities || []).map(mapCityToArea))

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
