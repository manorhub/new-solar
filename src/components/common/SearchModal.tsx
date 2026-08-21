import React, { useState, useEffect } from 'react';
import { CALCULATORS_REGISTRY } from '../../lib/data/calculatorsData';
import { SOLAR_GUIDES } from '../../lib/data/guidesData';
import { Search, X, Calculator, BookOpen, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedCalculators = CALCULATORS_REGISTRY.filter(
    (calc) =>
      calc.name.toLowerCase().includes(trimmed) ||
      calc.shortDescription.toLowerCase().includes(trimmed) ||
      calc.categoryName.toLowerCase().includes(trimmed)
  );

  const matchedGuides = SOLAR_GUIDES.filter(
    (g) =>
      g.title.toLowerCase().includes(trimmed) ||
      g.summary.toLowerCase().includes(trimmed) ||
      g.category.toLowerCase().includes(trimmed)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search solar calculators, sizing formulas, savings guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-base font-medium"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6 max-h-[60vh]">
          {/* Calculators Section */}
          {matchedCalculators.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
                <Calculator className="w-3.5 h-3.5 text-amber-500" />
                Solar Calculators ({matchedCalculators.length})
              </div>
              <div className="space-y-1.5">
                {matchedCalculators.map((calc) => (
                  <button
                    key={calc.id}
                    onClick={() => {
                      onNavigate(`/${calc.slug}`);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 group-hover:text-amber-900">{calc.name}</span>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                          {calc.categoryName}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{calc.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guides Section */}
          {matchedGuides.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                Solar Guides ({matchedGuides.length})
              </div>
              <div className="space-y-1.5">
                {matchedGuides.map((guide) => (
                  <button
                    key={guide.slug}
                    onClick={() => {
                      onNavigate(`/guides/${guide.slug}`);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-blue-900 block">{guide.title}</span>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{guide.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedCalculators.length === 0 && matchedGuides.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-slate-700">No calculators or guides found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for &quot;savings&quot;, &quot;battery&quot;, &quot;cost&quot;, or &quot;panels&quot;.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
