import React, { useEffect, useState } from 'react';
import { Search, Info, ChevronRight, Github, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAllPokemon } from '../services/pokemonService';
import { TYPE_COLORS } from '../constants/pokemonTypes';
import type { PokemonType } from '../types/pokemon';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat bg-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}>
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center min-h-screen">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left py-16">
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-300 drop-shadow-lg tracking-wider pokemon-title mb-6">
                PokéDex
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                "I want to be the very best, like no one ever was!" Explore detailed information
                about all Pokémon, their types, abilities, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/pokemon"
                  className="flex items-center justify-center gap-2 px-8 py-4 
                    bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-xl 
                    font-bold transition-all transform hover:scale-105 shadow-lg group"
                >
                  Start Exploring
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  className="flex items-center justify-center gap-2 px-8 py-4 
                    bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold 
                    transition-all transform hover:scale-105 shadow-lg"
                >
                  <Info className="w-6 h-6" />
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Pikachu */}
            <div className="flex-1 relative h-screen lg:h-[90vh]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Pikachu */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={PIKACHU_IMAGE}
                      alt="Pikachu"
                      className="w-2/3 h-auto drop-shadow-2xl 
                        transform hover:scale-110 transition-transform duration-300
                        animate-bounce-slow"
                    />
                  </div>

                  {/* Decorative Pokeball - behind Pikachu */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-xl animate-pulse"></div>
                      <div className="animate-spin-slow w-[80vh] h-[80vh]">
                        <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
                          <circle cx="50" cy="50" r="45" fill="white" />
                          <path d="M5 50h90" stroke="white" strokeWidth="10" />
                          <circle cx="50" cy="50" r="15" fill="white" stroke="white" strokeWidth="10" />
                          <circle cx="50" cy="50" r="8" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-300/30 rounded-full animate-float"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 5}s`,
                          animationDuration: `${5 + Math.random() * 5}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Pokemon Section */}
      <div className="container mx-auto px-4 py-16">
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
            <Link
              key={`${pokemon?.id}-${index}`}
              to={`/pokemon/${pokemon?.id}`}
              state={{ from: 'home', pokemon }}
              className="group relative"
            >
              <div className={`bg-gradient-to-b ${getTypeColor(pokemon?.type[0] as PokemonType)} to-transparent
                backdrop-blur-md rounded-xl p-6 transition-all duration-300 transform 
                hover:scale-105 relative overflow-hidden hover:shadow-xl hover:shadow-white/10`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-repeat bg-center"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                      backgroundSize: '30px 30px'
                    }}>
                  </div>
                </div>

                <div className="relative flex flex-col items-center">
                  {/* Pokemon Image with Glow Effect */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 ${TYPE_COLORS[pokemon?.type[0] as PokemonType]} 
                      opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-all`}></div>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                      alt={pokemon?.name}
                      className="w-48 h-48 object-contain drop-shadow-2xl
                        transform group-hover:scale-110 transition-all duration-300
                        group-hover:rotate-2"
                    />
                  </div>

                  {/* Pokemon Info */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 
                      transition-colors">
                      {pokemon?.name}
                    </h3>

                    {/* Types */}
                    <div className="flex gap-2 justify-center">
                      {pokemon?.type.map((type: string) => (
                        <span
                          key={type}
                          className={`px-4 py-1 rounded-full text-white text-sm font-medium
                            ${TYPE_COLORS[type as PokemonType]} bg-opacity-80 
                            transform group-hover:scale-110 transition-all duration-300`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-white">
                        <div className="text-sm opacity-80">HP</div>
                        <div className="text-lg font-bold">{pokemon?.hp}</div>
                      </div>
                      <div className="text-white">
                        <div className="text-sm opacity-80">Attack</div>
                        <div className="text-lg font-bold">{pokemon?.attack}</div>
                      </div>
                      <div className="text-white">
                        <div className="text-sm opacity-80">Defense</div>
                        <div className="text-lg font-bold">{pokemon?.defense}</div>
                      </div>
                      <div className="text-white">
                        <div className="text-sm opacity-80">Speed</div>
                        <div className="text-lg font-bold">{pokemon?.speed}</div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      className="mt-4 px-6 py-2 bg-white/20 rounded-lg text-white 
                        group-hover:bg-white group-hover:text-gray-900
                        transition-all duration-300 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;