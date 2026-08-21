import { validatePositiveNumber } from './validation';

export interface CostInputs {
  systemKw: number;
  equipmentCostPerWatt: number; // e.g. 1.50
  installationCostPerWatt?: number; // e.g. 1.20 (or 0 if included in costPerWatt)
  batteryCost?: number;
  permittingOtherCosts?: number;
  incentivesAmount?: number;
}

export interface CostOutputs {
  equipmentCost: number;
  installationCost: number;
  batteryCost: number;
  permittingOtherCosts: number;
  grossSystemCost: number;
  incentivesAmount: number;
  estimatedNetCost: number;
}

export function calculateSystemCost(inputs: CostInputs): CostOutputs {
  const kwCheck = validatePositiveNumber(inputs.systemKw, 6.6, 'System Capacity');
  const equipCheck = validatePositiveNumber(inputs.equipmentCostPerWatt, 1.60, 'Equipment Cost Per Watt');
  const installCheck = validatePositiveNumber(inputs.installationCostPerWatt ?? 1.20, 1.20, 'Installation Cost Per Watt');
  const battCheck = validatePositiveNumber(inputs.batteryCost ?? 0, 0, 'Battery Cost');
  const otherCheck = validatePositiveNumber(inputs.permittingOtherCosts ?? 0, 0, 'Permitting & Other Costs');
  const incCheck = validatePositiveNumber(inputs.incentivesAmount ?? 0, 0, 'Incentives Amount');

  const kw = Math.max(0.5, kwCheck.sanitizedValue);
  const totalWatts = kw * 1000;

  const equipmentCost = totalWatts * equipCheck.sanitizedValue;
  const installationCost = totalWatts * installCheck.sanitizedValue;
  const batteryCost = battCheck.sanitizedValue;
  const permittingOtherCosts = otherCheck.sanitizedValue;

  const grossSystemCost = equipmentCost + installationCost + batteryCost + permittingOtherCosts;
  const incentivesAmount = incCheck.sanitizedValue;
  const estimatedNetCost = Math.max(0, grossSystemCost - incentivesAmount);

  return {
    equipmentCost: Math.round(equipmentCost),
    installationCost: Math.round(installationCost),
    batteryCost: Math.round(batteryCost),
    permittingOtherCosts: Math.round(permittingOtherCosts),
    grossSystemCost: Math.round(grossSystemCost),
    incentivesAmount: Math.round(incentivesAmount),
    estimatedNetCost: Math.round(estimatedNetCost),
  };
}
