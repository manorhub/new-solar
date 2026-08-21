import React from 'react';
import { SOLAR_GUIDES } from '../lib/data/guidesData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArrowRight, Clock } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

interface GuidesListProps {
  onNavigate?: (path: string) => void;
}

export const GuidesListPage: React.FC<GuidesListProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const handleNav = onNavigate || ((path: string) => navigate(path));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Solar Guides & Knowledge Base – Educational Solar Resources"
        description="Comprehensive solar energy guides covering panel counts, output calculations, 2026 installation costs, payback math, battery storage, and efficiency."
      />

      <Breadcrumbs items={[{ label: 'Solar Guides' }]} onNavigate={handleNav} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Solar Guides & Knowledge Base
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Practical, engineering-backed solar energy guides designed to help homeowners and solar professionals make informed investments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOLAR_GUIDES.map((guide) => (
          <article
            key={guide.slug}
            onClick={() => handleNav(`/guides/${guide.slug}`)}
            className="solar-card p-6 cursor-pointer hover:border-amber-500/50 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">{guide.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {guide.readTime}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-950 group-hover:text-amber-600 transition-colors">
                {guide.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>Read Full Guide</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
