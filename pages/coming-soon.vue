<template>
  <div class="min-h-screen bg-gradient-to-br from-[#fdf6e6] via-[#fefbf3] to-[#fdf6e6] flex items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      <!-- Main Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-[#d97759]/20">
        <!-- Logo/Brand -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d97759] to-[#c86648] mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-3">
            Coming Soon
          </h1>
          <p class="text-lg text-neutral-600">
            Something amazing is on the way
          </p>
        </div>

        <!-- Description -->
        <div class="mb-8 text-center">
          <p class="text-neutral-700 leading-relaxed mb-4">
            We're working hard to bring you an incredible experience. Our platform is currently in private beta and available only to registered users.
          </p>
          <p class="text-neutral-600 text-sm">
            Want early access? Sign in with your account to get started.
          </p>
        </div>

        <!-- Sign In Button -->
        <div class="flex flex-col gap-4">
          <button
            @click="signIn"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-[#d97759] to-[#c86648] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <span v-if="!loading">Sign In to Access</span>
            <span v-else>Loading...</span>
          </button>

          <!-- Error Message -->
          <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-800 text-center">{{ error }}</p>
          </div>
        </div>

        <!-- Features Preview -->
        <div class="mt-12 pt-8 border-t border-neutral-200">
          <h3 class="text-sm font-semibold text-neutral-700 text-center mb-6 uppercase tracking-wider">
            What's Inside
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#d97759]/10 mb-3">
                <svg class="w-6 h-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h4 class="font-semibold text-neutral-900 mb-1">Lightning Fast</h4>
              <p class="text-xs text-neutral-600">Build websites in minutes</p>
            </div>
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#d97759]/10 mb-3">
                <svg class="w-6 h-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h4 class="font-semibold text-neutral-900 mb-1">AI Powered</h4>
              <p class="text-xs text-neutral-600">Smart design assistance</p>
            </div>
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#d97759]/10 mb-3">
                <svg class="w-6 h-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h4 class="font-semibold text-neutral-900 mb-1">Secure</h4>
              <p class="text-xs text-neutral-600">Enterprise-grade security</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 pt-6 border-t border-neutral-200 text-center">
          <p class="text-xs text-neutral-500">
            © 2024 Hinn. All rights reserved.
          </p>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute top-10 left-10 w-20 h-20 bg-[#d97759]/10 rounded-full blur-3xl -z-10"></div>
      <div class="absolute bottom-10 right-10 w-32 h-32 bg-[#d97759]/10 rounded-full blur-3xl -z-10"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const loading = ref(false)
const error = ref('')

// Redirect to login page
const signIn = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Redirect to login page
    await navigateTo('/login')
  } catch (err: any) {
    error.value = err.message || 'Failed to redirect to login'
    loading.value = false
  }
}

// Check if user is already logged in
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    // User is logged in, redirect to home
    await navigateTo('/')
  }
})

// Set page meta
definePageMeta({
  layout: false // No layout for coming soon page
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
