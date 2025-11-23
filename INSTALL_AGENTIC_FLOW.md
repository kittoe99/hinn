# Install Agentic Flow - Step by Step

## 1. Install Dependencies

```bash
npm install @openai/agents
```

## 2. Set Environment Variables

Add to your `.env` file:

```bash
# OpenAI API Key for Agents SDK
OPENAI_API_KEY=your_openai_api_key_here
```

## 3. Files Created

### Server-Side
- ✅ `server/lib/agent.ts` - OpenAI Agents SDK configuration
- ✅ `server/api/hosting/agent-chat.post.ts` - Agent chat endpoint
- ✅ `server/api/hosting/agent-reset.post.ts` - Reset conversation endpoint

### Documentation
- ✅ `AGENTIC_MIGRATION.md` - Migration plan
- ✅ `INSTALL_AGENTIC_FLOW.md` - This file

## 4. How It Works

### Agent Configuration
The agent is configured as "Website Designer" with:
- **Model**: GPT-4o
- **Capabilities**: Website generation, component creation, styling
- **Reasoning**: Medium effort with auto summary
- **Tools**: None (pure code generation for now)

### API Endpoints

#### POST `/api/hosting/agent-chat`
**Request:**
```json
{
  "message": "Create a landing page for a coffee shop",
  "sessionId": "session_123",
  "stream": false
}
```

**Response:**
```json
{
  "response": "Here's a complete landing page...",
  "sessionId": "session_123"
}
```

**Streaming Response:**
Set `stream: true` to get Server-Sent Events (SSE):
```
data: {"chunk":"Here's ","done":false}
data: {"chunk":"a ","done":false}
data: {"chunk":"complete ","done":false}
...
data: {"chunk":"","done":true,"sessionId":"session_123"}
```

#### POST `/api/hosting/agent-reset`
**Request:**
```json
{
  "sessionId": "session_123"
}
```

**Response:**
```json
{
  "message": "Session reset successfully",
  "sessionId": "session_123"
}
```

## 5. Frontend Integration

### Update hosting.vue

Replace the existing chat function with:

```typescript
const sendAgentMessage = async (message: string) => {
  try {
    isAiTyping.value = true
    
    const response = await $fetch('/api/hosting/agent-chat', {
      method: 'POST',
      body: {
        message,
        sessionId: currentChatId.value || 'default',
        stream: false
      }
    })
    
    // Add AI response to chat
    aiMessages.value.push({
      role: 'assistant',
      content: response.response,
      timestamp: new Date()
    })
    
    // Extract and apply HTML
    extractCodeFromResponse(response.response)
    
  } catch (error) {
    console.error('Agent error:', error)
  } finally {
    isAiTyping.value = false
  }
}
```

### Reset Chat

```typescript
const resetAgentChat = async () => {
  try {
    await $fetch('/api/hosting/agent-reset', {
      method: 'POST',
      body: {
        sessionId: currentChatId.value || 'default'
      }
    })
    
    aiMessages.value = []
    currentChatId.value = generateSessionId()
    
  } catch (error) {
    console.error('Reset error:', error)
  }
}
```

## 6. Testing

### Test 1: Simple Website Generation
```
User: "Create a simple landing page with a hero section"
Agent: [Generates complete HTML with hero section]
```

### Test 2: Component Creation
```
User: "Add a contact form to my website"
Agent: [Generates form HTML with styling]
```

### Test 3: Styling
```
User: "Make the hero section have a gradient background"
Agent: [Updates CSS with gradient]
```

## 7. Features

### ✅ Autonomous Code Generation
- Agent generates complete, runnable HTML/CSS/JS
- No need to manually write code
- Follows modern web standards

### ✅ Conversation Memory
- Agent remembers previous messages in session
- Can iterate on designs
- Context-aware responses

### ✅ Streaming Support
- Real-time response streaming
- Better UX for long responses
- Word-by-word output

### ✅ Session Management
- Multiple concurrent sessions
- Session reset capability
- In-memory storage (upgrade to Redis for production)

## 8. Next Steps

### Optional Enhancements

1. **Add Tools**
   - Filesystem tool for file operations
   - GitHub tool for repository management
   - Image generation tool
   - Database tool

2. **File Upload**
   - Allow users to upload existing HTML/CSS
   - Agent can modify uploaded files

3. **Code Execution**
   - Run generated code in sandbox
   - Validate HTML/CSS/JS
   - Screenshot generation

4. **Version Control**
   - Save generated code versions
   - Rollback capability
   - Compare versions

5. **Templates**
   - Pre-built website templates
   - Component library
   - Design system

## 9. Production Considerations

### Session Storage
Replace in-memory Map with:
- **Redis** - For distributed systems
- **Database** - For persistence
- **Supabase** - For easy integration

### Rate Limiting
Add rate limiting to prevent abuse:
```typescript
// In agent-chat.post.ts
const rateLimit = useRateLimit({
  maxRequests: 10,
  windowMs: 60000 // 1 minute
})
```

### Error Handling
Add comprehensive error handling:
- OpenAI API errors
- Network timeouts
- Invalid responses
- Rate limits

### Monitoring
Add logging and monitoring:
- Request/response logging
- Error tracking (Sentry)
- Performance metrics
- Usage analytics

## 10. Troubleshooting

### Error: "Cannot find module '@openai/agents'"
**Solution:** Run `npm install @openai/agents`

### Error: "OPENAI_API_KEY is not set"
**Solution:** Add `OPENAI_API_KEY` to `.env` file

### Error: "Agent result is undefined"
**Solution:** Check OpenAI API key is valid and has credits

### Streaming not working
**Solution:** Ensure frontend handles Server-Sent Events (SSE) correctly

## Summary

**Before:**
- ❌ Simple AI chat
- ❌ Manual code generation
- ❌ No conversation memory
- ❌ No tool usage

**After:**
- ✅ OpenAI Agents SDK
- ✅ Autonomous code generation
- ✅ Conversation memory
- ✅ Streaming support
- ✅ Session management
- ✅ Ready for tool integration

**The agentic flow is now integrated!** 🎉

Run `npm install @openai/agents` and restart your dev server to get started!
