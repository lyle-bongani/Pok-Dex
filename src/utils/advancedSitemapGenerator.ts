import pokemonData from '../pokemonData.json';
import { SEO_CONFIG } from '../services/seoService';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  image?: {
    loc: string;
    title: string;
    caption: string;
  };
}

export class AdvancedSitemapGenerator {
  private baseUrl: string;
  private currentDate: string;

  constructor(baseUrl: string = SEO_CONFIG.baseUrl) {
    this.baseUrl = baseUrl;
    this.currentDate = new Date().toISOString().split('T')[0];
  }

  // Generate main pages sitemap
  private generateMainPages(): SitemapURL[] {
    return [
      {
        loc: `${this.baseUrl}/`,
        lastmod: this.currentDate,
        changefreq: 'weekly',
        priority: 1.0,
        image: {
          loc: `${this.baseUrl}/logo512.png`,
          title: 'PokéDex - Your Ultimate Pokémon Guide',
          caption: 'Comprehensive Pokémon database with detailed stats, types, and abilities'
        }
      },
      {
        loc: `${this.baseUrl}/pokemon`,
        lastmod: this.currentDate,
        changefreq: 'weekly',
        priority: 0.9,
        image: {
          loc: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
          title: 'Pokémon List',
          caption: 'Browse all Pokémon with search and filter capabilities'
        }
      },
      {
        loc: `${this.baseUrl}/favorites`,
        lastmod: this.currentDate,
        changefreq: 'daily',
        priority: 0.8,
        image: {
          loc: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
          title: 'My Favorite Pokémon',
          caption: 'Your personal collection of favorite Pokémon'
        }
      }
    ];
  }

  // Generate popular Pokémon pages
  private generatePopularPokemonPages(): SitemapURL[] {
    const popularPokemon = [
      1, 4, 7, 25, 6, 9, 150, 151, 658, 384, 382, 383,  // Starters, Legendaries, Popular
      16, 19, 21, 23, 27, 29, 32, 35, 37, 39, 41, 43,  // Early Route Pokémon
      46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72,  // More Common Pokémon
      74, 77, 79, 81, 83, 84, 86, 88, 90, 92, 95, 96,  // Additional Popular
      98, 100, 102, 104, 106, 107, 108, 109, 110, 111, 112, 113,  // More Variety
      114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125,  // Extended List
      126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137,  // More Pokémon
      138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149   // Legendaries and Rares
    ];

    return popularPokemon.map(id => {
      const pokemon = pokemonData.find(p => p.id === id);
      if (!pokemon) return null;

      return {
        loc: `${this.baseUrl}/pokemon/${id}`,
        lastmod: this.currentDate,
        changefreq: 'monthly',
        priority: this.getPokemonPriority(id, pokemon),
        image: {
          loc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          title: `${pokemon.name} - PokéDex`,
          caption: `${pokemon.name} is a ${pokemon.type.join('/')} type Pokémon with base stats totaling ${pokemon.total}`
        }
      };
    }).filter(Boolean) as SitemapURL[];
  }

  // Get priority based on Pokémon popularity
  private getPokemonPriority(id: number, pokemon: any): number {
    // Legendary Pokémon get higher priority
    if (id >= 144 && id <= 151) return 0.9;
    if (id >= 150 && id <= 151) return 0.95;
    if (id === 25) return 0.95; // Pikachu
    if (id === 6) return 0.9;   // Charizard
    if (id === 9) return 0.9;   // Blastoise
    if (id === 150) return 0.95; // Mewtwo
    if (id === 151) return 0.95; // Mew
    if (id === 658) return 0.9;  // Greninja
    if (id >= 382 && id <= 384) return 0.9; // Weather Trio
    
    // Starters get higher priority
    if ([1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728].includes(id)) {
      return 0.85;
    }
    
    // Default priority
    return 0.7;
  }

  // Generate sitemap XML
  public generateSitemapXML(): string {
    const urls = [...this.generateMainPages(), ...this.generatePopularPokemonPages()];
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.image ? `
    <image:image>
      <image:loc>${url.image.loc}</image:loc>
      <image:title>${url.image.title}</image:title>
      <image:caption>${url.image.caption}</image:caption>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`;

    return xml;
  }

  // Generate sitemap index for large sites
  public generateSitemapIndex(): string {
    const sitemaps = [
      {
        loc: `${this.baseUrl}/sitemap-main.xml`,
        lastmod: this.currentDate
      },
      {
        loc: `${this.baseUrl}/sitemap-pokemon.xml`,
        lastmod: this.currentDate
      }
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

    return xml;
  }

  // Generate robots.txt content
  public generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Disallow admin or private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /_next/

# Allow all Pokémon pages
Allow: /pokemon/
Allow: /favorites/

# Sitemap locations
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-main.xml
Sitemap: ${this.baseUrl}/sitemap-pokemon.xml

# Crawl delay (be respectful to servers)
Crawl-delay: 1

# Additional directives
Disallow: /*.json$
Disallow: /*.xml$
Allow: /sitemap.xml
Allow: /robots.txt

# Host directive
Host: ${this.baseUrl.replace(/^https?:\/\//, '')}`;
  }

  // Generate news sitemap (if applicable)
  public generateNewsSitemap(): string {
    const newsItems = [
      {
        title: 'New Pokémon Discovered in Latest Update',
        publication_name: 'PokéDex News',
        publication_language: 'en',
        publication_date: this.currentDate,
        genres: 'Pokemon, Gaming',
        keywords: 'Pokemon, new discovery, gaming news',
        stock_tickers: 'NINTENDO'
      }
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsItems.map(item => `  <url>
    <loc>${this.baseUrl}/news/latest-update</loc>
    <news:news>
      <news:publication>
        <news:name>${item.publication_name}</news:name>
        <news:language>${item.publication_language}</news:language>
      </news:publication>
      <news:publication_date>${item.publication_date}</news:publication_date>
      <news:title>${item.title}</news:title>
      <news:genres>${item.genres}</news:genres>
      <news:keywords>${item.keywords}</news:keywords>
      <news:stock_tickers>${item.stock_tickers}</news:stock_tickers>
    </news:news>
  </url>`).join('\n')}
</urlset>`;

    return xml;
  }

  // Generate video sitemap (if applicable)
  public generateVideoSitemap(): string {
    const videoItems = [
      {
        title: 'PokéDex Tutorial - How to Use the Complete Pokémon Database',
        description: 'Learn how to navigate and use all features of the PokéDex website',
        thumbnail_loc: `${this.baseUrl}/images/video-thumbnail.jpg`,
        content_loc: `${this.baseUrl}/videos/tutorial.mp4`,
        duration: 180,
        family_friendly: 'yes',
        category: 'Gaming',
        tags: ['Pokemon', 'Tutorial', 'Database', 'Guide']
      }
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoItems.map(item => `  <url>
    <loc>${this.baseUrl}/videos/tutorial</loc>
    <video:video>
      <video:thumbnail_loc>${item.thumbnail_loc}</video:thumbnail_loc>
      <video:title>${item.title}</video:title>
      <video:description>${item.description}</video:description>
      <video:content_loc>${item.content_loc}</video:content_loc>
      <video:duration>${item.duration}</video:duration>
      <video:family_friendly>${item.family_friendly}</video:family_friendly>
      <video:category>${item.category}</video:category>
      <video:tags>${item.tags.join(', ')}</video:tags>
    </video:video>
  </url>`).join('\n')}
</urlset>`;

    return xml;
  }
}

// Export singleton instance
export const sitemapGenerator = new AdvancedSitemapGenerator(); 