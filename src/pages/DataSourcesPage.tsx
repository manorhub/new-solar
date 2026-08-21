import React, { useEffect } from 'react';
import { DATA_SOURCES } from '../lib/location/data-sources';
import { updatePageSeo } from '../lib/seo/seo';
import { ExternalLink, Database, CheckCircle2 } from 'lucide-react';

export const DataSourcesPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Solar Data Sources & Regional Irradiance Citations | Transparency Hub',
      description: 'Directory of external datasets, government benchmark registries, and solar irradiance databases used across our calculation platform.',
      canonicalUrl: 'https://solarpanelcalculator.org/data-sources',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Data Sources', url: 'https://solarpanelcalculator.org/data-sources' },
      ],
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-xs font-bold border border-blue-500/20">
          <Database className="w-4 h-4" /> Traceable Open Data Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Data Sources & Citations
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Every regional peak sun hour assumption, utility electricity tariff default, and grid carbon factor used by our calculators is traceable to authoritative government and academic institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(DATA_SOURCES).map((src) => (
          <div key={src.id} className="solar-card p-6 space-y-4 border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {src.organization}
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-2">{src.name}</h2>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{src.description}</p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Last Reviewed: {src.lastReviewed}</span>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 font-bold hover:underline flex items-center gap-1"
              >
                Access Dataset <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
