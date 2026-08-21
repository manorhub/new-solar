import React from 'react';
import { CALCULATORS_REGISTRY } from '../../lib/data/calculatorsData';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { Sun, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { setCountryCode, setIsLocationModalOpen } = useSolarSettings();

  const handleCountryClick = (code: string) => {
    setCountryCode(code);
    setIsLocationModalOpen(true);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                <Sun className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Solar<span className="text-amber-500">Engine</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Free, independent, transparent solar energy calculations for homeowners, commercial buyers, and energy engineers worldwide. Calculate panel counts, battery storage, 25-year financial savings, and tax incentives.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Deterministic Engineering Calculations
              </span>
            </div>
          </div>

          {/* Col 2: Top Calculators */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Calculators</h4>
            <ul className="space-y-2.5 text-xs">
              {CALCULATORS_REGISTRY.slice(0, 6).map((calc) => (
                <li key={calc.id}>
                  <button
                    onClick={() => onNavigate(`/${calc.slug}`)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {calc.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('/calculators')}
                  className="text-amber-400 hover:text-amber-300 font-bold"
                >
                  All 12 Calculators &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Solar Guides & Topics */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Solar Guides</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('/guides/how-many-solar-panels-do-i-need')} className="hover:text-amber-400 transition-colors">
                  How Many Panels Do I Need?
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/how-much-does-solar-cost-2026')} className="hover:text-amber-400 transition-colors">
                  Solar Costs Breakdown 2026
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/solar-battery-storage-guide')} className="hover:text-amber-400 transition-colors">
                  Battery Storage Buying Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/solar-payback-period-explained')} className="hover:text-amber-400 transition-colors">
                  Payback Period Math
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides')} className="text-amber-400 hover:text-amber-300 font-bold">
                  Browse All Guides &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Global Presets */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">International Presets</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleCountryClick('US')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  🇺🇸 United States (30% ITC)
                </button>
              </li>
              <li>
                <button onClick={() => handleCountryClick('IN')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  🇮🇳 India (PM Surya Ghar)
                </button>
              </li>
              <li>
                <button onClick={() => handleCountryClick('CA')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  🇨🇦 Canada (Greener Homes)
                </button>
              </li>
              <li>
                <button onClick={() => handleCountryClick('AU')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  🇦🇺 Australia (STC Rebate)
                </button>
              </li>
              <li>
                <button onClick={() => handleCountryClick('UK')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  🇬🇧 United Kingdom (0% VAT)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Engineering Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Disclaimer:</strong> Solar calculations provided on this website are estimates for educational and planning purposes. Actual energy production, financial payback, tax credits, utility net metering tariffs, and installation costs depend on exact roof azimuth, shading, local utility rates, weather patterns, equipment models, and qualified installer site assessments.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} SolarEngine Platform. All calculations run in your browser.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => onNavigate('/methodology')} className="hover:text-slate-300">Methodology</button>
            <button onClick={() => onNavigate('/data-sources')} className="hover:text-slate-300">Data Sources</button>
            <button onClick={() => onNavigate('/privacy')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-slate-300">Terms of Use</button>
            <button onClick={() => onNavigate('/disclaimer')} className="hover:text-slate-300">Disclaimer</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
