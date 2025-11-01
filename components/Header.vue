<template>
  <header class="border-b border-neutral-200 bg-white">
    <nav class="max-w-5xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="text-lg font-medium text-neutral-900">
          Hinn
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink 
            to="/website" 
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Website
          </NuxtLink>
          <NuxtLink 
            to="/agents" 
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Agents
          </NuxtLink>
          <NuxtLink 
            to="/marketing" 
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Marketing
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Contact
          </NuxtLink>
        </div>

        <!-- CTA -->
        <div class="hidden md:flex items-center gap-4">
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
          class="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          aria-label="Toggle menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="mobileMenuOpen"
        @click="mobileMenuOpen = false"
        class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
      />
    </Transition>

    <!-- Mobile Menu Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div 
        v-if="mobileMenuOpen"
        class="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-neutral-200">
          <span class="text-lg font-medium text-neutral-900">Menu</span>
          <button 
            @click="mobileMenuOpen = false"
            class="p-2 -m-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            aria-label="Close menu"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="p-6 space-y-1">
          <!-- Home -->
          <NuxtLink 
            to="/"
            class="block py-3 text-sm font-medium text-neutral-900 hover:text-[#d97759] transition-colors"
            @click="mobileMenuOpen = false"
          >
            Home
          </NuxtLink>
          <!-- Products Section -->
          <div class="mb-6">
            <button 
              @click="productsExpanded = !productsExpanded"
              class="flex items-center justify-between w-full py-3 text-sm font-medium text-neutral-900"
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
              <div v-if="productsExpanded" class="pl-4 mt-2 space-y-1 overflow-hidden">
                <NuxtLink 
                  to="/website"
                  class="flex items-center gap-3 py-3 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  @click="mobileMenuOpen = false"
                >
                  <svg class="w-5 h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <div>
                    <div class="font-medium text-neutral-900">Website</div>
                    <div class="text-xs text-neutral-500">Professional sites</div>
                  </div>
                </NuxtLink>
                <NuxtLink 
                  to="/agents"
                  class="flex items-center gap-3 py-3 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  @click="mobileMenuOpen = false"
                >
                  <svg class="w-5 h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
                  </svg>
                  <div>
                    <div class="font-medium text-neutral-900">AI Agents</div>
                    <div class="text-xs text-neutral-500">Automate tasks</div>
                  </div>
                </NuxtLink>
                <NuxtLink 
                  to="/marketing"
                  class="flex items-center gap-3 py-3 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  @click="mobileMenuOpen = false"
                >
                  <svg class="w-5 h-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                  </svg>
                  <div>
                    <div class="font-medium text-neutral-900">Marketing</div>
                    <div class="text-xs text-neutral-500">Boost your reach</div>
                  </div>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Other Links -->
          <NuxtLink 
            to="/contact"
            class="block py-3 text-sm font-medium text-neutral-900 hover:text-[#d97759] transition-colors"
            @click="mobileMenuOpen = false"
          >
            Contact
          </NuxtLink>
        </nav>

        <!-- Footer Actions -->
        <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-200 bg-white space-y-3">
          <NuxtLink 
            to="/login"
            class="block w-full rounded-lg py-3 text-center text-sm font-medium text-neutral-900 border border-neutral-200 hover:bg-neutral-50 transition-colors"
            @click="mobileMenuOpen = false"
          >
            Sign in
          </NuxtLink>
          <NuxtLink 
            to="/dashboard"
            class="block w-full rounded-lg py-3 text-center text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm"
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
const mobileMenuOpen = ref(false)
const productsExpanded = ref(false)
</script>
