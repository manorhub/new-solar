export const DEFAULT_ASSUMPTIONS = {
  performanceRatio: 0.80, // 80% default system efficiency (inverter, wiring, temperature, soiling)
  panelWattage: 400, // 400W standard residential module
  daysPerYear: 365.25,
  utilityEscalationPercent: 3.5, // 3.5% per year electricity price inflation
  panelDegradationPercent: 0.5, // 0.5% per year linear degradation
  systemLossesPercent: 14, // 14% total system loss -> PR ~0.86
  batteryDoDPercent: 85, // 85% Depth of Discharge (LFP chemistry)
  batteryEfficiencyPercent: 90, // 90% round-trip efficiency
  gridEmissionsFactorKgPerKwh: 0.42, // 0.42 kg CO2 / kWh global grid average
  usableRoofPercent: 75, // 75% roof clearance usability
  panelLengthMeters: 1.72,
  panelWidthMeters: 1.13,
};

export interface SystemAssumptionDetail {
  label: string;
  defaultValue: string;
  description: string;
}

export const SYSTEM_ASSUMPTIONS_EXPLANATIONS: SystemAssumptionDetail[] = [
  {
    label: 'Performance Ratio (PR)',
    defaultValue: '0.80 (80%)',
    description: 'Accounts for real-world DC-to-AC inverter conversion efficiency, wire resistance losses, cell temperature degradation, soiling/dust, and panel mismatch.',
  },
  {
    label: 'Panel Wattage',
    defaultValue: '400 Watts',
    description: 'Standard Tier-1 monocrystalline silicon photovoltaic module rating under Standard Test Conditions (STC).',
  },
  {
    label: 'Utility Price Escalation',
    defaultValue: '3.5% / year',
    description: 'Assumed compound annual growth rate of grid electricity tariffs based on historical utility rate escalation.',
  },
  {
    label: 'Panel Linear Degradation',
    defaultValue: '0.5% / year',
    description: 'Standard manufacturer performance warranty assumption for annual photovoltaic cell power output loss.',
  },
];
