import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      fullWidth = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-sm ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="text-label-md font-label-md text-on-surface">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && iconPosition === 'left' && (
            <span className="absolute left-md text-on-surface-variant material-symbols-outlined pointer-events-none">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            className={`w-full px-md py-sm ${
              icon && iconPosition === 'left' ? 'pl-xxl' : ''
            } ${
              icon && iconPosition === 'right' ? 'pr-xxl' : ''
            } bg-surface-container-low border ${
              error ? 'border-error' : 'border-outline-variant'
            } rounded-lg text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${
              className || ''
            }`}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <span className="absolute right-md text-on-surface-variant material-symbols-outlined pointer-events-none">
              {icon}
            </span>
          )}
        </div>

        {error && (
          <p className="text-label-sm text-error flex items-center gap-xs">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-label-sm text-on-surface-variant">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
