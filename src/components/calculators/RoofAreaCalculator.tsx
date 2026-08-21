import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { calculateRoofAreaRequirement } from '../../lib/solar/roof-area';
import { formatFormattedArea } from '../../lib/solar/units';
import { Maximize2 } from 'lucide-react';

export const RoofAreaCalculator: React.FC = () => {
  const { unitSystem } = useSolarSettings();
  const [panelCount, setPanelCount] = useState<number>(18);
  const [panelLength, setPanelLength] = useState<number>(1.72);
  const [panelWidth, setPanelWidth] = useState<number>(1.13);
  const [usableRoofPercent, setUsableRoofPercent] = useState<number>(75);

  const roofRes = calculateRoofAreaRequirement({
    panelCount,
    panelLengthMeters: panelLength,
    panelWidthMeters: panelWidth,
    usableRoofPercent,
    unitSystem,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-5 solar-card p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Maximize2 className="w-5 h-5 text-blue-600" /> Roof Space Controls
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="solar-label">Target Panel Count</label>
              <span className="text-sm font-bold text-slate-900">{panelCount} Panels</span>
            </div>
            <input
              type="range"
              min="4"
              max="60"
              step="1"
              value={panelCount}
              onChange={(e) => setPanelCount(parseInt(e.target.value) || 1)}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="solar-label">Panel Length (m)</label>
              <input
                type="number"
                step="0.05"
                value={panelLength}
                onChange={(e) => setPanelLength(parseFloat(e.target.value) || 0.5)}
                className="solar-input"
              />
            </div>
            <div>
              <label className="solar-label">Panel Width (m)</label>
              <input
                type="number"
                step="0.05"
                value={panelWidth}
                onChange={(e) => setPanelWidth(parseFloat(e.target.value) || 0.3)}
                className="solar-input"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="solar-label">Usable Roof Usability</label>
              <span className="text-sm font-bold text-blue-600">{usableRoofPercent}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="95"
              step="5"
              value={usableRoofPercent}
              onChange={(e) => setUsableRoofPercent(parseInt(e.target.value) || 50)}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Visual Diagram & Area Comparison */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-6">
          <div className="grid grid-cols-2 gap-4 border-b border-blue-800/60 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">Required Panel Footprint Area</span>
              <span className="text-3xl font-black text-white mt-1 block">
                {formatFormattedArea(roofRes.totalNetPanelAreaSqM, unitSystem)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">Estimated Gross Roof Area</span>
              <span className="text-3xl font-black text-amber-400 mt-1 block">
                {formatFormattedArea(roofRes.totalGrossRoofAreaRequiredSqM, unitSystem)}
              </span>
            </div>
          </div>

          {/* Visual Roof Diagram Box */}
          <div className="p-6 bg-slate-950/80 rounded-xl border border-blue-800/40 text-center space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Roof Footprint Comparison Diagram</h4>
            <div className="relative w-full h-32 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center p-4">
              {/* Outer Gross Roof Box */}
              <div className="w-full h-full border-2 border-dashed border-amber-400/80 rounded-lg flex items-center justify-center relative">
                <span className="text-[10px] text-amber-300 font-bold absolute top-1 left-2">
                  Gross Usable Roof ({formatFormattedArea(roofRes.totalGrossRoofAreaRequiredSqM, unitSystem)})
                </span>
                {/* Inner Net Panel Footprint Box */}
                <div className="w-3/4 h-3/4 bg-blue-600/80 border border-blue-300 rounded flex items-center justify-center shadow-md">
                  <span className="text-[11px] text-white font-extrabold">
                    Panel Array ({formatFormattedArea(roofRes.totalNetPanelAreaSqM, unitSystem)})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
