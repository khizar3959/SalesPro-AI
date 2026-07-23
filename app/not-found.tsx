'use client'

import Link from 'next/link'
import { Button } from '@/components'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center px-margin-mobile relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="text-center max-w-md z-10">
        {/* 404 Number */}
        <div className="mb-lg">
          <div className="text-9xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent mb-md animate-pulse">
            404
          </div>
          <div className="inline-flex items-center gap-sm px-md py-sm bg-error/10 border border-error/30 rounded-full mb-lg">
            <span className="material-symbols-outlined text-error text-sm">error</span>
            <span className="text-label-sm text-error font-semibold">Page Not Found</span>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-headline-lg font-headline-lg mb-sm">Oops! Lost in Space</h1>

        <p className="text-body-md text-on-surface-variant mb-xxl leading-relaxed">
          The page you're looking for doesn't exist or has been moved to another location. Let's get you back on track.
        </p>

        {/* Suggestions */}
        <div className="mb-xxl p-lg bg-surface-container border border-outline-variant rounded-xl text-left">
          <p className="text-label-sm text-on-surface-variant font-semibold mb-md">Here's what you can do:</p>
          <ul className="space-y-sm text-body-sm text-on-surface-variant">
            <li className="flex items-start gap-md">
              <span className="material-symbols-outlined text-primary flex-shrink-0 mt-xs text-sm">check_circle</span>
              <span>Check the URL for typos or incorrect characters</span>
            </li>
            <li className="flex items-start gap-md">
              <span className="material-symbols-outlined text-primary flex-shrink-0 mt-xs text-sm">check_circle</span>
              <span>Go back to the previous page using your browser</span>
            </li>
            <li className="flex items-start gap-md">
              <span className="material-symbols-outlined text-primary flex-shrink-0 mt-xs text-sm">check_circle</span>
              <span>Use the navigation links below to explore the site</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-md">
          <Link href="/dashboard" className="w-full">
            <Button variant="primary" size="lg" fullWidth icon="dashboard" iconPosition="left">
              Go to Dashboard
            </Button>
          </Link>

          <Link href="/" className="w-full">
            <Button variant="ghost" size="lg" fullWidth icon="home" iconPosition="left">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Decorative message */}
        <div className="mt-xxl p-md bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-label-sm text-primary/80">
            💡 Tip: Use SalesPro AI to predict your success instead of getting lost!
          </p>
        </div>
      </div>
    </div>
  )
}
