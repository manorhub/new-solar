import React, { useEffect } from 'react';
import { updatePageSeo } from '../lib/seo/seo';
import { Database, ExternalLink, ShieldCheck, Calendar, Globe } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DATA_SOURCES } from '../lib/location/data-sources';

export const DataSourcesPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Solar Data Sources & Benchmark Citations | SolarEngine',
      description: 'Traceable database registry of external solar irradiance, utility tariffs, grid carbon emissions, and equipment standards used in SolarEngine calculations.',
      canonicalUrl: 'https://solarpanelcalculator.org/data-sources',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Data Sources', url: 'https://solarpanelcalculator.org/data-sources' },
      ],
    });
  }, []);

  const sourcesList = Object.values(DATA_SOURCES);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Data Sources & Citations' }]} />

      {/* Page Header */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold border border-amber-500/20">
          <Database className="w-4 h-4" /> Open Dataset Citations
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Data Sources & Citation Transparency Hub
        </h1>
        <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
          SolarEngine commits to 100% data transparency. Every regional peak sun hour value, default electricity tariff, utility inflation benchmark, and carbon emissions factor used across our 12 calculators is backed by verifiable government and international datasets.
        </p>
      </div>

      {/* Citation Registry Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Primary External Datasets & Benchmarks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sourcesList.map((source) => (
            <div key={source.id} className="solar-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800">
                    Official Dataset
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Calendar className="w-3 h-3" /> Reviewed {source.lastReviewed}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-950">{source.name}</h3>

                <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p><strong>Publishing Authority:</strong> {source.organization}</p>
                  <p><strong>Description:</strong> {source.description}</p>
                </div>
              </div>

              {source.url && (
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-blue-500" /> Traceable Source
                  </span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 hover:underline"
                  >
                    View Official Source <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Regional Citation Notes */}
      <div className="solar-card p-8 bg-slate-900 text-white space-y-4">
        <h2 className="text-lg font-bold text-amber-400">Regional Citation Methodologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm">🇺🇸 United States Dataset Standards</h3>
            <p>
              Peak sun hours derived from NREL PVWatts v8 TMY3 (Typical Meteorological Year) solar irradiance tables. Utility electricity rates sourced from US Energy Information Administration (EIA) Electric Power Monthly 2026 state averages.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm">🇮🇳 India Dataset Standards</h3>
            <p>
              Solar resource irradiance sourced from MNRE and Solargis maps. Utility tariff defaults based on DISCOM slab rates across 28 States and 8 UTs. Grid emissions factor (0.716 kg CO₂/kWh) sourced from Central Electricity Authority (CEA) v19 Database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
