import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COUNTRIES } from '../lib/location/countries';
import { getRegionsByCountry } from '../lib/location/regions';
import { updatePageSeo } from '../lib/seo/seo';
import { SolarPanelCalculator } from '../components/calculators/SolarPanelCalculator';
import { DataSourcesMethodology } from '../components/common/DataSourcesMethodology';
import { MapPin, Sun, Zap, HelpCircle } from 'lucide-react';

export const CountryLandingPage: React.FC = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>();

  // Map slug to country code
  const codeMap: Record<string, string> = {
    usa: 'US',
    india: 'IN',
    canada: 'CA',
    australia: 'AU',
    uk: 'UK',
  };

  const countryCode = codeMap[countrySlug?.toLowerCase() || 'usa'] || 'US';
  const country = COUNTRIES[countryCode] || COUNTRIES.US;
  const states = getRegionsByCountry(countryCode);

  useEffect(() => {
    updatePageSeo({
      title: `Solar Panel Calculator ${country.name} (2026) | Local Rates & Sizing`,
      description: `Free production-ready solar panel requirement calculator for ${country.name}. Calculated using ${country.name} solar irradiance and local ${country.currencySymbol} tariffs.`,
      canonicalUrl: `https://solarpanelcalculator.org/solar-panel-calculator/${countrySlug}`,
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Calculators', url: 'https://solarpanelcalculator.org/calculators' },
        { name: country.name, url: `https://solarpanelcalculator.org/solar-panel-calculator/${countrySlug}` },
      ],
      faqs: [
        {
          question: `How many solar panels do I need in ${country.name}?`,
          answer: `The average residential home in ${country.name} requires between 15 and 20 solar panels (400W rating) to offset 100% of standard household electricity usage.`,
        },
        {
          question: `What is the average electricity rate in ${country.name}?`,
          answer: `Average residential electricity rates in ${country.name} baseline around ${country.currencySymbol}${country.defaultRate} per kWh.`,
        },
      ],
    });
  }, [country, countrySlug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
          <MapPin className="w-3.5 h-3.5" /> Regional Solar Benchmark: {country.name}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Solar Panel Calculator {country.name}
        </h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Calculate system capacity, required module count, annual generation yield, and financial savings tailored to solar irradiance benchmarks and utility electricity rates in {country.name}.
        </p>
      </div>

      {/* Embedded Live Calculator */}
      <div className="space-y-4">
        <SolarPanelCalculator />
        <DataSourcesMethodology />
      </div>

      {/* States / Regions Grid */}
      {states.length > 0 && (
        <div className="solar-card p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" /> Select Your {country.subdivisionType} in {country.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select your state to load localized peak sun hours and utility electricity rate assumptions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {states.map((st) => (
              <Link
                key={st.code}
                to={`/solar-panel-calculator/${countrySlug}/${st.slug}`}
                className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 hover:border-amber-300 text-xs transition-all group"
              >
                <span className="font-bold text-slate-900 group-hover:text-amber-950 block">{st.name}</span>
                <span className="text-[11px] text-slate-500 group-hover:text-amber-800 block mt-0.5">
                  {st.peakSunHours} PSH • {country.currencySymbol}{st.defaultRate}/kWh
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Country Specific Information */}
      <div className="solar-card p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Solar Energy Considerations in {country.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700 leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-sm text-slate-900">Solar Irradiance Yield</h3>
            <p>
              Average peak sun hours in {country.name} range around <strong>{country.defaultPeakSunHours} hours per day</strong>, delivering excellent solar generation potential.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Sun className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Electricity Tariff Rates</h3>
            <p>
              Utility rates average approximately <strong>{country.currencySymbol}{country.defaultRate} per kWh</strong>. Locking in zero-cost solar electricity protects your household against rising grid rates.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-sm text-slate-900">Grid Interconnection</h3>
            <p>
              Rooftop systems in {country.name} connect seamlessly under regional net metering regulations to credit excess daytime solar exports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
