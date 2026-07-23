import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, logout as authLogout, User, isAuthenticated as checkAuth } from './auth'

export interface UseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

/**
 * Custom hook for managing authentication state
 * Handles session retrieval and auto-redirect for unauthenticated users
 */
export function useAuth(requireAuth: boolean = false): UseAuthReturn {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    const session = getSession()
    setUser(session.user)
    setIsAuthenticated(session.isAuthenticated)
    setIsLoading(false)

    // Redirect to login if authentication is required but not authenticated
    if (requireAuth && !session.isAuthenticated) {
      router.push('/auth/login')
    }
  }, [requireAuth, router])

  const logout = () => {
    authLogout()
    setUser(null)
    setIsAuthenticated(false)
    router.push('/')
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
  }
}

/**
 * Hook specifically for protecting routes
 * Automatically redirects to login if not authenticated
 */
export function useProtectedRoute() {
  return useAuth(true)
}

/**
 * Hook for checking if user is authenticated without redirect
 */
export function useIsAuthenticated() {
  return checkAuth()
}
