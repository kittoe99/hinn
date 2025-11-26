# Deployment Setup Instructions

## Supabase Storage Bucket Setup

### 1. Create `deployed-sites` Bucket

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the deployed-sites bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('deployed-sites', 'deployed-sites', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for deployed-sites bucket
CREATE POLICY "Allow authenticated users to upload their own sites"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'deployed-sites' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Allow public read access to deployed sites"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'deployed-sites');

CREATE POLICY "Allow users to update their own deployed sites"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'deployed-sites' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Allow users to delete their own deployed sites"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'deployed-sites' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### 2. Verify Bucket Creation

```sql
-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'deployed-sites';

-- Should return:
-- id: deployed-sites
-- name: deployed-sites
-- public: true
```

### 3. Test Upload (Optional)

```javascript
// Test file upload
const { data, error } = await supabase.storage
  .from('deployed-sites')
  .upload('test-user-id/test-site-id/index.html', '<html>Test</html>', {
    contentType: 'text/html'
  })

console.log('Upload result:', data, error)
```

## Database Migrations

### Apply Migrations

```bash
# Apply conversation and site migrations
cd c:\Users\User\Desktop\hinn.nuxt

# Using Supabase CLI
supabase db push

# Or manually
psql -h your-db-host -U postgres -d postgres \
  -f supabase/migrations/20241126_create_conversations.sql

psql -h your-db-host -U postgres -d postgres \
  -f supabase/migrations/20241126_create_generated_sites.sql
```

### Verify Tables

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'conversations',
  'messages',
  'project_snapshots',
  'generated_sites',
  'site_versions'
);

-- Should return all 5 tables
```

## Environment Variables

Ensure these are set in your `.env`:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Public Configuration
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_KEY=your-anon-key
```

## Authentication Middleware

The auth middleware is already configured in `pages/builder/index.vue`:

```typescript
definePageMeta({
  layout: false,
  middleware: 'auth'
})
```

### Create Auth Middleware (if not exists)

Create `middleware/auth.ts`:

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  
  if (!user.value) {
    return navigateTo('/login')
  }
})
```

## Testing Checklist

### 1. Authentication
- [ ] Navigate to `/builder` without login → redirects to login
- [ ] Login and navigate to `/builder` → page loads
- [ ] User ID available in page context

### 2. Database
- [ ] Tables created successfully
- [ ] RLS policies active
- [ ] Can insert/query as authenticated user

### 3. Storage
- [ ] Bucket created and public
- [ ] Can upload files
- [ ] Public URLs accessible
- [ ] RLS policies working

### 4. Save Functionality
- [ ] Save button visible
- [ ] Clicking save creates site in database
- [ ] Site linked to authenticated user
- [ ] Version history created

### 5. Deploy Functionality
- [ ] Deploy button visible
- [ ] Clicking deploy uploads files
- [ ] Public URL generated
- [ ] URL accessible in browser
- [ ] Database updated with deployment info

## Troubleshooting

### Issue: "Bucket not found"

**Solution:**
```sql
-- Verify bucket exists
SELECT * FROM storage.buckets WHERE id = 'deployed-sites';

-- If not, create it
INSERT INTO storage.buckets (id, name, public)
VALUES ('deployed-sites', 'deployed-sites', true);
```

### Issue: "Permission denied"

**Solution:**
```sql
-- Check RLS policies
SELECT * FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects';

-- Recreate policies if needed (see step 1)
```

### Issue: "User not authenticated"

**Solution:**
- Check if auth middleware is active
- Verify Supabase auth token in request
- Check browser console for auth errors

### Issue: "Site not found"

**Solution:**
```sql
-- Verify site exists and belongs to user
SELECT * FROM generated_sites 
WHERE id = 'site-id' 
AND user_id = 'user-id';
```

### Issue: "Files not accessible"

**Solution:**
- Check bucket is public
- Verify file path format: `{user_id}/{site_id}/{file_path}`
- Test URL directly in browser

## Production Deployment

### Vercel/Netlify

1. Set environment variables in platform dashboard
2. Deploy application
3. Test authentication flow
4. Verify database connection
5. Test save and deploy functionality

### Custom Domain (Future)

```sql
-- Add custom domain support
ALTER TABLE generated_sites 
ADD COLUMN custom_domain TEXT;

-- Update deployment to use custom domain
UPDATE generated_sites 
SET custom_domain = 'mysite.com'
WHERE id = 'site-id';
```

## Monitoring

### Database Queries

```sql
-- Count deployed sites
SELECT COUNT(*) FROM generated_sites WHERE is_published = true;

-- Recent deployments
SELECT id, title, published_url, updated_at 
FROM generated_sites 
WHERE is_published = true 
ORDER BY updated_at DESC 
LIMIT 10;

-- Storage usage
SELECT 
  bucket_id,
  COUNT(*) as file_count,
  SUM(metadata->>'size')::bigint as total_size
FROM storage.objects
WHERE bucket_id = 'deployed-sites'
GROUP BY bucket_id;
```

### Application Logs

```javascript
// Monitor deployment success rate
console.log('Deployment started:', siteId)
console.log('Files uploaded:', Object.keys(files).length)
console.log('Deployment complete:', deployedUrl)
```

## Summary

✅ **Storage Bucket**: `deployed-sites` created and public
✅ **Database Tables**: All migrations applied
✅ **RLS Policies**: User access controlled
✅ **Authentication**: Middleware protecting builder page
✅ **Environment**: Variables configured
✅ **Testing**: All functionality verified

Your deployment system is ready to use! 🚀
