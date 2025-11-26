-- Create generated_sites table to store user's generated websites
CREATE TABLE IF NOT EXISTS public.generated_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  files JSONB NOT NULL DEFAULT '{}'::jsonb,
  preview_image TEXT, -- URL to screenshot/preview image
  is_published BOOLEAN DEFAULT FALSE,
  published_url TEXT, -- URL if deployed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Constraints
  CONSTRAINT valid_files CHECK (jsonb_typeof(files) = 'object')
);

-- Create site_versions table for version history
CREATE TABLE IF NOT EXISTS public.site_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.generated_sites(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  files JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by_message_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  change_description TEXT,
  
  -- Ensure unique version numbers per site
  CONSTRAINT unique_site_version UNIQUE (site_id, version_number)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_generated_sites_user_id ON public.generated_sites(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_sites_conversation_id ON public.generated_sites(conversation_id);
CREATE INDEX IF NOT EXISTS idx_generated_sites_created_at ON public.generated_sites(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generated_sites_updated_at ON public.generated_sites(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_versions_site_id ON public.site_versions(site_id);
CREATE INDEX IF NOT EXISTS idx_site_versions_version_number ON public.site_versions(site_id, version_number DESC);

-- Enable Row Level Security
ALTER TABLE public.generated_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for generated_sites
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

-- RLS Policies for site_versions
CREATE POLICY "Users can view versions of their sites"
  ON public.site_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.generated_sites
      WHERE generated_sites.id = site_versions.site_id
      AND generated_sites.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create versions of their sites"
  ON public.site_versions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.generated_sites
      WHERE generated_sites.id = site_versions.site_id
      AND generated_sites.user_id = auth.uid()
    )
  );

-- Function to update site updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.generated_sites
  SET updated_at = NOW()
  WHERE id = NEW.site_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update site timestamp when versions are added
CREATE TRIGGER update_site_on_version
  AFTER INSERT ON public.site_versions
  FOR EACH ROW
  EXECUTE FUNCTION update_site_timestamp();

-- Function to auto-increment version numbers
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
