'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { login } from '@/lib/auth'
import { Button, Input, Alert, LoadingSpinner } from '@/components'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [generalError, setGeneralError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')
    setSuccess('')

    if (!validateForm()) return

    setLoading(true)

    try {
      const result = login(email, password)
      if (result.success) {
        setSuccess('Login successful! Redirecting...')
        setTimeout(() => router.push('/dashboard'), 1500)
      } else {
        setGeneralError(result.error || 'Login failed')
      }
    } catch (err) {
      setGeneralError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center px-margin-mobile">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-xxl text-center">
          <h1 className="text-headline-xl font-headline-xl text-primary mb-sm">SalesPro AI</h1>
          <h2 className="text-headline-lg font-headline-lg mb-md">Welcome Back</h2>
          <p className="text-body-sm text-on-surface-variant">Log in to access your predictions</p>
        </div>

        {/* Alerts */}
        {generalError && (
          <Alert
            variant="error"
            title="Login Failed"
            onClose={() => setGeneralError('')}
            className="mb-lg"
          >
            {generalError}
          </Alert>
        )}

        {success && (
          <Alert variant="success" title="Success!" className="mb-lg">
            {success}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-lg">
          {/* Email Field */}
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors({ ...errors, email: undefined })
            }}
            error={errors.email}
            icon="mail"
          />

          {/* Password Field */}
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) setErrors({ ...errors, password: undefined })
            }}
            error={errors.password}
            icon="lock"
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-label-sm">
            <label className="flex items-center gap-sm cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border border-outline-variant" />
              <span className="text-on-surface-variant">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline font-semibold">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-lg p-lg bg-surface-container border border-outline-variant rounded-lg">
          <p className="text-label-sm text-on-surface-variant mb-md font-semibold">Demo Credentials:</p>
          <div className="text-label-sm text-on-surface-variant space-y-xs">
            <p>Email: <span className="text-on-surface font-mono">demo@example.com</span></p>
            <p>Password: <span className="text-on-surface font-mono">Demo@12345</span></p>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-lg text-center text-body-sm">
          <span className="text-on-surface-variant">Don't have an account? </span>
          <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
