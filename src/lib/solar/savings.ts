import { DEFAULT_ASSUMPTIONS } from './assumptions';
import { validatePositiveNumber, validatePercentage } from './validation';

export interface SavingsInputs {
  annualConsumptionKwh: number;
  electricityRate: number; // local currency / kWh
  annualSolarProductionKwh: number;
  electricityPriceEscalationPercent?: number; // e.g. 3.5%
  panelDegradationPercent?: number; // e.g. 0.5%
  netSolarInvestmentCost: number;
}

export interface YearFinancialComparison {
  year: number;
  withoutSolarCost: number;
  withSolarCost: number;
  annualSavings: number;
  cumulativeSavings: number;
  cumulativeNetProfit: number; // cumulative savings - net investment
}

export interface SavingsOutputs {
  monthlySavingsYear1: number;
  annualSavingsYear1: number;
  savings10Year: number;
  savings20Year: number;
  savings25Year: number;
  totalWithoutSolar25YearCost: number;
  net25YearProfit: number;
  yearlyComparison: YearFinancialComparison[];
}

export function calculateFinancialSavings(inputs: SavingsInputs): SavingsOutputs {
  const consCheck = validatePositiveNumber(inputs.annualConsumptionKwh, 10000, 'Annual Consumption');
  const rateCheck = validatePositiveNumber(inputs.electricityRate, 0.20, 'Electricity Rate');
  const prodCheck = validatePositiveNumber(inputs.annualSolarProductionKwh, 8500, 'Solar Production');
  const escCheck = validatePercentage(inputs.electricityPriceEscalationPercent ?? DEFAULT_ASSUMPTIONS.utilityEscalationPercent, 3.5, 0, 20, 'Utility Escalation');
  const degCheck = validatePercentage(inputs.panelDegradationPercent ?? DEFAULT_ASSUMPTIONS.panelDegradationPercent, 0.5, 0, 5, 'Panel Degradation');
  const costCheck = validatePositiveNumber(inputs.netSolarInvestmentCost, 12000, 'Net Investment Cost');

  const annualCons = consCheck.sanitizedValue;
  const initialRate = rateCheck.sanitizedValue;
  const initialProd = prodCheck.sanitizedValue;
  const escalation = escCheck.sanitizedValue / 100;
  const degradation = degCheck.sanitizedValue / 100;
  const netCost = costCheck.sanitizedValue;

  const yearlyComparison: YearFinancialComparison[] = [];
  let currentRate = initialRate;
  let currentProd = initialProd;
  let cumulativeSavings = 0;
  let totalWithoutSolarCost = 0;

  for (let year = 1; year <= 25; year++) {
    const withoutSolarAnnual = annualCons * currentRate;
    totalWithoutSolarCost += withoutSolarAnnual;

    // Solar offsets up to annual consumption
    const offsetKwh = Math.min(annualCons, currentProd);
    const annualSavings = offsetKwh * currentRate;
    cumulativeSavings += annualSavings;

    const remainingGridKwh = Math.max(0, annualCons - currentProd);
    const withSolarAnnualGridCost = remainingGridKwh * currentRate;

    yearlyComparison.push({
      year,
      withoutSolarCost: Math.round(withoutSolarAnnual),
      withSolarCost: Math.round(withSolarAnnualGridCost),
      annualSavings: Math.round(annualSavings),
      cumulativeSavings: Math.round(cumulativeSavings),
      cumulativeNetProfit: Math.round(cumulativeSavings - netCost),
    });

    // Escalate rate & degrade panel output for next year
    currentRate *= (1 + escalation);
    currentProd *= (1 - degradation);
  }

  const y1Savings = yearlyComparison[0]?.annualSavings ?? 0;
  const cum10 = yearlyComparison[9]?.cumulativeSavings ?? 0;
  const cum20 = yearlyComparison[19]?.cumulativeSavings ?? 0;
  const cum25 = yearlyComparison[24]?.cumulativeSavings ?? 0;

  return {
    monthlySavingsYear1: Math.round(y1Savings / 12),
    annualSavingsYear1: Math.round(y1Savings),
    savings10Year: Math.round(cum10),
    savings20Year: Math.round(cum20),
    savings25Year: Math.round(cum25),
    totalWithoutSolar25YearCost: Math.round(totalWithoutSolarCost),
    net25YearProfit: Math.round(cum25 - netCost),
    yearlyComparison,
  };
}
