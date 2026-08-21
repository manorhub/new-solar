import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COUNTRIES } from '../lib/location/countries';
import { getRegionBySlug } from '../lib/location/regions';
import { updatePageSeo } from '../lib/seo/seo';
import { SolarPanelCalculator } from '../components/calculators/SolarPanelCalculator';
import { DataSourcesMethodology } from '../components/common/DataSourcesMethodology';
import { Zap } from 'lucide-react';

export const StateLandingPage: React.FC = () => {
  const { countrySlug, stateSlug } = useParams<{ countrySlug: string; stateSlug: string }>();

  const countryCode = countrySlug?.toLowerCase() === 'india' ? 'IN' : 'US';
  const country = COUNTRIES[countryCode] || COUNTRIES.US;
  const region = getRegionBySlug(stateSlug || '', countryCode);

  useEffect(() => {
    if (region) {
      updatePageSeo({
        title: `Solar Panel Calculator ${region.name} (${country.name}) | 2026 Rates`,
        description: `Calculate solar panel system sizing, panel count, annual kWh generation, and financial payback in ${region.name}. Based on ${region.peakSunHours} PSH & ${country.currencySymbol}${region.defaultRate}/kWh.`,
        canonicalUrl: `https://solarpanelcalculator.org/solar-panel-calculator/${countrySlug}/${stateSlug}`,
        breadcrumbs: [
          { name: 'Home', url: 'https://solarpanelcalculator.org' },
          { name: country.name, url: `https://solarpanelcalculator.org/solar-panel-calculator/${countrySlug}` },
          { name: region.name, url: `https://solarpanelcalculator.org/solar-panel-calculator/${countrySlug}/${stateSlug}` },
        ],
        faqs: [
          {
            question: `How many solar panels do I need in ${region.name}?`,
            answer: `In ${region.name}, a standard home consuming 850 kWh/mo requires approximately 16 to 20 solar panels (400W rating) based on local irradiance of ${region.peakSunHours} peak sun hours per day.`,
          },
          {
            question: `What is the average solar electricity rate in ${region.name}?`,
            answer: `The representative residential electricity tariff baseline in ${region.name} is ${country.currencySymbol}${region.defaultRate} per kWh.`,
          },
        ],
      });
    }
  }, [country, countrySlug, region, stateSlug]);

  if (!region) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">State / Region Not Found</h2>
        <p className="text-slate-600 text-sm">We could not locate state data for "{stateSlug}".</p>
        <Link to={`/solar-panel-calculator/${countrySlug}`} className="solar-button inline-flex py-2 px-6">
          Return to {country.name} Calculators
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <Link to={`/solar-panel-calculator/${countrySlug}`} className="hover:text-amber-400">
            {country.name}
          </Link>
          <span>/</span>
          <span className="text-amber-400">{region.name}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Solar Panel Calculator {region.name}
        </h1>

        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          State-specific calculation engine pre-configured with <strong>{region.name}</strong> solar irradiance (<strong>{region.peakSunHours} peak sun hours/day</strong>) and representative residential tariffs (<strong>{country.currencySymbol}{region.defaultRate} / kWh</strong>).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-700/60 text-xs">
          <div>
            <span className="text-slate-400 block">Peak Sun Hours</span>
            <span className="text-xl font-bold text-amber-400">{region.peakSunHours} hrs / day</span>
          </div>
          <div>
            <span className="text-slate-400 block">Baseline Tariff</span>
            <span className="text-xl font-bold text-emerald-400">{country.currencySymbol}{region.defaultRate} / kWh</span>
          </div>
          <div>
            <span className="text-slate-400 block">Grid Carbon Factor</span>
            <span className="text-xl font-bold text-blue-400">{region.emissionsFactorKgPerKwh} kg/kWh</span>
          </div>
          <div>
            <span className="text-slate-400 block">Data Benchmark</span>
            <span className="text-xl font-bold text-white uppercase">{region.dataSourceId}</span>
          </div>
        </div>
      </div>

      {/* Embedded Calculator pre-filled with state presets */}
      <div className="space-y-4">
        <SolarPanelCalculator />
        <DataSourcesMethodology />
      </div>

      {/* Localized Calculation Example */}
      <div className="solar-card p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" /> Sizing Benchmark Example for {region.name}
        </h2>
        <div className="p-6 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs text-amber-950 leading-relaxed space-y-3">
          <p>
            For a typical household in <strong>{region.name}</strong> consuming <strong>850 kWh per month</strong>:
          </p>
          <ul className="space-y-1.5 list-disc pl-5">
            <li><strong>Daily Energy Target</strong>: 850 kWh ÷ 30.4 days = 27.9 kWh / day</li>
            <li><strong>Solar System Capacity Required</strong>: 27.9 kWh ÷ ({region.peakSunHours} PSH × 0.80 PR) = <strong>{(27.9 / (region.peakSunHours * 0.80)).toFixed(2)} kW DC</strong></li>
            <li><strong>Suggested 400W Panel Count</strong>: <strong>{Math.ceil(((27.9 / (region.peakSunHours * 0.80)) * 1000) / 400)} Panels</strong></li>
            <li><strong>Est. Year 1 Savings</strong>: <strong>{country.currencySymbol}{Math.round(850 * 12 * region.defaultRate).toLocaleString()}</strong> per year</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
