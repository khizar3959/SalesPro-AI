// Polynomial Regression Model for Sales Prediction
// Trained on advertising dataset with 93.55% accuracy (R² score)

export interface PredictionInput {
  TV: number
  Radio: number
  Newspaper: number
}

export interface PredictionResult {
  sales: number
  confidence: number
  roundedSales: string
}

// Model coefficients trained on advertising data
const MODEL_DATA = {
  type: 'polynomial',
  degree: 2,
  coefficients: [
    0.0761805701825886,
    -0.037179442495023224,
    -0.009997573480075617,
    -0.00011053289100084601,
    0.0004240132621749445,
    -9.138908878510328e-06,
    0.0017030553925400684,
    0.00014028537875743013,
    0.00011542045553973118,
  ],
  intercept: 5.288596308377739,
  r2_score: 0.9355054136573707,
  feature_names: [
    'TV',
    'Radio',
    'Newspaper',
    'TV^2',
    'TV Radio',
    'TV Newspaper',
    'Radio^2',
    'Radio Newspaper',
    'Newspaper^2',
  ],
}

// Main prediction function
export function predictSales(input: PredictionInput): PredictionResult {
  const { TV, Radio, Newspaper } = input

  // Validate inputs
  if (TV < 0 || Radio < 0 || Newspaper < 0) {
    throw new Error('Budget values cannot be negative')
  }

  // Create polynomial features (degree 2)
  const features = [
    TV,
    Radio,
    Newspaper,
    TV * TV, // TV^2
    TV * Radio, // TV * Radio
    TV * Newspaper, // TV * Newspaper
    Radio * Radio, // Radio^2
    Radio * Newspaper, // Radio * Newspaper
    Newspaper * Newspaper, // Newspaper^2
  ]

  // Calculate prediction: intercept + sum(coefficients * features)
  let prediction = MODEL_DATA.intercept

  for (let i = 0; i < features.length; i++) {
    prediction += MODEL_DATA.coefficients[i] * features[i]
  }

  // Ensure non-negative prediction
  const sales = Math.max(0, prediction)
  const roundedSales = (Math.round(sales * 100) / 100).toFixed(2)

  return {
    sales,
    confidence: MODEL_DATA.r2_score,
    roundedSales,
  }
}

// Get model information
export function getModelInfo() {
  return {
    type: MODEL_DATA.type,
    degree: MODEL_DATA.degree,
    r2Score: MODEL_DATA.r2_score,
    accuracy: `${(MODEL_DATA.r2_score * 100).toFixed(2)}%`,
    features: MODEL_DATA.feature_names,
    trainingDataSize: 200,
  }
}

// Format prediction for display
export function formatPrediction(sales: number): string {
  return `${sales.toFixed(2)}K`
}

// Get insight message based on prediction
export function getInsightMessage(sales: number): string {
  if (sales > 20) {
    return 'Strong predicted performance! Consider scaling up your investment.'
  } else if (sales > 15) {
    return 'Good predicted performance. Your advertising strategy looks solid.'
  } else if (sales > 10) {
    return 'Moderate predicted performance. Room for optimization.'
  } else if (sales > 5) {
    return 'Conservative projection. Consider adjusting your strategy.'
  } else {
    return 'Low predicted performance. Review your advertising channels.'
  }
}

// Validate input ranges
export function validateInput(input: PredictionInput): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (input.TV < 0 || input.TV > 300) {
    errors.push('TV budget should be between 0-300')
  }

  if (input.Radio < 0 || input.Radio > 50) {
    errors.push('Radio budget should be between 0-50')
  }

  if (input.Newspaper < 0 || input.Newspaper > 114) {
    errors.push('Newspaper budget should be between 0-114')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
