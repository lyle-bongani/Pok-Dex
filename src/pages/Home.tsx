import React, { useEffect, useState } from 'react';
import { Search, Info, ChevronRight, Github, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchAllPokemon } from '../services/pokemonService';
import { TYPE_COLORS } from '../constants/pokemonTypes';
import type { PokemonType } from '../types/pokemon';
import { useFavorites } from '../contexts/FavoritesContext';

const PIKACHU_IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
// Backup image URLs if needed:
// "https://assets.pokemon.com/assets/cms2/img/watch-pokemon-tv/seasons/season01/season01_ep01_ss01.jpg"
// "https://assets.pokemon.com/assets/cms2/img/watch-pokemon-tv/seasons/season24/season24_ep75_ss01.jpg"

// Add this helper function to get background color based on type
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

const Home: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemon = await fetchAllPokemon();
      if (pokemon.length > 0) {
        setAllPokemon(pokemon);
      }
      setIsLoading(false);
    };

    loadPokemon();
  }, []);

  const getRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * allPokemon.length);
    return allPokemon[randomIndex];
  };

  const featuredPokemon = Array(3).fill(null).map(() => getRandomPokemon());

  // Create structured data for the home page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PokéDex",
    "description": "Your ultimate guide to the world of Pokémon. Explore detailed information about all Pokémon, their types, abilities, and more.",
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/pokemon?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Create organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PokéDex",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo192.png`,
    "sameAs": [
      "https://github.com/yourusername/pokedex",
      "https://twitter.com/pokedex"
    ],
    "description": "Your ultimate guide to the world of Pokémon. Explore detailed information about all Pokémon, their types, abilities, and more."
  };

  return (
    <>
      <Helmet>
        <title>PokéDex - Your Ultimate Pokémon Guide | Explore the World of Pokémon</title>
        <meta name="description" content="Your ultimate guide to the world of Pokémon. Explore detailed information about all 151 original Pokémon, their types, abilities, and more. Start your Pokémon journey today!" />
        <meta name="keywords" content="Pokemon guide, Pokedex, Pokemon database, Pokemon types, Pokemon abilities, Pokemon stats, Pokemon search, Pokemon list" />
        <meta name="author" content="Lyle Bongani" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="PokéDex - Your Ultimate Pokémon Guide | Explore the World of Pokémon" />
        <meta property="og:description" content="Your ultimate guide to the world of Pokémon. Explore detailed information about all 151 original Pokémon, their types, abilities, and more. Start your Pokémon journey today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="%PUBLIC_URL%/og-image.jpg" />
        <meta property="og:site_name" content="PokéDex" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PokéDex - Your Ultimate Pokémon Guide | Explore the World of Pokémon" />
        <meta name="twitter:description" content="Your ultimate guide to the world of Pokémon. Explore detailed information about all 151 original Pokémon, their types, abilities, and more. Start your Pokémon journey today!" />
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
          {JSON.stringify({
            ...organizationStructuredData,
            sameAs: [
              "https://github.com/lyle-bongani",
              "https://twitter.com/pokedex"
            ],
            creator: {
              "@type": "Person",
              "name": "Lyle Bongani",
              "url": "https://github.com/lyle-bongani"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen" aria-label="Hero">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-repeat bg-center animate-pattern"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}>
            </div>
          </div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-red-500/40 animate-gradient"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col lg:flex-row items-center min-h-screen py-16">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left relative z-10">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <h1 className="text-6xl md:text-8xl font-bold text-yellow-300 drop-shadow-lg tracking-wider pokemon-title mb-6 
                  animate-title relative">
                  PokéDex
                </h1>
                <p className="text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-fade-in">
                  "I want to be the very best, like no one ever was!" Explore detailed information
                  about all Pokémon, their types, abilities, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up">
                  <Link
                    to="/pokemon"
                    className="flex items-center justify-center gap-2 px-8 py-4 
                      bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-xl 
                      font-bold transition-all transform hover:scale-105 shadow-lg group
                      hover:shadow-yellow-300/50"
                    aria-label="Start exploring Pokémon database"
                  >
                    Start Exploring
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                  <button
                    className="flex items-center justify-center gap-2 px-8 py-4 
                      bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold 
                      transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm
                      hover:shadow-white/20"
                    aria-label="Learn more about PokéDex"
                  >
                    <Info className="w-6 h-6" aria-hidden="true" />
                    Learn More
                  </button>
                </div>

                {/* Social Links */}
                <div className="mt-12 flex gap-4 justify-center lg:justify-start animate-fade-in-up delay-200">
                  <a href="https://github.com/lyle-bongani" target="_blank" rel="noopener noreferrer" 
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all transform hover:scale-110
                      group relative"
                    aria-label="Visit Lyle's GitHub profile">
                    <Github className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded
                      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Lyle's GitHub
                    </span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all transform hover:scale-110
                      group relative"
                    aria-label="Follow us on Twitter">
                    <Twitter className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded
                      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Follow on Twitter
                    </span>
                  </a>
                  <a href="mailto:contact@pokedex.com" 
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all transform hover:scale-110
                      group relative"
                    aria-label="Contact us via email">
                    <Mail className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded
                      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Contact Us
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Content - Pikachu */}
              <div className="flex-1 relative h-screen lg:h-[90vh]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Pikachu with Enhanced Effects */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
                        <img
                          src={PIKACHU_IMAGE}
                          alt="Pikachu - The iconic Electric-type Pokémon"
                          className="w-2/3 h-auto drop-shadow-2xl 
                            transform hover:scale-110 transition-transform duration-300
                            animate-bounce-slow relative z-10"
                          loading="eager"
                        />
                      </div>
                    </div>

                    {/* Enhanced Pokeball Animation */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-xl animate-pulse"></div>
                        <div className="animate-spin-slow w-[80vh] h-[80vh]">
                          <svg viewBox="0 0 100 100" className="w-full h-full opacity-10" aria-hidden="true">
                            <circle cx="50" cy="50" r="45" fill="white" />
                            <path d="M5 50h90" stroke="white" strokeWidth="10" />
                            <circle cx="50" cy="50" r="15" fill="white" stroke="white" strokeWidth="10" />
                            <circle cx="50" cy="50" r="8" fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-yellow-300/30 rounded-full animate-float"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 5}s`,
                            transform: `scale(${0.5 + Math.random() * 0.5})`
                          }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Pokemon Section */}
        <section className="container mx-auto px-4 py-16" aria-label="Featured Pokémon">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 pokemon-title">
              Featured Pokémon
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Discover some of the amazing Pokémon you can learn about in our comprehensive database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPokemon.map((pokemon, index) => (
              <article
                key={`${pokemon?.id}-${index}`}
                className="group relative"
                itemScope
                itemType="https://schema.org/Thing"
                itemProp="item"
              >
                <Link
                  to={`/pokemon/${pokemon?.id}`}
                  state={{ from: 'home', pokemon }}
                  className="block"
                  aria-label={`View details for ${pokemon?.name}`}
                >
                  <div className={`bg-gradient-to-b ${getTypeColor(pokemon?.type[0] as PokemonType)} to-transparent
                    backdrop-blur-md rounded-xl p-8 transition-all duration-300 transform 
                    hover:scale-105 relative overflow-hidden hover:shadow-xl hover:shadow-white/10`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-repeat bg-center"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                          backgroundSize: '40px 40px'
                        }}>
                      </div>
                    </div>

                    <div className="relative flex flex-col items-center">
                      {/* Pokemon Image with Glow Effect */}
                      <div className="relative mb-8">
                        <div className={`absolute inset-0 ${TYPE_COLORS[pokemon?.type[0] as PokemonType]} 
                          opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-all`}></div>
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                          alt={`${pokemon?.name} artwork`}
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
                            {pokemon?.name}
                          </h3>
                          <span className="text-white/60 text-xl">#{String(pokemon?.id).padStart(3, '0')}</span>
                        </div>

                        {/* Types */}
                        <div className="flex gap-3 justify-center">
                          {pokemon?.type.map((type: PokemonType) => (
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
                            <span className="text-white font-bold text-xl">{pokemon?.total}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-1000
                                ${pokemon?.total >= 600 ? 'bg-gradient-to-r from-yellow-400 to-yellow-300' : 'bg-yellow-400'}`}
                              style={{ width: `${(pokemon?.total / 510) * 100 / 2}%` }}
                              role="progressbar"
                              aria-valuenow={pokemon?.total}
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
                          toggleFavorite(pokemon?.id);
                        }}
                        className={`absolute top-6 right-6 p-3 rounded-full transition-all transform hover:scale-110
                          ${isFavorite(pokemon?.id)
                            ? 'bg-white/10 text-red-500'
                            : 'bg-white/5 text-white/50 hover:text-white'
                          }`}
                        aria-label={`${isFavorite(pokemon?.id) ? 'Remove from' : 'Add to'} favorites`}
                      >
                        <Heart
                          size={24}
                          fill={isFavorite(pokemon?.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Add Footer Section */}
        <footer className="relative py-8 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-white/80 text-sm">
                © {new Date().getFullYear()} PokéDex. All rights reserved.
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span>Created with ❤️ by</span>
                <a 
                  href="https://github.com/lyle-bongani" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-300 hover:text-yellow-200 transition-colors font-medium"
                >
                  Lyle Bongani
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;