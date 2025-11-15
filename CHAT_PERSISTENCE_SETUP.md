# Chat Persistence System

## Overview
The AI Generator now persists all chat conversations to the database, allowing users to save, load, and continue conversations across sessions.

## Database Schema

### Table: `chats`
```sql
- id (UUID, primary key)
- website_id (UUID, references websites)
- user_id (UUID, references auth.users)
- messages (JSONB) - Array of {role: 'user'|'assistant', content: string}
- title (TEXT) - Auto-generated from first message
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

### RLS Policies
- Users can only view/edit/delete their own chats
- Chats are scoped to both user_id and website_id

## API Endpoints

### GET `/api/hosting/chats`
**Query params:**
- `websiteId` (required)

**Returns:**
```json
{
  "success": true,
  "chats": [
    {
      "id": "uuid",
      "website_id": "uuid",
      "user_id": "uuid",
      "messages": [{"role": "user", "content": "..."}],
      "title": "Create a landing page...",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### POST `/api/hosting/chats`
**Body:**
```json
{
  "websiteId": "uuid",
  "messages": [{"role": "user", "content": "..."}],
  "title": "Optional title",
  "chatId": "uuid (optional, for updates)"
}
```

**Returns:**
```json
{
  "success": true,
  "chat": { /* chat object */ }
}
```

### DELETE `/api/hosting/chats/[id]`
**Returns:**
```json
{
  "success": true
}
```

## Frontend Features

### Chat History Selector
- Dropdown showing all saved chats for the current website
- Displays chat title or formatted date
- Select to load previous conversation

### Auto-Save
- Every message exchange is automatically saved to database
- New chats get a title from the first user message (first 50 chars)
- Existing chats are updated with new messages

### Chat Management
- **New button**: Start a fresh conversation
- **Delete button**: Remove current chat (with confirmation)
- **Dropdown**: Switch between saved conversations

### Workflow

1. **User selects website** → Loads all saved chats for that website
2. **User starts typing** → New chat is created
3. **User sends message** → Chat is saved with auto-generated title
4. **AI responds** → Chat is updated with AI response
5. **User continues** → All follow-up messages are appended to same chat
6. **User switches website** → Previous chats are loaded
7. **User selects old chat** → Full conversation history is restored

## Migration

Run the migration:
```bash
# Using Supabase CLI
supabase db push

# Or apply manually via Supabase Dashboard
# SQL Editor → paste contents of create_chats_table.sql
```

## Benefits

✅ **Conversation continuity** - Pick up where you left off
✅ **Context preservation** - AI sees full conversation history
✅ **Multi-website support** - Separate chats per website
✅ **Easy management** - Switch, delete, or start new chats
✅ **Auto-save** - Never lose your work
✅ **Organized history** - All chats listed with titles/dates

## Example Usage

1. User selects "Coffee Shop Website"
2. Starts new chat: "Create a landing page"
3. AI generates HTML → saved as "Create a landing page"
4. User continues: "Add a contact form"
5. AI updates HTML → conversation updated
6. User switches to "Portfolio Website"
7. Different set of chats loads
8. User returns to "Coffee Shop Website"
9. Previous chat is still there in dropdown
10. User selects it → full conversation restored
11. User continues: "Make it responsive"
12. AI has full context from previous messages
