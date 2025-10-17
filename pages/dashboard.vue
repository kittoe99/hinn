<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Top Header Bar -->
    <header class="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div class="flex h-16 items-center justify-between px-6">
        <!-- Left: Logo and Project Selector -->
        <div class="flex items-center gap-4">
          <button class="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-neutral-100 transition-colors">
            <div class="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <span class="text-xs font-bold text-white">H</span>
            </div>
            <span class="text-sm font-semibold text-neutral-900">Hinn</span>
            <span class="rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-medium text-neutral-600">Hobby</span>
            <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <!-- Center: Quick Links -->
        <div class="hidden md:flex items-center gap-2">
          <a href="#" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors">
            Next.js <span class="rounded bg-neutral-900 px-1.5 py-0.5 text-xs font-medium text-white">v15</span> tickets
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <!-- Right: Search, Feedback, Notifications, Profile -->
        <div class="flex items-center gap-3">
          <button class="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-500 hover:border-neutral-300 transition-colors">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span class="hidden sm:inline">Find...</span>
            <kbd class="hidden sm:inline-flex h-5 items-center rounded border border-neutral-200 bg-neutral-50 px-1.5 text-xs font-medium text-neutral-500">F</kbd>
          </button>

          <button class="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors">
            Feedback
          </button>

          <button class="relative rounded-lg p-2 hover:bg-neutral-100 transition-colors">
            <svg class="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
          </button>

          <button class="flex items-center gap-2 rounded-lg p-1 hover:bg-neutral-100 transition-colors">
            <svg class="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <button class="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"></button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="border-t border-neutral-100">
        <nav class="flex items-center md:justify-center gap-1 px-6 overflow-x-auto scrollbar-hide">
          <a
            v-for="tab in navigationTabs"
            :key="tab.id"
            href="#"
            @click.prevent="activeTab = tab.id"
            :class="[
              'relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'text-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            ]"
          >
            {{ tab.label }}
            <span
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
            ></span>
          </a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-6 py-8">
      <!-- Search and Actions Bar -->
      <div class="mb-6 flex items-center justify-between gap-4">
        <div class="relative flex-1">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Projects..."
            class="h-9 w-full rounded-md border border-neutral-200 bg-white pl-9 pr-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="viewMode = 'grid'"
            :class="[
              'rounded-lg p-2 transition-colors',
              viewMode === 'grid'
                ? 'bg-neutral-900 text-white'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
            ]"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
          </button>

          <button
            @click="viewMode = 'list'"
            :class="[
              'rounded-lg p-2 transition-colors',
              viewMode === 'list'
                ? 'bg-neutral-900 text-white'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
            ]"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <div class="h-6 w-px bg-neutral-200"></div>

          <button class="flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
            Add New...
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div v-if="activeTab === 'overview'" class="space-y-6">
        <!-- Projects Grid/List -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="group rounded-lg border border-neutral-200 bg-white p-6 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <span class="text-sm font-bold text-white">{{ project.name.charAt(0) }}</span>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-neutral-900">{{ project.name }}</h3>
                  <p class="text-xs text-neutral-500">{{ project.domain }}</p>
                </div>
              </div>
              <button class="opacity-0 group-hover:opacity-100 rounded p-1 hover:bg-neutral-100 transition-all">
                <svg class="h-4 w-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
              </button>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2 text-xs text-neutral-600">
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ project.lastDeployed }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span :class="[
                  'inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium',
                  project.status === 'Ready' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                ]">
                  <span :class="[
                    'h-1.5 w-1.5 rounded-full',
                    project.status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-500'
                  ]"></span>
                  {{ project.status }}
                </span>
                <span class="text-xs text-neutral-500">{{ project.framework }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <div class="mb-4 rounded-full bg-neutral-100 p-4">
            <svg class="h-8 w-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 mb-2">No projects found</h3>
          <p class="text-sm text-neutral-600 mb-6">Get started by creating your first project</p>
          <button class="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
            Create Project
          </button>
        </div>
      </div>

      <!-- Other Tabs Content -->
      <div v-if="activeTab !== 'overview'" class="rounded-lg border border-neutral-200 bg-white p-8 text-center">
        <p class="text-sm text-neutral-600">{{ activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }} content goes here</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Disable default layout (removes navigation and footer)
definePageMeta({
  layout: false
})

useHead({
  title: 'Dashboard - Hinn',
  meta: [
    { name: 'description', content: 'Manage your projects and deployments' }
  ]
})

// Navigation
const navigationTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'websites', label: 'Websites' },
  { id: 'domains', label: 'Domains' },
  { id: 'branding', label: 'Branding' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'ai-agents', label: 'AI Agents' },
  { id: 'support', label: 'Support' },
  { id: 'settings', label: 'Settings' }
]

const activeTab = ref('overview')
const viewMode = ref('grid')
const searchQuery = ref('')

// Sample projects data
const projects = ref([
  {
    id: 1,
    name: 'hinn-website',
    domain: 'hinn.io',
    status: 'Ready',
    framework: 'Next.js',
    lastDeployed: '2 hours ago'
  },
  {
    id: 2,
    name: 'client-portal',
    domain: 'portal.hinn.io',
    status: 'Ready',
    framework: 'Nuxt.js',
    lastDeployed: '1 day ago'
  },
  {
    id: 3,
    name: 'marketing-site',
    domain: 'marketing.hinn.io',
    status: 'Building',
    framework: 'Next.js',
    lastDeployed: '3 days ago'
  }
])

const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value
  return projects.value.filter(project =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    project.domain.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
