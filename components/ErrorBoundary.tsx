'use client'

import React, { ReactNode } from 'react'
import { Alert } from './Alert'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-margin-mobile md:p-margin-desktop">
            <Alert variant="error" title="Something went wrong">
              <div className="space-y-md">
                <p>We encountered an unexpected error. Please try refreshing the page.</p>
                <details className="text-label-sm mt-md">
                  <summary className="cursor-pointer font-semibold mb-sm">Error details</summary>
                  <pre className="bg-surface-container-low p-md rounded-lg overflow-auto text-xs mt-md">
                    {this.state.error?.toString()}
                  </pre>
                </details>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-md px-lg py-sm bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/80 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </Alert>
          </div>
        )
      )
    }

    return this.props.children
  }
}
