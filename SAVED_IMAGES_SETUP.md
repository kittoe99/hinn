# Saved Canvas Images Setup Guide

## Overview
This feature allows users to save their selected canvas images to Supabase Storage and manage them in the editor.

## Database Setup

### 1. Run the Migration
Apply the migration to create the storage bucket and database table:

```bash
# If using Supabase CLI
supabase db push

# Or apply manually in Supabase Dashboard SQL Editor
# Run the contents of: supabase/migrations/20250126_create_saved_images_storage.sql
```

### 2. What Gets Created

**Storage Bucket:**
- Name: `saved-canvas-images`
- Public: Yes (for easy image access)
- File size limit: 10MB
- Allowed types: PNG, JPEG, JPG, WEBP

**Database Table: `saved_canvas_images`**
- `id` - UUID primary key
- `user_id` - References auth.users
- `storage_path` - Path in storage bucket
- `original_prompt` - The initial generation prompt
- `modification_prompt` - Any refinement prompts used
- `image_url` - Public URL to the image
- `thumbnail_url` - Optional thumbnail URL
- `is_variation` - Boolean flag for variations
- `created_at` - Timestamp
- `updated_at` - Timestamp

**RLS Policies:**
- Users can only view, insert, and delete their own images
- Automatic folder structure: `{user_id}/{timestamp}-{index}.png`

## Features Implemented

### In Editor Page (`canvas-printing.vue`)

1. **Save All Photos Button**
   - Located in "Your Selection" section header
   - Saves all currently selected images to Supabase
   - Shows loading state while saving
   - Requires authentication

2. **Saved Images Gallery**
   - Displays all user's permanently saved images
   - Shows count badge
   - Grid layout (responsive: 2-5 columns)

3. **Image Actions**
   - **Download**: Download any saved image
   - **Delete**: Remove image from storage and database
   - Hover overlay with action buttons

## API Endpoints

### POST `/api/canvas/save-images`
Saves multiple images to storage and database.

**Request:**
```json
{
  "images": [
    {
      "src": "data:image/png;base64,...",
      "label": "Image label",
      "modificationPrompt": "Optional prompt",
      "isVariation": false
    }
  ],
  "originalPrompt": "The original generation prompt"
}
```

**Response:**
```json
{
  "success": true,
  "savedCount": 3,
  "images": [...]
}
```

### GET `/api/canvas/saved-images`
Fetches all saved images for the authenticated user.

**Response:**
```json
{
  "success": true,
  "images": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "image_url": "https://...",
      "original_prompt": "...",
      "created_at": "..."
    }
  ]
}
```

### DELETE `/api/canvas/delete-image?id={imageId}`
Deletes an image from both storage and database.

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

## Authentication Required

All endpoints require authentication via Bearer token:
```
Authorization: Bearer {access_token}
```

The token is automatically retrieved from the Supabase session.

## Usage Flow

1. User generates images on canvas-printing page
2. User selects desired images
3. User clicks "Save All Photos" button
4. Images are uploaded to Supabase Storage
5. Metadata is saved to database
6. Saved images appear in "Saved Images" gallery
7. User can download or delete saved images anytime

## Storage Structure

```
saved-canvas-images/
  └── {user_id}/
      ├── 1234567890-0.png
      ├── 1234567890-1.png
      └── 1234567891-0.png
```

## Notes

- Images are stored as PNG format
- Each image gets a unique timestamp-based filename
- RLS ensures users can only access their own images
- Public bucket allows direct image URLs without signed URLs
- Automatic cleanup when user deletes account (CASCADE)
