-- Create storage bucket for saved canvas images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'saved-canvas-images',
  'saved-canvas-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the bucket
CREATE POLICY "Users can upload their own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'saved-canvas-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'saved-canvas-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'saved-canvas-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create table to track saved images metadata
CREATE TABLE IF NOT EXISTS saved_canvas_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  original_prompt TEXT,
  modification_prompt TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_variation BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on the table
ALTER TABLE saved_canvas_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for saved_canvas_images table
CREATE POLICY "Users can view their own saved images"
ON saved_canvas_images FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved images"
ON saved_canvas_images FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved images"
ON saved_canvas_images FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_saved_canvas_images_user_id ON saved_canvas_images(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_canvas_images_created_at ON saved_canvas_images(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_saved_canvas_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_saved_canvas_images_updated_at
BEFORE UPDATE ON saved_canvas_images
FOR EACH ROW
EXECUTE FUNCTION update_saved_canvas_images_updated_at();
