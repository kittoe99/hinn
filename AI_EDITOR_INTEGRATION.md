# AI Editor Integration Plan

## What Was Copied from Web Builder

### 1. API Endpoint ✅
- **File**: `server/api/hosting/chat.post.ts`
- **Function**: OpenAI GPT-4o integration for AI-powered HTML generation
- **Features**:
  - Full website generation with complete HTML/CSS/JS
  - Context-aware editing (selected elements)
  - Production-ready code output
  - No token limits for complete generation

### 2. Key Features to Integrate

#### A. AI Chat Interface
Add to the AI Generator tab:
- Chat message history display
- Message input with file attachment
- Typing indicator
- AI response parsing (extract code blocks)

#### B. Live Preview
- iframe-based HTML preview
- Viewport size selector (responsive/desktop/tablet/mobile)
- Element selector (click to select elements in preview)
- Refresh preview button

#### C. File Loading
Already implemented:
- ✅ File picker for HTML files
- ✅ Load content into textarea
- ✅ Clear function

#### D. Code Extraction
- Parse AI responses for code blocks
- Auto-detect language (html/css/js)
- Auto-populate filename
- Update textarea with generated code

## Implementation Steps

### Step 1: Add Chat State (in hosting.vue)
```js
const chatMessages = ref([])
const chatInput = ref('')
const isAiTyping = ref(false)
```

### Step 2: Add Chat UI (in AI Generator tab)
```vue
<!-- Chat Messages -->
<div class="space-y-3 max-h-64 overflow-y-auto mb-4">
  <div v-for="(msg, i) in chatMessages" :key="i"
       :class="msg.role === 'user' ? 'text-right' : 'text-left'">
    <div :class="msg.role === 'user' ? 'bg-neutral-900 text-white' : 'bg-[#f0ebe3] text-neutral-800'"
         class="inline-block rounded-lg px-4 py-2 text-xs">
      {{ msg.content }}
    </div>
  </div>
  <div v-if="isAiTyping" class="text-left">
    <div class="inline-block bg-[#f0ebe3] rounded-lg px-4 py-2">
      <span class="animate-pulse">AI is typing...</span>
    </div>
  </div>
</div>

<!-- Chat Input -->
<div class="flex gap-2 mb-4">
  <input v-model="chatInput" 
         @keyup.enter="sendAiMessage"
         placeholder="Ask AI to generate or edit HTML..."
         class="flex-1 px-3 py-2 border rounded-lg text-xs" />
  <button @click="sendAiMessage"
          :disabled="!chatInput.trim() || isAiTyping"
          class="px-4 py-2 bg-[#d97759] text-white rounded-lg text-xs">
    Send
  </button>
</div>
```

### Step 3: Add sendAiMessage Function
```js
const sendAiMessage = async () => {
  if (!chatInput.value.trim()) return
  
  // Add user message
  chatMessages.value.push({
    role: 'user',
    content: chatInput.value
  })
  
  const userMsg = chatInput.value
  chatInput.value = ''
  isAiTyping.value = true
  
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    
    const res = await $fetch('/api/hosting/chat', {
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
    
    // Add AI response
    chatMessages.value.push({
      role: 'assistant',
      content: res.message
    })
    
    // Extract code from response
    extractCodeFromResponse(res.message)
    
  } catch (err: any) {
    console.error('[AI] Chat error', err)
    chatMessages.value.push({
      role: 'assistant',
      content: `Error: ${err.message}`
    })
  } finally {
    isAiTyping.value = false
  }
}

const extractCodeFromResponse = (message: string) => {
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g
  const matches = [...message.matchAll(codeBlockRegex)]
  
  if (matches.length > 0) {
    const [, language, code] = matches[0]
    
    if (language.toLowerCase() === 'html') {
      aiHtml.value = code.trim()
    }
  }
}
```

### Step 4: Add Live Preview (Optional)
```vue
<!-- Live Preview -->
<div v-if="aiHtml" class="mt-4">
  <div class="flex items-center justify-between mb-2">
    <h4 class="text-xs font-semibold">Live Preview</h4>
    <button @click="refreshPreview" 
            class="text-xs text-[#d97759]">
      Refresh
    </button>
  </div>
  <iframe ref="previewIframe"
          class="w-full border rounded-lg bg-white"
          style="height: 400px"
          sandbox="allow-scripts allow-forms allow-modals"></iframe>
</div>
```

```js
const previewIframe = ref(null)

const refreshPreview = () => {
  if (!aiHtml.value || !previewIframe.value) return
  
  const iframe = previewIframe.value
  const doc = iframe.contentDocument || iframe.contentWindow.document
  
  doc.open()
  doc.write(aiHtml.value)
  doc.close()
}

// Watch aiHtml and auto-refresh
watch(aiHtml, () => {
  nextTick(() => refreshPreview())
})
```

## Quick Integration (Minimal)

If you want the simplest integration:

1. ✅ API endpoint is already created
2. Add chat UI to AI Generator tab (Step 2)
3. Add sendAiMessage function (Step 3)
4. AI will generate HTML and auto-populate the textarea
5. User clicks "Create generated version" to deploy

## Full Integration (Complete)

For the complete Web Builder experience:
1. All of the above
2. Add live preview iframe
3. Add element selector
4. Add viewport size controls
5. Add file attachment support

## Environment Variables

Make sure you have in `.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Next Steps

1. Decide: Minimal or Full integration?
2. I can implement whichever you prefer
3. Test with: "Create a landing page for a coffee shop"
