import { SITE_CONFIG, getCanonicalUrl } from '../config/siteConfig';

export interface SeoProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  isCalculator?: boolean;
}

export function updatePageSeo(props: SeoProps) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = props.title;

  // Meta Description
  setMetaTag('name', 'description', props.description);

  // Canonical Tag (Environment aware, stripping query parameters)
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const cleanCanonical = getCanonicalUrl(props.canonicalUrl);
  canonical.setAttribute('href', cleanCanonical);

  // Open Graph Meta Tags
  setMetaTag('property', 'og:title', props.title);
  setMetaTag('property', 'og:description', props.description);
  setMetaTag('property', 'og:type', props.ogType || 'website');
  setMetaTag('property', 'og:url', cleanCanonical);
  setMetaTag('property', 'og:image', props.ogImage || SITE_CONFIG.defaultOgImage);

  // Twitter Card Meta Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', props.title);
  setMetaTag('name', 'twitter:description', props.description);
  setMetaTag('name', 'twitter:image', props.ogImage || SITE_CONFIG.defaultOgImage);

  // Inject BreadcrumbList JSON-LD Schema
  if (props.breadcrumbs && props.breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: props.breadcrumbs.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: getCanonicalUrl(item.url),
      })),
    };
    injectJsonLd('breadcrumb-jsonld', breadcrumbSchema);
  }

  // Inject FAQPage JSON-LD Schema
  if (props.faqs && props.faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: props.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    injectJsonLd('faq-jsonld', faqSchema);
  }
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function injectJsonLd(id: string, schema: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}
