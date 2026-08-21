import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, AlertTriangle } from 'lucide-react';

interface FormulaSectionProps {
  title?: string;
  formulaText: string;
  inputsList: string[];
  assumptionsList: string[];
  limitationsText: string;
}

export const FormulaSection: React.FC<FormulaSectionProps> = ({
  title = 'How We Calculate This',
  formulaText,
  inputsList,
  assumptionsList,
  limitationsText,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="solar-card p-6 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">Transparent mathematical formulas, inputs & assumptions</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="pt-4 border-t border-slate-200/80 space-y-6 text-sm text-slate-700 animate-in fade-in duration-200">
          {/* Formula Box */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block font-sans">Calculation Formula</span>
            <div className="text-sm font-semibold text-slate-900 overflow-x-auto py-1">
              {formulaText}
            </div>
          </div>

          {/* Grid of Inputs & Assumptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Primary Inputs Used</h4>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                {inputsList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Standard Engineering Assumptions</h4>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                {assumptionsList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Limitations Disclaimer */}
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Limitations Notice:</strong> {limitationsText} Results are educational estimates and do not guarantee actual generation or financial returns.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
