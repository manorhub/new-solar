import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculateRequiredSystemSize } from '../../lib/solar/solar-sizing';
import { calculatePanelCount } from '../../lib/solar/panel-count';
import { calculateEnergyProduction } from '../../lib/solar/energy-production';
import { formatPowerKw, formatEnergyKwh } from '../../lib/solar/units';
import { Grid } from 'lucide-react';

export const SolarPanelNumberCalculator: React.FC = () => {
  const { peakSunHours, panelWattage: defaultWattage } = useSolarSettings();
  const [monthlyKwh, setMonthlyKwh] = useState<number>(850);
  const [panelWattage, setPanelWattage] = useState<number>(defaultWattage);

  const sizingRes = calculateRequiredSystemSize({
    annualKwhUsage: monthlyKwh * 12,
    peakSunHours,
    performanceRatio: 0.80,
    targetOffsetPercent: 100,
  });

  const panelRes = calculatePanelCount({
    requiredSystemKw: sizingRes.requiredSystemKw,
    panelWattage,
  });

  const prodRes = calculateEnergyProduction({
    systemKw: panelRes.actualInstalledKw,
    peakSunHours,
    performanceRatio: 0.80,
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Simple Form */}
      <div className="solar-card p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <Grid className="w-5 h-5 text-amber-500" /> Fast Panel Count Inputs
        </h3>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="solar-label">Monthly Electricity Usage (kWh)</label>
              <span className="text-base font-black text-slate-900">{monthlyKwh} kWh / mo</span>
            </div>
            <input
              type="range"
              min="200"
              max="2500"
              step="50"
              value={monthlyKwh}
              onChange={(e) => setMonthlyKwh(parseFloat(e.target.value) || 0)}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <label className="solar-label">Select Solar Module Wattage</label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {[350, 400, 450, 540].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setPanelWattage(w)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    panelWattage === w
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {w}W
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Focused Result Box */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-3xl p-8 shadow-xl text-center space-y-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-100 block">Required Panel Target</span>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          You need approximately <span className="text-slate-950 bg-amber-300 px-3 py-1 rounded-2xl">{panelRes.panelCount} solar panels</span>
        </h2>

        <div className="pt-4 border-t border-amber-400/40 grid grid-cols-2 gap-4 max-w-md mx-auto text-xs font-semibold">
          <div>
            <span className="text-amber-100 block">Equivalent System Capacity</span>
            <span className="text-2xl font-black text-white mt-0.5 block">{panelRes.panelCount} × {panelWattage}W = {formatPowerKw(panelRes.actualInstalledKw)}</span>
          </div>
          <div>
            <span className="text-amber-100 block">Est. Annual Generation</span>
            <span className="text-2xl font-black text-white mt-0.5 block">{formatEnergyKwh(prodRes.annualKwh)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
