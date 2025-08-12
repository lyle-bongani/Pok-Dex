import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Search, Heart, ArrowUp } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useSearch } from '../contexts/SearchContext';
import { fetchAllPokemon } from '../services/pokemonService';
import { TYPE_COLORS } from '../constants/pokemonTypes';
import type { PokemonType } from '../types/pokemon';

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
  const [selectedType, setSelectedType] = useState<string>('');
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filterType, setFilterType] = useState<'type' | 'legendary'>('type');

  // Use SearchContext
  const { searchTerm, setSearchTerm, searchResults } = useSearch();

  useEffect(() => {
    // Update meta tags
    document.title = 'Pokémon List - Complete Pokédex Database';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Browse our complete collection of Pokémon. Search, filter, and learn about all Pokémon types, stats, and abilities.');
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', 
      'Pokémon list, Pokédex database, Pokémon types, Pokémon stats, Pokémon search');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'Pokémon List - Complete Pokédex Database');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', 
      'Browse our complete collection of Pokémon. Search, filter, and learn about all Pokémon types, stats, and abilities.');
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', 'website');
    document.querySelector('meta[name="twitter:card"]')?.setAttribute('content', 'summary_large_image');
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', 'Pokémon List - Complete Pokédex Database');
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', 
      'Browse our complete collection of Pokémon. Search, filter, and learn about all Pokémon types, stats, and abilities.');

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

  // Use context's searchResults if searching, otherwise all
  // Normalize searchResults to match the Pokemon interface (capitalize types, ensure isLegendary exists)
  const baseList: Pokemon[] = searchTerm
    ? searchResults.map((p: any) => ({
        ...p,
        type: p.type.map((t: string) =>
          (t.charAt(0).toUpperCase() + t.slice(1)) as PokemonType
        ),
        isLegendary: p.isLegendary ?? false,
      }))
    : pokemon;

  const filteredPokemon = baseList.filter(pokemon => {
    if (!pokemon) return false;
    const matchesType = selectedType === 'Legendary'
      ? pokemon.isLegendary
      : selectedType
        ? pokemon.type.includes(selectedType as PokemonType)
        : true;
    return matchesType;
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
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500">
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Search Section */}
        <div className="mb-8 mt-20 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 text-center pokemon-title">POKEMON LIST</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Pokémon..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-red-500/30 bg-white/90 
                focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent
                placeholder-red-400/50 text-red-700 font-medium shadow-lg shadow-red-500/10"
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {[
              { type: '', label: 'All Types' },
              { type: 'Grass', label: 'Grass' },
              { type: 'Poison', label: 'Poison' },
              { type: 'Fire', label: 'Fire' },
              { type: 'Flying', label: 'Flying' },
              { type: 'Water', label: 'Water' },
              { type: 'Bug', label: 'Bug' },
              { type: 'Normal', label: 'Normal' },
              { type: 'Electric', label: 'Electric' },
              { type: 'Ground', label: 'Ground' },
              { type: 'Fairy', label: 'Fairy' },
              { type: 'Fighting', label: 'Fighting' },
              { type: 'Psychic', label: 'Psychic' },
              { type: 'Rock', label: 'Rock' },
              { type: 'Steel', label: 'Steel' },
              { type: 'Ice', label: 'Ice' },
              { type: 'Ghost', label: 'Ghost' },
              { type: 'Dragon', label: 'Dragon' },
              { type: 'Dark', label: 'Dark' },
              { type: 'Legendary', label: 'Legendary' }
            ].map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-white font-medium transition-all
                  ${selectedType === type 
                    ? 'bg-yellow-400 text-red-700' 
                    : 'bg-white/10 hover:bg-white/20'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Pokemon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredPokemon.map((pokemon, index) => (
            <article
              key={pokemon.id}
              className="group relative transform transition-all duration-300 hover:scale-[1.02]"
              itemScope
              itemType="https://schema.org/Thing"
              itemProp="item"
            >
              <Link
                to={`/pokemon/${pokemon.id}`}
                className="block h-full"
                aria-label={`View details for ${pokemon.name}`}
              >
                <div className={`bg-gradient-to-b ${getTypeColor(pokemon.type[0])} to-transparent
                  backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 transition-all duration-300
                  hover:shadow-xl hover:shadow-white/10 h-full flex flex-col`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-repeat bg-center"
                      style={{
                        backgroundImage: `url("${BACKGROUND_PATTERN}")`,
                        backgroundSize: '40px 40px'
                      }}>
                    </div>
                  </div>

                  <div className="relative flex flex-col items-center flex-grow">
                    {/* Pokemon Image with Glow Effect */}
                    <div className="relative mb-4 sm:mb-6 lg:mb-8 w-full aspect-square max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]">
                      <div className={`absolute inset-0 ${TYPE_COLORS[pokemon.type[0]]} 
                        opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-all`}></div>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        alt={`${pokemon.name} artwork`}
                        className="w-full h-full object-contain drop-shadow-2xl
                          transform group-hover:scale-110 transition-all duration-300
                          group-hover:rotate-2"
                        loading="lazy"
                      />
                    </div>

                    {/* Pokemon Info */}
                    <div className="text-center space-y-4 w-full">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-yellow-300 
                          transition-colors truncate pr-2">
                          {pokemon.name}
                        </h3>
                        <span className="text-white/60 text-base sm:text-lg lg:text-xl whitespace-nowrap">
                          #{String(pokemon.id).padStart(3, '0')}
                        </span>
                      </div>

                      {/* Types */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {pokemon.type.map((type) => (
                          <span
                            key={type}
                            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white text-sm sm:text-base font-medium
                              ${TYPE_COLORS[type]} bg-opacity-80 transition-transform duration-300
                              group-hover:scale-110`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 text-sm sm:text-base">Total</span>
                          <span className="text-white font-bold text-lg sm:text-xl">{pokemon.total}</span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000
                              ${pokemon.total >= 600 ? 'bg-gradient-to-r from-yellow-400 to-yellow-300' : 'bg-yellow-400'}`}
                            style={{ width: `${getStatPercentage(pokemon.total) / 2}%` }}
                            role="progressbar"
                            aria-valuenow={pokemon.total}
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
                        toggleFavorite(pokemon.id);
                      }}
                      className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full transition-all transform hover:scale-110
                        ${isFavorite(pokemon.id)
                          ? 'bg-white/10 text-red-500'
                          : 'bg-white/5 text-white/50 hover:text-white'
                        }`}
                      aria-label={`${isFavorite(pokemon.id) ? 'Remove from' : 'Add to'} favorites`}
                    >
                      <Heart
                        size={20}
                        className="sm:w-6 sm:h-6"
                        fill={isFavorite(pokemon.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default PokemonList;