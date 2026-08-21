import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculateRequiredSystemSize } from '../../lib/solar/solar-sizing';
import { calculatePanelCount } from '../../lib/solar/panel-count';
import { calculateEnergyProduction } from '../../lib/solar/energy-production';
import { formatPowerKw, formatEnergyKwh } from '../../lib/solar/units';
import { Zap } from 'lucide-react';

export const SolarSystemSizeCalculator: React.FC = () => {
  const { peakSunHours, panelWattage, activePreset } = useSolarSettings();
  const [dailyKwh, setDailyKwh] = useState<number>(30);
  const [targetOffset, setTargetOffset] = useState<number>(100);

  const annualKwhUsage = dailyKwh * 365.25;

  const sizingRes = calculateRequiredSystemSize({
    annualKwhUsage,
    peakSunHours,
    performanceRatio: 0.80,
    targetOffsetPercent: targetOffset,
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

  // Determine scale tier (Small <= 4kW, Medium <= 8kW, Large > 8kW)
  const sizeTier = panelRes.actualInstalledKw <= 4 ? 'Small' : panelRes.actualInstalledKw <= 8.5 ? 'Medium' : 'Large';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sizing Controls */}
      <div className="lg:col-span-5 solar-card p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> Sizing Parameters
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="solar-label">Daily Consumption (kWh/day)</label>
              <span className="text-sm font-black text-slate-900">{dailyKwh} kWh / day</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="1"
              value={dailyKwh}
              onChange={(e) => setDailyKwh(parseFloat(e.target.value) || 0)}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="solar-label">Target Grid Offset</label>
              <span className="text-sm font-bold text-emerald-600">{targetOffset}%</span>
            </div>
            <input
              type="range"
              min="25"
              max="150"
              step="5"
              value={targetOffset}
              onChange={(e) => setTargetOffset(parseFloat(e.target.value) || 0)}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Annual Consumption:</span>
              <strong className="text-slate-900">{Math.round(annualKwhUsage).toLocaleString()} kWh</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Solar Irradiance:</span>
              <strong className="text-slate-900">{peakSunHours} hrs / day ({activePreset.countryName})</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended System Size Horizontal Scale */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-100 block">Recommended System Size</span>
            <div className="text-4xl font-black text-white mt-1">
              {formatPowerKw(panelRes.actualInstalledKw)}
            </div>
          </div>

          {/* Prominent Horizontal Capacity Scale: Small -> Medium -> Large */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-extrabold text-amber-100 uppercase tracking-wider">
              <span className={sizeTier === 'Small' ? 'text-white underline' : 'opacity-70'}>Small (1–4 kW)</span>
              <span className={sizeTier === 'Medium' ? 'text-white underline' : 'opacity-70'}>Medium (4–8.5 kW)</span>
              <span className={sizeTier === 'Large' ? 'text-white underline' : 'opacity-70'}>Large (8.5+ kW)</span>
            </div>
            <div className="w-full h-4 bg-amber-700/60 rounded-full overflow-hidden p-0.5 flex items-center">
              <div
                className="h-3 bg-white rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(8, (panelRes.actualInstalledKw / 15) * 100))}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-amber-400/40 text-xs">
            <div>
              <span className="text-amber-100 block">Suggested Panels</span>
              <span className="text-2xl font-black text-white">{panelRes.panelCount} × {panelWattage}W</span>
            </div>
            <div>
              <span className="text-amber-100 block">Est. Annual Production</span>
              <span className="text-2xl font-black text-white">{formatEnergyKwh(prodRes.annualKwh)}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
          <strong>System Capacity Verdict:</strong> For a daily load of <strong>{dailyKwh} kWh/day</strong> ({Math.round(annualKwhUsage).toLocaleString()} kWh/yr), a <strong>{sizeTier} category system ({formatPowerKw(panelRes.actualInstalledKw)})</strong> is optimal for meeting your target grid offset under regional solar irradiance conditions.
        </div>
      </div>
    </div>
  );
};
