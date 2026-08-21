import React, { useEffect } from 'react';
import { updatePageSeo } from '../lib/seo/seo';
import { ShieldCheck, Lock, FileText, AlertOctagon } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Privacy Policy | SolarEngine Platform',
      description: 'Privacy Policy for SolarEngine platform. We do not store or sell your private calculation data.',
      canonicalUrl: 'https://solarpanelcalculator.org/privacy',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <div className="flex items-center gap-2">
        <Lock className="w-6 h-6 text-amber-500" />
        <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
      </div>
      <div className="solar-card p-8 space-y-4 text-xs text-slate-700 leading-relaxed">
        <p><strong>Last Updated: August 2026</strong></p>
        <p>SolarEngine values your privacy. All calculation data entered into our tools (monthly bills, kWh usage, panel wattages) runs locally within your browser and is not sold to third-party solar leads brokers.</p>
        <h3 className="font-bold text-sm text-slate-900 pt-2">Data Collection</h3>
        <p>We do not collect personal financial data or precise geolocation coordinates. Optional browser geolocation requests are processed locally to select your state/country preset.</p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Terms of Use | SolarEngine Platform',
      description: 'Terms of Service for using SolarEngine calculation tools.',
      canonicalUrl: 'https://solarpanelcalculator.org/terms',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-500" />
        <h1 className="text-3xl font-black text-slate-900">Terms of Use</h1>
      </div>
      <div className="solar-card p-8 space-y-4 text-xs text-slate-700 leading-relaxed">
        <p><strong>Last Updated: August 2026</strong></p>
        <p>By accessing SolarEngine, you agree to use our calculators for educational and planning purposes. Results are non-binding engineering estimates and do not constitute a formal contract or engineering guarantee.</p>
      </div>
    </div>
  );
};

export const DisclaimerPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Engineering Disclaimer | SolarEngine Platform',
      description: 'Full engineering and financial disclaimer for SolarEngine calculations.',
      canonicalUrl: 'https://solarpanelcalculator.org/disclaimer',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <div className="flex items-center gap-2">
        <AlertOctagon className="w-6 h-6 text-red-500" />
        <h1 className="text-3xl font-black text-slate-900">Engineering Disclaimer</h1>
      </div>
      <div className="solar-card p-8 space-y-4 text-xs text-slate-700 leading-relaxed">
        <p><strong>Educational & Planning Disclaimer:</strong></p>
        <p>Solar calculations provided on this website are estimates based on standard engineering formulas, regional peak sun hours, and baseline tariff data. Actual energy generation and financial savings depend on site-specific roof azimuth, tree shading, local utility net metering policies, and installer quotes. Always consult a licensed solar contractor before purchasing hardware.</p>
      </div>
    </div>
  );
};

export const CookiePolicyPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Cookie Policy | SolarEngine Platform',
      description: 'Cookie Policy for SolarEngine. We use minimal functional local storage for preset preferences.',
      canonicalUrl: 'https://solarpanelcalculator.org/cookie-policy',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-emerald-600" />
        <h1 className="text-3xl font-black text-slate-900">Cookie Policy</h1>
      </div>
      <div className="solar-card p-8 space-y-4 text-xs text-slate-700 leading-relaxed">
        <p>SolarEngine uses browser local storage strictly to remember your selected country, state, and currency preferences between sessions.</p>
      </div>
    </div>
  );
};
