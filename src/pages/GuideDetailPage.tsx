import React from 'react';
import { SOLAR_GUIDES } from '../lib/data/guidesData';
import { CALCULATORS_REGISTRY } from '../lib/data/calculatorsData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Clock, User, Calendar, ArrowRight, Calculator } from 'lucide-react';

import { useParams, useNavigate } from 'react-router-dom';

interface GuideDetailProps {
  slug?: string;
  onNavigate?: (path: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailProps> = ({ slug, onNavigate }) => {
  const params = useParams<{ guideSlug: string }>();
  const navigate = useNavigate();
  const activeSlug = slug || params.guideSlug || '';
  const handleNav = onNavigate || ((path: string) => navigate(path));
  const guide = SOLAR_GUIDES.find((g) => g.slug === activeSlug);

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Guide Not Found</h1>
        <button
          onClick={() => handleNav('/guides')}
          className="mt-4 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl text-xs"
        >
          Return to Guides Directory
        </button>
      </div>
    );
  }

  const relatedCalcs = CALCULATORS_REGISTRY.filter((c) =>
    guide.relatedCalculatorSlugs.includes(c.slug)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <SEOHead
        title={`${guide.title} – Solar Engine Guide`}
        description={guide.summary}
        schemaType="Article"
      />

      <Breadcrumbs
        items={[
          { label: 'Guides', path: '/guides' },
          { label: guide.title },
        ]}
        onNavigate={handleNav}
      />

      {/* Guide Header */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
          {guide.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
          {guide.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {guide.author}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {guide.publishDate}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {guide.readTime}</span>
        </div>
      </div>

      {/* Article Markdown Rendered Prose */}
      <article className="prose prose-slate max-w-none space-y-4 text-sm text-slate-800 leading-relaxed font-normal">
        {guide.contentMarkdown.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('# ')) {
            return <h1 key={idx} className="text-2xl font-black text-slate-950 mt-6 mb-3">{paragraph.replace('# ', '')}</h1>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={idx} className="text-xl font-bold text-slate-900 mt-6 mb-2">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('### ')) {
            return <h3 key={idx} className="text-base font-bold text-slate-900 mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
          }
          if (paragraph.startsWith('$$') || paragraph.includes('\\frac')) {
            return (
              <div key={idx} className="p-4 bg-slate-900 text-amber-300 font-mono rounded-xl my-4 text-xs overflow-x-auto">
                {paragraph}
              </div>
            );
          }
          return <p key={idx} className="my-2">{paragraph}</p>;
        })}
      </article>

      {/* Related Calculator Recommendation Cards */}
      {relatedCalcs.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-500" /> Apply This Guide With Interactive Calculators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedCalcs.map((calc) => (
              <button
                key={calc.id}
                onClick={() => handleNav(`/${calc.slug}`)}
                className="solar-card p-4 text-left hover:border-amber-500/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {calc.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{calc.shortDescription}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 ml-2 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
