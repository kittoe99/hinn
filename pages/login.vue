<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-20">
    <div class="w-full max-w-md">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">Sign in</h1>
        <p class="mt-4 text-base text-neutral-600">Welcome back to Hinn</p>
      </div>

      <div class="space-y-6">

        <!-- Error/Success Messages -->
        <div v-if="error" class="text-sm text-red-900 bg-red-50 border border-red-200 px-4 py-3">
          {{ error }}
        </div>
        <div v-if="success" class="text-sm text-green-900 bg-green-50 border border-green-200 px-4 py-3">
          {{ success }}
        </div>

        <!-- Google Sign In -->
        <button
          @click="signInWithGoogle"
          :disabled="loading"
          class="w-full inline-flex items-center justify-center gap-3 border border-neutral-200 px-4 py-3 bg-white hover:bg-neutral-50 disabled:opacity-60 transition-colors text-sm font-medium text-neutral-900"
        >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="h-5 w-5">
          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.676 32.66 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.161 7.957 3.043l5.657-5.657C34.869 6.053 29.729 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.36 16.108 18.81 12 24 12c3.059 0 5.842 1.161 7.957 3.043l5.657-5.657C34.869 6.053 29.729 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.22 35.461 26.751 36 24 36c-5.202 0-9.668-3.356-11.292-8.063l-6.545 5.036C9.454 39.556 16.13 44 24 44z"/>
          <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.353 3.577-4.806 6-8.303 6-5.202 0-9.668-3.356-11.292-8.063l-6.545 5.036C9.454 39.556 16.13 44 24 44c8.822 0 16.254-5.986 18.611-14.083A19.936 19.936 0 0044 24c0-1.341-.138-2.65-.389-3.917z"/>
        </svg>
          {{ loading ? 'Signing in...' : 'Continue with Google' }}
        </button>

        <!-- Divider -->
        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-neutral-200" />
          </div>
          <div class="relative flex justify-center text-xs">
            <span class="bg-white px-3 text-neutral-500">or continue with email</span>
          </div>
        </div>

        <!-- Email/Password Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-neutral-900 mb-2">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-sm font-medium text-neutral-900">Password</label>
              <a href="#" class="text-sm text-neutral-600 hover:text-neutral-900 underline">Forgot?</a>
            </div>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-neutral-900 text-white px-4 py-3 text-sm font-medium disabled:opacity-60 hover:bg-neutral-800 transition-colors"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

      </div>

      <!-- Sign Up Link -->
      <div class="mt-8 text-center text-sm text-neutral-600">
        Don't have an account? 
        <NuxtLink to="/signup" class="text-neutral-900 font-medium underline hover:no-underline">
          Sign up
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getSupabaseClient } from '~/lib/supabaseClient'
useHead({
  title: 'Login - Hinn',
  meta: [
    { name: 'description', content: 'Sign in to your Hinn account' }
  ]
})

const loading = ref(false)
const error = ref(null)
const success = ref(null)

const formData = ref({
  email: '',
  password: '',
  remember: false
})

const signInWithGoogle = async () => {
  loading.value = true
  error.value = null
  success.value = null
  
  // In production, this would integrate with your auth provider
  try {
    const supabase = getSupabaseClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: typeof window !== 'undefined' ? window.location.origin + '/dashboard' : undefined }
    })
  } catch (e) {
    error.value = e?.message || 'Failed to start Google sign-in'
    loading.value = false
  }
}

const handleLogin = async () => {
  loading.value = true
  error.value = null
  success.value = null

  // Basic validation
  if (!formData.value.email || !formData.value.password) {
    error.value = 'Please fill in all fields'
    loading.value = false
    return
  }

  // Simulate login
  try {
    const supabase = getSupabaseClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password
    })
    if (authError) {
      error.value = authError.message
      loading.value = false
      return
    }
    success.value = 'Login successful! Redirecting...'
    await navigateTo('/dashboard')
  } catch (e) {
    error.value = e?.message || 'Login failed'
    loading.value = false
  }
}
</script>
