import React, { useEffect, useState } from 'react';
import { Search, Info, ChevronRight, Github, Twitter, Mail, Heart, BookOpen, Tag, Globe, Star, Zap, Sparkles, Crown, Users, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAllPokemon } from '../services/pokemonService';
import { TYPE_COLORS } from '../constants/pokemonTypes';
import type { PokemonType } from '../types/pokemon';
import { useFavorites } from '../contexts/FavoritesContext';

const PIKACHU_IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
const GRENINJA_IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png";
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
    // Update meta tags
    document.title = 'PokéDex - Your Ultimate Pokémon Guide';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Explore the world of Pokémon with our comprehensive Pokédex. Find detailed information about all Pokémon, their types, abilities, and more.');
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', 
      'Pokédex, Pokémon, Pikachu, Pokéball, Pokémon types, Pokémon abilities, Pokémon stats');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'PokéDex - Your Ultimate Pokémon Guide');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', 
      'Explore the world of Pokémon with our comprehensive Pokédex. Find detailed information about all Pokémon, their types, abilities, and more.');
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', 
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', 'website');
    document.querySelector('meta[name="twitter:card"]')?.setAttribute('content', 'summary_large_image');
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', 'PokéDex - Your Ultimate Pokémon Guide');
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', 
      'Explore the world of Pokémon with our comprehensive Pokédex. Find detailed information about all Pokémon, their types, abilities, and more.');
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', 
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');

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

  return (
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
          <div className="flex flex-col lg:flex-row items-center min-h-screen py-8 lg:py-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left relative z-10">
              {/* Decorative Elements */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-yellow-300 drop-shadow-lg tracking-wider pokemon-title mb-4 lg:mb-6 
                animate-title relative">
                PokéDex
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in">
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
            <div className="flex-1 relative h-[50vh] lg:h-[90vh] mt-8 lg:mt-0">
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
                        className="w-full lg:w-2/3 h-auto drop-shadow-2xl 
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

      {/* About Section - Moved after Hero */}
      <section className="py-8 lg:py-12 pb-16 lg:pb-32 bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 backdrop-blur-sm relative overflow-hidden">
        {/* Animated Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat bg-center animate-pattern"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}>
          </div>
        </div>

        {/* Yellow Ripple Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/10 to-transparent opacity-30 animate-ripple"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.1),transparent_50%)] animate-pulse"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-yellow-300/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                transform: `scale(${0.5 + Math.random() * 0.5})`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 lg:mb-16 text-center pokemon-title pt-32 lg:pt-0">About PokéDex</h2>
          <div className="relative h-[60vh] lg:h-[50vh] flex items-center justify-center">
            {/* Center - Greninja (Sun) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative w-32 h-32 lg:w-64 lg:h-64">
                <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
                <img
                  src={GRENINJA_IMAGE}
                  alt="Greninja"
                  className="w-full h-full object-contain drop-shadow-2xl animate-bounce-slow"
                />
                {/* Yellow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/10 to-transparent opacity-50"></div>
                {/* Ninja Stars Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
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
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Orbital Layout for Features */}
            <div className="relative w-[90vw] lg:w-[calc(50vh+30rem)] h-[60vh] lg:h-[50vh] animate-spin-very-slow">
              {/* Orbital Path */}
              <div className="absolute inset-0 border-2 border-yellow-300/20 rounded-full animate-pulse"></div>
              
              {/* Feature Cards (Planets) */}
              <div className="absolute inset-0 animate-orbit-very-slow">
                {/* Top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 transform -translate-y-1/2">
                  <div className="flex items-center gap-3 bg-white/30 backdrop-blur-md rounded-xl p-3 lg:p-4 hover:scale-110 transition-transform shadow-xl w-[160px] lg:w-[300px]">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-300/20 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xs lg:text-base">Comprehensive Database</h3>
                      <p className="text-white/90 text-[10px] lg:text-sm">Access detailed information about all Pokémon species</p>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-1/2">
                  <div className="flex items-center gap-3 bg-white/30 backdrop-blur-md rounded-xl p-3 lg:p-4 hover:scale-110 transition-transform shadow-xl w-[160px] lg:w-[300px]">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-300/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xs lg:text-base">Community Driven</h3>
                      <p className="text-white/90 text-[10px] lg:text-sm">Join a community of Pokémon enthusiasts</p>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-1/2">
                  <div className="flex items-center gap-3 bg-white/30 backdrop-blur-md rounded-xl p-3 lg:p-4 hover:scale-110 transition-transform shadow-xl w-[160px] lg:w-[300px]">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-300/20 rounded-full flex items-center justify-center">
                      <Tag className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xs lg:text-base">Regular Updates</h3>
                      <p className="text-white/90 text-[10px] lg:text-sm">Stay updated with the latest Pokémon information</p>
                    </div>
                  </div>
                </div>

                {/* Left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-3 bg-white/30 backdrop-blur-md rounded-xl p-3 lg:p-4 hover:scale-110 transition-transform shadow-xl w-[160px] lg:w-[300px]">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-300/20 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xs lg:text-base">Battle Ready</h3>
                      <p className="text-white/90 text-[10px] lg:text-sm">Get detailed stats and battle strategies</p>
                    </div>
                  </div>
                </div>

                {/* Top Right */}
                <div className="absolute top-[20%] right-[20%] transform translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-3 bg-white/30 backdrop-blur-md rounded-xl p-3 lg:p-4 hover:scale-110 transition-transform shadow-xl w-[160px] lg:w-[300px]">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-300/20 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xs lg:text-base">Evolution Guide</h3>
                      <p className="text-white/90 text-[10px] lg:text-sm">Learn about evolution chains</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Right */}
                <div className="absolute bottom-[20%] right-[20%] transform translate-x-1/2 translate-y-1/2">
                  <div className="flex items-center gap-3 bg-white/30 backdrop-blur-md rounded-xl p-3 lg:p-4 hover:scale-110 transition-transform shadow-xl w-[160px] lg:w-[300px]">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-300/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xs lg:text-base">Special Forms</h3>
                      <p className="text-white/90 text-[10px] lg:text-sm">Discover regional variants</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Left */}
                <div className="absolute bottom-[20%] left-[20%] transform -translate-x-1/2 translate-y-1/2">
                  <div className="flex items-center gap-3 bg-white/30 backdrop-blur-md rounded-xl p-3 lg:p-4 hover:scale-110 transition-transform shadow-xl w-[160px] lg:w-[300px]">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-300/20 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xs lg:text-base">Legendary Pokémon</h3>
                      <p className="text-white/90 text-[10px] lg:text-sm">Explore rare and powerful creatures</p>
                    </div>
                  </div>
                </div>

                {/* Top Left */}
                <div className="absolute top-[20%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-3 bg-white/30 backdrop-blur-md rounded-xl p-3 lg:p-4 hover:scale-110 transition-transform shadow-xl w-[160px] lg:w-[300px]">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-300/20 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xs lg:text-base">Global Regions</h3>
                      <p className="text-white/90 text-[10px] lg:text-sm">Explore Pokémon from all regions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pokémon Section */}
      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8 text-center">Featured Pokémon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {featuredPokemon.map((pokemon, index) => (
              <article
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 transform hover:scale-105 transition-transform"
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
                      <div className="relative mb-4 lg:mb-8">
                        <div className={`absolute inset-0 ${TYPE_COLORS[pokemon?.type[0] as PokemonType]} 
                          opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-all`}></div>
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                          alt={`${pokemon?.name} artwork`}
                          className="w-48 h-48 lg:w-64 lg:h-64 object-contain drop-shadow-2xl
                            transform group-hover:scale-110 transition-all duration-300
                            group-hover:rotate-2"
                          loading="lazy"
                        />
                      </div>

                      {/* Pokemon Info */}
                      <div className="text-center space-y-4 lg:space-y-6 w-full">
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-yellow-300 
                            transition-colors">
                            {pokemon?.name}
                          </h3>
                          <span className="text-white/60 text-lg lg:text-xl">#{String(pokemon?.id).padStart(3, '0')}</span>
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
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8 lg:py-16 bg-white/5 backdrop-blur-sm relative overflow-hidden">
        {/* Animated Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat bg-center animate-pattern"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-yellow-300/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                transform: `scale(${0.5 + Math.random() * 0.5})`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 lg:mb-12 text-center pokemon-title">Pokémon World Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Total Pokémon */}
            <div className="bg-white/10 rounded-xl p-6 transform hover:scale-105 transition-all relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-300/20 rounded-full flex items-center justify-center group-hover:bg-yellow-300/30 transition-colors">
                  <BookOpen className="w-8 h-8 text-yellow-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2 group-hover:text-yellow-300 transition-colors">Total Pokémon</h3>
              <p className="text-white/80 text-center">{allPokemon.length} unique species to discover and learn about</p>
            </div>

            {/* Types Distribution */}
            <div className="bg-white/10 rounded-xl p-6 transform hover:scale-105 transition-all relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-300/20 rounded-full flex items-center justify-center group-hover:bg-yellow-300/30 transition-colors">
                  <Tag className="w-8 h-8 text-yellow-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2 group-hover:text-yellow-300 transition-colors">18 Types</h3>
              <p className="text-white/80 text-center">From Fire to Fairy, explore all Pokémon types</p>
            </div>

            {/* Regions */}
            <div className="bg-white/10 rounded-xl p-6 transform hover:scale-105 transition-all relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-300/20 rounded-full flex items-center justify-center group-hover:bg-yellow-300/30 transition-colors">
                  <Globe className="w-8 h-8 text-yellow-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2 group-hover:text-yellow-300 transition-colors">9 Regions</h3>
              <p className="text-white/80 text-center">Explore Pokémon from different regions worldwide</p>
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="mt-8 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white/5 rounded-lg p-4 text-center transform hover:scale-105 transition-all group">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-yellow-300/20 rounded-full flex items-center justify-center group-hover:bg-yellow-300/30 transition-colors">
                  <Star className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              <h4 className="text-white font-semibold group-hover:text-yellow-300 transition-colors">Legendary Pokémon</h4>
              <p className="text-white/60 text-sm">Discover rare and powerful creatures</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center transform hover:scale-105 transition-all group">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-yellow-300/20 rounded-full flex items-center justify-center group-hover:bg-yellow-300/30 transition-colors">
                  <Zap className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              <h4 className="text-white font-semibold group-hover:text-yellow-300 transition-colors">Mega Evolution</h4>
              <p className="text-white/60 text-sm">Learn about temporary power-ups</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center transform hover:scale-105 transition-all group">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-yellow-300/20 rounded-full flex items-center justify-center group-hover:bg-yellow-300/30 transition-colors">
                  <Crown className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              <h4 className="text-white font-semibold group-hover:text-yellow-300 transition-colors">Gigantamax</h4>
              <p className="text-white/60 text-sm">Explore giant transformations</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center transform hover:scale-105 transition-all group">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-yellow-300/20 rounded-full flex items-center justify-center group-hover:bg-yellow-300/30 transition-colors">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              <h4 className="text-white font-semibold group-hover:text-yellow-300 transition-colors">Special Forms</h4>
              <p className="text-white/60 text-sm">Find unique variations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 lg:py-16 bg-gradient-to-br from-purple-900/30 to-purple-800/30 backdrop-blur-sm relative overflow-hidden">
        {/* Animated Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat bg-center animate-pattern"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}>
          </div>
        </div>

        {/* Purple Ripple Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-300/10 to-transparent opacity-30 animate-ripple"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)] animate-pulse"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-purple-300/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                transform: `scale(${0.5 + Math.random() * 0.5})`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4 lg:mb-6">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-300/20 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 lg:w-8 lg:h-8 text-purple-300" />
              </div>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4 pokemon-title">Stay Updated</h2>
            <p className="text-white/80 text-base lg:text-lg mb-6 lg:mb-8">
              Subscribe to our newsletter for the latest Pokémon updates, new features, and community highlights.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 lg:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50
                  focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-300/50
                  backdrop-blur-sm transition-all text-sm lg:text-base"
              />
              <button
                type="submit"
                className="px-6 lg:px-8 py-2 lg:py-3 bg-purple-400 hover:bg-purple-300 text-white rounded-xl font-bold
                  transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-300/50
                  flex items-center justify-center gap-2 text-sm lg:text-base"
              >
                Subscribe
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </form>
            <p className="text-white/60 text-xs lg:text-sm mt-3 lg:mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;