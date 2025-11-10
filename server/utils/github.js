const API_BASE = 'https://api.github.com';
const API_VERSION = '2022-11-28';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

function ghHeaders(token, extra = {}) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': API_VERSION,
    'User-Agent': 'hinn-website-builder',
    ...extra,
  };
}

async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      
      // Check rate limits
      const remaining = res.headers.get('X-RateLimit-Remaining');
      if (remaining && parseInt(remaining) < 10) {
        console.warn(`GitHub API rate limit low: ${remaining} remaining`);
      }
      
      // Retry on 5xx or rate limit
      if (res.status >= 500 || res.status === 403) {
        if (i < retries - 1) {
          const delay = RETRY_DELAY * Math.pow(2, i) * (1 + Math.random() * 0.1);
          console.log(`Retrying after ${Math.round(delay)}ms (attempt ${i + 1}/${retries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      
      return res;
    } catch (error) {
      if (i < retries - 1) {
        const delay = RETRY_DELAY * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

// ============================================
// REPOSITORIES
// ============================================

export async function getRepository(token, owner, repo) {
  const res = await fetchWithRetry(`${API_BASE}/repos/${owner}/${repo}`, {
    headers: ghHeaders(token),
  });
  if (!res.ok) throw new Error(`Failed to get repository: ${res.status} ${await res.text()}`);
  return await res.json();
}

export async function listBranches(token, owner, repo) {
  const res = await fetchWithRetry(`${API_BASE}/repos/${owner}/${repo}/branches`, {
    headers: ghHeaders(token),
  });
  if (!res.ok) throw new Error(`Failed to list branches: ${res.status} ${await res.text()}`);
  return await res.json();
}

// ============================================
// CONTENTS API (Small/Medium Files)
// ============================================

export async function getContents(token, owner, repo, path, ref = null) {
  let url = `${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
  if (ref) url += `?ref=${encodeURIComponent(ref)}`;
  const res = await fetchWithRetry(url, { headers: ghHeaders(token) });
  if (!res.ok) throw new Error(`Failed to get contents: ${res.status} ${await res.text()}`);
  return await res.json();
}

// ============================================
// RAW CONTENT
// ============================================

export async function fetchRawContent(owner, repo, path, ref = 'main') {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`;
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`Failed to fetch raw content: ${res.status} ${await res.text()}`);
  return await res.text();
}

// ============================================
// HIGH-LEVEL FILE OPERATIONS
// ============================================

export async function readFile(token, owner, repo, path, ref = 'main') {
  try {
    // Try Contents API first
    const data = await getContents(token, owner, repo, path, ref);
    if (data.content && data.encoding === 'base64') {
      return {
        contentText: Buffer.from(data.content, 'base64').toString('utf-8'),
        sha: data.sha,
        size: data.size,
        path: data.path
      };
    }
  } catch (err) {
    // Contents API failed, try raw
  }
  
  // Fallback to raw
  try {
    const contentText = await fetchRawContent(owner, repo, path, ref);
    const meta = await getContents(token, owner, repo, path, ref);
    return {
      contentText,
      sha: meta.sha,
      size: meta.size,
      path: meta.path
    };
  } catch (err) {
    throw new Error(`Failed to read file ${path}: ${err.message}`);
  }
}

export async function writeFile(token, owner, repo, path, message, contentText, branch = 'main', sha = null) {
  const body = {
    message,
    content: Buffer.from(contentText, 'utf-8').toString('base64'),
    branch
  };
  if (sha) body.sha = sha;
  
  const res = await fetchWithRetry(`${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: ghHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to write file: ${res.status} ${await res.text()}`);
  return await res.json();
}

export async function searchCode(token, owner, repo, query) {
  const q = `${query}+repo:${owner}/${repo}`;
  const res = await fetchWithRetry(`${API_BASE}/search/code?q=${encodeURIComponent(q)}`, {
    headers: ghHeaders(token),
  });
  if (!res.ok) throw new Error(`Failed to search code: ${res.status} ${await res.text()}`);
  return await res.json();
}
