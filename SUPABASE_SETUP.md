# Supabase Setup Guide

This project uses Supabase for authentication and database management.

## Installation

The Supabase client is already added to `package.json`. Install dependencies:

```bash
npm install
```

## Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your Supabase credentials in `.env`:

```env
# Get these from your Supabase project settings
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NUXT_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Where to find these values:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NUXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `NUXT_SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

## Usage

### In Vue Components (Client-side)

```vue
<script setup>
// Using the composable
const supabase = useSupabase()

// Example: Fetch data
const { data: items } = await supabase
  .from('your_table')
  .select('*')

// Example: Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})
</script>
```

### In Server Routes (Server-side)

```typescript
// server/api/example.ts
import { getSupabaseServer } from '~/lib/supabaseServer'

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseServer()
  
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  
  return { data, error }
})
```

## Files Structure

```
lib/
├── supabaseClient.ts      # Client-side Supabase instance
├── supabaseServer.ts      # Server-side Supabase instance (with service role)
composables/
└── useSupabase.ts         # Vue composable for easy access
```

## Security Notes

⚠️ **IMPORTANT:**
- Never expose `NUXT_SUPABASE_SERVICE_ROLE_KEY` to the client
- Only use `supabaseServer` in server routes/middleware
- Use `supabaseClient` or `useSupabase()` in Vue components
- The service role key bypasses Row Level Security (RLS)

## Authentication Flow

### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})
```

### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})
```

### Sign Out
```typescript
const { error } = await supabase.auth.signOut()
```

### Get Current User
```typescript
const { data: { user } } = await supabase.auth.getUser()
```

### OAuth (Google, etc.)
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`
  }
})
```

## Database Operations

### Insert
```typescript
const { data, error } = await supabase
  .from('table_name')
  .insert({ column: 'value' })
```

### Select
```typescript
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('id', 123)
```

### Update
```typescript
const { data, error } = await supabase
  .from('table_name')
  .update({ column: 'new_value' })
  .eq('id', 123)
```

### Delete
```typescript
const { data, error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', 123)
```

## Real-time Subscriptions

```typescript
const channel = supabase
  .channel('table-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'your_table' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

// Cleanup
onUnmounted(() => {
  supabase.removeChannel(channel)
})
```

## Troubleshooting

### "Missing Supabase env vars" error
- Make sure you've created a `.env` file
- Restart the dev server after adding env variables
- Check that variable names match exactly

### Authentication not working
- Verify your Supabase project URL is correct
- Check that email confirmation is disabled (or handle confirmation flow)
- Ensure RLS policies are set up correctly in Supabase

### TypeScript errors
- Run `npm install` to ensure `@supabase/supabase-js` is installed
- Make sure `@types/node` is in devDependencies

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
