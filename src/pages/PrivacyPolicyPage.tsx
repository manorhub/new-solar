import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const PrivacyPolicyPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => (
  <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <SEOHead title="Privacy Policy – SolarEngine" description="SolarEngine Privacy Policy detailing client-side calculation data handling." />
    <Breadcrumbs items={[{ label: 'Privacy Policy' }]} onNavigate={onNavigate} />
    <h1 className="text-3xl font-extrabold text-slate-950">Privacy Policy</h1>
    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
      <p>SolarEngine respects user privacy. All solar calculations, inputs, monthly bill amounts, and regional settings run entirely in your local browser environment.</p>
      <p>We do not store or transmit your personal financial usage data to external marketing databases or third-party lead generators.</p>
    </div>
  </div>
);
