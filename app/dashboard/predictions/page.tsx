'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { predictSales, validateInput, getInsightMessage, formatPrediction, getModelInfo } from '@/lib/regressionModel'
import { savePrediction } from '@/lib/storage'
import { Button, Input, Card, CardContent, CardTitle, Alert, Badge } from '@/components'

interface PredictionResult {
  sales: number
  confidence: number
  roundedSales: string
  insight: string
}

export default function PredictionsPage() {
  const router = useRouter()
  const [tv, setTv] = useState('')
  const [radio, setRadio] = useState('')
  const [newspaper, setNewspaper] = useState('')
  const [notes, setNotes] = useState('')

  const [result, setResult] = useState<PredictionResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const modelInfo = getModelInfo()

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setError('')
    setSuccess('')

    // Parse inputs
    const tvNum = parseFloat(tv)
    const radioNum = parseFloat(radio)
    const newspaperNum = parseFloat(newspaper)

    // Validate
    const validation = validateInput({ TV: tvNum, Radio: radioNum, Newspaper: newspaperNum })
    if (!validation.valid) {
      const errorMap: Record<string, string> = {}
      validation.errors.forEach((err) => {
        if (err.includes('TV')) errorMap.tv = 'Invalid TV budget'
        if (err.includes('Radio')) errorMap.radio = 'Invalid Radio budget'
        if (err.includes('Newspaper')) errorMap.newspaper = 'Invalid Newspaper budget'
      })
      setErrors(errorMap)
      return
    }

    setLoading(true)

    try {
      // Make prediction
      const prediction = predictSales({
        TV: tvNum,
        Radio: radioNum,
        Newspaper: newspaperNum,
      })

      const insight = getInsightMessage(prediction.sales)

      setResult({
        sales: prediction.sales,
        confidence: prediction.confidence,
        roundedSales: prediction.roundedSales,
        insight,
      })

      // Auto-scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (err) {
      setError('Failed to generate prediction')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!result) return

    setLoading(true)
    try {
      savePrediction({
        tv: parseFloat(tv),
        radio: parseFloat(radio),
        newspaper: parseFloat(newspaper),
        predictedSales: result.sales,
        notes: notes || undefined,
      })

      setSuccess('Prediction saved to history!')
      setTimeout(() => {
        router.push('/dashboard/history')
      }, 1500)
    } catch (err) {
      setError('Failed to save prediction')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setTv('')
    setRadio('')
    setNewspaper('')
    setNotes('')
    setResult(null)
    setErrors({})
    setError('')
    setSuccess('')
  }

  return (
    <div className="p-margin-mobile md:p-margin-desktop">
      {/* Header */}
      <div className="mb-xxl">
        <h1 className="text-headline-lg font-headline-lg text-on-surface mb-md">Prediction Tool</h1>
        <p className="text-body-sm text-on-surface-variant">
          Enter your advertising budgets to generate a sales forecast with {modelInfo.accuracy} accuracy
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-xxl">
        {/* Input Form */}
        <div>
          <Card padding="lg">
            <CardTitle className="mb-lg">Enter Your Budgets</CardTitle>

            {error && (
              <Alert variant="error" title="Error" onClose={() => setError('')} className="mb-lg">
                {error}
              </Alert>
            )}

            <form onSubmit={handlePredict} className="space-y-lg">
              {/* TV Budget */}
              <Input
                label="TV Advertising Budget"
                type="number"
                placeholder="0"
                value={tv}
                onChange={(e) => {
                  setTv(e.target.value)
                  if (errors.tv) setErrors({ ...errors, tv: '' })
                }}
                error={errors.tv}
                helperText="Budget in thousands (0-300)"
                icon="tv"
              />

              {/* Radio Budget */}
              <Input
                label="Radio Advertising Budget"
                type="number"
                placeholder="0"
                value={radio}
                onChange={(e) => {
                  setRadio(e.target.value)
                  if (errors.radio) setErrors({ ...errors, radio: '' })
                }}
                error={errors.radio}
                helperText="Budget in thousands (0-50)"
                icon="radio"
              />

              {/* Newspaper Budget */}
              <Input
                label="Newspaper Advertising Budget"
                type="number"
                placeholder="0"
                value={newspaper}
                onChange={(e) => {
                  setNewspaper(e.target.value)
                  if (errors.newspaper) setErrors({ ...errors, newspaper: '' })
                }}
                error={errors.newspaper}
                helperText="Budget in thousands (0-114)"
                icon="newspaper"
              />

              {/* Buttons */}
              <div className="flex gap-md pt-md">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  loading={loading}
                  disabled={loading || (!tv && !radio && !newspaper)}
                  icon="calculate"
                  iconPosition="right"
                >
                  {loading ? 'Predicting...' : 'Predict Sales'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleReset}
                  disabled={!tv && !radio && !newspaper && !result}
                >
                  Reset
                </Button>
              </div>
            </form>

            {/* Tips */}
            <Alert variant="info" title="💡 Tip" className="mt-lg">
              TV and Radio typically have stronger impact on sales. Experiment with different combinations to find optimal allocation.
            </Alert>
          </Card>
        </div>

        {/* Results Area */}
        <div id="results">
          {result ? (
            <div className="space-y-lg">
              {/* Main Result Card */}
              <Card padding="lg" className="border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/5 prediction-fade-in">
                <div className="text-center mb-lg">
                  <p className="text-label-sm text-on-surface-variant mb-md">PREDICTED SALES</p>
                  <div className="text-6xl font-bold text-primary mb-md">{formatPrediction(result.sales)}</div>
                  <Badge variant="primary" size="md" className="justify-center w-full">
                    <span className="material-symbols-outlined text-sm mr-sm">verified</span>
                    {modelInfo.accuracy} Model Accuracy
                  </Badge>
                </div>

                {/* Insight */}
                <Alert variant="success" title="Insight" className="mt-lg">
                  {result.insight}
                </Alert>
              </Card>

              {/* Input Summary */}
              <Card padding="lg">
                <CardTitle className="text-headline-md mb-lg">Budget Summary</CardTitle>
                <div className="grid grid-cols-3 gap-md">
                  <div className="text-center p-md bg-surface-container-high rounded-lg">
                    <p className="text-label-sm text-on-surface-variant mb-sm">TV</p>
                    <p className="text-headline-md font-bold text-primary">${tv}K</p>
                  </div>
                  <div className="text-center p-md bg-surface-container-high rounded-lg">
                    <p className="text-label-sm text-on-surface-variant mb-sm">Radio</p>
                    <p className="text-headline-md font-bold text-secondary">${radio}K</p>
                  </div>
                  <div className="text-center p-md bg-surface-container-high rounded-lg">
                    <p className="text-label-sm text-on-surface-variant mb-sm">Newspaper</p>
                    <p className="text-headline-md font-bold text-tertiary">${newspaper}K</p>
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <div>
                <label className="text-label-md font-label-md text-on-surface block mb-sm">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this prediction..."
                  className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  rows={3}
                />
              </div>

              {/* Save Button */}
              {success ? (
                <Alert variant="success" title="Saved!" className="text-center py-lg">
                  {success}
                </Alert>
              ) : (
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleSave}
                  loading={loading}
                  disabled={loading}
                  icon="save"
                  iconPosition="right"
                >
                  Save to History
                </Button>
              )}
            </div>
          ) : (
            <Card padding="lg" className="border-outline-variant/50 h-full flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 block mb-lg">
                  calculate
                </span>
                <p className="text-body-md text-on-surface-variant">
                  Enter your budgets and click "Predict Sales" to see the forecast
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-xxl grid md:grid-cols-3 gap-lg">
        <Card padding="lg">
          <CardTitle className="text-headline-md mb-md">Model Accuracy</CardTitle>
          <div className="text-4xl font-bold text-primary mb-md">{modelInfo.accuracy}</div>
          <p className="text-body-sm text-on-surface-variant">
            Polynomial regression trained on {modelInfo.trainingDataSize}+ real campaigns
          </p>
        </Card>

        <Card padding="lg">
          <CardTitle className="text-headline-md mb-md">Quick Tips</CardTitle>
          <ul className="text-body-sm text-on-surface-variant space-y-sm">
            <li>✓ All budgets in thousands</li>
            <li>✓ Results are instant</li>
            <li>✓ Save to history for tracking</li>
          </ul>
        </Card>

        <Card padding="lg">
          <CardTitle className="text-headline-md mb-md">Budget Ranges</CardTitle>
          <ul className="text-body-sm text-on-surface-variant space-y-sm">
            <li>📺 TV: 0-300K</li>
            <li>📻 Radio: 0-50K</li>
            <li>📰 Newspaper: 0-114K</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
