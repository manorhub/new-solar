import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculateFinancialSavings } from '../../lib/solar/savings';
import { calculateEnergyProduction } from '../../lib/solar/energy-production';
import { calculateSystemCost } from '../../lib/solar/cost';
import { calculatePaybackTimeline } from '../../lib/solar/payback';
import { formatPowerKw, formatDisplayCurrency } from '../../lib/solar/units';
import { CheckCircle2 } from 'lucide-react';

export const SolarPaybackCalculator: React.FC = () => {
  const { currency, electricityRate, peakSunHours, countryCode } = useSolarSettings();
  const [systemKw, setSystemKw] = useState<number>(6.0);
  const [utilityInflation, setUtilityInflation] = useState<number>(3.5);

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
    electricityPriceEscalationPercent: utilityInflation,
    netSolarInvestmentCost: costRes.estimatedNetCost,
  });

  const paybackRes = calculatePaybackTimeline({
    netInvestmentCost: costRes.estimatedNetCost,
    savingsData: savingsRes,
  });

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="solar-card p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="solar-label">System Size (kW)</label>
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
            <span className="text-sm font-bold text-emerald-600 w-16">{utilityInflation}%</span>
          </div>
        </div>

        <div>
          <label className="solar-label">Net Solar Investment</label>
          <div className="text-base font-extrabold text-slate-900 mt-1">
            {formatDisplayCurrency(costRes.estimatedNetCost, currency)}
          </div>
        </div>
      </div>

      {/* Payback Result Showcase */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Estimated Payback Period</span>
          <h2 className="text-4xl font-black text-white mt-1">
            {paybackRes.paybackFormattedText}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Payback Period ≈ Net Investment ({formatDisplayCurrency(costRes.estimatedNetCost, currency)}) ÷ First-Year Savings ({formatDisplayCurrency(savingsRes.annualSavingsYear1, currency)})
          </p>
        </div>

        {/* Timeline Steps (Year 0 -> Year 1 -> ... -> BREAK-EVEN) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Year-by-Year Cash Flow Timeline</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {paybackRes.timelineSteps.slice(0, Math.min(8, paybackRes.breakEvenYear + 2)).map((step) => (
              <div
                key={step.year}
                className={`p-3 rounded-xl border flex flex-col justify-between ${
                  step.isBreakEven
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                    : step.year === 0
                    ? 'bg-slate-800 text-slate-300 border-slate-700'
                    : 'bg-slate-800/60 text-slate-200 border-slate-700/60'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span>{step.label}</span>
                  {step.isBreakEven && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
                </div>
                <div className="text-sm font-bold mt-1">
                  {step.year === 0
                    ? formatDisplayCurrency(step.netCashFlow, currency)
                    : formatDisplayCurrency(step.cumulativeSavings, currency)}
                </div>
                <span className="text-[10px] opacity-80 mt-0.5">
                  {step.isBreakEven ? '★ BREAK-EVEN REACHED' : step.year === 0 ? 'Initial Outlay' : 'Cumulative Savings'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
