# GitHub Integration

This document explains how to use the GitHub integration in the website builder.

## Setup

### 1. Get a GitHub Personal Access Token

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Hinn Website Builder"
4. Select scopes:
   - `repo` (Full control of private repositories)
   - `read:user` (Read user profile data)
5. Click "Generate token"
6. Copy the token (you won't see it again!)

### 2. Add Token to Environment

Add your token to `.env`:

```bash
GITHUB_TOKEN=ghp_your_token_here
```

## Usage in Builder Page

The GitHub integration is available through the `useGithub` composable:

```vue
<script setup>
const github = useGithub();

// Set token (optional if using env variable)
github.setToken('your_token');

// Read a file
const readFileExample = async () => {
  const result = await github.readFile('owner', 'repo', 'path/to/file.js', 'main');
  console.log(result.data.contentText);
};

// Write a file
const writeFileExample = async () => {
  await github.writeFile(
    'owner',
    'repo',
    'path/to/file.js',
    'Update file via builder',
    'console.log("Hello World");',
    'main'
  );
};

// Get repository info
const getRepoExample = async () => {
  const result = await github.getRepository('owner', 'repo');
  console.log(result.data);
};

// List branches
const listBranchesExample = async () => {
  const result = await github.listBranches('owner', 'repo');
  console.log(result.data);
};

// Search code
const searchExample = async () => {
  const result = await github.searchCode('owner', 'repo', 'function myFunction');
  console.log(result.data);
};
</script>
```

## API Endpoints

The following API endpoints are available:

### POST /api/github/readFile
Read a file from a GitHub repository.

**Body:**
```json
{
  "owner": "username",
  "repo": "repository",
  "path": "path/to/file.js",
  "ref": "main"
}
```

### POST /api/github/writeFile
Write or update a file in a GitHub repository.

**Body:**
```json
{
  "owner": "username",
  "repo": "repository",
  "path": "path/to/file.js",
  "message": "Commit message",
  "contentText": "file content",
  "branch": "main",
  "sha": "optional_file_sha_for_updates"
}
```

### POST /api/github/getRepository
Get repository information.

**Body:**
```json
{
  "owner": "username",
  "repo": "repository"
}
```

### POST /api/github/listBranches
List all branches in a repository.

**Body:**
```json
{
  "owner": "username",
  "repo": "repository"
}
```

### POST /api/github/searchCode
Search for code in a repository.

**Body:**
```json
{
  "owner": "username",
  "repo": "repository",
  "query": "search term"
}
```

## Features

- ✅ Read files from GitHub repositories
- ✅ Write/update files with commit messages
- ✅ Automatic handling of large files
- ✅ Rate limit detection and retry logic
- ✅ Search code across repositories
- ✅ List branches and repository info
- ✅ Secure token handling (server-side only)

## Security Notes

- GitHub tokens are stored server-side only
- Tokens are never exposed to the client
- All API calls go through your Nuxt server
- Rate limits are monitored and logged

## Error Handling

All GitHub operations include error handling:

```javascript
try {
  const result = await github.readFile('owner', 'repo', 'file.js');
  console.log('Success:', result);
} catch (error) {
  console.error('Error:', error.message);
}
```

## Next Steps

To integrate with AI chat:
1. Parse user messages for GitHub operations
2. Extract owner, repo, and file paths
3. Call appropriate GitHub functions
4. Return results to the chat interface
