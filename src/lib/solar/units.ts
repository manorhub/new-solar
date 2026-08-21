import { formatCurrency } from './localizationEngine';

export type CurrencyCode = string;
export type UnitSystem = 'imperial' | 'metric';

export function wattsToKw(watts: number): number {
  return watts / 1000;
}

export function kwToWatts(kw: number): number {
  return kw * 1000;
}

export function formatPowerKw(kw: number, decimals: number = 2): string {
  if (isNaN(kw) || kw < 0) return '0 kW';
  return `${kw.toFixed(decimals)} kW`;
}

export function formatEnergyKwh(kwh: number): string {
  if (isNaN(kwh) || kwh < 0) return '0 kWh';
  return `${Math.round(kwh).toLocaleString()} kWh`;
}

export function sqMetersToSqFt(sqMeters: number): number {
  return sqMeters * 10.7639;
}

export function sqFtToSqMeters(sqFt: number): number {
  return sqFt / 10.7639;
}

export function formatFormattedArea(sqMeters: number, unitSystem: UnitSystem): string {
  if (unitSystem === 'imperial') {
    const sqFt = Math.round(sqMetersToSqFt(sqMeters));
    return `${sqFt.toLocaleString()} sq ft`;
  }
  return `${Math.round(sqMeters).toLocaleString()} m²`;
}

export function formatDisplayCurrency(amount: number, currencyCode: CurrencyCode = 'USD'): string {
  if (isNaN(amount)) return '$0';
  return formatCurrency(amount, currencyCode as any);
}
