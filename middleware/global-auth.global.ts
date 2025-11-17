/**
 * Global Authentication Middleware
 * Protects entire site - only authenticated users can access
 * Redirects unauthenticated users to coming soon page
 */

export default defineNuxtRouteMiddleware(async (to) => {
  // Public routes that don't require authentication
  const publicRoutes = [
    '/coming-soon',
    '/login',
    '/signup'
  ]

  // Skip auth check for public routes
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Check if user is authenticated
  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  // If not authenticated, redirect to coming soon
  if (!session) {
    return navigateTo('/coming-soon')
  }

  // User is authenticated, allow access
  return
})
