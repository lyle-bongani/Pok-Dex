import pokemonData from '../pokemonData.json';

export const generateSitemap = () => {
  const baseUrl = 'https://pok-dex-iota.vercel.app';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    // Main pages
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/pokemon`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${baseUrl}/favorites`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    }
  ];

  // Add popular Pokémon pages
  const popularPokemon = [1, 25, 6, 658, 150, 151, 384, 382, 383, 4, 7, 9, 16, 19, 21, 23, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88, 90, 92, 95, 96, 98, 100];
  
  popularPokemon.forEach(id => {
    urls.push({
      loc: `${baseUrl}/pokemon/${id}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    });
  });

  return urls;
};

export const generateSitemapXML = () => {
  const urls = generateSitemap();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}; 