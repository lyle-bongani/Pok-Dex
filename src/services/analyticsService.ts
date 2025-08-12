import { SEO_CONFIG } from './seoService';

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  googleAnalyticsId: SEO_CONFIG.googleAnalyticsId,
  googleTagManagerId: SEO_CONFIG.googleTagManagerId,
  facebookPixelId: 'your-facebook-pixel-id',
  twitterPixelId: 'your-twitter-pixel-id',
  linkedinPixelId: 'your-linkedin-pixel-id',
  hotjarId: 'your-hotjar-id',
  mixpanelToken: 'your-mixpanel-token',
  amplitudeApiKey: 'your-amplitude-api-key'
};

// Event Categories
export const EVENT_CATEGORIES = {
  USER_ENGAGEMENT: 'user_engagement',
  POKEMON_INTERACTION: 'pokemon_interaction',
  SEARCH_BEHAVIOR: 'search_behavior',
  FAVORITES: 'favorites',
  PERFORMANCE: 'performance',
  ERROR: 'error',
  CONVERSION: 'conversion'
};

// Event Actions
export const EVENT_ACTIONS = {
  PAGE_VIEW: 'page_view',
  POKEMON_VIEW: 'pokemon_view',
  POKEMON_SEARCH: 'pokemon_search',
  POKEMON_FILTER: 'pokemon_filter',
  FAVORITE_ADD: 'favorite_add',
  FAVORITE_REMOVE: 'favorite_remove',
  ERROR_OCCURRED: 'error_occurred',
  PERFORMANCE_METRIC: 'performance_metric',
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page'
};

// Initialize Analytics
export const initializeAnalytics = () => {
  // Google Analytics 4
  if (ANALYTICS_CONFIG.googleAnalyticsId && ANALYTICS_CONFIG.googleAnalyticsId !== 'G-XXXXXXXXXX') {
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalyticsId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_CONFIG.googleAnalyticsId, {
      page_title: document.title,
      page_location: window.location.href
    });
  }

  // Google Tag Manager
  if (ANALYTICS_CONFIG.googleTagManagerId && ANALYTICS_CONFIG.googleTagManagerId !== 'GTM-XXXXXXX') {
    // Load GTM (typed)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    const firstScript = document.getElementsByTagName('script')[0] as HTMLScriptElement | undefined;
    const gtmScript = document.createElement('script');
    const dl = 'dataLayer' !== 'dataLayer' ? '&l=dataLayer' : '';
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${ANALYTICS_CONFIG.googleTagManagerId}${dl}`;
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(gtmScript, firstScript);
    } else {
      document.head.appendChild(gtmScript);
    }
  }

  // Facebook Pixel
  if (ANALYTICS_CONFIG.facebookPixelId && ANALYTICS_CONFIG.facebookPixelId !== 'your-facebook-pixel-id') {
    // Load Facebook Pixel (typed)
    if (!window.fbq) {
      const fbqFunc: any = function(this: any, ...args: any[]) {
        (fbqFunc.callMethod ? fbqFunc.callMethod : (fbqFunc.queue = fbqFunc.queue || [])).apply(fbqFunc, args);
      } as any;
      (fbqFunc as any).queue = [];
      (fbqFunc as any).loaded = true;
      (fbqFunc as any).version = '2.0';
      window.fbq = fbqFunc as (...args: any[]) => void;
      (window as any)._fbq = window.fbq;

      const t = document.createElement('script');
      t.async = true;
      t.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const s = document.getElementsByTagName('script')[0];
      s?.parentNode?.insertBefore(t, s);
    }
    window.fbq('init', ANALYTICS_CONFIG.facebookPixelId);
    window.fbq('track', 'PageView');
  }

  // Hotjar
  if (ANALYTICS_CONFIG.hotjarId && ANALYTICS_CONFIG.hotjarId !== 'your-hotjar-id') {
    if (!window.hj) {
      (window as any).hj = function(...args: any[]) {
        const hjAny = (window as any).hj as any;
        hjAny.q = hjAny.q || [];
        hjAny.q.push(args);
      };
    }
    window._hjSettings = { hjid: ANALYTICS_CONFIG.hotjarId as any, hjsv: 6 } as any;
    const hjScript = document.createElement('script');
    hjScript.async = true;
    hjScript.src = `https://static.hotjar.com/c/hotjar-${(window._hjSettings as any).hjid}.js?sv=${(window._hjSettings as any).hjsv}`;
    document.head.appendChild(hjScript);
  }
};

// Track Custom Events
export const trackEvent = (
  action: string,
  category: string = EVENT_CATEGORIES.USER_ENGAGEMENT,
  label?: string,
  value?: number,
  customParameters?: { [key: string]: any }
) => {
  const eventData = {
    event_category: category,
    event_label: label,
    value: value,
    page_location: window.location.href,
    page_title: document.title,
    timestamp: new Date().toISOString(),
    ...customParameters
  };

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', action, eventData);
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', action, eventData);
  }

  // Hotjar
  if (window.hj) {
    window.hj('event', action);
  }

  // Console for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', { action, ...eventData });
  }
};

// Track Pokémon Interactions
export const trackPokemonInteraction = (action: string, pokemonId: number, pokemonName: string) => {
  trackEvent(action, EVENT_CATEGORIES.POKEMON_INTERACTION, `${pokemonName} (ID: ${pokemonId})`, pokemonId);
};

// Track Search Behavior
export const trackSearchBehavior = (searchTerm: string, resultsCount: number, filterType?: string) => {
  trackEvent(
    EVENT_ACTIONS.POKEMON_SEARCH,
    EVENT_CATEGORIES.SEARCH_BEHAVIOR,
    searchTerm,
    resultsCount,
    { filter_type: filterType }
  );
};

// Track Favorites
export const trackFavoriteAction = (action: 'add' | 'remove', pokemonId: number, pokemonName: string) => {
  trackEvent(
    action === 'add' ? EVENT_ACTIONS.FAVORITE_ADD : EVENT_ACTIONS.FAVORITE_REMOVE,
    EVENT_CATEGORIES.FAVORITES,
    `${pokemonName} (ID: ${pokemonId})`,
    pokemonId
  );
};

// Track Performance Metrics
export const trackPerformanceMetric = (metricName: string, value: number) => {
  trackEvent(
    EVENT_ACTIONS.PERFORMANCE_METRIC,
    EVENT_CATEGORIES.PERFORMANCE,
    metricName,
    value
  );
};

// Track Errors
export const trackError = (errorMessage: string, errorStack?: string) => {
  trackEvent(
    EVENT_ACTIONS.ERROR_OCCURRED,
    EVENT_CATEGORIES.ERROR,
    errorMessage,
    undefined,
    { error_stack: errorStack }
  );
};

// Track Scroll Depth
export const trackScrollDepth = () => {
  let maxScrollDepth = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;
      
      // Track at 25%, 50%, 75%, 100%
      if ([25, 50, 75, 100].includes(scrollPercent)) {
        trackEvent(
          EVENT_ACTIONS.SCROLL_DEPTH,
          EVENT_CATEGORIES.USER_ENGAGEMENT,
          `${scrollPercent}%`,
          scrollPercent
        );
      }
    }
  });
};

// Track Time on Page
export const trackTimeOnPage = () => {
  const startTime = Date.now();
  
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackEvent(
      EVENT_ACTIONS.TIME_ON_PAGE,
      EVENT_CATEGORIES.USER_ENGAGEMENT,
      window.location.pathname,
      timeOnPage
    );
  });
};

// Track Button Clicks
export const trackButtonClick = (buttonText: string, buttonLocation: string) => {
  trackEvent(
    EVENT_ACTIONS.BUTTON_CLICK,
    EVENT_CATEGORIES.USER_ENGAGEMENT,
    buttonText,
    undefined,
    { button_location: buttonLocation }
  );
};

// Track Link Clicks
export const trackLinkClick = (linkText: string, linkUrl: string, linkLocation: string) => {
  trackEvent(
    EVENT_ACTIONS.LINK_CLICK,
    EVENT_CATEGORIES.USER_ENGAGEMENT,
    linkText,
    undefined,
    { link_url: linkUrl, link_location: linkLocation }
  );
};

// Enhanced Page View Tracking
export const trackPageView = (pageTitle?: string, pageUrl?: string) => {
  const title = pageTitle || document.title;
  const url = pageUrl || window.location.href;
  
  trackEvent(
    EVENT_ACTIONS.PAGE_VIEW,
    EVENT_CATEGORIES.USER_ENGAGEMENT,
    title,
    undefined,
    { page_url: url }
  );
};

// Conversion Tracking
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent(
    'conversion',
    EVENT_CATEGORIES.CONVERSION,
    conversionType,
    value
  );
};

// A/B Testing Support
export const trackExperiment = (experimentId: string, variant: string) => {
  trackEvent(
    'experiment_view',
    'experiment',
    experimentId,
    undefined,
    { variant }
  );
};

// User Properties
export const setUserProperties = (properties: { [key: string]: any }) => {
  if (window.gtag) {
    window.gtag('config', ANALYTICS_CONFIG.googleAnalyticsId, {
      custom_map: properties
    });
  }
};

// Declare global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
    hj: (...args: any[]) => void;
    _hjSettings: any;
  }
} 