export interface PanelCalculationInputs {
  monthlyBill?: number;
  monthlyKwhUsage?: number;
  electricityRate: number; // cost per kWh in local currency
  peakSunHours: number; // hours per day
  panelWattage: number; // e.g. 400W
  systemLosses: number; // percentage e.g. 14% -> efficiency 0.86
  roofOrientationFactor: number; // 1.0 South, 0.88 East/West, 0.70 North
  roofTiltFactor: number; // 0.95 - 1.0
  targetOffsetPercent: number; // e.g. 100%
}

export interface PanelCalculationOutputs {
  recommendedKw: number;
  panelCount: number;
  actualPanelWattage: number;
  dailyGenerationKwh: number;
  monthlyGenerationKwh: number;
  annualGenerationKwh: number;
  monthlySavings: number;
  annualSavings: number;
  electricityOffsetPercent: number;
  efficiencyFactor: number;
}

export function calculateSolarPanels(inputs: PanelCalculationInputs): PanelCalculationOutputs {
  // Determine monthly kWh usage
  let monthlyKwh = inputs.monthlyKwhUsage ?? 0;
  if (!monthlyKwh && inputs.monthlyBill && inputs.electricityRate > 0) {
    monthlyKwh = inputs.monthlyBill / inputs.electricityRate;
  }
  if (monthlyKwh <= 0) monthlyKwh = 900; // sensible default fallback

  const systemEfficiency = (1 - (inputs.systemLosses / 100)) * inputs.roofOrientationFactor * inputs.roofTiltFactor;

  // Daily kWh needed to cover target offset
  const dailyKwhTarget = (monthlyKwh * (inputs.targetOffsetPercent / 100)) / 30.416;

  // Needed system capacity (kW) = daily target / (sun hours * efficiency)
  const rawKwNeeded = dailyKwhTarget / Math.max(1, (inputs.peakSunHours * systemEfficiency));
  const recommendedKw = Math.max(0.5, Math.round(rawKwNeeded * 10) / 10);

  // Number of panels
  const panelCount = Math.ceil((recommendedKw * 1000) / inputs.panelWattage);
  const actualKwCapacity = (panelCount * inputs.panelWattage) / 1000;

  // Generation
  const dailyGenerationKwh = actualKwCapacity * inputs.peakSunHours * systemEfficiency;
  const monthlyGenerationKwh = dailyGenerationKwh * 30.416;
  const annualGenerationKwh = dailyGenerationKwh * 365.25;

  const offsetPercent = Math.min(200, Math.round((monthlyGenerationKwh / monthlyKwh) * 100));

  const monthlySavings = Math.min(inputs.monthlyBill ?? (monthlyKwh * inputs.electricityRate), monthlyGenerationKwh * inputs.electricityRate);
  const annualSavings = monthlySavings * 12;

  return {
    recommendedKw: Math.round(actualKwCapacity * 100) / 100,
    panelCount,
    actualPanelWattage: inputs.panelWattage,
    dailyGenerationKwh: Math.round(dailyGenerationKwh * 10) / 10,
    monthlyGenerationKwh: Math.round(monthlyGenerationKwh),
    annualGenerationKwh: Math.round(annualGenerationKwh),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    electricityOffsetPercent: offsetPercent,
    efficiencyFactor: Math.round(systemEfficiency * 100),
  };
}
