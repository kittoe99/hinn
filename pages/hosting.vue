<template>
  <div class="min-h-screen bg-[#f9f8f6]">
    <div class="mx-auto max-w-5xl px-6 py-10">
      <!-- Page Header -->
      <header class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-900">Hosting</h1>
          <p class="mt-1 text-sm text-neutral-600">
            Upload static site files or use the AI generator (coming soon) to deploy websites from your account.
          </p>
        </div>
      </header>

      <div class="max-w-4xl mx-auto">
        <!-- Unified Hosting Card -->
        <section class="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4 mb-6">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d97759]/10">
                <svg class="h-4 w-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-base font-medium text-neutral-900">Deploy Website</h2>
                <p class="text-xs text-neutral-600 mt-0.5">
                  Upload files or generate with AI. All versions are stored in the <span class="font-mono">websites</span> bucket.
                </p>
              </div>
            </div>
          </div>

          <!-- Mode Tabs -->
          <div class="flex gap-2 mb-6 border-b border-neutral-200">
            <button
              type="button"
              @click="deployMode = 'upload'"
              :class="[
                'px-4 py-2 text-sm font-medium transition-colors relative',
                deployMode === 'upload'
                  ? 'text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              ]"
            >
              Upload Files
              <span
                v-if="deployMode === 'upload'"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"
              ></span>
            </button>
            <button
              type="button"
              @click="deployMode = 'generate'"
              :class="[
                'px-4 py-2 text-sm font-medium transition-colors relative',
                deployMode === 'generate'
                  ? 'text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              ]"
            >
              AI Generator
              <span
                v-if="deployMode === 'generate'"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"
              ></span>
            </button>
          </div>

          <!-- Upload Mode -->
          <div v-if="deployMode === 'upload'" class="space-y-4">
            <!-- Website selector -->
            <div>
            <label class="block text-xs font-medium text-neutral-700 mb-1">Website</label>
            <div class="relative">
              <select
                v-model="selectedWebsiteId"
                class="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-[#d97759]"
              >
                <option value="" disabled>Select a website</option>
                <option
                  v-for="site in websites"
                  :key="site.id"
                  :value="site.id"
                >
                  {{ site.name || site.slug || site.id }}
                </option>
              </select>
            </div>
              <p v-if="websitesLoading" class="mt-1 text-[11px] text-neutral-500">Loading websites...</p>
              <p v-if="websitesError" class="mt-1 text-[11px] text-red-600">{{ websitesError }}</p>
            </div>

            <!-- File Input -->
            <div>
            <label class="block text-xs font-medium text-neutral-700 mb-2">Site files</label>
            <div
              class="flex flex-col items-start gap-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50/60 px-4 py-6"
            >
              <input
                id="hosting-file-input"
                type="file"
                class="text-xs"
                @change="onFileChange"
                accept=".zip,.html,.htm,.css,.js"
              />

              <p class="text-[11px] leading-relaxed text-neutral-500">
                Recommended: upload a single ZIP containing your site (including <span class="font-mono">index.html</span>,
                assets, and CSS). Max recommended size: 25 MB.
              </p>

              <p v-if="selectedFile" class="text-[11px] text-neutral-700 flex items-center gap-2">
                <svg class="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Selected: <span class="font-medium truncate max-w-[220px]" :title="selectedFile.name">{{ selectedFile.name }}</span>
              </p>
            </div>
          </div>

            <!-- Upload Button & Status -->
            <div class="flex flex-col gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
              :disabled="!selectedFile || uploading || !supabase"
              @click="handleUpload"
            >
              <svg
                v-if="uploading"
                class="h-4 w-4 mr-2 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>{{ uploading ? 'Uploading...' : 'Upload to websites bucket' }}</span>
            </button>

            <p v-if="!supabase" class="text-[11px] text-red-600">
              Supabase client is not configured. Check your <span class="font-mono">NUXT_PUBLIC_SUPABASE_URL</span> and
              <span class="font-mono">NUXT_PUBLIC_SUPABASE_ANON_KEY</span>.
            </p>

            <p v-if="uploadError" class="text-[11px] text-red-600">
              {{ uploadError }}
            </p>

            <p v-if="uploadSuccess" class="text-[11px] text-emerald-600 break-all">
              Uploaded successfully. Storage path:
              <span class="font-mono">{{ uploadSuccess }}</span>
            </p>
            </div>
          </div>

          <!-- Generate Mode -->
          <div v-if="deployMode === 'generate'" class="space-y-4">
            <!-- Website selector -->
            <div>
              <label class="block text-xs font-medium text-neutral-700 mb-1">Website</label>
              <div class="relative">
                <select
                  v-model="aiWebsiteId"
                  class="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-[#d97759]"
                >
                  <option value="" disabled>Select a website</option>
                  <option
                    v-for="site in websites"
                    :key="site.id + '-ai'"
                    :value="site.id"
                  >
                    {{ site.name || site.slug || site.id }}
                  </option>
                </select>
              </div>
              <p v-if="websitesLoading" class="mt-1 text-[11px] text-neutral-500">Loading websites...</p>
              <p v-if="websitesError" class="mt-1 text-[11px] text-red-600">{{ websitesError }}</p>
            </div>

            <!-- Load from Bucket or Local File -->
            <div>
              <label class="block text-xs font-medium text-neutral-700 mb-1">Load HTML file</label>
              
              <!-- Tab selector for bucket vs local -->
              <div class="flex gap-2 mb-2 border-b border-neutral-200">
                <button
                  type="button"
                  @click="fileLoadMode = 'bucket'"
                  :class="[
                    'px-3 py-1.5 text-xs font-medium transition-colors relative',
                    fileLoadMode === 'bucket'
                      ? 'text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-700'
                  ]"
                >
                  From Bucket
                  <span
                    v-if="fileLoadMode === 'bucket'"
                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"
                  ></span>
                </button>
                <button
                  type="button"
                  @click="fileLoadMode = 'local'"
                  :class="[
                    'px-3 py-1.5 text-xs font-medium transition-colors relative',
                    fileLoadMode === 'local'
                      ? 'text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-700'
                  ]"
                >
                  From Computer
                  <span
                    v-if="fileLoadMode === 'local'"
                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d97759]"
                  ></span>
                </button>
              </div>

              <!-- From Bucket -->
              <div v-if="fileLoadMode === 'bucket'" class="space-y-2">
                <button
                  type="button"
                  @click="loadBucketFiles"
                  :disabled="!aiWebsiteId || loadingBucketFiles"
                  class="w-full px-3 py-2 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ loadingBucketFiles ? 'Loading...' : 'Browse Bucket Files' }}
                </button>
                
                <div v-if="bucketFiles.length > 0" class="max-h-32 overflow-y-auto border border-neutral-200 rounded-lg">
                  <button
                    v-for="file in bucketFiles"
                    :key="file.versionId + '-' + file.path"
                    type="button"
                    @click="loadFileFromBucket(file)"
                    class="w-full px-3 py-2 text-left text-xs hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-b-0"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-neutral-800 truncate">{{ file.name }}</p>
                        <p class="text-[10px] text-neutral-500">{{ file.versionLabel }} · {{ file.path }}</p>
                      </div>
                      <svg class="w-4 h-4 text-neutral-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-6-4l-4-4m0 0l-4 4m4-4v12" />
                      </svg>
                    </div>
                  </button>
                </div>
                
                <p v-if="bucketFilesError" class="text-[10px] text-red-600">{{ bucketFilesError }}</p>
                <p v-if="!aiWebsiteId" class="text-[10px] text-neutral-500">Select a website first to browse its files</p>
              </div>

              <!-- From Computer -->
              <div v-if="fileLoadMode === 'local'" class="flex items-center gap-2">
                <input
                  id="ai-file-input"
                  type="file"
                  class="text-xs flex-1"
                  @change="onAiFileChange"
                  accept=".html,.htm"
                />
              </div>
              
              <!-- Loaded file indicator -->
              <div v-if="aiLoadedFile" class="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p class="text-[10px] font-medium text-emerald-900">File loaded: {{ aiLoadedFile }}</p>
                      <p v-if="aiLoadedFrom" class="text-[9px] text-emerald-700">Source: {{ aiLoadedFrom }}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="text-[11px] text-emerald-700 hover:text-emerald-900 underline"
                    @click="clearAiFile"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <!-- HTML Editor -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="block text-xs font-medium text-neutral-700">HTML Editor</label>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-neutral-500">{{ aiHtml.length }} characters</span>
                  <button
                    v-if="aiHtml"
                    type="button"
                    @click="aiHtml = ''"
                    class="text-[10px] text-neutral-500 hover:text-neutral-800 underline"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                v-model="aiHtml"
                rows="16"
                class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-[#d97759] resize-y font-mono"
                placeholder="<!doctype html>\n<html>\n  <head>...</head>\n  <body>...</body>\n</html>"
              ></textarea>
              <p class="mt-1 text-[10px] text-neutral-500">
                💡 Load a file above, edit manually, or ask AI below to modify the code.
              </p>
            </div>

            <!-- AI Chat Interface (Bottom) -->
            <div class="border border-neutral-200 rounded-lg p-4 bg-gradient-to-br from-[#d97759]/5 to-[#d97759]/10">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h4 class="text-xs font-semibold text-neutral-800">AI Assistant</h4>
                
                <!-- Chat History Selector -->
                <select
                  v-if="savedChats.length > 0"
                  v-model="currentChatId"
                  @change="loadChat"
                  class="ml-2 px-2 py-1 text-[10px] border border-neutral-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#d97759]"
                >
                  <option value="">New Chat</option>
                  <option v-for="chat in savedChats" :key="chat.id" :value="chat.id">
                    {{ chat.title || `Chat ${formatDate(chat.created_at)}` }}
                  </option>
                </select>
                
                <button
                  type="button"
                  @click="startNewChat"
                  class="ml-auto px-2 py-1 text-[10px] bg-white border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
                  title="Start new chat"
                >
                  New
                </button>
                <button
                  v-if="currentChatId"
                  type="button"
                  @click="deleteCurrentChat"
                  class="text-[10px] text-red-600 hover:text-red-800 underline"
                >
                  Delete
                </button>
              </div>
              
              <!-- Chat Messages -->
              <div v-if="chatMessages.length > 0" ref="chatContainer" class="space-y-2 max-h-64 overflow-y-auto mb-3 p-2 bg-white/50 rounded-lg">
                <div v-for="(msg, i) in chatMessages" :key="i"
                     class="flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
                  <div :class="msg.role === 'user' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-800'"
                       class="inline-block rounded-lg px-3 py-2 text-xs max-w-[85%] shadow-sm">
                    <pre v-if="msg.content.includes('```')" class="whitespace-pre-wrap font-mono text-[10px]">{{ msg.content }}</pre>
                    <span v-else>{{ msg.content }}</span>
                  </div>
                </div>
                <div v-if="isAiTyping" class="flex justify-start">
                  <div class="inline-block bg-white rounded-lg px-3 py-2 shadow-sm">
                    <div class="flex space-x-1">
                      <span class="w-1.5 h-1.5 bg-[#d97759] rounded-full animate-bounce" style="animation-delay: 0s"></span>
                      <span class="w-1.5 h-1.5 bg-[#d97759] rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                      <span class="w-1.5 h-1.5 bg-[#d97759] rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Chat Input -->
              <div class="flex gap-2">
                <input v-model="chatInput" 
                       @keyup.enter="sendAiMessage"
                       placeholder="Ask AI to generate, edit, or improve the HTML above..."
                       class="flex-1 px-3 py-2.5 border border-neutral-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#d97759] focus:border-[#d97759]" />
                <button @click="sendAiMessage"
                        :disabled="!chatInput.trim() || isAiTyping"
                        class="px-5 py-2.5 bg-[#d97759] text-white rounded-lg text-xs font-medium hover:bg-[#c86648] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
                  <span v-if="!isAiTyping">Send</span>
                  <span v-else>...</span>
                </button>
              </div>
              
              <p class="mt-2 text-[10px] text-neutral-600">
                💬 Examples: "Add a contact form", "Make it responsive", "Change colors to blue", "Add animations"
              </p>
            </div>

            <!-- Generate Button & Status -->
            <div class="flex flex-col gap-2">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
                :disabled="!aiWebsiteId || !aiHtml.trim() || generating || !supabase"
                @click="handleGenerate"
              >
                <svg
                  v-if="generating"
                  class="h-4 w-4 mr-2 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>{{ generating ? 'Creating version...' : 'Create generated version' }}</span>
              </button>

              <p v-if="generateError" class="text-[11px] text-red-600">{{ generateError }}</p>
              <p v-if="generateSuccess" class="text-[11px] text-emerald-600 break-all">
                Generated version {{ generateSuccess.versionId }} at
                <span class="font-mono">{{ generateSuccess.storageRoot }}/index.html</span>
              </p>
            </div>
          </div>

          <!-- Existing Versions / Previews -->
          <div class="mt-6 border-t border-neutral-100 pt-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xs font-semibold text-neutral-800">Versions for this website</h3>
              <button
                v-if="currentWebsiteId"
                type="button"
                class="text-[11px] text-neutral-500 hover:text-neutral-800 underline-offset-2 hover:underline"
                @click="refreshVersions"
              >
                Refresh
              </button>
            </div>

            <p v-if="!currentWebsiteId" class="text-[11px] text-neutral-500">
              Select a website to view its hosted versions.
            </p>

            <p v-else-if="versionsLoading" class="text-[11px] text-neutral-500">Loading versions...</p>
            <p v-else-if="versionsError" class="text-[11px] text-red-600">{{ versionsError }}</p>

            <div v-else-if="versions.length === 0" class="text-[11px] text-neutral-500">
              No versions yet. Upload files or generate HTML to create a hosted version.
            </div>

            <ul v-else class="mt-1 space-y-1 max-h-40 overflow-auto pr-1">
              <li
                v-for="version in versions"
                :key="version.id"
                class="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2"
              >
                <div class="min-w-0">
                  <p class="text-[11px] font-medium text-neutral-800 truncate">
                    {{ version.label || (version.source_type === 'generated' ? 'Generated' : 'Upload') }}
                  </p>
                  <p class="text-[10px] text-neutral-500 truncate">
                    {{ formatDate(version.created_at) }} · {{ version.source_type }}
                  </p>
                </div>
                <NuxtLink
                  :to="`/site/${version.website_id}/${version.id}/index.html`"
                  target="_blank"
                  class="ml-3 inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-2 py-1 text-[10px] font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  Preview
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6h8m0 0v8m0-8L9 15" />
                  </svg>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useSupabaseClient } from '~/composables/useSupabase.js'

const supabase = useSupabaseClient()

const websites = ref<any[]>([])
const websitesLoading = ref(false)
const websitesError = ref<string | null>(null)
const deployMode = ref<'upload' | 'generate'>('upload')
const selectedWebsiteId = ref<string>('')

const selectedFile = ref<File | null>(null)
const uploading = ref(false)
const uploadError = ref<string | null>(null)
const uploadSuccess = ref<string | null>(null)

const versions = ref<any[]>([])
const versionsLoading = ref(false)
const versionsError = ref<string | null>(null)

const aiWebsiteId = ref<string>('')
const aiHtml = ref<string>('')
const aiLoadedFile = ref<string>('')
const aiLoadedFrom = ref<string>('')
const generating = ref(false)
const generateError = ref<string | null>(null)
const generateSuccess = ref<{ versionId: string; storageRoot: string } | null>(null)

const fileLoadMode = ref<'bucket' | 'local'>('bucket')
const bucketFiles = ref<Array<{ name: string; path: string; versionId: string; versionLabel: string }>>([])
const loadingBucketFiles = ref(false)
const bucketFilesError = ref<string | null>(null)

const chatMessages = ref<Array<{ role: string; content: string }>>([])
const chatInput = ref<string>('')
const isAiTyping = ref(false)
const currentChatId = ref<string>('')
const savedChats = ref<Array<any>>([])
const loadingChats = ref(false)

const currentWebsiteId = computed(() => {
  return deployMode.value === 'upload' ? selectedWebsiteId.value : aiWebsiteId.value
})

const formatDate = (value: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  selectedFile.value = file || null
  uploadError.value = null
  uploadSuccess.value = null
}

const onAiFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) {
    aiLoadedFile.value = ''
    return
  }

  try {
    const text = await file.text()
    aiHtml.value = text
    aiLoadedFile.value = file.name
    aiLoadedFrom.value = 'Local computer'
  } catch (err: any) {
    console.error('[AI] File read error', err)
    aiLoadedFile.value = ''
  }
}

const clearAiFile = () => {
  aiHtml.value = ''
  aiLoadedFile.value = ''
  aiLoadedFrom.value = ''
  const input = document.getElementById('ai-file-input') as HTMLInputElement | null
  if (input) input.value = ''
}

const loadBucketFiles = async () => {
  if (!aiWebsiteId.value) return
  
  loadingBucketFiles.value = true
  bucketFilesError.value = null
  bucketFiles.value = []
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    
    if (!token) {
      bucketFilesError.value = 'Please sign in to browse files.'
      return
    }
    
    // Get all versions for this website
    const versionsRes = await $fetch<{ success: boolean; versions: any[] }>('/api/hosting/versions', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        websiteId: aiWebsiteId.value
      }
    })
    
    if (!versionsRes.success) {
      bucketFilesError.value = 'Failed to load versions.'
      return
    }
    
    // For each version, list files in that version's folder
    const filePromises = versionsRes.versions.map(async (version) => {
      const path = `${aiWebsiteId.value}/${version.id}`
      
      const { data: files, error } = await supabase.storage
        .from('websites')
        .list(path)
      
      if (error || !files) return []
      
      return files
        .filter(f => f.name.endsWith('.html') || f.name.endsWith('.htm'))
        .map(f => ({
          name: f.name,
          path: `${path}/${f.name}`,
          versionId: version.id,
          versionLabel: version.label || (version.source_type === 'generated' ? 'Generated' : 'Upload')
        }))
    })
    
    const allFiles = await Promise.all(filePromises)
    bucketFiles.value = allFiles.flat()
    
    if (bucketFiles.value.length === 0) {
      bucketFilesError.value = 'No HTML files found in bucket for this website.'
    }
    
  } catch (err: any) {
    console.error('[Bucket] Load files error', err)
    bucketFilesError.value = err?.message || 'Failed to load bucket files.'
  } finally {
    loadingBucketFiles.value = false
  }
}

const loadFileFromBucket = async (file: { name: string; path: string; versionId: string; versionLabel: string }) => {
  try {
    const { data, error } = await supabase.storage
      .from('websites')
      .download(file.path)
    
    if (error) throw error
    
    const text = await data.text()
    aiHtml.value = text
    aiLoadedFile.value = file.name
    aiLoadedFrom.value = `Bucket: ${file.versionLabel}`
    
  } catch (err: any) {
    console.error('[Bucket] Download file error', err)
    bucketFilesError.value = `Failed to load ${file.name}: ${err.message}`
  }
}

const sendAiMessage = async () => {
  if (!chatInput.value.trim() || !aiWebsiteId.value) return
  
  chatMessages.value.push({
    role: 'user',
    content: chatInput.value
  })
  
  const userMsg = chatInput.value
  chatInput.value = ''
  isAiTyping.value = true
  
  // Scroll chat to bottom
  nextTick(() => {
    const container = document.querySelector('[ref="chatContainer"]')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    
    if (!token) {
      chatMessages.value.push({
        role: 'assistant',
        content: 'Please sign in to use the AI assistant.'
      })
      return
    }
    
    const res = await $fetch<{ success: boolean; message: string }>('/api/hosting/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: {
        messages: chatMessages.value,
        generatedCode: aiHtml.value ? {
          content: aiHtml.value,
          fileName: 'index.html',
          type: 'HTML'
        } : null
      }
    })
    
    chatMessages.value.push({
      role: 'assistant',
      content: res.message
    })
    
    // Extract and write code to editor
    extractCodeFromResponse(res.message)
    
    // Save chat to database
    await saveChatToDatabase()
    
    // Scroll chat to bottom
    nextTick(() => {
      const container = document.querySelector('[ref="chatContainer"]')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    })
    
  } catch (err: any) {
    console.error('[AI] Chat error', err)
    chatMessages.value.push({
      role: 'assistant',
      content: `Error: ${err?.data?.message || err?.message || 'Failed to get AI response'}`
    })
  } finally {
    isAiTyping.value = false
  }
}

const saveChatToDatabase = async () => {
  if (!aiWebsiteId.value || chatMessages.value.length === 0) return
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) return
    
    // Generate title from first user message
    const title = currentChatId.value ? undefined : chatMessages.value[0]?.content.substring(0, 50)
    
    const res = await $fetch<{ success: boolean; chat: any }>('/api/hosting/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: {
        websiteId: aiWebsiteId.value,
        messages: chatMessages.value,
        title: title,
        chatId: currentChatId.value || undefined
      }
    })
    
    if (res.success && res.chat) {
      // Update current chat ID if this was a new chat
      if (!currentChatId.value) {
        currentChatId.value = res.chat.id
      }
      // Reload chat list
      await loadSavedChats()
    }
  } catch (err: any) {
    console.error('[Chat] Save error', err)
  }
}

const loadSavedChats = async () => {
  if (!aiWebsiteId.value) return
  
  loadingChats.value = true
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) return
    
    const res = await $fetch<{ success: boolean; chats: any[] }>('/api/hosting/chats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        websiteId: aiWebsiteId.value
      }
    })
    
    if (res.success) {
      savedChats.value = res.chats || []
    }
  } catch (err: any) {
    console.error('[Chat] Load chats error', err)
  } finally {
    loadingChats.value = false
  }
}

const loadChat = () => {
  if (!currentChatId.value) {
    startNewChat()
    return
  }
  
  const chat = savedChats.value.find(c => c.id === currentChatId.value)
  if (chat && chat.messages) {
    chatMessages.value = chat.messages
    
    // Scroll to bottom
    nextTick(() => {
      const container = document.querySelector('[ref="chatContainer"]')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    })
  }
}

const startNewChat = () => {
  currentChatId.value = ''
  chatMessages.value = []
}

const deleteCurrentChat = async () => {
  if (!currentChatId.value) return
  
  if (!confirm('Delete this chat conversation?')) return
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) return
    
    await $fetch(`/api/hosting/chats/${currentChatId.value}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    // Start new chat and reload list
    startNewChat()
    await loadSavedChats()
  } catch (err: any) {
    console.error('[Chat] Delete error', err)
  }
}

const extractCodeFromResponse = (message: string) => {
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g
  const matches = [...message.matchAll(codeBlockRegex)]
  
  if (matches.length > 0) {
    const [, language, code] = matches[0]
    
    if (language.toLowerCase() === 'html') {
      // Write the generated code to the editor
      aiHtml.value = code.trim()
      
      // Update loaded file indicator
      aiLoadedFile.value = 'AI Generated'
      aiLoadedFrom.value = 'AI Assistant'
    }
  }
}

const loadWebsites = async () => {
  try {
    websitesLoading.value = true
    websitesError.value = null

    const token = (await supabase.auth.getSession()).data.session?.access_token

    if (!token) {
      websitesError.value = 'You must be signed in to load websites.'
      return
    }

    const res = await $fetch<{ success: boolean; websites: any[] }>('/api/websites', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.success) {
      websitesError.value = 'Failed to load websites.'
      return
    }

    websites.value = res.websites || []
  } catch (err: any) {
    console.error('[Hosting] Failed to load websites', err)
    websitesError.value = err?.message || 'Failed to load websites.'
  } finally {
    websitesLoading.value = false
  }
}

const loadVersions = async () => {
  if (!currentWebsiteId.value) {
    versions.value = []
    versionsError.value = null
    return
  }

  try {
    versionsLoading.value = true
    versionsError.value = null

    const token = (await supabase.auth.getSession()).data.session?.access_token

    if (!token) {
      versionsError.value = 'You must be signed in to load versions.'
      return
    }

    const res = await $fetch<{ success: boolean; versions: any[] }>('/api/hosting/versions', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        websiteId: currentWebsiteId.value
      }
    })

    if (!res.success) {
      versionsError.value = 'Failed to load versions.'
      return
    }

    versions.value = res.versions || []
  } catch (err: any) {
    console.error('[Hosting] Failed to load versions', err)
    versionsError.value = err?.message || 'Failed to load versions.'
  } finally {
    versionsLoading.value = false
  }
}

const refreshVersions = () => {
  loadVersions()
}

const handleUpload = async () => {
  if (!selectedWebsiteId.value) {
    uploadError.value = 'Please select a website.'
    return
  }

  if (!selectedFile.value) {
    uploadError.value = 'Please select a file to upload.'
    return
  }

  uploading.value = true
  uploadError.value = null
  uploadSuccess.value = null

  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token

    if (!token) {
      uploadError.value = 'You must be signed in to upload.'
      return
    }

    const form = new FormData()
    form.append('websiteId', selectedWebsiteId.value)
    form.append('file', selectedFile.value)

    const res = await $fetch<{ success: boolean; websiteId: string; versionId: string; storageRoot: string }>(
      '/api/hosting/upload',
      {
        method: 'POST',
        body: form,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!res?.success) {
      uploadError.value = 'Upload failed.'
      return
    }

    uploadSuccess.value = `${res.storageRoot}`

    // Refresh versions list so the new upload appears in the UI
    await loadVersions()
  } catch (err: any) {
    console.error('Unexpected upload error', err)
    uploadError.value = err?.data?.statusMessage || err?.message || 'Unexpected error during upload.'
  } finally {
    uploading.value = false
  }
}

const handleGenerate = async () => {
  if (!aiWebsiteId.value) {
    generateError.value = 'Please select a website.'
    return
  }

  if (!aiHtml.value.trim()) {
    generateError.value = 'Please provide HTML content.'
    return
  }

  generating.value = true
  generateError.value = null
  generateSuccess.value = null

  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token

    if (!token) {
      generateError.value = 'You must be signed in to generate.'
      return
    }

    const res = await $fetch<{
      success: boolean
      websiteId: string
      versionId: string
      storageRoot: string
    }>('/api/hosting/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: {
        websiteId: aiWebsiteId.value,
        html: aiHtml.value
      }
    })

    if (!res?.success) {
      generateError.value = 'Failed to create generated version.'
      return
    }

    generateSuccess.value = {
      versionId: res.versionId,
      storageRoot: res.storageRoot
    }

    // Refresh versions list so the generated version appears in the UI
    await loadVersions()
  } catch (err: any) {
    console.error('[Hosting] Generate error', err)
    generateError.value = err?.data?.statusMessage || err?.message || 'Unexpected error during generate.'
  } finally {
    generating.value = false
  }
}

onMounted(() => {
  loadWebsites()
})

watch(currentWebsiteId, () => {
  loadVersions()
})

watch(aiWebsiteId, () => {
  // Load saved chats when website changes
  loadSavedChats()
  // Start fresh chat
  startNewChat()
})

if (process.client) {
  definePageMeta({
    middleware: 'auth'
  })
}
</script>
