import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculateFinancialSavings } from '../../lib/solar/savings';
import { calculateEnergyProduction } from '../../lib/solar/energy-production';
import { calculateSystemCost } from '../../lib/solar/cost';
import { calculateSolarRoi } from '../../lib/solar/roi';
import type { RoiTimelineYears } from '../../lib/solar/roi';
import { formatPowerKw, formatDisplayCurrency } from '../../lib/solar/units';
import { PieChart } from 'lucide-react';

export const SolarROICalculator: React.FC = () => {
  const { currency, electricityRate, peakSunHours, countryCode } = useSolarSettings();
  const [systemKw, setSystemKw] = useState<number>(6.0);
  const [timelineYears, setTimelineYears] = useState<RoiTimelineYears>(25);

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
    annualConsumptionKwh: prodRes.annualKwh * 1.05,
    electricityRate,
    annualSolarProductionKwh: prodRes.annualKwh,
    electricityPriceEscalationPercent: 3.5,
    netSolarInvestmentCost: costRes.estimatedNetCost,
  });

  const roiRes = calculateSolarRoi({
    initialInvestmentCost: costRes.estimatedNetCost,
    savingsData: savingsRes,
    selectedTimelineYears: timelineYears,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-5 solar-card p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <PieChart className="w-5 h-5 text-indigo-600" /> Financial ROI Controls
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="solar-label">System Size (kW)</label>
              <span className="text-sm font-bold text-slate-900">{formatPowerKw(systemKw)}</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="0.5"
              value={systemKw}
              onChange={(e) => setSystemKw(parseFloat(e.target.value) || 0)}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <label className="solar-label">ROI Horizon Timeline</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {([10, 20, 25] as RoiTimelineYears[]).map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setTimelineYears(y)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    timelineYears === y
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {y} Years
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial ROI Visual Display */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Return on Investment ({timelineYears}-Yr)</span>
              <span className="text-5xl font-black text-emerald-400 mt-1 block">+{roiRes.roiPercent}%</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Annualized Return (IRR)</span>
              <span className="text-2xl font-black text-white mt-1 block">{roiRes.annualizedRoiPercent}% / yr</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <span className="text-slate-400 block">Initial Investment</span>
              <strong className="text-white text-base font-bold">{formatDisplayCurrency(roiRes.initialInvestmentCost, currency)}</strong>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <span className="text-slate-400 block">Total Savings ({timelineYears}y)</span>
              <strong className="text-white text-base font-bold">{formatDisplayCurrency(roiRes.totalSavings, currency)}</strong>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl border border-emerald-500/40">
              <span className="text-emerald-400 block">Net Gain</span>
              <strong className="text-emerald-300 text-base font-bold">+{formatDisplayCurrency(roiRes.netGain, currency)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
