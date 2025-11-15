# Element Selection & Targeted Editing - Complete

## Overview
Copied the live preview and element selection features from Web Builder to enable precise, targeted AI edits to specific HTML elements.

---

## Features Added

### 1. **Live Preview with Iframe**
- Real-time preview of HTML code
- Responsive viewport options (Desktop, Tablet, Mobile, Responsive)
- Sandboxed iframe for security
- Auto-refresh on code changes

### 2. **Element Selection Mode**
- Click any element in the preview to select it
- Hover highlighting with orange outline
- Shows element tag, CSS selector, and HTML code
- "Selection ON" indicator when active

### 3. **Targeted AI Edits**
- AI receives selected element context
- Makes changes only to that specific element
- Returns complete updated HTML with changes applied
- Preserves all other code

### 4. **Smart CSS Selector Generation**
- Uses element ID if available
- Falls back to class-based selector
- Generates path-based selector as last resort
- Ensures unique identification

---

## How It Works

### User Workflow

**Step 1: Load HTML**
```
- Load file from bucket or computer
- HTML appears in editor
- Live preview shows automatically
```

**Step 2: Enable Element Selection**
```
- Check "Select Elements" checkbox
- "Selection ON" badge appears
- Hover over elements to see highlight
```

**Step 3: Select Element**
```
- Click any element in preview
- Element info card appears showing:
  - Tag name (e.g., <button>)
  - CSS selector (e.g., .hero button.cta)
  - Full HTML code
```

**Step 4: Ask AI for Changes**
```
User: "Change the color to blue"
or
User: "Add a hover effect"
or
User: "Make this responsive"
```

**Step 5: AI Makes Targeted Edit**
```
- AI knows which element you selected
- Makes changes only to that element
- Returns complete updated HTML
- Auto-applies to editor
- Preview refreshes automatically
```

---

## Example Interaction

### Selecting a Button

**Preview shows:**
```html
<button class="cta">Get Started</button>
```

**User clicks button**

**Element card shows:**
```
Element Selected: button
CSS Selector: .hero button.cta
```

**User asks:** "Change the background to blue and add a shadow"

**AI responds:**
```
I'll update your button with a blue background and shadow.

Here's the updated HTML:

```html
<!DOCTYPE html>
<html>
  ...
  <button class="cta" style="background: #2563eb; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
    Get Started
  </button>
  ...
</html>
```

**Changes made:**
- Added blue background (#2563eb)
- Added shadow effect
- Preserved button text and structure
```

**Result:**
- Complete HTML auto-applied
- Preview shows blue button with shadow
- All other elements unchanged

---

## Technical Implementation

### Frontend Components

**Live Preview Section:**
```vue
<div class="p-4 bg-white border rounded-lg">
  <div class="flex items-center justify-between mb-3">
    <h4>Live Preview</h4>
    <div class="flex gap-2">
      <select v-model="viewportSize">
        <option value="responsive">Responsive</option>
        <option value="desktop">Desktop</option>
        <option value="tablet">Tablet</option>
        <option value="mobile">Mobile</option>
      </select>
      <label>
        <input v-model="enableElementSelector" type="checkbox" />
        Select Elements
      </label>
      <button @click="refreshPreview">Refresh</button>
    </div>
  </div>
  
  <iframe ref="previewIframe" sandbox="..." />
</div>
```

**Selected Element Card:**
```vue
<div v-if="selectedElement" class="p-3 border-2 border-[#d97759] rounded-lg">
  <div class="flex items-center justify-between">
    <span>Element Selected</span>
    <code>{{ selectedElement.tag }}</code>
    <button @click="clearSelection">×</button>
  </div>
  <div>
    <strong>CSS Selector:</strong>
    <code>{{ selectedElement.selector }}</code>
  </div>
  <div>
    Ask AI to modify this element
  </div>
  <details>
    <summary>View HTML Code</summary>
    <pre>{{ selectedElement.html }}</pre>
  </details>
</div>
```

### JavaScript Functions

**refreshPreview():**
```typescript
const refreshPreview = () => {
  if (!aiHtml.value || !previewIframe.value) return
  
  const iframe = previewIframe.value
  const doc = iframe.contentDocument
  
  doc.open()
  doc.write(aiHtml.value)
  doc.close()
  
  iframe.onload = () => {
    if (enableElementSelector.value) {
      setupElementSelector(doc)
    }
  }
}
```

**setupElementSelector():**
```typescript
const setupElementSelector = (doc: Document) => {
  // Add hover styles
  const style = doc.createElement('style')
  style.textContent = `
    .builder-hover-highlight {
      outline: 2px solid #d97759 !important;
      outline-offset: 2px !important;
      cursor: pointer !important;
    }
  `
  doc.head.appendChild(style)
  
  // Click handler
  doc.body.addEventListener('click', (e) => {
    e.preventDefault()
    const element = e.target as HTMLElement
    selectedElement.value = {
      tag: element.tagName.toLowerCase(),
      selector: generateSelector(element, doc),
      html: element.outerHTML
    }
  })
  
  // Hover effects
  doc.body.addEventListener('mouseover', (e) => {
    (e.target as HTMLElement).classList.add('builder-hover-highlight')
  })
  
  doc.body.addEventListener('mouseout', (e) => {
    (e.target as HTMLElement).classList.remove('builder-hover-highlight')
  })
}
```

**generateSelector():**
```typescript
const generateSelector = (element: HTMLElement, doc: Document): string => {
  // Try ID first
  if (element.id) {
    return `#${element.id}`
  }
  
  // Try class-based selector
  if (element.className) {
    const classes = element.className.split(' ').filter(c => c).join('.')
    const selector = `${element.tagName.toLowerCase()}.${classes}`
    if (doc.querySelectorAll(selector).length === 1) {
      return selector
    }
  }
  
  // Generate path-based selector
  const path: string[] = []
  let current: HTMLElement | null = element
  while (current && current.tagName) {
    let selector = current.tagName.toLowerCase()
    if (current.parentElement) {
      const siblings = Array.from(current.parentElement.children)
        .filter(e => e.tagName === current!.tagName)
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1
        selector += `:nth-of-type(${index})`
      }
    }
    path.unshift(selector)
    current = current.parentElement
    if (path.length > 5) break
  }
  return path.join(' > ')
}
```

### Backend Integration

**API Request:**
```typescript
await $fetch('/api/hosting/chat', {
  method: 'POST',
  body: {
    messages: chatMessages.value,
    generatedCode: {
      content: aiHtml.value,
      fileName: 'index.html',
      type: 'HTML'
    },
    selectedElement: {
      tag: 'button',
      selector: '.hero button.cta',
      html: '<button class="cta">Get Started</button>'
    }
  }
})
```

**AI System Prompt:**
```
🎯 SELECTED ELEMENT CONTEXT:
Tag: <button>
CSS Selector: .hero button.cta
HTML Content: <button class="cta">Get Started</button>

When the user asks to modify, style, or edit something, 
they are referring to THIS specific element.

Provide targeted code changes for this element, including:
- CSS styles for this selector
- HTML modifications if needed
- JavaScript interactions if requested

Show the complete updated code with this element's changes integrated.
```

---

## Auto-Refresh Behavior

**Watchers:**
```typescript
// Refresh when HTML changes
watch(aiHtml, () => {
  if (aiHtml.value) {
    nextTick(() => refreshPreview())
  }
})

// Refresh when element selector is enabled
watch(enableElementSelector, () => {
  if (enableElementSelector.value && aiHtml.value) {
    nextTick(() => refreshPreview())
  }
})

// Refresh after AI response
extractCodeFromResponse(response) {
  aiHtml.value = extractedCode
  nextTick(() => refreshPreview())
}
```

---

## Benefits

### Before (Without Element Selection)
- ❌ AI regenerates entire file
- ❌ Hard to specify which element to change
- ❌ Loses custom modifications
- ❌ Slow and inefficient

### After (With Element Selection)
- ✅ Click element to select it
- ✅ AI knows exactly what to change
- ✅ Only that element is modified
- ✅ All other code preserved
- ✅ Fast and precise
- ✅ Visual feedback with hover
- ✅ Complete updated file returned

---

## Use Cases

### 1. **Style Changes**
```
Select: Header logo
Ask: "Make it 150px wide"
Result: Only logo size changes
```

### 2. **Content Updates**
```
Select: Hero heading
Ask: "Change text to 'Welcome to Our Store'"
Result: Only heading text changes
```

### 3. **Add Interactivity**
```
Select: Button
Ask: "Add a click animation"
Result: Only button gets animation
```

### 4. **Responsive Design**
```
Select: Navigation menu
Ask: "Make this responsive for mobile"
Result: Only nav gets media queries
```

### 5. **Color Adjustments**
```
Select: Footer
Ask: "Change background to dark blue"
Result: Only footer background changes
```

---

## Viewport Options

**Responsive (Default):**
- Full width
- Adapts to container

**Desktop:**
- Max-width: 1200px
- Centered

**Tablet:**
- Max-width: 768px
- Centered

**Mobile:**
- Max-width: 375px
- Centered

---

## Summary

✅ **Live preview** with iframe
✅ **Element selection** with click
✅ **Hover highlighting** for visibility
✅ **CSS selector generation** for precision
✅ **Targeted AI edits** to specific elements
✅ **Complete file updates** with changes applied
✅ **Auto-refresh** on code changes
✅ **Viewport switching** for responsive testing
✅ **Element info card** with details
✅ **Context sent to AI** for smart edits

The system now provides precise, surgical code editing instead of regenerating everything from scratch!
