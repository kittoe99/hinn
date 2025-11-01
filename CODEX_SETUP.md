# Codex Agent Setup (Simplified - No Python Needed!)

## What You Get

Two modes in one interface at `/codex`:

1. **GPT-4 Chat** (toggle OFF) - Fast AI chat, works immediately
2. **Codex Agent** (toggle ON) - Full agentic capabilities with code access

## One-Time Setup

Just install the Codex CLI globally:

```powershell
npm install -g @openai/codex
```

That's it! The Nuxt app will use it automatically.

## Usage

1. **Start Nuxt dev server**
   ```powershell
   npm run dev
   ```

2. **Visit** http://localhost:3000/codex

3. **Choose your mode:**
   - Leave "Use Codex Agent" OFF → GPT-4 chat (instant)
   - Toggle "Use Codex Agent" ON → Codex Cloud agent

4. **For Codex Agent mode:**
   - Optionally enter a GitHub repo URL
   - Enter a branch (default: main)
   - Send your task

## Requirements

- OpenAI API key in `.env` (already configured)
- Codex CLI installed globally (one command above)
- GitHub connected to Codex Cloud (visit chatgpt.com/codex)
- ChatGPT Plus, Pro, Business, Edu, or Enterprise plan

## Example Prompts

**With Codex Agent enabled:**
- "Analyze the authentication flow and suggest improvements"
- "Find and fix the memory leak in the user service"
- "Add comprehensive tests for the payment module"
- "Refactor the database queries to use prepared statements"

**With GPT-4 Chat (agent disabled):**
- "Explain how OAuth works"
- "Help me design a database schema"
- "What's the best way to handle file uploads?"

## Troubleshooting

### "Codex Exec exited with code..."
Install the Codex CLI:
```powershell
npm install -g @openai/codex
```

### "Missing OPENAI_API_KEY"
Check that `.env` has:
```
OPENAI_API_KEY=sk-...
```

### Agent tasks fail
- Verify GitHub is connected at chatgpt.com/codex
- Ensure you have a Codex-enabled plan
- Check that repo URL is correct

## How It Works

**GPT-4 Mode:**
- Direct OpenAI API calls
- No file access
- Fast responses

**Codex Agent Mode:**
- Uses `@openai/codex-sdk` (Node.js)
- SDK wraps the Codex CLI
- CLI connects to Codex Cloud
- Agent runs in cloud sandbox
- Can read/write code, execute commands, open PRs

## No Python Service Needed!

The previous setup required a Python service. This simplified version uses the Codex SDK directly in Node.js, which is much easier.

## Files

- `/pages/codex.vue` - Chat UI with agent toggle
- `/server/api/codex/test.post.ts` - GPT-4 endpoint
- `/server/api/codex/agent.post.ts` - Codex agent endpoint

## Learn More

- [Codex Documentation](https://developers.openai.com/codex)
- [Codex SDK](https://developers.openai.com/codex/sdk)
