# File Upload Setup for Onboarding Assets

## Overview
User-uploaded logos and assets from the onboarding form are **stored as actual files in Supabase Storage** (object storage) and **metadata/references are stored in the database**. This is the industry best practice approach that:

- ✅ Keeps database performant (no large binary data)
- ✅ Enables CDN delivery and caching
- ✅ Provides direct file access via URLs
- ✅ Allows independent file management
- ✅ Stores comprehensive metadata in database for tracking

**Important**: The actual file data (binary content) is stored in Supabase Storage buckets, NOT in the database. The database stores URLs and metadata only.

## Storage Structure

### Supabase Storage Bucket: `website-assets`
```
website-assets/
  ├── {user_id}/
      ├── {website_id}/
          ├── logo-{timestamp}.{ext}
          └── assets/
              ├── filename-{timestamp}.{ext}
```

**Bucket Configuration:**
- Name: `website-assets`
- Public: Yes (files are publicly accessible via URL)
- File size limit: 50MB per file (configurable)
- Allowed MIME types: images (png, jpg, jpeg, svg, webp), PDFs, etc.

## Database Schema

### `websites` Table Columns
- `uploaded_logo` (text): Stores the public URL of the uploaded logo
  - Example: `https://{project}.supabase.co/storage/v1/object/public/website-assets/{user_id}/{website_id}/logo-1234567890.png`
  - NULL if no logo uploaded

- `uploaded_assets` (jsonb): Stores array of asset objects
  - Structure: `[{name: string, url: string, size: number}, ...]`
  - Example: 
    ```json
    [
      {
        "name": "brand-guide.pdf",
        "url": "https://{project}.supabase.co/storage/v1/object/public/website-assets/{user_id}/{website_id}/assets/brand-guide-1234567890.pdf",
        "size": 2048576
      }
    ]
    ```
  - Empty array `[]` if no assets uploaded

## Implementation Flow

### 1. User Uploads Files in Onboarding Form
- Logo: Single file upload via drag-drop or file picker
- Assets: Multiple file uploads
- Files stored in browser memory as File objects

### 2. Form Submission Process
When user submits the onboarding form:

**Step 1: Upload Files to Storage**
- `POST /api/upload/website-assets`
- Sends each file via FormData
- Returns public URLs for uploaded files

**Step 2: Submit Onboarding Data**
- `POST /api/onboarding/submit`
- Payload includes file URLs (not file objects)
- API stores URLs in `websites` table

### 3. File Upload API (`/api/upload/website-assets`)

**Request:**
```typescript
FormData {
  file: File,
  fileType: 'logo' | 'asset',
  websiteId: string  // 'temp' during onboarding, actual ID after website created
}
```

**Response:**
```typescript
{
  success: true,
  files: [{
    name: string,         // Original filename
    url: string,          // Public URL for accessing the file
    path: string,         // Storage path in bucket
    size: number,         // File size in bytes
    type: string,         // MIME type
    uploadedAt: string    // ISO timestamp
  }]
}
```

**File Validation:**
- **Max file size**: 50MB per file
- **Allowed types**:
  - Images: PNG, JPG, JPEG, SVG, WebP, GIF
  - Documents: PDF, DOC, DOCX
- **Filename sanitization**: Special characters replaced with underscores
- **Automatic timestamping**: Prevents filename conflicts
```

**Authentication:**
- Requires Bearer token in Authorization header
- Only authenticated users can upload

### 4. Onboarding Submit API (`/api/onboarding/submit`)

**Payload Structure:**
```typescript
{
  // ... other onboarding fields
  uploadedLogo: string | null,           // Public URL
  uploadedAssets: Array<{                // Array of asset objects
    name: string,
    url: string,
    size: number
  }>
}
```

## Setup Instructions

### 1. Create Supabase Storage Bucket

Run in Supabase SQL Editor:
```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true);

-- Set up RLS policies for the bucket
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'website-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'website-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'website-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public access to files (since bucket is public)
CREATE POLICY "Public can view files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'website-assets');
```

### 2. Verify Database Columns

Ensure `websites` table has these columns:
```sql
-- Check if columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'websites' 
AND column_name IN ('uploaded_logo', 'uploaded_assets');

-- If missing, add them:
ALTER TABLE websites 
ADD COLUMN IF NOT EXISTS uploaded_logo TEXT,
ADD COLUMN IF NOT EXISTS uploaded_assets JSONB DEFAULT '[]'::jsonb;
```

### 3. Environment Variables

No additional environment variables needed. Uses existing Supabase config:
- `NUXT_PUBLIC_SUPABASE_URL`
- `NUXT_PUBLIC_SUPABASE_ANON_KEY`
- `NUXT_SUPABASE_SERVICE_ROLE_KEY`

## File Access

### Retrieving Files
Files are publicly accessible via their URLs stored in the database:

```typescript
// Get website with files
const { data: website } = await supabase
  .from('websites')
  .select('uploaded_logo, uploaded_assets')
  .eq('id', websiteId)
  .single()

// Logo URL
const logoUrl = website.uploaded_logo

// Asset URLs
const assetUrls = website.uploaded_assets.map(asset => asset.url)
```

### Displaying Files
```vue
<template>
  <!-- Logo -->
  <img v-if="website.uploaded_logo" :src="website.uploaded_logo" alt="Logo" />
  
  <!-- Assets -->
  <div v-for="asset in website.uploaded_assets" :key="asset.url">
    <a :href="asset.url" target="_blank">{{ asset.name }}</a>
  </div>
</template>
```

## Security Considerations

1. **File Size Limits**: Enforced at API level (50MB default)
2. **File Type Validation**: Should validate MIME types in upload API
3. **User Isolation**: Files stored in user-specific folders (`{user_id}/`)
4. **RLS Policies**: Users can only upload/delete their own files
5. **Public Access**: Files are publicly readable (suitable for website assets)

## Future Enhancements

1. **Image Optimization**: Resize/compress images on upload
2. **Virus Scanning**: Integrate malware scanning service
3. **CDN Integration**: Serve files via CDN for better performance
4. **File Versioning**: Keep history of uploaded files
5. **Bulk Upload**: Support multiple files in single request
6. **Progress Tracking**: Show upload progress in UI

## Troubleshooting

### Upload Fails
- Check Supabase Storage bucket exists and is public
- Verify RLS policies are set correctly
- Check file size doesn't exceed limits
- Ensure user is authenticated

### Files Not Displaying
- Verify URLs are stored correctly in database
- Check bucket public access settings
- Ensure CORS is configured in Supabase

### Permission Errors
- Verify RLS policies match user ID in storage path
- Check authentication token is valid
- Ensure service role key is set for server-side operations
