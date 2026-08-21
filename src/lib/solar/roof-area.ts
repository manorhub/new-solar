import type { UnitSystem } from './localizationEngine';
import { sqMetersToSqFt } from './units';
import { validatePositiveNumber, validatePercentage } from './validation';

export interface RoofAreaInputs {
  panelCount: number;
  panelLengthMeters?: number; // default 1.72
  panelWidthMeters?: number; // default 1.13
  usableRoofPercent?: number; // default 75%
  unitSystem?: UnitSystem;
}

export interface RoofAreaOutputs {
  singlePanelAreaSqM: number;
  totalNetPanelAreaSqM: number;
  totalGrossRoofAreaRequiredSqM: number;
  singlePanelAreaSqFt: number;
  totalNetPanelAreaSqFt: number;
  totalGrossRoofAreaRequiredSqFt: number;
  usableRoofPercentUsed: number;
}

export function calculateRoofAreaRequirement(inputs: RoofAreaInputs): RoofAreaOutputs {
  const countCheck = validatePositiveNumber(inputs.panelCount, 15, 'Panel Count');
  const lenCheck = validatePositiveNumber(inputs.panelLengthMeters ?? 1.72, 1.72, 'Panel Length');
  const widthCheck = validatePositiveNumber(inputs.panelWidthMeters ?? 1.13, 1.13, 'Panel Width');
  const usableCheck = validatePercentage(inputs.usableRoofPercent ?? 75, 75, 30, 95, 'Usable Roof Percentage');

  const count = Math.max(1, countCheck.sanitizedValue);
  const length = Math.max(0.5, lenCheck.sanitizedValue);
  const width = Math.max(0.3, widthCheck.sanitizedValue);
  const usableFraction = usableCheck.sanitizedValue / 100;

  const singleSqM = length * width;
  const netSqM = singleSqM * count;
  const grossSqM = netSqM / usableFraction;

  return {
    singlePanelAreaSqM: Math.round(singleSqM * 100) / 100,
    totalNetPanelAreaSqM: Math.round(netSqM * 10) / 10,
    totalGrossRoofAreaRequiredSqM: Math.round(grossSqM * 10) / 10,
    singlePanelAreaSqFt: Math.round(sqMetersToSqFt(singleSqM) * 10) / 10,
    totalNetPanelAreaSqFt: Math.round(sqMetersToSqFt(netSqM)),
    totalGrossRoofAreaRequiredSqFt: Math.round(sqMetersToSqFt(grossSqM)),
    usableRoofPercentUsed: usableCheck.sanitizedValue,
  };
}
