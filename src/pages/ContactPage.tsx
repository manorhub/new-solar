import React, { useState, useEffect } from 'react';
import { updatePageSeo } from '../lib/seo/seo';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    updatePageSeo({
      title: 'Contact SolarEngine Team | Feedback & Support',
      description: 'Get in touch with the SolarEngine platform team for calculation feedback, partnership inquiries, or methodology questions.',
      canonicalUrl: 'https://solarpanelcalculator.org/contact',
      breadcrumbs: [
        { name: 'Home', url: 'https://solarpanelcalculator.org' },
        { name: 'Contact', url: 'https://solarpanelcalculator.org/contact' },
      ],
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Contact SolarEngine Team</h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Have feedback on our solar formulas, data sources, or regional presets? Send us a message.
        </p>
      </div>

      <div className="solar-card p-8">
        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950">Thank You for Your Feedback!</h3>
            <p className="text-xs text-emerald-800">
              Your message has been captured. We review feedback to continuously improve our regional data benchmarks.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="solar-label">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="solar-input mt-1"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="solar-label">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="solar-input mt-1"
                placeholder="name@email.com"
              />
            </div>

            <div>
              <label className="solar-label">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="solar-input mt-1"
                placeholder="Calculation Feedback / Data Correction"
              />
            </div>

            <div>
              <label className="solar-label">Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="solar-input mt-1"
                placeholder="Write your message here..."
              />
            </div>

            <button type="submit" className="solar-button py-3 w-full font-bold flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
