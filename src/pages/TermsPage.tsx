import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TermsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => (
  <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <SEOHead title="Terms of Use – SolarEngine" description="Terms of Use for the SolarEngine calculation platform." />
    <Breadcrumbs items={[{ label: 'Terms of Use' }]} onNavigate={onNavigate} />
    <h1 className="text-3xl font-extrabold text-slate-950">Terms of Use</h1>
    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
      <p>By accessing SolarEngine, you agree that calculation results are educational estimates intended to assist in planning and budgeting. Calculations do not constitute engineering, financial, legal, or professional tax advice.</p>
    </div>
  </div>
);
