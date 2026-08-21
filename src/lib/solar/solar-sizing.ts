import { DEFAULT_ASSUMPTIONS } from './assumptions';
import { validatePositiveNumber, validatePercentage } from './validation';

export interface SizingInputs {
  annualKwhUsage: number;
  peakSunHours: number;
  performanceRatio?: number; // e.g. 0.80
  targetOffsetPercent?: number; // e.g. 100%
}

export interface SizingOutputs {
  requiredSystemKw: number;
  annualProductionPerKw: number;
  dailyTargetKwh: number;
  performanceRatioUsed: number;
  peakSunHoursUsed: number;
}

export function calculateRequiredSystemSize(inputs: SizingInputs): SizingOutputs {
  const kwhCheck = validatePositiveNumber(inputs.annualKwhUsage, 10000, 'Annual Electricity Consumption');
  const pshCheck = validatePositiveNumber(inputs.peakSunHours, 4.5, 'Peak Sun Hours');
  const prCheck = validatePercentage(
    (inputs.performanceRatio ?? DEFAULT_ASSUMPTIONS.performanceRatio) * 100,
    80,
    10,
    100,
    'Performance Ratio'
  );

  const annualKwh = kwhCheck.sanitizedValue;
  const psh = Math.max(1, pshCheck.sanitizedValue);
  const pr = prCheck.sanitizedValue / 100;
  const offsetRatio = Math.max(0.1, (inputs.targetOffsetPercent ?? 100) / 100);

  // Annual kWh production generated per 1 kW system
  const annualProdPerKw = psh * DEFAULT_ASSUMPTIONS.daysPerYear * pr;

  // Required system size
  const rawKwNeeded = (annualKwh * offsetRatio) / Math.max(1, annualProdPerKw);
  const roundedKw = Math.max(0.5, Math.round(rawKwNeeded * 10) / 10);

  return {
    requiredSystemKw: roundedKw,
    annualProductionPerKw: Math.round(annualProdPerKw),
    dailyTargetKwh: Math.round(((annualKwh * offsetRatio) / DEFAULT_ASSUMPTIONS.daysPerYear) * 10) / 10,
    performanceRatioUsed: pr,
    peakSunHoursUsed: psh,
  };
}
