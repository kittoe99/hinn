<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md rounded-3xl border border-soft bg-white p-6 sm:p-8 space-y-5">
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold tracking-tight text-primary">Welcome back</h1>
        <p class="text-sm text-secondary">Sign in to your account to continue.</p>
      </div>

      <!-- Error/Success Messages -->
      <div v-if="error" class="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
        {{ error }}
      </div>
      <div v-if="success" class="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
        {{ success }}
      </div>

      <!-- Google Sign In -->
      <button
        @click="signInWithGoogle"
        :disabled="loading"
        class="w-full inline-flex items-center justify-center gap-3 rounded-full border border-neutral-300 px-4 py-3 bg-white hover:bg-neutral-50 disabled:opacity-60 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="h-5 w-5">
          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.676 32.66 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.161 7.957 3.043l5.657-5.657C34.869 6.053 29.729 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.36 16.108 18.81 12 24 12c3.059 0 5.842 1.161 7.957 3.043l5.657-5.657C34.869 6.053 29.729 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.22 35.461 26.751 36 24 36c-5.202 0-9.668-3.356-11.292-8.063l-6.545 5.036C9.454 39.556 16.13 44 24 44z"/>
          <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.353 3.577-4.806 6-8.303 6-5.202 0-9.668-3.356-11.292-8.063l-6.545 5.036C9.454 39.556 16.13 44 24 44c8.822 0 16.254-5.986 18.611-14.083A19.936 19.936 0 0044 24c0-1.341-.138-2.65-.389-3.917z"/>
        </svg>
        <span class="text-sm font-medium">{{ loading ? 'Signing in...' : 'Continue with Google' }}</span>
      </button>

      <!-- Divider -->
      <div class="relative py-2">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-neutral-200" />
        </div>
        <div class="relative flex justify-center text-xs">
          <span class="bg-white px-3 text-tertiary">or continue with email</span>
        </div>
      </div>

      <!-- Email/Password Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-primary mb-1.5">Email address</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-soft focus:border-accent-primary transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label for="password" class="block text-sm font-medium text-primary">Password</label>
            <a href="#" class="text-xs text-accent-primary hover:underline">Forgot password?</a>
          </div>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-soft focus:border-accent-primary transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-center">
          <input
            id="remember"
            v-model="formData.remember"
            type="checkbox"
            class="h-4 w-4 rounded border-neutral-300 text-accent-primary focus:ring-accent-soft"
          />
          <label for="remember" class="ml-2 text-sm text-secondary">Remember me</label>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-full bg-accent-primary text-white px-4 py-3 text-sm font-semibold disabled:opacity-60 hover:bg-accent-focus transition-colors focus:outline-none focus:ring-2 focus:ring-accent-soft focus:ring-offset-2"
        >
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <!-- Sign Up Link -->
      <div class="text-center text-sm text-secondary">
        Don't have an account? 
        <NuxtLink to="/signup" class="text-accent-primary font-medium hover:underline">
          Sign up
        </NuxtLink>
      </div>

      <!-- Terms -->
      <p class="text-xs text-tertiary text-center">
        By continuing, you agree to our 
        <a href="#" class="underline hover:text-secondary">Terms of Service</a> and 
        <a href="#" class="underline hover:text-secondary">Privacy Policy</a>.
      </p>
    </div>
  </div>
</template>

<script setup>
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

const signInWithGoogle = () => {
  loading.value = true
  error.value = null
  success.value = null
  
  // In production, this would integrate with your auth provider
  setTimeout(() => {
    alert('Google Sign-In would be integrated here.\n\nIn production, this connects to your authentication service (Supabase, Auth0, etc.)')
    loading.value = false
  }, 1000)
}

const handleLogin = () => {
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
  setTimeout(() => {
    // In production, this would call your auth API
    if (formData.value.email && formData.value.password) {
      success.value = 'Login successful! Redirecting...'
      
      setTimeout(() => {
        // In production: navigateTo('/dashboard')
        alert('Login successful!\n\nIn production, you would be redirected to your dashboard.')
        loading.value = false
      }, 1000)
    } else {
      error.value = 'Invalid email or password'
      loading.value = false
    }
  }, 1000)
}
</script>
