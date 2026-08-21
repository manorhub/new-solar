import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculateEmissionsReduction } from '../../lib/solar/emissions';
import { Leaf, Trees, Car, Flame } from 'lucide-react';

export const SolarCO2Calculator: React.FC = () => {
  const { peakSunHours } = useSolarSettings();
  const [systemKw, setSystemKw] = useState<number>(6.6);
  const [emissionsFactor, setEmissionsFactor] = useState<number>(0.42); // 0.42 kg CO2 / kWh

  const annualKwh = systemKw * peakSunHours * 365.25 * 0.80;
  const ecoRes = calculateEmissionsReduction({
    annualSolarGenerationKwh: annualKwh,
    gridEmissionsFactorKgPerKwh: emissionsFactor,
  });

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="solar-card p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="solar-label">Solar System Rating (kW)</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="range"
              min="1"
              max="25"
              step="0.5"
              value={systemKw}
              onChange={(e) => setSystemKw(parseFloat(e.target.value) || 0)}
              className="w-full accent-emerald-500"
            />
            <span className="text-base font-black text-emerald-600 w-20">{systemKw} kW</span>
          </div>
        </div>

        <div>
          <label className="solar-label">Grid Carbon Emissions Factor (kg CO₂ / kWh)</label>
          <input
            type="number"
            step="0.05"
            min="0.05"
            max="1.5"
            value={emissionsFactor}
            onChange={(e) => setEmissionsFactor(parseFloat(e.target.value) || 0.1)}
            className="solar-input mt-1"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            Standard grid benchmarks: US avg ~0.39 kg/kWh • India avg ~0.71 kg/kWh • Global avg ~0.42 kg/kWh.
          </p>
        </div>
      </div>

      {/* Environmental Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="solar-card p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md">
            <Leaf className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">CO₂ Reduced</span>
          <span className="text-3xl font-black text-emerald-950 mt-1 block">{ecoRes.annualCo2AvoidedMetricTons}</span>
          <span className="text-xs text-emerald-700 block mt-1">Metric Tons / Year ({ecoRes.lifetime25YearCo2AvoidedMetricTons}t over 25 yrs)</span>
        </div>

        <div className="solar-card p-6 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
          <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center mb-3 shadow-md">
            <Trees className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-green-800 uppercase tracking-wider block">Trees Planted Equivalence</span>
          <span className="text-3xl font-black text-green-950 mt-1 block">{ecoRes.equivalentTreesPlanted.toLocaleString()}</span>
          <span className="text-xs text-green-700 block mt-1">Mature trees absorbing carbon</span>
        </div>

        <div className="solar-card p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md">
            <Car className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">Car Miles Avoided</span>
          <span className="text-3xl font-black text-blue-950 mt-1 block">{ecoRes.equivalentCarMilesAvoided.toLocaleString()}</span>
          <span className="text-xs text-blue-700 block mt-1">Passenger vehicle miles offset</span>
        </div>

        <div className="solar-card p-6 bg-gradient-to-br from-amber-50 to-amber-100/40 border-amber-200">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3 shadow-md">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Coal Avoided</span>
          <span className="text-3xl font-black text-amber-950 mt-1 block">{ecoRes.equivalentCoalBurnedAvoidedKg.toLocaleString()}</span>
          <span className="text-xs text-amber-800 block mt-1">Kilograms of coal burned avoided</span>
        </div>
      </div>
    </div>
  );
};
