export type CountryCode = 'US' | 'IN' | 'CA' | 'AU' | 'GB' | 'INTL';
export type CurrencyCode = 'USD' | 'INR' | 'CAD' | 'AUD' | 'GBP' | 'EUR';
export type UnitSystem = 'imperial' | 'metric';

export interface LocationPreset {
  countryCode: CountryCode;
  countryName: string;
  currency: CurrencyCode;
  currencySymbol: string;
  defaultRate: number; // local currency per kWh
  defaultPeakSunHours: number;
  defaultPanelWattage: number;
  unitSystem: UnitSystem;
  subregions: { name: string; peakSunHours: number; rate: number; zipPrefixes?: string[] }[];
}

export const LOCATION_PRESETS: Record<CountryCode, LocationPreset> = {
  US: {
    countryCode: 'US',
    countryName: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    defaultRate: 0.16, // $0.16 / kWh average
    defaultPeakSunHours: 4.8,
    defaultPanelWattage: 400,
    unitSystem: 'imperial',
    subregions: [
      { name: 'California', peakSunHours: 5.4, rate: 0.28 },
      { name: 'Texas', peakSunHours: 5.1, rate: 0.14 },
      { name: 'Florida', peakSunHours: 5.2, rate: 0.15 },
      { name: 'Arizona', peakSunHours: 6.0, rate: 0.13 },
      { name: 'New York', peakSunHours: 3.9, rate: 0.22 },
      { name: 'Illinois', peakSunHours: 4.2, rate: 0.16 },
      { name: 'Colorado', peakSunHours: 5.2, rate: 0.14 },
      { name: 'North Carolina', peakSunHours: 4.6, rate: 0.13 },
      { name: 'Georgia', peakSunHours: 4.8, rate: 0.14 },
      { name: 'Washington', peakSunHours: 3.6, rate: 0.11 },
    ],
  },
  IN: {
    countryCode: 'IN',
    countryName: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    defaultRate: 7.5, // ₹7.5 / kWh
    defaultPeakSunHours: 5.3,
    defaultPanelWattage: 540,
    unitSystem: 'metric',
    subregions: [
      { name: 'Maharashtra', peakSunHours: 5.2, rate: 8.5 },
      { name: 'Gujarat', peakSunHours: 5.6, rate: 6.8 },
      { name: 'Rajasthan', peakSunHours: 5.8, rate: 7.2 },
      { name: 'Karnataka', peakSunHours: 5.1, rate: 8.0 },
      { name: 'Tamil Nadu', peakSunHours: 5.3, rate: 7.0 },
      { name: 'Delhi NCR', peakSunHours: 4.9, rate: 7.8 },
      { name: 'Uttar Pradesh', peakSunHours: 4.8, rate: 6.5 },
      { name: 'Telangana', peakSunHours: 5.2, rate: 7.5 },
    ],
  },
  CA: {
    countryCode: 'CA',
    countryName: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    defaultRate: 0.15,
    defaultPeakSunHours: 3.9,
    defaultPanelWattage: 410,
    unitSystem: 'metric',
    subregions: [
      { name: 'Ontario', peakSunHours: 3.8, rate: 0.14 },
      { name: 'Alberta', peakSunHours: 4.5, rate: 0.17 },
      { name: 'British Columbia', peakSunHours: 3.6, rate: 0.11 },
      { name: 'Quebec', peakSunHours: 3.5, rate: 0.08 },
    ],
  },
  AU: {
    countryCode: 'AU',
    countryName: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    defaultRate: 0.32,
    defaultPeakSunHours: 5.4,
    defaultPanelWattage: 415,
    unitSystem: 'metric',
    subregions: [
      { name: 'New South Wales', peakSunHours: 5.1, rate: 0.33 },
      { name: 'Queensland', peakSunHours: 5.5, rate: 0.29 },
      { name: 'Victoria', peakSunHours: 4.2, rate: 0.28 },
      { name: 'Western Australia', peakSunHours: 5.6, rate: 0.30 },
    ],
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    defaultRate: 0.28,
    defaultPeakSunHours: 2.9,
    defaultPanelWattage: 400,
    unitSystem: 'metric',
    subregions: [
      { name: 'South England', peakSunHours: 3.2, rate: 0.28 },
      { name: 'Midlands & Wales', peakSunHours: 2.9, rate: 0.28 },
      { name: 'Scotland & North', peakSunHours: 2.6, rate: 0.28 },
    ],
  },
  INTL: {
    countryCode: 'INTL',
    countryName: 'International / Other',
    currency: 'USD',
    currencySymbol: '$',
    defaultRate: 0.18,
    defaultPeakSunHours: 4.5,
    defaultPanelWattage: 400,
    unitSystem: 'metric',
    subregions: [
      { name: 'Global Average', peakSunHours: 4.5, rate: 0.18 },
      { name: 'High Irradiance Region', peakSunHours: 5.8, rate: 0.20 },
      { name: 'Moderate Irradiance Region', peakSunHours: 4.0, rate: 0.16 },
    ],
  },
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  INR: '₹',
  CAD: 'C$',
  AUD: 'A$',
  GBP: '£',
  EUR: '€',
};

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  if (currency === 'INR') {
    return `${symbol}${Math.round(amount).toLocaleString('en-IN')}`;
  }
  return `${symbol}${Math.round(amount).toLocaleString('en-US')}`;
}

export function convertArea(sqFt: number, toUnit: UnitSystem): number {
  if (toUnit === 'metric') {
    return sqFt * 0.092903; // sq meters
  }
  return sqFt;
}

export function formatArea(sqMeters: number, unitSystem: UnitSystem): string {
  if (unitSystem === 'imperial') {
    const sqFt = sqMeters / 0.092903;
    return `${Math.round(sqFt).toLocaleString()} sq ft`;
  }
  return `${Math.round(sqMeters).toLocaleString()} m²`;
}
