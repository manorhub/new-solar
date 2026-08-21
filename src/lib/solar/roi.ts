import type { SavingsOutputs } from './savings';
import { validatePositiveNumber } from './validation';

export type RoiTimelineYears = 10 | 20 | 25;

export interface RoiInputs {
  initialInvestmentCost: number;
  savingsData: SavingsOutputs;
  selectedTimelineYears?: RoiTimelineYears;
}

export interface RoiOutputs {
  initialInvestmentCost: number;
  totalSavings: number;
  netGain: number; // total savings - initial investment
  roiPercent: number;
  annualizedRoiPercent: number;
  selectedTimelineYears: RoiTimelineYears;
}

export function calculateSolarRoi(inputs: RoiInputs): RoiOutputs {
  const costCheck = validatePositiveNumber(inputs.initialInvestmentCost, 10000, 'Initial Investment');
  const cost = costCheck.sanitizedValue;
  const years = inputs.selectedTimelineYears ?? 25;

  let totalSavings = 0;
  if (years === 10) totalSavings = inputs.savingsData.savings10Year;
  else if (years === 20) totalSavings = inputs.savingsData.savings20Year;
  else totalSavings = inputs.savingsData.savings25Year;

  if (cost <= 0) {
    return {
      initialInvestmentCost: 0,
      totalSavings: Math.round(totalSavings),
      netGain: Math.round(totalSavings),
      roiPercent: 1000,
      annualizedRoiPercent: 100,
      selectedTimelineYears: years,
    };
  }

  const netGain = totalSavings - cost;
  const roiPercent = Math.round((netGain / cost) * 100);
  const annualizedRoi = Math.round((Math.pow(Math.max(0, 1 + netGain / cost), 1 / years) - 1) * 100 * 10) / 10;

  return {
    initialInvestmentCost: Math.round(cost),
    totalSavings: Math.round(totalSavings),
    netGain: Math.round(netGain),
    roiPercent,
    annualizedRoiPercent: Math.max(0, annualizedRoi),
    selectedTimelineYears: years,
  };
}
