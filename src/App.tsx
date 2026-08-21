import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SolarSettingsProvider } from './context/SolarSettingsContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LocationSelectorModal } from './components/common/LocationSelectorModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { CalculatorsDirectoryPage } from './pages/CalculatorsDirectoryPage';
import { GuidesListPage } from './pages/GuidesListPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { CountryLandingPage } from './pages/CountryLandingPage';
import { StateLandingPage } from './pages/StateLandingPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage, DisclaimerPage, CookiePolicyPage } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const handleNav = (path: string) => {
    window.location.href = path;
  };

  return (
    <SolarSettingsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-950">
          <Header onNavigate={handleNav} onOpenSearch={() => {}} currentPath={window.location.pathname} />
          <main className="flex-1">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/calculators" element={<CalculatorsDirectoryPage />} />
                <Route path="/guides" element={<GuidesListPage />} />
                <Route path="/guides/:guideSlug" element={<GuideDetailPage />} />
                <Route path="/methodology" element={<MethodologyPage />} />
                <Route path="/data-sources" element={<DataSourcesPage />} />

                {/* Informational & Trust Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />

                {/* Dynamic Country and State SEO Routes */}
                <Route path="/solar/:countrySlug" element={<CountryLandingPage />} />
                <Route path="/solar/:countrySlug/:stateSlug" element={<StateLandingPage />} />
                <Route path="/solar-panel-calculator/:countrySlug" element={<CountryLandingPage />} />
                <Route path="/solar-panel-calculator/:countrySlug/:stateSlug" element={<StateLandingPage />} />

                {/* Calculator Specific Routes */}
                <Route path="/:calculatorSlug" element={<CalculatorPage />} />

                {/* Custom 404 Catch-All */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer onNavigate={handleNav} />
          <LocationSelectorModal />
        </div>
      </BrowserRouter>
    </SolarSettingsProvider>
  );
};

export default App;
