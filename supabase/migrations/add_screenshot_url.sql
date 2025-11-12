-- Add screenshot_url field to websites table
ALTER TABLE websites 
ADD COLUMN IF NOT EXISTS screenshot_url TEXT;

-- Add comment
COMMENT ON COLUMN websites.screenshot_url IS 'URL to the cached screenshot in Supabase storage';
