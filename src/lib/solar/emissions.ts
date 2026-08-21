import { DEFAULT_ASSUMPTIONS } from './assumptions';
import { validatePositiveNumber } from './validation';

export interface EmissionsInputs {
  annualSolarGenerationKwh: number;
  gridEmissionsFactorKgPerKwh?: number; // e.g. 0.42 kg CO2 / kWh
}

export interface EmissionsOutputs {
  annualCo2AvoidedKg: number;
  annualCo2AvoidedMetricTons: number;
  lifetime25YearCo2AvoidedMetricTons: number;
  equivalentTreesPlanted: number;
  equivalentCarMilesAvoided: number;
  equivalentCoalBurnedAvoidedKg: number;
  emissionsFactorUsed: number;
}

export function calculateEmissionsReduction(inputs: EmissionsInputs): EmissionsOutputs {
  const genCheck = validatePositiveNumber(inputs.annualSolarGenerationKwh, 8500, 'Solar Generation');
  const factorCheck = validatePositiveNumber(
    inputs.gridEmissionsFactorKgPerKwh ?? DEFAULT_ASSUMPTIONS.gridEmissionsFactorKgPerKwh,
    0.42,
    'Grid Emissions Factor'
  );

  const genKwh = genCheck.sanitizedValue;
  const factor = factorCheck.sanitizedValue;

  const annualKg = genKwh * factor;
  const annualTons = annualKg / 1000;
  const lifetimeTons = annualTons * 25;

  // EPA Standard Conversions:
  // 1 tree absorbs ~21.77 kg CO2 / year
  const trees = Math.round(annualKg / 21.77);

  // 1 passenger car emits ~0.404 kg CO2 / mile
  const miles = Math.round(annualKg / 0.404);

  // 1 kg coal produces ~2.42 kg CO2
  const coalKg = Math.round(annualKg / 2.42);

  return {
    annualCo2AvoidedKg: Math.round(annualKg),
    annualCo2AvoidedMetricTons: Math.round(annualTons * 10) / 10,
    lifetime25YearCo2AvoidedMetricTons: Math.round(lifetimeTons),
    equivalentTreesPlanted: trees,
    equivalentCarMilesAvoided: miles,
    equivalentCoalBurnedAvoidedKg: coalKg,
    emissionsFactorUsed: factor,
  };
}
