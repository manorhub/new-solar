export interface SavingsCalculationInputs {
  annualGenerationKwh: number;
  electricityRate: number; // cost per kWh
  electricityEscalationPercent: number; // e.g. 3.5% per year
  panelDegradationPercent: number; // e.g. 0.5% per year
  netInvestmentCost: number;
}

export interface YearSavingsData {
  year: number;
  electricityRate: number;
  annualGenerationKwh: number;
  annualSavings: number;
  cumulativeSavings: number;
  netCashFlow: number; // cumulative savings - net investment cost
}

export interface SavingsCalculationOutputs {
  year1Savings: number;
  year10Savings: number;
  year20Savings: number;
  year25Savings: number;
  cumulative10YrSavings: number;
  cumulative20YrSavings: number;
  cumulative25YrSavings: number;
  net25YrProfit: number;
  yearlyBreakdown: YearSavingsData[];
}

export function calculateSavings(inputs: SavingsCalculationInputs): SavingsCalculationOutputs {
  const yearlyBreakdown: YearSavingsData[] = [];
  let currentRate = inputs.electricityRate;
  let currentGeneration = inputs.annualGenerationKwh;
  let cumulativeSavings = 0;

  for (let year = 1; year <= 25; year++) {
    const annualSavings = currentGeneration * currentRate;
    cumulativeSavings += annualSavings;

    yearlyBreakdown.push({
      year,
      electricityRate: Math.round(currentRate * 1000) / 1000,
      annualGenerationKwh: Math.round(currentGeneration),
      annualSavings: Math.round(annualSavings),
      cumulativeSavings: Math.round(cumulativeSavings),
      netCashFlow: Math.round(cumulativeSavings - inputs.netInvestmentCost),
    });

    // Escalate electricity prices and degrade panels for next year
    currentRate *= (1 + (inputs.electricityEscalationPercent / 100));
    currentGeneration *= (1 - (inputs.panelDegradationPercent / 100));
  }

  const y1 = yearlyBreakdown[0]?.annualSavings ?? 0;
  const y10 = yearlyBreakdown[9]?.annualSavings ?? 0;
  const y20 = yearlyBreakdown[19]?.annualSavings ?? 0;
  const y25 = yearlyBreakdown[24]?.annualSavings ?? 0;

  const cum10 = yearlyBreakdown[9]?.cumulativeSavings ?? 0;
  const cum20 = yearlyBreakdown[19]?.cumulativeSavings ?? 0;
  const cum25 = yearlyBreakdown[24]?.cumulativeSavings ?? 0;

  return {
    year1Savings: Math.round(y1),
    year10Savings: Math.round(y10),
    year20Savings: Math.round(y20),
    year25Savings: Math.round(y25),
    cumulative10YrSavings: Math.round(cum10),
    cumulative20YrSavings: Math.round(cum20),
    cumulative25YrSavings: Math.round(cum25),
    net25YrProfit: Math.round(cum25 - inputs.netInvestmentCost),
    yearlyBreakdown,
  };
}
