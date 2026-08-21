import type { SavingsOutputs } from './savings';
import { validatePositiveNumber } from './validation';

export interface PaybackInputs {
  netInvestmentCost: number;
  savingsData: SavingsOutputs;
}

export interface PaybackTimelineStep {
  year: number;
  label: string;
  annualSavings: number;
  cumulativeSavings: number;
  netCashFlow: number;
  isBreakEven: boolean;
}

export interface PaybackOutputs {
  simplePaybackYears: number;
  exactPaybackYears: number;
  paybackFormattedText: string;
  breakEvenYear: number;
  breakEvenMonth: number;
  timelineSteps: PaybackTimelineStep[];
}

export function calculatePaybackTimeline(inputs: PaybackInputs): PaybackOutputs {
  const costCheck = validatePositiveNumber(inputs.netInvestmentCost, 10000, 'Net Investment Cost');
  const cost = costCheck.sanitizedValue;

  if (cost <= 0) {
    return {
      simplePaybackYears: 0,
      exactPaybackYears: 0,
      paybackFormattedText: 'Immediate (0.0 years)',
      breakEvenYear: 0,
      breakEvenMonth: 0,
      timelineSteps: [],
    };
  }

  const timelineSteps: PaybackTimelineStep[] = [];
  let cumulative = 0;
  let exactYears = 25;
  let breakEvenFound = false;
  let bYear = 25;
  let bMonth = 0;

  // Initial Year 0 Investment Step
  timelineSteps.push({
    year: 0,
    label: 'Year 0 (Initial Outlay)',
    annualSavings: 0,
    cumulativeSavings: 0,
    netCashFlow: -cost,
    isBreakEven: false,
  });

  for (const item of inputs.savingsData.yearlyComparison) {
    const prevCumulative = cumulative;
    cumulative += item.annualSavings;
    const isBreakEvenThisYear = !breakEvenFound && cumulative >= cost;

    if (isBreakEvenThisYear) {
      const remainingCost = cost - prevCumulative;
      const fraction = remainingCost / Math.max(1, item.annualSavings);
      exactYears = (item.year - 1) + fraction;
      bYear = item.year;
      bMonth = Math.round(fraction * 12);
      breakEvenFound = true;
    }

    timelineSteps.push({
      year: item.year,
      label: `Year ${item.year}`,
      annualSavings: item.annualSavings,
      cumulativeSavings: item.cumulativeSavings,
      netCashFlow: item.cumulativeNetProfit,
      isBreakEven: isBreakEvenThisYear,
    });
  }

  const roundedYears = Math.round(exactYears * 10) / 10;
  const paybackFormattedText = `${Math.floor(exactYears)} yrs ${bMonth > 0 ? `${bMonth} mos` : ''}`;

  return {
    simplePaybackYears: roundedYears,
    exactPaybackYears: Math.round(exactYears * 100) / 100,
    paybackFormattedText,
    breakEvenYear: bYear,
    breakEvenMonth: bMonth,
    timelineSteps,
  };
}
