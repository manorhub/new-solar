import { validatePositiveNumber } from './validation';

export interface PanelCountInputs {
  requiredSystemKw: number;
  panelWattage: number; // e.g. 400
}

export interface PanelCountOutputs {
  panelCount: number;
  actualInstalledKw: number;
  panelWattageUsed: number;
}

export function calculatePanelCount(inputs: PanelCountInputs): PanelCountOutputs {
  const kwCheck = validatePositiveNumber(inputs.requiredSystemKw, 6.6, 'Required System Capacity');
  const wattCheck = validatePositiveNumber(inputs.panelWattage, 400, 'Panel Wattage');

  const kw = Math.max(0.5, kwCheck.sanitizedValue);
  const wattage = Math.max(100, wattCheck.sanitizedValue);

  // Panel count rounded UP to whole panel
  const panelCount = Math.ceil((kw * 1000) / wattage);

  // Actual installed system capacity based on whole panel count
  const actualInstalledKw = Math.round(((panelCount * wattage) / 1000) * 100) / 100;

  return {
    panelCount,
    actualInstalledKw,
    panelWattageUsed: wattage,
  };
}
