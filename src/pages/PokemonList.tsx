import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ArrowUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { fetchAllPokemon } from '../services/pokemonService';
import { useFavorites } from '../contexts/FavoritesContext';

// Add type definition for Pokemon types
type PokemonType =
  | 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice'
  | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic'
  | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';

// Type the TYPE_COLORS object
const TYPE_COLORS: Record<PokemonType, string> = {
  Normal: 'bg-gray-400',
  Fire: 'bg-red-500',
  Water: 'bg-blue-500',
  Electric: 'bg-yellow-400',
  Grass: 'bg-green-500',
  Ice: 'bg-blue-300',
  Fighting: 'bg-red-700',
  Poison: 'bg-purple-500',
  Ground: 'bg-yellow-600',
  Flying: 'bg-blue-400',
  Psychic: 'bg-pink-500',
  Bug: 'bg-green-600',
  Rock: 'bg-yellow-800',
  Ghost: 'bg-purple-700',
  Dragon: 'bg-indigo-600',
  Dark: 'bg-gray-800',
  Steel: 'bg-gray-500',
  Fairy: 'bg-pink-400',
};

// Add this type color mapping for the dropdown
const TYPE_BACKGROUNDS: Record<PokemonType, { bg: string; text: string }> = {
  Normal: { bg: 'bg-gray-400', text: 'text-gray-900' },
  Fire: { bg: 'bg-red-500', text: 'text-white' },
  Water: { bg: 'bg-blue-500', text: 'text-white' },
  Electric: { bg: 'bg-yellow-400', text: 'text-gray-900' },
  Grass: { bg: 'bg-green-500', text: 'text-white' },
  Ice: { bg: 'bg-blue-300', text: 'text-gray-900' },
  Fighting: { bg: 'bg-red-700', text: 'text-white' },
  Poison: { bg: 'bg-purple-500', text: 'text-white' },
  Ground: { bg: 'bg-yellow-600', text: 'text-white' },
  Flying: { bg: 'bg-blue-400', text: 'text-white' },
  Psychic: { bg: 'bg-pink-500', text: 'text-white' },
  Bug: { bg: 'bg-green-600', text: 'text-white' },
  Rock: { bg: 'bg-yellow-800', text: 'text-white' },
  Ghost: { bg: 'bg-purple-700', text: 'text-white' },
  Dragon: { bg: 'bg-indigo-600', text: 'text-white' },
  Dark: { bg: 'bg-gray-800', text: 'text-white' },
  Steel: { bg: 'bg-gray-500', text: 'text-white' },
  Fairy: { bg: 'bg-pink-400', text: 'text-white' }
};

// Add interface for Pokemon data
interface Pokemon {
  id: number;
  name: string;
  type: PokemonType[];
  total: number;
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
  isLegendary?: boolean;
}

// Add animation classes
const CARD_ANIMATIONS = [
  'hover:rotate-3 hover:scale-105',
  'hover:-rotate-3 hover:scale-105',
  'hover:translate-y-2 hover:scale-105',
  'hover:translate-x-2 hover:scale-105',
  'hover:-translate-x-2 hover:scale-105',
  'hover:translate-y-2 hover:rotate-2 hover:scale-105',
  'hover:-translate-y-2 hover:-rotate-2 hover:scale-105',
  'hover:translate-x-2 hover:rotate-2 hover:scale-105',
  'hover:-translate-x-2 hover:-rotate-2 hover:scale-105',
  'hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20'
];

// Add glow effects
const GLOW_EFFECTS = [
  'before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
  'before:absolute before:inset-0 before:bg-gradient-to-b before:from-yellow-400/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
  'before:absolute before:inset-0 before:bg-gradient-to-t before:from-yellow-400/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
  'before:absolute before:inset-0 before:bg-gradient-to-l before:from-yellow-400/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
  'before:absolute before:inset-0 before:bg-gradient-to-tr before:from-yellow-400/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300'
];

// Add hover effects
const HOVER_EFFECTS = [
  'hover:bg-white/20 hover:shadow-lg hover:shadow-black/20',
  'hover:bg-white/20 hover:shadow-lg hover:shadow-yellow-400/20',
  'hover:bg-white/20 hover:shadow-lg hover:shadow-red-500/20',
  'hover:bg-white/20 hover:shadow-lg hover:shadow-blue-500/20',
  'hover:bg-white/20 hover:shadow-lg hover:shadow-green-500/20'
];

// Add type-based background gradients
const TYPE_GRADIENTS: Record<PokemonType, string> = {
  Normal: 'from-gray-400/20 to-gray-600/20',
  Fire: 'from-red-500/20 to-orange-500/20',
  Water: 'from-blue-500/20 to-blue-600/20',
  Electric: 'from-yellow-400/20 to-yellow-500/20',
  Grass: 'from-green-500/20 to-green-600/20',
  Ice: 'from-blue-300/20 to-blue-400/20',
  Fighting: 'from-red-700/20 to-red-800/20',
  Poison: 'from-purple-500/20 to-purple-600/20',
  Ground: 'from-yellow-600/20 to-yellow-700/20',
  Flying: 'from-blue-400/20 to-blue-500/20',
  Psychic: 'from-pink-500/20 to-pink-600/20',
  Bug: 'from-green-600/20 to-green-700/20',
  Rock: 'from-yellow-800/20 to-yellow-900/20',
  Ghost: 'from-purple-700/20 to-purple-800/20',
  Dragon: 'from-indigo-600/20 to-indigo-700/20',
  Dark: 'from-gray-800/20 to-gray-900/20',
  Steel: 'from-gray-500/20 to-gray-600/20',
  Fairy: 'from-pink-400/20 to-pink-500/20'
};

// Add stat-based animations
const getStatAnimation = (total: number) => {
  if (total >= 600) return 'animate-pulse';
  if (total >= 500) return 'animate-bounce-slow';
  return 'animate-none';
};

// Add type-based hover effects
const getTypeHoverEffect = (type: PokemonType) => {
  const baseEffect = 'hover:scale-105 transition-all duration-300';
  switch (type) {
    case 'Fire':
      return `${baseEffect} hover:rotate-3 hover:shadow-lg hover:shadow-red-500/30`;
    case 'Water':
      return `${baseEffect} hover:-rotate-3 hover:shadow-lg hover:shadow-blue-500/30`;
    case 'Electric':
      return `${baseEffect} hover:translate-y-2 hover:shadow-lg hover:shadow-yellow-400/30`;
    case 'Grass':
      return `${baseEffect} hover:translate-x-2 hover:shadow-lg hover:shadow-green-500/30`;
    case 'Psychic':
      return `${baseEffect} hover:-translate-x-2 hover:shadow-lg hover:shadow-pink-500/30`;
    default:
      return `${baseEffect} hover:shadow-lg hover:shadow-white/20`;
  }
};

// Add background pattern SVG
const BACKGROUND_PATTERN = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E`;

const PokemonList: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filterType, setFilterType] = useState<'type' | 'legendary'>('type');

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllPokemon();
        // Transform the data to ensure proper typing
        const transformedData = data.map((p: any) => ({
          ...p,
          // Ensure type names are properly capitalized
          type: p.type.map((t: string) =>
            t.charAt(0).toUpperCase() + t.slice(1) as PokemonType
          )
        }));
        setPokemon(transformedData);
      } catch (err) {
        setError('Failed to load Pokémon');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemon();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="text-white text-2xl">Loading Pokémon...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="text-white text-2xl">{error}</div>
      </div>
    );
  }

  const filteredPokemon = pokemon.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedType === 'Legendary') {
      return matchesSearch && pokemon.isLegendary;
    }

    const matchesType = selectedType ? pokemon.type.includes(selectedType as PokemonType) : true;
    return matchesSearch && matchesType;
  });

  const allTypes = Array.from(new Set(pokemon.flatMap(pokemon => pokemon.type)));

  // Function to get sprite URL
  const getPokemonSprite = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  // Function to calculate stat percentage for progress bars
  const getStatPercentage = (stat: number) => {
    const maxStat = 255; // Maximum possible stat value in Pokémon
    return Math.min((stat / maxStat) * 100, 100);
  };

  // Add the helper function for background colors
  const getTypeColor = (type: PokemonType): string => {
    const colors = {
      Normal: 'from-gray-400',
      Fire: 'from-red-500',
      Water: 'from-blue-500',
      Electric: 'from-yellow-400',
      Grass: 'from-green-500',
      Ice: 'from-blue-300',
      Fighting: 'from-red-700',
      Poison: 'from-purple-500',
      Ground: 'from-yellow-600',
      Flying: 'from-blue-400',
      Psychic: 'from-pink-500',
      Bug: 'from-green-600',
      Rock: 'from-yellow-800',
      Ghost: 'from-purple-700',
      Dragon: 'from-indigo-600',
      Dark: 'from-gray-800',
      Steel: 'from-gray-500',
      Fairy: 'from-pink-400',
    };
    return colors[type] || 'from-gray-500';
  };

  // Create structured data for the Pokémon list
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Complete Pokémon Database",
    "description": "A comprehensive database of all Pokémon with detailed stats, types, and abilities.",
    "numberOfItems": pokemon.length,
    "itemListElement": pokemon.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Thing",
        "name": p.name,
        "description": `${p.name} is a ${p.type.join('/')} type Pokémon with base stats totaling ${p.total}.`,
        "image": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
        "identifier": `pokemon-${p.id}`,
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Total Stats",
            "value": p.total
          },
          {
            "@type": "PropertyValue",
            "name": "Types",
            "value": p.type.join(', ')
          },
          {
            "@type": "PropertyValue",
            "name": "HP",
            "value": p.hp
          },
          {
            "@type": "PropertyValue",
            "name": "Attack",
            "value": p.attack
          },
          {
            "@type": "PropertyValue",
            "name": "Defense",
            "value": p.defense
          },
          {
            "@type": "PropertyValue",
            "name": "Special Attack",
            "value": p.sp_atk
          },
          {
            "@type": "PropertyValue",
            "name": "Special Defense",
            "value": p.sp_def
          },
          {
            "@type": "PropertyValue",
            "name": "Speed",
            "value": p.speed
          }
        ]
      }
    }))
  };

  // Create website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PokéDex",
    "url": window.location.origin,
    "description": "Your Ultimate Pokémon Guide - Complete Pokédex with detailed stats, types, and abilities.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/pokemon?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <title>PokéDex - Complete Pokémon Database | Stats, Types & Abilities</title>
        <meta name="description" content="Explore our comprehensive Pokémon database featuring all 151 original Pokémon with detailed stats, types, and abilities. Search, filter, and discover your favorite Pokémon." />
        <meta name="keywords" content="Pokemon database, Pokedex, Pokemon stats, Pokemon types, Pokemon abilities, Pokemon guide, Pokemon list, Pokemon search" />
        <meta name="author" content="PokéDex" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="PokéDex - Complete Pokémon Database | Stats, Types & Abilities" />
        <meta property="og:description" content="Explore our comprehensive Pokémon database featuring all 151 original Pokémon with detailed stats, types, and abilities. Search, filter, and discover your favorite Pokémon." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="%PUBLIC_URL%/og-image.jpg" />
        <meta property="og:site_name" content="PokéDex" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PokéDex - Complete Pokémon Database | Stats, Types & Abilities" />
        <meta name="twitter:description" content="Explore our comprehensive Pokémon database featuring all 151 original Pokémon with detailed stats, types, and abilities. Search, filter, and discover your favorite Pokémon." />
        <meta name="twitter:image" content="%PUBLIC_URL%/og-image.jpg" />
        <meta name="twitter:creator" content="@pokedex" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#EF4444" />
        <link rel="canonical" href={window.location.href} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500 p-4">
        <div className="container mx-auto max-w-7xl">
          <main className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6">
            <header>
              <h1 className="text-4xl font-bold mb-6 text-white pokemon-title">PokéDex Database</h1>
              <p className="text-white/90 text-lg mb-6">
                Explore our comprehensive collection of Pokémon with detailed stats, types, and abilities.
                Search, filter, and discover your favorite Pokémon.
              </p>
            </header>

            <section aria-label="Search and Filter Controls" className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <label htmlFor="pokemon-search" className="sr-only">Search Pokémon by name</label>
                <input
                  id="pokemon-search"
                  type="search"
                  placeholder="Search Pokémon by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70
                    focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:bg-white/30"
                  aria-label="Search Pokémon"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" aria-hidden="true" />
              </div>

              <div className="relative">
                <label htmlFor="type-filter" className="sr-only">Filter Pokémon by type</label>
                <select
                  id="type-filter"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full sm:w-[180px] pl-4 pr-10 py-3 rounded-xl 
                    bg-gradient-to-b from-red-600 to-red-700 text-white 
                    border-2 border-yellow-400/50 
                    focus:outline-none focus:border-yellow-400 focus:ring-2 
                    focus:ring-yellow-400/50 focus:ring-offset-2 focus:ring-offset-red-700
                    shadow-lg shadow-red-900/20
                    appearance-none cursor-pointer font-medium"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                  aria-label="Filter Pokémon by type"
                >
                  <option value="" className="font-medium bg-gray-800 text-white">
                    All Types
                  </option>
                  {allTypes.map(type => (
                    <option
                      key={type}
                      value={type}
                      className={`font-medium ${TYPE_BACKGROUNDS[type as PokemonType].bg} 
                        ${TYPE_BACKGROUNDS[type as PokemonType].text}`}
                    >
                      {type}
                    </option>
                  ))}
                  <option
                    value="Legendary"
                    className="font-medium bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                  >
                    ⭐ Legendary
                  </option>
                </select>

                {/* Pokéball-inspired dropdown arrow */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                  <div className="w-6 h-6 relative">
                    <div className="absolute inset-0 bg-white rounded-full opacity-80"></div>
                    <div className="absolute top-[45%] left-0 right-0 h-[2px] bg-black/80"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-2 h-2 rounded-full bg-black/80 border-2 border-white"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legendary Filter Banner */}
            {selectedType === 'Legendary' && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 
                border border-yellow-400/30 backdrop-blur-sm" role="alert">
                <div className="flex items-center gap-2 text-yellow-300">
                  <span className="text-2xl" aria-hidden="true">⭐</span>
                  <span className="font-medium">Showing Legendary Pokémon</span>
                </div>
              </div>
            )}

            {/* Pokemon Grid */}
            <section aria-label="Pokemon List" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPokemon.map((p) => (
                <article
                  key={p.id}
                  className="group relative"
                  itemScope
                  itemType="https://schema.org/Thing"
                  itemProp="item"
                >
                  <Link
                    to={`/pokemon/${p.id}`}
                    className="block"
                    aria-label={`View details for ${p.name}`}
                  >
                    <div className={`bg-gradient-to-b ${getTypeColor(p.type[0])} to-transparent
                      backdrop-blur-md rounded-xl p-8 transition-all duration-300 transform 
                      hover:scale-105 relative overflow-hidden hover:shadow-xl hover:shadow-white/10`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-repeat bg-center"
                          style={{
                            backgroundImage: `url("${BACKGROUND_PATTERN}")`,
                            backgroundSize: '40px 40px'
                          }}>
                        </div>
                      </div>

                      <div className="relative flex flex-col items-center">
                        {/* Pokemon Image with Glow Effect */}
                        <div className="relative mb-8">
                          <div className={`absolute inset-0 ${TYPE_COLORS[p.type[0]]} 
                            opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-all`}></div>
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                            alt={`${p.name} artwork`}
                            className="w-64 h-64 object-contain drop-shadow-2xl
                              transform group-hover:scale-110 transition-all duration-300
                              group-hover:rotate-2"
                            loading="lazy"
                          />
                        </div>

                        {/* Pokemon Info */}
                        <div className="text-center space-y-6 w-full">
                          <div className="flex items-center justify-between w-full">
                            <h3 className="text-3xl font-bold text-white group-hover:text-yellow-300 
                              transition-colors">
                              {p.name}
                            </h3>
                            <span className="text-white/60 text-xl">#{String(p.id).padStart(3, '0')}</span>
                          </div>

                          {/* Types */}
                          <div className="flex gap-3 justify-center">
                            {p.type.map((type) => (
                              <span
                                key={type}
                                className={`px-4 py-2 rounded-full text-white text-base font-medium
                                  ${TYPE_COLORS[type]} bg-opacity-80 transition-transform duration-300
                                  group-hover:scale-110`}
                              >
                                {type}
                              </span>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="space-y-3 w-full">
                            <div className="flex justify-between items-center">
                              <span className="text-white/80 text-base">Total</span>
                              <span className="text-white font-bold text-xl">{p.total}</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-1000
                                  ${p.total >= 600 ? 'bg-gradient-to-r from-yellow-400 to-yellow-300' : 'bg-yellow-400'}`}
                                style={{ width: `${getStatPercentage(p.total) / 2}%` }}
                                role="progressbar"
                                aria-valuenow={p.total}
                                aria-valuemin={0}
                                aria-valuemax={510}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(p.id);
                          }}
                          className={`absolute top-6 right-6 p-3 rounded-full transition-all transform hover:scale-110
                            ${isFavorite(p.id)
                              ? 'bg-white/10 text-red-500'
                              : 'bg-white/5 text-white/50 hover:text-white'
                            }`}
                          aria-label={`${isFavorite(p.id) ? 'Remove from' : 'Add to'} favorites`}
                        >
                          <Heart
                            size={24}
                            fill={isFavorite(p.id) ? "currentColor" : "none"}
                          />
                        </button>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </section>

            {/* Back to Top Button */}
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-yellow-400 text-red-700 p-3 rounded-full
                  shadow-lg hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2
                  focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-red-700"
                aria-label="Scroll to top of page"
              >
                <ArrowUp size={24} aria-hidden="true" />
              </button>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default PokemonList;