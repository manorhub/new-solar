import type { CountryCode } from './localizationEngine';

export interface CostIncentiveInputs {
  systemKw: number;
  costPerWatt: number; // in local currency
  countryCode: CountryCode;
  batteryCost?: number;
  customRebateAmount?: number;
  applyFederalIncentive: boolean;
  applyStateIncentive: boolean;
}

export interface CostIncentiveOutputs {
  grossCost: number;
  equipmentCost: number;
  installationCost: number;
  batteryCost: number;
  federalIncentiveAmount: number;
  federalIncentiveName: string;
  stateIncentiveAmount: number;
  netCost: number;
  totalIncentives: number;
  estimatedMonthlyLoan10Yr: number;
  estimatedMonthlyLoan15Yr: number;
}

export function calculateCostAndIncentives(inputs: CostIncentiveInputs): CostIncentiveOutputs {
  const kw = Math.max(0.5, inputs.systemKw);
  const totalWattage = kw * 1000;
  const baseGrossCost = totalWattage * inputs.costPerWatt;
  const batteryCost = inputs.batteryCost ?? 0;
  const totalGrossCost = baseGrossCost + batteryCost;

  // Equipment vs labor breakdown (approx 55% equipment, 45% labor/permits)
  const equipmentCost = totalGrossCost * 0.55;
  const installationCost = totalGrossCost * 0.45;

  let federalIncentiveAmount = 0;
  let federalIncentiveName = 'Government Subsidy / Tax Credit';
  let stateIncentiveAmount = inputs.customRebateAmount ?? 0;

  if (inputs.applyFederalIncentive) {
    if (inputs.countryCode === 'US') {
      federalIncentiveName = 'US Federal Solar Investment Tax Credit (ITC 30%)';
      federalIncentiveAmount = totalGrossCost * 0.30;
    } else if (inputs.countryCode === 'IN') {
      federalIncentiveName = 'PM Surya Ghar: Muft Bijli Yojana Subsidy';
      // PM Surya Ghar subsidy tiers: ₹30,000 for 1kW, ₹60,000 for 2kW, max ₹78,000 for 3kW+
      if (kw <= 1) {
        federalIncentiveAmount = 30000;
      } else if (kw <= 2) {
        federalIncentiveAmount = 60000;
      } else {
        federalIncentiveAmount = 78000;
      }
    } else if (inputs.countryCode === 'CA') {
      federalIncentiveName = 'Canada Greener Homes Grant / Clean Energy Credit';
      federalIncentiveAmount = Math.min(5000, totalGrossCost * 0.15);
    } else if (inputs.countryCode === 'AU') {
      federalIncentiveName = 'Small-scale Technology Certificates (STCs)';
      federalIncentiveAmount = Math.min(4000, kw * 420);
    } else if (inputs.countryCode === 'GB') {
      federalIncentiveName = '0% VAT Rate on Solar Installation';
      federalIncentiveAmount = totalGrossCost * 0.20; // 20% VAT exemption value
    } else {
      federalIncentiveAmount = totalGrossCost * 0.15;
    }
  }

  const totalIncentives = federalIncentiveAmount + (inputs.applyStateIncentive ? stateIncentiveAmount : 0);
  const netCost = Math.max(0, totalGrossCost - totalIncentives);

  // Loan calculation helper (P * r * (1+r)^n / ((1+r)^n - 1))
  const calculateLoan = (principal: number, annualRatePct: number, years: number) => {
    if (principal <= 0) return 0;
    const r = annualRatePct / 100 / 12;
    const n = years * 12;
    const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(monthly);
  };

  return {
    grossCost: Math.round(totalGrossCost),
    equipmentCost: Math.round(equipmentCost),
    installationCost: Math.round(installationCost),
    batteryCost: Math.round(batteryCost),
    federalIncentiveAmount: Math.round(federalIncentiveAmount),
    federalIncentiveName,
    stateIncentiveAmount: Math.round(stateIncentiveAmount),
    netCost: Math.round(netCost),
    totalIncentives: Math.round(totalIncentives),
    estimatedMonthlyLoan10Yr: calculateLoan(netCost, 6.5, 10),
    estimatedMonthlyLoan15Yr: calculateLoan(netCost, 6.5, 15),
  };
}
