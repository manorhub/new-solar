import React from 'react';
import { CALCULATORS_REGISTRY } from '../lib/data/calculatorsData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FormulaSection } from '../components/common/FormulaSection';
import { FAQSection } from '../components/common/FAQSection';
import { RelatedCalculators } from '../components/common/RelatedCalculators';
import { useSolarSettings } from '../context/SolarSettingsContext';

// Calculator UI imports
import { SolarPanelCalculator } from '../components/calculators/SolarPanelCalculator';
import { SolarSystemSizeCalculator } from '../components/calculators/SolarSystemSizeCalculator';
import { SolarSavingsCalculator } from '../components/calculators/SolarSavingsCalculator';
import { SolarCostCalculator } from '../components/calculators/SolarCostCalculator';
import { SolarPaybackCalculator } from '../components/calculators/SolarPaybackCalculator';
import { SolarPanelOutputCalculator } from '../components/calculators/SolarPanelOutputCalculator';
import { RoofAreaCalculator } from '../components/calculators/RoofAreaCalculator';
import { BatteryStorageCalculator } from '../components/calculators/BatteryStorageCalculator';
import { SolarBatteryCalculator } from '../components/calculators/SolarBatteryCalculator';
import { SolarROICalculator } from '../components/calculators/SolarROICalculator';
import { SolarCO2Calculator } from '../components/calculators/SolarCO2Calculator';
import { SolarPanelNumberCalculator } from '../components/calculators/SolarPanelNumberCalculator';

import { useParams, useNavigate } from 'react-router-dom';

interface CalculatorPageProps {
  slug?: string;
  onNavigate?: (path: string) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ slug, onNavigate }) => {
  const params = useParams<{ calculatorSlug: string }>();
  const navigate = useNavigate();
  const activeSlug = slug || params.calculatorSlug || 'solar-panel-calculator';
  const handleNav = onNavigate || ((path: string) => navigate(path));
  const { activeCountry, peakSunHours } = useSolarSettings();
  const meta = CALCULATORS_REGISTRY.find((c) => c.slug === activeSlug);

  if (!meta) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Calculator Not Found</h1>
        <p className="text-sm text-slate-600 mt-2">The requested solar tool could not be located.</p>
        <button
          onClick={() => handleNav('/calculators')}
          className="mt-4 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl text-xs"
        >
          Return to Calculators Directory
        </button>
      </div>
    );
  }

  const renderCalculatorComponent = () => {
    switch (meta.slug) {
      case 'solar-panel-calculator':
        return <SolarPanelCalculator />;
      case 'solar-system-size-calculator':
        return <SolarSystemSizeCalculator />;
      case 'solar-savings-calculator':
        return <SolarSavingsCalculator />;
      case 'solar-cost-calculator':
        return <SolarCostCalculator />;
      case 'solar-payback-calculator':
        return <SolarPaybackCalculator />;
      case 'solar-panel-output-calculator':
        return <SolarPanelOutputCalculator />;
      case 'solar-roof-area-calculator':
        return <RoofAreaCalculator />;
      case 'battery-storage-calculator':
        return <BatteryStorageCalculator />;
      case 'solar-battery-calculator':
        return <SolarBatteryCalculator />;
      case 'solar-roi-calculator':
        return <SolarROICalculator />;
      case 'solar-co2-calculator':
        return <SolarCO2Calculator />;
      case 'solar-panel-number-calculator':
        return <SolarPanelNumberCalculator />;
      default:
        return <SolarPanelCalculator />;
    }
  };

  const faqs = [
    {
      question: `How accurate are the results from this ${meta.name}?`,
      answer: `Our calculations rely on standard photovoltaic engineering equations and localized solar irradiance benchmarks (${activeCountry.name}). However, real-world yield depends on exact roof tilt, shade obstructions, local utility tariffs, and equipment specifications.`,
    },
    {
      question: `How does location impact solar power generation?`,
      answer: `Solar irradiance (peak sun hours) varies significantly by geographical region. For example, high-sun regions (e.g. Arizona US or Rajasthan India) receive over 5.5 peak sun hours daily, requiring fewer panels than lower-sun regions (e.g. UK or Seattle).`,
    },
    {
      question: `Can I export or save my calculation result?`,
      answer: `Yes, you can copy the summary directly to your clipboard or use the print-friendly feature to create a clean PDF document for installer quotes.`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SEOHead
        title={`${meta.name} – Free Solar Energy Estimator`}
        description={meta.shortDescription}
        schemaType="WebApplication"
        faqItems={faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Calculators', path: '/calculators' },
          { label: meta.name },
        ]}
        onNavigate={handleNav}
      />

      {/* Page Header */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-900">
          {meta.categoryName}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          {meta.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {meta.shortDescription}
        </p>
      </div>

      {/* Interactive Tool */}
      <div className="space-y-4">
        {renderCalculatorComponent()}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <FormulaSection
            formulaText={`System Capacity (kW) = Annual Energy Requirement (kWh) ÷ (Peak Sun Hours × 365.25 × Performance Ratio)`}
            inputsList={[
              'Monthly / Annual kWh Electricity Consumption',
              `Regional Peak Sun Hours (${peakSunHours} hrs/day for ${activeCountry.name})`,
              'Photovoltaic Panel Power Rating (350W–540W)',
              'Performance Ratio (0.80 default derating factor)',
            ]}
            assumptionsList={[
              '80% Performance Ratio (PR) accounting for thermal losses, inverter conversion, and wiring resistance',
              '100% Target Grid Energy Offset',
              'Linear 25-Year Panel Power Degradation rate of 0.5% per year',
            ]}
            limitationsText="Actual solar energy production varies based on site-specific roof pitch, shading obstructions, ambient cell temperatures, and local utility net metering policies."
          />
          <FAQSection faqs={faqs} />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <RelatedCalculators
            currentId={meta.id}
            relatedIds={['solar-system-size-calculator', 'solar-savings-calculator', 'solar-payback-calculator']}
            onNavigate={handleNav}
          />
        </div>
      </div>
    </div>
  );
};
