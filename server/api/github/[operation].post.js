import { readFile, writeFile, getRepository, listBranches, searchCode } from '../../utils/github.js';

export default defineEventHandler(async (event) => {
  // Set CORS headers for mobile compatibility
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  // Handle preflight requests
  if (event.method === 'OPTIONS') {
    return { statusCode: 200 };
  }

  const operation = event.context.params.operation;
  
  let body;
  try {
    body = await readBody(event);
  } catch (error) {
    console.error('Failed to parse request body:', error);
    throw createError({
      statusCode: 400,
      message: 'Invalid request body'
    });
  }
  
  // Get GitHub token from runtime config, environment, or user session
  const config = useRuntimeConfig();
  const token = config.githubToken || process.env.GITHUB_TOKEN || body.token;
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'GitHub token is required'
    });
  }

  try {
    switch (operation) {
      case 'readFile': {
        const { owner, repo, path, ref = 'main' } = body;
        if (!owner || !repo || !path) {
          throw createError({
            statusCode: 400,
            message: 'owner, repo, and path are required'
          });
        }
        
        const result = await readFile(token, owner, repo, path, ref);
        return {
          success: true,
          data: result,
          message: `Successfully read ${path} (${result.size} bytes)`
        };
      }
      
      case 'writeFile': {
        const { owner, repo, path, message, contentText, branch = 'main', sha } = body;
        if (!owner || !repo || !path || !message || contentText === undefined) {
          throw createError({
            statusCode: 400,
            message: 'owner, repo, path, message, and contentText are required'
          });
        }
        
        const result = await writeFile(token, owner, repo, path, message, contentText, branch, sha);
        return {
          success: true,
          data: result,
          message: `Successfully wrote ${path}`
        };
      }
      
      case 'getRepository': {
        const { owner, repo } = body;
        if (!owner || !repo) {
          throw createError({
            statusCode: 400,
            message: 'owner and repo are required'
          });
        }
        
        const result = await getRepository(token, owner, repo);
        return {
          success: true,
          data: {
            name: result.name,
            fullName: result.full_name,
            defaultBranch: result.default_branch,
            description: result.description,
            private: result.private
          },
          message: `Repository: ${result.full_name}`
        };
      }
      
      case 'listBranches': {
        const { owner, repo } = body;
        if (!owner || !repo) {
          throw createError({
            statusCode: 400,
            message: 'owner and repo are required'
          });
        }
        
        const branches = await listBranches(token, owner, repo);
        return {
          success: true,
          data: branches.map(b => ({ name: b.name, sha: b.commit.sha })),
          count: branches.length,
          message: `Found ${branches.length} branches`
        };
      }
      
      case 'searchCode': {
        const { owner, repo, query } = body;
        if (!owner || !repo || !query) {
          throw createError({
            statusCode: 400,
            message: 'owner, repo, and query are required'
          });
        }
        
        const result = await searchCode(token, owner, repo, query);
        return {
          success: true,
          data: result.items.map(item => ({
            path: item.path,
            sha: item.sha,
            url: item.html_url
          })),
          totalCount: result.total_count,
          message: `Found ${result.total_count} code matches`
        };
      }
      
      default:
        throw createError({
          statusCode: 400,
          message: `Unknown operation: ${operation}`
        });
    }
  } catch (error) {
    console.error(`GitHub ${operation} error:`, {
      message: error.message,
      statusCode: error.statusCode,
      data: error.data,
      stack: error.stack
    });
    
    // Provide more detailed error messages
    const errorMessage = error.data?.message || error.message || `Failed to ${operation}`;
    const statusCode = error.statusCode || error.status || 500;
    
    throw createError({
      statusCode,
      message: `GitHub API Error: ${errorMessage}`,
      data: {
        operation,
        originalError: error.message
      }
    });
  }
});
