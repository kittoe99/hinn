-- Ensure websites table has proper columns for file uploads
-- This migration ensures uploaded_logo and uploaded_assets columns exist with correct types

-- Add uploaded_logo column if it doesn't exist (stores public URL as TEXT)
ALTER TABLE websites 
ADD COLUMN IF NOT EXISTS uploaded_logo TEXT;

-- Add uploaded_assets column if it doesn't exist (stores array of file metadata as JSONB)
ALTER TABLE websites 
ADD COLUMN IF NOT EXISTS uploaded_assets JSONB DEFAULT '[]'::jsonb;

-- Add comment to document the structure
COMMENT ON COLUMN websites.uploaded_logo IS 'Public URL of the uploaded logo file stored in Supabase Storage (e.g., https://project.supabase.co/storage/v1/object/public/website-assets/user_id/website_id/logo.png)';

COMMENT ON COLUMN websites.uploaded_assets IS 'Array of uploaded asset files with metadata. Structure: [{name: string, url: string, size: number}]. URLs point to files in Supabase Storage.';

-- Create index for faster queries on websites with logos
CREATE INDEX IF NOT EXISTS idx_websites_uploaded_logo ON websites(uploaded_logo) WHERE uploaded_logo IS NOT NULL;

-- Create GIN index for JSONB uploaded_assets for efficient queries
CREATE INDEX IF NOT EXISTS idx_websites_uploaded_assets ON websites USING GIN (uploaded_assets);
