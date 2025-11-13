<template>
  <div class="min-h-screen bg-[#f9f8f6] flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-md bg-[#e8e3d8] rounded-2xl p-8 space-y-6">
      <div class="space-y-2">
        <h1 class="text-3xl font-medium tracking-tight text-neutral-900">Create your account</h1>
        <p class="text-base text-neutral-600">Get started with WPS Canvas in just a few steps.</p>
      </div>

      <!-- Error/Success Messages -->
      <div v-if="error" class="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
        {{ error }}
      </div>
      <div v-if="success" class="text-sm text-neutral-900 bg-[#d97759]/10 border border-[#d97759]/20 rounded-lg px-4 py-3">
        {{ success }}
      </div>

      <!-- Google Sign Up -->
      <button
        @click="signUpWithGoogle"
        :disabled="loading"
        class="w-full inline-flex items-center justify-center gap-3 rounded-lg border border-neutral-300 px-4 py-3 bg-white hover:bg-neutral-50 disabled:opacity-60 transition-colors shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="h-5 w-5">
          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.676 32.66 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.161 7.957 3.043l5.657-5.657C34.869 6.053 29.729 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.36 16.108 18.81 12 24 12c3.059 0 5.842 1.161 7.957 3.043l5.657-5.657C34.869 6.053 29.729 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.22 35.461 26.751 36 24 36c-5.202 0-9.668-3.356-11.292-8.063l-6.545 5.036C9.454 39.556 16.13 44 24 44z"/>
          <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.353 3.577-4.806 6-8.303 6-5.202 0-9.668-3.356-11.292-8.063l-6.545 5.036C9.454 39.556 16.13 44 24 44c8.822 0 16.254-5.986 18.611-14.083A19.936 19.936 0 0044 24c0-1.341-.138-2.65-.389-3.917z"/>
        </svg>
        <span class="text-sm font-medium text-neutral-900">{{ loading ? 'Creating account...' : 'Continue with Google' }}</span>
      </button>

      <!-- Divider -->
      <div class="relative py-2">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-neutral-200" />
        </div>
        <div class="relative flex justify-center text-xs">
          <span class="bg-white px-3 text-neutral-500">or sign up with email</span>
        </div>
      </div>

      <!-- Email/Password Form -->
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="firstName" class="block text-sm font-medium text-neutral-900 mb-1.5">First name</label>
            <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              required
              class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
              placeholder="John"
            />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-neutral-900 mb-1.5">Last name</label>
            <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              required
              class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-neutral-900 mb-1.5">Email address</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-neutral-900 mb-1.5">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            minlength="8"
            class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
            placeholder="••••••••"
          />
          <p class="mt-1.5 text-xs text-neutral-500">Must be at least 8 characters</p>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-neutral-900 mb-1.5">Confirm password</label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            required
            class="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-start">
          <input
            id="terms"
            v-model="formData.agreeToTerms"
            type="checkbox"
            required
            class="mt-1 h-4 w-4 border-neutral-300 text-neutral-900 focus:ring-neutral-900"
          />
          <label for="terms" class="ml-2 text-sm text-neutral-600">
            I agree to the 
            <a href="#" class="text-neutral-900 hover:underline">Terms of Service</a> and 
            <a href="#" class="text-neutral-900 hover:underline">Privacy Policy</a>
          </label>
        </div>

        <button
          type="submit"
          :disabled="loading || !formData.agreeToTerms"
          class="w-full rounded-lg bg-neutral-900 text-white px-4 py-3 text-base font-medium disabled:opacity-60 hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-sm hover:shadow"
        >
          {{ loading ? 'Creating account...' : 'Create account' }}
        </button>
      </form>

      <!-- Login Link -->
      <div class="text-center text-sm text-neutral-600">
        Already have an account? 
        <NuxtLink to="/login" class="text-neutral-900 font-medium hover:underline">
          Sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Sign Up - WPS Canvas',
  meta: [
    { name: 'description', content: 'Create your WPS Canvas account' }
  ]
})

const router = useRouter()
const supabase = useSupabase()
const loading = ref(false)
const error = ref(null)
const success = ref(null)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const signUpWithGoogle = async () => {
  loading.value = true
  error.value = null
  success.value = null
  
  try {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    
    if (authError) {
      error.value = authError.message
      loading.value = false
    }
  } catch (err) {
    error.value = 'Failed to sign up with Google'
    loading.value = false
  }
}

const handleSignup = async () => {
  loading.value = true
  error.value = null
  success.value = null

  // Validation
  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }

  if (formData.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters'
    loading.value = false
    return
  }

  if (!formData.value.agreeToTerms) {
    error.value = 'You must agree to the terms and conditions'
    loading.value = false
    return
  }

  try {
    const { data, error: authError } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          first_name: formData.value.firstName,
          last_name: formData.value.lastName,
          full_name: `${formData.value.firstName} ${formData.value.lastName}`
        }
      }
    })

    if (authError) {
      error.value = authError.message
      loading.value = false
      return
    }

    if (data.session) {
      success.value = 'Account created successfully! Redirecting...'
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } else if (data.user && !data.session) {
      success.value = 'Account created! Please check your email to verify your account.'
      loading.value = false
    }
  } catch (err) {
    error.value = 'An error occurred during signup'
    loading.value = false
  }
}
</script>

