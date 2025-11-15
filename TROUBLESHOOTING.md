# Troubleshooting: Component Selection Not Working

## Issue
Component selection system not reflecting changes / elements not selectable.

---

## Quick Fixes

### 1. Restart Dev Server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### 2. Clear Browser Cache
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or open DevTools → Network tab → Check "Disable cache"

### 3. Check Console for Errors
Open browser console (F12) and look for:
```
[Components] Parsed: X root components
[Components] Selectable sections: Y
[Components] Selectable types: [...]
```

---

## Testing Steps

### Step 1: Load Test HTML
1. Go to hosting page
2. Switch to "AI Generator" mode
3. Paste this test HTML into the editor:

```html
<!DOCTYPE html>
<html>
<body>
    <nav class="navbar">
        <a href="/">Home</a>
    </nav>
    
    <section class="hero">
        <h1>Welcome</h1>
        <button>Get Started</button>
    </section>
    
    <section class="features">
        <h2>Features</h2>
        <p>Amazing features</p>
    </section>
    
    <footer class="footer">
        <p>© 2024</p>
    </footer>
</body>
</html>
```

### Step 2: Check Console Output
You should see:
```
[Components] Parsed: 1 root components
[Components] Total components: ~10
[Components] Selectable sections: 4
[Components] Selectable types: ['navbar', 'hero', 'button', 'features', 'footer']
```

### Step 3: Enable Selection Mode
1. Check the "Select Mode" checkbox
2. You should see "Click to Select" indicator
3. You should see "4 sections" badge

### Step 4: Click Elements
1. Click on the hero section (purple gradient area)
2. Component info should appear below preview
3. Should show: "Component Selected" with type "hero"

---

## Expected Behavior

### What Should Be Selectable
✅ `<nav class="navbar">` → navbar
✅ `<section class="hero">` → hero
✅ `<button>` → button
✅ `<section class="features">` → features
✅ `<footer>` → footer

### What Should NOT Be Selectable
❌ `<h1>` - Part of hero section
❌ `<p>` - Part of sections
❌ Generic `<div>` without semantic class

---

## Common Issues

### Issue 1: "0 sections" Badge Shows
**Problem:** No selectable components found

**Solutions:**
1. Make sure HTML has semantic sections:
   - Use `class="hero"`, `class="navbar"`, `class="footer"`, etc.
   - Or use semantic tags: `<nav>`, `<header>`, `<footer>`, `<section>`

2. Check console for:
   ```
   [Components] Selectable sections: 0
   [Components] Selectable types: []
   ```

3. If types array is empty, your HTML doesn't have semantic markers

**Fix:** Add semantic classes or tags:
```html
<!-- Before (not selectable) -->
<div class="wrapper">
  <div class="content">
    <h1>Title</h1>
  </div>
</div>

<!-- After (selectable) -->
<section class="hero">
  <div class="content">
    <h1>Title</h1>
  </div>
</section>
```

---

### Issue 2: Elements Not Clickable
**Problem:** Can click but nothing happens

**Solutions:**
1. Check "Select Mode" is enabled (checkbox checked)
2. Check console for errors
3. Look for:
   ```
   [Preview] Injecting IDs for X selectable components
   [Preview] Injected ID for hero : c1
   ```

4. If no injection logs, components aren't being processed

**Fix:** Refresh preview button or reload page

---

### Issue 3: Wrong Element Selected
**Problem:** Clicking one element selects another

**Solutions:**
1. This happens with nested sections
2. Click more precisely on the target section
3. Check if element has `data-component-id` attribute:
   - Right-click element → Inspect
   - Look for `data-component-id="c1"` in HTML

---

### Issue 4: Component Info Not Showing
**Problem:** Selection works but info panel doesn't appear

**Solutions:**
1. Check if `selectedComponent` is populated:
   ```
   [Component Selection] Selected component: { id: "c1", ... }
   ```

2. If log appears but no UI, check Vue reactivity
3. Try clicking a different element then clicking back

---

## Debug Checklist

### Browser Console
- [ ] `[Components] Parsed:` message appears
- [ ] `[Components] Selectable sections:` shows > 0
- [ ] `[Components] Selectable types:` shows array of types
- [ ] `[Preview] Injecting IDs for` message appears
- [ ] `[Preview] Injected ID for` messages for each section
- [ ] `[Component Selection] Selected component:` on click

### Visual Indicators
- [ ] "Click to Select" badge visible when enabled
- [ ] "X sections" badge shows correct count
- [ ] Hover effect (orange outline) works
- [ ] Component info panel appears on selection

### HTML Structure
- [ ] Has semantic sections (`hero`, `navbar`, `footer`, etc.)
- [ ] Uses semantic HTML5 tags (`<nav>`, `<header>`, `<footer>`)
- [ ] Has class names with keywords (see SEMANTIC_SECTION_SELECTION.md)

---

## Still Not Working?

### Check File Paths
Ensure these files exist:
- `lib/htmlToComponents.ts`
- `composables/useComponents.ts`
- `pages/hosting.vue` (updated)

### Check Imports
In `composables/useComponents.ts`:
```typescript
import { HTMLToComponents, type ComponentDefinition } from '~/lib/htmlToComponents'
```

### Check Composable Usage
In `pages/hosting.vue`:
```typescript
const { 
  selectableComponents,
  selectedComponent,
  selectComponent,
  // ...
} = useComponents()
```

---

## Test with Provided HTML

Use the `TEST_HTML.html` file in the project root:
1. Open the file
2. Copy all content
3. Paste into AI Generator HTML editor
4. Should detect 4 selectable sections:
   - navbar
   - hero
   - features  
   - footer

---

## Contact for Help

If still not working, provide:
1. Browser console output (full logs)
2. HTML you're testing with
3. Screenshot of the page
4. Any error messages

The system should work with the test HTML provided!
