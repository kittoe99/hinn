<template>
  <header class="border-b border-neutral-200 bg-[#f5f3ef] backdrop-blur-sm relative shadow-[0_1px_0_rgba(0,0,0,0.04)] z-[100]">
    <nav class="max-w-5xl mx-auto px-6 lg:px-8 relative z-[100]">
      <div class="flex items-center justify-between h-16 gap-4">
        <!-- Logo -->
        <NuxtLink to="/" class="text-lg font-medium text-neutral-900 flex-shrink-0">
          Hinn
        </NuxtLink>
        
        <!-- Mobile Search Bar (between logo and menu button) -->
        <div class="flex-1 md:hidden">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="h-9 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-neutral-300 focus:ring-1 focus:ring-neutral-300 focus:outline-none transition-all"
            />
          </div>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <!-- Products Dropdown -->
          <div class="relative" @mouseenter="productsOpen = true" @mouseleave="productsOpen = false">
            <button @click="productsOpen = !productsOpen" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1">
              Products
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': productsOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <Transition
              enter-active-class="transition-all duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div v-if="productsOpen" class="absolute top-full left-0 mt-2 w-64 bg-white border border-neutral-300 rounded-xl shadow-2xl py-2 z-[110]">
                <NuxtLink to="/website" class="flex items-center gap-3 px-4 py-3 hover:bg-[#d97759]/10 rounded-lg mx-2 transition-colors">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d97759]/10">
                    <svg class="w-5 h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-neutral-900">Website</div>
                    <div class="text-xs text-neutral-500">Professional sites</div>
                  </div>
                </NuxtLink>
                <NuxtLink to="/agents" class="flex items-center gap-3 px-4 py-3 hover:bg-[#d97759]/10 rounded-lg mx-2 transition-colors">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d97759]/10">
                    <svg class="w-5 h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-neutral-900">AI Agents</div>
                    <div class="text-xs text-neutral-500">Automate tasks</div>
                  </div>
                </NuxtLink>
                <NuxtLink to="/marketing" class="flex items-center gap-3 px-4 py-3 hover:bg-[#d97759]/10 rounded-lg mx-2 transition-colors">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d97759]/10">
                    <svg class="w-5 h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-neutral-900">Marketing</div>
                    <div class="text-xs text-neutral-500">Boost your reach</div>
                  </div>
                </NuxtLink>
              </div>
            </Transition>
          </div>
          <NuxtLink 
            to="/contact" 
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Contact
          </NuxtLink>
        </div>

        <!-- Desktop Search Bar -->
        <div class="hidden md:block flex-1 max-w-xs">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="h-9 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-neutral-300 focus:ring-1 focus:ring-neutral-300 focus:outline-none transition-all"
            />
          </div>
        </div>

        <!-- CTA -->
        <div class="hidden md:flex items-center gap-4 flex-shrink-0">
          <NuxtLink 
            to="/login"
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Sign in
          </NuxtLink>
          <NuxtLink 
            to="/dashboard"
            class="rounded-lg px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm"
          >
            Get Started
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2.5 rounded-lg hover:bg-neutral-900/5 transition-all duration-200"
          aria-label="Toggle menu"
        >
          <div class="w-5 h-5 flex flex-col justify-center gap-1">
            <span :class="['block h-0.5 bg-neutral-900 rounded-full transition-all duration-300', mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '']"></span>
            <span :class="['block h-0.5 bg-neutral-900 rounded-full transition-all duration-300', mobileMenuOpen ? 'opacity-0' : '']"></span>
            <span :class="['block h-0.5 bg-neutral-900 rounded-full transition-all duration-300', mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : '']"></span>
          </div>
        </button>
      </div>
    </nav>


    <!-- Mobile Menu Dropdown -->
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="mobileMenuOpen"
        class="absolute top-full left-0 right-0 bg-white z-[110] md:hidden border-b border-neutral-200 shadow-xl"
      >
        <!-- Navigation -->
        <nav class="px-6 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
          <!-- Home -->
          <NuxtLink 
            to="/"
            class="block px-4 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
            @click="mobileMenuOpen = false"
          >
            Home
          </NuxtLink>
          <!-- Products Section -->
          <div>
            <button 
              @click="productsExpanded = !productsExpanded"
              class="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
            >
              <span>Products</span>
              <svg 
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': productsExpanded }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <Transition
              enter-active-class="transition-all duration-200"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-200"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="productsExpanded" class="mt-3 ml-4 space-y-3 overflow-hidden pb-2">
                <NuxtLink 
                  to="/website"
                  class="flex items-center gap-3 group"
                  @click="mobileMenuOpen = false"
                >
                  <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d97759]/10 flex-shrink-0 group-hover:bg-[#d97759]/20 transition-colors">
                    <svg class="w-4 h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-neutral-900 group-hover:text-[#d97759] transition-colors">Website</div>
                    <div class="text-xs text-neutral-500">Professional sites</div>
                  </div>
                </NuxtLink>
                <NuxtLink 
                  to="/agents"
                  class="flex items-center gap-3 group"
                  @click="mobileMenuOpen = false"
                >
                  <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d97759]/10 flex-shrink-0 group-hover:bg-[#d97759]/20 transition-colors">
                    <svg class="w-4 h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-neutral-900 group-hover:text-[#d97759] transition-colors">AI Agents</div>
                    <div class="text-xs text-neutral-500">Automate tasks</div>
                  </div>
                </NuxtLink>
                <NuxtLink 
                  to="/marketing"
                  class="flex items-center gap-3 group"
                  @click="mobileMenuOpen = false"
                >
                  <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d97759]/10 flex-shrink-0 group-hover:bg-[#d97759]/20 transition-colors">
                    <svg class="w-4 h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-neutral-900 group-hover:text-[#d97759] transition-colors">Marketing</div>
                    <div class="text-xs text-neutral-500">Boost your reach</div>
                  </div>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Other Links -->
          <NuxtLink 
            to="/contact"
            class="block px-4 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
            @click="mobileMenuOpen = false"
          >
            Contact
          </NuxtLink>
        </nav>

        <!-- Footer Actions -->
        <div class="px-6 py-4 border-t border-neutral-200 flex gap-3 bg-white">
          <NuxtLink 
            to="/login"
            class="flex-1 rounded-lg py-3 text-center text-sm font-semibold text-neutral-900 border-2 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
            @click="mobileMenuOpen = false"
          >
            Sign in
          </NuxtLink>
          <NuxtLink 
            to="/dashboard"
            class="flex-1 rounded-lg py-3 text-center text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all shadow-sm"
            @click="mobileMenuOpen = false"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const productsExpanded = ref(true)
const productsOpen = ref(false)
const searchQuery = ref('')
</script>
