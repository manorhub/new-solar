import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const CookiePolicyPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => (
  <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <SEOHead title="Cookie Policy – SolarEngine" description="SolarEngine Cookie Policy." />
    <Breadcrumbs items={[{ label: 'Cookie Policy' }]} onNavigate={onNavigate} />
    <h1 className="text-3xl font-extrabold text-slate-950">Cookie Policy</h1>
    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
      <p>SolarEngine uses minimal browser local storage to save your preferred country preset, currency symbol, and measurement unit system (imperial vs metric) for seamless navigation across tools.</p>
    </div>
  </div>
);
