# Website Storage Bucket Setup

## ✅ Completed Steps

1. **Storage Bucket Created**: `website`
   - Private bucket (not publicly accessible)
   - 50MB file size limit per file
   - Allowed file types: HTML, CSS, JS, JSON, images, fonts

2. **Database Schema Updated**:
   - Added `storage_path` column to `websites` table
   - Automatically generates path from website ID
   - Indexed for better performance

## 🔧 Manual Step Required: Storage Policies

You need to add storage policies via the Supabase Dashboard:

### Go to Supabase Dashboard:
1. Visit: https://supabase.com/dashboard/project/mjgwoukwyqwoectxfwqv/storage/policies
2. Select the **"website"** bucket
3. Click **"New Policy"**

### Policy 1: Upload Files
```sql
-- Name: Users can upload to their website folders
-- Operation: INSERT
-- Policy:

bucket_id = 'website' 
AND (storage.foldername(name))[1] IN (
  SELECT id::text 
  FROM websites 
  WHERE user_id = auth.uid()
)
```

### Policy 2: View Files
```sql
-- Name: Users can view their website files
-- Operation: SELECT
-- Policy:

bucket_id = 'website' 
AND (storage.foldername(name))[1] IN (
  SELECT id::text 
  FROM websites 
  WHERE user_id = auth.uid()
)
```

### Policy 3: Update Files
```sql
-- Name: Users can update their website files
-- Operation: UPDATE
-- Policy (both USING and WITH CHECK):

bucket_id = 'website' 
AND (storage.foldername(name))[1] IN (
  SELECT id::text 
  FROM websites 
  WHERE user_id = auth.uid()
)
```

### Policy 4: Delete Files
```sql
-- Name: Users can delete their website files
-- Operation: DELETE
-- Policy:

bucket_id = 'website' 
AND (storage.foldername(name))[1] IN (
  SELECT id::text 
  FROM websites 
  WHERE user_id = auth.uid()
)
```

## 📁 Storage Structure

Files will be organized by website ID:
```
website/
├── {website-id-1}/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/
│       ├── logo.png
│       └── hero.jpg
├── {website-id-2}/
│   ├── index.html
│   └── ...
```

## 🔐 Security

- ✅ Users can only access files in folders matching their website IDs
- ✅ Private bucket (not publicly accessible by URL)
- ✅ Row Level Security enforced
- ✅ File size limit: 50MB per file
- ✅ Only allowed file types can be uploaded

## 💻 Usage in Code

### Upload a file:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(supabaseUrl, supabaseKey)

// Upload file to website folder
const { data, error } = await supabase.storage
  .from('website')
  .upload(`${websiteId}/index.html`, file, {
    contentType: 'text/html',
    upsert: true
  })
```

### Download a file:
```javascript
// Get file URL (requires authentication)
const { data } = await supabase.storage
  .from('website')
  .download(`${websiteId}/index.html`)
```

### List files in website folder:
```javascript
const { data, error } = await supabase.storage
  .from('website')
  .list(websiteId)
```

### Delete a file:
```javascript
const { error } = await supabase.storage
  .from('website')
  .remove([`${websiteId}/index.html`])
```

## 🎯 Next Steps

1. Add storage policies via Supabase Dashboard (see above)
2. Create API endpoints for file upload/download
3. Integrate with builder page for code generation
4. Add file management UI to dashboard

## 📊 Database Schema

The `websites` table now includes:
- `storage_path` (text, generated): Automatically set to website ID
- Used to organize files in storage bucket
- Indexed for fast lookups

Example query:
```sql
SELECT id, name, storage_path 
FROM websites 
WHERE user_id = auth.uid();
```
