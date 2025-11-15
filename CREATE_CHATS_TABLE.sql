-- ============================================
-- Quick Copy-Paste: Create Chats Table
-- ============================================
-- Copy this entire file and paste into Supabase SQL Editor
-- Then click "Run" to create the chats table

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chats_website_id ON chats(website_id);
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);
CREATE INDEX IF NOT EXISTS idx_chats_created_at ON chats(created_at DESC);

-- Enable Row Level Security
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean re-run)
DROP POLICY IF EXISTS "Users can view their own chats" ON chats;
DROP POLICY IF EXISTS "Users can insert their own chats" ON chats;
DROP POLICY IF EXISTS "Users can update their own chats" ON chats;
DROP POLICY IF EXISTS "Users can delete their own chats" ON chats;

-- Policy: Users can view their own chats
CREATE POLICY "Users can view their own chats"
  ON chats
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own chats
CREATE POLICY "Users can insert their own chats"
  ON chats
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own chats
CREATE POLICY "Users can update their own chats"
  ON chats
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own chats
CREATE POLICY "Users can delete their own chats"
  ON chats
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add helpful comments
COMMENT ON TABLE chats IS 'Stores AI chat conversations associated with websites for the hosting AI generator';
COMMENT ON COLUMN chats.messages IS 'Array of chat messages in format: [{"role": "user|assistant", "content": "..."}]';
COMMENT ON COLUMN chats.title IS 'Optional title for the chat, can be auto-generated from first message';

-- ============================================
-- Verification Query (run after creation)
-- ============================================
-- Uncomment and run to verify table was created successfully:

-- SELECT 
--   'Table exists' as check_type,
--   EXISTS (
--     SELECT 1 FROM information_schema.tables 
--     WHERE table_name = 'chats'
--   ) as result;

-- SELECT 
--   'RLS enabled' as check_type,
--   rowsecurity as result
-- FROM pg_tables 
-- WHERE tablename = 'chats';

-- SELECT 
--   'Policies count' as check_type,
--   COUNT(*) as result
-- FROM pg_policies 
-- WHERE tablename = 'chats';
