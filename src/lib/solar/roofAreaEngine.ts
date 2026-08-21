import type { UnitSystem } from './localizationEngine';

export interface RoofAreaInputs {
  panelCount: number;
  panelLengthMeters: number; // default ~1.72m
  panelWidthMeters: number; // default ~1.13m
  spacingMeters: number; // panel spacing default ~0.05m
  usableRoofPercent: number; // usable portion of roof e.g. 70% to clear vents/skylights
  orientation: 'portrait' | 'landscape';
  unitSystem: UnitSystem;
}

export interface RoofAreaOutputs {
  totalNetPanelAreaSqM: number;
  totalGrossRoofAreaRequiredSqM: number;
  totalNetPanelAreaSqFt: number;
  totalGrossRoofAreaRequiredSqFt: number;
  arrayGridCols: number;
  arrayGridRows: number;
  recommendedRoofDimensionsText: string;
}

export function calculateRoofArea(inputs: RoofAreaInputs): RoofAreaOutputs {
  const count = Math.max(1, inputs.panelCount);

  // Single panel area + spacing clearance
  const singlePanelAreaSqM = (inputs.panelLengthMeters + inputs.spacingMeters) * (inputs.panelWidthMeters + inputs.spacingMeters);
  const totalNetSqM = singlePanelAreaSqM * count;

  // Gross roof area taking into account roof usability factor (vents, edges, pitch)
  const grossFactor = 1 / (Math.max(30, inputs.usableRoofPercent) / 100);
  const totalGrossSqM = totalNetSqM * grossFactor;

  const totalNetSqFt = totalNetSqM / 0.092903;
  const totalGrossSqFt = totalGrossSqM / 0.092903;

  // Recommended layout grid
  const cols = Math.ceil(Math.sqrt(count * 1.5));
  const rows = Math.ceil(count / cols);

  const gridWidthM = cols * (inputs.orientation === 'portrait' ? inputs.panelWidthMeters : inputs.panelLengthMeters);
  const gridHeightM = rows * (inputs.orientation === 'portrait' ? inputs.panelLengthMeters : inputs.panelWidthMeters);

  const dimText = inputs.unitSystem === 'imperial'
    ? `${Math.round(gridWidthM / 0.3048)} ft x ${Math.round(gridHeightM / 0.3048)} ft`
    : `${Math.round(gridWidthM * 10) / 10} m x ${Math.round(gridHeightM * 10) / 10} m`;

  return {
    totalNetPanelAreaSqM: Math.round(totalNetSqM * 10) / 10,
    totalGrossRoofAreaRequiredSqM: Math.round(totalGrossSqM * 10) / 10,
    totalNetPanelAreaSqFt: Math.round(totalNetSqFt),
    totalGrossRoofAreaRequiredSqFt: Math.round(totalGrossSqFt),
    arrayGridCols: cols,
    arrayGridRows: rows,
    recommendedRoofDimensionsText: dimText,
  };
}
