'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, logout } from '@/lib/auth'
import { getPredictionStats } from '@/lib/storage'
import { Button, Input, Card, CardTitle, Alert, Badge, ConfirmModal } from '@/components'
import type { User } from '@/lib/auth'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [stats, setStats] = useState({ total: 0, average: 0, highest: 0, lowest: 0 })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setFullName(currentUser.fullName)
      setEmail(currentUser.email)
    }
    setStats(getPredictionStats())
  }, [])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage('')

    // Simulate save
    setTimeout(() => {
      setSuccessMessage('Profile updated successfully!')
      setLoading(false)
      setTimeout(() => setSuccessMessage(''), 3000)
    }, 500)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleDeleteAccount = () => {
    setLoading(true)
    setTimeout(() => {
      logout()
      router.push('/')
    }, 1000)
  }

  return (
    <div className="p-margin-mobile md:p-margin-desktop">
      {/* Header */}
      <div className="mb-xxl">
        <h1 className="text-headline-lg font-headline-lg text-on-surface mb-md">Settings & Profile</h1>
        <p className="text-body-sm text-on-surface-variant">
          Manage your account settings, preferences, and account information
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Alert variant="success" title="Success!" onClose={() => setSuccessMessage('')} className="mb-lg">
          {successMessage}
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-lg mb-xxl">
        <Card padding="lg" className="text-center">
          <p className="text-label-sm text-on-surface-variant mb-md">Total Predictions</p>
          <p className="text-4xl font-bold text-primary">{stats.total}</p>
          <p className="text-label-sm text-on-surface-variant mt-sm">Created by you</p>
        </Card>

        <Card padding="lg" className="text-center">
          <p className="text-label-sm text-on-surface-variant mb-md">Average Sales</p>
          <p className="text-4xl font-bold text-secondary">${stats.average}K</p>
          <p className="text-label-sm text-on-surface-variant mt-sm">Across all predictions</p>
        </Card>

        <Card padding="lg" className="text-center">
          <p className="text-label-sm text-on-surface-variant mb-md">Best Result</p>
          <p className="text-4xl font-bold text-tertiary">${stats.highest}K</p>
          <p className="text-label-sm text-on-surface-variant mt-sm">Highest prediction</p>
        </Card>

        <Card padding="lg" className="text-center">
          <p className="text-label-sm text-on-surface-variant mb-md">Account Age</p>
          <p className="text-2xl font-bold text-on-surface">
            {user ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}d
          </p>
          <p className="text-label-sm text-on-surface-variant mt-sm">Days as member</p>
        </Card>
      </div>

      {/* Profile Section */}
      <div className="max-w-2xl mb-xxl">
        <Card padding="lg">
          <CardTitle className="mb-lg">Profile Information</CardTitle>

          <form onSubmit={handleSaveProfile} className="space-y-lg">
            {/* Avatar */}
            <div className="flex items-center gap-lg mb-lg pb-lg border-b border-outline-variant">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-on-primary font-bold text-2xl">{fullName.charAt(0)}</span>
              </div>
              <div className="flex-grow">
                <p className="text-label-md font-semibold text-on-surface mb-sm">Profile Picture</p>
                <p className="text-body-sm text-on-surface-variant mb-md">
                  Uses your name initial. Custom pictures coming soon.
                </p>
                <Button variant="ghost" size="md" disabled>
                  Upload Photo (Coming Soon)
                </Button>
              </div>
            </div>

            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon="person"
            />

            {/* Email (Read-only) */}
            <Input
              label="Email Address"
              type="email"
              value={email}
              disabled
              icon="mail"
              helperText="Email cannot be changed. Contact support to update."
            />

            {/* Member Since */}
            <div>
              <label className="text-label-md font-label-md text-on-surface block mb-sm">Member Since</label>
              <div className="p-md bg-surface-container-low border border-outline-variant rounded-lg text-body-sm text-on-surface-variant">
                {user ? new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Loading...'}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-md pt-md">
              <Button variant="primary" size="lg" loading={loading} disabled={loading}>
                Save Changes
              </Button>
              <Button variant="ghost" size="lg">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Security Section */}
      <div className="max-w-2xl mb-xxl">
        <Card padding="lg">
          <CardTitle className="mb-lg flex items-center gap-md">
            <span className="material-symbols-outlined text-primary">security</span>
            Security & Privacy
          </CardTitle>

          <div className="space-y-lg">
            {/* Password */}
            <div className="flex items-center justify-between pb-lg border-b border-outline-variant">
              <div className="flex-grow">
                <p className="text-label-md font-semibold text-on-surface mb-sm">Password</p>
                <p className="text-body-sm text-on-surface-variant">Change your password to keep your account secure</p>
              </div>
              <Button variant="ghost" size="md" disabled className="ml-md">
                Change (Soon)
              </Button>
            </div>

            {/* Two-Factor Auth */}
            <div className="flex items-center justify-between pb-lg border-b border-outline-variant">
              <div className="flex-grow">
                <p className="text-label-md font-semibold text-on-surface mb-sm">Two-Factor Authentication</p>
                <p className="text-body-sm text-on-surface-variant">Add extra security to your account</p>
              </div>
              <Badge variant="secondary" size="md" className="ml-md">
                Coming Soon
              </Badge>
            </div>

            {/* Session Management */}
            <div>
              <p className="text-label-md font-semibold text-on-surface mb-md">Active Sessions</p>
              <Card padding="md" className="bg-surface-container-high">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-sm">computer</span>
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-on-surface">This Device</p>
                      <p className="text-label-sm text-on-surface-variant">Current session</p>
                    </div>
                  </div>
                  <Badge variant="tertiary" size="md">
                    Active
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>

      {/* Preferences Section */}
      <div className="max-w-2xl mb-xxl">
        <Card padding="lg">
          <CardTitle className="mb-lg flex items-center gap-md">
            <span className="material-symbols-outlined text-secondary">tune</span>
            Preferences
          </CardTitle>

          <div className="space-y-lg">
            {/* Email Notifications */}
            <div className="flex items-center justify-between pb-lg border-b border-outline-variant">
              <div className="flex-grow">
                <p className="text-label-md font-semibold text-on-surface">Email Notifications</p>
                <p className="text-body-sm text-on-surface-variant">Receive updates about your predictions</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 rounded border border-outline-variant cursor-pointer"
              />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex-grow">
                <p className="text-label-md font-semibold text-on-surface">Dark Mode</p>
                <p className="text-body-sm text-on-surface-variant">Always enabled for your comfort</p>
              </div>
              <Badge variant="primary" size="md">
                Enabled
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Data & Privacy Section */}
      <div className="max-w-2xl mb-xxl">
        <Card padding="lg">
          <CardTitle className="mb-lg flex items-center gap-md">
            <span className="material-symbols-outlined text-tertiary">privacy_tip</span>
            Data & Privacy
          </CardTitle>

          <div className="space-y-md text-body-sm text-on-surface-variant mb-lg">
            <p>
              • Your predictions are stored securely in your browser's local storage
            </p>
            <p>
              • We do not sell or share your data with third parties
            </p>
            <p>
              • You can export your data at any time from the History page
            </p>
            <p>
              • Read our <a href="#" className="text-primary hover:underline">Privacy Policy</a> for more information
            </p>
          </div>

          <div className="p-md bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-label-md font-semibold text-primary mb-sm">💡 Your Data Stays with You</p>
            <p className="text-body-sm text-on-surface-variant">
              All your predictions are stored in your browser. No data is sent to external servers.
            </p>
          </div>
        </Card>
      </div>

      {/* Danger Zone */}
      <div className="max-w-2xl">
        <Card padding="lg" className="border-error/30 bg-error/5">
          <CardTitle className="text-error mb-lg flex items-center gap-md">
            <span className="material-symbols-outlined">warning</span>
            Danger Zone
          </CardTitle>

          <div className="space-y-lg">
            {/* Logout */}
            <div className="flex items-center justify-between pb-lg border-b border-error/20">
              <div>
                <p className="text-label-md font-semibold text-on-surface">Logout</p>
                <p className="text-body-sm text-on-surface-variant">Sign out from this device</p>
              </div>
              <Button variant="ghost" size="md" onClick={handleLogout}>
                Logout
              </Button>
            </div>

            {/* Delete Account */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-label-md font-semibold text-error">Delete Account</p>
                <p className="text-body-sm text-on-surface-variant">
                  Permanently delete your account and all predictions
                </p>
              </div>
              <Button variant="error" size="md" onClick={() => setShowDeleteConfirm(true)}>
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteConfirm(false)}
        title="Delete Account?"
        message="This action cannot be undone. Your account and all {stats.total} predictions will be permanently deleted."
        confirmText="Delete My Account"
        cancelText="Cancel"
        danger={true}
        loading={loading}
      />
    </div>
  )
}
