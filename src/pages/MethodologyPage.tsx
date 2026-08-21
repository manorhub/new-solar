import React, { useEffect } from 'react';
import { updatePageSeo } from '../lib/seo/seo';
import { BookOpen, Cpu, DollarSign, BatteryCharging, ShieldAlert, Layers, Leaf, Calendar } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const MethodologyPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Solar Calculation Methodology & Engineering Standards | SolarEngine',
      description: 'Comprehensive technical documentation of photovoltaic sizing equations, 25-year financial cash flow modeling, performance ratio derating factors, and battery DoD algorithms.',
      canonicalUrl: 'https://solarpanelcalculator.org/methodology',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Methodology', url: 'https://solarpanelcalculator.org/methodology' },
      ],
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Calculation Methodology' }]} />

      {/* Page Header */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold border border-amber-500/20">
          <BookOpen className="w-4 h-4" /> Open Engineering Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Solar Calculation Methodology & Engineering Standards
        </h1>
        <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
          SolarEngine operates strictly on deterministic photovoltaic (PV) engineering principles. We do not use proprietary black-box algorithms or unverified marketing estimators. Every result produced by our suite of 12 calculators is directly derived from standard IEEE and IEC solar equations detailed below.
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last Standard Review: August 2026</span>
        </div>
      </div>

      {/* Section 1: System Sizing */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <Cpu className="w-5 h-5 text-amber-500" /> 1. Photovoltaic System Sizing Equation (kW DC)
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Required solar system DC capacity is calculated by converting monthly or annual energy consumption (kWh) into daily target load, then dividing by regional solar irradiance and performance derating factors.
          </p>
          <div className="p-4 bg-slate-900 text-amber-300 font-mono rounded-xl text-xs overflow-x-auto">
            Required System Capacity (kW DC) = Monthly kWh Target ÷ (Peak Sun Hours × 30.416 × Performance Ratio)
          </div>
          <p>
            <strong>Performance Ratio (PR):</strong> Fixed at <strong>0.80 (80%)</strong> standard derating factor to account for inverter AC/DC conversion loss (3–4%), wiring resistance (1–2%), thermal degradation under hot cell temperatures (5–8%), and glass soiling (2–3%).
          </p>
        </div>
      </div>

      {/* Section 2: Panel Count Sizing */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <Layers className="w-5 h-5 text-blue-500" /> 2. Module Count & Installed Capacity Math
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Solar panel counts are calculated by converting system kW into Watts and dividing by selected solar panel nameplate ratings (350W–540W).
          </p>
          <div className="p-4 bg-slate-900 text-blue-300 font-mono rounded-xl text-xs overflow-x-auto">
            Panel Count = Math.ceil((Required System Capacity kW × 1000) ÷ Solar Panel Wattage Rating)
          </div>
          <p>
            <strong>Ceiling Rounding Rule:</strong> Panel count is always rounded <strong>UP</strong> to the nearest whole integer (e.g. 6.1 kW with 440W panels requires 13.86 panels $\rightarrow$ <strong>14 panels</strong>). Actual installed capacity is calculated as <code>14 × 440W = 6.16 kW DC</code>.
          </p>
        </div>
      </div>

      {/* Section 3: Financial Cash Flow */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <DollarSign className="w-5 h-5 text-emerald-600" /> 3. 25-Year Cumulative Financial Cash Flow Model
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Our financial engine simulates compounding utility electricity price inflation against linear solar panel power output degradation over a 25-year lifecycle.
          </p>
          <div className="p-4 bg-slate-900 text-emerald-300 font-mono rounded-xl text-xs overflow-x-auto">
            Year N Savings = [Annual Production × (1 - Linear Degradation)^N] × [Utility Rate × (1 + Rate Inflation)^N]
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Utility Price Inflation:</strong> Default <strong>3.5% per year</strong> compound growth rate based on historical EIA data.</li>
            <li><strong>Linear Module Degradation:</strong> Default <strong>0.5% per year</strong> power output reduction (guaranteeing $\ge 85\%$ power output at Year 25).</li>
            <li><strong>Payback Period:</strong> Exact break-even month where cumulative energy bill savings equal net out-of-pocket investment cost.</li>
            <li><strong>ROI (%):</strong> Net profit gain over 25 years divided by net upfront investment: <code>ROI = ((25-Year Cumulative Savings - Net Cost) ÷ Net Cost) × 100</code>.</li>
          </ul>
        </div>
      </div>

      {/* Section 4: Battery Storage */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <BatteryCharging className="w-5 h-5 text-indigo-500" /> 4. Battery Storage Sizing & Depth of Discharge (DoD)
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Nominal battery capacity is calculated by adjusting essential backup load requirements for battery Depth of Discharge (DoD) and round-trip efficiency.
          </p>
          <div className="p-4 bg-slate-900 text-indigo-300 font-mono rounded-xl text-xs overflow-x-auto">
            Recommended Nominal Capacity (kWh) = (Daily Consumption kWh × Backup Fraction) ÷ (DoD % × Round-Trip Efficiency %)
          </div>
          <p>
            <strong>Default Constants:</strong> LFP (Lithium Iron Phosphate) Depth of Discharge is bounded between 85% and 90%, with round-trip efficiency fixed at 90%.
          </p>
        </div>
      </div>

      {/* Section 5: Roof Area & Footprint */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <Layers className="w-5 h-5 text-amber-600" /> 5. Roof Area & Surface Usability Model
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Required installation space is derived from physical panel dimensions (standard residential 400W panel: 1.72m × 1.13m = 1.94 m² / 19.4 sq ft) scaled for roof usability constraints.
          </p>
          <div className="p-4 bg-slate-900 text-amber-200 font-mono rounded-xl text-xs overflow-x-auto">
            Gross Required Roof Space = (Single Panel Area × Panel Count) ÷ Usable Roof Fraction (Default 75%)
          </div>
        </div>
      </div>

      {/* Section 6: Environmental CO2 Offset */}
      <div className="solar-card p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <Leaf className="w-5 h-5 text-emerald-500" /> 6. Carbon Dioxide (CO₂) Offsets & EPA Equivalencies
        </h2>
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Avoided emissions are calculated by multiplying annual solar generation by regional electric grid carbon intensity factors (US EPA eGRID baseline: 0.42 kg CO₂/kWh; India CEA baseline: 0.716 kg CO₂/kWh).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Tree Equivalent:</strong> 1 mature tree absorbs ~21.77 kg CO₂ per year.</li>
            <li><strong>Car Miles Avoided:</strong> 1 passenger vehicle emits ~0.404 kg CO₂ per mile driven.</li>
          </ul>
        </div>
      </div>

      {/* Section 7: Limitations & Disclaimers */}
      <div className="solar-card p-8 bg-amber-500/5 border border-amber-500/20 space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-600" /> Engineering Limitations & Field Disclaimers
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed">
          Calculations generated by SolarEngine provide high-precision estimates for preliminary design and budgeting. Actual energy generation will vary depending on site-specific roof azimuth, pitch angle, tree shading, local utility net metering tariffs (e.g. NEM 3.0 export credits), and electrical contractor labor rates. Always consult a licensed solar contractor for site assessment.
        </p>
      </div>
    </div>
  );
};
