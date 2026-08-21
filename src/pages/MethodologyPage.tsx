import React, { useEffect } from 'react';
import { updatePageSeo } from '../lib/seo/seo';
import { ShieldCheck, BookOpen, Cpu, DollarSign, BatteryCharging, Leaf } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Solar Panel Calculation Methodology & Formulas | Technical Documentation',
      description: 'Transparent engineering guide explaining photovoltaic sizing formulas, performance ratio loss factors, energy yield algorithms, battery sizing math, and financial cash flow models.',
      canonicalUrl: 'https://solarpanelcalculator.org/methodology',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Methodology', url: 'https://solarpanelcalculator.org/methodology' },
      ],
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-xs font-bold border border-amber-500/20">
          <ShieldCheck className="w-4 h-4" /> Open Technical Engineering Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Calculation Methodology & Formulas
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Detailed technical documentation detailing every mathematical model, efficiency loss coefficient, and financial trajectory formula powering our calculator suite.
        </p>
      </div>

      {/* Methodology Section 1: System Sizing */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <Cpu className="w-5 h-5 text-amber-500" /> 1. Photovoltaic System Capacity & Sizing Math
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Required DC system capacity is derived by dividing annual electricity consumption by the product of regional peak sun hours, operational days, and a system Performance Ratio (PR).
          </p>
          <div className="p-4 bg-slate-900 text-amber-300 font-mono rounded-xl text-xs overflow-x-auto">
            Required System kW = Annual kWh Usage ÷ (Peak Sun Hours × 365.25 × Performance Ratio)
          </div>
          <p>
            <strong>Performance Ratio (PR) Default (0.80)</strong>: Accounts for real-world system inefficiencies including inverter DC-to-AC conversion loss (~4%), thermal cell temperature derating (~8%), wiring resistance (~2%), and optical glass soiling (~4%).
          </p>
        </div>
      </div>

      {/* Methodology Section 2: Panel Count Ceiling Rounding */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <BookOpen className="w-5 h-5 text-blue-600" /> 2. Panel Count Ceil Rounding Algorithm
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Because fractional solar panels cannot be purchased or installed, module counts are strictly rounded **UP** to the nearest whole integer using the mathematical ceiling function ($\lceil x \rceil$).
          </p>
          <div className="p-4 bg-slate-900 text-blue-300 font-mono rounded-xl text-xs overflow-x-auto">
            Panel Count = Math.ceil((Required System kW × 1000) ÷ Panel Wattage Rating)
          </div>
        </div>
      </div>

      {/* Methodology Section 3: Financial Cash Flow & Inflation */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <DollarSign className="w-5 h-5 text-emerald-600" /> 3. 25-Year Cumulative Financial Cash Flow Model
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Financial trajectory models simulate compounding annual utility price inflation (3.5% per year default) against linear solar panel power output degradation (0.5% per year default).
          </p>
          <div className="p-4 bg-slate-900 text-emerald-300 font-mono rounded-xl text-xs overflow-x-auto">
            Year N Savings = (Annual Solar Production × (1 - Linear Degradation)^N) × (Baseline Utility Rate × (1 + Rate Inflation)^N)
          </div>
        </div>
      </div>

      {/* Methodology Section 4: Battery Storage */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <BatteryCharging className="w-5 h-5 text-emerald-600" /> 4. Battery Storage Nominal Capacity Formula
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <div className="p-4 bg-slate-900 text-emerald-300 font-mono rounded-xl text-xs overflow-x-auto">
            Nominal Battery Capacity (kWh) = (Daily kWh Requirement × Backup Fraction) ÷ (Depth of Discharge % × Battery Efficiency %)
          </div>
        </div>
      </div>

      {/* Methodology Section 5: Carbon Emissions */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <Leaf className="w-5 h-5 text-emerald-600" /> 5. Environmental CO₂ Offset & Equivalences
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Calculated by multiplying solar kWh generation by regional grid emissions factors ($kg\,CO_2 / kWh$). Equivalence metrics reference EPA eGRID benchmarks (1 tree absorbs ~21.8 kg CO₂ per year; 1 passenger car emits ~0.40 kg CO₂ per mile).
          </p>
        </div>
      </div>
    </div>
  );
};
