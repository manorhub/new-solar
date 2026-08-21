import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { CALCULATORS_REGISTRY } from '../../lib/data/calculatorsData';
import { Sun, Search, Globe, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenSearch, currentPath }) => {
  const { countryCode, currencySymbol, peakSunHours, setIsLocationModalOpen, activePreset } = useSolarSettings();
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setIsCalculatorsOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight block leading-none">
                Solar<span className="text-amber-500">Engine</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase block mt-0.5">
                Precision Calculator Platform
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Calculators Dropdown */}
            <div className="relative" onMouseLeave={() => setIsCalculatorsOpen(false)}>
              <button
                onMouseEnter={() => setIsCalculatorsOpen(true)}
                onClick={() => handleNav('/calculators')}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 ${
                  currentPath.includes('/solar') || currentPath === '/calculators'
                    ? 'text-amber-600'
                    : 'text-slate-700 hover:text-amber-600'
                }`}
              >
                Solar Calculators
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCalculatorsOpen ? 'rotate-180 text-amber-600' : ''}`} />
              </button>

              {/* Mega Dropdown */}
              {isCalculatorsOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    All 12 Solar Calculators
                  </div>
                  {CALCULATORS_REGISTRY.slice(0, 8).map((calc) => (
                    <button
                      key={calc.id}
                      onClick={() => handleNav(`/${calc.slug}`)}
                      className="text-left px-3 py-2 rounded-xl hover:bg-amber-500/10 text-xs font-semibold text-slate-800 hover:text-amber-900 transition-colors flex items-center justify-between group"
                    >
                      <span>{calc.name}</span>
                      <span className="text-[10px] text-slate-400 group-hover:text-amber-600">Explore &rarr;</span>
                    </button>
                  ))}
                  <button
                    onClick={() => handleNav('/calculators')}
                    className="w-full text-center py-2 bg-slate-100 hover:bg-amber-500/10 hover:text-amber-900 text-slate-700 rounded-xl text-xs font-bold transition-colors mt-1"
                  >
                    View All 12 Calculators Directory &rarr;
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/solar-panel-calculator/usa')}
              className={`text-sm font-semibold transition-colors ${
                currentPath.includes('/usa') ? 'text-amber-600' : 'text-slate-700 hover:text-amber-600'
              }`}
            >
              USA
            </button>

            <button
              onClick={() => handleNav('/solar-panel-calculator/india')}
              className={`text-sm font-semibold transition-colors ${
                currentPath.includes('/india') ? 'text-amber-600' : 'text-slate-700 hover:text-amber-600'
              }`}
            >
              India
            </button>

            <button
              onClick={() => handleNav('/guides')}
              className={`text-sm font-semibold transition-colors ${
                currentPath.startsWith('/guides') ? 'text-amber-600' : 'text-slate-700 hover:text-amber-600'
              }`}
            >
              Solar Guides
            </button>

            <button
              onClick={() => handleNav('/methodology')}
              className={`text-sm font-semibold transition-colors ${
                currentPath === '/methodology' ? 'text-amber-600' : 'text-slate-700 hover:text-amber-600'
              }`}
            >
              Methodology
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2 text-xs font-semibold border border-slate-200/80 px-3"
              aria-label="Search solar calculators"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search...</span>
            </button>

            {/* Regional / Location Pill */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-500/10 hover:border-amber-300 transition-all text-xs font-semibold text-slate-800"
              title="Change region, currency or peak sun hours"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {activePreset.countryCode} ({currencySymbol}) • {peakSunHours}h Sun
              </span>
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => handleNav('/solar-panel-calculator')}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs tracking-wide shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Calculate System
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="p-2 text-amber-600 bg-amber-50 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              <span>{countryCode}</span>
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              Navigation
            </div>
            <button
              onClick={() => handleNav('/calculators')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-amber-50 rounded-lg"
            >
              All Solar Calculators
            </button>
            <button
              onClick={() => handleNav('/guides')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-amber-50 rounded-lg"
            >
              Solar Guides
            </button>
            <button
              onClick={() => handleNav('/about')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-amber-50 rounded-lg"
            >
              About Platform
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNav('/solar-panel-calculator')}
              className="w-full py-2.5 bg-amber-500 text-white font-bold rounded-xl text-sm text-center shadow-md"
            >
              Calculate Solar System Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
