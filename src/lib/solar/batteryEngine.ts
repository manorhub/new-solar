export interface BatteryCalculationInputs {
  dailyKwhUsage: number;
  backupHours: number; // e.g. 12h or 24h or 48h
  depthOfDischargePercent: number; // e.g. 80% to 90% (LiFePO4)
  batteryEfficiencyPercent: number; // e.g. 90% round trip
  backupCoveragePercent: number; // e.g. 50% essential load vs 100% whole house
}

export interface BatteryCalculationOutputs {
  recommendedCapacityKwh: number;
  usableCapacityKwh: number;
  grossCapacityKwh: number;
  batteryCount5kWh: number;
  batteryCount10kWh: number;
  batteryCount13_5kWh: number;
  backupHoursAchievable: number;
  dayNightSplitDayKwh: number;
  dayNightSplitNightKwh: number;
}

export function calculateBatteryStorage(inputs: BatteryCalculationInputs): BatteryCalculationOutputs {
  const dailyKwh = Math.max(1, inputs.dailyKwhUsage);
  const hourlyUsage = dailyKwh / 24;

  // Needed kWh for backup duration
  const rawKwhForBackup = (hourlyUsage * inputs.backupHours) * (inputs.backupCoveragePercent / 100);

  // Accounting for Depth of Discharge (DoD) & round-trip efficiency
  const dod = inputs.depthOfDischargePercent / 100;
  const efficiency = inputs.batteryEfficiencyPercent / 100;

  const grossCapacityNeeded = rawKwhForBackup / (dod * efficiency);
  const usableCapacityNeeded = grossCapacityNeeded * dod;

  const roundedGrossKw = Math.round(grossCapacityNeeded * 10) / 10;

  // Battery module counts
  const batteryCount5kWh = Math.max(1, Math.ceil(roundedGrossKw / 5));
  const batteryCount10kWh = Math.max(1, Math.ceil(roundedGrossKw / 10));
  const batteryCount13_5kWh = Math.max(1, Math.ceil(roundedGrossKw / 13.5));

  // Day / Night consumption assumption (40% day, 60% evening/night)
  const dayKwh = dailyKwh * 0.40;
  const nightKwh = dailyKwh * 0.60;

  return {
    recommendedCapacityKwh: Math.max(2.5, roundedGrossKw),
    usableCapacityKwh: Math.round(usableCapacityNeeded * 10) / 10,
    grossCapacityKwh: Math.max(2.5, roundedGrossKw),
    batteryCount5kWh,
    batteryCount10kWh,
    batteryCount13_5kWh,
    backupHoursAchievable: Math.round(inputs.backupHours),
    dayNightSplitDayKwh: Math.round(dayKwh * 10) / 10,
    dayNightSplitNightKwh: Math.round(nightKwh * 10) / 10,
  };
}
