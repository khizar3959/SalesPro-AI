// Storage keys and utilities
export const StorageKeys = {
  CURRENT_USER: 'salespro_current_user',
  IS_AUTHENTICATED: 'salespro_is_authenticated',
  PREDICTIONS: 'salespro_predictions',
  USERS: 'users',
} as const

export interface Prediction {
  id: string
  tv: number
  radio: number
  newspaper: number
  predictedSales: number
  createdAt: string
  notes?: string
}

// Save a prediction
export function savePrediction(prediction: Omit<Prediction, 'id' | 'createdAt'>): Prediction {
  try {
    const predictions = getPredictions()

    const newPrediction: Prediction = {
      ...prediction,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }

    predictions.push(newPrediction)
    localStorage.setItem(StorageKeys.PREDICTIONS, JSON.stringify(predictions))

    return newPrediction
  } catch (error) {
    console.error('Failed to save prediction:', error)
    throw error
  }
}

// Get all predictions
export function getPredictions(): Prediction[] {
  try {
    const predictionsJson = localStorage.getItem(StorageKeys.PREDICTIONS)
    return predictionsJson ? JSON.parse(predictionsJson) : []
  } catch (error) {
    console.error('Failed to get predictions:', error)
    return []
  }
}

// Delete a prediction
export function deletePrediction(id: string): boolean {
  try {
    const predictions = getPredictions()
    const filtered = predictions.filter(p => p.id !== id)
    localStorage.setItem(StorageKeys.PREDICTIONS, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Failed to delete prediction:', error)
    return false
  }
}

// Clear all predictions
export function clearAllPredictions(): void {
  try {
    localStorage.setItem(StorageKeys.PREDICTIONS, JSON.stringify([]))
  } catch (error) {
    console.error('Failed to clear predictions:', error)
  }
}

// Export predictions as CSV
export function exportPredictionsAsCSV(): string {
  const predictions = getPredictions()

  if (predictions.length === 0) {
    return 'No predictions to export'
  }

  const headers = ['Date', 'TV Budget', 'Radio Budget', 'Newspaper Budget', 'Predicted Sales', 'Notes']
  const rows = predictions.map(p => [
    new Date(p.createdAt).toLocaleString(),
    p.tv,
    p.radio,
    p.newspaper,
    p.predictedSales.toFixed(2),
    p.notes || '',
  ])

  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')

  return csv
}

// Get prediction statistics
export function getPredictionStats() {
  const predictions = getPredictions()

  if (predictions.length === 0) {
    return {
      total: 0,
      average: 0,
      highest: 0,
      lowest: 0,
    }
  }

  const sales = predictions.map(p => p.predictedSales)

  return {
    total: predictions.length,
    average: Math.round((sales.reduce((a, b) => a + b, 0) / sales.length) * 100) / 100,
    highest: Math.max(...sales),
    lowest: Math.min(...sales),
  }
}
