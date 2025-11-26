# Troubleshooting: Site Not Saving or Deploying

## Issue
"Deployment failed: Failed to save site before deployment"

## Root Causes

### 1. Database Tables Not Created ⚠️ MOST LIKELY

The `generated_sites` and `site_versions` tables need to be created in your Supabase database.

**Quick Check:**
```sql
-- Run this in Supabase SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('generated_sites', 'site_versions');
```

**If tables don't exist, run this:**
```bash
# Apply the migration
cd c:\Users\User\Desktop\hinn.nuxt
supabase db push

# Or manually run the SQL file in Supabase SQL Editor:
# Copy contents of: supabase/migrations/20241126_create_generated_sites.sql
```

### 2. User Not Authenticated

**Check in browser console:**
```javascript
// Should show user object
console.log('User:', useSupabaseUser().value)
```

**If null:**
- User needs to log in
- Auth middleware should redirect to login
- Check if Supabase auth is configured

### 3. RLS Policies Blocking Access

**Check policies:**
```sql
-- View RLS policies
SELECT * FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'generated_sites';
```

**If no policies exist, run the migration again**

### 4. Supabase Client Configuration

**Check environment variables:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_KEY=your-anon-key
```

## Debugging Steps

### Step 1: Check Browser Console

Open browser DevTools (F12) and look for:

```
💾 Saving website... { currentSiteId: null, fileCount: 2 }
Creating site with data: { user_id: "...", title: "...", file_count: 2 }
```

**If you see error:**
```
Error creating site: { message: "...", code: "..." }
```

This tells you the exact problem.

### Step 2: Test Database Connection

Run this in browser console:
```javascript
const supabase = useSupabaseClient()
const { data, error } = await supabase.from('generated_sites').select('count')
console.log('Test result:', data, error)
```

**Expected:**
- Success: `data: [{ count: 0 }]`
- Table missing: `error: { message: "relation 'generated_sites' does not exist" }`
- Auth issue: `error: { message: "permission denied" }`

### Step 3: Manual Table Creation

If migrations aren't working, create tables manually:

```sql
-- Copy and paste this entire SQL into Supabase SQL Editor

-- Create generated_sites table
CREATE TABLE IF NOT EXISTS public.generated_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  files JSONB NOT NULL DEFAULT '{}'::jsonb,
  preview_image TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb,
  CONSTRAINT valid_files CHECK (jsonb_typeof(files) = 'object')
);

-- Create site_versions table
CREATE TABLE IF NOT EXISTS public.site_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.generated_sites(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  files JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by_message_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  change_description TEXT,
  CONSTRAINT unique_site_version UNIQUE (site_id, version_number)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_generated_sites_user_id ON public.generated_sites(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_sites_created_at ON public.generated_sites(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_versions_site_id ON public.site_versions(site_id);

-- Enable RLS
ALTER TABLE public.generated_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own generated sites"
  ON public.generated_sites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own generated sites"
  ON public.generated_sites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generated sites"
  ON public.generated_sites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generated sites"
  ON public.generated_sites FOR DELETE
  USING (auth.uid() = user_id);

-- Version number function
CREATE OR REPLACE FUNCTION get_next_version_number(p_site_id UUID)
RETURNS INTEGER AS $$
DECLARE
  next_version INTEGER;
BEGIN
  SELECT COALESCE(MAX(version_number), 0) + 1
  INTO next_version
  FROM public.site_versions
  WHERE site_id = p_site_id;
  
  RETURN next_version;
END;
$$ LANGUAGE plpgsql;
```

### Step 4: Test Save Manually

After tables are created, test in browser console:

```javascript
const { createSite } = useGeneratedSites()
const testFiles = {
  'index.html': {
    name: 'index.html',
    path: 'index.html',
    content: '<html><body>Test</body></html>'
  }
}
const result = await createSite('Test Site', testFiles, undefined, 'Test')
console.log('Create result:', result)
```

**Expected:** Should return site object with `id`

### Step 5: Check Storage Bucket

For deployment to work, create the storage bucket:

```sql
-- Create deployed-sites bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('deployed-sites', 'deployed-sites', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'deployed-sites' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'deployed-sites');
```

## Common Error Messages

### "relation 'generated_sites' does not exist"
**Solution:** Run the table creation SQL above

### "permission denied for table generated_sites"
**Solution:** Check RLS policies are created

### "User not authenticated"
**Solution:** Log in to the application

### "Failed to create site"
**Solution:** Check browser console for detailed error

### "Failed to save site before deployment"
**Solution:** Fix the save issue first, then try deploy

## Quick Fix Checklist

- [ ] Run database migration or manual SQL
- [ ] Verify tables exist in Supabase
- [ ] Check user is logged in
- [ ] Test save button first
- [ ] Check browser console for errors
- [ ] Create storage bucket for deployment
- [ ] Verify RLS policies are active

## Still Not Working?

1. **Open browser DevTools (F12)**
2. **Go to Console tab**
3. **Click Save button**
4. **Copy all error messages**
5. **Check the error details**

The console will show exactly what's failing!

## Success Indicators

When working correctly, you should see:

```
💾 Saving website... { currentSiteId: null, fileCount: 2 }
Creating site with data: { user_id: "abc-123", title: "Website - ...", file_count: 2 }
Site created successfully: xyz-789
✅ New site created: xyz-789
```

Then in chat:
```
✅ Website "Website - 11/26/2024 (2 files)" saved successfully!
```
