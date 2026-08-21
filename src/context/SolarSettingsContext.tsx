import React, { createContext, useContext, useState } from 'react';
import { COUNTRIES } from '../lib/location/countries';
import type { CountryConfig } from '../lib/location/countries';
import { ALL_REGIONS, getRegionsByCountry } from '../lib/location/regions';
import type { RegionData } from '../lib/location/regions';
import { DATA_SOURCES } from '../lib/location/data-sources';
import type { DataSourceMetadata } from '../lib/location/data-sources';
import { lookupPostalCode } from '../lib/location/cities';

interface ActivePreset {
  countryCode: string;
  countryName: string;
  currencySymbol: string;
  defaultRate: number;
  peakSunHours: number;
}

interface SolarSettingsContextType {
  countryCode: string;
  setCountryCode: (code: string) => void;
  activeCountry: CountryConfig;
  activePreset: ActivePreset;
  
  regionCode: string;
  setRegionCode: (code: string) => void;
  activeRegion?: RegionData;
  availableRegions: RegionData[];
  
  cityName: string;
  setCityName: (name: string) => void;
  postalCode: string;
  setPostalCode: (code: string) => void;

  currency: string;
  currencySymbol: string;
  unitSystem: 'imperial' | 'metric';
  electricityRate: number;
  setElectricityRate: (rate: number) => void;
  isRateUserOverridden: boolean;
  
  peakSunHours: number;
  setPeakSunHours: (psh: number) => void;
  isPshUserOverridden: boolean;

  panelWattage: number;
  setPanelWattage: (wattage: number) => void;
  
  activeDataSource?: DataSourceMetadata;
  locationFallbackLevel: 'city' | 'state' | 'country' | 'global' | 'manual';
  
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  
  handleLookupPostal: (code: string) => boolean;
  resetLocationToDefaults: () => void;
}

const SolarSettingsContext = createContext<SolarSettingsContextType | undefined>(undefined);

export const SolarSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countryCode, setCountryCode] = useState<string>('US');
  const [regionCode, setRegionCode] = useState<string>('CA');
  const [cityName, setCityName] = useState<string>('Los Angeles');
  const [postalCode, setPostalCode] = useState<string>('90210');
  
  const [electricityRate, setElectricityRateState] = useState<number>(0.32);
  const [isRateUserOverridden, setIsRateUserOverridden] = useState<boolean>(false);
  
  const [peakSunHours, setPeakSunHoursState] = useState<number>(5.6);
  const [isPshUserOverridden, setIsPshUserOverridden] = useState<boolean>(false);
  
  const [panelWattage, setPanelWattage] = useState<number>(400);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  const activeCountry = COUNTRIES[countryCode] || COUNTRIES.INTL;
  const availableRegions = getRegionsByCountry(countryCode);
  const activeRegion = ALL_REGIONS.find((r) => r.code === regionCode && r.countryCode === countryCode);
  const activeDataSource = activeRegion ? DATA_SOURCES[activeRegion.dataSourceId] : DATA_SOURCES.nrel;

  const activePreset: ActivePreset = {
    countryCode: activeCountry.code,
    countryName: activeCountry.name,
    currencySymbol: activeCountry.currencySymbol,
    defaultRate: activeCountry.defaultRate,
    peakSunHours: activeCountry.defaultPeakSunHours,
  };

  const locationFallbackLevel: 'city' | 'state' | 'country' | 'global' | 'manual' = 
    isPshUserOverridden || isRateUserOverridden
      ? 'manual'
      : cityName
      ? 'city'
      : activeRegion
      ? 'state'
      : 'country';

  const handleSetCountry = (code: string) => {
    setCountryCode(code);
    const country = COUNTRIES[code] || COUNTRIES.INTL;
    const regions = getRegionsByCountry(code);
    const defaultReg = regions[0];

    if (defaultReg) {
      setRegionCode(defaultReg.code);
      setElectricityRateState(defaultReg.defaultRate);
      setPeakSunHoursState(defaultReg.peakSunHours);
    } else {
      setRegionCode('');
      setElectricityRateState(country.defaultRate);
      setPeakSunHoursState(country.defaultPeakSunHours);
    }

    setCityName('');
    setPostalCode('');
    setIsRateUserOverridden(false);
    setIsPshUserOverridden(false);
  };

  const handleSetRegion = (regCode: string) => {
    setRegionCode(regCode);
    const reg = ALL_REGIONS.find((r) => r.code === regCode && r.countryCode === countryCode);
    if (reg) {
      setElectricityRateState(reg.defaultRate);
      setPeakSunHoursState(reg.peakSunHours);
      setIsRateUserOverridden(false);
      setIsPshUserOverridden(false);
    }
  };

  const setElectricityRate = (rate: number) => {
    setElectricityRateState(rate);
    setIsRateUserOverridden(true);
  };

  const setPeakSunHours = (psh: number) => {
    setPeakSunHoursState(psh);
    setIsPshUserOverridden(true);
  };

  const handleLookupPostal = (code: string): boolean => {
    setPostalCode(code);
    const matchedCity = lookupPostalCode(code, countryCode);
    if (matchedCity) {
      setCityName(matchedCity.name);
      if (matchedCity.stateCode) {
        setRegionCode(matchedCity.stateCode);
      }
      if (matchedCity.peakSunHours) {
        setPeakSunHoursState(matchedCity.peakSunHours);
      }
      return true;
    }
    return false;
  };

  const resetLocationToDefaults = () => {
    handleSetCountry('US');
  };

  return (
    <SolarSettingsContext.Provider
      value={{
        countryCode,
        setCountryCode: handleSetCountry,
        activeCountry,
        activePreset,
        regionCode,
        setRegionCode: handleSetRegion,
        activeRegion,
        availableRegions,
        cityName,
        setCityName,
        postalCode,
        setPostalCode,
        currency: activeCountry.currency,
        currencySymbol: activeCountry.currencySymbol,
        unitSystem: activeCountry.unitSystem,
        electricityRate,
        setElectricityRate,
        isRateUserOverridden,
        peakSunHours,
        setPeakSunHours,
        isPshUserOverridden,
        panelWattage,
        setPanelWattage,
        activeDataSource,
        locationFallbackLevel,
        isLocationModalOpen,
        setIsLocationModalOpen,
        handleLookupPostal,
        resetLocationToDefaults,
      }}
    >
      {children}
    </SolarSettingsContext.Provider>
  );
};

export const useSolarSettings = (): SolarSettingsContextType => {
  const context = useContext(SolarSettingsContext);
  if (!context) {
    throw new Error('useSolarSettings must be used within a SolarSettingsProvider');
  }
  return context;
};
