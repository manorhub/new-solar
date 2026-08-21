import React, { useState } from 'react';
import { useSolarSettings } from '../../context/SolarSettingsContext';
import { COUNTRIES } from '../../lib/location/countries';
import { X, Search, MapPin, Navigation, Check } from 'lucide-react';

export const LocationSelectorModal: React.FC = () => {
  const {
    countryCode,
    setCountryCode,
    regionCode,
    setRegionCode,
    availableRegions,
    setCityName,
    postalCode,
    handleLookupPostal,
    isLocationModalOpen,
    setIsLocationModalOpen,
    activeCountry,
  } = useSolarSettings();

  const [searchQuery, setSearchQuery] = useState('');
  const [zipInput, setZipInput] = useState(postalCode);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredRegions = availableRegions.filter(
    (r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApplyZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput) {
      const found = handleLookupPostal(zipInput);
      if (!found) {
        setCityName('');
      }
    }
  };

  const handleBrowserGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        // Default to US/CA if in NA coordinates
        if (pos.coords.latitude > 15 && pos.coords.longitude < -60) {
          setCountryCode('US');
        } else if (pos.coords.latitude > 8 && pos.coords.longitude > 68 && pos.coords.longitude < 97) {
          setCountryCode('IN');
        }
        setIsLocationModalOpen(false);
      },
      () => {
        setGeoLoading(false);
        setGeoError('Location permission denied. Select manually below.');
      },
      { timeout: 5000 }
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" /> Select Installation Location
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Configures localized solar irradiance, utility tariffs, and currency units.
            </p>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Auto-Detect Button */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-amber-950">
            <Navigation className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Auto-detect approximate region</span>
          </div>
          <button
            onClick={handleBrowserGeolocation}
            disabled={geoLoading}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors shadow-xs"
          >
            {geoLoading ? 'Detecting...' : 'Detect Location'}
          </button>
        </div>
        {geoError && <p className="text-xs text-red-500">{geoError}</p>}

        {/* Step 1: Select Country */}
        <div className="space-y-2">
          <label className="solar-label">1. Select Country</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.values(COUNTRIES).map((c) => (
              <button
                key={c.code}
                onClick={() => setCountryCode(c.code)}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                  countryCode === c.code
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{c.name}</span>
                {countryCode === c.code && <Check className="w-4 h-4 text-slate-950" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: ZIP / Postal Lookup */}
        <form onSubmit={handleApplyZip} className="space-y-2">
          <label className="solar-label">2. {activeCountry.postalCodeLabel} Lookup (Optional)</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={activeCountry.postalCodePlaceholder}
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              className="solar-input"
            />
            <button type="submit" className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800">
              Apply
            </button>
          </div>
        </form>

        {/* Step 3: State / Region Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="solar-label">3. Select {activeCountry.subdivisionType}</label>
            <span className="text-[11px] text-slate-400">{filteredRegions.length} available</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={`Search ${activeCountry.subdivisionType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="solar-input pl-9 text-xs"
            />
          </div>

          <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-1 space-y-1">
            {filteredRegions.map((reg) => (
              <button
                key={reg.code}
                onClick={() => {
                  setRegionCode(reg.code);
                  setIsLocationModalOpen(false);
                }}
                className={`w-full p-2 rounded-lg text-xs font-bold text-left flex justify-between items-center transition-colors ${
                  regionCode === reg.code ? 'bg-amber-100 text-amber-950 font-extrabold' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{reg.name} ({reg.code})</span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {reg.peakSunHours} PSH • {activeCountry.currencySymbol}{reg.defaultRate}/kWh
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="solar-button py-2 px-6 text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
