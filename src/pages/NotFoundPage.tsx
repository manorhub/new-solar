import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updatePageSeo } from '../lib/seo/seo';
import { AlertTriangle, Home, Calculator, BookOpen, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Page Not Found (404) | Solar Panel Calculator',
      description: 'The requested page could not be found. Explore our solar calculators or educational guides.',
      canonicalUrl: 'https://solarpanelcalculator.org/404',
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-8">
      <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-amber-600">Error 404</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          We couldn't find that page.
        </h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          The page or route you are looking for may have been moved, renamed, or does not exist. Use the shortcuts below to navigate back to our calculators.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto text-xs font-bold">
        <Link
          to="/"
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-900 flex flex-col items-center gap-1.5 shadow-xs transition-all"
        >
          <Home className="w-4 h-4 text-amber-500" />
          <span>Home</span>
        </Link>
        <Link
          to="/calculators"
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-900 flex flex-col items-center gap-1.5 shadow-xs transition-all"
        >
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span>Calculators</span>
        </Link>
        <Link
          to="/solar-panel-calculator"
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-900 flex flex-col items-center gap-1.5 shadow-xs transition-all"
        >
          <Compass className="w-4 h-4 text-blue-500" />
          <span>Panel Calculator</span>
        </Link>
        <Link
          to="/guides"
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-900 flex flex-col items-center gap-1.5 shadow-xs transition-all"
        >
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>Solar Guides</span>
        </Link>
      </div>
    </div>
  );
};
