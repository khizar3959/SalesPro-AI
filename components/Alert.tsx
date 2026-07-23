import React from 'react'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  icon?: boolean
  onClose?: () => void
}

export function Alert({
  variant = 'info',
  title,
  icon = true,
  onClose,
  className,
  children,
  ...props
}: AlertProps) {
  const variantStyles = {
    success: {
      container: 'bg-tertiary/20 border border-tertiary',
      title: 'text-tertiary',
      text: 'text-tertiary/80',
      icon: 'check_circle',
    },
    error: {
      container: 'bg-error/20 border border-error',
      title: 'text-error',
      text: 'text-error/80',
      icon: 'error',
    },
    warning: {
      container: 'bg-error/20 border border-error',
      title: 'text-error',
      text: 'text-error/80',
      icon: 'warning',
    },
    info: {
      container: 'bg-primary/20 border border-primary',
      title: 'text-primary',
      text: 'text-primary/80',
      icon: 'info',
    },
  }

  const styles = variantStyles[variant]

  return (
    <div
      className={`${styles.container} rounded-lg p-lg flex gap-md ${className || ''}`}
      {...props}
    >
      {icon && (
        <span className={`material-symbols-outlined flex-shrink-0 ${styles.title}`}>
          {styles.icon}
        </span>
      )}

      <div className="flex-grow">
        {title && (
          <h4 className={`font-semibold text-body-sm ${styles.title} mb-xs`}>
            {title}
          </h4>
        )}
        <div className={`text-body-sm ${styles.text}`}>{children}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${styles.title} hover:opacity-70 transition-opacity`}
          aria-label="Close alert"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
    </div>
  )
}
