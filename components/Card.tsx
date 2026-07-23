import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline'
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

export function Card({
  variant = 'default',
  hover = false,
  padding = 'lg',
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'bg-surface-container border border-outline-variant',
    glass: 'glass-card',
    outline: 'bg-transparent border border-outline-variant',
  }

  const paddingStyles = {
    none: '',
    sm: 'p-sm',
    md: 'p-md',
    lg: 'p-lg',
  }

  const hoverStyle = hover ? 'hover:border-primary hover:bg-surface-container-high transition-all cursor-pointer' : ''

  return (
    <div
      className={`rounded-xl ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyle} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={`border-b border-outline-variant pb-md mb-md ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3 className={`text-headline-md font-headline-md text-on-surface ${className || ''}`} {...props}>
      {children}
    </h3>
  )
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p className={`text-body-sm text-on-surface-variant ${className || ''}`} {...props}>
      {children}
    </p>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={`${className || ''}`} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={`border-t border-outline-variant pt-md mt-md flex gap-md ${className || ''}`} {...props}>
      {children}
    </div>
  )
}
