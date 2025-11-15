# HTML-to-Components System

## Overview
A GrapesJS-inspired system that converts HTML into a selectable, editable component tree. Each HTML element becomes a component with metadata, making it easy to select, edit, and manipulate specific parts of the page.

---

## Architecture

### Core Files

**1. `lib/htmlToComponents.ts`** - Parser & Component Manager
- Parses HTML into component tree
- Converts components back to HTML
- Component CRUD operations
- Line number detection

**2. `composables/useComponents.ts`** - Vue Integration
- Reactive component state
- Selection & hover management
- Component queries & filters
- Import/export functionality

---

## Component Definition

```typescript
interface ComponentDefinition {
  id: string                          // Unique ID: "c1", "c2", etc.
  type: string                        // Component type: "button", "text", "image"
  tagName: string                     // HTML tag: "div", "button", "img"
  content?: string                    // Text content (for text nodes)
  attributes: Record<string, any>     // HTML attributes: { href: "...", title: "..." }
  classes: string[]                   // CSS classes: ["btn", "btn-primary"]
  style: Record<string, string>       // Inline styles: { color: "red", fontSize: "16px" }
  components: ComponentDefinition[]   // Child components (nested)
  parent?: string                     // Parent component ID
  
  // Editability flags
  editable: boolean                   // Can edit content/properties
  selectable: boolean                 // Can select in UI
  draggable: boolean                  // Can drag to reorder
  droppable: boolean                  // Can drop other components inside
  removable: boolean                  // Can delete
  copyable: boolean                   // Can copy/paste
  
  // Code mapping
  lineStart?: number                  // Start line in original HTML
  lineEnd?: number                    // End line in original HTML
  originalHtml?: string               // Original HTML string
}
```

---

## Component Types

The system automatically detects component types based on HTML tags:

| HTML Tag | Component Type | Description |
|----------|---------------|-------------|
| `<a>` | `link` | Hyperlinks |
| `<img>` | `image` | Images |
| `<video>` | `video` | Videos |
| `<button>` | `button` | Buttons |
| `<input>` | `input` | Form inputs |
| `<form>` | `form` | Forms |
| `<nav>` | `navbar` | Navigation |
| `<h1>-<h6>` | `heading` | Headings |
| `<p>`, `<span>` | `text` | Text elements |
| `<ul>`, `<ol>` | `list` | Lists |
| `<table>` | `table` | Tables |
| `<section>` | `section` | Sections |
| `<header>` | `header` | Headers |
| `<footer>` | `footer` | Footers |
| Others | `default` | Generic elements |

---

## Usage Examples

### 1. Parse HTML into Components

```typescript
import { useComponents } from '~/composables/useComponents'

const { parseHTML, components } = useComponents()

// Parse HTML
const html = `
  <div class="container">
    <h1>Welcome</h1>
    <button class="btn btn-primary">Click Me</button>
  </div>
`

parseHTML(html)

// Result: components.value = [
//   {
//     id: "c1",
//     type: "default",
//     tagName: "div",
//     classes: ["container"],
//     components: [
//       {
//         id: "c2",
//         type: "heading",
//         tagName: "h1",
//         content: "Welcome",
//         ...
//       },
//       {
//         id: "c3",
//         type: "button",
//         tagName: "button",
//         classes: ["btn", "btn-primary"],
//         content: "Click Me",
//         ...
//       }
//     ]
//   }
// ]
```

---

### 2. Select & Edit Components

```typescript
const { 
  selectComponent, 
  selectedComponent, 
  updateComponent 
} = useComponents()

// Select a component
selectComponent('c3')

// Get selected component
console.log(selectedComponent.value)
// { id: "c3", type: "button", content: "Click Me", ... }

// Update component
updateComponent('c3', {
  content: 'Get Started',
  classes: ['btn', 'btn-success']
})
```

---

### 3. Find Components

```typescript
const { findBySelector, findByType, getComponentByLine } = useComponents()

// Find by CSS selector
const buttons = findBySelector('button')
const primaryBtns = findBySelector('.btn-primary')
const heroSection = findBySelector('#hero')

// Find by type
const allImages = findByType('image')
const allLinks = findByType('link')

// Find by line number
const component = getComponentByLine(42)
// Returns component at line 42 in original HTML
```

---

### 4. Component Tree Navigation

```typescript
const { getChildren, getParent, getComponentPath } = useComponents()

// Get children
const children = getChildren('c1')
// Returns all child components of c1

// Get parent
const parent = getParent('c3')
// Returns parent component

// Get breadcrumb path
const path = getComponentPath('c3')
// Returns: [rootComponent, containerComponent, buttonComponent]
```

---

### 5. Convert Back to HTML

```typescript
const { toHTML } = useComponents()

// Convert component tree back to HTML
const html = toHTML()
console.log(html)
// <div class="container">
//   <h1>Welcome</h1>
//   <button class="btn btn-success">Get Started</button>
// </div>
```

---

### 6. Component Operations

```typescript
const { 
  cloneComponent, 
  removeComponent, 
  exportJSON, 
  importJSON 
} = useComponents()

// Clone component
const cloned = cloneComponent('c3')
// Returns deep copy with new IDs

// Remove component
removeComponent('c3')
// Removes button from tree

// Export to JSON
const json = exportJSON()
// Save component tree

// Import from JSON
importJSON(json)
// Restore component tree
```

---

## Integration with Hosting Page

### Step 1: Parse HTML on Load

```vue
<script setup>
import { useComponents } from '~/composables/useComponents'

const { parseHTML, components } = useComponents()
const aiHtml = ref('')

// Parse HTML when it changes
watch(aiHtml, (newHtml) => {
  if (newHtml) {
    parseHTML(newHtml)
  }
})
</script>
```

---

### Step 2: Make Preview Interactive

```vue
<script setup>
const { selectComponent, hoverComponent } = useComponents()

const setupComponentSelector = (doc: Document) => {
  // Add click handler
  doc.body.addEventListener('click', (e) => {
    const element = e.target as HTMLElement
    
    // Find component by element
    const componentId = element.dataset.componentId
    if (componentId) {
      selectComponent(componentId)
    }
  })
  
  // Add hover handler
  doc.body.addEventListener('mouseover', (e) => {
    const element = e.target as HTMLElement
    const componentId = element.dataset.componentId
    if (componentId) {
      hoverComponent(componentId)
    }
  })
}
</script>
```

---

### Step 3: Inject Component IDs into HTML

```typescript
// Before rendering HTML in iframe, inject component IDs
const injectComponentIds = (html: string, components: ComponentDefinition[]): string => {
  let result = html
  
  for (const component of flattenComponents(components)) {
    if (component.originalHtml) {
      // Add data-component-id to each element
      const withId = component.originalHtml.replace(
        `<${component.tagName}`,
        `<${component.tagName} data-component-id="${component.id}"`
      )
      result = result.replace(component.originalHtml, withId)
    }
  }
  
  return result
}
```

---

### Step 4: Display Selected Component Info

```vue
<template>
  <div v-if="selectedComponent" class="component-info">
    <h3>Selected Component</h3>
    
    <div class="info-row">
      <span class="label">Type:</span>
      <span class="value">{{ selectedComponent.type }}</span>
    </div>
    
    <div class="info-row">
      <span class="label">Tag:</span>
      <code>&lt;{{ selectedComponent.tagName }}&gt;</code>
    </div>
    
    <div class="info-row">
      <span class="label">Classes:</span>
      <div class="classes">
        <span 
          v-for="cls in selectedComponent.classes" 
          :key="cls"
          class="class-badge"
        >
          .{{ cls }}
        </span>
      </div>
    </div>
    
    <div class="info-row">
      <span class="label">Lines:</span>
      <code>{{ selectedComponent.lineStart }}-{{ selectedComponent.lineEnd }}</code>
    </div>
    
    <!-- Edit controls -->
    <div class="controls">
      <button @click="editComponent">Edit</button>
      <button @click="cloneComponent(selectedComponent.id)">Clone</button>
      <button @click="removeComponent(selectedComponent.id)">Delete</button>
    </div>
  </div>
</template>
```

---

### Step 5: Send Component Context to AI

```typescript
const sendToAI = async (message: string) => {
  const context = selectedComponent.value ? {
    componentId: selectedComponent.value.id,
    type: selectedComponent.value.type,
    tagName: selectedComponent.value.tagName,
    classes: selectedComponent.value.classes,
    lineStart: selectedComponent.value.lineStart,
    lineEnd: selectedComponent.value.lineEnd,
    html: selectedComponent.value.originalHtml
  } : null
  
  await $fetch('/api/hosting/chat', {
    method: 'POST',
    body: {
      messages: [...chatMessages.value, { role: 'user', content: message }],
      selectedComponent: context
    }
  })
}
```

---

## Benefits

### 1. Precise Selection
- Every HTML element becomes selectable
- Click any element to select it
- Visual feedback with hover states

### 2. Structured Editing
- Edit specific components, not entire HTML
- Maintain component hierarchy
- Preserve relationships between elements

### 3. Better AI Context
- AI knows exactly which component to edit
- Component metadata provides rich context
- Line numbers for precise code updates

### 4. Component Operations
- Clone components
- Remove components
- Reorder components (drag & drop)
- Copy/paste components

### 5. Type-Aware Editing
- Different edit UI for different types
- Button → edit text, classes, link
- Image → edit src, alt, dimensions
- Text → rich text editor

---

## Component Tree Example

```
HTML:
<div class="hero">
  <h1>Welcome</h1>
  <p>Get started today</p>
  <button class="cta">Sign Up</button>
</div>

Component Tree:
{
  id: "c1",
  type: "default",
  tagName: "div",
  classes: ["hero"],
  components: [
    {
      id: "c2",
      type: "heading",
      tagName: "h1",
      content: "Welcome"
    },
    {
      id: "c3",
      type: "text",
      tagName: "p",
      content: "Get started today"
    },
    {
      id: "c4",
      type: "button",
      tagName: "button",
      classes: ["cta"],
      content: "Sign Up"
    }
  ]
}
```

---

## Next Steps

1. **Integrate into hosting.vue**
   - Replace simple element selection with component system
   - Parse HTML on load
   - Inject component IDs into preview

2. **Add Component Panel**
   - Tree view of all components
   - Click to select
   - Drag to reorder

3. **Type-Specific Editors**
   - Button editor (text, link, style)
   - Image editor (src, alt, dimensions)
   - Text editor (rich text)

4. **AI Integration**
   - Send component context instead of raw HTML
   - AI edits specific components
   - Apply changes back to component tree

5. **Advanced Features**
   - Component library (save & reuse)
   - Undo/redo system
   - Component templates
   - Style inheritance

---

## Summary

The HTML-to-Components system transforms static HTML into an interactive, editable component tree. Each element becomes a first-class component with metadata, enabling:

✅ **Precise selection** - Click any element to select it
✅ **Structured editing** - Edit components, not raw HTML
✅ **Rich context** - AI knows exactly what to edit
✅ **Component operations** - Clone, remove, reorder
✅ **Type awareness** - Different editors for different types

This provides a **professional page builder experience** similar to GrapesJS, Webflow, or Framer! 🎨
