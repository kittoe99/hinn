# Agentic Flow Migration Plan

## Overview
Migrating from simple AI chat to OpenAI Agents SDK with autonomous tool usage for website building.

## Dependencies to Install
```bash
npm install @openai/agents
```

## Files to Create/Update

### 1. Server-Side Agent (`server/lib/agent.ts`)
- OpenAI Agents SDK configuration
- Agent instructions and tools
- Filesystem tool for local operations
- GitHub tool for repository operations

### 2. API Endpoints
- `server/api/hosting/agent-chat.post.ts` - Main agent chat endpoint
- `server/api/hosting/agent-reset.post.ts` - Reset conversation
- Update existing chat endpoint or replace

### 3. Frontend Updates (`pages/hosting.vue`)
- Replace simple chat with agentic chat
- Add file upload capability
- Add streaming support
- Update UI for tool execution feedback

## Migration Steps
1. Install @openai/agents dependency
2. Create agent configuration
3. Create API endpoints
4. Update frontend
5. Test agent workflow

## Key Features
- ✅ Autonomous tool usage (filesystem, GitHub)
- ✅ File upload support
- ✅ Conversation history
- ✅ Streaming responses
- ✅ Session management
