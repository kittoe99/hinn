# Canvas Printing Authentication Setup

## Overview
The canvas-printing page now requires authentication to track which images belong to which user. All generated and saved images are associated with the logged-in user's account.

## Authentication Implementation

### **1. Page Protection**
```typescript
definePageMeta({
  middleware: 'auth'
})
```
- Uses existing `auth.ts` middleware
- Automatically redirects unauthenticated users to `/login`
- Runs on client-side to check Supabase session

### **2. User State Management**
```typescript
const supabase = useSupabaseClient()
const user = useSupabaseUser()

watchEffect(() => {
  if (process.client && user.value === null) {
    navigateTo('/login')
  }
})
```
- Tracks current authenticated user
- Real-time session monitoring
- Automatic redirect on logout

### **3. User Profile Bar**
Added at the top of the page:
- **Back to Dashboard** link (left)
- **User email display** (right, hidden on mobile)
- **User avatar icon** (accent color)

## Database Integration

### **Image Ownership Tracking**

All saved images in the `saved_canvas_images` table include:
```sql
user_id UUID REFERENCES auth.users(id)
```

### **Row Level Security (RLS)**
Already configured in migration:
- Users can only view their own images
- Users can only insert their own images
- Users can only delete their own images

## API Endpoints

All canvas API endpoints already check authentication:

### **POST `/api/canvas/save-images`**
```typescript
const { data: session } = await supabase.auth.getSession()
const token = session?.session?.access_token

await $fetch('/api/canvas/save-images', {
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: {
    images: [...],
    originalPrompt: '...'
  }
})
```

### **GET `/api/canvas/saved-images`**
- Fetches only images belonging to authenticated user
- Filtered by `user_id` in database query

### **DELETE `/api/canvas/delete-image`**
- Only allows deletion of user's own images
- RLS policies enforce ownership

## User Flow

### **1. Access Canvas Printing**
```
User visits /canvas-printing
  ↓
Middleware checks authentication
  ↓
If not logged in → Redirect to /login
  ↓
If logged in → Show canvas page
```

### **2. Generate Images**
```
User generates images with AI
  ↓
Images displayed (not yet saved)
  ↓
User selects images to keep
  ↓
Clicks "Save All Photos" or "Save Image"
  ↓
Images saved to database with user_id
```

### **3. View Saved Images**
```
Dashboard → Gallery Tab
  ↓
Fetches images WHERE user_id = current_user
  ↓
Displays only user's images
```

## Security Features

### **✅ Authentication Required**
- Cannot access page without login
- Session checked on every page load

### **✅ User Isolation**
- Each user only sees their own images
- Database-level security with RLS

### **✅ Token-Based API**
- All API calls require Bearer token
- Token validated on server

### **✅ Automatic Session Management**
- Supabase handles session refresh
- Logout redirects to login page

## Testing Authentication

### **Test Scenarios:**

1. **Not Logged In**
   - Visit `/canvas-printing`
   - Should redirect to `/login`

2. **Logged In**
   - Login first
   - Visit `/canvas-printing`
   - Should see user email in header
   - Can generate and save images

3. **Multiple Users**
   - Login as User A, save images
   - Logout, login as User B
   - User B should NOT see User A's images
   - Each user has isolated gallery

4. **Session Expiry**
   - If session expires while on page
   - Should redirect to login
   - Can login again and continue

## Benefits

✅ **User Tracking** - Know who created each image
✅ **Data Privacy** - Users can't see others' images
✅ **Personalization** - Each user has their own gallery
✅ **Analytics** - Track usage per user
✅ **Billing** - Can implement usage-based pricing
✅ **Security** - Prevent unauthorized access

## Next Steps (Optional)

Consider adding:
- Usage limits per user (e.g., 50 images/month)
- User profile page with stats
- Sharing functionality (make images public)
- Team/organization accounts
- Image tagging and organization
