/**
 * Composable for managing website file storage in Supabase
 * Files are organized by website ID in the 'website' bucket
 */
export const useWebsiteStorage = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  // Return early if no supabase client (SSR)
  if (!supabase) {
    console.warn('Supabase client not available')
    return {
      uploadFile: async () => ({ data: null, error: new Error('Supabase not initialized') }),
      uploadFiles: async () => [],
      downloadFile: async () => ({ data: null, error: new Error('Supabase not initialized') }),
      getSignedUrl: async () => ({ data: null, error: new Error('Supabase not initialized') }),
      listFiles: async () => ({ data: null, error: new Error('Supabase not initialized') }),
      deleteFile: async () => ({ data: null, error: new Error('Supabase not initialized') }),
      deleteFiles: async () => ({ data: null, error: new Error('Supabase not initialized') }),
      deleteWebsiteFolder: async () => ({ data: null, error: new Error('Supabase not initialized') }),
      getFileMetadata: async () => ({ data: null, error: new Error('Supabase not initialized') })
    }
  }

  /**
   * Upload a file to a website's storage folder
   * @param {string} websiteId - The website ID
   * @param {string} filePath - Path within the website folder (e.g., 'index.html' or 'assets/logo.png')
   * @param {File|Blob|string} file - The file to upload
   * @param {object} options - Upload options
   * @returns {Promise<{data, error}>}
   */
  const uploadFile = async (websiteId, filePath, file, options = {}) => {
    if (!user.value) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const fullPath = `${websiteId}/${filePath}`
    
    const { data, error } = await supabase.storage
      .from('website')
      .upload(fullPath, file, {
        contentType: options.contentType || 'text/plain',
        upsert: options.upsert !== false, // Default to true
        ...options
      })

    return { data, error }
  }

  /**
   * Upload multiple files at once
   * @param {string} websiteId - The website ID
   * @param {Array<{path: string, file: File|Blob|string, contentType?: string}>} files - Array of files to upload
   * @returns {Promise<Array<{path, data, error}>>}
   */
  const uploadFiles = async (websiteId, files) => {
    const results = await Promise.all(
      files.map(async ({ path, file, contentType }) => {
        const { data, error } = await uploadFile(websiteId, path, file, { contentType })
        return { path, data, error }
      })
    )
    return results
  }

  /**
   * Download a file from a website's storage folder
   * @param {string} websiteId - The website ID
   * @param {string} filePath - Path within the website folder
   * @returns {Promise<{data, error}>}
   */
  const downloadFile = async (websiteId, filePath) => {
    if (!user.value) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const fullPath = `${websiteId}/${filePath}`
    
    const { data, error } = await supabase.storage
      .from('website')
      .download(fullPath)

    return { data, error }
  }

  /**
   * Get a signed URL for a file (for temporary public access)
   * @param {string} websiteId - The website ID
   * @param {string} filePath - Path within the website folder
   * @param {number} expiresIn - Expiration time in seconds (default: 3600 = 1 hour)
   * @returns {Promise<{data, error}>}
   */
  const getSignedUrl = async (websiteId, filePath, expiresIn = 3600) => {
    if (!user.value) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const fullPath = `${websiteId}/${filePath}`
    
    const { data, error } = await supabase.storage
      .from('website')
      .createSignedUrl(fullPath, expiresIn)

    return { data, error }
  }

  /**
   * List all files in a website's storage folder
   * @param {string} websiteId - The website ID
   * @param {string} folder - Optional subfolder path
   * @returns {Promise<{data, error}>}
   */
  const listFiles = async (websiteId, folder = '') => {
    if (!user.value) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const path = folder ? `${websiteId}/${folder}` : websiteId
    
    const { data, error } = await supabase.storage
      .from('website')
      .list(path, {
        sortBy: { column: 'name', order: 'asc' }
      })

    return { data, error }
  }

  /**
   * Delete a file from a website's storage folder
   * @param {string} websiteId - The website ID
   * @param {string} filePath - Path within the website folder
   * @returns {Promise<{data, error}>}
   */
  const deleteFile = async (websiteId, filePath) => {
    if (!user.value) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const fullPath = `${websiteId}/${filePath}`
    
    const { data, error } = await supabase.storage
      .from('website')
      .remove([fullPath])

    return { data, error }
  }

  /**
   * Delete multiple files at once
   * @param {string} websiteId - The website ID
   * @param {Array<string>} filePaths - Array of file paths to delete
   * @returns {Promise<{data, error}>}
   */
  const deleteFiles = async (websiteId, filePaths) => {
    if (!user.value) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const fullPaths = filePaths.map(path => `${websiteId}/${path}`)
    
    const { data, error } = await supabase.storage
      .from('website')
      .remove(fullPaths)

    return { data, error }
  }

  /**
   * Delete entire website folder (all files)
   * @param {string} websiteId - The website ID
   * @returns {Promise<{data, error}>}
   */
  const deleteWebsiteFolder = async (websiteId) => {
    if (!user.value) {
      return { data: null, error: new Error('User not authenticated') }
    }

    // First list all files
    const { data: files, error: listError } = await listFiles(websiteId)
    
    if (listError) {
      return { data: null, error: listError }
    }

    if (!files || files.length === 0) {
      return { data: [], error: null }
    }

    // Delete all files
    const filePaths = files.map(file => file.name)
    return await deleteFiles(websiteId, filePaths)
  }

  /**
   * Get file metadata
   * @param {string} websiteId - The website ID
   * @param {string} filePath - Path within the website folder
   * @returns {Promise<{data, error}>}
   */
  const getFileMetadata = async (websiteId, filePath) => {
    if (!user.value) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const fullPath = `${websiteId}/${filePath}`
    
    const { data, error } = await supabase.storage
      .from('website')
      .list(websiteId, {
        search: filePath
      })

    if (error) {
      return { data: null, error }
    }

    const file = data?.find(f => f.name === filePath.split('/').pop())
    return { data: file || null, error: file ? null : new Error('File not found') }
  }

  return {
    uploadFile,
    uploadFiles,
    downloadFile,
    getSignedUrl,
    listFiles,
    deleteFile,
    deleteFiles,
    deleteWebsiteFolder,
    getFileMetadata
  }
}
