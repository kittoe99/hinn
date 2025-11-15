-- Migration: Create chats table for AI conversation tracking
-- Created: 2025-01-15
-- Description: Stores AI chat conversations associated with websites for the hosting AI generator

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

-- Add RLS policies
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own chats
DROP POLICY IF EXISTS "Users can view their own chats" ON chats;
CREATE POLICY "Users can view their own chats"
  ON chats
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own chats
DROP POLICY IF EXISTS "Users can insert their own chats" ON chats;
CREATE POLICY "Users can insert their own chats"
  ON chats
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own chats
DROP POLICY IF EXISTS "Users can update their own chats" ON chats;
CREATE POLICY "Users can update their own chats"
  ON chats
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own chats
DROP POLICY IF EXISTS "Users can delete their own chats" ON chats;
CREATE POLICY "Users can delete their own chats"
  ON chats
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add comments
COMMENT ON TABLE chats IS 'Stores AI chat conversations associated with websites for the hosting AI generator';
COMMENT ON COLUMN chats.messages IS 'Array of chat messages in format: [{"role": "user|assistant", "content": "..."}]';
COMMENT ON COLUMN chats.title IS 'Optional title for the chat, can be auto-generated from first message';
COMMENT ON COLUMN chats.website_id IS 'Reference to the website this chat is associated with';
COMMENT ON COLUMN chats.user_id IS 'Reference to the user who owns this chat';
