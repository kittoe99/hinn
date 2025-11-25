<template>
  <main class="min-h-screen bg-[#f9f8f6]">
    <!-- Hero Section -->
    <section class="relative -mt-6 pt-0 pb-12 md:mt-0 md:pt-6 md:pb-20 bg-[#f9f8f6] overflow-hidden">
      <div class="relative mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <div v-if="!showResults">
          <!-- SVG Pattern Background -->
          <div class="absolute left-0 top-0 w-full h-[280px] md:h-[330px] pointer-events-none">
            <div class="relative w-full h-full">
              <div class="absolute inset-0 mx-auto w-[85%] md:w-[60%] h-full flex items-start justify-center overflow-hidden">
                <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="heroDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="2" fill="#f4cdb4" opacity="0.5" />
                    </pattern>
                  </defs>
                  <rect width="1200" height="400" fill="url(#heroDots)" opacity="0.4" />
                  <g fill="none" stroke="#efc2a9" stroke-width="1.6" opacity="0.65">
                    <path d="M-150 260 Q 150 40 540 200 T 1080 190" />
                    <path d="M80 100 Q 80 20 160 20 H440" opacity="0.5" />
                    <circle cx="540" cy="210" r="110" opacity="0.45" />
                    <circle cx="540" cy="210" r="70" opacity="0.35" />
                    <line x1="220" y1="40" x2="500" y2="220" opacity="0.4" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <!-- Hero text -->
          <div class="relative z-10 text-center pt-24 md:pt-32 pb-8">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mb-4 leading-tight">
              Turn Your Ideas Into
              <span class="block text-[#d97759]">Stunning Canvas Art</span>
            </h1>
            <p class="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
              Generate with AI or upload your own image. Transform any vision into
              <span class="font-semibold text-neutral-900"> gallery-quality canvas prints</span> in minutes.
            </p>
          </div>
        </div>

        <div v-if="!showResults" class="relative bg-white rounded-xl border border-neutral-200 p-4 md:p-6 lg:p-8 shadow-sm">
          <!-- Tabs -->
          <div class="relative flex gap-1 md:gap-2 mb-6 md:mb-8 p-1 bg-neutral-50 rounded-lg w-full md:w-fit border border-neutral-200">
            <button
              @click="activeTab = 'generate'"
              :class="[
                'flex-1 md:flex-none px-3 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold transition-all duration-200 rounded-lg relative',
                activeTab === 'generate' 
                  ? 'bg-white text-neutral-900 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              ]"
            >
              <span class="relative z-10 flex items-center justify-center gap-1.5 md:gap-2">
                <svg class="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="whitespace-nowrap">Generate with AI</span>
              </span>
            </button>
            <button
              @click="activeTab = 'upload'"
              :class="[
                'flex-1 md:flex-none px-3 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold transition-all duration-200 rounded-lg relative',
                activeTab === 'upload' 
                  ? 'bg-white text-neutral-900 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              ]"
            >
              <span class="relative z-10 flex items-center justify-center gap-1.5 md:gap-2">
                <svg class="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span class="whitespace-nowrap">Upload Image</span>
              </span>
            </button>
          </div>

          <!-- Generate Tab -->
          <div v-if="activeTab === 'generate'" class="relative space-y-6">
            <div class="relative group">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-[#d97759] to-[#c46a4f] rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition duration-300"></div>
              <textarea
                v-model="prompt"
                placeholder="Describe your vision... (e.g., 'A serene mountain landscape at sunset with vibrant colors and dramatic clouds')"
                rows="5"
                class="relative w-full px-5 py-4 bg-white border border-neutral-200 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#d97759] focus:ring-2 focus:ring-[#d97759]/10 resize-none transition-all duration-300 text-base"
              ></textarea>
              <div class="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  class="p-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 group/btn"
                  title="Add image reference"
                >
                  <svg class="h-5 w-5 text-neutral-500 group-hover/btn:text-neutral-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
                <button
                  @click="generateImage"
                  :disabled="!prompt.trim()"
                  class="px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  title="Generate"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Generate
                </button>
              </div>
            </div>
            
            <!-- Quick Prompts -->
            <div class="relative">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h4 class="text-sm font-semibold text-neutral-900 mb-0.5">Quick start ideas</h4>
                  <p class="text-xs text-neutral-500">Click any prompt to get started instantly</p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="scrollQuickIdeas('left')"
                    class="h-8 w-8 flex items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
                    aria-label="Scroll ideas left"
                  >
                    <svg class="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    @click="scrollQuickIdeas('right')"
                    class="h-8 w-8 flex items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
                    aria-label="Scroll ideas right"
                  >
                    <svg class="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                ref="quickIdeasRef"
                class="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory"
              >
                <button
                  v-for="example in promptExamples"
                  :key="example.label"
                  type="button"
                  @click="prompt = example.label"
                  class="group flex-shrink-0 snap-start w-44 md:w-52 text-left"
                >
                  <div class="relative rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 group-hover:border-[#d97759] transition-all duration-200">
                    <div class="relative aspect-[4/3]">
                      <img
                        :src="example.image"
                        :alt="example.label"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div class="flex items-center gap-1.5 text-xs font-semibold">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Try this prompt
                      </div>
                    </div>
                  </div>
                  <p class="mt-2 text-xs md:text-sm font-medium text-neutral-700 group-hover:text-[#d97759] transition-colors line-clamp-2">
                    {{ example.label }}
                  </p>
                </button>
              </div>
            </div>
          </div>

          <!-- Upload Tab -->
          <div v-if="activeTab === 'upload'" class="relative space-y-6">
            <div
              @click="triggerFileUpload"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
              class="group relative border-2 border-dashed border-neutral-300 rounded-xl p-16 text-center hover:border-[#d97759] hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
            >
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                class="hidden"
              />
              <div class="flex flex-col items-center gap-5">
                <div class="relative">
                  <div class="flex h-16 w-16 items-center justify-center rounded-lg bg-[#d97759]/10 group-hover:bg-[#d97759]/20 transition-colors">
                    <svg class="h-8 w-8 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="text-base font-semibold text-neutral-900 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p class="text-sm text-neutral-600 mb-1">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                  <p class="text-xs text-neutral-500">
                    High resolution images work best
                  </p>
                </div>
              </div>
              <div v-if="uploadedFile" class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">{{ uploadedFile.name }}</span>
              </div>
            </div>
            
            <button
              @click="proceedWithUpload"
              :disabled="!uploadedFile"
              class="w-full py-3 px-6 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue with Upload</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Results View -->
        <div v-if="showResults" class="relative pt-8 md:pt-12 space-y-8">
          <div class="flex items-center justify-between">
            <button
              @click="closeResults"
              class="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to prompt
            </button>
            <div v-if="!isLoading" class="text-sm text-neutral-500">
              <span class="font-semibold text-neutral-900">{{ generatedImages.length }}</span> variations generated
            </div>
          </div>

          <!-- Error State -->
          <div v-if="generationError" class="flex flex-col items-center justify-center py-12 space-y-4">
            <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="text-center space-y-2 max-w-md">
              <h3 class="text-lg font-semibold text-neutral-900">Generation Failed</h3>
              <p class="text-sm text-neutral-600">{{ generationError }}</p>
            </div>
            <button
              @click="closeResults"
              class="px-6 py-2.5 rounded-xl bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-colors"
            >
              Try Again
            </button>
          </div>

          <!-- Loading State -->
          <div v-else-if="isLoading">
            <div class="flex flex-col items-center justify-center py-8 space-y-4">
              <div class="relative">
                <div class="w-16 h-16 relative">
                  <div class="absolute inset-0 rounded-full border-4 border-[#d97759]/20"></div>
                  <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-[#d97759] animate-spin"></div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-7 h-7 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div class="text-center space-y-1">
                <h3 class="text-lg md:text-xl font-semibold text-neutral-900">Generating your canvases</h3>
                <p class="text-sm text-neutral-600">
                  Crafting {{ generatedImages.length }} unique variations...
                </p>
              </div>

              <div class="flex gap-2">
                <div class="w-2 h-2 rounded-full bg-[#d97759] animate-pulse"></div>
                <div class="w-2 h-2 rounded-full bg-[#d97759] animate-pulse" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 rounded-full bg-[#d97759] animate-pulse" style="animation-delay: 0.4s"></div>
              </div>
            </div>

            <!-- Skeleton loading grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              <div
                v-for="(_, index) in generatedImages"
                :key="`skeleton-${index}`"
                class="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 animate-pulse"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          <!-- Generated Images Grid -->
          <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            <button
              v-for="(image, index) in generatedImages"
              :key="`${image.label}-${index}`"
              @click="toggleImageSelection(index)"
              :class="[
                'relative aspect-square rounded-2xl overflow-hidden transition-all duration-500',
                revealedImages.includes(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                selectedImages.includes(index)
                  ? 'ring-4 ring-[#d97759] shadow-xl' 
                  : 'ring-1 ring-neutral-200 hover:ring-2 hover:ring-neutral-300 hover:scale-[0.99] shadow-md'
              ]"
            >
              <img 
                :src="image.src" 
                :alt="image.label" 
                class="w-full h-full object-cover" 
              />
              <div v-if="selectedImages.includes(index)" class="absolute inset-0 bg-[#d97759]/10 flex items-center justify-center">
                <div class="h-8 w-8 rounded-full bg-[#d97759] flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Fixed Bottom Bar -->
        <div v-if="showResults && !isLoading" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
          <div class="relative bg-white rounded-2xl border border-neutral-200 shadow-2xl p-4">
            <div class="flex flex-col lg:flex-row gap-4 items-stretch">
              <!-- Selected images preview or prompt input -->
              <div class="flex-1 relative">
                <div v-if="selectedImages.length > 0" class="p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <div class="flex items-center justify-between mb-3">
                    <div>
                      <p class="text-xs font-semibold text-[#d97759] uppercase tracking-wide">Selected Canvases</p>
                      <p class="text-xs text-neutral-500 mt-0.5">{{ selectedImages.length }} {{ selectedImages.length === 1 ? 'canvas' : 'canvases' }} selected</p>
                    </div>
                    <button
                      @click="selectedImages = []"
                      class="p-2 hover:bg-neutral-200 rounded-lg transition-colors flex-shrink-0"
                      aria-label="Clear all selections"
                    >
                      <svg class="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    <div v-for="imgIndex in selectedImages" :key="imgIndex" class="relative flex-shrink-0">
                      <div class="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-[#d97759]">
                        <img
                          :src="generatedImages[imgIndex].src"
                          :alt="generatedImages[imgIndex].label"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        @click="toggleImageSelection(imgIndex)"
                        class="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                        aria-label="Remove from selection"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="relative group">
                  <div class="absolute -inset-0.5 bg-gradient-to-r from-[#d97759] to-[#c46a4f] rounded-xl opacity-0 group-focus-within:opacity-20 blur transition duration-300"></div>
                  <textarea
                    v-model="prompt"
                    placeholder="Refine your prompt or try a new one..."
                    rows="2"
                    class="relative w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#d97759] focus:ring-2 focus:ring-[#d97759]/10 resize-none transition-all duration-300 text-sm"
                  ></textarea>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="flex flex-row lg:flex-col gap-2 lg:min-w-[180px]">
                <button
                  @click="generateImage"
                  :disabled="!prompt.trim()"
                  class="flex-1 lg:flex-none px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Generate More
                </button>
                <button class="flex-1 lg:flex-none px-4 py-2.5 rounded-lg border border-neutral-900 text-neutral-900 font-medium hover:bg-neutral-900 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Canvas Showcase -->
        <div v-if="!showResults" class="mt-32 relative">
          <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Header with gradient background -->
            <div class="relative overflow-hidden rounded-xl bg-white border border-neutral-200 p-8 md:p-12 mb-12">
              <div
                class="absolute inset-0 opacity-20"
                style="background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80'); background-size: cover; background-position: center"
              />
              
              <div class="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div class="flex-1">
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d97759]/10 border border-[#d97759]/20 mb-4">
                    <svg class="w-4 h-4 text-[#d97759]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-xs font-semibold text-[#d97759] uppercase tracking-wider">Community Gallery</span>
                  </div>
                  <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-3">
                    Featured Canvas Prints
                  </h3>
                  <p class="text-base md:text-lg text-neutral-600 max-w-2xl">
                    Discover stunning creations from our community of artists and designers. Get inspired for your next masterpiece.
                  </p>
                </div>
                <button class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium transition-colors whitespace-nowrap">
                  <span>View All Prints</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Canvas Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="(canvas, index) in showcaseCanvases"
            :key="index"
            class="group cursor-pointer"
          >
            <div class="relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div class="aspect-[4/5] relative">
                <img
                  :src="canvas.src"
                  :alt="`Canvas print by ${canvas.artist}`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Hover content -->
                <div class="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div class="flex items-center justify-between text-white mb-3">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-xs font-semibold">
                        {{ canvas.artist.charAt(0) }}
                      </div>
                      <span class="text-sm font-medium">{{ canvas.artist }}</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-sm">
                      <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                      </svg>
                      <span class="font-medium">{{ canvas.likes }}</span>
                    </div>
                  </div>
                  <button class="w-full py-2.5 px-4 rounded-xl bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 transition-colors">
                    View Print
                  </button>
                </div>

                <!-- Size badge -->
                <div class="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm border border-neutral-200 text-xs font-semibold text-neutral-700">
                  {{ canvas.size }}
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// Interactive section state
const activeTab = ref('generate')
const prompt = ref('')
const uploadedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const showResults = ref(false)
const selectedImages = ref<number[]>([])
const isLoading = ref(false)
const revealedImages = ref<number[]>([])
const quickIdeasRef = ref<HTMLDivElement | null>(null)

const promptExamples = [
  {
    label: 'Abstract geometric patterns',
    image: '/assets/wps-canvas.png',
  },
  {
    label: 'Minimalist mountain landscape',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Vibrant sunset over ocean',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Modern art with bold colors',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Black & white city skyline',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Cozy living room gallery wall',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Minimal line art portrait',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Soft pastel landscape',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80',
  },
]

const generatedImages = ref<Array<{ src: string; label: string; id?: string }>>([])
const generationError = ref<string | null>(null)

const showcaseCanvases = [
  { src: '/assets/wps-canvas.png', size: '24" × 36"', artist: 'Sarah M.', likes: 234 },
  { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80', size: '18" × 24"', artist: 'Alex K.', likes: 189 },
  { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80', size: '12" × 16"', artist: 'Jordan P.', likes: 156 },
  { src: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=400&q=80', size: '18" × 24"', artist: 'Taylor R.', likes: 201 },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80', size: '24" × 36"', artist: 'Morgan L.', likes: 278 },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', size: '30" × 40"', artist: 'Casey B.', likes: 312 },
]

const scrollQuickIdeas = (direction: 'left' | 'right') => {
  const container = quickIdeasRef.value
  if (!container) return
  const amount = direction === 'left' ? -200 : 200
  container.scrollBy({ left: amount, behavior: 'smooth' })
}

const generateImage = async () => {
  if (!prompt.value.trim()) return
  
  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  isLoading.value = true
  showResults.value = true
  revealedImages.value = []
  generationError.value = null
  generatedImages.value = []
  
  try {
    // Call the API to generate images
    const response = await $fetch('/api/canvas/generate', {
      method: 'POST',
      body: {
        prompt: prompt.value,
        numberOfImages: 10,
        aspectRatio: '1:1',
      },
    })
    
    if (response.success && response.images) {
      // Map API response to match our image format (url -> src)
      generatedImages.value = response.images.map((img: any) => ({
        src: img.url,
        label: img.label,
        id: img.id,
      }))
      
      // Wait a moment then reveal images with stagger
      setTimeout(() => {
        isLoading.value = false
        // Stagger reveal each image
        response.images.forEach((_: any, index: number) => {
          setTimeout(() => {
            revealedImages.value = [...revealedImages.value, index]
          }, index * 100) // 100ms delay between each image
        })
      }, 500)
    } else {
      throw new Error('No images were generated')
    }
  } catch (error: any) {
    console.error('Error generating images:', error)
    isLoading.value = false
    generationError.value = error.data?.statusMessage || error.message || 'Failed to generate images. Please try again.'
    
    // Show error for 5 seconds then hide results
    setTimeout(() => {
      showResults.value = false
      generationError.value = null
    }, 5000)
  }
}

const closeResults = () => {
  showResults.value = false
  isLoading.value = false
  revealedImages.value = []
  selectedImages.value = []
}

const toggleImageSelection = (index: number) => {
  if (selectedImages.value.includes(index)) {
    selectedImages.value = selectedImages.value.filter(i => i !== index)
  } else {
    selectedImages.value = [...selectedImages.value, index]
  }
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

/* Shimmer animation for loading skeleton */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
