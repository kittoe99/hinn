# Element Selection & Edit System Upgrade

## Overview
Upgrading the hosting page with the advanced element selection and editing system from the Kubernetes agent-app project.

## Key Features to Migrate

### 1. Precise CSS Selector Generation
**Function:** `computeUniqueSelector(element, rootDoc)`

**Features:**
- ID-based selection (highest priority)
- Class combination matching
- Parent-child relationship tracking
- nth-of-type indexing for siblings
- Absolute path fallback
- CSS escape handling

**Benefits:**
- ✅ Unique selectors for every element
- ✅ Works with complex nested structures
- ✅ Handles dynamic content
- ✅ No false positives

### 2. Element Selection in Preview
**Features:**
- Click any element in preview to select it
- Visual highlight with border
- Show element tag name
- Display element code
- Edit selected element specifically

**UI Indicators:**
- Selected element border (blue highlight)
- Element tag badge (e.g., `<section>`, `<div>`)
- Code viewer for selected element
- "Selection ON" status badge

### 3. Element-Specific AI Editing
**Workflow:**
1. User selects element in preview
2. System generates unique CSS selector
3. User types edit command (e.g., "make it blue")
4. AI edits only that specific element
5. System replaces element in HTML using selector

**Benefits:**
- ✅ Precise edits (no accidental changes)
- ✅ Context-aware (AI knows what element to edit)
- ✅ Fast iterations
- ✅ Visual feedback

### 4. Robust HTML Replacement
**Multiple Fallback Strategies:**

1. **Direct String Replace** - Fastest, works when HTML matches exactly
2. **Whitespace-Flexible Regex** - Handles formatting differences
3. **Whitespace-Normalized Substring** - Ignores all whitespace
4. **DOM-Based Selector Replace** - Uses DOMParser + querySelector

**Function:** `replaceOldWithNewRobust(currentContent, oldHTML, newHTML, selector)`

**Why Multiple Strategies:**
- AI might format HTML differently
- User might have edited code manually
- Whitespace variations
- Ensures edit always succeeds

### 5. Visual Selection Feedback
**Features:**
- Hover highlighting
- Click selection
- Selected element border
- Selection handles (optional)
- Floating selection box
- Status badges

## Implementation Plan

### Phase 1: Core Selection System
1. Add `computeUniqueSelector()` function
2. Add `cssEscape()` helper
3. Add `getAbsolutePath()` fallback
4. Add class combination logic

### Phase 2: Preview Integration
1. Inject selection event listeners into iframe
2. Add hover highlighting
3. Add click selection
4. Show selected element info

### Phase 3: Element Editing
1. Store selected element data (HTML, selector)
2. Update AI prompt with element context
3. Implement robust HTML replacement
4. Apply edits to specific element

### Phase 4: UI Enhancements
1. Add "Selection ON" badge
2. Add selected element code viewer
3. Add element tag badge
4. Add visual highlights

## Code Structure

### New Functions to Add

```typescript
// Precise selector generation
function computeUniqueSelector(el: Element, rootDoc?: Document): string

// CSS escape for selectors
function cssEscape(ident: string): string

// Absolute path fallback
function getAbsolutePath(el: Element): string

// Class combinations
function combos(arr: string[], max: number): string[][]

// Robust HTML replacement
function replaceOldWithNewRobust(
  currentContent: string,
  oldHTML: string,
  newHTML: string,
  selector: string
): string | null

// DOM-based replacement
function replaceElementBySelectorDOM(
  currentContent: string,
  selector: string,
  newHTML: string
): string | null

// Find element in content by selector
function findElementHTMLInContentBySelector(
  content: string,
  selector: string
): string | null
```

### New State Variables

```typescript
let selectedElement: Element | null = null
let selectedElementHTML: string = ''
let selectedElementSelector: string = ''
let lastHighlightedElement: Element | null = null
```

### New UI Elements

```vue
<!-- Selection Status Badge -->
<div v-if="selectionEnabled" class="selection-status-badge">
  Selection ON
</div>

<!-- Selected Element Info -->
<div v-if="selectedElement" class="selected-element-panel">
  <div class="element-tag">{{ selectedElementTag }}</div>
  <pre class="element-code">{{ selectedElementHTML }}</pre>
  <button @click="clearSelection">Clear</button>
</div>
```

## Benefits Over Current System

### Current System
- ❌ Selects by component type (hero, navbar, etc.)
- ❌ Limited to semantic sections
- ❌ Can't select arbitrary elements
- ❌ No visual selection feedback
- ❌ Edits might affect wrong elements

### Upgraded System
- ✅ Select ANY element (divs, spans, buttons, etc.)
- ✅ Precise CSS selector generation
- ✅ Visual click-to-select
- ✅ Element-specific editing
- ✅ Robust replacement strategies
- ✅ Better user experience

## Example Workflows

### Workflow 1: Edit Specific Button
```
1. User clicks button in preview
2. System generates selector: `.hero button.cta-btn`
3. Shows button HTML in panel
4. User types: "make it green with rounded corners"
5. AI generates new button HTML
6. System replaces only that button
7. Preview updates instantly
```

### Workflow 2: Edit Nested Element
```
1. User clicks nested div inside section
2. System generates: `.hero > .content > div:nth-of-type(2)`
3. Shows div HTML
4. User types: "add padding and center text"
5. AI edits that specific div
6. Replacement uses selector (robust)
7. Preview updates
```

### Workflow 3: Edit Multiple Elements
```
1. User selects header
2. Edits: "make background blue"
3. Clears selection
4. Selects footer
5. Edits: "match header style"
6. Both elements updated independently
```

## Technical Details

### Selector Priority
1. **ID** - `#unique-id` (highest priority)
2. **Class Combinations** - `.class1.class2.class3`
3. **Tag + Classes** - `div.container.main`
4. **Parent Context** - `#parent > div.child`
5. **nth-of-type** - `section:nth-of-type(2)`
6. **Absolute Path** - `html > body > div:nth-of-type(1) > section:nth-of-type(2)`

### Replacement Strategies
1. **Direct** - `content.replace(oldHTML, newHTML)`
2. **Regex** - `/oldHTML/`.replace with whitespace flexibility
3. **Normalized** - Remove all whitespace, find, replace
4. **DOM** - Parse, querySelector, replaceWith, serialize

### Error Handling
- Selector generation never fails (falls back to absolute path)
- Replacement tries all strategies before failing
- Visual feedback for selection state
- Console logging for debugging

## Migration Steps

### Step 1: Add Core Functions
Copy from `large-file.js`:
- `computeUniqueSelector()`
- `cssEscape()`
- `getAbsolutePath()`
- `combos()`

### Step 2: Add Replacement Logic
Copy from `large-file.js`:
- `replaceOldWithNewRobust()`
- `replaceElementBySelectorDOM()`
- `findElementHTMLInContentBySelector()`

### Step 3: Update Preview Injection
Add event listeners for:
- Mouseover (highlight)
- Click (select)
- Mouseout (unhighlight)

### Step 4: Update AI Editing
Modify AI prompt to include:
- Selected element context
- Element selector
- Element HTML

### Step 5: Update UI
Add:
- Selection status badge
- Selected element panel
- Element tag display
- Code viewer

## Testing Checklist

- [ ] Click any element to select it
- [ ] Unique selector generated correctly
- [ ] Selected element HTML displayed
- [ ] AI edits only selected element
- [ ] Replacement works with formatting changes
- [ ] Visual highlights work
- [ ] Clear selection works
- [ ] Multiple selections work
- [ ] Nested elements work
- [ ] Complex selectors work

## Summary

**What We're Adding:**
- ✅ Click-to-select any element
- ✅ Precise CSS selector generation
- ✅ Element-specific AI editing
- ✅ Robust HTML replacement
- ✅ Visual selection feedback
- ✅ Better user experience

**Result:**
Users can click any element in the preview, see its code, and edit it precisely with AI - just like in the Kubernetes project!
