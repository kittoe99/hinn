# Supabase Storage Setup for File Uploads

## Create the Storage Bucket

You need to create a storage bucket in your Supabase project for file uploads to work.

### Steps:

1. **Go to Supabase Dashboard**
   - Navigate to your project at https://supabase.com/dashboard

2. **Go to Storage**
   - Click on "Storage" in the left sidebar

3. **Create New Bucket**
   - Click "New bucket"
   - **Bucket name:** `website-assets`
   - **Public bucket:** ✅ Check this (files need to be publicly accessible)
   - Click "Create bucket"

4. **Set Bucket Policies (Important!)**
   After creating the bucket, you need to set up policies:

   Go to the bucket → Click "Policies" → Add these policies:

   **Policy 1: Allow authenticated users to upload**
   ```sql
   CREATE POLICY "Allow authenticated users to upload"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'website-assets');
   ```

   **Policy 2: Allow public read access**
   ```sql
   CREATE POLICY "Allow public read access"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'website-assets');
   ```

   **Policy 3: Allow users to delete their own files**
   ```sql
   CREATE POLICY "Allow users to delete their own files"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (bucket_id = 'website-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
   ```

## Alternative: SQL Script

You can also run this SQL in the Supabase SQL Editor:

```sql
-- Create the bucket (if using SQL)
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Add policies
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'website-assets');

CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'website-assets');

CREATE POLICY "Allow users to delete their own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'website-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Verify Setup

After creating the bucket:
1. Try uploading a logo from the dashboard
2. Check the Supabase Storage browser to see if files appear
3. Files should be organized as: `{userId}/{websiteId}/logo-{timestamp}.{ext}`

## Bucket Structure

```
website-assets/
├── {userId}/
│   ├── {websiteId}/
│   │   ├── logo-{timestamp}.png
│   │   └── assets/
│   │       ├── file1-{timestamp}.pdf
│   │       └── file2-{timestamp}.jpg
```
