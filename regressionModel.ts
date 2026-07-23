import modelData from './model.json';

export function predict(TV: number, Radio: number, Newspaper: number): number {
  const features = [
    TV,
    Radio,
    Newspaper,
    TV * TV,
    TV * Radio,
    TV * Newspaper,
    Radio * Radio,
    Radio * Newspaper,
    Newspaper * Newspaper,
  ];

  let result = modelData.intercept;
  for (let i = 0; i < features.length; i++) {
    result += modelData.coefficients[i] * features[i];
  }

  return Math.max(0, Math.round(result * 100) / 100);
}
