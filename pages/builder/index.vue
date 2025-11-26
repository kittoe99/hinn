<template>
  <div class="flex h-[100dvh] w-full bg-[#f9f8f6] text-neutral-900 overflow-hidden selection:bg-[#d97759]/30 relative">
    
    <!-- Mobile Menu Backdrop -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-neutral-900/40 z-40 md:hidden backdrop-blur-sm" @click="isMobileMenuOpen = false" />

    <!-- SIDEBAR - Chat Interface -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-full md:w-80 lg:w-96 flex flex-col border-r border-neutral-200 bg-white md:bg-white/80 backdrop-blur-sm shadow-2xl md:shadow-none transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Header -->
      <div class="p-4 md:p-6 border-b border-neutral-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg
            class="w-7 h-7 text-[#d97759] -mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="4" width="5" height="16" rx="1" fill="currentColor" transform="rotate(-15 12 12)" />
            <rect x="10" y="4" width="5" height="16" rx="1" fill="currentColor" transform="rotate(-15 12 12)" />
          </svg>
          <h1 class="text-lg font-semibold tracking-tight text-neutral-900">WPS<span class="text-neutral-600">canvas</span></h1>
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="showConversationList = !showConversationList" 
            class="hidden md:block text-neutral-600 hover:text-neutral-900 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
            title="Conversation History"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button @click="isMobileMenuOpen = false" class="md:hidden text-neutral-600 hover:text-neutral-900 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Conversation History Modal -->
      <div v-if="showConversationList" class="absolute inset-0 bg-white z-50 flex flex-col">
        <div class="p-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-neutral-900">Conversations</h2>
          <button @click="showConversationList = false" class="text-neutral-600 hover:text-neutral-900 p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4 space-y-2">
          <button
            v-for="conv in conversations"
            :key="conv.id"
            @click="loadConversation(conv.id)"
            :class="[
              'w-full text-left p-3 rounded-lg border transition-all',
              currentConversationId === conv.id 
                ? 'border-[#d97759] bg-[#d97759]/5' 
                : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
            ]"
          >
            <div class="font-medium text-sm text-neutral-900 truncate">{{ conv.title }}</div>
            <div class="text-xs text-neutral-500 mt-1">
              {{ new Date(conv.updated_at).toLocaleDateString() }}
            </div>
          </button>
          <div v-if="conversations.length === 0" class="text-center py-8 text-neutral-500 text-sm">
            No conversations yet
          </div>
        </div>
      </div>

      <!-- Chat Content -->
      <div class="flex-1 flex flex-col min-h-0 relative">
        <!-- Chat Messages -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-3 scrollbar-thin pb-32">
          <!-- Chat History -->
          <div v-for="(message, index) in chatHistory" :key="index" class="group">
            <!-- User Message -->
            <div v-if="message.role === 'user'" class="flex items-start gap-3 justify-end">
              <div class="flex-1 flex flex-col items-end">
                <div class="bg-neutral-100 text-neutral-900 rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%] md:max-w-[75%]">
                  <p class="text-sm leading-relaxed whitespace-pre-wrap break-words">{{ message.content }}</p>
                </div>
                <div class="flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="text-[10px] text-neutral-400">
                    {{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                  </span>
                  <button class="p-1 hover:bg-neutral-100 rounded transition-colors" title="Attach">
                    <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button class="p-1 hover:bg-neutral-100 rounded transition-colors" title="Edit">
                    <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="p-1 hover:bg-neutral-100 rounded transition-colors" title="Delete">
                    <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button class="p-1 hover:bg-neutral-100 rounded transition-colors" title="Copy">
                    <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Assistant Message -->
            <div v-else class="flex items-start gap-3">
              <div class="flex-1">
                <!-- Thinking Steps (if any) -->
                <div v-if="message.thinking" class="space-y-1.5 mb-3">
                  <div v-for="(step, i) in message.thinking" :key="i" class="flex items-start gap-2 text-xs text-neutral-500">
                    <svg v-if="step.type === 'thinking'" class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <svg v-else-if="step.type === 'search'" class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <svg v-else class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{{ step.text }}</span>
                  </div>
                </div>

                <!-- Main Content -->
                <div class="bg-white border border-neutral-100 rounded-2xl rounded-tl-md px-4 py-3 max-w-[90%]">
                  <p class="text-sm leading-relaxed whitespace-pre-wrap break-words text-neutral-800">{{ message.content }}</p>
                  
                  <!-- File References (if any) -->
                  <div v-if="message.files && message.files.length > 0" class="mt-3 space-y-1.5">
                    <div v-for="(file, i) in message.files" :key="i" class="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 px-2.5 py-1.5 rounded-lg border border-neutral-100">
                      <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="font-medium">{{ file }}</span>
                    </div>
                  </div>

                  <!-- Status Footer -->
                  <div v-if="message.status" class="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
                    <svg v-if="message.status === 'success'" class="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else-if="message.status === 'error'" class="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ message.statusText || (message.status === 'success' ? 'No issues found' : 'Error occurred') }}</span>
                    <span v-if="message.duration" class="ml-auto">Worked for {{ message.duration }}</span>
                  </div>
                  
                  <!-- Follow-up Suggestions -->
                  <div v-if="message.status === 'success' && index === chatHistory.length - 1" class="mt-3 pt-3 border-t border-neutral-100">
                    <p class="text-xs text-neutral-500 mb-2">Continue with:</p>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="(suggestion, i) in getFollowUpSuggestions(message)"
                        :key="i"
                        @click="applySuggestion(suggestion)"
                        class="px-3 py-1.5 text-xs bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors text-neutral-700"
                      >
                        {{ suggestion }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="text-[10px] text-neutral-400">
                    {{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                  </span>
                  <button class="p-1 hover:bg-neutral-100 rounded transition-colors ml-2" title="Thumbs up">
                    <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </button>
                  <button class="p-1 hover:bg-neutral-100 rounded transition-colors" title="Thumbs down">
                    <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                  </button>
                  <button class="p-1 hover:bg-neutral-100 rounded transition-colors" title="Copy">
                    <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button class="p-1 hover:bg-neutral-100 rounded transition-colors" title="More">
                    <svg class="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Real-time AI Streaming Output -->
          <div v-if="status === GenerationStatus.STREAMING" class="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div class="flex-1">
              <!-- Initial Agent Working State (shows immediately) -->
              <div v-if="thinkingSteps.length === 0 && !streamingText" class="space-y-1.5 mb-3">
                <div class="flex items-start gap-2 text-xs text-neutral-500">
                  <svg class="w-3.5 h-3.5 mt-0.5 flex-shrink-0 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Agent working...</span>
                </div>
              </div>

              <!-- Thinking Steps (from actual AI reasoning) -->
              <div v-if="thinkingSteps.length > 0" class="space-y-1.5 mb-3">
                <div v-for="(step, i) in thinkingSteps" :key="i" class="flex items-start gap-2 text-xs text-neutral-500">
                  <svg v-if="step.type === 'thinking'" class="w-3.5 h-3.5 mt-0.5 flex-shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <svg v-else-if="step.type === 'search'" class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <svg v-else class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="truncate">{{ step.text }}</span>
                </div>
              </div>

              <!-- Main Streaming Content -->
              <div v-if="streamingText || thinkingSteps.length > 0" class="bg-white border border-neutral-100 rounded-2xl rounded-tl-md px-4 py-3 max-w-[90%] relative overflow-hidden">
                <!-- Subtle animated gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-50 to-transparent animate-shimmer opacity-30 pointer-events-none"></div>
                
                <!-- Content -->
                <div class="relative z-10">
                  <!-- Iteration Status -->
                  <div v-if="streamingText && streamingText.toLowerCase().includes('iteration')" class="flex items-center gap-2 mb-2 pb-2 border-b border-neutral-100">
                    <div class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
                    </div>
                    <span class="text-xs font-medium text-neutral-700">{{ streamingText }}</span>
                  </div>
                  
                  <!-- Streaming text -->
                  <div v-if="streamingText && !streamingText.toLowerCase().includes('iteration')" class="text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap break-words">
                    {{ streamingText.slice(-500) }}<span class="inline-block w-1.5 h-3.5 align-middle bg-neutral-900 ml-0.5 animate-pulse"></span>
                  </div>
                  
                  <div v-if="!streamingText" class="text-sm text-neutral-500 italic">
                    Preparing response...
                  </div>

                  <!-- Progress -->
                  <div v-if="streamingProgress.filesGenerated.length > 0" class="mt-3 pt-3 border-t border-neutral-100">
                    <div class="flex items-center gap-2">
                      <div class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d97759] opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-[#d97759]"></span>
                      </div>
                      <span class="text-xs text-neutral-600">Generating {{ streamingProgress.filesGenerated.length }}/{{ streamingProgress.totalFiles }} files</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Floating Input Area -->
        <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#f9f8f6] via-[#f9f8f6] to-transparent pt-12">
          <div class="max-w-3xl mx-auto">
            <!-- Quick Actions/Status -->
            <div v-if="errorMsg" class="mb-3 mx-auto max-w-md">
              <div class="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg border border-red-100 flex items-center justify-center shadow-sm">
                <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {{ errorMsg }}
              </div>
            </div>

            <div class="relative">
              <div class="relative bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden transition-all duration-200 focus-within:shadow-xl focus-within:border-neutral-300">
                <textarea
                  ref="mainInput"
                  v-model="prompt"
                  @input="autoResize"
                  @keydown.enter.prevent="handleGenerate"
                  :placeholder="isEditing ? 'Ask for changes...' : 'Describe your dream website...' "
                  :disabled="isBusy"
                  class="w-full min-h-[60px] max-h-[200px] px-4 pt-4 pb-2 text-sm text-neutral-900 placeholder-neutral-400 bg-transparent border-none focus:ring-0 resize-none"
                  rows="1"
                  style="field-sizing: content;"
                />
                
                <!-- Bottom Toolbar -->
                <div class="flex items-center justify-between px-3 py-2 border-t border-neutral-100">
                  <div class="flex items-center gap-1">
                    <!-- File Attachment -->
                    <button
                      @click="handleFileAttach"
                      class="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors group"
                      title="Attach file"
                    >
                      <svg class="w-4 h-4 text-neutral-500 group-hover:text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    
                    <!-- Web Search Toggle -->
                    <button
                      @click="useSearch = !useSearch"
                      :class="[
                        'p-1.5 rounded-lg transition-colors group',
                        useSearch ? 'bg-[#d97759]/10 text-[#d97759]' : 'hover:bg-neutral-100'
                      ]"
                      title="Web search"
                    >
                      <svg class="w-4 h-4" :class="useSearch ? 'text-[#d97759]' : 'text-neutral-500 group-hover:text-neutral-700'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </button>

                    <!-- Model Selector -->
                    <button class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-xs text-neutral-600">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Gemini 3 Pro Preview</span>
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  <!-- Send Button -->
                  <button
                    @click="handleGenerate"
                    :disabled="isBusy || !prompt.trim()"
                    class="p-2 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition-all duration-200 shadow-sm"
                  >
                    <svg v-if="isBusy" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Clear Chat Button -->
              <div class="absolute -bottom-8 left-0 right-0 text-center">
                <button
                  v-if="chatHistory.length > 0"
                  @click="chatHistory = []"
                  class="text-[10px] text-neutral-400 hover:text-neutral-600 transition-colors inline-flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  Clear chat
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </aside>

    <!-- RIGHT PANEL -->
    <main class="flex-1 flex flex-col min-w-0 bg-white relative">
      <!-- Header Toolbar -->
      <header class="h-14 border-b border-neutral-200 flex items-center justify-between px-4 md:px-6 bg-white sticky top-0 z-30">
        <div class="flex items-center gap-2">
          <!-- Mobile Menu Button -->
          <button @click="isMobileMenuOpen = true" class="md:hidden text-neutral-500 hover:text-neutral-700 p-1.5 -ml-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- View Mode Toggle -->
          <div class="flex items-center gap-0.5 bg-neutral-50 p-0.5 rounded-lg border border-neutral-200">
            <button
              @click="viewMode = 'preview'"
              :class="[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                viewMode === 'preview' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-800 hover:bg-white/50'
              ]"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span class="hidden sm:inline">Preview</span>
            </button>
            <button
              @click="viewMode = 'code'"
              :class="[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                viewMode === 'code' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-800 hover:bg-white/50'
              ]"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span class="hidden sm:inline">Code</span>
            </button>
          </div>

          <!-- Status Indicators -->
          <div v-if="status === GenerationStatus.THINKING || status === GenerationStatus.STREAMING" class="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 text-xs font-medium">
            <svg class="w-3 h-3" :class="status === GenerationStatus.STREAMING ? 'animate-spin' : 'animate-pulse'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{{ status === GenerationStatus.THINKING ? 'Thinking...' : 'Coding...' }}</span>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-1.5">
          <button 
            v-if="Object.keys(files).length > 0"
            @click="showFileExplorer = true"
            class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span class="hidden sm:inline">Files</span>
          </button>
          
          <!-- Save Website Button -->
          <button 
            v-if="Object.keys(files).length > 0"
            @click="handleSaveWebsite"
            :disabled="isSaving"
            class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="isSaving" class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span class="hidden sm:inline">{{ isSaving ? 'Saving...' : 'Save' }}</span>
          </button>
          
          <!-- Deploy Button -->
          <button 
            v-if="Object.keys(files).length > 0"
            @click="handleDeploy"
            :disabled="isDeploying || isBusy"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-[#d97759] text-white hover:bg-[#c86648] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <svg v-if="isDeploying" class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span class="hidden sm:inline">{{ isDeploying ? 'Deploying...' : 'Deploy' }}</span>
          </button>
          
          <!-- Element Selector Button -->
          <button
            v-if="viewMode === 'preview' && !isBusy && previewHtml"
            @click="toggleSelectionMode"
            :class="[
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
              isSelectionMode ? 'bg-[#d97759] text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            ]"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span class="hidden sm:inline">Select</span>
          </button>
          
          <!-- New Project Button -->
          <button 
            @click="handleNewProject"
            :disabled="isBusy"
            class="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-50"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New</span>
          </button>
        </div>
      </header>

      <!-- File Explorer Modal -->
      <div v-if="showFileExplorer" class="fixed inset-0 bg-neutral-900/40 z-40 backdrop-blur-sm" @click="showFileExplorer = false" />
      <div v-if="showFileExplorer" class="fixed top-20 right-6 bottom-6 w-96 bg-white border border-neutral-200 rounded-xl shadow-2xl z-50 flex flex-col">
        <div class="p-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-neutral-900 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Files
          </h2>
          <button @click="showFileExplorer = false" class="text-neutral-600 hover:text-neutral-900">
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <BuilderFileExplorer 
            :files="files" 
            :activeFile="activeFile"
            @fileSelect="handleFileSelect"
          />
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-hidden relative">
        <!-- Loading Overlay (Initial Generation) -->
        <div v-if="status === GenerationStatus.THINKING && Object.keys(files).length === 0" class="absolute inset-0 z-20 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-opacity duration-500">
          <div class="text-center">
            <div class="relative w-24 h-24 mx-auto mb-6">
              <div class="absolute inset-0 border-4 border-[#d97759]/30 rounded-full animate-ping"></div>
              <div class="absolute inset-0 border-4 border-t-[#d97759] rounded-full animate-spin"></div>
              <div class="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-10 h-10 text-[#d97759]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">Building your website...</h3>
            <p class="text-neutral-600 text-sm animate-pulse">Architecting layout & design</p>
          </div>
        </div>

        <!-- Live Update Indicator -->
        <div v-if="status === GenerationStatus.STREAMING" class="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur border border-neutral-200 px-3 py-1.5 rounded-full shadow-xl transition-all duration-300">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d97759] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d97759]"></span>
          </span>
          <span class="text-xs font-medium text-neutral-900">Live Updating</span>
        </div>

        <div v-if="viewMode === 'preview'" :class="[
          'h-full transition-opacity duration-500',
          isFullscreenPreview ? 'bg-white p-0' : 'bg-neutral-100 p-4 md:p-6'
        ]">
          <!-- Close Button (Mobile Fullscreen) -->
          <button
            v-if="isFullscreenPreview && previewHtml"
            @click="isFullscreenPreview = false"
            class="md:hidden fixed top-4 right-4 z-50 p-2 bg-neutral-900 text-white rounded-full shadow-lg hover:bg-neutral-800 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Browser Window -->
          <div v-if="previewHtml" :class="[
            'h-full flex flex-col bg-white overflow-hidden',
            isFullscreenPreview ? '' : 'rounded-xl shadow-2xl border border-neutral-200'
          ]">
            <!-- Browser Chrome (Hidden on mobile fullscreen) -->
            <div v-if="!isFullscreenPreview" class="hidden md:flex flex-shrink-0 bg-neutral-50 border-b border-neutral-200">
              <!-- Window Controls & Tabs -->
              <div class="flex items-center justify-between px-3 py-2 border-b border-neutral-200">
                <div class="flex items-center gap-2">
                  <!-- Traffic Lights (macOS style) -->
                  <div class="flex items-center gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                    <div class="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer"></div>
                  </div>
                  
                  <!-- Tab -->
                  <div class="ml-2 bg-white border border-neutral-200 rounded-t-lg px-4 py-1.5 flex items-center gap-2 min-w-[200px] shadow-sm">
                    <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span class="text-xs text-neutral-700 truncate flex-1">{{ browserTitle }}</span>
                    <button class="text-neutral-400 hover:text-neutral-600 transition-colors">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <!-- Version Badge -->
                <div class="text-[10px] text-neutral-400 font-medium px-2 py-0.5 bg-neutral-100 rounded">
                  v3
                </div>
              </div>
              
              <!-- Address Bar -->
              <div class="flex items-center gap-2 px-3 py-2.5">
                <!-- Navigation Controls -->
                <div class="flex items-center gap-1">
                  <button 
                    @click="browserGoBack"
                    :disabled="!canGoBack"
                    class="p-1.5 rounded-lg hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Go back"
                  >
                    <svg class="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    @click="browserGoForward"
                    :disabled="!canGoForward"
                    class="p-1.5 rounded-lg hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Go forward"
                  >
                    <svg class="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button 
                    @click="browserRefresh"
                    class="p-1.5 rounded-lg hover:bg-neutral-200 transition-colors"
                    title="Refresh"
                  >
                    <svg class="w-4 h-4 text-neutral-600" :class="{ 'animate-spin': isRefreshing }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
                
                <!-- URL Bar -->
                <div class="flex-1 flex items-center gap-2 bg-white border border-neutral-200 rounded-lg px-3 py-1.5 hover:border-neutral-300 focus-within:border-[#d97759]/50 focus-within:ring-2 focus-within:ring-[#d97759]/10 transition-all">
                  <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input 
                    v-model="browserUrl"
                    @keydown.enter="navigateToBrowserUrl"
                    type="text"
                    class="flex-1 text-xs text-neutral-700 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                    placeholder="localhost:3000"
                  />
                  <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                
                <!-- Browser Actions -->
                <div class="flex items-center gap-1">
                  <button 
                    @click="openInNewTab"
                    class="p-1.5 rounded-lg hover:bg-neutral-200 transition-colors"
                    title="Open in new tab"
                  >
                    <svg class="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <button class="p-1.5 rounded-lg hover:bg-neutral-200 transition-colors" title="More options">
                    <svg class="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Browser Viewport -->
            <div class="flex-1 relative bg-white overflow-hidden">
              <iframe
                ref="previewIframe"
                :srcdoc="previewHtml"
                class="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                @load="handleIframeLoad"
              />
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-else class="h-full flex items-center justify-center">
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-neutral-200 flex items-center justify-center">
                <svg class="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-lg mb-2 font-medium text-neutral-900">Ready to Create</p>
              <p class="text-sm text-neutral-600">Describe your dream website to get started</p>
            </div>
          </div>
        </div>

        <div v-else class="h-full bg-neutral-50 flex flex-col">
          <div v-if="activeFile && files[activeFile]" class="flex-1 flex flex-col overflow-hidden">
            <!-- File Header -->
            <div class="px-4 py-2 border-b border-neutral-200 flex items-center justify-between bg-white">
              <div class="flex items-center gap-2 text-xs text-neutral-600">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ activeFile }}
              </div>
            </div>
            <!-- File Content -->
            <div class="flex-1 overflow-auto p-4">
              <pre class="text-xs text-neutral-900 font-mono leading-relaxed">{{ files[activeFile].content }}</pre>
            </div>
          </div>
          <div v-else class="h-full flex items-center justify-center text-neutral-600">
            <div class="text-center">
              <p class="text-lg mb-2 text-neutral-900">{{ Object.keys(files).length > 0 ? 'Select a file' : 'No code yet' }}</p>
              <p class="text-sm text-neutral-600">{{ Object.keys(files).length > 0 ? 'Click the Files button to browse' : 'Generate a website to see the code' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Floating Input -->
      <div 
        v-if="!isMobileMenuOpen && Object.keys(files).length > 0" 
        :class="[
          'fixed bottom-8 left-4 right-4 z-50 md:hidden transition-all duration-300 transform',
          showMobileQuickInput ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 pointer-events-none'
        ]"
        style="padding-bottom: env(safe-area-inset-bottom);"
      >
        <div class="bg-white/95 backdrop-blur-md border border-neutral-200 rounded-2xl shadow-2xl p-2 flex gap-2 items-center">
          <div class="flex-1 relative">
            <input
              ref="mobileInput"
              v-model="prompt"
              @keydown.enter="handleGenerate"
              type="text"
              placeholder="Ask a follow-up..."
              :disabled="isBusy"
              class="w-full bg-transparent border-0 text-base text-neutral-900 placeholder-neutral-500 focus:ring-0 px-4 py-2"
            />
          </div>
          <button
            @click="handleGenerate"
            :disabled="isBusy || !prompt.trim()"
            class="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white rounded-xl p-3 flex-shrink-0 transition-colors"
          >
            <svg v-if="isBusy" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { FileMap } from '~/types/builder'
import { GenerationStatus } from '~/types/builder'

definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Chat message interface with optional properties
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  thinking?: Array<{type: string, text: string}>
  files?: string[]
  status?: string
  statusText?: string
  duration?: string
}

// Composables
const { generateProjectStream, improveProjectAgentic } = useBuilderGeneration()
const { bundleProjectForPreview } = useBuilderProject()
const {
  createConversation,
  getConversations,
  getConversation,
  addMessage,
  saveProjectSnapshot,
  getLatestSnapshot,
  updateConversationTitle,
  deleteConversation,
  generateTitle
} = useConversations()
const {
  createSite,
  getSites,
  updateSiteFiles,
  generateSiteTitle,
  getSiteVersions
} = useGeneratedSites()

// State
const viewMode = ref<'preview' | 'code'>('preview')
const isFullscreenPreview = ref(false)
const prompt = ref("A modern landing page for an AI startup called 'Nebula'. Dark theme, glowing gradients, hero section, features grid, and a newsletter signup.")
const status = ref<GenerationStatus>(GenerationStatus.IDLE)
const files = ref<FileMap>({})
const previewHtml = ref('')
const errorMsg = ref<string | null>(null)
const useSearch = ref(false)
const chatHistory = ref<Array<ChatMessage>>([])
const agentLogs = ref<Array<{type: string, message?: string, tool?: string, args?: any}>>([])
const showAgentLogs = ref(false)
const chatContainer = ref<HTMLDivElement | null>(null)

// Conversation persistence
const currentConversationId = ref<string | null>(null)
const conversations = ref<Array<any>>([])
const showConversationList = ref(false)

// Site persistence
const currentSiteId = ref<string | null>(null)
const sites = ref<Array<any>>([])
const showSitesList = ref(false)
const isSaving = ref(false)
const isDeploying = ref(false)
const deployedUrl = ref<string | null>(null)
const activeFile = ref<string | null>(null)
const showFileExplorer = ref(false)
const isSelectionMode = ref(false)
const selectedElement = ref<{tagName: string, html: string, text: string} | null>(null)
const isMobileMenuOpen = ref(true) // Start with chat open on mobile
const showMobileQuickInput = ref(true) // Toggle for scroll
const mainInput = ref<HTMLTextAreaElement | null>(null)
const mobileInput = ref<HTMLInputElement | null>(null)

// Browser state
const previewIframe = ref<HTMLIFrameElement | null>(null)
const browserUrl = ref('localhost:3000')
const browserTitle = ref('Preview')
const canGoBack = ref(false)
const canGoForward = ref(false)
const isRefreshing = ref(false)
const navigationHistory = ref<string[]>([])
const currentHistoryIndex = ref(-1)

// Streaming progress state
const streamingProgress = ref<{
  currentFile: string | null
  filesGenerated: string[]
  totalFiles: number
  isThinking: boolean
}>({
  currentFile: null,
  filesGenerated: [],
  totalFiles: 0,
  isThinking: false
})

// Thinking steps tracking
const thinkingSteps = ref<Array<{type: 'thinking' | 'search' | 'file', text: string, timestamp: number}>>([])

// Real-time AI output streaming
const streamingText = ref('')
const isStreamingText = ref(false)
const streamingOutputRef = ref<HTMLDivElement | null>(null)

// Computed
const isEditing = computed(() => Object.keys(files.value).length > 0)
const isBusy = computed(() => 
  status.value === GenerationStatus.THINKING || 
  status.value === GenerationStatus.STREAMING
)
const isGenerating = computed(() => isBusy.value)

// Methods
const handleGenerate = async () => {
  if (!prompt.value.trim() || isGenerating.value) return
  
  // Check if we should use RAG-based element editing
  if (selectedElement.value && Object.keys(files.value).length > 0) {
    await handleElementEdit()
    return
  }
  
  const userPrompt = prompt.value
  
  // Create or use existing conversation
  if (!currentConversationId.value) {
    const title = generateTitle(userPrompt)
    const conversation = await createConversation(title)
    if (conversation) {
      currentConversationId.value = conversation.id
    }
  }
  
  // Add user message to chat
  chatHistory.value.push({
    role: 'user',
    content: userPrompt,
    timestamp: Date.now()
  })
  
  // Save user message to database
  if (currentConversationId.value) {
    await addMessage(currentConversationId.value, 'user', userPrompt)
  }
  
  prompt.value = '' // Clear input
  
  status.value = GenerationStatus.STREAMING
  errorMsg.value = null
  agentLogs.value = [] // Clear previous logs
  
  // Track generation start time
  const generationStartTime = Date.now()
  
  // Show chatbot area on mobile when generation starts
  if (window.innerWidth < 768) {
    isMobileMenuOpen.value = true
  }
  
  // Reset streaming state
  streamingText.value = ''
  isStreamingText.value = true
  thinkingSteps.value = []
  streamingProgress.value = {
    currentFile: null,
    filesGenerated: [],
    totalFiles: 0,
    isThinking: false
  }
  
  try {
    console.log('🚀 Starting generation with prompt:', userPrompt)
    
    // Branch: If we have existing files, use the Agentic workflow for improvement
    if (Object.keys(files.value).length > 0) {
      const stream = improveProjectAgentic(
        'current-project', // Placeholder ID
        userPrompt,
        files.value
      )

      for await (const update of stream) {
        // Handle different update types
        if (update.type === 'status') {
          streamingProgress.value.isThinking = true
          streamingText.value = update.message || 'Thinking...'
        } 
        else if (update.type === 'action') {
          // Log tool usage
          agentLogs.value.push({
            type: 'action',
            tool: update.tool,
            args: update.args
          })
          // Auto-scroll logs
          nextTick(() => {
            const logContainer = document.getElementById('agent-logs-container')
            if (logContainer) logContainer.scrollTop = logContainer.scrollHeight
          })
        }
        else if (update.type === 'file_update' || update.type === 'file_delete') {
          streamingProgress.value.isThinking = false
          
          if (update.files) {
            files.value = update.files
            
            // Track change for UI
            if (update.path) {
              streamingProgress.value.currentFile = update.path
              if (!streamingProgress.value.filesGenerated.includes(update.path)) {
                streamingProgress.value.filesGenerated.push(update.path)
              }
            }
            
            streamingProgress.value.totalFiles = Object.keys(files.value).length
            
            // Update preview immediately on file change
            previewHtml.value = bundleProjectForPreview(files.value)
          }
        }
        else if (update.type === 'message') {
          // Use the message from backend if available
          const assistantMessage = update.content || 'Generation complete.'
          chatHistory.value.push({
            role: 'assistant',
            content: assistantMessage,
            timestamp: Date.now()
          })
          
          // Save assistant message to database
          if (currentConversationId.value) {
            await addMessage(currentConversationId.value, 'assistant', assistantMessage)
          }
        }
      }
      
      previewHtml.value = bundleProjectForPreview(files.value)
    } else {
      // Standard Full Generation for new projects
      const stream = generateProjectStream(
        userPrompt,
        files.value,
        undefined,
        undefined,
        useSearch.value
      )

      for await (const update of stream) {
        console.log('📦 Received update:', Object.keys(update.files).length, 'files')
        
        if (update.streamingText) {
          streamingText.value = update.streamingText
        }
        
        // Track thinking state
        const wasThinking = streamingProgress.value.isThinking
        streamingProgress.value.isThinking = update.isThinking
        
        // Add thinking step when AI starts thinking
        if (update.isThinking && !wasThinking) {
          thinkingSteps.value.push({
            type: 'thinking',
            text: 'Analyzing request...',
            timestamp: Date.now()
          })
        }
        
        // Track web search if enabled
        if (useSearch.value && thinkingSteps.value.length === 1) {
          thinkingSteps.value.push({
            type: 'search',
            text: 'Searching web for context...',
            timestamp: Date.now()
          })
        }
        
        const currentFileKeys = Object.keys(update.files)
        const newFiles = currentFileKeys.filter(key => !Object.keys(files.value).includes(key))
        
        if (newFiles.length > 0) {
          const newFile = newFiles[newFiles.length - 1]
          streamingProgress.value.currentFile = newFile
          streamingProgress.value.filesGenerated = [...new Set([...streamingProgress.value.filesGenerated, ...newFiles])]
          
          // Add thinking step for each new file
          thinkingSteps.value.push({
            type: 'file',
            text: `Creating ${newFile}`,
            timestamp: Date.now()
          })
        }
        
        streamingProgress.value.totalFiles = currentFileKeys.length
        files.value = update.files
      }
      
      previewHtml.value = bundleProjectForPreview(files.value)
    }
    
    // Save project snapshot after generation completes
    if (currentConversationId.value && Object.keys(files.value).length > 0) {
      await saveProjectSnapshot(currentConversationId.value, files.value)
    }
    
    // Save or update generated site
    if (Object.keys(files.value).length > 0) {
      if (currentSiteId.value) {
        // Update existing site
        await updateSiteFiles(
          currentSiteId.value,
          files.value,
          `Updated via: ${userPrompt.substring(0, 100)}`
        )
        console.log('✅ Site updated:', currentSiteId.value)
      } else {
        // Create new site
        const siteTitle = generateSiteTitle(files.value)
        const site = await createSite(
          siteTitle,
          files.value,
          currentConversationId.value || undefined,
          `Generated from: ${userPrompt.substring(0, 200)}`
        )
        if (site) {
          currentSiteId.value = site.id
          console.log('✅ New site created:', site.id)
        }
      }
    }
    
    isStreamingText.value = false
    status.value = GenerationStatus.COMPLETE
    console.log('✅ Generation complete!')
    
    // Calculate actual generation duration
    const totalDuration = Math.floor((Date.now() - generationStartTime) / 1000)
    const minutes = Math.floor(totalDuration / 60)
    const seconds = totalDuration % 60
    const durationText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
    
    // Add completion message
    const completionMessage = `${isEditing.value ? 'Updated' : 'Generated'} ${Object.keys(files.value).length} files successfully!`
    
    chatHistory.value.push({
      role: 'assistant',
      content: completionMessage,
      timestamp: Date.now(),
      status: 'success',
      statusText: 'No issues found',
      duration: durationText
    })
    
    if (currentConversationId.value) {
      await addMessage(currentConversationId.value, 'assistant', completionMessage)
    }
    
    // Auto-switch to preview on mobile after generation completes
    if (window.innerWidth < 768) {
      // Wait a moment for user to see the summary, then switch to preview
      setTimeout(() => {
        isMobileMenuOpen.value = false
      }, 2000)
    }
    
  } catch (error: any) {
    console.error('❌ Generation error:', error)
    errorMsg.value = error.message || 'Failed to generate project'
    status.value = GenerationStatus.ERROR
    
    chatHistory.value.push({
      role: 'assistant',
      content: `Error: ${error.message || 'Failed to generate project'}`,
      timestamp: Date.now()
    })
  }
}

const handleNewProject = async () => {
  if (confirm('Start a new project? This will clear your current work.')) {
    // Save current state before clearing
    if (currentConversationId.value && Object.keys(files.value).length > 0) {
      await saveProjectSnapshot(currentConversationId.value, files.value)
    }
    
    // Save final site state if exists
    if (currentSiteId.value && Object.keys(files.value).length > 0) {
      await updateSiteFiles(currentSiteId.value, files.value, 'Final state before new project')
    }
    
    files.value = {}
    previewHtml.value = ''
    chatHistory.value = []
    activeFile.value = null
    currentConversationId.value = null
    currentSiteId.value = null
    prompt.value = "A modern landing page for an AI startup called 'Nebula'. Dark theme, glowing gradients, hero section, features grid, and a newsletter signup."
    status.value = GenerationStatus.IDLE
    errorMsg.value = null
  }
}

const loadConversations = async () => {
  const convs = await getConversations()
  conversations.value = convs
}

const loadConversation = async (conversationId: string) => {
  const conversation = await getConversation(conversationId)
  if (!conversation) return
  
  // Load messages into chat history
  chatHistory.value = (conversation.messages || []).map(msg => ({
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
    timestamp: new Date(msg.created_at || Date.now()).getTime()
  }))
  
  // Load latest project snapshot
  const snapshot = await getLatestSnapshot(conversationId)
  if (snapshot) {
    files.value = snapshot.files
    previewHtml.value = bundleProjectForPreview(snapshot.files)
  }
  
  currentConversationId.value = conversationId
  showConversationList.value = false
}

const handleSaveWebsite = async () => {
  if (Object.keys(files.value).length === 0) {
    console.warn('No files to save')
    return false
  }
  
  // Check if user is authenticated
  const user = useSupabaseUser()
  if (!user.value) {
    console.error('User not authenticated')
    chatHistory.value.push({
      role: 'assistant',
      content: '❌ Please log in to save your website',
      timestamp: Date.now()
    })
    return false
  }
  
  isSaving.value = true
  try {
    console.log('💾 Saving website...', { currentSiteId: currentSiteId.value, fileCount: Object.keys(files.value).length })
    
    if (currentSiteId.value) {
      // Update existing site
      const success = await updateSiteFiles(
        currentSiteId.value,
        files.value,
        'Manual save'
      )
      
      if (!success) {
        throw new Error('Failed to update site files')
      }
      
      console.log('✅ Site updated:', currentSiteId.value)
      
      // Show success message
      chatHistory.value.push({
        role: 'assistant',
        content: '✅ Website saved successfully!',
        timestamp: Date.now()
      })
      return true
    } else {
      // Create new site
      const siteTitle = generateSiteTitle(files.value)
      console.log('Creating new site:', siteTitle)
      
      const site = await createSite(
        siteTitle,
        files.value,
        currentConversationId.value || undefined,
        'Manually saved website'
      )
      
      if (!site) {
        throw new Error('Failed to create site')
      }
      
      currentSiteId.value = site.id
      console.log('✅ New site created:', site.id)
      
      // Show success message
      chatHistory.value.push({
        role: 'assistant',
        content: `✅ Website "${siteTitle}" saved successfully!`,
        timestamp: Date.now()
      })
      return true
    }
  } catch (error: any) {
    console.error('❌ Save error:', error)
    chatHistory.value.push({
      role: 'assistant',
      content: `❌ Failed to save: ${error.message || 'Unknown error'}`,
      timestamp: Date.now()
    })
    return false
  } finally {
    isSaving.value = false
  }
}

const handleDeploy = async () => {
  if (Object.keys(files.value).length === 0) return
  
  isDeploying.value = true
  try {
    // First, ensure site is saved
    if (!currentSiteId.value) {
      console.log('Site not saved yet, saving first...')
      const saved = await handleSaveWebsite()
      if (!saved) {
        throw new Error('Failed to save site before deployment')
      }
    }
    
    if (!currentSiteId.value) {
      throw new Error('Site ID not available after save')
    }
    
    console.log('🚀 Starting deployment for site:', currentSiteId.value)
    
    // Show deploying message
    chatHistory.value.push({
      role: 'assistant',
      content: '🚀 Deploying your website...',
      timestamp: Date.now()
    })
    
    // Call deploy API
    const response = await $fetch<{ success: boolean; url: string; message: string }>('/api/builder/deploy', {
      method: 'POST',
      body: {
        siteId: currentSiteId.value,
        files: files.value
      }
    })
    
    if (response?.success && response?.url) {
      deployedUrl.value = response.url
      
      // Update site with published URL
      const { publishSite: publishSiteFn } = useGeneratedSites()
      await publishSiteFn(currentSiteId.value, response.url)
      
      // Show success message with link
      chatHistory.value.push({
        role: 'assistant',
        content: `✅ Website deployed successfully!\n\n🌐 Live URL: ${response.url}\n\nYour website is now live and accessible to everyone!`,
        timestamp: Date.now()
      })
      
      console.log('✅ Deployed to:', response.url)
    }
  } catch (error: any) {
    console.error('❌ Deploy error:', error)
    chatHistory.value.push({
      role: 'assistant',
      content: `❌ Deployment failed: ${error.message || 'Unknown error'}`,
      timestamp: Date.now()
    })
  } finally {
    isDeploying.value = false
  }
}

const handleFileAttach = () => {
  // Create a hidden file input
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = '.html,.css,.js,.json,.md,.txt'
  
  input.onchange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (!files || files.length === 0) return
    
    // Process attached files
    for (const file of Array.from(files)) {
      console.log('Attached file:', file.name)
      // TODO: Add file to message context
      // For now, just show a message
      chatHistory.value.push({
        role: 'assistant',
        content: `📎 File attached: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
        timestamp: Date.now()
      })
    }
  }
  
  input.click()
}

const handleFileSelect = (path: string) => {
  activeFile.value = path
  viewMode.value = 'code'
  showFileExplorer.value = false
}

const toggleSelectionMode = () => {
  isSelectionMode.value = !isSelectionMode.value
  const iframe = document.querySelector('iframe')
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage({
      type: 'TOGGLE_SELECTION_MODE',
      enabled: isSelectionMode.value
    }, '*')
  }
}

// Browser navigation functions
const handleIframeLoad = () => {
  if (!previewIframe.value) return
  
  try {
    // Extract title from iframe
    const iframeDoc = previewIframe.value.contentDocument || previewIframe.value.contentWindow?.document
    if (iframeDoc) {
      const title = iframeDoc.title || 'Preview'
      browserTitle.value = title
      
      // Update navigation history
      if (currentHistoryIndex.value === -1 || navigationHistory.value[currentHistoryIndex.value] !== browserUrl.value) {
        // Remove forward history if navigating to new page
        navigationHistory.value = navigationHistory.value.slice(0, currentHistoryIndex.value + 1)
        navigationHistory.value.push(browserUrl.value)
        currentHistoryIndex.value = navigationHistory.value.length - 1
      }
      
      // Update navigation button states
      canGoBack.value = currentHistoryIndex.value > 0
      canGoForward.value = currentHistoryIndex.value < navigationHistory.value.length - 1
    }
  } catch (e) {
    // Cross-origin restrictions - ignore
    console.log('Cannot access iframe content (cross-origin)')
  }
}

const browserGoBack = () => {
  if (!canGoBack.value || currentHistoryIndex.value <= 0) return
  
  currentHistoryIndex.value--
  browserUrl.value = navigationHistory.value[currentHistoryIndex.value]
  
  // In a real implementation, this would navigate the iframe
  // For now, we just update the UI state
  canGoBack.value = currentHistoryIndex.value > 0
  canGoForward.value = true
}

const browserGoForward = () => {
  if (!canGoForward.value || currentHistoryIndex.value >= navigationHistory.value.length - 1) return
  
  currentHistoryIndex.value++
  browserUrl.value = navigationHistory.value[currentHistoryIndex.value]
  
  canGoBack.value = true
  canGoForward.value = currentHistoryIndex.value < navigationHistory.value.length - 1
}

const browserRefresh = () => {
  if (!previewIframe.value) return
  
  isRefreshing.value = true
  
  // Force iframe reload by updating srcdoc
  const currentHtml = previewHtml.value
  previewHtml.value = ''
  
  nextTick(() => {
    previewHtml.value = currentHtml
    setTimeout(() => {
      isRefreshing.value = false
    }, 500)
  })
}

const navigateToBrowserUrl = () => {
  // In a real browser, this would navigate to the URL
  // For our preview, we just update the display
  console.log('Navigate to:', browserUrl.value)
  
  // Could potentially load external URLs in the future
  if (browserUrl.value.startsWith('http://') || browserUrl.value.startsWith('https://')) {
    // External URL - would need to handle CORS
    console.log('External URL navigation not supported in preview')
  }
}

const openInNewTab = () => {
  // Create a blob URL from the current HTML
  const blob = new Blob([previewHtml.value], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  
  // Clean up the blob URL after a delay
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const autoResize = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

// Generate contextual follow-up suggestions based on chat history
const getFollowUpSuggestions = (message: ChatMessage) => {
  const recentMessages = chatHistory.value.slice(-3).map(m => m.content.toLowerCase())
  const hasFiles = Object.keys(files.value).length > 0
  
  // Analyze what was just done
  const isContactForm = recentMessages.some(m => m.includes('contact') || m.includes('form'))
  const isLandingPage = recentMessages.some(m => m.includes('landing') || m.includes('hero'))
  const hasColors = recentMessages.some(m => m.includes('color') || m.includes('theme'))
  const hasLayout = recentMessages.some(m => m.includes('layout') || m.includes('section'))
  
  const suggestions: string[] = []
  
  if (!hasFiles) {
    return ['Create a landing page', 'Build a contact form', 'Make a portfolio site']
  }
  
  // Contextual suggestions based on what was created
  if (isContactForm) {
    suggestions.push('Add form validation', 'Style the submit button', 'Add a success message')
  } else if (isLandingPage) {
    suggestions.push('Add a pricing section', 'Create a testimonials area', 'Add a CTA button')
  } else if (hasColors) {
    suggestions.push('Adjust the font styles', 'Add hover effects', 'Update button styles')
  } else if (hasLayout) {
    suggestions.push('Make it mobile responsive', 'Add animations', 'Improve spacing')
  } else {
    // Generic but useful suggestions
    suggestions.push('Change the color scheme', 'Add more sections', 'Improve the design')
  }
  
  return suggestions.slice(0, 3)
}

// Apply a suggestion by setting it as the prompt
const applySuggestion = (suggestion: string) => {
  prompt.value = suggestion
  // Auto-focus the textarea
  nextTick(() => {
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.focus()
    }
  })
}

// Auto-enable fullscreen on mobile when preview loads
watch(previewHtml, (newHtml) => {
  if (newHtml && window.innerWidth < 768) {
    isFullscreenPreview.value = true
  }
})

// Reset fullscreen when switching to code view
watch(viewMode, (newMode) => {
  if (newMode === 'code') {
    isFullscreenPreview.value = false
  }
})

const handleElementEdit = async () => {
  if (!selectedElement.value || !prompt.value.trim()) return
  
  const userPrompt = prompt.value
  prompt.value = ''
  
  // Add user message to chat
  chatHistory.value.push({
    role: 'user',
    content: `[Editing selected element] ${userPrompt}`,
    timestamp: Date.now()
  })
  
  status.value = GenerationStatus.STREAMING
  errorMsg.value = null
  
  try {
    console.log('🎯 Using precise editing...')
    
    // Call the precise edit API (two-step replacement)
    const response: any = await $fetch('/api/builder/precise-edit', {
      method: 'POST',
      body: {
        currentFiles: files.value,
        prompt: userPrompt
      }
    })
    
    if (response.success) {
      // CRITICAL: Only update the ONE modified file, keep all others intact
      const updatedFiles = { ...files.value }
      
      // Update only the modified file
      updatedFiles[response.file] = {
        name: response.file.split('/').pop() || response.file,
        path: response.file,
        content: response.content,
        type: 'file'
      }
      
      // Replace files.value with the merged result
      files.value = updatedFiles
      
      // Update preview
      previewHtml.value = bundleProjectForPreview(files.value)
      
      // Add success message to chat
      const replacementInfo = response.replaced ? `\n\nReplaced: "${response.replaced.old}" → "${response.replaced.new}"` : ''
      chatHistory.value.push({
        role: 'assistant',
        content: `✅ Successfully edited ${response.file}${replacementInfo}`,
        timestamp: Date.now()
      })
      
      // Clear selected element
      selectedElement.value = null
      
      console.log('✅ Element edit complete - only modified file updated')
      console.log('📊 Total files in project:', Object.keys(files.value).length)
    }
    
    status.value = GenerationStatus.COMPLETE
    
  } catch (error: any) {
    console.error('❌ Element edit error:', error)
    errorMsg.value = error.message || 'Failed to edit element'
    status.value = GenerationStatus.ERROR
    
    chatHistory.value.push({
      role: 'assistant',
      content: `❌ Error: ${error.message || 'Failed to edit element'}`,
      timestamp: Date.now()
    })
  }
}

// Auto-scroll chat to bottom when messages update
watch([chatHistory, () => status.value], () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}, { deep: true })

// Update browser title when preview HTML changes
watch(previewHtml, (newHtml) => {
  if (newHtml) {
    // Try to extract title from HTML
    const titleMatch = newHtml.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch && titleMatch[1]) {
      browserTitle.value = titleMatch[1]
    } else {
      browserTitle.value = 'Preview'
    }
  }
})

onMounted(async () => {
  // Load conversations list
  await loadConversations()
  
  // Check if there's a prompt from the website page
  if (process.client) {
    const websitePrompt = sessionStorage.getItem('websitePrompt')
    const uploadedFilesJson = sessionStorage.getItem('uploadedFiles')
    const loadProjectOnly = sessionStorage.getItem('loadProjectOnly')
    
    // Handle uploaded files (load as project)
    if (uploadedFilesJson) {
      try {
        const uploadedFiles = JSON.parse(uploadedFilesJson)
        
        // Convert uploaded files to FileMap format
        const convertedFiles: FileMap = {}
        for (const [path, content] of Object.entries(uploadedFiles)) {
          // Normalize path (remove leading slashes, ensure proper format)
          const normalizedPath = path.replace(/^\/+/, '')
          const pathParts = normalizedPath.split('/')
          const fileName = pathParts[pathParts.length - 1]
          
          convertedFiles[normalizedPath] = {
            name: fileName,
            path: normalizedPath,
            content: content as string,
            type: 'file'
          }
        }
        
        // Load the files into the project
        files.value = convertedFiles
        
        // Update preview
        previewHtml.value = bundleProjectForPreview(convertedFiles)
        
        // Add a system message to chat
        chatHistory.value.push({
          role: 'assistant',
          content: `Loaded ${Object.keys(convertedFiles).length} files from your upload. You can now make changes or improvements to your website.`,
          timestamp: Date.now()
        })
        
        // Clear the default prompt
        prompt.value = ''
        
        sessionStorage.removeItem('uploadedFiles')
        sessionStorage.removeItem('loadProjectOnly')
      } catch (error) {
        console.error('Failed to parse uploaded files:', error)
      }
    }
    // Handle website prompt (auto-generate)
    else if (websitePrompt) {
      prompt.value = websitePrompt
      sessionStorage.removeItem('websitePrompt')
      
      // Auto-trigger generation after a short delay
      setTimeout(() => {
        handleGenerate()
      }, 500)
    }
  }
  
  window.addEventListener('message', (event) => {
    if (event.data.type === 'NEBULA_ELEMENT_SELECTED') {
      selectedElement.value = event.data.payload
      isSelectionMode.value = false
      
      // Disable selection mode in iframe
      const iframe = document.querySelector('iframe')
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'TOGGLE_SELECTION_MODE',
          enabled: false
        }, '*')
      }
    } else if (event.data.type === 'PREVIEW_SCROLL') {
      // Hide on scroll down, show on scroll up (or at bottom)
      if (event.data.direction === 'down' && event.data.scrollY > 50) {
        showMobileQuickInput.value = false
      } else {
        showMobileQuickInput.value = true
      }
    }
  })
})

// Auto-focus input when element is selected
watch(selectedElement, (newVal) => {
  if (newVal) {
    nextTick(() => {
      // Check if mobile menu is closed (Preview mode) -> Focus mobile input
      // Check if desktop or mobile menu open -> Focus main input
      if (window.innerWidth < 768 && !isMobileMenuOpen.value) {
        mobileInput.value?.focus()
      } else {
        mainInput.value?.focus()
      }
    })
  }
})

// Auto-scroll chat container as text is generated
watch(streamingText, () => {
  if (isStreamingText.value && chatContainer.value) {
    nextTick(() => {
      chatContainer.value?.scrollTo({
        top: chatContainer.value.scrollHeight,
        behavior: 'smooth'
      })
    })
  }
})

// Update preview when files change
let lastUpdate = 0
watch(files, (newFiles) => {
  const now = Date.now()
  // Throttle updates (100ms) - fast enough for live feel, slow enough to prevent browser lag
  if (now - lastUpdate > 100 || status.value !== GenerationStatus.STREAMING) {
    if (Object.keys(newFiles).length > 0) {
      previewHtml.value = bundleProjectForPreview(newFiles)
      lastUpdate = now
    }
  }
}, { deep: true })

// Auto-scroll chat to bottom
watch(chatHistory, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}, { deep: true })
</script>

<style scoped>
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
