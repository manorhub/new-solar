import React, { useState } from 'react';
import { calculateBatteryCapacity } from '../../lib/solar/battery';
import { BatteryCharging, AlertCircle } from 'lucide-react';

export const BatteryStorageCalculator: React.FC = () => {
  const [dailyKwh, setDailyKwh] = useState<number>(30);
  const [backupFraction, setBackupFraction] = useState<number>(0.50); // 50% essential load backup
  const [dodPercent, setDodPercent] = useState<number>(85);
  const [efficiencyPercent, setEfficiencyPercent] = useState<number>(90);

  const battRes = calculateBatteryCapacity({
    dailyKwhRequirement: dailyKwh,
    backupFraction,
    depthOfDischargePercent: dodPercent,
    batteryEfficiencyPercent: efficiencyPercent,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-6 solar-card p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BatteryCharging className="w-5 h-5 text-emerald-600" /> Battery Nominal Capacity Inputs
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="solar-label">Daily Consumption (kWh/day)</label>
              <span className="text-sm font-bold text-slate-900">{dailyKwh} kWh / day</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="2"
              value={dailyKwh}
              onChange={(e) => setDailyKwh(parseFloat(e.target.value) || 0)}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="solar-label">Desired Backup Coverage</label>
              <span className="text-sm font-bold text-emerald-600">{Math.round(backupFraction * 100)}% Load</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="10"
              value={Math.round(backupFraction * 100)}
              onChange={(e) => setBackupFraction(parseFloat(e.target.value) / 100)}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="solar-label">Depth of Discharge (DoD %)</label>
              <input
                type="number"
                min="50"
                max="100"
                value={dodPercent}
                onChange={(e) => setDodPercent(parseFloat(e.target.value) || 50)}
                className="solar-input"
              />
            </div>
            <div>
              <label className="solar-label">Battery Efficiency (%)</label>
              <input
                type="number"
                min="60"
                max="100"
                value={efficiencyPercent}
                onChange={(e) => setEfficiencyPercent(parseFloat(e.target.value) || 60)}
                className="solar-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Battery Output */}
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Recommended Nominal Battery Capacity</span>
            <div className="text-4xl font-black text-white mt-1">
              {battRes.recommendedNominalCapacityKwh} <span className="text-xl font-medium text-emerald-300">kWh</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block">Usable Capacity</span>
              <span className="text-2xl font-black text-emerald-400">{battRes.usableCapacityKwh} kWh</span>
            </div>
            <div>
              <span className="text-slate-400 block">Daily Backup Energy Needed</span>
              <span className="text-2xl font-black text-amber-400">{battRes.backupEnergyKwhNeeded} kWh</span>
            </div>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="solar-card p-4 space-y-2 text-xs text-slate-700">
          <strong className="text-slate-900 block font-bold">Calculation Formula Explanation:</strong>
          <div className="p-3 bg-slate-900 text-amber-300 font-mono rounded-xl text-[11px] overflow-x-auto">
            {battRes.formulaExplanationText}
          </div>
          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Note: Battery recommendations are estimates for planning and do not guarantee whole-home backup under extreme surging loads.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
