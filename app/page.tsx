'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isAuthenticated } from '@/lib/auth'
import { Button } from '@/components'

export default function Home() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated()) {
      router.push('/dashboard')
    }

    // Track scroll for parallax effects
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [router])

  return (
    <div className="min-h-screen bg-background text-on-surface overflow-hidden">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-sm text-on-primary">trending_up</span>
            </div>
            <h1 className="text-headline-md font-headline-md text-primary">SalesPro AI</h1>
          </div>

          <div className="flex gap-md items-center">
            <Link
              href="/auth/login"
              className="px-lg py-sm text-on-surface hover:text-primary transition-colors font-label-md"
            >
              Login
            </Link>
            <Link href="/auth/signup">
              <Button variant="primary" size="md">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-xxl md:pt-margin-desktop min-h-screen flex items-center justify-center px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.1}% ${50 + scrollY * 0.05}%, rgba(170, 199, 255, 0.1), transparent)`,
          }}
        />

        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-sm mb-lg px-md py-sm bg-primary/10 border border-primary/30 rounded-full">
            <span className="material-symbols-outlined text-primary text-sm">spark</span>
            <span className="text-label-sm text-primary font-semibold">Powered by Advanced AI</span>
          </div>

          <h2 className="text-5xl md:text-headline-xl font-bold mb-lg text-primary leading-tight">
            AI-Powered Sales Forecasting
          </h2>

          <p className="text-lg md:text-body-lg text-on-surface-variant mb-xxl max-w-2xl mx-auto leading-relaxed">
            Predict your sales potential with 93.55% accuracy. Analyze advertising budgets across TV, Radio, and Newspaper channels to optimize your marketing strategy.
          </p>

          <div className="flex flex-col md:flex-row gap-md justify-center mb-xxl">
            <Link href="/auth/signup">
              <Button variant="primary" size="lg" icon="arrow_forward" iconPosition="right">
                Start Predicting Now
              </Button>
            </Link>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-xl py-md border border-primary text-primary rounded-lg font-label-md hover:bg-primary/10 transition-all"
            >
              Learn More
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-col md:flex-row justify-center gap-xl text-center">
            <div>
              <div className="text-2xl font-bold text-tertiary">93.55%</div>
              <div className="text-label-sm text-on-surface-variant">Model Accuracy</div>
            </div>
            <div className="hidden md:block w-px bg-outline-variant" />
            <div>
              <div className="text-2xl font-bold text-secondary">200+</div>
              <div className="text-label-sm text-on-surface-variant">Training Campaigns</div>
            </div>
            <div className="hidden md:block w-px bg-outline-variant" />
            <div>
              <div className="text-2xl font-bold text-primary">Instant</div>
              <div className="text-label-sm text-on-surface-variant">Predictions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-xxl px-margin-mobile md:px-margin-desktop bg-gradient-to-b from-transparent via-surface-container-low to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-xxl">
            <h3 className="text-headline-lg font-headline-lg text-primary mb-md">Why Choose SalesPro AI?</h3>
            <p className="text-body-md text-on-surface-variant">Everything you need to optimize your advertising strategy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-lg">
            {/* Feature 1 */}
            <div className="group p-lg bg-surface-container border border-outline-variant rounded-xl hover:border-primary hover:bg-surface-container-high transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-md group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h4 className="text-headline-md font-headline-md mb-md text-on-surface">Accurate Predictions</h4>
              <p className="text-body-sm text-on-surface-variant">
                93.55% accuracy powered by polynomial regression ML models trained on 200+ real advertising campaigns.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-lg bg-surface-container border border-outline-variant rounded-xl hover:border-secondary hover:bg-surface-container-high transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-md group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h4 className="text-headline-md font-headline-md mb-md text-on-surface">Instant Results</h4>
              <p className="text-body-sm text-on-surface-variant">
                Get sales forecasts in milliseconds. No waiting, no complex processes. Just enter your budgets and get results.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-lg bg-surface-container border border-outline-variant rounded-xl hover:border-tertiary hover:bg-surface-container-high transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-md group-hover:scale-110 transition-transform duration-300">📊</div>
              <h4 className="text-headline-md font-headline-md mb-md text-on-surface">Track History</h4>
              <p className="text-body-sm text-on-surface-variant">
                Keep a complete history of all predictions and watch your strategy evolve. Export data and analyze trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-xxl px-margin-mobile md:px-margin-desktop">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-xxl">
            <h3 className="text-headline-lg font-headline-lg text-primary mb-md">How It Works</h3>
            <p className="text-body-md text-on-surface-variant">Simple 4-step process to get your sales forecast</p>
          </div>

          <div className="grid md:grid-cols-4 gap-md md:gap-0">
            {[
              { num: '1', title: 'Enter Budget', desc: 'Input your advertising budgets for TV, Radio, and Newspaper' },
              { num: '2', title: 'AI Analyzes', desc: 'Our ML model processes your inputs using advanced algorithms' },
              { num: '3', title: 'Get Prediction', desc: 'Receive accurate sales forecast with confidence metrics' },
              { num: '4', title: 'Track Progress', desc: 'View entire prediction history and analyze trends' },
            ].map((step, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-on-primary rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-md">
                  {step.num}
                </div>
                <p className="text-body-sm font-semibold mb-md text-on-surface">{step.title}</p>
                <p className="text-label-sm text-on-surface-variant">{step.desc}</p>

                {idx < 3 && (
                  <div className="hidden md:block absolute top-6 -right-1/2 w-1/2 h-1 bg-gradient-to-r from-primary to-transparent opacity-30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Info Section */}
      <section className="py-xxl px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <div className="p-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-xl">
            <div className="flex items-start gap-lg">
              <span className="material-symbols-outlined text-2xl text-primary flex-shrink-0">verified</span>
              <div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">Proven ML Model</h3>
                <p className="text-body-sm text-on-surface-variant mb-md">
                  Our polynomial regression model achieves 93.55% accuracy (R² Score) on real advertising data. The model analyzes
                  linear relationships plus interaction effects between channels to provide accurate sales predictions.
                </p>
                <div className="flex flex-wrap gap-md">
                  <div className="inline-flex items-center gap-xs px-md py-sm bg-on-surface/10 rounded-full">
                    <span className="material-symbols-outlined text-sm">check</span>
                    <span className="text-label-sm">200+ Campaigns</span>
                  </div>
                  <div className="inline-flex items-center gap-xs px-md py-sm bg-on-surface/10 rounded-full">
                    <span className="material-symbols-outlined text-sm">check</span>
                    <span className="text-label-sm">Real Data</span>
                  </div>
                  <div className="inline-flex items-center gap-xs px-md py-sm bg-on-surface/10 rounded-full">
                    <span className="material-symbols-outlined text-sm">check</span>
                    <span className="text-label-sm">Verified Results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-xxl px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-headline-lg font-headline-lg text-primary mb-lg">Ready to Optimize Your Strategy?</h3>
          <p className="text-body-md text-on-surface-variant mb-xxl">
            Join marketers using SalesPro AI to forecast sales and optimize advertising spend across channels
          </p>
          <Link href="/auth/signup">
            <Button variant="primary" size="lg" icon="rocket_launch" iconPosition="right">
              Get Started Free - No Credit Card Required
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-lg px-margin-mobile md:px-margin-desktop">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-lg mb-lg">
            <div>
              <h4 className="text-headline-md font-headline-md text-primary mb-md">SalesPro AI</h4>
              <p className="text-body-sm text-on-surface-variant">AI-powered sales forecasting for smarter marketing decisions</p>
            </div>
            <div>
              <h5 className="text-label-md font-semibold text-on-surface mb-md">Product</h5>
              <ul className="space-y-xs">
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-label-md font-semibold text-on-surface mb-md">Company</h5>
              <ul className="space-y-xs">
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-outline-variant pt-lg text-center">
            <p className="text-body-sm text-on-surface-variant mb-sm">
              Powered by Polynomial Regression ML Model | 93.55% Accuracy (R² Score)
            </p>
            <p className="text-label-sm text-on-surface-variant">© 2026 SalesPro AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
