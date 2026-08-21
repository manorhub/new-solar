export interface RegionData {
  code: string;
  name: string;
  slug: string;
  countryCode: string;
  peakSunHours: number;
  defaultRate: number;
  emissionsFactorKgPerKwh: number;
  dataSourceId: string;
  notes: string;
  isEstimate: boolean;
}

// All 50 US States + DC
const US_STATES: RegionData[] = [
  { code: 'AL', name: 'Alabama', slug: 'alabama', countryCode: 'US', peakSunHours: 4.6, defaultRate: 0.15, emissionsFactorKgPerKwh: 0.38, dataSourceId: 'eia', notes: 'EIA 2026 Avg Residential Rate', isEstimate: true },
  { code: 'AK', name: 'Alaska', slug: 'alaska', countryCode: 'US', peakSunHours: 3.1, defaultRate: 0.25, emissionsFactorKgPerKwh: 0.44, dataSourceId: 'eia', notes: 'High isolated grid rates', isEstimate: true },
  { code: 'AZ', name: 'Arizona', slug: 'arizona', countryCode: 'US', peakSunHours: 6.2, defaultRate: 0.14, emissionsFactorKgPerKwh: 0.35, dataSourceId: 'nrel', notes: 'Top US solar irradiance region', isEstimate: true },
  { code: 'AR', name: 'Arkansas', slug: 'arkansas', countryCode: 'US', peakSunHours: 4.7, defaultRate: 0.13, emissionsFactorKgPerKwh: 0.42, dataSourceId: 'eia', notes: 'Low utility baseline tariff', isEstimate: true },
  { code: 'CA', name: 'California', slug: 'california', countryCode: 'US', peakSunHours: 5.6, defaultRate: 0.32, emissionsFactorKgPerKwh: 0.22, dataSourceId: 'eia', notes: 'NEM 3.0 billing rules apply', isEstimate: true },
  { code: 'CO', name: 'Colorado', slug: 'colorado', countryCode: 'US', peakSunHours: 5.4, defaultRate: 0.15, emissionsFactorKgPerKwh: 0.52, dataSourceId: 'nrel', notes: 'High elevation solar yield', isEstimate: true },
  { code: 'CT', name: 'Connecticut', slug: 'connecticut', countryCode: 'US', peakSunHours: 4.1, defaultRate: 0.29, emissionsFactorKgPerKwh: 0.24, dataSourceId: 'eia', notes: 'High New England retail rates', isEstimate: true },
  { code: 'DE', name: 'Delaware', slug: 'delaware', countryCode: 'US', peakSunHours: 4.4, defaultRate: 0.16, emissionsFactorKgPerKwh: 0.36, dataSourceId: 'eia', notes: 'Mid-Atlantic solar access', isEstimate: true },
  { code: 'FL', name: 'Florida', slug: 'florida', countryCode: 'US', peakSunHours: 5.4, defaultRate: 0.15, emissionsFactorKgPerKwh: 0.38, dataSourceId: 'nrel', notes: 'Sunshine state solar profile', isEstimate: true },
  { code: 'GA', name: 'Georgia', slug: 'georgia', countryCode: 'US', peakSunHours: 4.9, defaultRate: 0.14, emissionsFactorKgPerKwh: 0.37, dataSourceId: 'eia', notes: 'Southeast solar irradiance', isEstimate: true },
  { code: 'HI', name: 'Hawaii', slug: 'hawaii', countryCode: 'US', peakSunHours: 5.8, defaultRate: 0.44, emissionsFactorKgPerKwh: 0.62, dataSourceId: 'eia', notes: 'Highest US utility rates', isEstimate: true },
  { code: 'ID', name: 'Idaho', slug: 'idaho', countryCode: 'US', peakSunHours: 4.8, defaultRate: 0.11, emissionsFactorKgPerKwh: 0.14, dataSourceId: 'eia', notes: 'Hydro-dominated grid baseline', isEstimate: true },
  { code: 'IL', name: 'Illinois', slug: 'illinois', countryCode: 'US', peakSunHours: 4.2, defaultRate: 0.17, emissionsFactorKgPerKwh: 0.32, dataSourceId: 'eia', notes: 'Midwest SREC incentive market', isEstimate: true },
  { code: 'IN', name: 'Indiana', slug: 'indiana', countryCode: 'US', peakSunHours: 4.3, defaultRate: 0.16, emissionsFactorKgPerKwh: 0.68, dataSourceId: 'eia', notes: 'Midwest industrial tariff', isEstimate: true },
  { code: 'IA', name: 'Iowa', slug: 'iowa', countryCode: 'US', peakSunHours: 4.4, defaultRate: 0.14, emissionsFactorKgPerKwh: 0.31, dataSourceId: 'eia', notes: 'Wind-solar hybrid region', isEstimate: true },
  { code: 'KS', name: 'Kansas', slug: 'kansas', countryCode: 'US', peakSunHours: 5.1, defaultRate: 0.14, emissionsFactorKgPerKwh: 0.41, dataSourceId: 'nrel', notes: 'High Plains solar resource', isEstimate: true },
  { code: 'KY', name: 'Kentucky', slug: 'kentucky', countryCode: 'US', peakSunHours: 4.4, defaultRate: 0.12, emissionsFactorKgPerKwh: 0.72, dataSourceId: 'eia', notes: 'Coal-heavy baseline grid', isEstimate: true },
  { code: 'LA', name: 'Louisiana', slug: 'louisiana', countryCode: 'US', peakSunHours: 4.9, defaultRate: 0.12, emissionsFactorKgPerKwh: 0.40, dataSourceId: 'eia', notes: 'Gulf Coast climate profile', isEstimate: true },
  { code: 'ME', name: 'Maine', slug: 'maine', countryCode: 'US', peakSunHours: 4.0, defaultRate: 0.24, emissionsFactorKgPerKwh: 0.18, dataSourceId: 'eia', notes: 'Northern New England profile', isEstimate: true },
  { code: 'MD', name: 'Maryland', slug: 'maryland', countryCode: 'US', peakSunHours: 4.5, defaultRate: 0.17, emissionsFactorKgPerKwh: 0.33, dataSourceId: 'eia', notes: 'Mid-Atlantic SREC market', isEstimate: true },
  { code: 'MA', name: 'Massachusetts', slug: 'massachusetts', countryCode: 'US', peakSunHours: 4.2, defaultRate: 0.28, emissionsFactorKgPerKwh: 0.28, dataSourceId: 'eia', notes: 'SMART solar program state', isEstimate: true },
  { code: 'MI', name: 'Michigan', slug: 'michigan', countryCode: 'US', peakSunHours: 4.0, defaultRate: 0.19, emissionsFactorKgPerKwh: 0.46, dataSourceId: 'eia', notes: 'Great Lakes solar profile', isEstimate: true },
  { code: 'MN', name: 'Minnesota', slug: 'minnesota', countryCode: 'US', peakSunHours: 4.3, defaultRate: 0.15, emissionsFactorKgPerKwh: 0.39, dataSourceId: 'eia', notes: 'Community solar pioneer state', isEstimate: true },
  { code: 'MS', name: 'Mississippi', slug: 'mississippi', countryCode: 'US', peakSunHours: 4.8, defaultRate: 0.13, emissionsFactorKgPerKwh: 0.41, dataSourceId: 'eia', notes: 'Deep South utility tariffs', isEstimate: true },
  { code: 'MO', name: 'Missouri', slug: 'missouri', countryCode: 'US', peakSunHours: 4.6, defaultRate: 0.13, emissionsFactorKgPerKwh: 0.65, dataSourceId: 'eia', notes: 'Midwest solar profile', isEstimate: true },
  { code: 'MT', name: 'Montana', slug: 'montana', countryCode: 'US', peakSunHours: 4.5, defaultRate: 0.13, emissionsFactorKgPerKwh: 0.48, dataSourceId: 'nrel', notes: 'Northern Rockies solar resource', isEstimate: true },
  { code: 'NE', name: 'Nebraska', slug: 'nebraska', countryCode: 'US', peakSunHours: 4.8, defaultRate: 0.11, emissionsFactorKgPerKwh: 0.52, dataSourceId: 'eia', notes: 'Public power utility rates', isEstimate: true },
  { code: 'NV', name: 'Nevada', slug: 'nevada', countryCode: 'US', peakSunHours: 6.0, defaultRate: 0.16, emissionsFactorKgPerKwh: 0.31, dataSourceId: 'nrel', notes: 'Mojave desert solar resource', isEstimate: true },
  { code: 'NH', name: 'New Hampshire', slug: 'new-hampshire', countryCode: 'US', peakSunHours: 4.1, defaultRate: 0.23, emissionsFactorKgPerKwh: 0.20, dataSourceId: 'eia', notes: 'Northern New England rates', isEstimate: true },
  { code: 'NJ', name: 'New Jersey', slug: 'new-jersey', countryCode: 'US', peakSunHours: 4.4, defaultRate: 0.18, emissionsFactorKgPerKwh: 0.26, dataSourceId: 'eia', notes: 'SuREC incentive market', isEstimate: true },
  { code: 'NM', name: 'New Mexico', slug: 'new-mexico', countryCode: 'US', peakSunHours: 6.1, defaultRate: 0.14, emissionsFactorKgPerKwh: 0.53, dataSourceId: 'nrel', notes: 'High desert solar resource', isEstimate: true },
  { code: 'NY', name: 'New York', slug: 'new-york', countryCode: 'US', peakSunHours: 4.2, defaultRate: 0.22, emissionsFactorKgPerKwh: 0.21, dataSourceId: 'eia', notes: 'NY-Sun rebate market', isEstimate: true },
  { code: 'NC', name: 'North Carolina', slug: 'north-carolina', countryCode: 'US', peakSunHours: 4.8, defaultRate: 0.13, emissionsFactorKgPerKwh: 0.30, dataSourceId: 'eia', notes: 'Southeast solar market', isEstimate: true },
  { code: 'ND', name: 'North Dakota', slug: 'north-dakota', countryCode: 'US', peakSunHours: 4.4, defaultRate: 0.11, emissionsFactorKgPerKwh: 0.69, dataSourceId: 'eia', notes: 'Northern Plains profile', isEstimate: true },
  { code: 'OH', name: 'Ohio', slug: 'ohio', countryCode: 'US', peakSunHours: 4.1, defaultRate: 0.16, emissionsFactorKgPerKwh: 0.54, dataSourceId: 'eia', notes: 'Midwest grid profile', isEstimate: true },
  { code: 'OK', name: 'Oklahoma', slug: 'oklahoma', countryCode: 'US', peakSunHours: 5.2, defaultRate: 0.12, emissionsFactorKgPerKwh: 0.42, dataSourceId: 'nrel', notes: 'South Plains solar resource', isEstimate: true },
  { code: 'OR', name: 'Oregon', slug: 'oregon', countryCode: 'US', peakSunHours: 4.3, defaultRate: 0.13, emissionsFactorKgPerKwh: 0.15, dataSourceId: 'nrel', notes: 'Pacific Northwest hydro mix', isEstimate: true },
  { code: 'PA', name: 'Pennsylvania', slug: 'pennsylvania', countryCode: 'US', peakSunHours: 4.2, defaultRate: 0.18, emissionsFactorKgPerKwh: 0.34, dataSourceId: 'eia', notes: 'PJM grid interconnect', isEstimate: true },
  { code: 'RI', name: 'Rhode Island', slug: 'rhode-island', countryCode: 'US', peakSunHours: 4.2, defaultRate: 0.27, emissionsFactorKgPerKwh: 0.38, dataSourceId: 'eia', notes: 'New England coastal rates', isEstimate: true },
  { code: 'SC', name: 'South Carolina', slug: 'south-carolina', countryCode: 'US', peakSunHours: 4.9, defaultRate: 0.14, emissionsFactorKgPerKwh: 0.28, dataSourceId: 'eia', notes: 'Southeast solar access', isEstimate: true },
  { code: 'SD', name: 'South Dakota', slug: 'south-dakota', countryCode: 'US', peakSunHours: 4.7, defaultRate: 0.13, emissionsFactorKgPerKwh: 0.22, dataSourceId: 'eia', notes: 'Northern Plains profile', isEstimate: true },
  { code: 'TN', name: 'Tennessee', slug: 'tennessee', countryCode: 'US', peakSunHours: 4.6, defaultRate: 0.12, emissionsFactorKgPerKwh: 0.34, dataSourceId: 'eia', notes: 'TVA utility region', isEstimate: true },
  { code: 'TX', name: 'Texas', slug: 'texas', countryCode: 'US', peakSunHours: 5.5, defaultRate: 0.14, emissionsFactorKgPerKwh: 0.43, dataSourceId: 'eia', notes: 'ERCOT competitive market', isEstimate: true },
  { code: 'UT', name: 'Utah', slug: 'utah', countryCode: 'US', peakSunHours: 5.6, defaultRate: 0.12, emissionsFactorKgPerKwh: 0.61, dataSourceId: 'nrel', notes: 'Intermountain solar resource', isEstimate: true },
  { code: 'VT', name: 'Vermont', slug: 'vermont', countryCode: 'US', peakSunHours: 3.9, defaultRate: 0.21, emissionsFactorKgPerKwh: 0.05, dataSourceId: 'eia', notes: 'Low carbon grid mix', isEstimate: true },
  { code: 'VA', name: 'Virginia', slug: 'virginia', countryCode: 'US', peakSunHours: 4.6, defaultRate: 0.14, emissionsFactorKgPerKwh: 0.29, dataSourceId: 'eia', notes: 'Virginia Clean Economy Act', isEstimate: true },
  { code: 'WA', name: 'Washington', slug: 'washington', countryCode: 'US', peakSunHours: 3.9, defaultRate: 0.11, emissionsFactorKgPerKwh: 0.10, dataSourceId: 'eia', notes: 'Low hydro utility rates', isEstimate: true },
  { code: 'WV', name: 'West Virginia', slug: 'west-virginia', countryCode: 'US', peakSunHours: 4.1, defaultRate: 0.14, emissionsFactorKgPerKwh: 0.82, dataSourceId: 'eia', notes: 'Coal-dominant grid baseline', isEstimate: true },
  { code: 'WI', name: 'Wisconsin', slug: 'wisconsin', countryCode: 'US', peakSunHours: 4.2, defaultRate: 0.17, emissionsFactorKgPerKwh: 0.51, dataSourceId: 'eia', notes: 'Upper Midwest solar profile', isEstimate: true },
  { code: 'WY', name: 'Wyoming', slug: 'wyoming', countryCode: 'US', peakSunHours: 5.2, defaultRate: 0.12, emissionsFactorKgPerKwh: 0.84, dataSourceId: 'eia', notes: 'High elevation solar resource', isEstimate: true },
  { code: 'DC', name: 'District of Columbia', slug: 'district-of-columbia', countryCode: 'US', peakSunHours: 4.4, defaultRate: 0.16, emissionsFactorKgPerKwh: 0.31, dataSourceId: 'eia', notes: 'High DC SREC market', isEstimate: true },
];

// All 28 Indian States + 8 Union Territories
const IN_STATES: RegionData[] = [
  { code: 'MH', name: 'Maharashtra', slug: 'maharashtra', countryCode: 'IN', peakSunHours: 5.4, defaultRate: 9.20, emissionsFactorKgPerKwh: 0.72, dataSourceId: 'cea_india', notes: 'MSEDCL DISCOM slab tariff', isEstimate: true },
  { code: 'GJ', name: 'Gujarat', slug: 'gujarat', countryCode: 'IN', peakSunHours: 5.8, defaultRate: 7.80, emissionsFactorKgPerKwh: 0.70, dataSourceId: 'cea_india', notes: 'Surya Gujarat pioneer state', isEstimate: true },
  { code: 'RJ', name: 'Rajasthan', slug: 'rajasthan', countryCode: 'IN', peakSunHours: 6.1, defaultRate: 7.50, emissionsFactorKgPerKwh: 0.74, dataSourceId: 'cea_india', notes: 'Highest solar irradiance in India', isEstimate: true },
  { code: 'KA', name: 'Karnataka', slug: 'karnataka', countryCode: 'IN', peakSunHours: 5.3, defaultRate: 8.40, emissionsFactorKgPerKwh: 0.65, dataSourceId: 'cea_india', notes: 'BESCOM tariff slab', isEstimate: true },
  { code: 'TN', name: 'Tamil Nadu', slug: 'tamil-nadu', countryCode: 'IN', peakSunHours: 5.5, defaultRate: 7.90, emissionsFactorKgPerKwh: 0.68, dataSourceId: 'cea_india', notes: 'TANGEDCO tariff structure', isEstimate: true },
  { code: 'TS', name: 'Telangana', slug: 'telangana', countryCode: 'IN', peakSunHours: 5.4, defaultRate: 8.10, emissionsFactorKgPerKwh: 0.73, dataSourceId: 'cea_india', notes: 'TSSPDCL tariff benchmark', isEstimate: true },
  { code: 'AP', name: 'Andhra Pradesh', slug: 'andhra-pradesh', countryCode: 'IN', peakSunHours: 5.5, defaultRate: 7.60, emissionsFactorKgPerKwh: 0.71, dataSourceId: 'cea_india', notes: 'APCPDCL solar tariff', isEstimate: true },
  { code: 'KL', name: 'Kerala', slug: 'kerala', countryCode: 'IN', peakSunHours: 4.8, defaultRate: 7.20, emissionsFactorKgPerKwh: 0.55, dataSourceId: 'cea_india', notes: 'KSEB slab rate structure', isEstimate: true },
  { code: 'DL', name: 'Delhi', slug: 'delhi', countryCode: 'IN', peakSunHours: 5.0, defaultRate: 8.00, emissionsFactorKgPerKwh: 0.69, dataSourceId: 'cea_india', notes: 'BSES & TPDDL tariff structure', isEstimate: true },
  { code: 'UP', name: 'Uttar Pradesh', slug: 'uttar-pradesh', countryCode: 'IN', peakSunHours: 5.1, defaultRate: 7.50, emissionsFactorKgPerKwh: 0.76, dataSourceId: 'cea_india', notes: 'UPPCL DISCOM slab rates', isEstimate: true },
  { code: 'MP', name: 'Madhya Pradesh', slug: 'madhya-pradesh', countryCode: 'IN', peakSunHours: 5.5, defaultRate: 7.40, emissionsFactorKgPerKwh: 0.75, dataSourceId: 'cea_india', notes: 'MPPKVVCL solar rate', isEstimate: true },
  { code: 'WB', name: 'West Bengal', slug: 'west-bengal', countryCode: 'IN', peakSunHours: 4.7, defaultRate: 8.50, emissionsFactorKgPerKwh: 0.78, dataSourceId: 'cea_india', notes: 'WBSEDCL tariff benchmark', isEstimate: true },
  { code: 'PB', name: 'Punjab', slug: 'punjab', countryCode: 'IN', peakSunHours: 5.0, defaultRate: 7.90, emissionsFactorKgPerKwh: 0.71, dataSourceId: 'cea_india', notes: 'PSPCL DISCOM tariff slab', isEstimate: true },
  { code: 'HR', name: 'Haryana', slug: 'haryana', countryCode: 'IN', peakSunHours: 5.1, defaultRate: 7.80, emissionsFactorKgPerKwh: 0.72, dataSourceId: 'cea_india', notes: 'UHBVN & DHBVN DISCOM rates', isEstimate: true },
  { code: 'BR', name: 'Bihar', slug: 'bihar', countryCode: 'IN', peakSunHours: 4.9, defaultRate: 7.60, emissionsFactorKgPerKwh: 0.79, dataSourceId: 'cea_india', notes: 'NBPDCL & SBPDCL slab rates', isEstimate: true },
  { code: 'OD', name: 'Odisha', slug: 'odisha', countryCode: 'IN', peakSunHours: 5.1, defaultRate: 6.80, emissionsFactorKgPerKwh: 0.81, dataSourceId: 'cea_india', notes: 'TPCODL solar tariff', isEstimate: true },
  { code: 'CT', name: 'Chhattisgarh', slug: 'chhattisgarh', countryCode: 'IN', peakSunHours: 5.3, defaultRate: 6.90, emissionsFactorKgPerKwh: 0.84, dataSourceId: 'cea_india', notes: 'CSPDCL DISCOM rates', isEstimate: true },
  { code: 'JH', name: 'Jharkhand', slug: 'jharkhand', countryCode: 'IN', peakSunHours: 5.0, defaultRate: 6.70, emissionsFactorKgPerKwh: 0.82, dataSourceId: 'cea_india', notes: 'JBVNL solar tariff', isEstimate: true },
  { code: 'GA', name: 'Goa', slug: 'goa', countryCode: 'IN', peakSunHours: 5.2, defaultRate: 5.80, emissionsFactorKgPerKwh: 0.65, dataSourceId: 'cea_india', notes: 'Goa Electricity Dept rate', isEstimate: true },
  { code: 'UK', name: 'Uttarakhand', slug: 'uttarakhand', countryCode: 'IN', peakSunHours: 4.8, defaultRate: 6.20, emissionsFactorKgPerKwh: 0.35, dataSourceId: 'cea_india', notes: 'UPCL hydro-solar tariff', isEstimate: true },
  { code: 'HP', name: 'Himachal Pradesh', slug: 'himachal-pradesh', countryCode: 'IN', peakSunHours: 4.6, defaultRate: 5.40, emissionsFactorKgPerKwh: 0.20, dataSourceId: 'cea_india', notes: 'HPSEB hydro-dominant tariff', isEstimate: true },
  { code: 'JK', name: 'Jammu and Kashmir', slug: 'jammu-and-kashmir', countryCode: 'IN', peakSunHours: 4.5, defaultRate: 4.80, emissionsFactorKgPerKwh: 0.25, dataSourceId: 'cea_india', notes: 'JKPDD domestic tariff', isEstimate: true },
  { code: 'LA', name: 'Ladakh', slug: 'ladakh', countryCode: 'IN', peakSunHours: 5.8, defaultRate: 4.50, emissionsFactorKgPerKwh: 0.15, dataSourceId: 'cea_india', notes: 'High altitude solar irradiance', isEstimate: true },
  { code: 'AS', name: 'Assam', slug: 'assam', countryCode: 'IN', peakSunHours: 4.4, defaultRate: 7.50, emissionsFactorKgPerKwh: 0.60, dataSourceId: 'cea_india', notes: 'APDCL domestic tariff', isEstimate: true },
  { code: 'TR', name: 'Tripura', slug: 'tripura', countryCode: 'IN', peakSunHours: 4.5, defaultRate: 6.80, emissionsFactorKgPerKwh: 0.58, dataSourceId: 'cea_india', notes: 'TSECL solar tariff', isEstimate: true },
  { code: 'ML', name: 'Meghalaya', slug: 'meghalaya', countryCode: 'IN', peakSunHours: 4.3, defaultRate: 6.50, emissionsFactorKgPerKwh: 0.30, dataSourceId: 'cea_india', notes: 'MePDCL domestic rate', isEstimate: true },
  { code: 'MN', name: 'Manipur', slug: 'manipur', countryCode: 'IN', peakSunHours: 4.5, defaultRate: 6.20, emissionsFactorKgPerKwh: 0.40, dataSourceId: 'cea_india', notes: 'MSPDCL solar tariff', isEstimate: true },
  { code: 'NL', name: 'Nagaland', slug: 'nagaland', countryCode: 'IN', peakSunHours: 4.4, defaultRate: 6.40, emissionsFactorKgPerKwh: 0.42, dataSourceId: 'cea_india', notes: 'Department of Power rate', isEstimate: true },
  { code: 'AR', name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', countryCode: 'IN', peakSunHours: 4.2, defaultRate: 5.60, emissionsFactorKgPerKwh: 0.22, dataSourceId: 'cea_india', notes: 'Department of Power tariff', isEstimate: true },
  { code: 'MZ', name: 'Mizoram', slug: 'mizoram', countryCode: 'IN', peakSunHours: 4.5, defaultRate: 6.10, emissionsFactorKgPerKwh: 0.35, dataSourceId: 'cea_india', notes: 'P&ED domestic tariff', isEstimate: true },
  { code: 'SK', name: 'Sikkim', slug: 'sikkim', countryCode: 'IN', peakSunHours: 4.2, defaultRate: 5.20, emissionsFactorKgPerKwh: 0.18, dataSourceId: 'cea_india', notes: 'Hydro grid tariff', isEstimate: true },
  { code: 'PY', name: 'Puducherry', slug: 'puducherry', countryCode: 'IN', peakSunHours: 5.4, defaultRate: 6.50, emissionsFactorKgPerKwh: 0.66, dataSourceId: 'cea_india', notes: 'Electricity Dept tariff', isEstimate: true },
  { code: 'CH', name: 'Chandigarh', slug: 'chandigarh', countryCode: 'IN', peakSunHours: 5.0, defaultRate: 6.20, emissionsFactorKgPerKwh: 0.68, dataSourceId: 'cea_india', notes: 'UT Electricity Dept rate', isEstimate: true },
  { code: 'AN', name: 'Andaman and Nicobar', slug: 'andaman-and-nicobar', countryCode: 'IN', peakSunHours: 5.1, defaultRate: 8.50, emissionsFactorKgPerKwh: 0.78, dataSourceId: 'cea_india', notes: 'Island grid diesel baseline', isEstimate: true },
  { code: 'LD', name: 'Lakshadweep', slug: 'lakshadweep', countryCode: 'IN', peakSunHours: 5.3, defaultRate: 8.20, emissionsFactorKgPerKwh: 0.80, dataSourceId: 'cea_india', notes: 'Island microgrid rate', isEstimate: true },
  { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu', slug: 'daman-and-diu', countryCode: 'IN', peakSunHours: 5.4, defaultRate: 5.20, emissionsFactorKgPerKwh: 0.71, dataSourceId: 'cea_india', notes: 'UT industrial tariff', isEstimate: true },
];

export const ALL_REGIONS: RegionData[] = [...US_STATES, ...IN_STATES];

export function getRegionsByCountry(countryCode: string): RegionData[] {
  return ALL_REGIONS.filter((r) => r.countryCode === countryCode);
}

export function getRegionBySlug(slug: string, countryCode?: string): RegionData | undefined {
  return ALL_REGIONS.find((r) => r.slug === slug && (!countryCode || r.countryCode === countryCode));
}
