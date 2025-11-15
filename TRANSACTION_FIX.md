# Transaction Order Fix

## Problem

Previously, the system created database records BEFORE uploading files to storage. This caused orphaned database records when storage uploads failed:

```
1. Create database record ✅
2. Upload to storage ❌ (MIME type error)
Result: Database has record, but no file in storage
```

## Solution

Reversed the order - upload to storage FIRST, then create database record:

```
1. Upload to storage ✅
2. Create database record ✅
Result: Both succeed, or neither exists
```

---

## Changes Made

### 1. Fixed Upload Order

**File:** `server/api/hosting/generate.post.ts`

**Before (❌ Wrong order):**
```typescript
// Step 1: Create database record
const { error: versionError } = await supabase
  .from('website_versions')
  .insert({ ... })

// Step 2: Upload to storage (could fail)
const { error: uploadError } = await supabase.storage
  .from('websites')
  .upload(indexPath, content, { ... })
```

**After (✅ Correct order):**
```typescript
// STEP 1: Upload to storage FIRST
const blob = new Blob([html], { type: 'text/html' })
const { error: uploadError } = await supabase.storage
  .from('websites')
  .upload(indexPath, blob, {
    contentType: 'text/html',
    upsert: false
  })

if (uploadError) {
  throw createError({ ... })
}

// STEP 2: Create database record AFTER successful upload
const { error: versionError } = await supabase
  .from('website_versions')
  .insert({ ... })

if (versionError) {
  // Rollback: Delete the uploaded file
  await supabase.storage.from('websites').remove([indexPath])
  throw createError({ ... })
}
```

### 2. Added Rollback Logic

If database insert fails after successful upload, the file is automatically deleted:

```typescript
if (versionError) {
  // Rollback: Delete the uploaded file
  await supabase.storage.from('websites').remove([indexPath])
  throw createError({ ... })
}
```

### 3. Created Cleanup Endpoint

**File:** `server/api/hosting/cleanup-orphaned.post.ts`

Manually cleanup any orphaned records from previous failures:

```typescript
POST /api/hosting/cleanup-orphaned
Body: { websiteId: "uuid" }

Returns: {
  success: true,
  message: "Cleaned up 2 orphaned version(s)",
  orphanedCount: 2,
  orphanedIds: ["uuid1", "uuid2"]
}
```

---

## Benefits

### Before Fix
- ❌ Database records without files
- ❌ Versions list shows broken entries
- ❌ Preview URLs return 404
- ❌ Manual cleanup required

### After Fix
- ✅ Atomic operations
- ✅ No orphaned records
- ✅ All versions have files
- ✅ Preview URLs always work
- ✅ Automatic rollback on failure

---

## How It Works Now

### Success Case
```
1. User clicks "Create generated version"
2. Upload HTML to storage → ✅ Success
3. Create database record → ✅ Success
4. Return version info → ✅ Success
5. Preview URL works → ✅ Success
```

### Failure Case (Storage)
```
1. User clicks "Create generated version"
2. Upload HTML to storage → ❌ Fails
3. Stop here, throw error
4. No database record created
5. User sees error message
6. Can retry without cleanup
```

### Failure Case (Database)
```
1. User clicks "Create generated version"
2. Upload HTML to storage → ✅ Success
3. Create database record → ❌ Fails
4. Rollback: Delete uploaded file → ✅ Success
5. Throw error
6. No orphaned data
```

---

## Cleanup Utility

If you have orphaned records from before the fix, use the cleanup endpoint:

### Frontend Usage

Add a cleanup button in the UI:

```typescript
const cleanupOrphaned = async () => {
  try {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    
    const res = await $fetch('/api/hosting/cleanup-orphaned', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        websiteId: currentWebsiteId.value
      }
    })
    
    console.log(res.message)
    // Reload versions list
    await loadVersions()
  } catch (err) {
    console.error('Cleanup failed:', err)
  }
}
```

### What It Does

1. Fetches all versions for the website
2. Checks if storage files exist for each version
3. Identifies versions with no files (orphaned)
4. Deletes orphaned database records
5. Returns count of cleaned records

---

## Testing

### Test 1: Normal Upload
1. Generate HTML with AI
2. Click "Create generated version"
3. ✅ Should succeed
4. Version appears in list
5. Preview URL works

### Test 2: Storage Failure (Simulated)
1. Temporarily disable storage bucket
2. Try to deploy
3. ❌ Should fail with error
4. Check database → No record created
5. Re-enable bucket and retry
6. ✅ Should succeed

### Test 3: Cleanup Orphaned
1. Check if any orphaned records exist
2. Call cleanup endpoint
3. See count of cleaned records
4. Reload versions list
5. Only valid versions shown

---

## Database Integrity

The system now maintains referential integrity:

```
website_versions table:
- id (UUID)
- website_id (UUID)
- storage_path (TEXT)
- status (TEXT)

Storage bucket 'websites':
- {websiteId}/{versionId}/index.html

RULE: Every database record MUST have corresponding storage file
```

---

## Monitoring

Check for issues:

```sql
-- Find versions without storage files (should be 0)
SELECT v.id, v.storage_path, v.created_at
FROM website_versions v
WHERE v.status = 'ready'
  AND NOT EXISTS (
    -- Check if file exists in storage
    -- (manual verification needed)
  )
```

Or use the cleanup endpoint which does this automatically.

---

## Summary

✅ **Fixed:** Upload order (storage first, database second)
✅ **Added:** Rollback on database failure
✅ **Created:** Cleanup utility for orphaned records
✅ **Result:** No more orphaned database records

The system now ensures atomic operations - either both storage and database succeed, or neither does!
