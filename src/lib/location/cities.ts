export interface CityData {
  name: string;
  slug: string;
  stateCode: string;
  countryCode: string;
  peakSunHours?: number;
  postalPrefixes?: string[];
}

export const MAJOR_CITIES: CityData[] = [
  // USA Cities
  { name: 'Los Angeles', slug: 'los-angeles', stateCode: 'CA', countryCode: 'US', peakSunHours: 5.6, postalPrefixes: ['900', '901', '902', '913', '914'] },
  { name: 'San Francisco', slug: 'san-francisco', stateCode: 'CA', countryCode: 'US', peakSunHours: 5.1, postalPrefixes: ['941', '940'] },
  { name: 'Houston', slug: 'houston', stateCode: 'TX', countryCode: 'US', peakSunHours: 5.2, postalPrefixes: ['770', '772'] },
  { name: 'Dallas', slug: 'dallas', stateCode: 'TX', countryCode: 'US', peakSunHours: 5.3, postalPrefixes: ['752', '753'] },
  { name: 'Miami', slug: 'miami', stateCode: 'FL', countryCode: 'US', peakSunHours: 5.4, postalPrefixes: ['331', '332'] },
  { name: 'Phoenix', slug: 'phoenix', stateCode: 'AZ', countryCode: 'US', peakSunHours: 6.4, postalPrefixes: ['850', '852'] },
  { name: 'New York City', slug: 'new-york', stateCode: 'NY', countryCode: 'US', peakSunHours: 4.2, postalPrefixes: ['100', '101', '102', '112', '113'] },
  { name: 'Chicago', slug: 'chicago', stateCode: 'IL', countryCode: 'US', peakSunHours: 4.2, postalPrefixes: ['606'] },
  { name: 'Seattle', slug: 'seattle', stateCode: 'WA', countryCode: 'US', peakSunHours: 3.8, postalPrefixes: ['981'] },
  { name: 'Denver', slug: 'denver', stateCode: 'CO', countryCode: 'US', peakSunHours: 5.5, postalPrefixes: ['802'] },

  // India Cities
  { name: 'Mumbai', slug: 'mumbai', stateCode: 'MH', countryCode: 'IN', peakSunHours: 5.4, postalPrefixes: ['400', '401'] },
  { name: 'Pune', slug: 'pune', stateCode: 'MH', countryCode: 'IN', peakSunHours: 5.5, postalPrefixes: ['411', '412'] },
  { name: 'Ahmedabad', slug: 'ahmedabad', stateCode: 'GJ', countryCode: 'IN', peakSunHours: 5.8, postalPrefixes: ['380'] },
  { name: 'Jaipur', slug: 'jaipur', stateCode: 'RJ', countryCode: 'IN', peakSunHours: 6.0, postalPrefixes: ['302'] },
  { name: 'Bengaluru', slug: 'bengaluru', stateCode: 'KA', countryCode: 'IN', peakSunHours: 5.3, postalPrefixes: ['560'] },
  { name: 'Chennai', slug: 'chennai', stateCode: 'TN', countryCode: 'IN', peakSunHours: 5.5, postalPrefixes: ['600'] },
  { name: 'Hyderabad', slug: 'hyderabad', stateCode: 'TS', countryCode: 'IN', peakSunHours: 5.4, postalPrefixes: ['500'] },
  { name: 'Delhi NCR', slug: 'delhi', stateCode: 'DL', countryCode: 'IN', peakSunHours: 5.0, postalPrefixes: ['110'] },
  { name: 'Kolkata', slug: 'kolkata', stateCode: 'WB', countryCode: 'IN', peakSunHours: 4.7, postalPrefixes: ['700'] },
  { name: 'Lucknow', slug: 'lucknow', stateCode: 'UP', countryCode: 'IN', peakSunHours: 5.1, postalPrefixes: ['226'] },
];

export function lookupPostalCode(codeStr: string, countryCode: string): CityData | undefined {
  const cleanCode = codeStr.trim().replace(/\s+/g, '');
  if (!cleanCode) return undefined;
  return MAJOR_CITIES.find(
    (c) => c.countryCode === countryCode && c.postalPrefixes?.some((prefix) => cleanCode.startsWith(prefix))
  );
}
