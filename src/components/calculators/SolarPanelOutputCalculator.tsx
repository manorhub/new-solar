import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculatePanelCount } from '../../lib/solar/panel-count';
import { calculateEnergyProduction } from '../../lib/solar/energy-production';
import { formatPowerKw, formatEnergyKwh } from '../../lib/solar/units';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity } from 'lucide-react';

export const SolarPanelOutputCalculator: React.FC = () => {
  const { peakSunHours, panelWattage: defaultWattage, activePreset } = useSolarSettings();
  const [panelCount, setPanelCount] = useState<number>(16);
  const [panelWattage, setPanelWattage] = useState<number>(defaultWattage);
  const [performanceRatio, setPerformanceRatio] = useState<number>(0.80);

  const panelRes = calculatePanelCount({
    requiredSystemKw: (panelCount * panelWattage) / 1000,
    panelWattage,
  });

  const prodRes = calculateEnergyProduction({
    systemKw: panelRes.actualInstalledKw,
    peakSunHours,
    performanceRatio,
  });

  // Seasonal Monthly Multipliers for energy chart visualization
  const monthMultipliers = [0.70, 0.80, 0.95, 1.10, 1.25, 1.30, 1.32, 1.22, 1.05, 0.90, 0.75, 0.66];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthlyChartData = monthNames.map((name, idx) => {
    const kwh = Math.round(prodRes.monthlyKwhAverage * monthMultipliers[idx]);
    return { month: name, kwh };
  });

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="solar-card p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="solar-label">Number of Panels</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="range"
              min="2"
              max="60"
              step="1"
              value={panelCount}
              onChange={(e) => setPanelCount(parseInt(e.target.value) || 1)}
              className="w-full accent-amber-500"
            />
            <span className="text-sm font-bold text-slate-900 w-16">{panelCount} Panels</span>
          </div>
        </div>

        <div>
          <label className="solar-label">Panel Power Rating (W)</label>
          <select
            value={panelWattage}
            onChange={(e) => setPanelWattage(parseInt(e.target.value))}
            className="solar-input mt-1"
          >
            <option value={350}>350 Watts</option>
            <option value={400}>400 Watts</option>
            <option value={450}>450 Watts</option>
            <option value={540}>540 Watts</option>
          </select>
        </div>

        <div>
          <label className="solar-label">Performance Ratio (PR)</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="range"
              min="60"
              max="95"
              step="1"
              value={Math.round(performanceRatio * 100)}
              onChange={(e) => setPerformanceRatio(parseFloat(e.target.value) / 100)}
              className="w-full accent-emerald-500"
            />
            <span className="text-sm font-bold text-emerald-600 w-16">{Math.round(performanceRatio * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Yield Metrics: Per Day, Per Month, Per Year */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="solar-card p-5 bg-gradient-to-br from-amber-50 to-amber-100/40">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Daily Generation</span>
          <span className="text-3xl font-black text-amber-950 mt-1 block">{prodRes.dailyKwh} kWh / day</span>
          <span className="text-[11px] text-amber-800">Average daily power output</span>
        </div>

        <div className="solar-card p-5 bg-gradient-to-br from-blue-50 to-blue-100/40">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">Monthly Average</span>
          <span className="text-3xl font-black text-blue-950 mt-1 block">{formatEnergyKwh(prodRes.monthlyKwhAverage)}</span>
          <span className="text-[11px] text-blue-800">Average monthly generation</span>
        </div>

        <div className="solar-card p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/40">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Annual Generation</span>
          <span className="text-3xl font-black text-emerald-950 mt-1 block">{formatEnergyKwh(prodRes.annualKwh)}</span>
          <span className="text-[11px] text-emerald-800">Total yearly kWh output</span>
        </div>
      </div>

      {/* Seasonal Energy Generation Visualizer */}
      <div className="solar-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-500" /> Estimated Monthly Generation Curve ({formatPowerKw(panelRes.actualInstalledKw)})
            </h3>
            <p className="text-xs text-slate-500">
              Calculated using {peakSunHours} hrs/day peak sun hours ({activePreset.countryName}) & {Math.round(performanceRatio * 100)}% PR.
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip formatter={(val: any) => [`${val} kWh`, 'Monthly Yield']} />
              <Bar dataKey="kwh" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
