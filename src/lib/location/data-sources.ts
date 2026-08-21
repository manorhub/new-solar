export interface DataSourceMetadata {
  id: string;
  name: string;
  organization: string;
  url: string;
  lastReviewed: string;
  description: string;
}

export const DATA_SOURCES: Record<string, DataSourceMetadata> = {
  nrel: {
    id: 'nrel',
    name: 'PVWatts® Calculator & National Solar Radiation Database',
    organization: 'National Renewable Energy Laboratory (NREL), US Dept. of Energy',
    url: 'https://pvwatts.nrel.gov/',
    lastReviewed: '2026-01-15',
    description: 'Provides high-resolution daily solar irradiance and peak sun hour data across North America and global coordinate grids.',
  },
  eia: {
    id: 'eia',
    name: 'Electric Power Monthly Average Retail Price of Electricity',
    organization: 'U.S. Energy Information Administration (EIA)',
    url: 'https://www.eia.gov/electricity/monthly/',
    lastReviewed: '2026-02-01',
    description: 'Authoritative state-by-state average residential electricity prices in cents per kilowatt-hour ($/kWh).',
  },
  cea_india: {
    id: 'cea_india',
    name: 'Rooftop Solar Tariff & Grid Emissions Benchmark Report',
    organization: 'Central Electricity Authority (CEA) & Ministry of New and Renewable Energy (MNRE), Govt. of India',
    url: 'https://pmsuryaghar.gov.in/',
    lastReviewed: '2026-02-10',
    description: 'State-wise consumer tariffs, DISCOM slab breakdowns, and PM Surya Ghar subsidy rules.',
  },
  world_bank: {
    id: 'world_bank',
    name: 'Global Solar Atlas 2.0',
    organization: 'World Bank Group / ESMAP / Solargis',
    url: 'https://globalsolaratlas.info/',
    lastReviewed: '2026-01-20',
    description: 'Global long-term annual solar resource data (GHI, DNI, GTI) for international countries.',
  },
  epa_egrid: {
    id: 'epa_egrid',
    name: 'Emissions & Generation Resource Integrated Database (eGRID)',
    organization: 'U.S. Environmental Protection Agency (EPA)',
    url: 'https://www.epa.gov/egrid',
    lastReviewed: '2025-11-30',
    description: 'Regional grid carbon intensity factors (kg CO2e / kWh) for calculating environmental offsets.',
  },
};
