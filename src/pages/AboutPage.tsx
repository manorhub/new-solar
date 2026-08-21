import React, { useEffect } from 'react';
import { updatePageSeo } from '../lib/seo/seo';
import { ShieldCheck, Cpu, Globe, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'About SolarEngine Platform — Independent Solar Calculation Mission',
      description: 'Learn about SolarEngine, an open, independent solar calculation platform built to empower homeowners and engineers with transparent photovoltaic mathematics.',
      canonicalUrl: 'https://solarpanelcalculator.org/about',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'About', url: 'https://solarpanelcalculator.org/about' },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-xs font-bold border border-amber-500/20">
          <ShieldCheck className="w-4 h-4" /> Open Engineering Principles
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About SolarEngine Platform
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
          SolarEngine was created to solve a widespread problem in the solar energy industry: confusing marketing claims, hidden calculations, and opaque sales pitches.
        </p>
      </div>

      <div className="solar-card p-8 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Our Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Cpu className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-sm text-slate-900">1. Deterministic Calculation</h3>
            <p>
              Calculations run entirely in your browser using pure photovoltaic engineering formulas. Zero hidden algorithms or fake sales lead captures.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Globe className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-sm text-slate-900">2. International First Architecture</h3>
            <p>
              Supports localized irradiance data and currencies across USA, India, Canada, Australia, UK, and global international markets.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">3. Honest Assumptions</h3>
            <p>
              We state every single default constant used (Performance Ratio 0.80, degradation 0.5%/yr, inflation 3.5%/yr) and cite official government data sources.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">4. Free & Accessible</h3>
            <p>
              Our calculators are 100% free for homeowners, commercial property buyers, students, and solar installers worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link to="/calculators" className="solar-button inline-flex py-3 px-8 text-xs font-bold">
          Explore All 12 Solar Calculators
        </Link>
      </div>
    </div>
  );
};
