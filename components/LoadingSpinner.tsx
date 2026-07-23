import React from 'react'

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  fullscreen?: boolean
  text?: string
}

export function LoadingSpinner({
  size = 'md',
  fullscreen = false,
  text,
  className,
  ...props
}: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const spinner = (
    <div className={`flex flex-col items-center gap-md ${className || ''}`} {...props}>
      <div className={`${sizeStyles[size]} animate-spin`}>
        <svg
          className="w-full h-full text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      {text && <p className="text-body-sm text-on-surface-variant">{text}</p>}
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  height?: string
}

export function Skeleton({ lines = 3, height = 'h-4', className, ...props }: SkeletonProps) {
  return (
    <div className={`space-y-md ${className || ''}`} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${height} bg-surface-container-high rounded-lg animate-pulse ${
            i === lines - 1 ? 'w-5/6' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
}
