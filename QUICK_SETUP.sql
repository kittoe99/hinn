-- ============================================
-- QUICK SETUP: Copy and paste this entire file into Supabase SQL Editor
-- ============================================

-- 1. CREATE TABLES
-- ============================================

-- Create generated_sites table
CREATE TABLE IF NOT EXISTS public.generated_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID,
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
  created_by_message_id UUID,
  change_description TEXT,
  CONSTRAINT unique_site_version UNIQUE (site_id, version_number)
);

-- 2. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_generated_sites_user_id ON public.generated_sites(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_sites_created_at ON public.generated_sites(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generated_sites_updated_at ON public.generated_sites(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_versions_site_id ON public.site_versions(site_id);
CREATE INDEX IF NOT EXISTS idx_site_versions_version_number ON public.site_versions(site_id, version_number DESC);

-- 3. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.generated_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_versions ENABLE ROW LEVEL SECURITY;

-- 4. CREATE RLS POLICIES FOR GENERATED_SITES
-- ============================================

DROP POLICY IF EXISTS "Users can view their own generated sites" ON public.generated_sites;
CREATE POLICY "Users can view their own generated sites"
  ON public.generated_sites FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own generated sites" ON public.generated_sites;
CREATE POLICY "Users can create their own generated sites"
  ON public.generated_sites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own generated sites" ON public.generated_sites;
CREATE POLICY "Users can update their own generated sites"
  ON public.generated_sites FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own generated sites" ON public.generated_sites;
CREATE POLICY "Users can delete their own generated sites"
  ON public.generated_sites FOR DELETE
  USING (auth.uid() = user_id);

-- 5. CREATE RLS POLICIES FOR SITE_VERSIONS
-- ============================================

DROP POLICY IF EXISTS "Users can view versions of their sites" ON public.site_versions;
CREATE POLICY "Users can view versions of their sites"
  ON public.site_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.generated_sites
      WHERE generated_sites.id = site_versions.site_id
      AND generated_sites.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create versions of their sites" ON public.site_versions;
CREATE POLICY "Users can create versions of their sites"
  ON public.site_versions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.generated_sites
      WHERE generated_sites.id = site_versions.site_id
      AND generated_sites.user_id = auth.uid()
    )
  );

-- 6. CREATE HELPER FUNCTIONS
-- ============================================

-- Function to get next version number
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

-- 7. CREATE STORAGE BUCKET
-- ============================================

-- Create deployed-sites bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('deployed-sites', 'deployed-sites', true)
ON CONFLICT (id) DO NOTHING;

-- 8. CREATE STORAGE POLICIES
-- ============================================

DROP POLICY IF EXISTS "Allow authenticated users to upload their own sites" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload their own sites"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'deployed-sites' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Allow public read access to deployed sites" ON storage.objects;
CREATE POLICY "Allow public read access to deployed sites"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'deployed-sites');

DROP POLICY IF EXISTS "Allow users to update their own deployed sites" ON storage.objects;
CREATE POLICY "Allow users to update their own deployed sites"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'deployed-sites' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Allow users to delete their own deployed sites" ON storage.objects;
CREATE POLICY "Allow users to delete their own deployed sites"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'deployed-sites' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================
-- SETUP COMPLETE!
-- ============================================

-- Verify tables were created
SELECT 
  'Tables created:' as status,
  COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('generated_sites', 'site_versions');

-- Verify bucket was created
SELECT 
  'Storage bucket created:' as status,
  id,
  name,
  public
FROM storage.buckets 
WHERE id = 'deployed-sites';

-- Show success message
SELECT '✅ Setup complete! You can now save and deploy websites.' as message;
