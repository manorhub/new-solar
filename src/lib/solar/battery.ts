import { DEFAULT_ASSUMPTIONS } from './assumptions';
import { validatePositiveNumber, validatePercentage } from './validation';

export interface BatteryInputs {
  dailyKwhRequirement: number;
  backupFraction?: number; // e.g. 0.50 (50% essential load backup)
  depthOfDischargePercent?: number; // default 85%
  batteryEfficiencyPercent?: number; // default 90%
}

export interface BatteryOutputs {
  recommendedNominalCapacityKwh: number;
  usableCapacityKwh: number;
  backupEnergyKwhNeeded: number;
  depthOfDischargeUsed: number;
  batteryEfficiencyUsed: number;
  formulaExplanationText: string;
}

export function calculateBatteryCapacity(inputs: BatteryInputs): BatteryOutputs {
  const dailyCheck = validatePositiveNumber(inputs.dailyKwhRequirement, 20, 'Daily Energy Requirement');
  const dodCheck = validatePercentage(
    inputs.depthOfDischargePercent ?? DEFAULT_ASSUMPTIONS.batteryDoDPercent,
    85,
    50,
    100,
    'Depth of Discharge'
  );
  const effCheck = validatePercentage(
    inputs.batteryEfficiencyPercent ?? DEFAULT_ASSUMPTIONS.batteryEfficiencyPercent,
    90,
    60,
    100,
    'Battery Efficiency'
  );

  const dailyKwh = Math.max(1, dailyCheck.sanitizedValue);
  const backupFraction = Math.max(0.1, Math.min(1.0, inputs.backupFraction ?? 0.50));
  const dod = dodCheck.sanitizedValue / 100;
  const efficiency = effCheck.sanitizedValue / 100;

  // Daily Backup Energy Needed
  const backupEnergyKwhNeeded = dailyKwh * backupFraction;

  // Nominal battery capacity calculation
  const rawNominalKw = backupEnergyKwhNeeded / (dod * efficiency);
  const roundedNominalKw = Math.round(rawNominalKw * 10) / 10;
  const usableKw = Math.round((roundedNominalKw * dod) * 10) / 10;

  const formulaText = `Required Nominal Capacity = (Daily Energy ${dailyKwh} kWh × Backup Fraction ${Math.round(backupFraction * 100)}%) ÷ (DoD ${Math.round(dod * 100)}% × Efficiency ${Math.round(efficiency * 100)}%) = ${roundedNominalKw} kWh`;

  return {
    recommendedNominalCapacityKwh: Math.max(2.5, roundedNominalKw),
    usableCapacityKwh: Math.max(2.0, usableKw),
    backupEnergyKwhNeeded: Math.round(backupEnergyKwhNeeded * 10) / 10,
    depthOfDischargeUsed: dodCheck.sanitizedValue,
    batteryEfficiencyUsed: effCheck.sanitizedValue,
    formulaExplanationText: formulaText,
  };
}
