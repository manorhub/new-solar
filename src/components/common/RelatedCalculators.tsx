import React from 'react';
import { CALCULATORS_REGISTRY } from '../../lib/data/calculatorsData';
import { Calculator } from 'lucide-react';

interface RelatedCalculatorsProps {
  relatedIds: string[];
  currentId: string;
  onNavigate: (path: string) => void;
}

export const RelatedCalculators: React.FC<RelatedCalculatorsProps> = ({ relatedIds, currentId, onNavigate }) => {
  const relatedList = CALCULATORS_REGISTRY.filter(
    (calc) => relatedIds.includes(calc.id) && calc.id !== currentId
  );

  if (relatedList.length === 0) return null;

  return (
    <section className="my-10 space-y-4">
      <div className="flex items-center gap-2">
        <Calculator className="w-5 h-5 text-amber-500" />
        <h3 className="text-xl font-extrabold text-slate-900">Recommended Next Solar Calculations</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedList.map((calc) => (
          <button
            key={calc.id}
            onClick={() => onNavigate(`/${calc.slug}`)}
            className="solar-card p-5 text-left hover:border-amber-500/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-900 mb-2 inline-block">
                {calc.categoryName}
              </span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                {calc.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{calc.shortDescription}</p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
              Calculate Now &rarr;
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
