import React from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { Info, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DataSourcesMethodology: React.FC = () => {
  const {
    activeCountry,
    activeRegion,
    cityName,
    electricityRate,
    peakSunHours,
    isRateUserOverridden,
    isPshUserOverridden,
    activeDataSource,
  } = useSolarSettings();

  return (
    <div className="solar-card p-5 space-y-4 bg-slate-50/80 border-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-500" /> Regional Data Sources & Methodology
        </h4>
        <div className="flex items-center gap-2 text-xs">
          <Link to="/methodology" className="text-amber-600 font-bold hover:underline">
            Calculation Methodology
          </Link>
          <span className="text-slate-300">•</span>
          <Link to="/data-sources" className="text-amber-600 font-bold hover:underline">
            All Data Sources
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {/* Location & Solar Irradiance */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span className="font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" /> Applied Region
            </span>
            <span className="font-bold text-slate-900">
              {cityName ? `${cityName}, ` : ''}{activeRegion?.name || activeCountry.name}
            </span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Peak Sun Hours:</span>
            <strong className="text-slate-900">
              {peakSunHours} hrs/day {isPshUserOverridden ? '(User Override)' : '(Representative)'}
            </strong>
          </div>
        </div>

        {/* Electricity Tariff Rate */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Electricity Rate:</span>
            <strong className="text-slate-900">
              {activeCountry.currencySymbol}{electricityRate} / kWh
            </strong>
          </div>
          <div className="text-[11px] text-slate-500">
            {isRateUserOverridden
              ? 'Using your custom rate entry.'
              : `Using representative ${activeRegion?.name || activeCountry.name} tariff default.`}
          </div>
        </div>

        {/* Primary Data Benchmark Citation */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Source Dataset:</span>
            <span className="font-bold text-slate-900 truncate max-w-[120px]" title={activeDataSource?.name}>
              {activeDataSource?.organization || 'NREL PVWatts'}
            </span>
          </div>
          {activeDataSource?.url && (
            <a
              href={activeDataSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-amber-600 font-semibold hover:underline flex items-center gap-1"
            >
              Verify Source <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <span>
          Regional values are non-binding representative estimates. Actual solar production varies by shading, roof pitch, temperature, and utility tariff rate structures.
        </span>
      </p>
    </div>
  );
};
