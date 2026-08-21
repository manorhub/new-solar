import { calculatePanelCount } from '../panel-count';
import { calculateEnergyProduction } from '../energy-production';
import { calculateBatteryCapacity } from '../battery';
import { calculateSystemCost } from '../cost';
import { calculatePaybackTimeline } from '../payback';
import { calculateSolarRoi } from '../roi';
import { calculateRoofAreaRequirement } from '../roof-area';
import { calculateEmissionsReduction } from '../emissions';
import { formatDisplayCurrency } from '../units';
import { validatePositiveNumber } from '../validation';

export function runCalculationTests() {
  console.log('--- Running Complete Phase 5 Solar Engine Test Suite ---');
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, testName: string) => {
    if (condition) {
      console.log(`✓ PASSED: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAILED: ${testName}`);
      failed++;
    }
  };

  // Test 1: Panel Count (6 kW system, 400W panel -> Expected 15 panels)
  const pCountRes = calculatePanelCount({ requiredSystemKw: 6.0, panelWattage: 400 });
  assert(pCountRes.panelCount === 15, '6 kW system with 400W panel = 15 panels');
  assert(pCountRes.actualInstalledKw === 6.0, '15 * 400W = 6.0 kW actual installed capacity');

  // Test 2: Panel Count Ceil Rounding (6.1 kW system, 440W panel -> Expected 14 panels, 6.16 kW)
  const pCountCeilRes = calculatePanelCount({ requiredSystemKw: 6.1, panelWattage: 440 });
  assert(pCountCeilRes.panelCount === 14, '6.1 kW system with 440W panel rounds UP to 14 panels');
  assert(pCountCeilRes.actualInstalledKw === 6.16, '14 * 440W = 6.16 kW actual capacity');

  // Test 3: Standard Production Benchmark (5 kW system, 5 PSH, 80% PR -> 20 kWh daily, 7,300 kWh annual)
  const prodRes = calculateEnergyProduction({ systemKw: 5.0, peakSunHours: 5.0, performanceRatio: 0.80 });
  assert(prodRes.dailyKwh === 20, '5 kW @ 5 PSH & 80% PR = 20 kWh/day daily production');
  assert(Math.abs(prodRes.annualKwh - 7305) <= 5, '5 kW @ 5 PSH & 80% PR ≈ 7,305 kWh/year annual production');

  // Test 4: Currency Formatting across 6 Global Regions
  assert(formatDisplayCurrency(1500, 'USD') === '$1,500', 'USD currency formatting = $1,500');
  assert(formatDisplayCurrency(150000, 'INR') === '₹1,50,000', 'INR currency formatting = ₹1,50,000');
  assert(formatDisplayCurrency(2500, 'CAD') === 'C$2,500', 'CAD currency formatting = C$2,500');
  assert(formatDisplayCurrency(2000, 'GBP') === '£2,000', 'GBP currency formatting = £2,000');
  assert(formatDisplayCurrency(3000, 'AUD') === 'A$3,000', 'AUD currency formatting = A$3,000');
  assert(formatDisplayCurrency(2200, 'EUR') === '€2,200', 'EUR currency formatting = €2,200');

  // Test 5: Cost Itemization & Net Subsidies (Gross Cost - Incentives = Net Cost)
  const costRes = calculateSystemCost({
    systemKw: 6.0,
    equipmentCostPerWatt: 1.60,
    installationCostPerWatt: 1.20,
    batteryCost: 3000,
    incentivesAmount: 5940, // 30% US Federal ITC equivalent
  });
  assert(costRes.estimatedNetCost === 13860, 'Gross Cost ($19,800) - Incentives ($5,940) = Net Cost ($13,860)');

  // Test 6: Cost Subsidies Clamping (Incentives cannot create negative net cost)
  const costOverSubscribed = calculateSystemCost({
    systemKw: 3.0,
    equipmentCostPerWatt: 1.00,
    installationCostPerWatt: 0.50,
    incentivesAmount: 10000,
  });
  assert(costOverSubscribed.estimatedNetCost === 0, 'Excess incentives clamp net cost to minimum $0');

  // Test 7: Payback Timeline Calculation
  const mockSavings = {
    monthlySavingsYear1: 148,
    annualSavingsYear1: 1780,
    savings10Year: 20800,
    savings20Year: 49500,
    savings25Year: 68400,
    totalWithoutSolar25YearCost: 80000,
    net25YearProfit: 56640,
    yearlyComparison: Array.from({ length: 25 }, (_, i) => ({
      year: i + 1,
      annualSavings: 1780 * Math.pow(1.035, i),
      cumulativeSavings: 1780 * (i + 1),
      withoutSolarCost: 2000 * (i + 1),
      withSolarCost: 11760 + 200 * (i + 1),
      cumulativeNetProfit: (1780 * (i + 1)) - 11760,
    })),
  };

  const paybackRes = calculatePaybackTimeline({
    netInvestmentCost: 11760,
    savingsData: mockSavings,
  });
  assert(paybackRes.simplePaybackYears > 0 && paybackRes.simplePaybackYears <= 10, 'Payback period returns valid break-even years');

  // Test 8: ROI Calculation & Division-by-Zero Protection
  const roiRes = calculateSolarRoi({
    initialInvestmentCost: 11760,
    savingsData: mockSavings,
    selectedTimelineYears: 25,
  });
  assert(roiRes.roiPercent > 0, '25-Year ROI returns positive percentage');

  const zeroInvestmentRoi = calculateSolarRoi({
    initialInvestmentCost: 0,
    savingsData: mockSavings,
    selectedTimelineYears: 25,
  });
  assert(zeroInvestmentRoi.roiPercent === 1000, 'Zero investment handled safely without division by zero');

  // Test 9: Battery Sizing & Bounds Checking
  const battRes = calculateBatteryCapacity({
    dailyKwhRequirement: 20,
    backupFraction: 0.50,
    depthOfDischargePercent: 90,
    batteryEfficiencyPercent: 90,
  });
  assert(Math.abs(battRes.recommendedNominalCapacityKwh - 12.3) <= 0.2, 'Nominal battery capacity ≈ 12.3 kWh');
  assert(battRes.depthOfDischargeUsed === 90, 'Depth of discharge used = 90%');
  assert(battRes.batteryEfficiencyUsed === 90, 'Battery efficiency used = 90%');

  // Test 10: Roof Area Sizing
  const roofRes = calculateRoofAreaRequirement({
    panelCount: 16,
    panelLengthMeters: 1.72,
    panelWidthMeters: 1.13,
    usableRoofPercent: 75,
  });
  assert(roofRes.totalNetPanelAreaSqFt > 0, 'Roof panel array footprint calculated correctly in sq ft');
  assert(roofRes.totalGrossRoofAreaRequiredSqFt > roofRes.totalNetPanelAreaSqFt, 'Gross required roof area scales for usability %');

  // Test 11: CO2 Emissions Offset
  const co2Res = calculateEmissionsReduction({
    annualSolarGenerationKwh: 9600,
    gridEmissionsFactorKgPerKwh: 0.42,
  });
  assert(Math.abs(co2Res.annualCo2AvoidedMetricTons - 4.0) <= 0.2, '9,600 kWh @ 0.42 kg CO2/kWh ≈ 4.0 Metric Tons CO2 avoided/yr');

  // Test 12: Input Validation & Sanitization Edge Cases
  const valNeg = validatePositiveNumber(-5, 10, 'Usage');
  assert(!valNeg.isValid && valNeg.sanitizedValue === 10, 'Negative input sanitized to fallback');

  const valNaN = validatePositiveNumber(NaN, 5, 'Rate');
  assert(!valNaN.isValid && valNaN.sanitizedValue === 5, 'NaN input sanitized to fallback');

  const valLarge = validatePositiveNumber(1500000, 1000, 'Usage', 500000);
  assert(valLarge.sanitizedValue === 500000, 'Excessively large input clamped to max reasonable limit');

  console.log(`Phase 5 Test Suite Summary: ${passed} passed, ${failed} failed.`);
  return { passed, failed };
}
