export const SITE_CONFIG = {
  siteName: 'Solar Panel Calculator',
  siteUrl: (import.meta as any).env?.VITE_SITE_URL || 'https://solarpanelcalculator.org',
  defaultOgImage: 'https://solarpanelcalculator.org/og-solar.png',
  supportEmail: 'contact@solarpanelcalculator.org',
  twitterHandle: '@SolarCalcOrg',
};

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = SITE_CONFIG.siteUrl.replace(/\/$/, '');
  // Strip trailing query parameters for indexable canonical tags
  const basePathOnly = cleanPath.split('?')[0];
  return `${baseUrl}${basePathOnly}`;
}
