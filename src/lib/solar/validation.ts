export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  sanitizedValue: number;
}

export function validatePositiveNumber(
  val: unknown,
  fallback: number = 0,
  fieldName: string = 'Value',
  max?: number
): ValidationResult {
  if (val === null || val === undefined || typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
    return { isValid: false, errorMessage: `${fieldName} must be a valid number`, sanitizedValue: fallback };
  }
  if (val < 0) {
    return { isValid: false, errorMessage: `${fieldName} cannot be negative`, sanitizedValue: fallback };
  }
  if (max !== undefined && val > max) {
    return { isValid: false, errorMessage: `${fieldName} cannot exceed ${max}`, sanitizedValue: max };
  }
  return { isValid: true, sanitizedValue: val };
}

export function validatePercentage(val: unknown, fallback: number = 80, min: number = 0, max: number = 100, fieldName: string = 'Percentage'): ValidationResult {
  const check = validatePositiveNumber(val, fallback, fieldName);
  if (!check.isValid) return check;
  if (check.sanitizedValue < min || check.sanitizedValue > max) {
    return {
      isValid: false,
      errorMessage: `${fieldName} must be between ${min}% and ${max}%`,
      sanitizedValue: Math.max(min, Math.min(max, check.sanitizedValue)),
    };
  }
  return { isValid: true, sanitizedValue: check.sanitizedValue };
}

export function sanitizeUsage(inputBillOrKwh: number, isBill: boolean, ratePerKwh: number): { monthlyKwh: number; derivedText?: string } {
  const safeRate = Math.max(0.001, ratePerKwh);
  const safeInput = Math.max(0, isNaN(inputBillOrKwh) ? 0 : inputBillOrKwh);

  if (isBill) {
    const derivedKwh = Math.round(safeInput / safeRate);
    return {
      monthlyKwh: derivedKwh,
      derivedText: `Estimated consumption derived from ${safeInput} monthly bill @ ${safeRate}/kWh = ${derivedKwh.toLocaleString()} kWh/month`,
    };
  }
  return { monthlyKwh: Math.round(safeInput) };
}
