<template>
  <div class="flex h-screen flex-col bg-[#fdf6e6] overflow-hidden">
    <!-- Header -->
    <header class="flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 shrink-0 z-10">
      <div class="flex items-center gap-3">
        <NuxtLink to="/dashboard" class="flex items-center justify-center rounded-lg p-1 transition hover:bg-neutral-100">
          <svg class="h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div class="flex items-center gap-2">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d97759]/10 text-[#d97759]">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </span>
          <h1 class="font-semibold text-neutral-900">Builder Studio <span class="ml-2 rounded-full bg-[#d97759]/10 px-2 py-0.5 text-xs font-medium text-[#d97759]">Gpt-5-codex</span></h1>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="hidden items-center gap-1 lg:flex bg-neutral-100 p-1 rounded-lg">
          <button 
            v-for="mode in viewportModes" 
            :key="mode"
            @click="viewportMode = mode"
            class="rounded-md px-2 py-1 text-xs font-medium capitalize transition"
            :class="viewportMode === mode ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'"
          >
            {{ mode }}
          </button>
        </div>
        <button class="rounded-lg bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-800">
          Publish
        </button>
      </div>
    </header>

    <main class="flex flex-1 overflow-hidden relative">
      <!-- Mobile Toggle (Absolute) -->
      <div class="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-neutral-900/90 p-1 shadow-lg backdrop-blur lg:hidden">
        <button
          @click="activePanel = 'chat'"
          class="rounded-full px-4 py-2 text-xs font-medium transition"
          :class="activePanel === 'chat' ? 'bg-white text-neutral-900' : 'text-neutral-400'"
        >
          Chat
        </button>
        <button
          @click="activePanel = 'preview'"
          class="rounded-full px-4 py-2 text-xs font-medium transition"
          :class="activePanel === 'preview' ? 'bg-white text-neutral-900' : 'text-neutral-400'"
        >
          Preview
        </button>
      </div>

      <!-- Split View -->
      <div class="flex w-full h-full">
        <!-- Chat Panel -->
        <div 
          class="flex h-full w-full flex-col border-r border-neutral-200 bg-white lg:w-[400px] lg:shrink-0 xl:w-[450px]"
          :class="activePanel === 'chat' ? 'block' : 'hidden lg:flex'"
        >
          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
            <div 
              v-for="(msg, index) in messages" 
              :key="index"
              class="flex gap-3"
              :class="msg.role === 'user' ? 'flex-row-reverse' : ''"
            >
              <!-- Avatar -->
              <div 
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                :class="msg.role === 'assistant' ? 'bg-[#d97759]/10 text-[#d97759]' : 'bg-neutral-100 text-neutral-600'"
              >
                <svg v-if="msg.role === 'assistant'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <!-- Bubble -->
              <div 
                class="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                :class="[
                  msg.role === 'assistant' ? 'bg-[#fefbf3] text-neutral-800' : 'bg-neutral-900 text-white',
                  msg.isError ? 'border border-red-200 bg-red-50 text-red-600' : ''
                ]"
              >
                <!-- Attachment Preview in Chat -->
                <div v-if="msg.attachment" class="mb-2 rounded-lg bg-black/10 p-2">
                  <img v-if="msg.attachment.type.startsWith('image/')" :src="msg.attachment.content" class="max-h-48 rounded" />
                  <div v-else class="flex items-center gap-2 text-xs">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    {{ msg.attachment.name }}
                  </div>
                </div>
                <!-- Content -->
                <div v-if="msg.role === 'assistant' && !msg.content && msg.isStreaming" class="flex items-center gap-1 h-5">
                  <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d97759]"></span>
                  <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d97759] delay-75"></span>
                  <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d97759] delay-150"></span>
                </div>
                <div v-else>{{ msg.role === 'assistant' && msg.content.startsWith('<!DOCTYPE') ? 'I\'ve updated the preview based on your request.' : msg.content }}</div>
              </div>
            </div>
          </div>

          <!-- Input -->
          <div class="border-t border-neutral-200 p-4 bg-white">
            <!-- Context Previews (File & Selection) -->
            <div class="mb-2 flex flex-wrap gap-2">
              <!-- Selected Element -->
              <div v-if="selectedElement" class="flex items-center gap-2 rounded-lg border border-[#d97759]/30 bg-[#d97759]/5 p-2 text-xs text-[#d97759]">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                <span class="font-medium truncate max-w-[150px]">Selected: &lt;{{ selectedElement.tagName }}&gt;</span>
                <button @click="selectedElement = null" class="ml-1 hover:text-red-500">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <!-- Attached File -->
              <div v-if="attachedFile" class="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-xs text-neutral-700">
                <span class="font-medium truncate max-w-[150px]">{{ attachedFile.name }}</span>
                <button @click="removeAttachment" class="ml-1 text-neutral-400 hover:text-red-500">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div class="relative rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow focus-within:border-[#d97759] focus-within:ring-1 focus-within:ring-[#d97759]">
              <textarea
                v-model="inputMessage"
                @keydown.enter.prevent="sendMessage"
                :disabled="isGenerating"
                class="block w-full resize-none border-none bg-transparent px-4 py-3 text-sm placeholder-neutral-400 focus:ring-0 disabled:opacity-50"
                rows="3"
                placeholder="Describe your website... (e.g., 'Change the button color to blue')"
              ></textarea>
              <div class="flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-2 py-2 rounded-b-2xl">
                <div class="flex gap-1">
                  <!-- File Input -->
                  <input
                    type="file"
                    ref="fileInput"
                    class="hidden"
                    @change="handleFileUpload"
                    accept="image/*,.txt,.html,.css,.js,.json,.md"
                  />
                  <button 
                    @click="triggerFileUpload"
                    class="rounded p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600"
                    title="Attach file"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  </button>
                </div>
                <button
                  @click="sendMessage"
                  :disabled="(!inputMessage.trim() && !attachedFile) || isGenerating"
                  class="flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
                >
                  <span v-if="isGenerating">Generating...</span>
                  <span v-else>Generate</span>
                  <svg v-if="!isGenerating" class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Panel -->
        <div 
          class="flex-1 flex flex-col bg-neutral-100/50 relative"
          :class="activePanel === 'preview' ? 'block' : 'hidden lg:flex'"
        >
          <!-- Loading Overlay -->
          <div v-if="isGenerating && !previewContent" class="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <div class="flex flex-col items-center gap-3">
              <div class="h-8 w-8 animate-spin rounded-full border-4 border-[#d97759] border-t-transparent"></div>
              <p class="text-sm font-medium text-neutral-600">Building your site...</p>
            </div>
          </div>

          <!-- Preview Area -->
          <div class="flex-1 overflow-hidden p-4 md:p-8 flex items-center justify-center">
            <div 
              class="relative h-full bg-white shadow-2xl transition-all duration-500 ease-in-out overflow-hidden"
              :class="[
                viewportMode === 'mobile' ? 'w-[375px] rounded-[40px] border-[8px] border-neutral-800' : '',
                viewportMode === 'tablet' ? 'w-[768px] rounded-xl border-4 border-neutral-800' : '',
                viewportMode === 'desktop' ? 'w-full h-full rounded-lg border border-neutral-200' : ''
              ]"
            >
              <!-- Mobile Notch/Bar -->
              <div v-if="viewportMode === 'mobile'" class="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-neutral-800"></div>

              <iframe
                ref="previewFrame"
                class="h-full w-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                :srcdoc="previewContent"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'

// Types
interface Attachment {
  name: string
  content: string
  type: string
}

interface SelectedElement {
  tagName: string
  className: string
  text: string
  outerHTML: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  attachment?: Attachment
  isStreaming?: boolean
  isError?: boolean
}

// State
const activePanel = ref<'chat' | 'preview'>('chat')
const viewportMode = ref<'desktop' | 'tablet' | 'mobile'>('desktop')
const viewportModes = ['desktop', 'tablet', 'mobile'] as const
const inputMessage = ref('')
const isGenerating = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const attachedFile = ref<Attachment | null>(null)
const selectedElement = ref<SelectedElement | null>(null)

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: 'Welcome to Builder Studio. I\'m powered by Gpt-5-codex. Click any element in the preview to select it, then tell me what to change.',
  }
])

// Interaction Script
const interactionScript = `
<style>
  .builder-hover { outline: 2px solid #d97759 !important; cursor: pointer !important; }
  .builder-selected { outline: 3px solid #d97759 !important; box-shadow: 0 0 0 4px rgba(217, 119, 89, 0.2) !important; }
</style>
<script>
  (function() {
    let currentSelection = null;

    document.body.addEventListener('mouseover', function(e) {
      e.stopPropagation();
      e.target.classList.add('builder-hover');
    });

    document.body.addEventListener('mouseout', function(e) {
      e.stopPropagation();
      e.target.classList.remove('builder-hover');
    });

    document.body.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Remove previous selection
      if (currentSelection) {
        currentSelection.classList.remove('builder-selected');
      }

      currentSelection = e.target;
      currentSelection.classList.add('builder-selected');

      // Send to parent
      window.parent.postMessage({
        type: 'element-selected',
        payload: {
          tagName: currentSelection.tagName.toLowerCase(),
          className: currentSelection.className.replace('builder-hover', '').replace('builder-selected', '').trim(),
          text: currentSelection.innerText.substring(0, 50) + (currentSelection.innerText.length > 50 ? '...' : ''),
          outerHTML: currentSelection.outerHTML
        }
      }, '*');
    });
  })();
<\/script>
`

const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <title>Welcome</title>
</head>
<body class="bg-gray-50 flex items-center justify-center min-h-screen">
  <div class="text-center space-y-4 p-8">
    <div class="inline-flex items-center justify-center p-4 bg-orange-100 rounded-full mb-4">
      <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
    </div>
    <h1 class="text-2xl font-bold text-gray-900">Ready to Build</h1>
    <p class="text-gray-500 max-w-md">Click anywhere to select an element and edit it.</p>
  </div>
</body>
</html>`

const processHtml = (html: string) => {
  if (!html) return ''
  if (html.includes('</body>')) {
    return html.replace('</body>', `${interactionScript}</body>`)
  }
  return html + interactionScript
}

const previewContent = ref(processHtml(defaultHtml))

// Setup Message Listener
onMounted(() => {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'element-selected') {
      selectedElement.value = event.data.payload
    }
  })
})

// Methods
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    
    reader.onload = (e) => {
      if (e.target?.result) {
        attachedFile.value = {
          name: file.name,
          content: e.target.result as string,
          type: file.type
        }
      }
    }
    
    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file)
    } else {
      reader.readAsText(file)
    }
  }
  target.value = ''
}

const removeAttachment = () => {
  attachedFile.value = null
}

const sendMessage = async () => {
  if ((!inputMessage.value.trim() && !attachedFile.value) || isGenerating.value) return

  const userText = inputMessage.value
  const currentAttachment = attachedFile.value
  const currentSelection = selectedElement.value

  messages.value.push({ 
    role: 'user', 
    content: userText,
    attachment: currentAttachment ? { ...currentAttachment } : undefined
  })
  
  inputMessage.value = ''
  attachedFile.value = null
  scrollToBottom()

  isGenerating.value = true
  
  const assistantMessageIndex = messages.value.push({
    role: 'assistant',
    content: '',
    isStreaming: true
  }) - 1

  let fullResponse = ''

  try {
    const apiMessages = messages.value
      .filter(m => !m.isError && !m.isStreaming)
      .map(m => {
        // Start with base content
        let finalContent: any = m.content || ''

        // If it's the latest message and we have a selection, add context
        if (m === messages.value[messages.value.length - 2] && currentSelection) {
          finalContent = `${finalContent}\n\n[CONTEXT: User selected the following element to edit: <${currentSelection.tagName} class="${currentSelection.className}">${currentSelection.text}</${currentSelection.tagName}>. OuterHTML: ${currentSelection.outerHTML}]`
        }

        if (m.role === 'user' && m.attachment && m.attachment.type.startsWith('image/')) {
          return {
            role: m.role,
            content: [
              { type: 'text', text: finalContent || 'Analyze this image' },
              { type: 'image_url', image_url: { url: m.attachment.content } }
            ]
          }
        } else if (m.role === 'user' && m.attachment) {
          return {
            role: m.role,
            content: `${finalContent}\n\nAttached file (${m.attachment.name}):\n${m.attachment.content}`
          }
        } else {
          return { role: m.role, content: finalContent }
        }
      })

    const response = await fetch('/api/builder/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages })
    })

    if (!response.ok) throw new Error('Failed to connect to AI')
    if (!response.body) throw new Error('No response body')

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6)
          if (dataStr === '[DONE]') continue

          try {
            const data = JSON.parse(dataStr)
            if (data.error) throw new Error(data.error)
            if (data.content) {
              fullResponse += data.content
              messages.value[assistantMessageIndex].content = fullResponse
            }
          } catch (e) {
            console.error('Error parsing chunk:', e)
          }
        }
      }
    }

    // Extract HTML
    let cleanHtml = fullResponse.replace(/```html/g, '').replace(/```/g, '').trim()
    if (cleanHtml.includes('<!DOCTYPE html>')) {
       // Inject interaction script into new content
       previewContent.value = processHtml(cleanHtml)
    } else if (cleanHtml.length > 0) {
       previewContent.value = processHtml(`<!DOCTYPE html><html><body>${cleanHtml}</body></html>`)
    }
    
    if (window.innerWidth < 1024) {
       activePanel.value = 'preview'
    }

  } catch (error: any) {
    messages.value[assistantMessageIndex].isError = true
    messages.value[assistantMessageIndex].content = 'Error: ' + error.message
  } finally {
    messages.value[assistantMessageIndex].isStreaming = false
    isGenerating.value = false
    // Don't clear selection immediately so user can see what was edited, 
    // but maybe clear it if they click something else. 
    // For now, keep it active.
    scrollToBottom()
  }
}
</script>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e5e5e5;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #d4d4d4;
}
</style>
