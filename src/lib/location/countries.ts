export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  unitSystem: 'imperial' | 'metric';
  rateUnit: string;
  defaultRate: number;
  defaultPeakSunHours: number;
  defaultPerformanceRatio: number;
  emissionsFactorKgPerKwh: number;
  postalCodeLabel: string;
  postalCodePlaceholder: string;
  subdivisionType: string; // 'State' or 'Province' or 'Region'
}

export const COUNTRIES: Record<string, CountryConfig> = {
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    unitSystem: 'imperial',
    rateUnit: '$/kWh',
    defaultRate: 0.18,
    defaultPeakSunHours: 4.8,
    defaultPerformanceRatio: 0.80,
    emissionsFactorKgPerKwh: 0.39,
    postalCodeLabel: 'ZIP Code',
    postalCodePlaceholder: 'e.g. 90210',
    subdivisionType: 'State',
  },
  IN: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    unitSystem: 'metric',
    rateUnit: '₹/kWh',
    defaultRate: 8.50,
    defaultPeakSunHours: 5.2,
    defaultPerformanceRatio: 0.80,
    emissionsFactorKgPerKwh: 0.71,
    postalCodeLabel: 'PIN Code',
    postalCodePlaceholder: 'e.g. 400001',
    subdivisionType: 'State',
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    unitSystem: 'metric',
    rateUnit: 'C$/kWh',
    defaultRate: 0.16,
    defaultPeakSunHours: 3.8,
    defaultPerformanceRatio: 0.80,
    emissionsFactorKgPerKwh: 0.12,
    postalCodeLabel: 'Postal Code',
    postalCodePlaceholder: 'e.g. M5V 2T6',
    subdivisionType: 'Province',
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    unitSystem: 'metric',
    rateUnit: 'A$/kWh',
    defaultRate: 0.32,
    defaultPeakSunHours: 5.4,
    defaultPerformanceRatio: 0.80,
    emissionsFactorKgPerKwh: 0.65,
    postalCodeLabel: 'Postcode',
    postalCodePlaceholder: 'e.g. 2000',
    subdivisionType: 'State',
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    unitSystem: 'metric',
    rateUnit: '£/kWh',
    defaultRate: 0.28,
    defaultPeakSunHours: 3.0,
    defaultPerformanceRatio: 0.80,
    emissionsFactorKgPerKwh: 0.21,
    postalCodeLabel: 'Postcode',
    postalCodePlaceholder: 'e.g. SW1A 1AA',
    subdivisionType: 'Region',
  },
  INTL: {
    code: 'INTL',
    name: 'International (Global)',
    currency: 'USD',
    currencySymbol: '$',
    unitSystem: 'metric',
    rateUnit: '$/kWh',
    defaultRate: 0.20,
    defaultPeakSunHours: 4.5,
    defaultPerformanceRatio: 0.80,
    emissionsFactorKgPerKwh: 0.42,
    postalCodeLabel: 'Postal Code',
    postalCodePlaceholder: 'e.g. 10001',
    subdivisionType: 'Region',
  },
};
