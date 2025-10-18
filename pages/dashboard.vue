<template>
  <div class="min-h-screen bg-page">
    <!-- Top Header Bar -->
    <header class="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div class="flex h-16 items-center justify-between px-6">
        <!-- Left: Logo and Project Selector -->
        <div class="flex items-center gap-4">
          <button class="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-neutral-100 transition-colors">
            <div class="flex h-6 w-6 items-center justify-center rounded-full bg-accent-primary">
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

          <button class="h-8 w-8 rounded-full bg-accent-primary"></button>
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
                ? 'text-primary'
                : 'text-secondary hover:text-primary'
            ]"
          >
            {{ tab.label }}
            <span
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
            ></span>
          </a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-6 py-8">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="space-y-6">
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
              class="h-9 w-full rounded-md border border-neutral-200 bg-white pl-9 pr-3 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
            />
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'rounded-lg p-2 transition-colors',
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white'
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
                  ? 'bg-accent-primary text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              ]"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <div class="h-6 w-px bg-neutral-200"></div>

            <button class="flex items-center gap-2 rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
              Add New...
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        </div>
        <!-- Projects Grid/List -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="group rounded-lg border border-neutral-200 bg-white p-6 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-lg bg-accent-primary flex items-center justify-center">
                  <span class="text-sm font-bold text-white">{{ project.name.charAt(0) }}</span>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-primary">{{ project.name }}</h3>
                  <p class="text-xs text-secondary">{{ project.domain }}</p>
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
          <h3 class="text-lg font-semibold text-primary mb-2">No projects found</h3>
          <p class="text-sm text-secondary mb-6">Get started by creating your first project</p>
          <button class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
            Create Project
          </button>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'">
        <!-- Mobile View -->
        <div class="md:hidden">
          <!-- Menu List (when no tab selected) -->
          <div v-if="!settingsMobileContentOpen" class="space-y-6">
            <div>
              <h1 class="text-3xl font-bold text-primary mb-6">Settings</h1>
              
              <!-- Search Bar -->
              <div class="relative mb-6">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  v-model="settingsSearchQuery"
                  type="text"
                  placeholder="Search..."
                  class="w-full rounded-lg border border-neutral-200 bg-white pl-11 pr-4 py-3 text-base text-primary placeholder-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>

              <!-- Menu Items -->
              <div class="space-y-0 border-t border-neutral-200">
                <a
                  v-for="subTab in settingsTabs"
                  :key="subTab.id"
                  href="#"
                  @click.prevent="settingsActiveTab = subTab.id; settingsMobileContentOpen = true"
                  class="block px-0 py-4 text-base font-normal text-primary border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  {{ subTab.label }}
                </a>
              </div>
            </div>
          </div>

          <!-- Content View (when tab selected) -->
          <div v-if="settingsMobileContentOpen" class="space-y-6">
            <!-- Back Button -->
            <button
              @click="settingsMobileContentOpen = false"
              class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Settings
            </button>

            <!-- Content Sections -->
            <div>
              <!-- Profile Section -->
              <div v-if="settingsActiveTab === 'profile'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Profile Settings</h2>
                  <p class="mt-1 text-sm text-secondary">Manage your personal information and account preferences</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="space-y-5">
                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Company</label>
                      <input
                        type="text"
                        placeholder="Your Company"
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      />
                    </div>

                    <div class="pt-4 border-t border-neutral-200">
                      <button class="rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Billing Section -->
              <div v-if="settingsActiveTab === 'billing'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Billing Settings</h2>
                  <p class="mt-1 text-sm text-secondary">Manage your subscription and payment methods</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-base font-semibold text-primary mb-4">Current Plan</h3>
                      <div class="flex items-center justify-between p-4 rounded-lg bg-accent-subtle border border-accent-primary/20">
                        <div>
                          <div class="text-sm font-semibold text-primary">Hobby Plan</div>
                          <div class="text-xs text-secondary mt-1">Free forever</div>
                        </div>
                        <button class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                          Upgrade
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 class="text-base font-semibold text-primary mb-4">Payment Method</h3>
                      <div class="p-4 rounded-lg border border-neutral-200">
                        <p class="text-sm text-secondary">No payment method on file</p>
                        <button class="mt-3 text-sm font-medium text-accent-primary hover:text-accent-focus">
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Invoices Section -->
              <div v-if="settingsActiveTab === 'invoices'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Invoices</h2>
                  <p class="mt-1 text-sm text-secondary">View and download your billing invoices</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">No invoices yet</h3>
                    <p class="text-sm text-secondary">Your invoices will appear here once you upgrade to a paid plan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop/Tablet View -->
        <div class="hidden md:flex md:flex-row gap-6">
          <!-- Sidebar Navigation -->
          <aside class="md:w-48 shrink-0">
            <nav class="space-y-0.5">
              <a
                v-for="subTab in settingsTabs"
                :key="subTab.id"
                href="#"
                @click.prevent="settingsActiveTab = subTab.id"
                :class="[
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  settingsActiveTab === subTab.id
                    ? 'bg-neutral-100 text-primary'
                    : 'text-secondary hover:bg-neutral-50 hover:text-primary'
                ]"
              >
                {{ subTab.label }}
              </a>
            </nav>
          </aside>

          <!-- Content Area (Desktop/Tablet only) -->
          <div class="hidden md:block flex-1 min-w-0">
            <!-- Profile Section -->
            <div v-if="settingsActiveTab === 'profile'" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-primary">Profile Settings</h2>
            <p class="mt-1 text-sm text-secondary">Manage your personal information and account preferences</p>
          </div>

          <div class="rounded-lg border border-neutral-200 bg-white p-6">
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-primary mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-primary mb-2">Company</label>
                <input
                  type="text"
                  placeholder="Your Company"
                  class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>

              <div class="pt-4 border-t border-neutral-200">
                <button class="rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Section -->
        <div v-if="settingsActiveTab === 'billing'" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-primary">Billing Settings</h2>
            <p class="mt-1 text-sm text-secondary">Manage your subscription and payment methods</p>
          </div>

          <div class="rounded-lg border border-neutral-200 bg-white p-6">
            <div class="space-y-6">
              <div>
                <h3 class="text-base font-semibold text-primary mb-4">Current Plan</h3>
                <div class="flex items-center justify-between p-4 rounded-lg bg-accent-subtle border border-accent-primary/20">
                  <div>
                    <div class="text-sm font-semibold text-primary">Hobby Plan</div>
                    <div class="text-xs text-secondary mt-1">Free forever</div>
                  </div>
                  <button class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                    Upgrade
                  </button>
                </div>
              </div>

              <div>
                <h3 class="text-base font-semibold text-primary mb-4">Payment Method</h3>
                <div class="p-4 rounded-lg border border-neutral-200">
                  <p class="text-sm text-secondary">No payment method on file</p>
                  <button class="mt-3 text-sm font-medium text-accent-primary hover:text-accent-focus">
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Invoices Section -->
        <div v-if="settingsActiveTab === 'invoices'" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-primary">Invoices</h2>
            <p class="mt-1 text-sm text-secondary">View and download your billing invoices</p>
          </div>

          <div class="rounded-lg border border-neutral-200 bg-white p-6">
            <div class="text-center py-12">
              <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 class="text-base font-semibold text-primary mb-2">No invoices yet</h3>
              <p class="text-sm text-secondary">Your invoices will appear here once you upgrade to a paid plan</p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Support Tab -->
      <div v-if="activeTab === 'support'">
        <!-- Mobile View -->
        <div class="md:hidden">
          <!-- Menu List (when no tab selected) -->
          <div v-if="!supportMobileContentOpen" class="space-y-6">
            <div>
              <h1 class="text-3xl font-bold text-primary mb-6">Support</h1>
              
              <!-- Search Bar -->
              <div class="relative mb-6">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  v-model="supportSearchQuery"
                  type="text"
                  placeholder="Search..."
                  class="w-full rounded-lg border border-neutral-200 bg-white pl-11 pr-4 py-3 text-base text-primary placeholder-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>

              <!-- Menu Items -->
              <div class="space-y-0 border-t border-neutral-200">
                <a
                  v-for="subTab in supportTabs"
                  :key="subTab.id"
                  href="#"
                  @click.prevent="supportActiveTab = subTab.id; supportMobileContentOpen = true"
                  class="block px-0 py-4 text-base font-normal text-primary border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  {{ subTab.label }}
                </a>
              </div>
            </div>
          </div>

          <!-- Content View (when tab selected) -->
          <div v-if="supportMobileContentOpen" class="space-y-6">
            <!-- Back Button -->
            <button
              @click="supportMobileContentOpen = false"
              class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Support
            </button>

            <!-- Content Sections -->
            <div>
              <!-- Chat Support Section -->
              <div v-if="supportActiveTab === 'chat'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Chat Support</h2>
                  <p class="mt-1 text-sm text-secondary">Get instant help from our support team</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">Chat support coming soon</h3>
                    <p class="text-sm text-secondary">We're working on bringing you real-time chat support</p>
                  </div>
                </div>
              </div>

              <!-- Helpful Docs Section -->
              <div v-if="supportActiveTab === 'docs'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Helpful Docs</h2>
                  <p class="mt-1 text-sm text-secondary">Browse our documentation and guides</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">Documentation coming soon</h3>
                    <p class="text-sm text-secondary">We're preparing comprehensive guides for you</p>
                  </div>
                </div>
              </div>

              <!-- Technical/Bugs Section -->
              <div v-if="supportActiveTab === 'bugs'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Technical/Bugs</h2>
                  <p class="mt-1 text-sm text-secondary">Report technical issues and bugs</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">Bug reporting coming soon</h3>
                    <p class="text-sm text-secondary">We're setting up our bug tracking system</p>
                  </div>
                </div>
              </div>

              <!-- Contact Us Section -->
              <div v-if="supportActiveTab === 'contact'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Contact Us</h2>
                  <p class="mt-1 text-sm text-secondary">Get in touch with our team</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="space-y-5">
                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Subject</label>
                      <input
                        type="text"
                        placeholder="How can we help?"
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Message</label>
                      <textarea
                        rows="5"
                        placeholder="Tell us more..."
                        class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      ></textarea>
                    </div>

                    <div class="pt-4 border-t border-neutral-200">
                      <button class="rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop/Tablet View -->
        <div class="hidden md:flex md:flex-row gap-6">
          <!-- Sidebar Navigation -->
          <aside class="md:w-48 shrink-0">
            <nav class="space-y-0.5">
              <a
                v-for="subTab in supportTabs"
                :key="subTab.id"
                href="#"
                @click.prevent="supportActiveTab = subTab.id"
                :class="[
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  supportActiveTab === subTab.id
                    ? 'bg-neutral-100 text-primary'
                    : 'text-secondary hover:bg-neutral-50 hover:text-primary'
                ]"
              >
                {{ subTab.label }}
              </a>
            </nav>
          </aside>

          <!-- Content Area -->
          <div class="flex-1 min-w-0">
            <!-- Chat Support Section -->
            <div v-if="supportActiveTab === 'chat'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Chat Support</h2>
                <p class="mt-1 text-sm text-secondary">Get instant help from our support team</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">Chat support coming soon</h3>
                  <p class="text-sm text-secondary">We're working on bringing you real-time chat support</p>
                </div>
              </div>
            </div>

            <!-- Helpful Docs Section -->
            <div v-if="supportActiveTab === 'docs'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Helpful Docs</h2>
                <p class="mt-1 text-sm text-secondary">Browse our documentation and guides</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">Documentation coming soon</h3>
                  <p class="text-sm text-secondary">We're preparing comprehensive guides for you</p>
                </div>
              </div>
            </div>

            <!-- Technical/Bugs Section -->
            <div v-if="supportActiveTab === 'bugs'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Technical/Bugs</h2>
                <p class="mt-1 text-sm text-secondary">Report technical issues and bugs</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">Bug reporting coming soon</h3>
                  <p class="text-sm text-secondary">We're setting up our bug tracking system</p>
                </div>
              </div>
            </div>

            <!-- Contact Us Section -->
            <div v-if="supportActiveTab === 'contact'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Contact Us</h2>
                <p class="mt-1 text-sm text-secondary">Get in touch with our team</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-primary mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-primary mb-2">Message</label>
                    <textarea
                      rows="5"
                      placeholder="Tell us more..."
                      class="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                    ></textarea>
                  </div>

                  <div class="pt-4 border-t border-neutral-200">
                    <button class="rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Domains Tab -->
      <div v-if="activeTab === 'domains'">
        <!-- Mobile View -->
        <div class="md:hidden">
          <!-- Menu List (when no tab selected) -->
          <div v-if="!domainsMobileContentOpen" class="space-y-6">
            <div>
              <h1 class="text-3xl font-bold text-primary mb-6">Domains</h1>
              
              <!-- Search Bar -->
              <div class="relative mb-6">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  v-model="domainsSearchQuery"
                  type="text"
                  placeholder="Search..."
                  class="w-full rounded-lg border border-neutral-200 bg-white pl-11 pr-4 py-3 text-base text-primary placeholder-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>

              <!-- Menu Items -->
              <div class="space-y-0 border-t border-neutral-200">
                <a
                  v-for="subTab in domainsTabs"
                  :key="subTab.id"
                  href="#"
                  @click.prevent="domainsActiveTab = subTab.id; domainsMobileContentOpen = true"
                  class="block px-0 py-4 text-base font-normal text-primary border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  {{ subTab.label }}
                </a>
              </div>
            </div>
          </div>

          <!-- Content View (when tab selected) -->
          <div v-if="domainsMobileContentOpen" class="space-y-6">
            <!-- Back Button -->
            <button
              @click="domainsMobileContentOpen = false"
              class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Domains
            </button>

            <!-- Content Sections -->
            <div>
              <!-- Purchased Domains Section -->
              <div v-if="domainsActiveTab === 'purchased'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Purchased Domains</h2>
                  <p class="mt-1 text-sm text-secondary">Manage your registered domain names</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">No domains yet</h3>
                    <p class="text-sm text-secondary mb-4">You haven't purchased any domains yet</p>
                    <button class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                      Buy Your First Domain
                    </button>
                  </div>
                </div>
              </div>

              <!-- Buy New Domain Section -->
              <div v-if="domainsActiveTab === 'buy'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">Buy New Domain</h2>
                  <p class="mt-1 text-sm text-secondary">Search and register a new domain name</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="space-y-5">
                    <div>
                      <label class="block text-sm font-medium text-primary mb-2">Search for a domain</label>
                      <div class="flex gap-2">
                        <input
                          type="text"
                          placeholder="yourdomain.com"
                          class="flex-1 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                        />
                        <button class="rounded-lg bg-accent-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                          Search
                        </button>
                      </div>
                    </div>

                    <div class="pt-4 border-t border-neutral-200">
                      <p class="text-xs text-secondary">Popular extensions: .com, .net, .org, .io, .app</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- DNS & Configurations Section -->
              <div v-if="domainsActiveTab === 'dns'" class="space-y-6">
                <div>
                  <h2 class="text-2xl font-bold text-primary">DNS & Configurations</h2>
                  <p class="mt-1 text-sm text-secondary">Manage DNS records and domain settings</p>
                </div>

                <div class="rounded-lg border border-neutral-200 bg-white p-6">
                  <div class="text-center py-12">
                    <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <h3 class="text-base font-semibold text-primary mb-2">No domains to configure</h3>
                    <p class="text-sm text-secondary">Purchase a domain to manage DNS settings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop/Tablet View -->
        <div class="hidden md:flex md:flex-row gap-6">
          <!-- Sidebar Navigation -->
          <aside class="md:w-48 shrink-0">
            <nav class="space-y-0.5">
              <a
                v-for="subTab in domainsTabs"
                :key="subTab.id"
                href="#"
                @click.prevent="domainsActiveTab = subTab.id"
                :class="[
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  domainsActiveTab === subTab.id
                    ? 'bg-neutral-100 text-primary'
                    : 'text-secondary hover:bg-neutral-50 hover:text-primary'
                ]"
              >
                {{ subTab.label }}
              </a>
            </nav>
          </aside>

          <!-- Content Area -->
          <div class="flex-1 min-w-0">
            <!-- Purchased Domains Section -->
            <div v-if="domainsActiveTab === 'purchased'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Purchased Domains</h2>
                <p class="mt-1 text-sm text-secondary">Manage your registered domain names</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">No domains yet</h3>
                  <p class="text-sm text-secondary mb-4">You haven't purchased any domains yet</p>
                  <button class="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                    Buy Your First Domain
                  </button>
                </div>
              </div>
            </div>

            <!-- Buy New Domain Section -->
            <div v-if="domainsActiveTab === 'buy'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">Buy New Domain</h2>
                <p class="mt-1 text-sm text-secondary">Search and register a new domain name</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-primary mb-2">Search for a domain</label>
                    <div class="flex gap-2">
                      <input
                        type="text"
                        placeholder="yourdomain.com"
                        class="flex-1 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      />
                      <button class="rounded-lg bg-accent-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-focus transition-colors">
                        Search
                      </button>
                    </div>
                  </div>

                  <div class="pt-4 border-t border-neutral-200">
                    <p class="text-xs text-secondary">Popular extensions: .com, .net, .org, .io, .app</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- DNS & Configurations Section -->
            <div v-if="domainsActiveTab === 'dns'" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-primary">DNS & Configurations</h2>
                <p class="mt-1 text-sm text-secondary">Manage DNS records and domain settings</p>
              </div>

              <div class="rounded-lg border border-neutral-200 bg-white p-6">
                <div class="text-center py-12">
                  <svg class="h-12 w-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <h3 class="text-base font-semibold text-primary mb-2">No domains to configure</h3>
                  <p class="text-sm text-secondary">Purchase a domain to manage DNS settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Coming Soon Tabs (Branding, Marketing, AI Agents) -->
      <div v-if="activeTab === 'branding' || activeTab === 'marketing' || activeTab === 'ai-agents'" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center max-w-md">
          <div class="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-subtle">
            <svg class="h-10 w-10 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-primary mb-3">Coming Soon</h2>
          <p class="text-base text-secondary mb-6">
            We're working hard to bring you {{ activeTab === 'ai-agents' ? 'AI Agents' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }}. 
            Stay tuned for updates!
          </p>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 text-sm text-secondary">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            This feature is under development
          </div>
        </div>
      </div>

      <!-- Other Tabs Content -->
      <div v-if="activeTab !== 'overview' && activeTab !== 'settings' && activeTab !== 'support' && activeTab !== 'domains' && activeTab !== 'branding' && activeTab !== 'marketing' && activeTab !== 'ai-agents'" class="rounded-lg border border-neutral-200 bg-white p-8 text-center">
        <p class="text-sm text-secondary">{{ activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }} content goes here</p>
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

// Settings sub-navigation
const settingsTabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'billing', label: 'Billing' },
  { id: 'invoices', label: 'Invoices' }
]
const settingsActiveTab = ref('profile')
const settingsMobileMenuOpen = ref(false)
const settingsMobileContentOpen = ref(false)
const settingsSearchQuery = ref('')

// Support sub-navigation
const supportTabs = [
  { id: 'chat', label: 'Chat Support' },
  { id: 'docs', label: 'Helpful Docs' },
  { id: 'bugs', label: 'Technical/Bugs' },
  { id: 'contact', label: 'Contact Us' }
]
const supportActiveTab = ref('chat')
const supportMobileContentOpen = ref(false)
const supportSearchQuery = ref('')

// Domains sub-navigation
const domainsTabs = [
  { id: 'purchased', label: 'Purchased Domains' },
  { id: 'buy', label: 'Buy New Domain' },
  { id: 'dns', label: 'DNS & Configurations' }
]
const domainsActiveTab = ref('purchased')
const domainsMobileContentOpen = ref(false)
const domainsSearchQuery = ref('')

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
