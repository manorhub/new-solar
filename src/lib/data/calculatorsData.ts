export type CalculatorCategory = 'sizing' | 'financial' | 'energy' | 'environmental';

export interface CalculatorMeta {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: CalculatorCategory;
  categoryName: string;
  seoTitle: string;
  seoDescription: string;
  primaryUseCase: string;
  formula: string;
  formulaExplanation: string;
  workedExample: {
    title: string;
    inputs: Record<string, string>;
    calculationSteps: string[];
    resultText: string;
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedCalculatorIds: string[];
  relatedGuideSlugs: string[];
}

export const CALCULATORS_REGISTRY: CalculatorMeta[] = [
  {
    id: 'solar-panel-calculator',
    slug: 'solar-panel-calculator',
    name: 'Solar Panel Calculator',
    shortDescription: 'Calculate how many solar panels you need, system kW size, daily kWh output, and annual savings.',
    longDescription: 'Comprehensive solar calculation tool. Calculates system size (kW), required module count, daily/annual energy output, 25-year financial savings, and installation cost based on your monthly electricity bill or kWh consumption.',
    category: 'sizing',
    categoryName: 'Solar Sizing',
    seoTitle: 'Solar Panel Calculator — Estimate Solar System Size & Panels Needed',
    seoDescription: 'Calculate how many solar panels you need, required system size (kW), daily kWh generation, and 25-year bill savings based on your local utility tariff.',
    primaryUseCase: 'Determine exact solar panel count and system kW capacity needed for your house.',
    formula: 'Required kW = Monthly kWh / (Peak Sun Hours * 30.416 * 0.80 PR)',
    formulaExplanation: 'Sizes required system capacity by dividing monthly kWh demand by the product of regional peak sun hours, average days per month, and an 80% Performance Ratio derating factor.',
    workedExample: {
      title: 'Suburban Home Worked Example (900 kWh/mo)',
      inputs: {
        'Monthly Bill': '$180 / month (@ $0.20/kWh)',
        'Monthly Consumption': '900 kWh / month',
        'Regional Peak Sun Hours': '4.8 hours / day (Atlanta, GA)',
        'Panel Wattage Rating': '400-Watt Monocrystalline',
        'Performance Ratio': '0.80 (80%)',
      },
      calculationSteps: [
        '1. Daily kWh Target = 900 kWh ÷ 30.416 days = 29.59 kWh / day',
        '2. System Capacity (kW) = 29.59 kWh ÷ (4.8 PSH × 0.80 PR) = 7.70 kW DC',
        '3. Module Count = Math.ceil((7.70 kW × 1000) ÷ 400W) = 20 Panels',
        '4. Installed Array Capacity = 20 × 400W = 8.00 kW DC',
      ],
      resultText: '20 Solar Panels (8.0 kW DC) generating ~11,680 kWh per year to offset 100% of your bill.',
    },
    faqs: [
      { question: 'How many solar panels do I need?', answer: 'An average household consuming 900 kWh per month requires approximately 16 to 20 solar panels (400W rating) depending on regional peak sun hours.' },
      { question: 'Can I calculate using my monthly bill instead of kWh?', answer: 'Yes, our calculator allows you to enter either monthly kWh or your monthly bill in local currency ($/mo or ₹/mo).' },
      { question: 'Does location affect the calculation?', answer: 'Yes, peak sun hours vary significantly by location (e.g. Arizona receives 6.2 PSH/day vs Seattle receiving 3.8 PSH/day).' },
    ],
    relatedCalculatorIds: ['solar-system-size-calculator', 'solar-panel-number-calculator', 'solar-savings-calculator'],
    relatedGuideSlugs: ['how-many-solar-panels-do-i-need', 'solar-panels-for-2000-sq-ft-house', 'what-is-a-kw-vs-kwh'],
  },
  {
    id: 'solar-system-size-calculator',
    slug: 'solar-system-size-calculator',
    name: 'Solar System Size Calculator',
    shortDescription: 'Calculate the exact kilowatt (kW DC) solar array size required for your daily electricity consumption.',
    longDescription: 'Determine your required solar array capacity in kilowatts (kW DC) based on your daily energy demand and local sun hours.',
    category: 'sizing',
    categoryName: 'Solar Sizing',
    seoTitle: 'Solar System Size Calculator — Calculate Required kW Array Capacity',
    seoDescription: 'Find out what size solar system (kW) you need for your house. Calculates capacity requirements based on daily load and peak sun hours.',
    primaryUseCase: 'Size system capacity (3kW, 6.6kW, 10kW) for target grid offset.',
    formula: 'System Size (kW) = Daily kWh / (Peak Sun Hours * 0.80 PR)',
    formulaExplanation: 'Determines kW capacity required to produce your target daily kWh yield under local solar irradiance.',
    workedExample: {
      title: 'Daily Load Sizing Example (30 kWh/day)',
      inputs: {
        'Daily Load': '30 kWh / day',
        'Peak Sun Hours': '5.0 hrs / day',
        'Performance Ratio': '0.80',
      },
      calculationSteps: [
        '1. Effective Generation per kW = 5.0 PSH × 0.80 PR = 4.0 kWh / kW / day',
        '2. Required kW = 30 kWh ÷ 4.0 = 7.5 kW DC System',
      ],
      resultText: 'A 7.5 kW solar system is recommended for a 30 kWh daily load.',
    },
    faqs: [
      { question: 'What is the difference between kW and kWh?', answer: 'kW measures instantaneous power capacity, while kWh measures total energy volume generated over time.' },
      { question: 'What size solar system does a standard house need?', answer: 'Most 3-4 bedroom homes require between 6.0 kW and 8.0 kW of solar capacity.' },
    ],
    relatedCalculatorIds: ['solar-panel-calculator', 'solar-panel-number-calculator'],
    relatedGuideSlugs: ['what-size-solar-system-do-i-need', 'what-is-a-kw-vs-kwh'],
  },
  {
    id: 'solar-panel-number-calculator',
    slug: 'solar-panel-number-calculator',
    name: 'Solar Panel Number Calculator',
    shortDescription: 'Fast panel count estimator. Calculate exact module counts for 350W, 400W, 450W, and 540W modules.',
    longDescription: 'Direct panel count calculator. Select your panel wattage rating and monthly kWh consumption to calculate panel numbers.',
    category: 'sizing',
    categoryName: 'Solar Sizing',
    seoTitle: 'Solar Panel Number Calculator — How Many Panels Do I Need?',
    seoDescription: 'Calculate the exact number of solar panels needed for your home. Compare 350W, 400W, 450W, and 540W solar module counts.',
    primaryUseCase: 'Get a fast, direct panel count estimate without financial clutter.',
    formula: 'Panels = Math.ceil((Required kW * 1000) / Panel Wattage)',
    formulaExplanation: 'Rounds system capacity up to whole panels.',
    workedExample: {
      title: 'Panel Count Example (6.6 kW System)',
      inputs: { 'System Capacity': '6.6 kW DC', 'Panel Rating': '400-Watt' },
      calculationSteps: ['Panels = (6.6 × 1000) ÷ 400 = 16.5 -> 17 Panels'],
      resultText: 'You need 17 solar panels (400W rating) for a 6.6 kW system.',
    },
    faqs: [
      { question: 'How many panels do I need for a 6.6 kW system?', answer: 'Using 400W panels, you need 17 panels (17 × 400W = 6.8 kW actual).' },
    ],
    relatedCalculatorIds: ['solar-panel-calculator', 'solar-system-size-calculator'],
    relatedGuideSlugs: ['how-many-solar-panels-do-i-need', 'solar-panel-efficiency-explained'],
  },
  {
    id: 'solar-savings-calculator',
    slug: 'solar-savings-calculator',
    name: 'Solar Savings Calculator',
    shortDescription: 'Estimate 10-year, 20-year, and 25-year cumulative electricity bill savings and utility rate inflation protection.',
    longDescription: 'Financial cash flow model calculating monthly, annual, and 25-year cumulative bill savings accounting for utility escalation.',
    category: 'financial',
    categoryName: 'Solar Financial',
    seoTitle: 'Solar Savings Calculator — Estimate 25-Year Electric Bill Savings',
    seoDescription: 'Calculate how much money you can save with solar panels over 10, 20, and 25 years. Accounts for utility rate inflation.',
    primaryUseCase: 'Project cumulative financial savings and electric bill offsets over 25 years.',
    formula: 'Year N Savings = Solar Output * (Current Rate * (1 + Escalation)^N)',
    formulaExplanation: 'Calculates escalating annual avoided utility costs.',
    workedExample: {
      title: '25-Year Savings Worked Example',
      inputs: { 'Annual Output': '8,900 kWh/yr', 'Utility Rate': '$0.20/kWh', 'Inflation': '3.5%/yr' },
      calculationSteps: [
        'Year 1 Savings = 8,900 kWh × $0.20 = $1,780',
        '25-Year Cumulative Savings = $64,200',
      ],
      resultText: 'Cumulative 25-year electric bill savings total ~$64,200.',
    },
    faqs: [
      { question: 'How accurate is a solar savings calculation?', answer: 'Savings are estimates based on your current rate and historic utility price inflation trends.' },
    ],
    relatedCalculatorIds: ['solar-cost-calculator', 'solar-payback-calculator', 'solar-roi-calculator'],
    relatedGuideSlugs: ['how-much-can-solar-panels-save', 'what-affects-solar-savings'],
  },
  {
    id: 'solar-cost-calculator',
    slug: 'solar-cost-calculator',
    name: 'Solar Cost Calculator',
    shortDescription: 'Itemized solar cost estimator: Equipment + Installation + Battery - Tax Credits & Subsidies = Net Cost.',
    longDescription: 'Itemized pricing calculator. Breaks down equipment, labor, battery storage, and national incentives (US 30% ITC or India PM Surya Ghar).',
    category: 'financial',
    categoryName: 'Solar Financial',
    seoTitle: 'Solar Cost Calculator — Estimate Equipment, Labor & Net Cost',
    seoDescription: 'Estimate gross and net solar panel installation costs after applying 30% US Federal ITC or India PM Surya Ghar subsidies.',
    primaryUseCase: 'Itemize gross turn-key installation costs and net out-of-pocket costs after subsidies.',
    formula: 'Net Cost = Equipment + Labor + Battery + Other - Subsidies',
    formulaExplanation: 'Subtracts tax credits and subsidies from gross cost.',
    workedExample: {
      title: '6 kW USA Cost Example',
      inputs: { 'System Capacity': '6.0 kW', 'Gross Cost': '$16,800 ($2.80/W)', 'US 30% ITC': '$5,040' },
      calculationSteps: ['Net Cost = $16,800 - $5,040 = $11,760'],
      resultText: 'Estimated net cost is $11,760 after 30% ITC.',
    },
    faqs: [
      { question: 'What incentives reduce solar cost?', answer: 'US buyers get 30% Federal ITC; Indian buyers get up to Rs 78,000 via PM Surya Ghar.' },
    ],
    relatedCalculatorIds: ['solar-savings-calculator', 'solar-payback-calculator'],
    relatedGuideSlugs: ['how-much-does-solar-cost-2026'],
  },
  {
    id: 'solar-payback-calculator',
    slug: 'solar-payback-calculator',
    name: 'Solar Payback Calculator',
    shortDescription: 'Calculate your exact solar break-even timeline in years and months.',
    longDescription: 'Timeline-focused financial calculator determining the exact break-even year when cumulative bill savings equal net investment.',
    category: 'financial',
    categoryName: 'Solar Financial',
    seoTitle: 'Solar Payback Calculator — Estimate Solar Break-Even Timeline',
    seoDescription: 'Calculate your solar panel payback period in years and months. Models year-by-year cash flows and break-even thresholds.',
    primaryUseCase: 'Determine exact year and month when solar savings pay off net upfront investment.',
    formula: 'Payback Years = Net Investment / First-Year Savings',
    formulaExplanation: 'Calculates the years required for cumulative savings to cover net investment.',
    workedExample: {
      title: 'Payback Worked Example',
      inputs: { 'Net Investment': '$11,760', 'Year 1 Savings': '$1,780/yr', 'Rate Escalation': '3.5%/yr' },
      calculationSteps: ['Break-even reached at Year 5, Month 8.'],
      resultText: 'Estimated payback period is 5.7 Years.',
    },
    faqs: [
      { question: 'What is a good solar payback period?', answer: 'A payback period between 4 and 8 years is considered excellent.' },
    ],
    relatedCalculatorIds: ['solar-savings-calculator', 'solar-roi-calculator'],
    relatedGuideSlugs: ['how-does-solar-payback-work'],
  },
  {
    id: 'solar-roi-calculator',
    slug: 'solar-roi-calculator',
    name: 'Solar ROI Calculator',
    shortDescription: 'Calculate 10-year, 20-year, and 25-year financial Return on Investment (%) and Internal Rate of Return (IRR).',
    longDescription: 'Financial yield calculator evaluating total return on investment percentage and annualized IRR over 10, 20, and 25 years.',
    category: 'financial',
    categoryName: 'Solar Financial',
    seoTitle: 'Solar ROI Calculator — Calculate Return on Investment & IRR',
    seoDescription: 'Calculate 10-year, 20-year, and 25-year solar return on investment percentages, net profit gain, and annualized IRR.',
    primaryUseCase: 'Calculate long-term financial yield percentage and net profit gain.',
    formula: 'ROI (%) = ((Lifetime Savings - Initial Net Cost) / Initial Net Cost) * 100',
    formulaExplanation: 'Measures net profit percentage relative to upfront investment.',
    workedExample: {
      title: '25-Year ROI Example',
      inputs: { 'Initial Net Cost': '$11,760', '25-Year Savings': '$64,200' },
      calculationSteps: ['Net Profit = $64,200 - $11,760 = $52,440', 'ROI = ($52,440 / $11,760) * 100 = 445%'],
      resultText: '25-Year Return on Investment is +445%.',
    },
    faqs: [
      { question: 'How is solar ROI different from payback period?', answer: 'Payback measures years to break even; ROI measures total net percentage profit over 25 years.' },
    ],
    relatedCalculatorIds: ['solar-payback-calculator', 'solar-savings-calculator'],
    relatedGuideSlugs: ['how-does-solar-roi-work'],
  },
  {
    id: 'battery-storage-calculator',
    slug: 'battery-storage-calculator',
    name: 'Battery Storage Calculator',
    shortDescription: 'Calculate nominal battery capacity (kWh), usable kWh, and essential load vs whole-home backup.',
    longDescription: 'Nominal battery capacity calculator factoring in Depth of Discharge (DoD), efficiency, and desired backup load fraction.',
    category: 'energy',
    categoryName: 'Energy Storage',
    seoTitle: 'Solar Battery Storage Calculator — Size Battery kWh Capacity',
    seoDescription: 'Calculate required solar battery capacity in nominal kWh. Accounts for usable capacity, Depth of Discharge (DoD), and efficiency.',
    primaryUseCase: 'Size nominal battery storage capacity in kWh for backup power.',
    formula: 'Nominal kWh = (Daily kWh Target * Backup Fraction) / (DoD % * Efficiency %)',
    formulaExplanation: 'Sizes total nominal battery capacity needed to deliver target usable kWh.',
    workedExample: {
      title: 'Essential Load Battery Example (15 kWh/day backup)',
      inputs: { 'Daily Target': '30 kWh', 'Backup Fraction': '50% (15 kWh)', 'DoD': '90%', 'Efficiency': '90%' },
      calculationSteps: ['Nominal Capacity = 15 ÷ (0.90 × 0.90) = 18.5 kWh'],
      resultText: 'Recommended nominal battery size is 18.5 kWh (15 kWh usable).',
    },
    faqs: [
      { question: 'What is battery Depth of Discharge (DoD)?', answer: 'DoD is the percentage of battery energy that can be safely discharged without degrading cell health (LFP batteries typically feature 85%-90% DoD).' },
    ],
    relatedCalculatorIds: ['solar-battery-calculator', 'solar-system-size-calculator'],
    relatedGuideSlugs: ['how-much-battery-storage-do-i-need', 'solar-battery-capacity-explained'],
  },
  {
    id: 'solar-panel-output-calculator',
    slug: 'solar-panel-output-calculator',
    name: 'Solar Panel Output Calculator',
    shortDescription: 'Estimate daily, average monthly, and annual kWh energy yields with seasonal monthly generation curves.',
    longDescription: 'Energy yield visualizer estimating daily, monthly, and annual kilowatt-hour generation under regional peak sun hours.',
    category: 'energy',
    categoryName: 'Solar Energy',
    seoTitle: 'Solar Panel Output Calculator — Estimate Daily & Annual kWh Yield',
    seoDescription: 'Calculate how much electricity your solar panels will produce per day, per month, and per year based on peak sun hours.',
    primaryUseCase: 'Estimate daily, monthly, and annual energy production for a given panel array.',
    formula: 'Annual kWh = System kW * Peak Sun Hours * 365.25 * 0.80 PR',
    formulaExplanation: 'Calculates energy production using sun hours and Performance Ratio.',
    workedExample: {
      title: '6.6 kW Array Output Example',
      inputs: { 'System Capacity': '6.6 kW DC', 'Peak Sun Hours': '5.0 hrs/day', 'Performance Ratio': '0.80' },
      calculationSteps: [
        'Daily Output = 6.6 kW × 5.0 PSH × 0.80 = 26.4 kWh / day',
        'Annual Output = 26.4 kWh × 365.25 = 9,642 kWh / year',
      ],
      resultText: 'A 6.6 kW system generates ~26.4 kWh daily (~9,642 kWh annually).',
    },
    faqs: [
      { question: 'Why does actual solar output vary by season?', answer: 'Sun angles, day length, and cloud cover fluctuate throughout the year, causing summer yields to exceed winter yields.' },
    ],
    relatedCalculatorIds: ['solar-panel-calculator', 'solar-system-size-calculator'],
    relatedGuideSlugs: ['how-much-electricity-does-a-solar-panel-produce', 'solar-panel-output-explained'],
  },
  {
    id: 'solar-roof-area-calculator',
    slug: 'solar-roof-area-calculator',
    name: 'Roof Area Calculator',
    shortDescription: 'Calculate required panel footprint surface area vs estimated gross usable roof area (sq ft / m²).',
    longDescription: 'Roof footprint calculator determining total panel area and gross usable roof surface required for installation.',
    category: 'sizing',
    categoryName: 'Solar Sizing',
    seoTitle: 'Solar Roof Area Calculator — Calculate Usable Roof Space Needed',
    seoDescription: 'Calculate how much roof space (sq ft or m²) is needed for solar panel installation based on panel dimensions and roof usability.',
    primaryUseCase: 'Calculate required panel array footprint and total gross roof area.',
    formula: 'Total Area = Single Panel Area * Panel Count / Roof Usability %',
    formulaExplanation: 'Calculates panel footprint and scales up for usable roof percentage.',
    workedExample: {
      title: '16 Panel Roof Area Example',
      inputs: { 'Panel Count': '16 Panels', 'Panel Dimensions': '1.72m × 1.13m (19.4 sq ft)', 'Usability': '75%' },
      calculationSteps: [
        'Net Array Area = 16 × 19.4 sq ft = 310 sq ft (28.8 m²)',
        'Gross Roof Needed = 310 ÷ 0.75 = 413 sq ft (38.4 m²)',
      ],
      resultText: 'Requires ~310 sq ft panel footprint (413 sq ft gross roof area).',
    },
    faqs: [
      { question: 'How big is a standard solar panel?', answer: 'A standard 400W residential module measures approx 5.6 ft by 3.7 ft (19.4 sq ft or 1.8 m²).' },
    ],
    relatedCalculatorIds: ['solar-panel-calculator', 'solar-panel-number-calculator'],
    relatedGuideSlugs: ['how-does-roof-size-affect-solar-installation'],
  },
  {
    id: 'solar-co2-calculator',
    slug: 'solar-co2-calculator',
    name: 'Solar CO₂ Calculator',
    shortDescription: 'Calculate annual CO₂ carbon emissions avoided, trees planted equivalent, and car miles offset.',
    longDescription: 'Environmental impact calculator converting solar energy yield into avoided metric tons of carbon dioxide based on grid intensity.',
    category: 'environmental',
    categoryName: 'Environmental',
    seoTitle: 'Solar CO₂ Calculator — Calculate Carbon Emissions Avoided',
    seoDescription: 'Calculate annual CO₂ emissions reduced by solar energy. Shows equivalents in trees planted, car miles avoided, and coal burned.',
    primaryUseCase: 'Calculate environmental carbon offset and EPA equivalence metrics.',
    formula: 'CO2 Avoided (Tons) = (Annual kWh * Grid Emissions Factor kg/kWh) / 1000',
    formulaExplanation: 'Multiplies solar production by regional grid carbon intensity.',
    workedExample: {
      title: '6.6 kW System CO₂ Offset Example',
      inputs: { 'Annual Output': '9,600 kWh', 'Grid Factor': '0.42 kg CO2 / kWh' },
      calculationSteps: [
        'Annual CO2 Avoided = (9,600 × 0.42) / 1000 = 4.03 Metric Tons CO2 / yr',
        '25-Year Offset = 100.8 Metric Tons CO2',
      ],
      resultText: 'Avoids 4.03 Metric Tons of CO₂ annually (~185 trees planted equivalent).',
    },
    faqs: [
      { question: 'How is carbon offset calculated?', answer: 'By multiplying your solar energy generation by your regional electric grid emissions factor.' },
    ],
    relatedCalculatorIds: ['solar-panel-output-calculator'],
    relatedGuideSlugs: ['how-do-solar-panels-generate-electricity'],
  },
  {
    id: 'solar-battery-calculator',
    slug: 'solar-battery-calculator',
    name: 'Solar + Battery Calculator',
    shortDescription: 'Integrated solar generation + battery self-consumption energy balance matrix visualizer.',
    longDescription: 'Integrated solar and battery calculator visualizing daytime solar generation vs nighttime battery load shifting.',
    category: 'energy',
    categoryName: 'Energy Storage',
    seoTitle: 'Solar + Battery Calculator — Estimate Self-Consumption Matrix',
    seoDescription: 'Calculate solar + battery storage integration. Visualizes daytime solar yield vs nighttime battery energy balance.',
    primaryUseCase: 'Analyze integrated solar + battery self-consumption load balance.',
    formula: 'Self-Consumption % = Stored Solar kWh / Total Daily Load kWh',
    formulaExplanation: 'Calculates the fraction of household load met by stored solar power.',
    workedExample: {
      title: 'Solar + Battery Load Balance Example',
      inputs: { 'Solar Capacity': '6.6 kW', 'Daily Load': '30 kWh', 'Night Share': '60% (18 kWh)' },
      calculationSteps: ['Battery Storage Sized to 18 kWh nominal to meet 100% night load.'],
      resultText: 'Integrates 18 kWh storage with 6.6 kW solar array for 100% evening self-consumption.',
    },
    faqs: [
      { question: 'Why pair solar panels with a battery?', answer: 'Batteries store excess daytime solar power for evening use, maximizing self-consumption and securing backup power during grid blackouts.' },
    ],
    relatedCalculatorIds: ['battery-storage-calculator', 'solar-panel-calculator'],
    relatedGuideSlugs: ['grid-tied-vs-off-grid-solar', 'solar-battery-storage-guide'],
  },
];
