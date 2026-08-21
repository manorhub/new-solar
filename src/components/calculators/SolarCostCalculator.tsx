import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculateSystemCost } from '../../lib/solar/cost';
import { formatPowerKw, formatDisplayCurrency } from '../../lib/solar/units';
import { DollarSign } from 'lucide-react';

export const SolarCostCalculator: React.FC = () => {
  const { currency, countryCode, activePreset } = useSolarSettings();
  const [systemKw, setSystemKw] = useState<number>(6.0);
  const [equipmentRate, setEquipmentRate] = useState<number>(countryCode === 'IN' ? 30 : 1.60);
  const [installRate, setInstallRate] = useState<number>(countryCode === 'IN' ? 25 : 1.20);
  const [batteryCost, setBatteryCost] = useState<number>(0);
  const [permittingCost, setPermittingCost] = useState<number>(500);
  const [incentivesAmount, setIncentivesAmount] = useState<number>(
    countryCode === 'US' ? 5000 : countryCode === 'IN' ? 78000 : 0
  );

  const costRes = calculateSystemCost({
    systemKw,
    equipmentCostPerWatt: equipmentRate,
    installationCostPerWatt: installRate,
    batteryCost,
    permittingOtherCosts: permittingCost,
    incentivesAmount,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-6 solar-card p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" /> Cost & Incentive Breakdown Inputs
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="solar-label">System Size (kW)</label>
              <span className="text-sm font-bold text-slate-900">{formatPowerKw(systemKw)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={systemKw}
              onChange={(e) => setSystemKw(parseFloat(e.target.value) || 0)}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="solar-label">Equipment Rate ({activePreset.currencySymbol}/W)</label>
              <input
                type="number"
                step="0.1"
                value={equipmentRate}
                onChange={(e) => setEquipmentRate(parseFloat(e.target.value) || 0)}
                className="solar-input"
              />
            </div>
            <div>
              <label className="solar-label">Installation Rate ({activePreset.currencySymbol}/W)</label>
              <input
                type="number"
                step="0.1"
                value={installRate}
                onChange={(e) => setInstallRate(parseFloat(e.target.value) || 0)}
                className="solar-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="solar-label">Battery Add-on ({activePreset.currencySymbol})</label>
              <input
                type="number"
                step="500"
                value={batteryCost}
                onChange={(e) => setBatteryCost(parseFloat(e.target.value) || 0)}
                className="solar-input"
              />
            </div>
            <div>
              <label className="solar-label">Permitting & Balance ({activePreset.currencySymbol})</label>
              <input
                type="number"
                step="100"
                value={permittingCost}
                onChange={(e) => setPermittingCost(parseFloat(e.target.value) || 0)}
                className="solar-input"
              />
            </div>
          </div>

          <div>
            <label className="solar-label">Tax Credits & Incentives ({activePreset.currencySymbol})</label>
            <input
              type="number"
              step="500"
              value={incentivesAmount}
              onChange={(e) => setIncentivesAmount(parseFloat(e.target.value) || 0)}
              className="solar-input"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Enter total federal, state, or utility rebates (e.g. US 30% ITC or India PM Surya Ghar).
            </p>
          </div>
        </div>
      </div>

      {/* Itemized Net Cost Display */}
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Itemized Cost Formula</h4>

          <div className="space-y-3 text-xs border-b border-slate-800 pb-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Equipment Cost ({formatPowerKw(systemKw)})</span>
              <strong className="text-white">{formatDisplayCurrency(costRes.equipmentCost, currency)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Installation & Labor</span>
              <strong className="text-white">{formatDisplayCurrency(costRes.installationCost, currency)}</strong>
            </div>
            {costRes.batteryCost > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-400">Battery Storage Pack</span>
                <strong className="text-white">{formatDisplayCurrency(costRes.batteryCost, currency)}</strong>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-400">Permitting & Balance of System</span>
              <strong className="text-white">{formatDisplayCurrency(costRes.permittingOtherCosts, currency)}</strong>
            </div>
            <div className="flex justify-between text-slate-300 font-bold pt-2 border-t border-slate-800">
              <span>Gross System Cost</span>
              <span>{formatDisplayCurrency(costRes.grossSystemCost, currency)}</span>
            </div>
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>− Total Incentives & Subsidies</span>
              <span>- {formatDisplayCurrency(costRes.incentivesAmount, currency)}</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Estimated Net System Cost</span>
              <span className="text-4xl font-black text-white">{formatDisplayCurrency(costRes.estimatedNetCost, currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
