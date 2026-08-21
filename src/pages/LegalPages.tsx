import React, { useEffect } from 'react';
import { updatePageSeo } from '../lib/seo/seo';
import { Lock, FileText, AlertOctagon, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Privacy Policy | SolarEngine Platform',
      description: 'Official Privacy Policy for SolarEngine. Learn how we protect user privacy, process local browser calculations, and strictly avoid selling user data.',
      canonicalUrl: 'https://solarpanelcalculator.org/privacy',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Privacy Policy', url: 'https://solarpanelcalculator.org/privacy' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Effective Date: August 21, 2026 | Version 2.0</p>
        </div>
      </div>

      <div className="solar-card p-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">1. Introduction & Commitment</h2>
          <p>
            At SolarEngine (accessible from https://solarpanelcalculator.org), accessible privacy and transparent data protection are fundamental principles. This Privacy Policy details the types of information processed when you use our free solar calculation platform and how we protect your personal rights under international data protection frameworks, including the EU/UK General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and India’s Digital Personal Data Protection Act (DPDP).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">2. Local Browser Calculation Architecture (Zero Data Retention)</h2>
          <p>
            Unlike lead-generation websites that force users to submit personal phone numbers, physical addresses, or financial records, <strong>SolarEngine executes all calculations locally within your web browser memory</strong>. When you enter a monthly utility bill, kWh consumption, or panel wattage rating, that data is processed via JavaScript on your local device. We do not store, log, transmit, or sell your calculation inputs to third-party solar installers, brokers, or marketing networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">3. Information We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do NOT collect full legal names, street addresses, or property land registry files.</li>
            <li>We do NOT collect financial credit scores, bank account details, or social security numbers.</li>
            <li>We do NOT collect or store raw calculation inputs on remote database servers.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">4. Browser Local Storage & Cookies</h2>
          <p>
            SolarEngine uses standard browser HTML5 <code>localStorage</code> solely to preserve your non-sensitive preferences between visits:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Selected Country Preset (e.g., US, India, Canada, Australia, UK)</li>
            <li>Selected State or Region Code (e.g., California, Maharashtra)</li>
            <li>Selected Currency Code (e.g., $, ₹, C$, £, A$, €)</li>
          </ul>
          <p>You can clear your local storage at any time through your web browser settings.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">5. Anonymous Usage Analytics & Performance Metrics</h2>
          <p>
            We may collect aggregated, non-personally identifiable web telemetry (such as total pageviews, browser type, device screen width, and referral URLs) to monitor site stability and optimize performance. Telemetry metrics do not include personally identifiable information or calculation entries.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">6. Data Rights & International Compliance</h2>
          <p>
            Regardless of your geographical location, you maintain full control over your web browser session. You have the right to inspect, delete, or block local storage data and request clarification on our data processing methods by contacting our privacy team.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">7. Third-Party Web Links</h2>
          <p>
            Our website contains educational references and external links to official government agencies (such as US NREL, US EIA, India CEA, EPA, and World Bank). SolarEngine is not responsible for the privacy practices or content of third-party external domains.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">8. Contact Information</h2>
          <p>
            If you have questions or feedback regarding this Privacy Policy, please contact our team at:  
            <code>contact@solarpanelcalculator.org</code>
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Terms of Use & Legal Agreement | SolarEngine Platform',
      description: 'Official Terms of Use for SolarEngine. Outlines user rights, non-binding educational estimates, intellectual property, and service terms.',
      canonicalUrl: 'https://solarpanelcalculator.org/terms',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Terms of Use', url: 'https://solarpanelcalculator.org/terms' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Terms of Use</h1>
          <p className="text-xs text-slate-500">Effective Date: August 21, 2026 | Version 2.0</p>
        </div>
      </div>

      <div className="solar-card p-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">1. Agreement & Educational Purpose</h2>
          <p>
            By accessing or using the SolarEngine website (https://solarpanelcalculator.org) and its suite of 12 interactive solar tools, you agree to be legally bound by these Terms of Use. If you do not agree with any portion of these terms, you should discontinue use of our site immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">2. Non-Binding Estimation Disclaimer</h2>
          <p>
            All outputs generated by SolarEngine—including system kW sizing, module counts, 25-year financial savings, payback timelines, battery backup capacity, and roof space calculations—are <strong>purely educational engineering estimates</strong>. They do not constitute formal engineering blueprints, commercial sales quotes, or binding financial contracts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">3. Intellectual Property Rights</h2>
          <p>
            All original website design, UI layout code, technical content, educational guides, mathematical engines, logos, and graphics are the intellectual property of SolarEngine and are protected by applicable copyright, trademark, and international intellectual property laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">4. Prohibited Uses</h2>
          <p>When accessing SolarEngine, users agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Scrape, crawl, or harvest content using automated bots for commercial resale.</li>
            <li>Attempt to bypass security headers or inject malicious scripts into calculator forms.</li>
            <li>Misrepresent calculation results as official certified engineering approvals.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">5. Limitation of Liability</h2>
          <p>
            In no event shall SolarEngine, its maintainers, or authors be liable for any direct, indirect, incidental, or consequential damages resulting from your reliance on calculation outputs or third-party installer contracts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">6. Modifications to Service & Terms</h2>
          <p>
            We reserve the right to update calculation formulas, dataset presets, and these Terms of Use at any time without prior notice. Continued use of the platform constitutes acceptance of updated terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export const DisclaimerPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Engineering & Financial Disclaimer | SolarEngine Platform',
      description: 'Official engineering and financial disclaimer for SolarEngine. Explains calculation scope, assumptions, and requirement to consult licensed solar contractors.',
      canonicalUrl: 'https://solarpanelcalculator.org/disclaimer',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Engineering Disclaimer', url: 'https://solarpanelcalculator.org/disclaimer' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Engineering Disclaimer' }]} />

      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Engineering & Financial Disclaimer</h1>
          <p className="text-xs text-slate-500">Important Notice for Homeowners & Solar Investors</p>
        </div>
      </div>

      <div className="solar-card p-8 space-y-6 text-xs text-slate-700 leading-relaxed border-amber-300 bg-amber-500/5">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600" /> 1. Non-Certified Calculation Disclosure
          </h2>
          <p>
            Calculations generated by SolarEngine are designed strictly for preliminary educational planning, feasibility assessment, and initial budgeting. <strong>SolarEngine does not claim certified professional engineering status or legal utility authority.</strong>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">2. Variables Impacting Real-World Yield</h2>
          <p>
            Actual photovoltaic energy generation, daily kWh production, and 25-year financial savings fluctuate based on site-specific physical parameters that cannot be fully evaluated online, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Physical roof pitch angle, azimuth orientation, and shading obstructions (trees, chimneys, nearby buildings).</li>
            <li>Local utility Net Metering rules (e.g. US NEM 3.0 wholesale export credits vs 1:1 retail credits).</li>
            <li>Ambient operating cell temperatures and localized microclimates.</li>
            <li>Inverter AC/DC sizing ratios and equipment warranty terms.</li>
            <li>Installation labor rates, structural roof repairs, and regional electrical permit fees.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">3. Consult Licensed Professionals</h2>
          <p>
            Before purchasing equipment, applying for solar loans, or signing installation contracts, you must obtain a formal on-site structural engineering assessment and written quote from a qualified, licensed electrical contractor or solar installer in your jurisdiction.
          </p>
        </section>
      </div>
    </div>
  );
};

export const CookiePolicyPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Cookie & Storage Policy | SolarEngine Platform',
      description: 'Official Cookie & Storage Policy for SolarEngine. Explains minimal functional local storage used for country, state, and currency presets.',
      canonicalUrl: 'https://solarpanelcalculator.org/cookie-policy',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Cookie Policy', url: 'https://solarpanelcalculator.org/cookie-policy' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Cookie & Storage Policy</h1>
          <p className="text-xs text-slate-500">Effective Date: August 21, 2026 | Version 2.0</p>
        </div>
      </div>

      <div className="solar-card p-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">1. How We Use Cookies & Local Storage</h2>
          <p>
            SolarEngine operates a minimal storage architecture. We do NOT use invasive advertising tracking cookies, cross-site profiling pixels, or social media tracking beacons.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">2. Essential Functional Preference Keys</h2>
          <p>
            We use HTML5 <code>localStorage</code> strictly to remember your active location configuration so you do not need to re-select your region on every page view:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><code>solar_country_code</code>: Stores country code (e.g. US, IN, CA).</li>
            <li><code>solar_region_code</code>: Stores state/province code (e.g. CA, MH).</li>
            <li><code>solar_currency_code</code>: Stores active currency symbol (e.g. $, ₹).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-950">3. Managing Storage Settings</h2>
          <p>
            You can clear or block local storage at any time through your browser settings (Settings $\rightarrow$ Privacy & Security $\rightarrow$ Clear Browsing Data).
          </p>
        </section>
      </div>
    </div>
  );
};
