import type { SavingsCalculationOutputs } from './savingsEngine';

export interface PaybackCalculationInputs {
  netInvestmentCost: number;
  savingsData: SavingsCalculationOutputs;
}

export interface PaybackCalculationOutputs {
  paybackYears: number;
  paybackMonths: number;
  paybackPeriodText: string;
  roiPercent: number; // 25-year ROI
  annualizedRoiPercent: number;
  breakEvenYear: number;
  breakEvenMonth: number;
}

export function calculatePayback(inputs: PaybackCalculationInputs): PaybackCalculationOutputs {
  const cost = inputs.netInvestmentCost;
  if (cost <= 0) {
    return {
      paybackYears: 0,
      paybackMonths: 0,
      paybackPeriodText: 'Immediate (0 years)',
      roiPercent: 1000,
      annualizedRoiPercent: 100,
      breakEvenYear: 0,
      breakEvenMonth: 0,
    };
  }

  let cumulative = 0;
  let exactPaybackYear = 25;
  let breakEvenFound = false;
  let bYear = 25;
  let bMonth = 0;

  for (const item of inputs.savingsData.yearlyBreakdown) {
    const prevCumulative = cumulative;
    cumulative += item.annualSavings;

    if (!breakEvenFound && cumulative >= cost) {
      const remainingCost = cost - prevCumulative;
      const fraction = remainingCost / item.annualSavings;
      exactPaybackYear = (item.year - 1) + fraction;
      bYear = item.year;
      bMonth = Math.round(fraction * 12);
      breakEvenFound = true;
    }
  }

  const years = Math.floor(exactPaybackYear);
  const months = Math.round((exactPaybackYear - years) * 12);

  const paybackPeriodText = `${years} yrs ${months > 0 ? `${months} mos` : ''}`;

  const total25YrSavings = inputs.savingsData.cumulative25YrSavings;
  const netProfit = total25YrSavings - cost;
  const roiPercent = Math.round((netProfit / cost) * 100);
  const annualizedRoi = Math.round((Math.pow(1 + netProfit / cost, 1 / 25) - 1) * 100 * 10) / 10;

  return {
    paybackYears: years,
    paybackMonths: months,
    paybackPeriodText,
    roiPercent,
    annualizedRoiPercent: Math.max(0, annualizedRoi),
    breakEvenYear: bYear,
    breakEvenMonth: bMonth,
  };
}
