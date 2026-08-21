export interface EmissionsInputs {
  annualGenerationKwh: number;
  gridEmissionsFactorKgPerKwh?: number; // default ~0.385 kg CO2 / kWh (US grid average; India grid average ~0.71 kg/kWh)
}

export interface EmissionsOutputs {
  annualCo2SavedKg: number;
  annualCo2SavedMetricTons: number;
  lifetime25YrCo2SavedMetricTons: number;
  equivalentTreesPlanted: number;
  equivalentCarMilesAvoided: number;
  equivalentCoalBurnedAvoidedKg: number;
}

export function calculateEmissions(inputs: EmissionsInputs): EmissionsOutputs {
  const genKwh = Math.max(0, inputs.annualGenerationKwh);
  const factor = inputs.gridEmissionsFactorKgPerKwh ?? 0.42; // default global/mixed grid factor

  const annualKg = genKwh * factor;
  const annualTons = annualKg / 1000;
  const lifetimeTons = annualTons * 25;

  // EPA Conversions:
  // 1 tree absorbs ~21.8 kg CO2 per year
  const trees = Math.round(annualKg / 21.77);

  // 1 passenger car emits ~0.404 kg CO2 per mile driven
  const miles = Math.round(annualKg / 0.404);

  // 1 kg coal burned produces ~2.42 kg CO2
  const coalKg = Math.round(annualKg / 2.42);

  return {
    annualCo2SavedKg: Math.round(annualKg),
    annualCo2SavedMetricTons: Math.round(annualTons * 10) / 10,
    lifetime25YrCo2SavedMetricTons: Math.round(lifetimeTons),
    equivalentTreesPlanted: trees,
    equivalentCarMilesAvoided: miles,
    equivalentCoalBurnedAvoidedKg: coalKg,
  };
}
