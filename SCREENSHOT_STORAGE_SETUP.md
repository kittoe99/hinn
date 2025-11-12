# Screenshot Storage Setup

## Create Supabase Storage Bucket

You need to manually create the `screenshots` storage bucket in your Supabase dashboard:

### Steps:

1. Go to your Supabase project: https://supabase.com/dashboard/project/mjgwoukwyqwoectxfwqv
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Configure the bucket:
   - **Name**: `screenshots`
   - **Public bucket**: ✅ Yes (checked)
   - **File size limit**: 10 MB (recommended)
   - **Allowed MIME types**: `image/png` (optional)
5. Click **Create bucket**

### Bucket Policies

The bucket should be public so screenshots can be accessed without authentication.

If you need to set custom policies:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'screenshots' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'screenshots' 
  AND auth.role() = 'authenticated'
);
```

## Database Migration

Run the migration to add the `screenshot_url` field:

```bash
# The migration file is already created at:
# supabase/migrations/add_screenshot_url.sql

# You can apply it manually in Supabase SQL Editor or via CLI
```

Or run this SQL directly in Supabase SQL Editor:

```sql
ALTER TABLE websites 
ADD COLUMN IF NOT EXISTS screenshot_url TEXT;

COMMENT ON COLUMN websites.screenshot_url IS 'URL to the cached screenshot in Supabase storage';
```

## How It Works

1. **First Request**: When a website is opened for the first time:
   - API checks if `screenshot_url` exists in database
   - If not, captures screenshot using Firecrawl
   - Uploads to `screenshots` bucket
   - Saves public URL to `websites.screenshot_url`

2. **Subsequent Requests**: 
   - API finds existing `screenshot_url`
   - Returns cached URL immediately
   - No new screenshot is taken

3. **Benefits**:
   - Faster loading (cached screenshots)
   - Reduced API costs (Firecrawl only called once)
   - Persistent storage (screenshots don't expire)

## Testing

After creating the bucket and running the migration:

1. Refresh your dev server
2. Open dashboard and click on a website
3. First time: Screenshot will be captured and cached
4. Check Supabase Storage to see the uploaded image
5. Subsequent opens: Screenshot loads instantly from cache
