# Hosting Page Auto-Load - Fixed ✅

## Issues Fixed

### 1. **Token Retrieval**
The hosting page wasn't loading websites because it couldn't find the Supabase auth token.

**Problem:**
- Was only checking `localStorage.getItem('sb-access-token')`
- Supabase stores tokens in different formats and keys

**Solution:**
Created `getSupabaseToken()` function that:
- Checks multiple possible token keys
- Handles both JSON and string formats
- Searches all localStorage keys containing 'auth'
- Extracts `access_token` from JSON objects

```javascript
function getSupabaseToken() {
  // Try specific keys
  const keys = [
    'sb-access-token',
    'sb-mjgwoukwyqwoectxfwqv-auth-token',
    'supabase.auth.token'
  ];
  
  // Check each key
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (parsed.access_token) return parsed.access_token;
      } catch {
        return value;
      }
    }
  }
  
  // Fallback: search all auth-related keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes('auth')) {
      // Extract token...
    }
  }
  
  return null;
}
```

### 2. **UI Improvements**
Added a clean website info bar when auto-loading from dashboard.

**New UI Elements:**

#### Website Info Bar (shown when auto-loaded)
```html
<div id="websiteInfoBar" class="hidden ...">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
        <i class="fas fa-globe text-white"></i>
      </div>
      <div>
        <h3 id="websiteInfoName">Bello Moving LLC</h3>
        <p id="websiteInfoVersion">Manual upload • Nov 15, 2025</p>
      </div>
    </div>
    <button id="changeWebsiteBtn">Change Website</button>
  </div>
</div>
```

#### Website Selector (hidden when auto-loaded)
```html
<div id="websiteSelector" class="grid ...">
  <!-- Website, Version, File Name inputs -->
</div>
```

### 3. **Auto-Load Flow**
Enhanced the auto-load logic with better UI feedback.

**Flow:**
```
1. User clicks "Edit Site" in dashboard
   ↓
2. Navigates to /hosting?website=26dbeb32...
   ↓
3. Hosting page loads
   ↓
4. getSupabaseToken() finds auth token
   ↓
5. loadWebsites() fetches user's websites
   ↓
6. Finds website by ID from URL
   ↓
7. Shows website info bar
   ↓
8. Hides website selector
   ↓
9. Populates versions
   ↓
10. Selects latest version
   ↓
11. Status: "Loading website..."
   ↓
12. Auto-loads index.html (1 second delay)
   ↓
13. Code appears in editor
   ↓
14. Preview renders
   ↓
15. Status: "✓ Loaded (1234 bytes)"
```

## Updated Files

### 1. `pages/hosting.vue`
**Added:**
- Website info bar component
- File name display
- Better layout with flex justify-between

**Changes:**
```vue
<!-- Website Info Bar -->
<div id="websiteInfoBar" class="hidden bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <i class="fas fa-globe text-white"></i>
      </div>
      <div>
        <h3 id="websiteInfoName" class="font-semibold text-gray-900"></h3>
        <p id="websiteInfoVersion" class="text-sm text-gray-600"></p>
      </div>
    </div>
    <button id="changeWebsiteBtn" class="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
      Change Website
    </button>
  </div>
</div>

<!-- Website Selector (hidden when auto-loaded) -->
<div id="websiteSelector" class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <!-- ... -->
</div>
```

### 2. `public/hosting-storage.js`
**Added:**
- `getSupabaseToken()` function
- Website info bar toggle logic
- Change website button handler
- Better console logging

**Changes:**
```javascript
// Auto-load logic
if (websiteIdFromUrl && websiteSelectEl) {
  // ... select website ...
  
  // Show website info bar and hide selector
  const websiteInfoBar = document.getElementById('websiteInfoBar');
  const websiteSelector = document.getElementById('websiteSelector');
  
  if (websiteInfoBar && websiteSelector) {
    websiteInfoBar.classList.remove('hidden');
    websiteSelector.classList.add('hidden');
    
    websiteInfoName.textContent = website.business_name;
    websiteInfoVersion.textContent = `${version.label} • ${date}`;
  }
  
  // Auto-load with delay
  statusEl.textContent = 'Loading website...';
  setTimeout(() => {
    loadFile();
  }, 1000);
}

// Change website button
changeWebsiteBtn?.addEventListener('click', () => {
  websiteInfoBar.classList.add('hidden');
  websiteSelector.classList.remove('hidden');
});
```

## UI States

### State 1: Auto-Loaded from Dashboard
```
┌────────────────────────────────────────────┐
│ 🌐 Bello Moving LLC                        │
│    Manual upload • Nov 15, 2025            │
│                        [Change Website]    │
├────────────────────────────────────────────┤
│ [Load File]  ✓ Loaded (1234 bytes)        │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ Live Preview                           │ │
│ │ ┌──────────────────────────────────┐   │ │
│ │ │                                  │   │ │
│ │ │     Website Preview              │   │ │
│ │ │                                  │   │ │
│ │ └──────────────────────────────────┘   │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ ▼ File Content (Editable)                 │
│ ┌────────────────────────────────────────┐ │
│ │ <!DOCTYPE html>                        │ │
│ │ <html>                                 │ │
│ │ ...                                    │ │
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

### State 2: Manual Selection (after clicking "Change Website")
```
┌────────────────────────────────────────────┐
│ Select Website:                            │
│ [Bello Moving LLC (Small business)     ▼] │
│                                            │
│ Version:              File Name:           │
│ [Manual upload    ▼]  [index.html      ]  │
│                                            │
│ [Load File]                                │
├────────────────────────────────────────────┤
│ ...                                        │
└────────────────────────────────────────────┘
```

## Testing

### Test Auto-Load
1. **Go to Dashboard**
   ```
   Navigate to /dashboard
   ```

2. **Click "Edit Site"**
   ```
   Click on "Bello Moving LLC"
   Click "Edit Site" button
   ```

3. **Verify Auto-Load**
   ```
   ✓ Navigates to /hosting?website=26dbeb32...
   ✓ Website info bar appears
   ✓ Shows "Bello Moving LLC"
   ✓ Shows version info
   ✓ Website selector hidden
   ✓ Status shows "Loading website..."
   ✓ After 1 second: "✓ Loaded (1234 bytes)"
   ✓ Code appears in editor
   ✓ Preview renders
   ```

### Test Change Website
1. **Click "Change Website"**
   ```
   Click button in website info bar
   ```

2. **Verify UI Change**
   ```
   ✓ Website info bar hides
   ✓ Website selector shows
   ✓ Can select different website
   ✓ Can select different version
   ✓ Can load different file
   ```

### Test Token Retrieval
1. **Open Console**
   ```
   F12 → Console tab
   ```

2. **Check Logs**
   ```
   ✓ "Loading websites with token..."
   ✓ "Found token in key: sb-..."
   ✓ No "No auth token found" errors
   ```

## Debugging

### If websites don't load:

1. **Check Console**
   ```javascript
   // Should see:
   "Loading websites with token..."
   "Found token in key: sb-mjgwoukwyqwoectxfwqv-auth-token"
   ```

2. **Check localStorage**
   ```javascript
   // In console:
   Object.keys(localStorage).filter(k => k.includes('auth'))
   // Should show auth-related keys
   ```

3. **Check API Response**
   ```javascript
   // In Network tab:
   // Look for /api/hosting/list-websites
   // Check response status and data
   ```

### If auto-load doesn't work:

1. **Check URL Parameter**
   ```javascript
   // In console:
   new URLSearchParams(window.location.search).get('website')
   // Should return website ID
   ```

2. **Check Website Data**
   ```javascript
   // In console (after page loads):
   websitesData
   // Should show array of websites with versions
   ```

3. **Check Version Data**
   ```javascript
   // Should have website_versions array
   websitesData[0].website_versions
   ```

## Summary

✅ **Token retrieval fixed** - Robust function finds auth token
✅ **UI improved** - Clean website info bar when auto-loaded
✅ **Auto-load working** - Website and code load automatically
✅ **Change website** - Can switch to different website
✅ **Better feedback** - Clear status messages throughout

The hosting page now seamlessly loads websites from the dashboard with a clean, intuitive UI!
