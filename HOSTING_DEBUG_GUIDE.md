# Hosting Page Debug Guide

## Issue: Files Not Loading

The page shows "Loading..." but nothing loads.

## Debug Steps

### 1. Open Browser Console

Press `F12` and go to the **Console** tab.

### 2. Check for Logs

You should see these logs in order:

```
🚀 Hosting page initializing...
✓ DOM elements found: {websiteSelect: true, versionSelect: true, ...}
📡 Loading websites...
Loading websites with token...
🔍 URL parameter check: {hasWebsiteId: true, websiteId: "26dbeb32...", ...}
✓ Auto-loading website from URL...
🌐 Found website: Bello Moving LLC
📦 Versions available: 4
[loadFile] Token found: true
[loadFile] Fetching: {websiteId: "26dbeb32...", versionId: "ff00df56...", fileName: "index.html"}
[loadFile] Response status: 200
[loadFile] Success: {hasContent: true, size: 1234}
```

### 3. Check Network Tab

Go to **Network** tab in DevTools:

1. **Look for `/api/hosting/list-websites`**
   - Status should be `200`
   - Response should have websites array

2. **Look for `/api/hosting/load-file`**
   - Status should be `200`
   - Response should have `data.contentText`

### 4. Common Issues

#### Issue: "No auth token found"

**Console shows:**
```
No auth token found in localStorage
```

**Solution:**
1. Go to **Application** tab → **Local Storage**
2. Look for keys containing 'auth'
3. If none exist, you need to log in again
4. Navigate to `/login` and sign in

#### Issue: "Version not found"

**Console shows:**
```
[load-file] Version error: {...}
```

**Solution:**
Check if website has versions:
```javascript
// In console:
fetch('/api/hosting/list-websites', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
})
.then(r => r.json())
.then(d => console.log(d.websites[0].website_versions))
```

#### Issue: "File not found"

**Console shows:**
```
[load-file] Storage download error: {...}
```

**Solution:**
The file doesn't exist in storage. Check storage path:
1. Go to Supabase Dashboard
2. Navigate to Storage → `website` bucket
3. Check if path exists: `26dbeb32.../ff00df56.../index.html`

#### Issue: CORS Error

**Console shows:**
```
Access to fetch blocked by CORS policy
```

**Solution:**
Check Supabase URL configuration in `.env`:
```
NUXT_PUBLIC_SUPABASE_URL=https://mjgwoukwyqwoectxfwqv.supabase.co
```

### 5. Manual Test

Test the API directly in console:

```javascript
// Get token
const token = localStorage.getItem('sb-mjgwoukwyqwoectxfwqv-auth-token')
const parsed = JSON.parse(token)
const accessToken = parsed.access_token

// Test load file
fetch('/api/hosting/load-file', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    websiteId: '26dbeb32-0feb-4ea6-932a-990e7bbe3eeb',
    versionId: 'ff00df56-b580-4703-b02e-cf15ea3c32b6',
    fileName: 'index.html'
  })
})
.then(r => r.json())
.then(d => console.log(d))
.catch(e => console.error(e))
```

### 6. Server Logs

Check the terminal where your dev server is running.

You should see:
```
[load-file] Request: {websiteId: "26dbeb32...", versionId: "ff00df56...", fileName: "index.html"}
[load-file] Loading specific version: ff00df56...
[load-file] Storage path: 26dbeb32.../ff00df56...
[load-file] Downloading file: 26dbeb32.../ff00df56.../index.html
[load-file] File downloaded successfully, size: 1234
```

## Quick Fixes

### Fix 1: Hard Refresh

Clear cache and reload:
- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

### Fix 2: Clear Local Storage

```javascript
// In console:
localStorage.clear()
// Then log in again
```

### Fix 3: Check File Exists

Use the list-files endpoint:

```javascript
fetch('/api/hosting/list-files', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    websiteId: '26dbeb32-0feb-4ea6-932a-990e7bbe3eeb',
    versionId: 'ff00df56-b580-4703-b02e-cf15ea3c32b6'
  })
})
.then(r => r.json())
.then(d => console.log('Files:', d.files))
```

### Fix 4: Verify Database

Check if versions exist:

```sql
SELECT 
  wv.id,
  wv.label,
  wv.storage_path
FROM website_versions wv
WHERE wv.website_id = '26dbeb32-0feb-4ea6-932a-990e7bbe3eeb'
ORDER BY wv.created_at DESC;
```

## Expected Behavior

### On Page Load

1. ✅ Website info bar appears
2. ✅ Shows "Bello Moving LLC"
3. ✅ Shows version info
4. ✅ Status: "Loading website..."
5. ✅ After 1 second: Status changes to "✓ Loaded (1234 bytes)"
6. ✅ Code appears in editor
7. ✅ Preview renders

### If Something Fails

- Status shows: "✗ Error: [error message]"
- Alert popup with error details
- Console shows detailed error logs

## Contact Points

If none of the above works, check:

1. **Supabase Connection**
   - Is Supabase URL correct?
   - Is anon key correct?
   - Is project accessible?

2. **Authentication**
   - Is user logged in?
   - Is token valid?
   - Is token in correct format?

3. **Database**
   - Does website exist?
   - Does version exist?
   - Is storage_path correct?

4. **Storage**
   - Does bucket exist?
   - Does file exist?
   - Are RLS policies correct?

## Summary

With the new logging, you should see exactly where the process fails. Check the console and network tabs, and follow the error messages to identify the issue.
