import React, { useState, useEffect } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculateRequiredSystemSize } from '../../lib/solar/solar-sizing';
import { calculatePanelCount } from '../../lib/solar/panel-count';
import { calculateEnergyProduction } from '../../lib/solar/energy-production';
import { calculateFinancialSavings } from '../../lib/solar/savings';
import { calculateSystemCost } from '../../lib/solar/cost';
import { sanitizeUsage } from '../../lib/solar/validation';
import { getUrlParams, setUrlParams, parseNumberParam } from '../../lib/solar/urlState';
import { formatPowerKw, formatEnergyKwh, formatDisplayCurrency } from '../../lib/solar/units';
import { Sliders, RotateCcw, Grid, Share2, ChevronDown, ChevronUp } from 'lucide-react';

export const SolarPanelCalculator: React.FC = () => {
  const {
    currencySymbol,
    currency,
    electricityRate,
    peakSunHours,
    panelWattage: defaultWattage,
    setIsLocationModalOpen,
    activePreset,
  } = useSolarSettings();

  const [inputMode, setInputMode] = useState<'bill' | 'kwh'>('bill');
  const [billValue, setBillValue] = useState<number>(200);
  const [kwhValue, setKwhValue] = useState<number>(850);
  const [panelWattage, setPanelWattage] = useState<number>(defaultWattage);
  const [performanceRatio, setPerformanceRatio] = useState<number>(0.80);
  const [targetOffset, setTargetOffset] = useState<number>(100);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  // Sync URL parameters on initial load
  useEffect(() => {
    const params = getUrlParams();
    if (params.bill) setBillValue(parseNumberParam(params, 'bill', 200));
    if (params.kwh) setKwhValue(parseNumberParam(params, 'kwh', 850));
    if (params.watt) setPanelWattage(parseNumberParam(params, 'watt', defaultWattage));
    if (params.pr) setPerformanceRatio(parseNumberParam(params, 'pr', 80) / 100);
    if (params.offset) setTargetOffset(parseNumberParam(params, 'offset', 100));
    if (params.mode === 'kwh' || params.mode === 'bill') setInputMode(params.mode as 'bill' | 'kwh');
  }, [defaultWattage]);

  // Derived consumption
  const usageRes = sanitizeUsage(inputMode === 'bill' ? billValue : kwhValue, inputMode === 'bill', electricityRate);
  const annualKwhUsage = usageRes.monthlyKwh * 12;

  // Sizing Engine
  const sizingRes = calculateRequiredSystemSize({
    annualKwhUsage,
    peakSunHours,
    performanceRatio,
    targetOffsetPercent: targetOffset,
  });

  // Panel Count Engine
  const panelRes = calculatePanelCount({
    requiredSystemKw: sizingRes.requiredSystemKw,
    panelWattage,
  });

  // Energy Production Engine
  const prodRes = calculateEnergyProduction({
    systemKw: panelRes.actualInstalledKw,
    peakSunHours,
    performanceRatio,
  });

  // Cost Engine
  const costRes = calculateSystemCost({
    systemKw: panelRes.actualInstalledKw,
    equipmentCostPerWatt: activePreset.countryCode === 'IN' ? 30 : 1.60,
    installationCostPerWatt: activePreset.countryCode === 'IN' ? 25 : 1.20,
    incentivesAmount: activePreset.countryCode === 'US' ? (panelRes.actualInstalledKw * 2800 * 0.30) : 0,
  });

  // Financial Savings Engine
  const savingsRes = calculateFinancialSavings({
    annualConsumptionKwh: annualKwhUsage,
    electricityRate,
    annualSolarProductionKwh: prodRes.annualKwh,
    netSolarInvestmentCost: costRes.estimatedNetCost,
  });

  const actualOffset = Math.min(200, Math.round((prodRes.annualKwh / Math.max(1, annualKwhUsage)) * 100));

  const handleShare = () => {
    const paramsRecord = {
      mode: inputMode,
      bill: inputMode === 'bill' ? billValue : undefined,
      kwh: inputMode === 'kwh' ? kwhValue : undefined,
      watt: panelWattage,
      pr: Math.round(performanceRatio * 100),
      offset: targetOffset,
    };
    setUrlParams(paramsRecord);

    const text = `Solar Panel Calculation (${activePreset.countryName}):
• Installed Capacity: ${formatPowerKw(panelRes.actualInstalledKw)}
• Solar Modules: ${panelRes.panelCount} × ${panelWattage}W
• Annual Generation: ${formatEnergyKwh(prodRes.annualKwh)}
• Est. Year 1 Savings: ${formatDisplayCurrency(savingsRes.annualSavingsYear1, currency)}
• Link: ${window.location.href}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setBillValue(200);
    setKwhValue(850);
    setPanelWattage(defaultWattage);
    setPerformanceRatio(0.80);
    setTargetOffset(100);
    setInputMode('bill');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Card */}
        <div className="lg:col-span-5 solar-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-500" /> Calculation Controls
            </h3>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Option A (kWh) vs Option B ($/Bill) Toggle */}
          <div className="space-y-4">
            <div>
              <label className="solar-label">Input Mode</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setInputMode('bill')}
                  className={`py-2 rounded-lg transition-all ${
                    inputMode === 'bill' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Option B: Bill ({currencySymbol}/mo)
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('kwh')}
                  className={`py-2 rounded-lg transition-all ${
                    inputMode === 'kwh' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Option A: Usage (kWh/mo)
                </button>
              </div>
            </div>

            {inputMode === 'bill' ? (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="solar-label">Monthly Electricity Bill ({currencySymbol})</label>
                  <span className="text-sm font-extrabold text-slate-900">{currencySymbol}{billValue}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={billValue}
                  onChange={(e) => setBillValue(parseFloat(e.target.value) || 0)}
                  className="w-full accent-amber-500"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="solar-label">Monthly Consumption (kWh)</label>
                  <span className="text-sm font-extrabold text-slate-900">{kwhValue} kWh</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={kwhValue}
                  onChange={(e) => setKwhValue(parseFloat(e.target.value) || 0)}
                  className="w-full accent-amber-500"
                />
              </div>
            )}

            {/* Derived Consumption Explanation */}
            {usageRes.derivedText && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900">
                {usageRes.derivedText}
              </div>
            )}

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
                onChange={(e) => setTargetOffset(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Advanced Mode Toggle */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-amber-600 py-1"
              >
                <span>Advanced Calculation Settings</span>
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAdvanced && (
                <div className="pt-3 space-y-3 animate-in fade-in duration-150">
                  <div>
                    <label className="solar-label">Panel Wattage Rating (W)</label>
                    <div className="grid grid-cols-4 gap-1.5 mt-1">
                      {[350, 400, 450, 540].map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setPanelWattage(w)}
                          className={`py-1 rounded-lg text-xs font-bold border ${
                            panelWattage === w
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {w}W
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="solar-label">Performance Ratio (PR)</label>
                      <span className="text-xs font-bold text-slate-900">{Math.round(performanceRatio * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="95"
                      step="1"
                      value={Math.round(performanceRatio * 100)}
                      onChange={(e) => setPerformanceRatio(parseFloat(e.target.value) / 100)}
                      className="w-full accent-blue-500"
                    />
                    <span className="text-[10px] text-slate-400 block">Default 80% (Inverter, thermal & wiring loss)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Location: <strong>{activePreset.countryName}</strong> ({peakSunHours}h sun)</span>
              <button onClick={() => setIsLocationModalOpen(true)} className="text-amber-600 font-bold hover:underline">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Right Live Results & Panel Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Recommended Solar Capacity</span>
                <h2 className="text-3xl font-black text-white mt-1">
                  {formatPowerKw(panelRes.actualInstalledKw)}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copied ? 'Link Copied!' : 'Share Link'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5">
              <div>
                <span className="text-xs text-slate-400 block">Solar Modules</span>
                <span className="text-2xl font-black text-amber-400">{panelRes.panelCount}</span>
                <span className="text-[10px] text-slate-400 block">× {panelWattage}W Panels</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Annual Production</span>
                <span className="text-2xl font-black text-white">{formatEnergyKwh(prodRes.annualKwh)}</span>
                <span className="text-[10px] text-slate-400 block">per year</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Est. Year 1 Savings</span>
                <span className="text-2xl font-black text-emerald-400">{formatDisplayCurrency(savingsRes.annualSavingsYear1, currency)}</span>
                <span className="text-[10px] text-slate-400 block">per year</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Electricity Offset</span>
                <span className="text-2xl font-black text-blue-400">{actualOffset}%</span>
                <span className="text-[10px] text-slate-400 block">annual offset</span>
              </div>
            </div>
          </div>

          {/* Visual Roof Grid Array */}
          <div className="solar-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Grid className="w-4 h-4 text-amber-500" /> Roof Array Simulation ({panelRes.panelCount} Panels)
              </h4>
              <span className="text-xs font-semibold text-slate-500">
                Total Panel Power: {formatPowerKw(panelRes.actualInstalledKw)}
              </span>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 min-h-[130px] flex items-center justify-center">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 w-full max-w-lg">
                {Array.from({ length: Math.min(32, panelRes.panelCount) }).map((_, idx) => (
                  <div
                    key={idx}
                    className="aspect-[3/4] bg-gradient-to-br from-blue-900 to-indigo-950 border border-cyan-400/40 rounded shadow-inner"
                    title={`Module #${idx + 1}: ${panelWattage}W`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Plain-English Result Summary Card */}
          <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <strong>Plain-English Summary:</strong> Based on your estimated monthly consumption of <strong>{usageRes.monthlyKwh.toLocaleString()} kWh</strong>, regional sun resource of <strong>{peakSunHours} hrs/day</strong> ({activePreset.countryName}), and an 80% Performance Ratio, a <strong>{formatPowerKw(panelRes.actualInstalledKw)}</strong> system comprising <strong>{panelRes.panelCount} solar panels</strong> ({panelWattage}W each) will generate approximately <strong>{formatEnergyKwh(prodRes.annualKwh)}</strong> per year, offsetting roughly <strong>{actualOffset}%</strong> of your electricity bill.
          </div>
        </div>
      </div>
    </div>
  );
};
