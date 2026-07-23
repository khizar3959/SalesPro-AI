'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isAuthenticated, getCurrentUser, logout } from '@/lib/auth'
import type { User } from '@/lib/auth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (!isAuthenticated()) {
      router.push('/auth/login')
      return
    }

    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [router])

  if (!mounted || !user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'dashboard', exact: true },
    { name: 'Predictions', href: '/dashboard/predictions', icon: 'calculate', exact: true },
    { name: 'History', href: '/dashboard/history', icon: 'history', exact: true },
    { name: 'Settings', href: '/dashboard/settings', icon: 'settings', exact: true },
  ]

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen flex flex-col bg-surface-container-lowest border-r border-outline-variant transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } md:w-64`}
      >
        {/* Logo */}
        <div className="p-lg border-b border-outline-variant flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-md">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-on-primary">trending_up</span>
              </div>
              <div>
                <h1 className="text-headline-md font-headline-md text-primary">SalesPro</h1>
                <p className="text-label-sm text-on-surface-variant opacity-70">AI Analytics</p>
              </div>
            </div>
          )}

          {!sidebarOpen && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-on-primary">trending_up</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-xs p-lg flex-grow">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-md py-sm px-md rounded-lg transition-all ${
                  active
                    ? 'bg-primary/20 text-primary font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
                title={item.name}
              >
                <span className="material-symbols-outlined flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="text-label-md truncate">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-lg border-t border-outline-variant">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-md p-md hover:bg-surface-container-high rounded-lg transition-all text-left"
              title={user.fullName}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-on-primary font-bold text-sm">{user.fullName.charAt(0)}</span>
              </div>
              {sidebarOpen && (
                <div className="flex-grow min-w-0">
                  <p className="text-label-md font-semibold truncate">{user.fullName}</p>
                  <p className="text-label-sm text-on-surface-variant truncate">{user.email}</p>
                </div>
              )}
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-md bg-surface-container border border-outline-variant rounded-lg shadow-lg z-50 overflow-hidden">
                {sidebarOpen && (
                  <>
                    <Link
                      href="/dashboard/settings"
                      className="block px-lg py-md text-on-surface hover:bg-surface-container-high transition-colors text-label-md border-b border-outline-variant"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Settings
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    handleLogout()
                  }}
                  className="w-full text-left px-lg py-md text-error hover:bg-error/10 transition-colors text-label-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-surface-container-lowest border-b border-outline-variant px-md py-lg flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-md hover:bg-surface-container rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="flex items-center gap-md">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-sm text-on-primary">trending_up</span>
            </div>
            <h1 className="text-headline-md font-headline-md text-primary">SalesPro</h1>
          </div>

          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
          >
            <span className="text-on-primary font-bold">{user.fullName.charAt(0)}</span>
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
