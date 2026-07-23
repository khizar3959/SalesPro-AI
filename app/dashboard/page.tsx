'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth'
import { getPredictions, getPredictionStats } from '@/lib/storage'
import { Button, Card, CardContent, CardTitle, Badge } from '@/components'
import type { User } from '@/lib/auth'
import type { Prediction } from '@/lib/storage'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [stats, setStats] = useState({ total: 0, average: 0, highest: 0, lowest: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    const allPredictions = getPredictions()
    setPredictions(allPredictions.slice(-3).reverse()) // Last 3 predictions, reversed

    const predictionStats = getPredictionStats()
    setStats(predictionStats)

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="p-margin-mobile md:p-margin-desktop animate-pulse">
        <div className="h-20 bg-surface-container rounded-lg mb-lg" />
        <div className="grid md:grid-cols-4 gap-lg mb-xxl">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-surface-container rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-margin-mobile md:p-margin-desktop">
      {/* Welcome Section */}
      <div className="mb-xxl animate-fade-in">
        <div className="flex items-start justify-between mb-lg">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-md">
              Welcome back, <span className="text-primary">{user?.fullName.split(' ')[0]}</span>!
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              You have <span className="font-semibold">{stats.total}</span> predictions saved.
              {stats.total === 0 && " Ready to make your first forecast?"}
            </p>
          </div>

          <Link href="/dashboard/predictions">
            <Button variant="primary" icon="add" iconPosition="right">
              New Prediction
            </Button>
          </Link>
        </div>

        {/* Welcome Card */}
        {stats.total > 0 && (
          <Card variant="glass" padding="lg" className="border-primary/30 bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-label-sm text-on-surface-variant mb-sm">Your Latest Prediction</p>
                <p className="text-headline-md font-bold text-primary">
                  ${predictions[0]?.predictedSales.toFixed(2)}K
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-primary/30">trending_up</span>
            </div>
          </Card>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-lg mb-xxl">
        {/* Total Predictions */}
        <Card
          padding="lg"
          className="hover:border-primary transition-all duration-300 animate-scale-in"
          style={{ animationDelay: '0s' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <p className="text-label-sm text-on-surface-variant mb-md font-semibold">Total Predictions</p>
              <p className="text-4xl font-bold text-primary">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary">assessment</span>
            </div>
          </div>
        </Card>

        {/* Average Sales */}
        <Card
          padding="lg"
          className="hover:border-secondary transition-all duration-300 animate-scale-in"
          style={{ animationDelay: '0.05s' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <p className="text-label-sm text-on-surface-variant mb-md font-semibold">Average Sales</p>
              <p className="text-4xl font-bold text-secondary">${stats.average}K</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-secondary">trending_up</span>
            </div>
          </div>
        </Card>

        {/* Highest Prediction */}
        <Card
          padding="lg"
          className="hover:border-tertiary transition-all duration-300 animate-scale-in"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <p className="text-label-sm text-on-surface-variant mb-md font-semibold">Highest Prediction</p>
              <p className="text-4xl font-bold text-tertiary">${stats.highest}K</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-tertiary/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-tertiary">show_chart</span>
            </div>
          </div>
        </Card>

        {/* Model Accuracy */}
        <Card
          padding="lg"
          className="hover:border-primary transition-all duration-300 animate-scale-in"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <p className="text-label-sm text-on-surface-variant mb-md font-semibold">Model Accuracy</p>
              <p className="text-4xl font-bold text-primary">93.55%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary">verified</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-lg mb-xxl">
        {/* Make Prediction */}
        <Link href="/dashboard/predictions" className="h-full">
          <Card
            padding="lg"
            hover
            className="border-2 border-primary/30 hover:border-primary h-full transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <div className="inline-flex items-center gap-sm mb-md px-md py-sm bg-primary/20 rounded-full">
                  <span className="material-symbols-outlined text-sm text-primary">flash_on</span>
                  <span className="text-label-sm text-primary font-semibold">Quick Action</span>
                </div>
                <h3 className="text-headline-md font-headline-md mb-sm text-on-surface">Make a Prediction</h3>
                <p className="text-body-sm text-on-surface-variant mb-lg">
                  Analyze your next advertising campaign and get instant sales forecast
                </p>
                <Button variant="primary" size="md" icon="arrow_forward" iconPosition="right">
                  Start Predicting
                </Button>
              </div>
              <span className="material-symbols-outlined text-5xl text-primary/20 flex-shrink-0">calculate</span>
            </div>
          </Card>
        </Link>

        {/* View History */}
        <Link href="/dashboard/history" className="h-full">
          <Card
            padding="lg"
            hover
            className="border-2 border-secondary/30 hover:border-secondary h-full transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <div className="inline-flex items-center gap-sm mb-md px-md py-sm bg-secondary/20 rounded-full">
                  <span className="material-symbols-outlined text-sm text-secondary">history</span>
                  <span className="text-label-sm text-secondary font-semibold">Analytics</span>
                </div>
                <h3 className="text-headline-md font-headline-md mb-sm text-on-surface">View History</h3>
                <p className="text-body-sm text-on-surface-variant mb-lg">
                  Browse all your predictions and analyze trends across campaigns
                </p>
                <Button variant="secondary" size="md" icon="arrow_forward" iconPosition="right">
                  View All
                </Button>
              </div>
              <span className="material-symbols-outlined text-5xl text-secondary/20 flex-shrink-0">timeline</span>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Predictions */}
      {predictions.length > 0 && (
        <Card padding="none" className="overflow-hidden">
          <div className="p-lg border-b border-outline-variant">
            <div className="flex items-center justify-between">
              <h3 className="text-headline-md font-headline-md text-on-surface">Recent Predictions</h3>
              <Link href="/dashboard/history">
                <a className="text-primary hover:underline text-label-md font-semibold">View all →</a>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-body-sm">
              <thead className="bg-surface-container-high border-b border-outline-variant">
                <tr>
                  <th className="px-lg py-md text-left font-semibold text-on-surface-variant">Date</th>
                  <th className="px-lg py-md text-left font-semibold text-on-surface-variant">TV</th>
                  <th className="px-lg py-md text-left font-semibold text-on-surface-variant">Radio</th>
                  <th className="px-lg py-md text-left font-semibold text-on-surface-variant">Newspaper</th>
                  <th className="px-lg py-md text-left font-semibold text-primary">Sales</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred, idx) => (
                  <tr key={pred.id} className="border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                    <td className="px-lg py-md text-on-surface-variant text-label-sm">
                      {new Date(pred.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-lg py-md text-on-surface">${pred.tv}K</td>
                    <td className="px-lg py-md text-on-surface">${pred.radio}K</td>
                    <td className="px-lg py-md text-on-surface">${pred.newspaper}K</td>
                    <td className="px-lg py-md font-bold text-primary">${pred.predictedSales.toFixed(2)}K</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-lg border-t border-outline-variant text-center">
            <Link href="/dashboard/history">
              <Button variant="ghost" size="md" icon="arrow_forward" iconPosition="right">
                View Complete History
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {predictions.length === 0 && (
        <Card padding="xxl" className="text-center border-2 border-dashed border-outline-variant">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 block mb-lg">
            folder_open
          </span>
          <h3 className="text-headline-md font-headline-md mb-md text-on-surface">No predictions yet</h3>
          <p className="text-body-sm text-on-surface-variant mb-lg max-w-sm mx-auto">
            Start making predictions to see your sales forecasts and build a history of your campaigns
          </p>
          <Link href="/dashboard/predictions">
            <Button variant="primary" size="md" icon="add_circle" iconPosition="left">
              Create Your First Prediction
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
