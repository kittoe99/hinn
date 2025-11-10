export const useGithub = () => {
  const githubToken = ref(null);

  const setToken = (token) => {
    githubToken.value = token;
  };

  const readFile = async (owner, repo, path, ref = 'main') => {
    try {
      const response = await $fetch('/api/github/readFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          owner,
          repo,
          path,
          ref,
          token: githubToken.value
        },
        timeout: 30000 // 30 second timeout for mobile networks
      });
      return response;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  };

  const writeFile = async (owner, repo, path, message, contentText, branch = 'main', sha = null) => {
    try {
      const response = await $fetch('/api/github/writeFile', {
        method: 'POST',
        body: {
          owner,
          repo,
          path,
          message,
          contentText,
          branch,
          sha,
          token: githubToken.value
        }
      });
      return response;
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  };

  const getRepository = async (owner, repo) => {
    try {
      const response = await $fetch('/api/github/getRepository', {
        method: 'POST',
        body: {
          owner,
          repo,
          token: githubToken.value
        }
      });
      return response;
    } catch (error) {
      console.error('Error getting repository:', error);
      throw error;
    }
  };

  const listBranches = async (owner, repo) => {
    try {
      const response = await $fetch('/api/github/listBranches', {
        method: 'POST',
        body: {
          owner,
          repo,
          token: githubToken.value
        }
      });
      return response;
    } catch (error) {
      console.error('Error listing branches:', error);
      throw error;
    }
  };

  const searchCode = async (owner, repo, query) => {
    try {
      const response = await $fetch('/api/github/searchCode', {
        method: 'POST',
        body: {
          owner,
          repo,
          query,
          token: githubToken.value
        }
      });
      return response;
    } catch (error) {
      console.error('Error searching code:', error);
      throw error;
    }
  };

  return {
    setToken,
    readFile,
    writeFile,
    getRepository,
    listBranches,
    searchCode
  };
};
