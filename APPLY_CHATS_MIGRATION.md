# Apply Chats Table Migration

## Overview
The `chats` table tracks AI conversations for each website in the hosting AI generator.

---

## Table Schema

```sql
CREATE TABLE chats (
  id UUID PRIMARY KEY,
  website_id UUID NOT NULL,  -- References websites(id)
  user_id UUID NOT NULL,     -- References auth.users(id)
  messages JSONB NOT NULL,   -- Array of chat messages
  title TEXT,                -- Optional chat title
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### Example Messages Format
```json
[
  {
    "role": "user",
    "content": "Create a landing page for a coffee shop"
  },
  {
    "role": "assistant",
    "content": "I'll create a beautiful landing page for you..."
  }
]
```

---

## How to Apply Migration

### Option 1: Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Copy Migration SQL**
   - Open: `supabase/migrations/20250115000000_create_chats_table.sql`
   - Copy entire contents

4. **Paste and Run**
   - Paste SQL into editor
   - Click "Run" button
   - Wait for success message

5. **Verify Table Created**
   - Go to "Table Editor"
   - Look for `chats` table
   - Should see columns: id, website_id, user_id, messages, title, created_at, updated_at

### Option 2: Supabase CLI

If you have Supabase CLI installed:

```bash
# Navigate to project directory
cd c:\Users\User\Desktop\hinn.nuxt

# Link to your Supabase project (if not already linked)
supabase link --project-ref your-project-ref

# Apply migration
supabase db push

# Or apply specific migration
supabase migration up
```

### Option 3: Direct SQL (Quick)

Copy and paste this into Supabase SQL Editor:

```sql
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

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_chats_website_id ON chats(website_id);
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);
CREATE INDEX IF NOT EXISTS idx_chats_created_at ON chats(created_at DESC);

-- Enable RLS
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own chats"
  ON chats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chats"
  ON chats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chats"
  ON chats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chats"
  ON chats FOR DELETE
  USING (auth.uid() = user_id);
```

---

## Verify Migration

After applying, verify the table exists:

```sql
-- Check table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'chats';

-- Check columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'chats';

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'chats';

-- Check policies exist
SELECT policyname 
FROM pg_policies 
WHERE tablename = 'chats';
```

Expected results:
- ✅ Table `chats` exists
- ✅ 7 columns (id, website_id, user_id, messages, title, created_at, updated_at)
- ✅ RLS enabled (rowsecurity = true)
- ✅ 4 policies (view, insert, update, delete)

---

## API Endpoints Already Created

The following endpoints are ready to use once the table is created:

### 1. List Chats
```
GET /api/hosting/chats?websiteId={uuid}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "chats": [
    {
      "id": "uuid",
      "website_id": "uuid",
      "messages": [...],
      "title": "Chat title",
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:30:00Z"
    }
  ]
}
```

### 2. Create/Update Chat
```
POST /api/hosting/chats
Authorization: Bearer {token}
Body: {
  "chatId": "uuid",  // Optional, for updates
  "websiteId": "uuid",
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ],
  "title": "Optional title"
}

Response:
{
  "success": true,
  "chatId": "uuid"
}
```

### 3. Delete Chat
```
DELETE /api/hosting/chats/{id}
Authorization: Bearer {token}

Response:
{
  "success": true
}
```

---

## Frontend Integration

The frontend (`pages/hosting.vue`) already has chat persistence implemented:

### Features
- ✅ Auto-save conversations to database
- ✅ Load previous chats from dropdown
- ✅ Switch between chats
- ✅ Delete chats
- ✅ Chat history per website
- ✅ Context preservation across sessions

### State Management
```typescript
const currentChatId = ref<string>('')
const savedChats = ref<Array>([])
const chatMessages = ref<Array>([])
```

### Key Functions
- `loadSavedChats()` - Fetch all chats for website
- `saveChatToDatabase()` - Save current chat
- `loadChatFromHistory()` - Load selected chat
- `deleteCurrentChat()` - Delete active chat
- `startNewChat()` - Start fresh conversation

---

## Testing After Migration

### Test 1: Create Chat
1. Open hosting page
2. Select a website
3. Send message to AI
4. Check Supabase dashboard → chats table
5. Should see new record with messages

### Test 2: Load Chat
1. Refresh page
2. Select same website
3. Click chat history dropdown
4. Should see saved chat
5. Click to load
6. Messages should appear

### Test 3: Continue Chat
1. Load existing chat
2. Send new message
3. Check database
4. Messages array should be updated

### Test 4: Delete Chat
1. Load a chat
2. Click delete button
3. Confirm deletion
4. Check database
5. Record should be deleted

---

## Rollback (If Needed)

If you need to remove the table:

```sql
-- Drop policies first
DROP POLICY IF EXISTS "Users can view their own chats" ON chats;
DROP POLICY IF EXISTS "Users can insert their own chats" ON chats;
DROP POLICY IF EXISTS "Users can update their own chats" ON chats;
DROP POLICY IF EXISTS "Users can delete their own chats" ON chats;

-- Drop indexes
DROP INDEX IF EXISTS idx_chats_website_id;
DROP INDEX IF EXISTS idx_chats_user_id;
DROP INDEX IF EXISTS idx_chats_created_at;

-- Drop table
DROP TABLE IF EXISTS chats;
```

---

## Benefits

✅ **Persistent conversations** - Never lose chat history
✅ **Multi-session support** - Continue editing across sessions
✅ **Per-website tracking** - Separate chats for each website
✅ **User isolation** - RLS ensures users only see their chats
✅ **Context preservation** - AI remembers previous changes
✅ **Chat management** - Create, load, delete conversations

---

## Summary

1. **Migration file ready**: `supabase/migrations/20250115000000_create_chats_table.sql`
2. **Apply via**: Supabase Dashboard SQL Editor (easiest)
3. **API endpoints**: Already implemented and ready
4. **Frontend**: Already integrated with chat persistence
5. **Test**: Send messages and verify in database

Apply the migration and your AI chat persistence will be fully functional!
