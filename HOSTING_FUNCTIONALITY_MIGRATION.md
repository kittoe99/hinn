# Hosting Page Functionality Migration

## Status: Partial - UI Created, Functionality Pending

The hosting page UI has been created with all visual elements from the Kubernetes agent-app, but the full JavaScript functionality (1800+ lines) is too large to migrate in a single file operation.

## What's Been Done

✅ **UI Template Created** (`pages/hosting.vue`)
- Header with gradient background
- File controls (Owner, Repo, Ref, Path)
- Load/Save buttons
- Live preview iframe with viewport selector
- HTML code editor textarea
- AI Element Editor chat interface
- Selected element code viewer
- Commit message input

✅ **Element Selector Composable** (`composables/useElementSelector.ts`)
- `computeUniqueSelector()` - Generate precise CSS selectors
- `replaceOldWithNewRobust()` - Robust HTML replacement
- `findElementHTMLInContentBySelector()` - Find elements by selector
- All helper functions for element selection

## What Needs to Be Added

The following functionality from `large-file.js` needs to be integrated into `pages/hosting.vue`:

### 1. Core Functions (Lines 1-400)
```typescript
- Element selection event handlers
- Preview rendering
- Viewport management
- File loading/saving
- Status updates
```

### 2. Element Selection (Lines 400-750)
```typescript
- setupElementSelector()
- removeElementSelector()
- handleElementClick()
- handleElementHover()
- handleElementOut()
- injectSelectorStyles()
```

### 3. Element Display (Lines 750-1200)
```typescript
- addComponentBadge()
- displayElementInfo()
- Floating selection box
- Selection handles
- Element code display
```

### 4. AI Chat Integration (Lines 1200-1800)
```typescript
- sendChatMessage()
- sendFloatingPrompt()
- addChatMessage()
- addTypingIndicator()
- addCodePreviewWithApply()
- applyPendingEdits()
- discardPendingEdits()
- Streaming response handling
```

## Integration Steps

### Step 1: Copy Template Refs
All template refs are already defined in the `<script setup>` section.

### Step 2: Add Event Listeners in onMounted
```typescript
onMounted(() => {
  // Load button
  loadBtn.value?.addEventListener('click', readLarge)
  
  // Save button
  saveBtn.value?.addEventListener('click', writeLarge)
  
  // Content textarea input
  contentEl.value?.addEventListener('input', () => {
    if (!autoPreview.value?.checked) return
    if (previewTimer) clearTimeout(previewTimer)
    previewTimer = setTimeout(() => {
      renderPreview(contentEl.value?.value)
    }, 500)
  })
  
  // Refresh preview
  refreshPreview.value?.addEventListener('click', () => {
    renderPreview(pendingCode || contentEl.value?.value)
  })
  
  // Viewport select
  viewportSelect.value?.addEventListener('change', updateViewport)
  
  // Enable selector checkbox
  enableSelector.value?.addEventListener('change', () => {
    if (enableSelector.value?.checked) {
      setupElementSelector()
      updateSelectorStatusUI()
    } else {
      removeElementSelector()
      updateSelectorStatusUI()
    }
  })
  
  // Chat form submit
  chatForm.value?.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = chatInput.value?.value.trim()
    if (message) {
      sendChatMessage(message)
    }
  })
  
  // Format code button
  formatCode.value?.addEventListener('click', () => {
    if (contentEl.value?.value.trim()) {
      contentEl.value.value = formatHTML(contentEl.value.value)
    }
  })
  
  // Copy full code button
  copyFullCode.value?.addEventListener('click', () => {
    if (contentEl.value?.value.trim()) {
      navigator.clipboard.writeText(contentEl.value.value)
    }
  })
  
  // Apply/Discard pending edits
  applyPendingEditsBtn.value?.addEventListener('click', applyPendingEdits)
  discardPendingEditsBtn.value?.addEventListener('click', discardPendingEdits)
  
  // Close selected panel
  closeSelectedPanel.value?.addEventListener('click', () => {
    selectedElementCodeSection.value?.classList.add('hidden')
    selectedElementTag.value?.classList.add('hidden')
    closeSelectedPanel.value?.classList.add('hidden')
    selectedElement = null
    selectedElementHTML = ''
    selectedElementSelector = ''
  })
  
  // Copy element code
  copyElementCode.value?.addEventListener('click', () => {
    if (selectedElementCode.value) {
      navigator.clipboard.writeText(selectedElementCode.value.value)
    }
  })
  
  // Test selector button
  testSelector.value?.addEventListener('click', () => {
    console.log('[TEST] Manual selector setup triggered')
    setupElementSelector()
  })
  
  // Initialize
  updateViewport()
  updateSelectorStatusUI()
  refreshPendingBar()
})
```

### Step 3: Add All Helper Functions
Copy all functions from `large-file.js` into the `<script setup>` section:
- Element selection functions
- Chat functions
- Preview functions
- Apply/discard functions
- Streaming functions

### Step 4: Wire API Endpoints
Update API calls to use Nuxt's `$fetch`:
```typescript
// Instead of fetch('/api/chat', ...)
await $fetch('/api/hosting/agent-chat', {
  method: 'POST',
  body: { message, sessionId }
})
```

## Quick Fix: Use External Script

As a temporary solution, you can load the functionality from an external script:

1. Copy `large-file.js` to `public/hosting-functions.js`
2. Add to `pages/hosting.vue`:
```vue
<script>
if (process.client) {
  const script = document.createElement('script')
  script.src = '/hosting-functions.js'
  document.head.appendChild(script)
}
</script>
```

## Recommended Approach

Due to the size and complexity, I recommend:

1. **Keep UI in Vue template** (already done)
2. **Move all logic to a composable** (`composables/useHostingEditor.ts`)
3. **Import and use in page**:
```typescript
const {
  setupEditor,
  loadFile,
  saveFile,
  sendMessage,
  // ... all functions
} = useHostingEditor()

onMounted(() => {
  setupEditor({
    ownerEl: ownerEl.value,
    repoEl: repoEl.value,
    // ... all refs
  })
})
```

This keeps the code organized and maintainable.

## Files to Reference

- **Source:** `C:\Users\User\Desktop\Kubernetes\agent-app\public\large-file.js`
- **Source:** `C:\Users\User\Desktop\Kubernetes\agent-app\public\large-file.html`
- **Target:** `pages/hosting.vue`
- **Composable:** `composables/useElementSelector.ts` (already created)

## Next Steps

1. Create `composables/useHostingEditor.ts` with all functions
2. Import and use in `pages/hosting.vue`
3. Test element selection
4. Test AI editing
5. Test file load/save
6. Wire to your Nuxt API endpoints

The UI shell is ready - it just needs the functionality wired up!
