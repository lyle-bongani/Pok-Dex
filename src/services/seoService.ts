import pokemonData from '../pokemonData.json';

// Advanced SEO Configuration
export const SEO_CONFIG = {
  siteName: 'PokéDex',
  baseUrl: 'https://pok-dex-iota.vercel.app',
  defaultTitle: 'PokéDex - Your Ultimate Pokémon Guide',
  defaultDescription: 'Explore the world of Pokémon with our comprehensive Pokédex. View detailed information about all 1000+ Pokémon, including stats, abilities, evolution chains, types, and more.',
  defaultKeywords: 'Pokemon, Pokedex, Pokemon stats, Pokemon evolution, Pokemon abilities, Pokemon database, Pokemon guide, Pokemon types, Pokemon moves, Pokemon games, Pokemon list, Pokemon search, Pokemon favorites, Pokemon database, Pokemon encyclopedia',
  defaultImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  twitterHandle: '@lyle-bongani',
  facebookAppId: 'your-facebook-app-id',
  googleAnalyticsId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
  googleTagManagerId: 'GTM-XXXXXXX', // Replace with your GTM ID
  bingWebmasterTools: 'your-bing-verification-code',
  yandexWebmasterTools: 'your-yandex-verification-code',
  baiduWebmasterTools: 'your-baidu-verification-code',
  naverWebmasterTools: 'your-naver-verification-code'
};

// Performance Monitoring
export const PERFORMANCE_METRICS = {
  LCP_THRESHOLD: 2500, // Largest Contentful Paint
  FID_THRESHOLD: 100,  // First Input Delay
  CLS_THRESHOLD: 0.1,  // Cumulative Layout Shift
  TTFB_THRESHOLD: 800, // Time to First Byte
  TTI_THRESHOLD: 3800  // Time to Interactive
};

// Advanced Structured Data Types
export const STRUCTURED_DATA_TYPES = {
  WEBSITE: 'WebSite',
  ORGANIZATION: 'Organization',
  POKEMON: 'Thing',
  POKEMON_LIST: 'ItemList',
  BREADCRUMB: 'BreadcrumbList',
  FAQ: 'FAQPage',
  HOW_TO: 'HowTo',
  ARTICLE: 'Article',
  VIDEO: 'VideoObject',
  AUDIO: 'AudioObject'
};

// Generate comprehensive structured data for Pokémon
export const generatePokemonStructuredData = (pokemon: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": pokemon.name,
    "description": `${pokemon.name} is a ${pokemon.type.join('/')} type Pokémon with base stats totaling ${pokemon.total}.`,
    "image": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    "identifier": `pokemon-${pokemon.id}`,
    "url": `https://pok-dex-iota.vercel.app/pokemon/${pokemon.id}`,
    "sameAs": [
      `https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}`,
      `https://pokemondb.net/pokedex/${pokemon.name.toLowerCase()}`
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Pokémon ID",
        "value": pokemon.id
      },
      {
        "@type": "PropertyValue",
        "name": "Total Stats",
        "value": pokemon.total
      },
      {
        "@type": "PropertyValue",
        "name": "Types",
        "value": pokemon.type.join(', ')
      },
      {
        "@type": "PropertyValue",
        "name": "HP",
        "value": pokemon.hp
      },
      {
        "@type": "PropertyValue",
        "name": "Attack",
        "value": pokemon.attack
      },
      {
        "@type": "PropertyValue",
        "name": "Defense",
        "value": pokemon.defense
      },
      {
        "@type": "PropertyValue",
        "name": "Special Attack",
        "value": pokemon.sp_atk
      },
      {
        "@type": "PropertyValue",
        "name": "Special Defense",
        "value": pokemon.sp_def
      },
      {
        "@type": "PropertyValue",
        "name": "Speed",
        "value": pokemon.speed
      }
    ],
    "category": "Pokémon",
    "genre": pokemon.type,
    "audience": {
      "@type": "Audience",
      "audienceType": "Pokémon fans and gamers"
    }
  };
};

// Generate FAQ structured data
export const generateFAQStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many Pokémon are in the PokéDex?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our PokéDex contains information about over 1000 Pokémon from all generations, including detailed stats, types, abilities, and evolution chains."
        }
      },
      {
        "@type": "Question",
        "name": "Can I search for Pokémon by type?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can filter Pokémon by type using our advanced search and filter system. We support all 18 Pokémon types including Fire, Water, Grass, Electric, and more."
        }
      },
      {
        "@type": "Question",
        "name": "How do I add Pokémon to my favorites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply click the heart icon on any Pokémon card or detail page to add it to your favorites. Your favorites are saved locally and persist between sessions."
        }
      },
      {
        "@type": "Question",
        "name": "Is the PokéDex mobile-friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our PokéDex is fully responsive and optimized for all devices including smartphones, tablets, and desktop computers."
        }
      },
      {
        "@type": "Question",
        "name": "Where does the Pokémon data come from?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Pokémon data is sourced from the official PokéAPI, ensuring accurate and up-to-date information about all Pokémon species."
        }
      }
    ]
  };
};

// Generate Breadcrumb structured data
export const generateBreadcrumbStructuredData = (path: string, title: string) => {
  const baseUrl = SEO_CONFIG.baseUrl;
  const pathSegments = path.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${baseUrl}/`
    }
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": segment.charAt(0).toUpperCase() + segment.slice(1),
      "item": `${baseUrl}${currentPath}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };
};

// Performance monitoring
export const trackPerformanceMetrics = () => {
  if ('PerformanceObserver' in window) {
    // Track Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('Performance Metric:', entry.name, entry.value);
        
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'performance_metric', {
            metric_name: entry.name,
            metric_value: entry.value,
            page_location: window.location.href
          });
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }
};

// Advanced analytics tracking
export const trackUserEngagement = (action: string, label?: string, value?: number) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: 'user_engagement',
      event_label: label,
      value: value,
      page_location: window.location.href,
      page_title: document.title
    });
  }
};

// SEO-friendly URL generation
export const generateSEOFriendlyURL = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Meta tag optimization
export const generateMetaTags = (pageData: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}) => {
  const {
    title = SEO_CONFIG.defaultTitle,
    description = SEO_CONFIG.defaultDescription,
    keywords = SEO_CONFIG.defaultKeywords,
    image = SEO_CONFIG.defaultImage,
    url = SEO_CONFIG.baseUrl,
    type = 'website',
    author = 'Lyle Bongani',
    publishedTime,
    modifiedTime,
    section,
    tags = []
  } = pageData;

  return {
    // Basic Meta Tags
    title,
    description,
    keywords,
    author,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googlebot: 'index, follow',
    bingbot: 'index, follow',
    
    // Open Graph
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': type,
    'og:site_name': SEO_CONFIG.siteName,
    'og:locale': 'en_US',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': title,
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:creator': SEO_CONFIG.twitterHandle,
    'twitter:site': SEO_CONFIG.twitterHandle,
    
    // Article specific
    ...(publishedTime && { 'article:published_time': publishedTime }),
    ...(modifiedTime && { 'article:modified_time': modifiedTime }),
    ...(author && { 'article:author': author }),
    ...(section && { 'article:section': section }),
    ...(tags.length > 0 && { 'article:tag': tags.join(', ') }),
    
    // Additional SEO
    'geo.region': 'US',
    'geo.placename': 'Worldwide',
    language: 'English',
    'revisit-after': '7 days',
    distribution: 'global',
    rating: 'general',
    'format-detection': 'telephone=no',
    
    // PWA
    'theme-color': '#dc2626',
    'msapplication-TileColor': '#dc2626',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SEO_CONFIG.siteName,
    'application-name': SEO_CONFIG.siteName,
    'mobile-web-app-capable': 'yes',
    'msapplication-tap-highlight': 'no'
  };
};

// Declare global types for analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
} 