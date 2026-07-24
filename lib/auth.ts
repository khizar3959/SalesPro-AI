// Simple client-side authentication utilities
import { StorageKeys } from './storage'

export interface User {
  id: string
  email: string
  fullName: string
  createdAt: string
  avatarUrl?: string
}

export interface AuthSession {
  user: User | null
  isAuthenticated: boolean
}

// Hash password (simple implementation - for production use proper hashing)
function hashPassword(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16)
}

// Sign up user
export function signup(email: string, fullName: string, password: string): { success: boolean; error?: string } {
  try {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some((u: User) => u.email === email)) {
      return { success: false, error: 'Email already registered' }
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      fullName,
      password: hashPassword(password),
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Auto-login after signup
    login(email, password)

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Signup failed' }
  }
}

// Login user
export function login(email: string, password: string): { success: boolean; error?: string } {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.email === email && u.password === hashPassword(password))

    if (!user) {
      return { success: false, error: 'Invalid email or password' }
    }

    // Remove password before storing session
    const sessionUser = { id: user.id, email: user.email, fullName: user.fullName, createdAt: user.createdAt }
    localStorage.setItem(StorageKeys.CURRENT_USER, JSON.stringify(sessionUser))
    localStorage.setItem(StorageKeys.IS_AUTHENTICATED, 'true')

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Login failed' }
  }
}

// Logout user
export function logout(): void {
  localStorage.removeItem(StorageKeys.CURRENT_USER)
  localStorage.removeItem(StorageKeys.IS_AUTHENTICATED)
}

// Get current session
export function getSession(): AuthSession {
  try {
    const isAuthenticated = localStorage.getItem(StorageKeys.IS_AUTHENTICATED) === 'true'
    const userJson = localStorage.getItem(StorageKeys.CURRENT_USER)
    const user = userJson ? JSON.parse(userJson) : null

    return {
      user,
      isAuthenticated,
    }
  } catch {
    return {
      user: null,
      isAuthenticated: false,
    }
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getSession().isAuthenticated
}

// Get current user
export function getCurrentUser(): User | null {
  return getSession().user
}

// Update user profile (name, avatar)
export function updateProfile(fullName: string, avatarUrl?: string): { success: boolean; error?: string } {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return { success: false, error: 'No active session' }
    }

    // 1. Update the session storage
    const updatedUser = { ...currentUser, fullName, avatarUrl }
    localStorage.setItem(StorageKeys.CURRENT_USER, JSON.stringify(updatedUser))

    // 2. Update in the users list
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex((u: any) => u.id === currentUser.id)
    if (userIndex !== -1) {
      users[userIndex].fullName = fullName
      users[userIndex].avatarUrl = avatarUrl
      localStorage.setItem('users', JSON.stringify(users))
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update profile' }
  }
}
