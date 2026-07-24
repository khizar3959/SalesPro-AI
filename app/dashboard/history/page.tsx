'use client'

import { useEffect, useState } from 'react'
import { getPredictions, deletePrediction, clearAllPredictions, exportPredictionsAsCSV, getPredictionStats } from '@/lib/storage'
import { Button, Card, Badge, ConfirmModal } from '@/components'
import type { Prediction } from '@/lib/storage'

export default function HistoryPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [sortBy, setSortBy] = useState<'latest' | 'highest' | 'lowest'>('latest')
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [stats, setStats] = useState({ total: 0, average: 0, highest: 0, lowest: 0 })

  useEffect(() => {
    loadPredictions()
  }, [sortBy])

  const loadPredictions = () => {
    const allPredictions = getPredictions()
    let sorted = [...allPredictions]

    if (sortBy === 'latest') {
      sorted.reverse()
    } else if (sortBy === 'highest') {
      sorted.sort((a, b) => b.predictedSales - a.predictedSales)
    } else if (sortBy === 'lowest') {
      sorted.sort((a, b) => a.predictedSales - b.predictedSales)
    }

    setPredictions(sorted)
    setStats(getPredictionStats())
  }

  const handleDelete = (prediction: Prediction) => {
    setSelectedPrediction(prediction)
    setDeletingId(prediction.id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (deletingId && deletePrediction(deletingId)) {
      setShowDeleteConfirm(false)
      setDeletingId(null)
      setSelectedPrediction(null)
      loadPredictions()
    }
  }

  const handleClearAll = () => {
    setShowClearConfirm(true)
  }

  const confirmClearAll = () => {
    clearAllPredictions()
    setShowClearConfirm(false)
    loadPredictions()
  }

  const handleExport = () => {
    const csv = exportPredictionsAsCSV()
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
    element.setAttribute('download', `predictions_${new Date().toISOString().split('T')[0]}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="p-margin-mobile md:p-margin-desktop">
      {/* Header */}
      <div className="mb-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-lg mb-md">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-md">Prediction History</h1>
            <p className="text-body-sm text-on-surface-variant">
              View and manage all your saved predictions
            </p>
          </div>

          <div className="flex gap-md w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="flex-1 md:flex-none px-md py-sm bg-surface-container border border-outline-variant rounded-lg text-on-surface text-label-md cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="highest">Highest Sales</option>
              <option value="lowest">Lowest Sales</option>
            </select>

            {predictions.length > 0 && (
              <Button variant="secondary" size="md" icon="download" onClick={handleExport}>
                Export
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {predictions.length > 0 && (
        <div className="grid md:grid-cols-4 gap-lg mb-xxl">
          <Card padding="lg">
            <p className="text-label-sm text-on-surface-variant mb-md font-semibold">Total Predictions</p>
            <p className="text-4xl font-bold text-primary">{stats.total}</p>
          </Card>

          <Card padding="lg">
            <p className="text-label-sm text-on-surface-variant mb-md font-semibold">Average Sales</p>
            <p className="text-4xl font-bold text-secondary">${stats.average}K</p>
          </Card>

          <Card padding="lg">
            <p className="text-label-sm text-on-surface-variant mb-md font-semibold">Best Prediction</p>
            <p className="text-4xl font-bold text-tertiary">${stats.highest}K</p>
          </Card>

          <Card padding="lg">
            <p className="text-label-sm text-on-surface-variant mb-md font-semibold">Lowest Prediction</p>
            <p className="text-4xl font-bold text-on-surface-variant">${stats.lowest}K</p>
          </Card>
        </div>
      )}

      {/* Predictions Table */}
      {predictions.length > 0 ? (
        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-body-sm">
              <thead className="bg-surface-container-high border-b border-outline-variant">
                <tr>
                  <th className="px-lg py-md text-left font-semibold text-on-surface-variant">Date</th>
                  <th className="px-lg py-md text-left font-semibold text-on-surface-variant">TV</th>
                  <th className="px-lg py-md text-left font-semibold text-on-surface-variant">Radio</th>
                  <th className="px-lg py-md text-left font-semibold text-on-surface-variant">Newspaper</th>
                  <th className="px-lg py-md text-left font-semibold text-primary">Sales</th>
                  <th className="px-lg py-md text-left font-semibold text-on-surface-variant">Notes</th>
                  <th className="px-lg py-md text-center font-semibold text-on-surface-variant">Actions</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((prediction) => (
                  <tr
                    key={prediction.id}
                    className="border-b border-outline-variant hover:bg-surface-container-high transition-colors"
                  >
                    <td className="px-lg py-md text-on-surface-variant text-label-sm">
                      {new Date(prediction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-lg py-md text-on-surface font-semibold">${prediction.tv}K</td>
                    <td className="px-lg py-md text-on-surface font-semibold">${prediction.radio}K</td>
                    <td className="px-lg py-md text-on-surface font-semibold">${prediction.newspaper}K</td>
                    <td className="px-lg py-md">
                      <Badge variant="primary" size="md">
                        ${prediction.predictedSales.toFixed(2)}K
                      </Badge>
                    </td>
                    <td className="px-lg py-md text-on-surface-variant text-label-sm max-w-xs truncate">
                      {prediction.notes || '—'}
                    </td>
                    <td className="px-lg py-md text-center">
                      <div className="flex gap-sm justify-center">
                        <button
                          onClick={() => setSelectedPrediction(prediction)}
                          className="p-sm hover:bg-surface-container-high rounded transition-colors"
                          title="View details"
                        >
                          <span className="material-symbols-outlined text-sm text-primary">info</span>
                        </button>
                        <button
                          onClick={() => handleDelete(prediction)}
                          className="p-sm hover:bg-error/10 rounded transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-sm text-error">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Clear All Button */}
          {predictions.length > 0 && (
            <div className="p-lg border-t border-outline-variant flex justify-end gap-md">
              <Button variant="error" size="md" onClick={handleClearAll} icon="delete_sweep">
                Clear All
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <Card padding="lg" className="text-center border-2 border-dashed border-outline-variant">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 block mb-lg">
            history
          </span>
          <h3 className="text-headline-md font-headline-md mb-md text-on-surface">No predictions yet</h3>
          <p className="text-body-sm text-on-surface-variant mb-lg">
            Create your first prediction to start building your history
          </p>
        </Card>
      )}

      {/* Details Modal */}
      {selectedPrediction && !showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-margin-mobile"
          onClick={() => setSelectedPrediction(null)}
        >
          <Card
            padding="lg"
            className="max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-lg">
              <h2 className="text-headline-md font-headline-md text-on-surface">Prediction Details</h2>
              <button
                onClick={() => setSelectedPrediction(null)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-md mb-lg">
              <div className="p-md bg-surface-container-high rounded-lg">
                <p className="text-label-sm text-on-surface-variant mb-sm">Date</p>
                <p className="text-body-md font-semibold text-on-surface">
                  {new Date(selectedPrediction.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-md">
                <div className="p-md bg-surface-container-high rounded-lg text-center">
                  <p className="text-label-sm text-on-surface-variant mb-sm">TV</p>
                  <p className="text-headline-md font-bold text-primary">${selectedPrediction.tv}K</p>
                </div>
                <div className="p-md bg-surface-container-high rounded-lg text-center">
                  <p className="text-label-sm text-on-surface-variant mb-sm">Radio</p>
                  <p className="text-headline-md font-bold text-secondary">${selectedPrediction.radio}K</p>
                </div>
                <div className="p-md bg-surface-container-high rounded-lg text-center">
                  <p className="text-label-sm text-on-surface-variant mb-sm">Newspaper</p>
                  <p className="text-headline-md font-bold text-tertiary">${selectedPrediction.newspaper}K</p>
                </div>
              </div>

              <div className="p-md bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg">
                <p className="text-label-sm text-on-surface-variant mb-sm">Predicted Sales</p>
                <p className="text-headline-lg font-bold text-primary">${selectedPrediction.predictedSales.toFixed(2)}K</p>
              </div>

              {selectedPrediction.notes && (
                <div className="p-md bg-surface-container-high rounded-lg">
                  <p className="text-label-sm text-on-surface-variant mb-sm">Notes</p>
                  <p className="text-body-sm text-on-surface">{selectedPrediction.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-md">
              <Button
                variant="error"
                fullWidth
                onClick={() => {
                  setShowDeleteConfirm(true)
                }}
              >
                Delete
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => setSelectedPrediction(null)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteConfirm(false)
          setDeletingId(null)
          setSelectedPrediction(null)
        }}
        title="Delete Prediction?"
        message={`This prediction (${selectedPrediction?.predictedSales.toFixed(2)}K sales) will be permanently deleted.`}
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
      />

      {/* Clear All Confirmation Modal */}
      <ConfirmModal
        isOpen={showClearConfirm}
        onConfirm={confirmClearAll}
        onCancel={() => setShowClearConfirm(false)}
        title="Clear All Predictions?"
        message="This will permanently delete all your predictions. This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        danger={true}
      />
    </div>
  )
}
