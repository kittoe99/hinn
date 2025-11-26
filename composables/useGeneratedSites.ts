import type { FileMap } from '~/types/builder'

export interface GeneratedSite {
  id: string
  user_id?: string
  conversation_id?: string
  title: string
  description?: string
  files: FileMap
  preview_image?: string
  is_published: boolean
  published_url?: string
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface SiteVersion {
  id: string
  site_id: string
  version_number: number
  files: FileMap
  created_at: string
  created_by_message_id?: string
  change_description?: string
}

export const useGeneratedSites = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  /**
   * Create a new generated site
   */
  const createSite = async (
    title: string,
    files: FileMap,
    conversationId?: string,
    description?: string
  ): Promise<GeneratedSite | null> => {
    if (!user.value) {
      console.error('User not authenticated')
      return null
    }

    console.log('Creating site with data:', {
      user_id: user.value.id,
      conversation_id: conversationId,
      title,
      description,
      file_count: Object.keys(files).length
    })

    const { data, error } = await supabase
      .from('generated_sites')
      .insert({
        user_id: user.value.id,
        conversation_id: conversationId,
        title,
        description,
        files,
        metadata: {
          file_count: Object.keys(files).length,
          created_from: 'builder'
        }
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating site:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return null
    }

    console.log('Site created successfully:', data.id)

    // Create initial version
    if (data) {
      await createVersion(data.id, files, 'Initial version')
    }

    return data
  }

  /**
   * Get all sites for the current user
   */
  const getSites = async (): Promise<GeneratedSite[]> => {
    if (!user.value) return []

    const { data, error } = await supabase
      .from('generated_sites')
      .select('*')
      .eq('user_id', user.value.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching sites:', error)
      return []
    }

    return data || []
  }

  /**
   * Get a single site by ID
   */
  const getSite = async (siteId: string): Promise<GeneratedSite | null> => {
    if (!user.value) return null

    const { data, error } = await supabase
      .from('generated_sites')
      .select('*')
      .eq('id', siteId)
      .eq('user_id', user.value.id)
      .single()

    if (error) {
      console.error('Error fetching site:', error)
      return null
    }

    return data
  }

  /**
   * Update a site
   */
  const updateSite = async (
    siteId: string,
    updates: Partial<GeneratedSite>
  ): Promise<boolean> => {
    const { error } = await supabase
      .from('generated_sites')
      .update(updates)
      .eq('id', siteId)

    if (error) {
      console.error('Error updating site:', error)
      return false
    }

    return true
  }

  /**
   * Update site files and create a new version
   */
  const updateSiteFiles = async (
    siteId: string,
    files: FileMap,
    changeDescription?: string
  ): Promise<boolean> => {
    // Update the site
    const updated = await updateSite(siteId, { files })
    if (!updated) return false

    // Create new version
    await createVersion(siteId, files, changeDescription)

    return true
  }

  /**
   * Delete a site
   */
  const deleteSite = async (siteId: string): Promise<boolean> => {
    const { error } = await supabase
      .from('generated_sites')
      .delete()
      .eq('id', siteId)

    if (error) {
      console.error('Error deleting site:', error)
      return false
    }

    return true
  }

  /**
   * Create a new version of a site
   */
  const createVersion = async (
    siteId: string,
    files: FileMap,
    changeDescription?: string,
    messageId?: string
  ): Promise<SiteVersion | null> => {
    // Get next version number
    const { data: versionNumber } = await supabase
      .rpc('get_next_version_number', { p_site_id: siteId })

    if (!versionNumber) {
      console.error('Failed to get next version number')
      return null
    }

    const { data, error } = await supabase
      .from('site_versions')
      .insert({
        site_id: siteId,
        version_number: versionNumber,
        files,
        change_description: changeDescription,
        created_by_message_id: messageId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating version:', error)
      return null
    }

    return data
  }

  /**
   * Get all versions of a site
   */
  const getSiteVersions = async (siteId: string): Promise<SiteVersion[]> => {
    const { data, error } = await supabase
      .from('site_versions')
      .select('*')
      .eq('site_id', siteId)
      .order('version_number', { ascending: false })

    if (error) {
      console.error('Error fetching versions:', error)
      return []
    }

    return data || []
  }

  /**
   * Get a specific version
   */
  const getVersion = async (siteId: string, versionNumber: number): Promise<SiteVersion | null> => {
    const { data, error } = await supabase
      .from('site_versions')
      .select('*')
      .eq('site_id', siteId)
      .eq('version_number', versionNumber)
      .single()

    if (error) {
      console.error('Error fetching version:', error)
      return null
    }

    return data
  }

  /**
   * Restore a site to a specific version
   */
  const restoreVersion = async (siteId: string, versionNumber: number): Promise<boolean> => {
    const version = await getVersion(siteId, versionNumber)
    if (!version) return false

    return await updateSiteFiles(
      siteId,
      version.files,
      `Restored to version ${versionNumber}`
    )
  }

  /**
   * Publish a site (placeholder for future deployment integration)
   */
  const publishSite = async (siteId: string, publishedUrl: string): Promise<boolean> => {
    return await updateSite(siteId, {
      is_published: true,
      published_url: publishedUrl
    })
  }

  /**
   * Unpublish a site
   */
  const unpublishSite = async (siteId: string): Promise<boolean> => {
    return await updateSite(siteId, {
      is_published: false,
      published_url: undefined
    })
  }

  /**
   * Generate a smart title from files
   */
  const generateSiteTitle = (files: FileMap): string => {
    const fileCount = Object.keys(files).length
    const hasIndex = 'index.html' in files
    
    if (hasIndex) {
      // Try to extract title from index.html
      const indexContent = files['index.html']?.content || ''
      const titleMatch = indexContent.match(/<title>(.*?)<\/title>/i)
      if (titleMatch && titleMatch[1]) {
        return titleMatch[1].trim()
      }
    }
    
    const timestamp = new Date().toLocaleDateString()
    return `Website - ${timestamp} (${fileCount} files)`
  }

  return {
    createSite,
    getSites,
    getSite,
    updateSite,
    updateSiteFiles,
    deleteSite,
    createVersion,
    getSiteVersions,
    getVersion,
    restoreVersion,
    publishSite,
    unpublishSite,
    generateSiteTitle
  }
}
