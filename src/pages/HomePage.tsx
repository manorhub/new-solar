import React from 'react';
import { useSolarSettings } from '../context/SolarSettingsContext';
import { CALCULATORS_REGISTRY } from '../lib/data/calculatorsData';
import { SOLAR_GUIDES } from '../lib/data/guidesData';
import { updatePageSeo } from '../lib/seo/seo';
import { Sun, Globe, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface HomePageProps {
  onNavigate?: (path: string) => void;
  onOpenSearch?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const handleNav = onNavigate || ((path: string) => navigate(path));
  const { currencySymbol, peakSunHours, setIsLocationModalOpen, activeCountry } = useSolarSettings();

  React.useEffect(() => {
    updatePageSeo({
      title: 'Free Solar Panel Calculators — Estimate System Size, Savings & Cost',
      description: 'Calculate solar system size, panel requirements, energy production, solar savings, cost, battery storage, payback period, ROI, roof area, and CO₂ reduction.',
      canonicalUrl: 'https://solarpanelcalculator.org/',
    });
  }, []);

  const popularCalculators = CALCULATORS_REGISTRY.slice(0, 6);

  const faqs = [
    {
      question: 'How do I calculate how many solar panels I need?',
      answer: 'Divide your monthly electricity usage (kWh) by the product of regional peak sun hours, 30.4 days, and an 80% Performance Ratio to find required kW capacity, then divide by module wattage.',
    },
    {
      question: 'How accurate are these solar calculations?',
      answer: 'Our tools use deterministic photovoltaic engineering equations and official government solar irradiance datasets (NREL, EIA, CEA India). Site-specific installer assessments should verify local roof shading and tilt.',
    },
    {
      question: 'Are national tax credits included in cost estimates?',
      answer: 'Yes, our regional engines factor in major national incentives such as the US 30% Federal ITC and India PM Surya Ghar subsidy.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-slate-50 to-slate-50 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Region Selector Pill */}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs hover:border-amber-300 transition-all text-xs font-semibold text-slate-800"
              >
                <Globe className="w-4 h-4 text-amber-500" />
                <span>Preset: {activeCountry.name} ({currencySymbol}) • {peakSunHours}h Peak Sun</span>
                <span className="text-amber-600 font-bold ml-1">Change &rarr;</span>
              </button>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Free Solar Panel Calculators
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Calculate solar system size, panel requirements, energy production, solar savings, cost, battery storage, payback period, ROI, roof area, and CO₂ reduction with transparent, deterministic engineering mathematics.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleNav('/solar-panel-calculator')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-base rounded-2xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Calculate Your Solar System
                </button>

                <button
                  onClick={() => handleNav('/calculators')}
                  className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-base rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  Explore Solar Calculators
                </button>
              </div>

              {/* Trust Micro-Pillars */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold border-t border-slate-200/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free & Independent
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pure PV Mathematics
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> USA, India & Global Presets
                </span>
              </div>
            </div>

            {/* Right Visual Simulator Box */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 rounded-3xl shadow-2xl border border-slate-700 space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                      <Sun className="w-5 h-5 animate-spin-slow" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Interactive Solar Simulator</span>
                      <span className="text-[10px] text-slate-400">Live 6.6 kW Residential Example</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Annual Output</span>
                      <span className="text-base font-black text-white">8,900 kWh</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Est. Payback</span>
                      <span className="text-base font-black text-emerald-400">5.8 Years</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleNav('/solar-panel-calculator')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider text-center transition-colors shadow-md"
                >
                  Calculate Your Setup &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR CALCULATORS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
            Featured Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Popular Solar Calculators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCalculators.map((calc) => (
            <div
              key={calc.id}
              onClick={() => handleNav(`/${calc.slug}`)}
              className="solar-card p-6 cursor-pointer hover:border-amber-500/50 hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {calc.categoryName}
                </span>
                <h3 className="text-lg font-bold text-slate-950 group-hover:text-amber-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {calc.shortDescription}
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-500">
                  <strong>Primary Use:</strong> {calc.primaryUseCase}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Simple 4-Step Process</span>
            <h2 className="text-3xl font-black text-white">How Solar Calculations Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm mb-3">1</span>
              <h3 className="font-bold text-sm text-white">Set Your Location</h3>
              <p className="text-slate-400">Select your country, state, or ZIP/PIN code to load regional peak sun hours and tariff defaults.</p>
            </div>
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm mb-3">2</span>
              <h3 className="font-bold text-sm text-white">Enter Electricity Demand</h3>
              <p className="text-slate-400">Input your monthly bill ($/mo or ₹/mo) or your actual kWh consumption.</p>
            </div>
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm mb-3">3</span>
              <h3 className="font-bold text-sm text-white">Configure Hardware</h3>
              <p className="text-slate-400">Select solar module wattage ratings (350W–540W) and Performance Ratio derating factors.</p>
            </div>
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm mb-3">4</span>
              <h3 className="font-bold text-sm text-white">Inspect Instant Results</h3>
              <p className="text-slate-400">View recommended system kW capacity, panel count, 25-year cash flows, and payback timelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. USA + INDIA + INTERNATIONAL SUPPORT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="solar-card p-8 bg-gradient-to-br from-amber-500/10 to-slate-50 border-amber-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 block">Global & Regional Localization</span>
              <h2 className="text-2xl font-black text-slate-950 mt-1">Built for USA, India & International Markets</h2>
              <p className="text-xs text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Whether sizing a system in California under NEM 3.0 or in Maharashtra under the PM Surya Ghar subsidy, our location engines apply correct regional sun hours, currency formats, and tax incentives.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to="/solar-panel-calculator/usa" className="solar-button py-2 px-4 text-xs font-bold">
                🇺🇸 USA Solar Hub
              </Link>
              <Link to="/solar-panel-calculator/india" className="solar-button py-2 px-4 text-xs font-bold">
                🇮🇳 India Solar Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. POPULAR GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Educational Resources</span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-1">Popular Solar Guides</h2>
          </div>
          <Link to="/guides" className="text-xs font-bold text-amber-600 hover:underline">
            Browse All 25 Guides &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SOLAR_GUIDES.slice(0, 3).map((guide) => (
            <div
              key={guide.slug}
              onClick={() => handleNav(`/guides/${guide.slug}`)}
              className="solar-card p-6 cursor-pointer hover:border-amber-500/50 transition-all space-y-3 group"
            >
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">{guide.category}</span>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-amber-600 transition-colors">{guide.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3">{guide.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <h2 className="text-2xl font-bold text-slate-950 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="solar-card p-5 space-y-1 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
