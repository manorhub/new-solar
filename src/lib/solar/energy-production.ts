import { DEFAULT_ASSUMPTIONS } from './assumptions';
import { validatePositiveNumber, validatePercentage } from './validation';

export interface EnergyProductionInputs {
  systemKw: number;
  peakSunHours: number;
  performanceRatio?: number; // default 0.80
}

export interface EnergyProductionOutputs {
  dailyKwh: number;
  monthlyKwhAverage: number;
  annualKwh: number;
  performanceRatioUsed: number;
}

export function calculateEnergyProduction(inputs: EnergyProductionInputs): EnergyProductionOutputs {
  const kwCheck = validatePositiveNumber(inputs.systemKw, 6.6, 'System Capacity');
  const pshCheck = validatePositiveNumber(inputs.peakSunHours, 4.8, 'Peak Sun Hours');
  const prCheck = validatePercentage(
    (inputs.performanceRatio ?? DEFAULT_ASSUMPTIONS.performanceRatio) * 100,
    80,
    10,
    100,
    'Performance Ratio'
  );

  const kw = Math.max(0.1, kwCheck.sanitizedValue);
  const psh = Math.max(0.5, pshCheck.sanitizedValue);
  const pr = prCheck.sanitizedValue / 100;

  const dailyKwh = kw * psh * pr;
  const annualKwh = dailyKwh * DEFAULT_ASSUMPTIONS.daysPerYear;
  const monthlyKwhAverage = annualKwh / 12;

  return {
    dailyKwh: Math.round(dailyKwh * 10) / 10,
    monthlyKwhAverage: Math.round(monthlyKwhAverage),
    annualKwh: Math.round(annualKwh),
    performanceRatioUsed: pr,
  };
}
