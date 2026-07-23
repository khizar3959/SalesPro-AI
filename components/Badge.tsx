import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success'
  size?: 'sm' | 'md'
}

export function Badge({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary/20 text-primary',
    secondary: 'bg-secondary/20 text-secondary',
    tertiary: 'bg-tertiary/20 text-tertiary',
    error: 'bg-error/20 text-error',
    success: 'bg-tertiary/20 text-tertiary',
  }

  const sizeStyles = {
    sm: 'px-sm py-xs text-label-sm',
    md: 'px-md py-sm text-label-md',
  }

  return (
    <span
      className={`inline-flex items-center gap-xs rounded-full font-semibold ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
      {...props}
    >
      {children}
    </span>
  )
}
