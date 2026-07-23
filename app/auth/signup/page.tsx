'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signup } from '@/lib/auth'
import { Button, Input, Alert, PasswordStrength } from '@/components'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
    terms?: string
  }>({})

  const [generalError, setGeneralError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter'
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions'
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
      const result = signup(email, fullName, password)
      if (result.success) {
        setSuccess('Account created successfully! Redirecting to dashboard...')
        setTimeout(() => router.push('/dashboard'), 1500)
      } else {
        setGeneralError(result.error || 'Signup failed')
      }
    } catch (err) {
      setGeneralError('An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center px-margin-mobile py-margin-mobile">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-xxl text-center">
          <h1 className="text-headline-xl font-headline-xl text-primary mb-sm">SalesPro AI</h1>
          <h2 className="text-headline-lg font-headline-lg mb-md">Create Your Account</h2>
          <p className="text-body-sm text-on-surface-variant">
            Get started with AI-powered sales predictions in 2 minutes
          </p>
        </div>

        {/* Alerts */}
        {generalError && (
          <Alert
            variant="error"
            title="Signup Failed"
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
          {/* Full Name Field */}
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              if (errors.fullName) setErrors({ ...errors, fullName: undefined })
            }}
            error={errors.fullName}
            icon="person"
          />

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
          <div>
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
              helperText="Min. 8 characters, 1 uppercase, 1 number"
            />

            {/* Password Strength Indicator */}
            {password && <PasswordStrength password={password} />}
          </div>

          {/* Confirm Password Field */}
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
            }}
            error={errors.confirmPassword}
            icon="lock"
          />

          {/* Terms Checkbox */}
          <div className={errors.terms ? 'p-md bg-error/20 border border-error rounded-lg' : ''}>
            <label className="flex items-start gap-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked)
                  if (errors.terms) setErrors({ ...errors, terms: undefined })
                }}
                className="w-4 h-4 rounded border border-outline-variant mt-xs"
              />
              <span className="text-label-sm text-on-surface-variant">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline font-semibold">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline font-semibold">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.terms && (
              <p className="text-label-sm text-error mt-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-sm">error</span>
                {errors.terms}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-lg text-center text-body-sm">
          <span className="text-on-surface-variant">Already have an account? </span>
          <Link href="/auth/login" className="text-primary hover:underline font-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
