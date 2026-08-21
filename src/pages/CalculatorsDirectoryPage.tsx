import React, { useState } from 'react';
import { CALCULATORS_REGISTRY } from '../lib/data/calculatorsData';
import type { CalculatorCategory } from '../lib/data/calculatorsData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArrowRight, Search } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

interface DirectoryProps {
  onNavigate?: (path: string) => void;
}

export const CalculatorsDirectoryPage: React.FC<DirectoryProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const handleNav = onNavigate || ((path: string) => navigate(path));
  const [activeCategory, setActiveCategory] = useState<CalculatorCategory | 'all'>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const categories: { key: CalculatorCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'All 12 Calculators' },
    { key: 'sizing', label: 'Solar Sizing' },
    { key: 'financial', label: 'Solar Financial' },
    { key: 'energy', label: 'Solar Energy' },
    { key: 'environmental', label: 'Solar Environmental' },
  ];

  const filteredList = CALCULATORS_REGISTRY.filter((calc) => {
    const matchesCategory = activeCategory === 'all' || calc.category === activeCategory;
    const matchesSearch =
      calc.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      calc.shortDescription.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Solar Calculators Directory – All 12 Free Solar Energy Tools"
        description="Browse all 12 solar calculators including panel count, system sizing, 25-year financial savings, installation cost, battery storage, roof area, and payback tools."
      />

      <Breadcrumbs items={[{ label: 'Solar Calculators Directory' }]} onNavigate={handleNav} />

      {/* Header Banner */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Solar Calculators Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Explore our suite of 12 independent, deterministic solar calculation tools designed for homeowners, energy consultants, and solar professionals.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="solar-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pill Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.key
                  ? 'bg-amber-500 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Filter calculators..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="solar-input pl-9 text-xs"
          />
        </div>
      </div>

      {/* Calculators Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((calc) => (
          <div
            key={calc.id}
            onClick={() => handleNav(`/${calc.slug}`)}
            className="solar-card p-6 cursor-pointer hover:border-amber-500/50 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {calc.categoryName}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-950 group-hover:text-amber-600 transition-colors">
                {calc.name}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {calc.shortDescription}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>Launch Tool</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
