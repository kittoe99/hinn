<template>
  <main class="min-h-screen bg-[#f9f8f6]">
    <!-- Hero Section -->
    <section class="relative -mt-6 pt-0 pb-12 md:mt-0 md:pt-6 md:pb-20 bg-[#f9f8f6] overflow-hidden">
      <div class="relative mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
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
            Build Professional Websites
            <span class="block text-[#d97759]">Powered by AI</span>
          </h1>
          <p class="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            Describe your business and our AI builds a custom website—
            <span class="font-semibold text-neutral-900">complete with design, content, and SEO</span>.
          </p>
        </div>

        <!-- Main Content Card -->
        <div class="relative bg-white rounded-xl border border-neutral-200 p-4 md:p-6 lg:p-8 shadow-sm">
          <!-- Tabs -->
          <div class="relative flex gap-1 md:gap-2 mb-6 md:mb-8 p-1 bg-neutral-50 rounded-lg w-full md:w-fit border border-neutral-200">
            <button
              @click="activeTab = 'describe'"
              :class="[
                'flex-1 md:flex-none px-3 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold transition-all duration-200 rounded-lg relative',
                activeTab === 'describe' 
                  ? 'bg-white text-neutral-900 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              ]"
            >
              <span class="relative z-10 flex items-center justify-center gap-1.5 md:gap-2">
                <svg class="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="whitespace-nowrap">Describe Your Business</span>
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
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                </svg>
                <span class="whitespace-nowrap">Upload Files</span>
              </span>
            </button>
          </div>

          <!-- Describe Tab -->
          <div v-if="activeTab === 'describe'" class="relative space-y-6">
            <div>
              <label class="block text-sm font-semibold text-neutral-900 mb-3">
                Tell us about your business
              </label>
              <div class="relative">
                <textarea
                  v-model="businessDescription"
                  placeholder="E.g., I run a boutique coffee shop in downtown Seattle. We specialize in ethically sourced beans and offer a cozy atmosphere for remote workers..."
                  rows="6"
                  class="w-full px-4 py-3 pb-14 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#d97759] focus:ring-2 focus:ring-[#d97759]/10 resize-none transition-all text-sm"
                ></textarea>
                <button
                  @click="generateWebsite"
                  :disabled="!businessDescription.trim()"
                  class="absolute bottom-3 right-3 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
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
              <p class="text-xs text-neutral-500 mb-3">Quick start templates:</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="template in businessTemplates"
                  :key="template.title"
                  type="button"
                  @click="businessDescription = template.prompt"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 hover:border-[#d97759] hover:bg-[#d97759]/5 transition-colors text-xs font-medium text-neutral-700 hover:text-neutral-900"
                >
                  <svg class="h-3.5 w-3.5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="template.icon" />
                  </svg>
                  {{ template.title }}
                </button>
              </div>
            </div>
          </div>

          <!-- Upload Tab -->
          <div v-if="activeTab === 'upload'" class="relative space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-neutral-900 mb-2">Upload Website Files</h3>
              <p class="text-sm text-neutral-600 mb-6">
                Upload your existing website files or design assets to recreate or enhance your site
              </p>
            </div>

            <!-- Upload Options -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <button
                @click="triggerFileUpload(false)"
                class="group relative border-2 border-neutral-300 rounded-xl p-6 text-center hover:border-[#d97759] hover:bg-neutral-50 transition-all duration-200"
              >
                <div class="flex flex-col items-center gap-3">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#d97759]/10 group-hover:bg-[#d97759]/20 transition-colors">
                    <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-neutral-900">Upload Files</p>
                    <p class="text-xs text-neutral-600 mt-1">Select individual files</p>
                  </div>
                </div>
              </button>

              <button
                @click="triggerFileUpload(true)"
                class="group relative border-2 border-neutral-300 rounded-xl p-6 text-center hover:border-[#d97759] hover:bg-neutral-50 transition-all duration-200"
              >
                <div class="flex flex-col items-center gap-3">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#d97759]/10 group-hover:bg-[#d97759]/20 transition-colors">
                    <svg class="h-6 w-6 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-neutral-900">Upload Folder</p>
                    <p class="text-xs text-neutral-600 mt-1">Select entire directory</p>
                  </div>
                </div>
              </button>
            </div>

            <!-- Hidden file inputs -->
            <input
              ref="fileInput"
              type="file"
              multiple
              accept=".html,.htm,.css,.js,.json,.txt,.md,.svg,.png,.jpg,.jpeg,.gif,.webp"
              @change="handleFileSelect"
              class="hidden"
            />
            <input
              ref="folderInput"
              type="file"
              webkitdirectory
              directory
              multiple
              @change="handleFileSelect"
              class="hidden"
            />

            <!-- Drag and Drop Area -->
            <div
              @dragover.prevent
              @drop.prevent="handleFileDrop"
              class="group relative border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-[#d97759] hover:bg-neutral-50 transition-all duration-200"
            >
              <div class="flex flex-col items-center gap-3">
                <svg class="h-10 w-10 text-neutral-400 group-hover:text-[#d97759] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <div>
                  <p class="text-sm font-semibold text-neutral-900">Or drag and drop here</p>
                  <p class="text-xs text-neutral-600 mt-1">Files or folders supported</p>
                </div>
              </div>
              <div v-if="uploadedFiles.length > 0" class="mt-6 text-left">
                <p class="text-sm font-semibold text-neutral-900 mb-3">Uploaded files ({{ uploadedFiles.length }}):</p>
                <div class="max-h-40 overflow-y-auto space-y-1">
                  <div v-for="file in uploadedFiles.slice(0, 10)" :key="file.name" class="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 px-3 py-1.5 rounded">
                    <svg class="w-3.5 h-3.5 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span class="truncate">{{ file.name }}</span>
                  </div>
                  <p v-if="uploadedFiles.length > 10" class="text-xs text-neutral-500 px-3 py-1">
                    + {{ uploadedFiles.length - 10 }} more files
                  </p>
                </div>
              </div>
            </div>

            <button
              v-if="uploadedFiles.length > 0"
              @click="processUploadedFiles"
              class="w-full py-3 px-6 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Analyze & Recreate Website
            </button>

            <div class="text-center pt-4">
              <button
                @click="activeTab = 'describe'"
                class="inline-flex items-center gap-2 text-sm font-medium text-[#d97759] hover:text-[#c46a4f] transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to describe your business
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Website Showcase Section -->
    <section class="mt-32 relative">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="relative overflow-hidden rounded-xl bg-white border border-neutral-200 p-8 md:p-12 mb-12">
          <div
            class="absolute inset-0 opacity-20"
            style="background-image: url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=80'); background-size: cover; background-position: center"
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
                Featured Websites
              </h3>
              <p class="text-base md:text-lg text-neutral-600 max-w-2xl">
                Discover stunning websites from our community. Get inspired for your next project.
              </p>
            </div>
            <button class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium transition-colors whitespace-nowrap">
              <span>View All Sites</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Website Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div v-for="example in showcaseExamples" :key="example.title" class="group relative">
            <div class="relative rounded-lg overflow-hidden bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-300">
              <div class="aspect-[4/3] overflow-hidden bg-neutral-50 relative">
                <img 
                  :src="example.image" 
                  :alt="example.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div class="p-4">
                <h4 class="text-base font-semibold text-neutral-900 mb-1">{{ example.title }}</h4>
                <p class="text-sm text-neutral-600">{{ example.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('describe')
const businessDescription = ref('')
const uploadedFiles = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const folderInput = ref<HTMLInputElement | null>(null)
const uploadedFileStructure = ref<{path: string, file: File}[]>([])

const businessTemplates = [
  {
    title: 'Coffee Shop',
    desc: 'Cozy cafe with specialty coffee and pastries',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    prompt: `Build a professional website for my boutique coffee shop located in downtown Seattle.

Business Details:
- Name: Artisan Brew Coffee House
- Specialty: Ethically sourced, single-origin coffee beans and artisan pastries
- Atmosphere: Cozy, modern space designed for remote workers and students
- Services: Specialty coffee drinks, fresh pastries, free WiFi, comfortable seating
- Target Audience: Young professionals, students, coffee enthusiasts
- Unique Selling Points: Sustainable practices, local partnerships, community events

Website Requirements:
- Homepage with hero image of our cafe
- Menu page showcasing coffee drinks and food items
- About page highlighting our story and values
- Location and hours page with embedded map
- Contact form for catering inquiries
- Instagram feed integration
- Online ordering capability
- Warm, inviting color scheme with earthy tones`
  },
  {
    title: 'Fitness Studio',
    desc: 'Personal training and group fitness classes',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    prompt: `Create a modern, energetic website for my fitness studio.

Business Details:
- Name: Peak Performance Fitness
- Services: Personal training, yoga classes, HIIT workouts, nutrition coaching
- Location: Urban fitness center with state-of-the-art equipment
- Philosophy: Sustainable fitness, community support, all fitness levels welcome
- Target Audience: Health-conscious individuals aged 25-45
- Unique Features: Small group training, customized programs, certified trainers

Website Requirements:
- Dynamic homepage with class schedule
- Services page detailing all offerings
- Trainer profiles with certifications
- Class booking system integration
- Membership pricing tiers
- Success stories and testimonials
- Blog for fitness tips
- Contact and trial class signup
- Bold, energetic design with motivational imagery`
  },
  {
    title: 'Law Firm',
    desc: 'Professional legal services and consultation',
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    prompt: `Develop a professional, trustworthy website for our established law firm.

Business Details:
- Name: Sterling & Associates Law Firm
- Practice Areas: Family law, estate planning, business contracts, real estate law
- Experience: Over 20 years of combined legal experience
- Team: 5 attorneys, 3 paralegals
- Approach: Personalized service, client-focused solutions
- Target Clients: Individuals, families, small to medium businesses
- Values: Integrity, expertise, compassionate representation

Website Requirements:
- Professional homepage establishing credibility
- Practice areas with detailed descriptions
- Attorney profiles with credentials and experience
- Case results and client testimonials
- Resources and FAQ section
- Secure contact form for consultations
- Blog for legal insights
- Appointment scheduling system
- Professional, conservative design with navy and gold accents`
  },
  {
    title: 'E-commerce Store',
    desc: 'Online retail with product catalog',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    prompt: `Build a beautiful e-commerce website for my handcrafted jewelry business.

Business Details:
- Name: Artisan Gems & Crafts
- Products: Handcrafted jewelry, accessories, unique pieces
- Materials: Sustainable, ethically sourced materials
- Shipping: Worldwide with eco-friendly packaging
- Brand: Unique, artisan, sustainable, one-of-a-kind pieces
- Target Market: Conscious consumers, gift shoppers, jewelry enthusiasts
- Price Range: Mid to high-end artisan jewelry

Website Requirements:
- Stunning homepage with featured collections
- Product catalog with filtering and search
- Individual product pages with multiple images
- Shopping cart and secure checkout
- Customer account creation
- Order tracking system
- About page telling the artisan story
- Sustainability and materials information
- Customer reviews and ratings
- Gift wrapping options
- Newsletter signup
- Elegant, clean design showcasing the jewelry`
  }
]

const triggerFileUpload = (isFolder: boolean) => {
  if (isFolder) {
    folderInput.value?.click()
  } else {
    fileInput.value?.click()
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    uploadedFiles.value = files
    
    // Build file structure with paths
    uploadedFileStructure.value = files.map(file => {
      // For folder uploads, webkitRelativePath contains the full path
      // For file uploads, just use the file name
      const path = (file as any).webkitRelativePath || file.name
      return { path, file }
    })
  }
}

const handleFileDrop = async (event: DragEvent) => {
  const items = event.dataTransfer?.items
  if (!items) return
  
  const files: {path: string, file: File}[] = []
  
  // Process dropped items (can be files or folders)
  for (let i = 0; i < items.length; i++) {
    const item = items[i].webkitGetAsEntry()
    if (item) {
      await processEntry(item, '', files)
    }
  }
  
  uploadedFiles.value = files.map(f => f.file)
  uploadedFileStructure.value = files
}

// Recursive function to process directory entries
const processEntry = async (entry: any, path: string, files: {path: string, file: File}[]): Promise<void> => {
  if (entry.isFile) {
    return new Promise((resolve) => {
      entry.file((file: File) => {
        const fullPath = path ? `${path}/${file.name}` : file.name
        files.push({ path: fullPath, file })
        resolve()
      })
    })
  } else if (entry.isDirectory) {
    const dirReader = entry.createReader()
    return new Promise((resolve) => {
      dirReader.readEntries(async (entries: any[]) => {
        for (const entry of entries) {
          await processEntry(entry, path ? `${path}/${entry.name}` : entry.name, files)
        }
        resolve()
      })
    })
  }
}

const processUploadedFiles = async () => {
  if (uploadedFiles.value.length === 0) return
  
  // Read file contents
  const fileContents: {[key: string]: string} = {}
  
  for (const item of uploadedFileStructure.value) {
    try {
      // Only read text-based files
      if (item.file.type.includes('text') || 
          item.file.name.endsWith('.html') || 
          item.file.name.endsWith('.css') || 
          item.file.name.endsWith('.js') ||
          item.file.name.endsWith('.json') ||
          item.file.name.endsWith('.md') ||
          item.file.name.endsWith('.txt')) {
        const content = await item.file.text()
        fileContents[item.path] = content
      }
    } catch (error) {
      console.error(`Failed to read file ${item.path}:`, error)
    }
  }
  
  // Store files in sessionStorage for the builder page (no prompt, just load the project)
  if (process.client) {
    sessionStorage.setItem('uploadedFiles', JSON.stringify(fileContents))
    sessionStorage.setItem('loadProjectOnly', 'true') // Flag to indicate we should only load, not generate
  }
  
  // Navigate to builder
  navigateTo('/builder')
}

const generateWebsite = () => {
  if (!businessDescription.value.trim()) return
  
  // Store the prompt in sessionStorage for the builder page
  if (process.client) {
    sessionStorage.setItem('websitePrompt', businessDescription.value)
  }
  
  // Navigate to builder with a smooth transition
  navigateTo('/builder')
}

const showcaseExamples = [
  {
    title: 'SaaS Landing Page',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Photography Portfolio',
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'AI Gateway Starter',
    category: 'AI & Tech',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'E-commerce Store',
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Marketing Agency',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Brand Studio',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80'
  }
]
</script>
