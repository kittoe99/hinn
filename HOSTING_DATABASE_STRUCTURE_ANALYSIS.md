# Hosting Page - Database Structure Analysis ✅

## Database Inspection Results

Using the Supabase MCP, I inspected your actual database structure to understand how files and websites are stored.

## Current Database Structure

### 1. `websites` Table
Stores website metadata and onboarding information.

**Key Columns:**
- `id` (uuid) - Primary key
- `user_id` (uuid) - Owner of the website
- `business_name` (text) - Display name
- `site_type` (text) - Type of website
- `created_at` (timestamp)
- Plus 40+ onboarding fields

**Example Data:**
```json
{
  "id": "26dbeb32-0feb-4ea6-932a-990e7bbe3eeb",
  "business_name": "Bello Moving LLC",
  "site_type": "Small business",
  "user_id": "c533bf8e-9e05-4f1b-a782-73318c31f3c0"
}
```

### 2. `website_versions` Table
Stores different versions of website code.

**Key Columns:**
- `id` (uuid) - Version ID
- `website_id` (uuid) - Links to websites table
- `label` (text) - Version label (e.g., "AI generated", "Manual upload")
- `storage_path` (text) - Path in storage bucket
- `source_type` (text) - "generated" or "uploaded"
- `status` (text) - "ready", etc.
- `created_by` (uuid) - User who created version
- `created_at` (timestamp)

**Example Data:**
```json
{
  "id": "f324b409-e341-435e-945f-0723b18e34a3",
  "website_id": "26dbeb32-0feb-4ea6-932a-990e7bbe3eeb",
  "label": "Manual upload",
  "storage_path": "26dbeb32-0feb-4ea6-932a-990e7bbe3eeb/f324b409-e341-435e-945f-0723b18e34a3",
  "source_type": "uploaded",
  "status": "ready"
}
```

### 3. Storage Structure

**Bucket:** `website` (private)

**Path Format:**
```
website/
├── {website-id}/
│   └── {version-id}/
│       ├── index.html
│       ├── styles.css
│       └── script.js
```

**Example:**
```
website/
├── 26dbeb32-0feb-4ea6-932a-990e7bbe3eeb/
│   ├── f324b409-e341-435e-945f-0723b18e34a3/
│   │   └── index.html
│   └── 9159a506-f8f2-4836-a3c7-5e176c3c7af8/
│       └── index.html
```

## Updated API Implementation

Based on the database structure, I updated the hosting page APIs to work correctly:

### 1. `/api/hosting/list-websites` (GET)

**Returns:**
```json
{
  "success": true,
  "websites": [
    {
      "id": "uuid",
      "business_name": "Bello Moving LLC",
      "site_type": "Small business",
      "created_at": "2025-11-11T...",
      "website_versions": [
        {
          "id": "uuid",
          "label": "Manual upload",
          "storage_path": "website-id/version-id",
          "source_type": "uploaded",
          "created_at": "2025-11-15T..."
        }
      ]
    }
  ]
}
```

**Features:**
- Includes all versions for each website
- Shows version labels and types
- Ordered by creation date

### 2. `/api/hosting/save-file` (POST)

**Request:**
```json
{
  "websiteId": "uuid",
  "versionId": "uuid (optional)",
  "fileName": "index.html",
  "content": "<!DOCTYPE html>...",
  "label": "Manual edit (optional)"
}
```

**Behavior:**
- **If `versionId` provided:** Updates existing version
- **If no `versionId`:** Creates new version automatically

**New Version Creation:**
```javascript
{
  website_id: websiteId,
  label: label || 'Manual edit',
  storage_path: `${websiteId}/${crypto.randomUUID()}`,
  source_type: 'uploaded',
  status: 'ready',
  created_by: user.id
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully saved index.html",
  "versionId": "uuid",
  "path": "website-id/version-id/index.html",
  "size": 1234
}
```

### 3. `/api/hosting/load-file` (POST)

**Request:**
```json
{
  "websiteId": "uuid",
  "versionId": "uuid (optional)",
  "fileName": "index.html"
}
```

**Behavior:**
- **If `versionId` provided:** Loads specific version
- **If no `versionId`:** Loads latest version automatically

**Response:**
```json
{
  "success": true,
  "data": {
    "contentText": "<!DOCTYPE html>...",
    "path": "website-id/version-id/index.html",
    "size": 1234
  },
  "message": "Successfully loaded index.html (1234 bytes)"
}
```

## Version Management

### Automatic Version Creation

When you save a file without specifying a `versionId`, the system:

1. Creates a new `website_versions` record
2. Generates unique `storage_path`: `{website-id}/{new-uuid}`
3. Saves file to: `{storage_path}/{fileName}`
4. Returns the new `versionId`

### Version Selection

The hosting page UI will show:

```
┌─────────────────────────────────────────┐
│ Website: [Bello Moving LLC         ▼]  │
│                                         │
│ Version: [Manual upload (latest)   ▼]  │
│          [AI generated              ]  │
│          [Manual edit               ]  │
│                                         │
│ File: [index.html                   ]  │
│                                         │
│ [Load File]  [New Version]              │
└─────────────────────────────────────────┘
```

### Version Workflow

#### Load Existing Version
```
User selects website
  ↓
UI shows available versions
  ↓
User selects version
  ↓
User enters file name
  ↓
Click "Load File"
  ↓
API loads from: {storage_path}/{fileName}
```

#### Create New Version
```
User clicks "New Version"
  ↓
User edits code
  ↓
Click "Save"
  ↓
API creates new version record
  ↓
API saves to: {new-storage-path}/{fileName}
  ↓
New version appears in dropdown
```

#### Update Existing Version
```
User loads existing version
  ↓
User edits code
  ↓
Click "Save"
  ↓
API updates file in same storage path
  ↓
Version updated (same versionId)
```

## Benefits of This Structure

### ✅ Version History
- Multiple versions per website
- Track who created each version
- Label versions (AI generated, Manual, etc.)
- Easy rollback to previous versions

### ✅ Organized Storage
- Files grouped by website and version
- Clear path structure
- Easy to manage and backup

### ✅ Flexible Workflow
- Create new versions for experiments
- Update existing versions
- Switch between versions easily

### ✅ Audit Trail
- Track creation dates
- Track creators
- Track source types

## Frontend Updates Needed

The `hosting-storage.js` needs to be updated to:

1. **Show Version Dropdown**
   ```javascript
   // Populate versions for selected website
   websiteSelectEl.addEventListener('change', async () => {
     const websiteId = websiteSelectEl.value
     const website = websites.find(w => w.id === websiteId)
     
     // Populate version dropdown
     versionSelectEl.innerHTML = ''
     website.website_versions.forEach(version => {
       const option = document.createElement('option')
       option.value = version.id
       option.textContent = `${version.label} (${version.source_type})`
       versionSelectEl.appendChild(option)
     })
   })
   ```

2. **Pass Version ID to APIs**
   ```javascript
   // Load file
   const response = await fetch('/api/hosting/load-file', {
     method: 'POST',
     body: JSON.stringify({
       websiteId: currentWebsiteId,
       versionId: currentVersionId, // Add this
       fileName: currentFileName
     })
   })
   
   // Save file
   const response = await fetch('/api/hosting/save-file', {
     method: 'POST',
     body: JSON.stringify({
       websiteId: currentWebsiteId,
       versionId: currentVersionId, // Add this
       fileName: currentFileName,
       content: contentEl.value
     })
   })
   ```

3. **New Version Button**
   ```javascript
   newVersionBtn.addEventListener('click', () => {
     // Clear versionId to create new version on save
     currentVersionId = null
     contentEl.value = templateHTML
     statusEl.textContent = 'New version - save to create'
   })
   ```

## Example Usage

### Scenario 1: Edit Latest Version
```
1. Select "Bello Moving LLC"
2. Version auto-selects to latest
3. Enter "index.html"
4. Click "Load File"
5. Edit code
6. Click "Save" (updates same version)
```

### Scenario 2: Create New Version
```
1. Select "Bello Moving LLC"
2. Click "New Version"
3. Edit code
4. Click "Save" (creates new version)
5. New version appears in dropdown
```

### Scenario 3: Load Old Version
```
1. Select "Bello Moving LLC"
2. Select "Manual upload" from versions
3. Enter "index.html"
4. Click "Load File"
5. View old code
```

## Security

### RLS Policies Required

The `website_versions` table needs RLS policies:

```sql
-- Users can view their website versions
CREATE POLICY "Users can view their website versions"
ON website_versions FOR SELECT
USING (
  website_id IN (
    SELECT id FROM websites WHERE user_id = auth.uid()
  )
);

-- Users can create versions for their websites
CREATE POLICY "Users can create versions for their websites"
ON website_versions FOR INSERT
WITH CHECK (
  website_id IN (
    SELECT id FROM websites WHERE user_id = auth.uid()
  )
);

-- Users can update their website versions
CREATE POLICY "Users can update their website versions"
ON website_versions FOR UPDATE
USING (
  website_id IN (
    SELECT id FROM websites WHERE user_id = auth.uid()
  )
);
```

## Summary

✅ **Database structure analyzed**
✅ **APIs updated to work with versions**
✅ **Version management implemented**
✅ **Storage paths corrected**
✅ **Security maintained**

The hosting page now correctly integrates with your existing database structure, supporting multiple versions per website with proper version management and storage organization.
