import React, { useState } from 'react';
import { calculateBatteryCapacity } from '../../lib/solar/battery';
import { calculateEnergyProduction } from '../../lib/solar/energy-production';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { formatPowerKw } from '../../lib/solar/units';
import { Battery, Sun, Zap } from 'lucide-react';

export const SolarBatteryCalculator: React.FC = () => {
  const { peakSunHours } = useSolarSettings();
  const [systemKw, setSystemKw] = useState<number>(6.6);
  const [dailyUsage, setDailyUsage] = useState<number>(30);
  const [nightRatio, setNightRatio] = useState<number>(60);

  const prodRes = calculateEnergyProduction({
    systemKw,
    peakSunHours,
    performanceRatio: 0.80,
  });

  const nightKwh = dailyUsage * (nightRatio / 100);
  const battRes = calculateBatteryCapacity({
    dailyKwhRequirement: dailyUsage,
    backupFraction: nightRatio / 100,
    depthOfDischargePercent: 85,
    batteryEfficiencyPercent: 90,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-5 solar-card p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <Battery className="w-5 h-5 text-emerald-600" /> Solar + Storage Integration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="solar-label">Solar System Size (kW)</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                min="2"
                max="15"
                step="0.5"
                value={systemKw}
                onChange={(e) => setSystemKw(parseFloat(e.target.value) || 0)}
                className="w-full accent-amber-500"
              />
              <span className="text-sm font-bold text-slate-900 w-16">{formatPowerKw(systemKw)}</span>
            </div>
          </div>

          <div>
            <label className="solar-label">Daily Consumption (kWh/day)</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                min="10"
                max="80"
                step="2"
                value={dailyUsage}
                onChange={(e) => setDailyUsage(parseFloat(e.target.value) || 0)}
                className="w-full accent-emerald-500"
              />
              <span className="text-sm font-bold text-emerald-600 w-16">{dailyUsage} kWh</span>
            </div>
          </div>

          <div>
            <label className="solar-label">Night Consumption Share (%)</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                min="30"
                max="80"
                step="5"
                value={nightRatio}
                onChange={(e) => setNightRatio(parseFloat(e.target.value) || 0)}
                className="w-full accent-blue-500"
              />
              <span className="text-sm font-bold text-blue-600 w-16">{nightRatio}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Solar + Storage Matrix Visualizer */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-6">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Self-Consumption Energy Balance Matrix</h4>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <Sun className="w-6 h-6 text-amber-400 mx-auto mb-1" />
              <span className="text-slate-400 block">Daily Solar Yield</span>
              <strong className="text-white text-base font-bold">{prodRes.dailyKwh} kWh</strong>
            </div>

            <div className="p-3 bg-slate-800 rounded-xl border border-emerald-500/40">
              <Battery className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <span className="text-slate-400 block">Nominal Storage</span>
              <strong className="text-emerald-300 text-base font-bold">{battRes.recommendedNominalCapacityKwh} kWh</strong>
            </div>

            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <Zap className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <span className="text-slate-400 block">Nighttime Shift</span>
              <strong className="text-white text-base font-bold">{Math.round(nightKwh * 10) / 10} kWh</strong>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center leading-relaxed">
            Integrating a <strong className="text-white">{battRes.recommendedNominalCapacityKwh} kWh battery</strong> with your <strong>{formatPowerKw(systemKw)} solar array</strong> stores excess daytime solar energy to meet 100% of your evening load demand.
          </p>
        </div>
      </div>
    </div>
  );
};
