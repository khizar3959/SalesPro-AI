'use client'

import type { Metadata } from 'next'
import { useEffect } from 'react'
import './globals.css'
import { initializeDemoData } from '@/lib/initDemo'

// Note: Metadata export only works in server components, but we need useEffect
// This is a known Next.js limitation with 'use client' + metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize demo data on first app load
    initializeDemoData()
  }, [])

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SalesPro AI - Sales Prediction Tool</title>
        <meta name="description" content="AI-powered sales forecasting based on advertising spend" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface">
        {children}
      </body>
    </html>
  )
}
