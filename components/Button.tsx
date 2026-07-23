import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-label-md transition-all duration-200 rounded-lg inline-flex items-center justify-center gap-sm'

  const variantStyles = {
    primary: 'bg-primary text-on-primary hover:bg-primary/80 disabled:opacity-50',
    secondary: 'bg-secondary text-on-secondary hover:bg-secondary/80 disabled:opacity-50',
    tertiary: 'bg-tertiary text-on-tertiary hover:bg-tertiary/80 disabled:opacity-50',
    error: 'bg-error text-on-error hover:bg-error/80 disabled:opacity-50',
    ghost: 'bg-transparent text-primary border border-primary hover:bg-primary/10 disabled:opacity-50',
  }

  const sizeStyles = {
    sm: 'px-md py-xs text-label-sm',
    md: 'px-lg py-sm text-label-md',
    lg: 'px-xl py-md text-body-md',
  }

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className || ''}`}
      {...props}
    >
      {loading && (
        <span className="animate-spin">
          <span className="material-symbols-outlined text-base">loading</span>
        </span>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="material-symbols-outlined text-base">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="material-symbols-outlined text-base">{icon}</span>
      )}
    </button>
  )
}
