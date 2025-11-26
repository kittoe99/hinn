# Run Database Migration for Saved Images

## The Problem
The `saved_canvas_images` table and storage bucket exist in the migration file but haven't been applied to your Supabase database yet.

## Migration File Location
`supabase/migrations/20250126_create_saved_images_storage.sql`

## What This Migration Creates

### 1. Storage Bucket: `saved-canvas-images`
- Public bucket for storing image files
- 10MB file size limit
- Allowed types: PNG, JPEG, JPG, WEBP
- RLS policies for user-specific access

### 2. Database Table: `saved_canvas_images`
```sql
CREATE TABLE saved_canvas_images (
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
```

### 3. RLS Policies
- Users can only view their own images
- Users can only insert their own images
- Users can only delete their own images

### 4. Indexes
- `idx_saved_canvas_images_user_id` - Fast user lookups
- `idx_saved_canvas_images_created_at` - Fast date sorting

## How to Apply the Migration

### Option 1: Using Supabase CLI (Recommended)
```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

### Option 2: Using Supabase Dashboard (Manual)
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Copy the entire contents of `supabase/migrations/20250126_create_saved_images_storage.sql`
5. Paste into the SQL editor
6. Click **Run**

### Option 3: Using Supabase Studio
1. Open your project in Supabase Studio
2. Navigate to **Database** → **Migrations**
3. Upload the migration file
4. Apply the migration

## Verify Migration Success

After running the migration, verify it worked:

### Check Storage Bucket
```sql
SELECT * FROM storage.buckets WHERE id = 'saved-canvas-images';
```

### Check Table Exists
```sql
SELECT * FROM information_schema.tables 
WHERE table_name = 'saved_canvas_images';
```

### Check RLS Policies
```sql
SELECT * FROM pg_policies 
WHERE tablename = 'saved_canvas_images';
```

## After Migration

Once the migration is applied:
1. ✅ The storage bucket will be ready
2. ✅ The table will be created with all columns
3. ✅ RLS policies will protect user data
4. ✅ The canvas-printing page will be able to save images
5. ✅ The dashboard gallery will display saved images

## Troubleshooting

### Error: "relation 'saved_canvas_images' does not exist"
**Solution:** The migration hasn't been run yet. Follow one of the options above.

### Error: "bucket 'saved-canvas-images' does not exist"
**Solution:** The storage bucket wasn't created. Run the migration again.

### Error: "permission denied for table saved_canvas_images"
**Solution:** RLS policies aren't set up correctly. Check that the migration ran completely.

### Images not showing in dashboard
**Checklist:**
1. ✅ Migration has been run
2. ✅ User is authenticated
3. ✅ Images have been saved (check the table directly)
4. ✅ Supabase env vars are set correctly
5. ✅ Browser console shows no errors

## Current Implementation Status

The code is **already configured** to use this table:

### API Endpoints
- ✅ `POST /api/canvas/save-images` - Saves images to storage and table
- ✅ `GET /api/canvas/saved-images` - Fetches user's saved images
- ✅ `DELETE /api/canvas/delete-image` - Deletes image from storage and table

### Frontend Integration
- ✅ Canvas-printing page has "Save Image" button
- ✅ Dashboard has "Gallery" tab to view saved images
- ✅ Image detail modal with download and delete

**Everything is ready - you just need to run the migration!** 🚀
