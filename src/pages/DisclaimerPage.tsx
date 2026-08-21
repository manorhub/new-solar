import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldAlert } from 'lucide-react';

export const DisclaimerPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => (
  <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <SEOHead title="Solar Calculation Disclaimer – SolarEngine" description="Engineering and financial disclaimer regarding solar estimates." />
    <Breadcrumbs items={[{ label: 'Disclaimer' }]} onNavigate={onNavigate} />
    <div className="flex items-center gap-3">
      <ShieldAlert className="w-8 h-8 text-amber-500" />
      <h1 className="text-3xl font-extrabold text-slate-950">Solar Calculation Disclaimer</h1>
    </div>
    <div className="p-6 bg-slate-900 text-slate-300 rounded-2xl text-xs leading-relaxed space-y-4">
      <p>
        Solar calculations provided by this website are estimates for educational and planning purposes. Actual solar production, costs, savings, incentives, and payback can vary based on location, weather, shading, equipment, installation, electricity rates, utility policies, taxes, and other factors.
      </p>
      <p>
        Consult a qualified solar professional or licensed electrical contractor for site-specific engineering design, shade analysis, and official utility interconnection requirements.
      </p>
    </div>
  </div>
);
