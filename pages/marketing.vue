<template>
  <div>
    <!-- Hero -->
    <section class="pt-20 pb-24 md:pt-32 md:pb-40">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="max-w-4xl">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
            Generate brand assets,<br />
            launch campaigns with a click
          </h1>
          <p class="mt-8 text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed">
            AI-powered marketing tools that generate custom brand assets, create campaign content, and improve your online presence—automatically.
          </p>
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <NuxtLink
              to="/dashboard"
              class="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm hover:shadow"
            >
              Start Creating
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <a
              href="#tools"
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              See tools
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Marketing Tools -->
    <section id="tools" class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">AI-powered marketing tools</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Everything you need to create, launch, and optimize your marketing—powered by AI.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(tool, index) in marketingTools" :key="tool.title" :ref="el => { if (el) toolRefs[index] = el }" class="group relative overflow-hidden border border-neutral-200 bg-white rounded-xl p-8 hover:border-neutral-300 hover:shadow-lg transition-all shadow-sm">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d97759] to-[#d97759]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <div class="mb-4">
              <svg v-if="index === 0" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': toolInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
              <svg v-else-if="index === 1" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': toolInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              <svg v-else-if="index === 2" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': toolInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              <svg v-else-if="index === 3" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': toolInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <svg v-else-if="index === 4" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': toolInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <svg v-else :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': toolInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-neutral-900 mb-3">{{ tool.title }}</h3>
            <p class="text-base text-neutral-600 leading-relaxed mb-6">{{ tool.desc }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="feature in tool.features" :key="feature" class="text-xs font-medium text-neutral-600 px-2 py-1 rounded border border-neutral-200">
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Campaign Launch -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Launch campaigns with a click</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Pre-built campaign templates that deploy across all channels instantly.
          </p>
        </div>

        <div class="space-y-4">
          <div v-for="(campaign, index) in campaignTypes" :key="campaign.title" :ref="el => { if (el) campaignRefs[index] = el }" class="group relative overflow-hidden border border-neutral-200 bg-white rounded-xl p-8 hover:border-neutral-300 hover:shadow-lg transition-all shadow-sm">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d97759] to-[#d97759]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="mb-3">
                  <svg v-if="index === 0" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': campaignInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                  <svg v-else-if="index === 1" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': campaignInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  <svg v-else-if="index === 2" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': campaignInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                  <svg v-else-if="index === 3" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': campaignInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <svg v-else :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': campaignInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-medium text-neutral-900 mb-2">{{ campaign.title }}</h3>
                <p class="text-base text-neutral-600 leading-relaxed">{{ campaign.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Online Presence -->
    <section class="py-20 md:py-32 bg-neutral-50">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">Improve your online presence</h2>
          <p class="text-lg text-neutral-600 max-w-2xl">
            Automated tools that boost your visibility and engagement across all platforms.
          </p>
        </div>

        <div class="space-y-4">
          <div v-for="(feature, index) in presenceFeatures" :key="feature.title" :ref="el => { if (el) presenceRefs[index] = el }" class="group relative overflow-hidden border border-neutral-200 bg-white rounded-xl p-8 hover:border-neutral-300 hover:shadow-lg transition-all shadow-sm">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d97759] to-[#d97759]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <div class="mb-3">
              <svg v-if="index === 0" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': presenceInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              <svg v-else-if="index === 1" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': presenceInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <svg v-else-if="index === 2" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': presenceInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
              <svg v-else-if="index === 3" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': presenceInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <svg v-else-if="index === 4" :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': presenceInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else :class="['h-8 w-8 feature-icon transition-all duration-500', { 'icon-active': presenceInView[index] }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-neutral-900 mb-2">{{ feature.title }}</h3>
            <p class="text-base text-neutral-600 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6">Ready to transform your marketing?</h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-10">
          Start generating assets and launching campaigns today.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink 
            to="/dashboard"
            class="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm hover:shadow"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink 
            to="/contact"
            class="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4"
          >
            Contact us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
  title: 'Marketing & Branding | Hinn',
  meta: [
    {
      name: 'description',
      content: 'AI-powered marketing tools. Generate brand assets, launch campaigns, improve online presence.'
    }
  ]
})

const toolRefs = ref([])
const toolInView = ref([false, false, false, false, false, false])
const campaignRefs = ref([])
const campaignInView = ref([false, false, false, false, false])
const presenceRefs = ref([])
const presenceInView = ref([false, false, false, false, false, false])
let toolObserver = null
let campaignObserver = null
let presenceObserver = null

const marketingTools = [
  {
    title: 'Brand Asset Generator',
    desc: 'AI creates logos, color palettes, typography, and complete brand guidelines in minutes. Export in all formats.',
    features: ['Logo variations', 'Color systems', 'Typography', 'Brand guidelines']
  },
  {
    title: 'Content Creation Suite',
    desc: 'Generate blog posts, social media content, email copy, and ad creative. AI matches your brand voice automatically.',
    features: ['Blog posts', 'Social content', 'Email campaigns', 'Ad copy']
  },
  {
    title: 'Social Media Manager',
    desc: 'Schedule posts, generate captions, create graphics, and respond to comments—all automated across platforms.',
    features: ['Auto-scheduling', 'Caption generation', 'Graphics creation', 'Comment replies']
  },
  {
    title: 'Email Campaign Builder',
    desc: 'Design emails, write copy, segment audiences, and optimize send times. A/B testing built-in.',
    features: ['Email design', 'List segmentation', 'A/B testing', 'Analytics']
  },
  {
    title: 'SEO Optimizer',
    desc: 'Keyword research, content optimization, and technical SEO handled automatically. Track rankings in real-time.',
    features: ['Keyword research', 'Content optimization', 'Technical SEO', 'Rank tracking']
  },
  {
    title: 'Ad Campaign Manager',
    desc: 'Create, launch, and optimize ads across Google, Facebook, and Instagram. AI adjusts bids and targeting automatically.',
    features: ['Multi-platform ads', 'Auto-bidding', 'Audience targeting', 'Performance optimization']
  }
]

const campaignTypes = [
  {
    title: 'Product Launch Campaign',
    desc: 'Complete campaign across email, social, ads, and PR. AI generates all assets, schedules posts, and tracks performance. Launch in one click.'
  },
  {
    title: 'Lead Generation Campaign',
    desc: 'Landing pages, lead magnets, email sequences, and retargeting ads. AI optimizes for conversions automatically.'
  },
  {
    title: 'Brand Awareness Campaign',
    desc: 'Multi-channel content strategy with blog posts, social media, and display ads. AI maintains consistent messaging across all channels.'
  },
  {
    title: 'Event Promotion Campaign',
    desc: 'Email invitations, social posts, reminder sequences, and post-event follow-ups. Fully automated from start to finish.'
  },
  {
    title: 'Seasonal Campaign',
    desc: 'Holiday and seasonal promotions with themed content, special offers, and time-limited messaging. Deploy instantly.'
  }
]

const presenceFeatures = [
  {
    title: 'Automated Content Distribution',
    desc: 'Publish once, distribute everywhere. AI adapts your content for each platform and schedules optimal posting times.'
  },
  {
    title: 'Review & Reputation Management',
    desc: 'Monitor reviews across all platforms. AI generates responses and alerts you to issues requiring attention.'
  },
  {
    title: 'Social Listening & Engagement',
    desc: 'Track brand mentions, respond to comments, and engage with your audience automatically. Never miss an opportunity.'
  },
  {
    title: 'Analytics & Insights',
    desc: 'Real-time dashboards showing what\'s working. AI identifies trends and suggests improvements automatically.'
  },
  {
    title: 'Competitor Monitoring',
    desc: 'Track competitor campaigns, content, and performance. AI highlights opportunities and threats in your market.'
  },
  {
    title: 'Brand Consistency Checker',
    desc: 'Ensures all content matches your brand guidelines. AI flags inconsistencies and suggests corrections.'
  }
]

onMounted(() => {
  toolObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = toolRefs.value.findIndex(ref => (ref && ref.$el ? ref.$el : ref) === entry.target)
      if (index !== -1) toolInView.value[index] = entry.isIntersecting
    })
  }, { threshold: 0.5, rootMargin: '-50px' })

  campaignObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = campaignRefs.value.findIndex(ref => (ref && ref.$el ? ref.$el : ref) === entry.target)
      if (index !== -1) campaignInView.value[index] = entry.isIntersecting
    })
  }, { threshold: 0.5, rootMargin: '-50px' })

  presenceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = presenceRefs.value.findIndex(ref => (ref && ref.$el ? ref.$el : ref) === entry.target)
      if (index !== -1) presenceInView.value[index] = entry.isIntersecting
    })
  }, { threshold: 0.5, rootMargin: '-50px' })

  setTimeout(() => {
    toolRefs.value.forEach(ref => {
      const el = ref && ref.$el ? ref.$el : ref
      if (el instanceof Element) toolObserver.observe(el)
    })
    campaignRefs.value.forEach(ref => {
      const el = ref && ref.$el ? ref.$el : ref
      if (el instanceof Element) campaignObserver.observe(el)
    })
    presenceRefs.value.forEach(ref => {
      const el = ref && ref.$el ? ref.$el : ref
      if (el instanceof Element) presenceObserver.observe(el)
    })
  }, 200)
})

onUnmounted(() => {
  if (toolObserver) toolObserver.disconnect()
  if (campaignObserver) campaignObserver.disconnect()
  if (presenceObserver) presenceObserver.disconnect()
})
</script>

<style scoped>
.feature-icon {
  stroke: #a3a3a3;
  fill: none;
  transition: fill 500ms ease, stroke 500ms ease;
}

@media (min-width: 768px) {
  .group:hover .feature-icon {
    fill: #d97759;
    stroke: #d97759;
  }
}

@media (max-width: 767px) {
  .feature-icon.icon-active {
    fill: #d97759;
    stroke: #d97759;
  }
}
</style>
