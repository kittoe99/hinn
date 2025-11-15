# MIME Type Upload Fix

## Issue
When deploying AI-generated code, the upload failed with error:
```
Upload failed: mime type text/html; charset=utf-8 is not supported
```

## Root Cause
Supabase Storage doesn't support MIME types with charset parameters like `text/html; charset=utf-8`. It only accepts the base MIME type like `text/html`.

## Fix Applied

### Before (❌ Broken)
```typescript
const content = new TextEncoder().encode(html)

const { error: uploadError } = await supabase.storage
  .from('websites')
  .upload(indexPath, content, {
    contentType: 'text/html; charset=utf-8',  // ❌ Not supported
    upsert: false,
    cacheControl: '3600'
  })
```

### After (✅ Fixed)
```typescript
// Convert HTML string to Blob with proper MIME type
const blob = new Blob([html], { type: 'text/html' })

const { error: uploadError } = await supabase.storage
  .from('websites')
  .upload(indexPath, blob, {
    contentType: 'text/html',  // ✅ Supported
    upsert: false,
    cacheControl: '3600'
  })
```

## Changes Made

**File:** `server/api/hosting/generate.post.ts`

**Line 73-81:**
- Changed from `TextEncoder().encode()` to `new Blob()`
- Changed MIME type from `text/html; charset=utf-8` to `text/html`
- Blob automatically handles UTF-8 encoding

## Supported MIME Types

Supabase Storage supports these base MIME types:

### Text Files
- `text/html` - HTML files
- `text/css` - CSS files
- `text/javascript` - JavaScript files
- `text/plain` - Plain text files

### Images
- `image/jpeg` - JPEG images
- `image/png` - PNG images
- `image/gif` - GIF images
- `image/svg+xml` - SVG images
- `image/webp` - WebP images

### Other
- `application/json` - JSON files
- `application/pdf` - PDF files
- `application/zip` - ZIP archives

**Important:** Do NOT include charset parameters like `;charset=utf-8`

## Testing the Fix

### Test 1: Generate New HTML
1. Select website
2. Ask AI: "Create a landing page"
3. AI generates HTML
4. Click "Create generated version"
5. ✅ Should upload successfully
6. Preview URL should work

### Test 2: Edit Existing HTML
1. Load file from bucket
2. Ask AI: "Add a contact form"
3. AI returns updated HTML
4. Code auto-applies to editor
5. Click "Create generated version"
6. ✅ Should upload successfully
7. New version appears in list

### Test 3: Add Images
1. Load file
2. Ask AI: "Add external images"
3. AI returns HTML with images
4. Auto-applied to editor
5. Click "Create generated version"
6. ✅ Should upload successfully
7. Images should display in preview

## Error Handling

If you still see upload errors, check:

1. **Bucket exists**: `websites` bucket in Supabase Storage
2. **Bucket is public**: Public access enabled for serving files
3. **RLS policies**: Proper policies for authenticated users
4. **File size**: Not exceeding bucket limits
5. **MIME type**: Using base type without parameters

## Bucket Configuration

Ensure your `websites` bucket has:

```sql
-- Public access for reading
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'websites');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'websites' 
  AND auth.role() = 'authenticated'
);
```

## Related Files

- `server/api/hosting/generate.post.ts` - AI generated code upload (FIXED)
- `server/api/hosting/upload.post.ts` - Manual file upload (already correct)
- `server/api/site/[...path].get.ts` - File serving endpoint

## Verification

After the fix, the flow should work:

```
1. AI generates HTML → Complete file with changes
2. Frontend extracts → Auto-applies to editor
3. User clicks deploy → Calls /api/hosting/generate
4. Backend creates Blob → With MIME type 'text/html'
5. Upload to storage → ✅ Success
6. Version created → New record in website_versions
7. Preview URL → /site/{websiteId}/{versionId}/index.html
```

## Success Indicators

You'll know it's working when:
- ✅ No MIME type errors in console
- ✅ "Create generated version" succeeds
- ✅ New version appears in versions list
- ✅ Preview URL loads the HTML
- ✅ All styles and content display correctly

The fix is now live and should resolve all MIME type upload issues!
