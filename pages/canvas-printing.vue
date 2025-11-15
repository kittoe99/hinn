<template>
  <main class="min-h-screen bg-[#f9f8f6]">
    <!-- Create Your Canvas -->
    <section class="pt-20 pb-16 md:pt-32 md:pb-24 bg-white">
      <div class="mx-auto max-w-4xl px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="flex justify-center mb-4">
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d97759]/10">
              <svg class="h-5 w-5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.072 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.072 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.072-3.292a1 1 0 00-.364-1.118L4.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 mb-4">
            What do you want to create?
          </h2>
          <p class="text-lg text-neutral-600">
            Generate with AI or upload your own image. No design skills needed.
          </p>
        </div>

        <div class="bg-[#f9f8f6] rounded-2xl border border-neutral-200 p-6 md:p-8">
          <!-- Tabs -->
          <div class="flex gap-2 mb-6 border-b border-neutral-200">
            <button
              @click="activeTab = 'generate'"
              :class="[
                'px-4 py-2 text-sm font-medium transition-colors relative',
                activeTab === 'generate' ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
              ]"
            >
              Generate with AI
              <span v-if="activeTab === 'generate'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"></span>
            </button>
            <button
              @click="activeTab = 'upload'"
              :class="[
                'px-4 py-2 text-sm font-medium transition-colors relative',
                activeTab === 'upload' ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
              ]"
            >
              Upload Image
              <span v-if="activeTab === 'upload'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"></span>
            </button>
          </div>

          <!-- Generate Tab -->
          <div v-if="activeTab === 'generate'" class="space-y-4">
            <div class="relative">
              <textarea
                v-model="prompt"
                placeholder="Describe what you want to create... (e.g., 'A serene mountain landscape at sunset with vibrant colors')"
                rows="4"
                class="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-transparent resize-none"
              ></textarea>
              <div class="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  class="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  title="Add image reference"
                >
                  <svg class="h-5 w-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
                <button
                  @click="generateImage"
                  :disabled="!prompt.trim()"
                  class="p-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Generate"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Quick Prompts -->
            <div class="relative">
              <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                <button
                  v-for="example in promptExamples"
                  :key="example"
                  @click="prompt = example"
                  class="flex-shrink-0 px-4 py-2 text-sm bg-white border border-neutral-200 rounded-lg hover:border-[#d97759] hover:bg-[#d97759]/5 transition-colors snap-start whitespace-nowrap"
                >
                  {{ example }}
                </button>
              </div>
            </div>
          </div>

          <!-- Upload Tab -->
          <div v-if="activeTab === 'upload'" class="space-y-4">
            <div
              @click="triggerFileUpload"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
              class="relative border-2 border-dashed border-neutral-300 rounded-xl p-12 text-center hover:border-[#d97759] hover:bg-[#d97759]/5 transition-all cursor-pointer"
            >
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                class="hidden"
              />
              <div class="flex flex-col items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97759]/10">
                  <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-neutral-900 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p class="text-xs text-neutral-600">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
              <div v-if="uploadedFile" class="mt-4 text-sm text-neutral-700">
                Selected: <span class="font-medium">{{ uploadedFile.name }}</span>
              </div>
            </div>
            
            <button
              @click="proceedWithUpload"
              :disabled="!uploadedFile"
              class="w-full py-3 px-4 rounded-lg bg-neutral-900 text-white font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue with Upload
            </button>
          </div>
        </div>

        <!-- Canvas Showcase -->
        <div class="mt-16">
          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 mb-2">
              Canvas showcase
            </h3>
            <p class="text-base text-neutral-600">
              Explore stunning examples of canvas prints
            </p>
          </div>

        <!-- Canvas Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <!-- Canvas frame wrapper -->
          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <!-- Canvas border effect -->
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    :src="heroImg"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <!-- Canvas depth effect -->
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">24" × 36"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">18" × 24"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">12" × 16"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">18" × 24"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">24" × 36"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">30" × 40"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">16" × 20"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">18" × 24"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">20" × 30"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">16" × 20"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">12" × 16"</p>
          </div>

          <div class="group cursor-pointer">
            <div class="relative bg-white p-3 shadow-lg hover:shadow-xl transition-all">
              <div class="relative border-4 border-neutral-800 overflow-hidden">
                <div class="aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"
                    alt="Canvas print"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div class="absolute inset-0 pointer-events-none shadow-inner"></div>
            </div>
            <p class="text-xs text-center text-neutral-600 mt-2">18" × 24"</p>
          </div>
        </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import heroImg from '~/assets/wps-canvas.png'

// Interactive section state
const activeTab = ref('generate')
const prompt = ref('')
const uploadedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const promptExamples = [
  'Abstract geometric patterns',
  'Minimalist mountain landscape',
  'Vibrant sunset over ocean',
  'Modern art with bold colors'
]

const generateImage = () => {
  if (!prompt.value.trim()) return
  // TODO: Integrate with AI image generation API
  console.log('Generating image with prompt:', prompt.value)
  // Navigate to dashboard or show generation UI
  navigateTo('/dashboard')
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadedFile.value = target.files[0]
  }
}

const handleFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    uploadedFile.value = event.dataTransfer.files[0]
  }
}

const proceedWithUpload = () => {
  if (!uploadedFile.value) return
  // TODO: Handle file upload and navigate to canvas customization
  console.log('Proceeding with file:', uploadedFile.value.name)
  navigateTo('/dashboard')
}

useHead({
  title: 'Canvas Printing',
  meta: [
    {
      name: 'description',
      content:
        'Turn images into gallery‑quality canvas prints with WPS Canvas. Upload or generate images and print on premium canvas. Fast delivery.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Canvas Printing | WPS Canvas' },
    {
      property: 'og:description',
      content:
        'Turn images into gallery‑quality canvas prints with WPS Canvas. Upload or generate images and print on premium canvas. Fast delivery.'
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Canvas Printing | WPS Canvas' },
    {
      name: 'twitter:description',
      content:
        'Turn images into gallery‑quality canvas prints with WPS Canvas. Upload or generate images and print on premium canvas. Fast delivery.'
    }
  ]
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
