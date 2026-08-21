import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculateFinancialSavings } from '../../lib/solar/savings';
import { calculateEnergyProduction } from '../../lib/solar/energy-production';
import { calculateSystemCost } from '../../lib/solar/cost';
import { formatPowerKw, formatDisplayCurrency } from '../../lib/solar/units';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';

export const SolarSavingsCalculator: React.FC = () => {
  const { currency, electricityRate, peakSunHours, countryCode } = useSolarSettings();
  const [systemKw, setSystemKw] = useState<number>(6.6);
  const [annualConsumption, setAnnualConsumption] = useState<number>(9500);
  const [utilityInflation, setUtilityInflation] = useState<number>(3.5);
  const panelDegradation = 0.5;

  const prodRes = calculateEnergyProduction({
    systemKw,
    peakSunHours,
    performanceRatio: 0.80,
  });

  const costRes = calculateSystemCost({
    systemKw,
    equipmentCostPerWatt: countryCode === 'IN' ? 30 : 1.60,
    installationCostPerWatt: countryCode === 'IN' ? 25 : 1.20,
    incentivesAmount: countryCode === 'US' ? (systemKw * 2800 * 0.30) : 0,
  });

  const savingsRes = calculateFinancialSavings({
    annualConsumptionKwh: annualConsumption,
    electricityRate,
    annualSolarProductionKwh: prodRes.annualKwh,
    electricityPriceEscalationPercent: utilityInflation,
    panelDegradationPercent: panelDegradation,
    netSolarInvestmentCost: costRes.estimatedNetCost,
  });

  const chartData = savingsRes.yearlyComparison.map((item) => ({
    year: `Yr ${item.year}`,
    withoutSolar: item.withoutSolarCost,
    withSolar: item.withSolarCost,
    cumulativeSavings: item.cumulativeSavings,
  }));

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="solar-card p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="solar-label">System Size (kW)</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="range"
              min="2"
              max="20"
              step="0.5"
              value={systemKw}
              onChange={(e) => setSystemKw(parseFloat(e.target.value) || 0)}
              className="w-full accent-amber-500"
            />
            <span className="text-sm font-bold text-slate-900 w-16">{formatPowerKw(systemKw)}</span>
          </div>
        </div>

        <div>
          <label className="solar-label">Annual Consumption (kWh)</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="range"
              min="2000"
              max="30000"
              step="500"
              value={annualConsumption}
              onChange={(e) => setAnnualConsumption(parseFloat(e.target.value) || 0)}
              className="w-full accent-blue-500"
            />
            <span className="text-xs font-bold text-slate-900 w-20">{annualConsumption.toLocaleString()} kWh</span>
          </div>
        </div>

        <div>
          <label className="solar-label">Utility Escalation (%/yr)</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={utilityInflation}
              onChange={(e) => setUtilityInflation(parseFloat(e.target.value) || 0)}
              className="w-full accent-emerald-500"
            />
            <span className="text-sm font-bold text-emerald-600 w-16">{utilityInflation}%/yr</span>
          </div>
        </div>

        <div>
          <label className="solar-label">Net System Investment</label>
          <div className="text-base font-extrabold text-slate-900 mt-1">
            {formatDisplayCurrency(costRes.estimatedNetCost, currency)}
          </div>
        </div>
      </div>

      {/* Without Solar vs With Solar Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="solar-card p-6 bg-red-50/50 border-red-200">
          <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">Without Solar (25-Year Grid Cost)</span>
          <div className="text-3xl font-black text-red-950 mt-1">
            {formatDisplayCurrency(savingsRes.totalWithoutSolar25YearCost, currency)}
          </div>
          <span className="text-xs text-red-700 mt-1 block">Paying 100% escalating grid electricity</span>
        </div>

        <div className="solar-card p-6 bg-emerald-50/50 border-emerald-200">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">With Solar (25-Year Cumulative Savings)</span>
          <div className="text-3xl font-black text-emerald-950 mt-1">
            {formatDisplayCurrency(savingsRes.savings25Year, currency)}
          </div>
          <span className="text-xs text-emerald-700 mt-1 block">Net Profit: {formatDisplayCurrency(savingsRes.net25YearProfit, currency)}</span>
        </div>
      </div>

      {/* Milestone Savings Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="solar-card p-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Monthly Savings (Yr 1)</span>
          <span className="text-xl font-black text-emerald-600 mt-0.5 block">{formatDisplayCurrency(savingsRes.monthlySavingsYear1, currency)}</span>
        </div>
        <div className="solar-card p-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">10-Year Cumulative</span>
          <span className="text-xl font-black text-blue-600 mt-0.5 block">{formatDisplayCurrency(savingsRes.savings10Year, currency)}</span>
        </div>
        <div className="solar-card p-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">20-Year Cumulative</span>
          <span className="text-xl font-black text-indigo-600 mt-0.5 block">{formatDisplayCurrency(savingsRes.savings20Year, currency)}</span>
        </div>
        <div className="solar-card p-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">25-Year Cumulative</span>
          <span className="text-xl font-black text-amber-600 mt-0.5 block">{formatDisplayCurrency(savingsRes.savings25Year, currency)}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="solar-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> 25-Year Cumulative Savings Trajectory
            </h3>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip formatter={(val: any) => [formatDisplayCurrency(val, currency), 'Savings']} />
              <Area type="monotone" dataKey="cumulativeSavings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Note: Electricity escalation ({utilityInflation}%/yr) and panel degradation ({panelDegradation}%/yr) are assumptions based on historical trends.</span>
        </div>
      </div>
    </div>
  );
};
