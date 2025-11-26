# Image Saving Fix

## Problem
Image saving was failing on the canvas-printing page after adding authentication.

## Root Cause
The API endpoint was using the Supabase anon key without passing the user's authentication token to storage operations, causing permission errors with Row Level Security (RLS) policies.

## Solution Applied

### **1. Fixed API Authentication** (`server/api/canvas/save-images.post.ts`)

**Before:**
```typescript
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseAnonKey
)
const { data: { user } } = await supabase.auth.getUser(token)
```

**After:**
```typescript
const token = authHeader.replace('Bearer ', '')

const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseAnonKey,
  {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
)

const { data: { user } } = await supabase.auth.getUser()
```

**Why this fixes it:**
- The Supabase client now includes the user's auth token in ALL requests
- Storage operations (upload/download) now have proper user context
- RLS policies can correctly identify the authenticated user
- User-specific folder paths (`user_id/filename`) are now accessible

### **2. Improved Error Handling**

**API Endpoint:**
```typescript
if (uploadError) {
  console.error('Upload error for image', i, ':', uploadError)
  console.error('Upload error details:', JSON.stringify(uploadError, null, 2))
  throw new Error(`Upload failed: ${uploadError.message}`)
}

if (dbError) {
  console.error('Database error for image', i, ':', dbError)
  console.error('Database error details:', JSON.stringify(dbError, null, 2))
  throw new Error(`Database insert failed: ${dbError.message}`)
}
```

**Frontend:**
```typescript
if (response.success) {
  alert('Image saved successfully!')
  await fetchSavedImages()
} else {
  console.error('Save failed:', response)
  const errorMsg = (response as any).error || 'Unknown error'
  alert(`Failed to save image: ${errorMsg}`)
}
```

### **3. TypeScript Fixes**

Added type assertions to handle API response types:
```typescript
const errorMsg = (response as any).error || 'Unknown error'
savedImages.value = (response as any).images
```

## How It Works Now

### **Save Flow:**
```
1. User clicks "Save Image"
   ↓
2. Frontend gets user's auth token from Supabase
   ↓
3. Sends POST to /api/canvas/save-images with Bearer token
   ↓
4. API creates Supabase client WITH user token
   ↓
5. Fetches image from URL
   ↓
6. Uploads to storage bucket: saved-canvas-images/{user_id}/{timestamp}.png
   ↓
7. RLS policies allow upload (user owns the folder)
   ↓
8. Gets public URL
   ↓
9. Inserts metadata to saved_canvas_images table
   ↓
10. RLS policies allow insert (user_id matches)
   ↓
11. Returns success to frontend
   ↓
12. Frontend shows success message and refreshes gallery
```

## Testing

### **Test Scenarios:**

1. **Save Single Edited Image**
   - Edit an image
   - Click "Save Image"
   - Should save successfully
   - Check Dashboard → Gallery to verify

2. **Save Multiple Images**
   - Generate multiple images
   - Select several
   - Click "Save All Photos"
   - All selected images should save

3. **Error Handling**
   - Try saving without authentication (should show error)
   - Check console for detailed error messages
   - Verify user-friendly error alerts

## Database Structure

### **Storage:**
- Bucket: `saved-canvas-images`
- Path: `{user_id}/{timestamp}-{index}.png`
- Public: Yes (with RLS)
- Size Limit: 10MB
- Allowed Types: PNG, JPEG, JPG, WEBP

### **Table: saved_canvas_images**
```sql
- id (UUID, primary key)
- user_id (UUID, references auth.users)
- storage_path (TEXT, path in storage bucket)
- original_prompt (TEXT)
- modification_prompt (TEXT)
- image_url (TEXT, public URL)
- is_variation (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### **RLS Policies:**
- Users can only upload to their own folder
- Users can only view their own images
- Users can only delete their own images

## Benefits

✅ **Secure** - User token validates all operations
✅ **Isolated** - Each user's images are separate
✅ **Debuggable** - Detailed error logging
✅ **User-Friendly** - Clear error messages
✅ **Scalable** - Proper authentication pattern

## Common Issues & Solutions

### **Issue: "Upload failed: new row violates row-level security policy"**
**Solution:** User token not passed correctly. Fixed by adding token to Supabase client config.

### **Issue: "Authentication failed"**
**Solution:** Check that user is logged in and token is valid. Frontend now checks `user.value` before saving.

### **Issue: "Failed to save image: Network error"**
**Solution:** Check browser console for detailed error. API now logs full error details.

## Next Steps (Optional)

Consider adding:
- Progress indicators for multi-image saves
- Retry logic for failed uploads
- Image compression before upload
- Batch upload optimization
- Toast notifications instead of alerts
