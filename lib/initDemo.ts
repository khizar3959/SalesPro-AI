// Initialize demo data for the application
// This should be called once on app mount

import { StorageKeys } from './storage'

export function initializeDemoData(): void {
  try {
    // Check if demo data already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    // Only add demo user if no users exist
    if (users.length === 0) {
      // Simple hash for demo password "Demo@12345"
      const demoPasswordHash = '2147c4e1'

      const demoUser = {
        id: 'demo-user-001',
        email: 'demo@example.com',
        fullName: 'Demo User',
        password: demoPasswordHash,
        createdAt: new Date().toISOString(),
      }

      users.push(demoUser)
      localStorage.setItem('users', JSON.stringify(users))

      // Add some demo predictions
      const demoPredictions = [
        {
          id: 'pred-001',
          tv: 230.1,
          radio: 37.8,
          newspaper: 69.2,
          predictedSales: 22.1,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          notes: 'High TV and Newspaper spend',
        },
        {
          id: 'pred-002',
          tv: 44.5,
          radio: 39.3,
          newspaper: 45.1,
          predictedSales: 10.4,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          notes: 'Balanced channel investment',
        },
        {
          id: 'pred-003',
          tv: 151.5,
          radio: 41.3,
          newspaper: 58.5,
          predictedSales: 16.5,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          notes: 'Strong radio performance',
        },
      ]

      localStorage.setItem(StorageKeys.PREDICTIONS, JSON.stringify(demoPredictions))
    }
  } catch (error) {
    console.error('Failed to initialize demo data:', error)
  }
}
