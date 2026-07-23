import React from 'react'
import { Button } from './Button'

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  closeButton?: boolean
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeButton = true,
  className,
  ...props
}: ModalProps) {
  if (!isOpen) return null

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`${sizeStyles[size]} bg-surface-container border border-outline-variant rounded-xl shadow-lg max-h-[90vh] overflow-auto ${className || ''}`}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-lg border-b border-outline-variant sticky top-0 bg-surface-container z-10">
          <div className="flex-grow">
            {title && <h2 className="text-headline-md font-headline-md text-on-surface mb-xs">{title}</h2>}
            {description && <p className="text-body-sm text-on-surface-variant">{description}</p>}
          </div>
          {closeButton && (
            <button
              onClick={onClose}
              className="flex-shrink-0 text-on-surface-variant hover:text-on-surface transition-colors ml-md"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-lg">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-lg border-t border-outline-variant bg-surface-container-low flex gap-md justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

interface ConfirmModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
  loading?: boolean
}

export function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={danger ? 'error' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-body-md text-on-surface-variant">{message}</p>
    </Modal>
  )
}
