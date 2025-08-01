import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { 
  SEO_CONFIG, 
  generateMetaTags, 
  trackPerformanceMetrics, 
  trackUserEngagement,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData
} from '../services/seoService';

interface AdvancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  structuredData?: any;
  noIndex?: boolean;
  canonicalUrl?: string;
  alternateLanguages?: { [key: string]: string };
  enableAnalytics?: boolean;
  enablePerformanceTracking?: boolean;
}

const AdvancedSEO: React.FC<AdvancedSEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  structuredData,
  noIndex = false,
  canonicalUrl,
  alternateLanguages = {},
  enableAnalytics = true,
  enablePerformanceTracking = true
}) => {
  const location = useLocation();
  const currentUrl = url || `${SEO_CONFIG.baseUrl}${location.pathname}`;
  const canonical = canonicalUrl || currentUrl;

  // Generate comprehensive meta tags
  const metaTags = generateMetaTags({
    title,
    description,
    keywords,
    image,
    url: currentUrl,
    type,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags
  });

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData(location.pathname, title || SEO_CONFIG.defaultTitle);

  // Performance tracking
  useEffect(() => {
    if (enablePerformanceTracking) {
      trackPerformanceMetrics();
    }

    // Track page view
    if (enableAnalytics && window.gtag) {
      window.gtag('config', SEO_CONFIG.googleAnalyticsId, {
        page_title: title || SEO_CONFIG.defaultTitle,
        page_location: currentUrl,
        page_path: location.pathname
      });
    }

    // Track user engagement
    trackUserEngagement('page_view', location.pathname);
  }, [location.pathname, title, enableAnalytics, enablePerformanceTracking, currentUrl]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords} />
      <meta name="author" content={metaTags.author} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : metaTags.robots} />
      <meta name="googlebot" content={metaTags.googlebot} />
      <meta name="bingbot" content={metaTags.bingbot} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Alternate Languages */}
      {Object.entries(alternateLanguages).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Open Graph */}
      <meta property="og:title" content={metaTags['og:title']} />
      <meta property="og:description" content={metaTags['og:description']} />
      <meta property="og:image" content={metaTags['og:image']} />
      <meta property="og:url" content={metaTags['og:url']} />
      <meta property="og:type" content={metaTags['og:type']} />
      <meta property="og:site_name" content={metaTags['og:site_name']} />
      <meta property="og:locale" content={metaTags['og:locale']} />
      <meta property="og:image:width" content={metaTags['og:image:width']} />
      <meta property="og:image:height" content={metaTags['og:image:height']} />
      <meta property="og:image:alt" content={metaTags['og:image:alt']} />
      
      {/* Facebook App ID */}
      {SEO_CONFIG.facebookAppId && (
        <meta property="fb:app_id" content={SEO_CONFIG.facebookAppId} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={metaTags['twitter:card']} />
      <meta name="twitter:title" content={metaTags['twitter:title']} />
      <meta name="twitter:description" content={metaTags['twitter:description']} />
      <meta name="twitter:image" content={metaTags['twitter:image']} />
      <meta name="twitter:creator" content={metaTags['twitter:creator']} />
      <meta name="twitter:site" content={metaTags['twitter:site']} />
      
      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 && <meta property="article:tag" content={tags.join(', ')} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content={metaTags['geo.region']} />
      <meta name="geo.placename" content={metaTags['geo.placename']} />
      <meta name="language" content={metaTags.language} />
      <meta name="revisit-after" content={metaTags['revisit-after']} />
      <meta name="distribution" content={metaTags.distribution} />
      <meta name="rating" content={metaTags.rating} />
      <meta name="format-detection" content={metaTags['format-detection']} />
      
      {/* PWA Meta Tags */}
      <meta name="theme-color" content={metaTags['theme-color']} />
      <meta name="msapplication-TileColor" content={metaTags['msapplication-TileColor']} />
      <meta name="apple-mobile-web-app-capable" content={metaTags['apple-mobile-web-app-capable']} />
      <meta name="apple-mobile-web-app-status-bar-style" content={metaTags['apple-mobile-web-app-status-bar-style']} />
      <meta name="apple-mobile-web-app-title" content={metaTags['apple-mobile-web-app-title']} />
      <meta name="application-name" content={metaTags['application-name']} />
      <meta name="mobile-web-app-capable" content={metaTags['mobile-web-app-capable']} />
      <meta name="msapplication-tap-highlight" content={metaTags['msapplication-tap-highlight']} />
      
      {/* Webmaster Tools Verification */}
      {SEO_CONFIG.bingWebmasterTools && (
        <meta name="msvalidate.01" content={SEO_CONFIG.bingWebmasterTools} />
      )}
      {SEO_CONFIG.yandexWebmasterTools && (
        <meta name="yandex-verification" content={SEO_CONFIG.yandexWebmasterTools} />
      )}
      {SEO_CONFIG.baiduWebmasterTools && (
        <meta name="baidu-site-verification" content={SEO_CONFIG.baiduWebmasterTools} />
      )}
      {SEO_CONFIG.naverWebmasterTools && (
        <meta name="naver-site-verification" content={SEO_CONFIG.naverWebmasterTools} />
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      
      {/* FAQ Structured Data for main pages */}
      {(location.pathname === '/' || location.pathname === '/pokemon') && (
        <script type="application/ld+json">
          {JSON.stringify(generateFAQStructuredData())}
        </script>
      )}
      
      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "url": SEO_CONFIG.baseUrl,
          "logo": `${SEO_CONFIG.baseUrl}/logo192.png`,
          "description": SEO_CONFIG.defaultDescription,
          "sameAs": [
            "https://github.com/lyle-bongani",
            "https://twitter.com/lyle-bongani"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@pokedex.com"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          }
        })}
      </script>
      
      {/* Website Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": SEO_CONFIG.siteName,
          "url": SEO_CONFIG.baseUrl,
          "description": SEO_CONFIG.defaultDescription,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${SEO_CONFIG.baseUrl}/pokemon?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": SEO_CONFIG.siteName,
            "logo": {
              "@type": "ImageObject",
              "url": `${SEO_CONFIG.baseUrl}/logo192.png`
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default AdvancedSEO; 