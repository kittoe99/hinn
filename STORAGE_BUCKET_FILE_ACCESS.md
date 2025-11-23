# Storage Bucket File Access Guide

## Database Structure Analysis

Using Supabase MCP, I analyzed your actual data:

### Current Data in Database

**Website:** Bello Moving LLC
- **Website ID:** `26dbeb32-0feb-4ea6-932a-990e7bbe3eeb`
- **User ID:** `c533bf8e-9e05-4f1b-a782-73318c31f3c0`

**Versions Available:**
1. **Latest:** `ff00df56-b580-4703-b02e-cf15ea3c32b6` - AI generated (Nov 15, 2025)
2. `07818095-6382-411d-acef-de52c1c4aa78` - AI generated (Nov 15, 2025)
3. `9159a506-f8f2-4836-a3c7-5e176c3c7af8` - AI generated (Nov 15, 2025)
4. **Oldest:** `f324b409-e341-435e-945f-0723b18e34a3` - Manual upload (Nov 15, 2025)

### Storage Structure

**Bucket:** `website` (private)

**Storage Paths:**
```
website/
├── 26dbeb32-0feb-4ea6-932a-990e7bbe3eeb/
│   ├── ff00df56-b580-4703-b02e-cf15ea3c32b6/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js
│   ├── 07818095-6382-411d-acef-de52c1c4aa78/
│   │   └── index.html
│   ├── 9159a506-f8f2-4836-a3c7-5e176c3c7af8/
│   │   └── index.html
│   └── f324b409-e341-435e-945f-0723b18e34a3/
│       └── index.html
```

## How to Pull Files from Storage

### Method 1: List All Files in a Version

**New Endpoint:** `/api/hosting/list-files` (POST)

**Request:**
```json
{
  "websiteId": "26dbeb32-0feb-4ea6-932a-990e7bbe3eeb",
  "versionId": "ff00df56-b580-4703-b02e-cf15ea3c32b6"
}
```

**Response:**
```json
{
  "success": true,
  "files": [
    {
      "name": "index.html",
      "size": 1234,
      "contentType": "text/html",
      "lastModified": "2025-11-15T19:01:58.072927Z",
      "path": "26dbeb32.../ff00df56.../index.html"
    },
    {
      "name": "styles.css",
      "size": 567,
      "contentType": "text/css",
      "lastModified": "2025-11-15T19:02:00.000000Z",
      "path": "26dbeb32.../ff00df56.../styles.css"
    }
  ],
  "storagePath": "26dbeb32.../ff00df56...",
  "totalFiles": 2
}
```

### Method 2: Load Specific File

**Existing Endpoint:** `/api/hosting/load-file` (POST)

**Request:**
```json
{
  "websiteId": "26dbeb32-0feb-4ea6-932a-990e7bbe3eeb",
  "versionId": "ff00df56-b580-4703-b02e-cf15ea3c32b6",
  "fileName": "index.html"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "contentText": "<!DOCTYPE html>...",
    "path": "26dbeb32.../ff00df56.../index.html",
    "size": 1234
  },
  "message": "Successfully loaded index.html (1234 bytes)"
}
```

### Method 3: Direct Storage API

**Using Supabase Client:**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(supabaseUrl, supabaseKey)

// List files
const { data: files, error } = await supabase.storage
  .from('website')
  .list('26dbeb32.../ff00df56...', {
    limit: 100,
    sortBy: { column: 'name', order: 'asc' }
  })

// Download file
const { data: fileData, error } = await supabase.storage
  .from('website')
  .download('26dbeb32.../ff00df56.../index.html')

// Convert to text
const text = await fileData.text()
```

## Complete Workflow

### 1. Get User's Websites

**Query:**
```sql
SELECT 
  w.id,
  w.business_name,
  w.site_type,
  w.user_id
FROM websites w
WHERE w.user_id = 'c533bf8e-9e05-4f1b-a782-73318c31f3c0'
ORDER BY w.created_at DESC;
```

**Result:**
```json
[
  {
    "id": "26dbeb32-0feb-4ea6-932a-990e7bbe3eeb",
    "business_name": "Bello Moving LLC",
    "site_type": "Small business",
    "user_id": "c533bf8e-9e05-4f1b-a782-73318c31f3c0"
  }
]
```

### 2. Get Website Versions

**Query:**
```sql
SELECT 
  wv.id,
  wv.label,
  wv.storage_path,
  wv.source_type,
  wv.created_at
FROM website_versions wv
WHERE wv.website_id = '26dbeb32-0feb-4ea6-932a-990e7bbe3eeb'
ORDER BY wv.created_at DESC;
```

**Result:**
```json
[
  {
    "id": "ff00df56-b580-4703-b02e-cf15ea3c32b6",
    "label": "AI generated",
    "storage_path": "26dbeb32.../ff00df56...",
    "source_type": "generated",
    "created_at": "2025-11-15T19:01:58.072927Z"
  }
]
```

### 3. List Files in Version

**API Call:**
```javascript
const response = await fetch('/api/hosting/list-files', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    websiteId: '26dbeb32-0feb-4ea6-932a-990e7bbe3eeb',
    versionId: 'ff00df56-b580-4703-b02e-cf15ea3c32b6'
  })
})

const { files } = await response.json()
```

### 4. Load Each File

**API Call:**
```javascript
for (const file of files) {
  const response = await fetch('/api/hosting/load-file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      websiteId: '26dbeb32-0feb-4ea6-932a-990e7bbe3eeb',
      versionId: 'ff00df56-b580-4703-b02e-cf15ea3c32b6',
      fileName: file.name
    })
  })
  
  const { data } = await response.json()
  console.log(`${file.name}:`, data.contentText)
}
```

## Frontend Implementation

### Update hosting-storage.js

Add file browser functionality:

```javascript
// List files in current version
async function listFiles() {
  const token = getSupabaseToken()
  
  const response = await fetch('/api/hosting/list-files', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      websiteId: currentWebsiteId,
      versionId: currentVersionId
    })
  })
  
  const { files } = await response.json()
  
  // Populate file list UI
  const fileListEl = document.getElementById('fileList')
  fileListEl.innerHTML = ''
  
  files.forEach(file => {
    const fileItem = document.createElement('div')
    fileItem.className = 'file-item'
    fileItem.innerHTML = `
      <i class="fas fa-file"></i>
      <span>${file.name}</span>
      <span class="text-xs text-gray-500">${formatSize(file.size)}</span>
    `
    fileItem.addEventListener('click', () => {
      fileNameEl.value = file.name
      loadFile()
    })
    fileListEl.appendChild(fileItem)
  })
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
```

### Add File Browser UI

```html
<!-- File Browser Sidebar -->
<div class="w-64 border-r border-gray-200 bg-gray-50 p-4">
  <div class="flex items-center justify-between mb-4">
    <h3 class="font-semibold text-gray-900">Files</h3>
    <button id="refreshFilesBtn" class="text-indigo-600 hover:text-indigo-800">
      <i class="fas fa-sync-alt"></i>
    </button>
  </div>
  
  <div id="fileList" class="space-y-1">
    <!-- Files will be populated here -->
  </div>
  
  <button id="newFileBtn" class="mt-4 w-full border border-dashed border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:border-indigo-500 hover:text-indigo-600">
    <i class="fas fa-plus mr-2"></i>New File
  </button>
</div>
```

## Data Flow Diagram

```
User clicks "Edit Site" in Dashboard
    ↓
Navigate to /hosting?website=26dbeb32...
    ↓
Load websites from database
    ↓
Find website by ID
    ↓
Get website_versions for this website
    ↓
Select latest version (ff00df56...)
    ↓
Get storage_path from version
    ↓
List files in storage bucket at path
    ↓
Display files in file browser
    ↓
User clicks on file
    ↓
Load file content from storage
    ↓
Display in code editor
    ↓
User edits and saves
    ↓
Save back to storage at same path
```

## Security

### RLS Policies

The storage bucket uses RLS policies to ensure users can only access their own files:

```sql
-- Users can view their website files
CREATE POLICY "Users can view their website files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'website' 
  AND (storage.foldername(name))[1] IN (
    SELECT id::text 
    FROM websites 
    WHERE user_id = auth.uid()
  )
);

-- Users can upload to their website folders
CREATE POLICY "Users can upload to their website folders"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'website' 
  AND (storage.foldername(name))[1] IN (
    SELECT id::text 
    FROM websites 
    WHERE user_id = auth.uid()
  )
);
```

## Summary

✅ **Database structure analyzed** - Found 1 website with 4 versions
✅ **Storage paths identified** - Files stored at `{website-id}/{version-id}/{filename}`
✅ **List files endpoint created** - `/api/hosting/list-files`
✅ **Load file endpoint exists** - `/api/hosting/load-file`
✅ **Security maintained** - RLS policies enforce ownership

You can now:
1. List all files in a version
2. Load specific files for editing
3. Save files back to storage
4. Browse files in a file tree UI

All files are stored in the `website` storage bucket and can be accessed via the storage path from the `website_versions` table!
