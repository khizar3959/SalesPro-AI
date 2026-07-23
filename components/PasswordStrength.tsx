import React from 'react'

interface PasswordStrengthProps {
  password: string
  label?: string
}

export function getPasswordStrength(password: string): {
  level: number
  label: string
  color: string
  percentage: number
} {
  if (!password) return { level: 0, label: '', color: '', percentage: 0 }

  let score = 0

  // Length checks
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1

  // Character variety
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^a-zA-Z0-9]/.test(password)) score += 2

  const levels = [
    { level: 0, label: '', color: '', percentage: 0 },
    { level: 1, label: 'Weak', color: 'bg-error', percentage: 25 },
    { level: 2, label: 'Fair', color: 'bg-error', percentage: 50 },
    { level: 3, label: 'Good', color: 'bg-error', percentage: 75 },
    { level: 4, label: 'Strong', color: 'bg-tertiary', percentage: 100 },
  ]

  const strength = Math.min(Math.max(score, 0), 4)
  return levels[strength]
}

export function PasswordStrength({ password, label = 'Password Strength' }: PasswordStrengthProps) {
  const strength = getPasswordStrength(password)

  if (!password) return null

  return (
    <div className="mt-md">
      <div className="flex items-center justify-between mb-xs">
        <p className="text-label-sm text-on-surface-variant">{label}</p>
        {strength.label && <span className="text-label-sm font-semibold text-on-surface-variant">{strength.label}</span>}
      </div>

      <div className="flex gap-xs h-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-all ${
              i <= strength.level ? strength.color : 'bg-surface-container-high'
            }`}
          />
        ))}
      </div>

      <div className="mt-sm text-label-sm text-on-surface-variant space-y-xs">
        <p>
          <span className={strength.label ? 'opacity-100' : 'opacity-50'}>
            {password.length >= 8 ? '✓' : '○'} At least 8 characters
          </span>
        </p>
        <p>
          <span className={/[A-Z]/.test(password) ? 'opacity-100' : 'opacity-50'}>
            {/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
          </span>
        </p>
        <p>
          <span className={/[0-9]/.test(password) ? 'opacity-100' : 'opacity-50'}>
            {/[0-9]/.test(password) ? '✓' : '○'} One number
          </span>
        </p>
      </div>
    </div>
  )
}
