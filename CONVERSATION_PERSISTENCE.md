# Conversation Persistence & Context Tracking

## Overview
Implemented full conversation persistence and context tracking for the builder chatbot using Supabase. The chatbot now maintains conversation history across sessions and provides context-aware responses.

## Database Schema

### Tables Created

#### 1. **conversations**
Stores conversation metadata and tracks chat sessions.

```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key to auth.users)
- title: TEXT (Auto-generated from first message)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ (Auto-updated on new messages)
- metadata: JSONB (For extensibility)
```

#### 2. **messages**
Stores individual chat messages within conversations.

```sql
- id: UUID (Primary Key)
- conversation_id: UUID (Foreign Key to conversations)
- role: TEXT ('user' | 'assistant' | 'system')
- content: TEXT
- created_at: TIMESTAMPTZ
- metadata: JSONB (For additional data like agent logs)
```

#### 3. **project_snapshots**
Stores file states at different points in the conversation.

```sql
- id: UUID (Primary Key)
- conversation_id: UUID (Foreign Key to conversations)
- message_id: UUID (Optional link to specific message)
- files: JSONB (Complete FileMap state)
- created_at: TIMESTAMPTZ
```

### Security

**Row Level Security (RLS)** enabled on all tables:
- Users can only access their own conversations
- Users can only create/read/update/delete their own data
- Cascade deletes ensure data integrity

### Indexes

Optimized for common queries:
- `idx_conversations_user_id`: Fast user conversation lookups
- `idx_conversations_updated_at`: Sorted by recent activity
- `idx_messages_conversation_id`: Fast message retrieval
- `idx_project_snapshots_conversation_id`: Fast snapshot access

## Composable: `useConversations`

### Functions

#### **createConversation(title, metadata?)**
Creates a new conversation for the current user.

```typescript
const conversation = await createConversation('Landing Page Design')
```

#### **getConversations()**
Retrieves all conversations for the current user, sorted by most recent.

```typescript
const conversations = await getConversations()
```

#### **getConversation(conversationId)**
Loads a specific conversation with all its messages.

```typescript
const conversation = await getConversation(conversationId)
```

#### **addMessage(conversationId, role, content, metadata?)**
Adds a message to a conversation.

```typescript
await addMessage(conversationId, 'user', 'Make the header sticky')
```

#### **saveProjectSnapshot(conversationId, files, messageId?)**
Saves the current project state.

```typescript
await saveProjectSnapshot(conversationId, files)
```

#### **getLatestSnapshot(conversationId)**
Retrieves the most recent project snapshot.

```typescript
const snapshot = await getLatestSnapshot(conversationId)
```

#### **updateConversationTitle(conversationId, title)**
Updates the conversation title.

```typescript
await updateConversationTitle(conversationId, 'New Title')
```

#### **deleteConversation(conversationId)**
Deletes a conversation and all associated data.

```typescript
await deleteConversation(conversationId)
```

#### **generateTitle(firstMessage)**
Generates a smart title from the first user message.

```typescript
const title = generateTitle('Create a landing page for my startup')
// Returns: "Create a landing page for my startup"
```

## Frontend Integration

### State Management

```typescript
// Conversation tracking
const currentConversationId = ref<string | null>(null)
const conversations = ref<Array<any>>([])
const showConversationList = ref(false)
```

### Workflow

#### **Starting a New Conversation**
1. User sends first message
2. Auto-create conversation with generated title
3. Save user message to database
4. Process AI response
5. Save assistant message to database
6. Save project snapshot after generation

#### **Loading an Existing Conversation**
1. User clicks on conversation from history
2. Load all messages into chat
3. Load latest project snapshot
4. Restore files and preview
5. Continue conversation with full context

#### **Saving Messages**
Every message is automatically saved:
```typescript
// User message
if (currentConversationId.value) {
  await addMessage(currentConversationId.value, 'user', userPrompt)
}

// Assistant message
if (currentConversationId.value) {
  await addMessage(currentConversationId.value, 'assistant', response)
}
```

#### **Saving Project State**
After each generation:
```typescript
if (currentConversationId.value && Object.keys(files.value).length > 0) {
  await saveProjectSnapshot(currentConversationId.value, files.value)
}
```

### UI Components

#### **Conversation History Button**
Located in sidebar header:
- Clock icon button
- Opens conversation list modal
- Desktop only (hidden on mobile)

#### **Conversation List Modal**
Full-screen overlay showing:
- All user conversations
- Sorted by most recent
- Conversation title and date
- Active conversation highlighted
- Click to load conversation

```vue
<button
  v-for="conv in conversations"
  :key="conv.id"
  @click="loadConversation(conv.id)"
  :class="[
    'w-full text-left p-3 rounded-lg border',
    currentConversationId === conv.id 
      ? 'border-[#d97759] bg-[#d97759]/5' 
      : 'border-neutral-200 hover:bg-neutral-50'
  ]"
>
  <div class="font-medium text-sm">{{ conv.title }}</div>
  <div class="text-xs text-neutral-500">{{ conv.updated_at }}</div>
</button>
```

## Context Awareness

### How Context is Maintained

1. **Message History**: All previous messages are stored and loaded
2. **Project State**: File snapshots preserve the exact state at each point
3. **Conversation Continuity**: AI has access to full conversation history
4. **User-Specific**: Each user's conversations are isolated

### Benefits

- **Resume Work**: Pick up exactly where you left off
- **Full Context**: AI understands the entire conversation flow
- **Version History**: Project snapshots act as checkpoints
- **Multi-Session**: Work across devices and sessions
- **Collaboration Ready**: Foundation for future sharing features

## Auto-Update Trigger

Conversation `updated_at` timestamp automatically updates when messages are added:

```sql
CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_timestamp();
```

This ensures conversations are always sorted by recent activity.

## Migration

To apply the database schema:

```bash
# Run the migration
supabase db push

# Or apply manually
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/20241126_create_conversations.sql
```

## Usage Example

```typescript
// 1. User starts chatting
const title = generateTitle(userMessage)
const conversation = await createConversation(title)
currentConversationId.value = conversation.id

// 2. Save user message
await addMessage(conversation.id, 'user', userMessage)

// 3. Get AI response and save it
const response = await generateResponse(userMessage)
await addMessage(conversation.id, 'assistant', response)

// 4. Save project state
await saveProjectSnapshot(conversation.id, files.value)

// 5. Later, load conversation
const loaded = await getConversation(conversation.id)
chatHistory.value = loaded.messages.map(msg => ({
  role: msg.role,
  content: msg.content,
  timestamp: new Date(msg.created_at).getTime()
}))

const snapshot = await getLatestSnapshot(conversation.id)
files.value = snapshot.files
```

## Performance Considerations

- **Lazy Loading**: Conversations loaded on demand
- **Indexed Queries**: Fast retrieval with proper indexes
- **Snapshot Compression**: Consider compressing large file states
- **Pagination**: Future enhancement for users with many conversations

## Future Enhancements

- [ ] Conversation search and filtering
- [ ] Export conversation as markdown
- [ ] Share conversations with team members
- [ ] Conversation branching (fork from a specific point)
- [ ] Automatic title generation using AI
- [ ] Conversation tags and categories
- [ ] Archive old conversations
- [ ] Conversation analytics and insights
