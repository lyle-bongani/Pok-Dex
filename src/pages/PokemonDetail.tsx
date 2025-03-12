import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { TYPE_COLORS } from '../constants/pokemonTypes';
import type { PokemonType } from '../types/pokemon';

interface PokemonDetail {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
  height?: number;
  weight?: number;
  abilities?: string[];
  description?: string;
}

// Add type for stat names
type StatName = 'hp' | 'attack' | 'defense' | 'speed' | 'sp_atk' | 'sp_def';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

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

  // Update the helper function with proper typing
  const getStatColor = (stat: StatName): string => {
    const colors: Record<StatName, string> = {
      hp: 'bg-green-500',
      attack: 'bg-red-500',
      defense: 'bg-blue-500',
      speed: 'bg-yellow-500',
      sp_atk: 'bg-purple-500',
      sp_def: 'bg-pink-500'
    };
    return colors[stat] || 'bg-gray-500';
  };

  // Add this helper function to calculate stat percentage
  const getStatPercentage = (stat: number) => {
    const maxStat = 255; // Maximum possible stat value in Pokémon
    return Math.min((stat / maxStat) * 100, 100);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon({
          id: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          type: data.types.map((t: any) =>
            t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
          ),
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          sp_atk: data.stats[3].base_stat,
          sp_def: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
          height: data.height / 10, // Convert to meters
          weight: data.weight / 10, // Convert to kg
          abilities: data.abilities.map((a: any) =>
            a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)
          ),
        });
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  // Add animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !pokemon) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="text-white text-2xl">Loading Pokémon...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500 p-4">
      <div className={`container mx-auto max-w-6xl transition-all duration-500 
        ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>

        {/* Back Button */}
        <Link
          to={location.state?.from === 'list' ? '/pokemon' : '/'}
          className="inline-flex items-center gap-2 text-white 
            hover:text-yellow-300 transition-colors z-10 bg-black/20 px-4 py-2 
            rounded-lg backdrop-blur-sm mb-4"
        >
          <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>

        {/* Main Card */}
        <div className={`bg-gradient-to-b ${getTypeColor(pokemon.type[0] as PokemonType)} to-transparent
          backdrop-blur-md rounded-xl relative overflow-hidden
          transition-all duration-500 transform hover:shadow-2xl hover:shadow-white/10`}>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-repeat bg-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}>
            </div>
          </div>

          {/* Pokemon Header */}
          <div className="relative p-8 flex flex-col items-center border-b border-white/10">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => toggleFavorite(pokemon.id)}
                className={`p-2 rounded-full transition-all transform hover:scale-110
                  ${isFavorite(pokemon.id)
                    ? 'bg-white/10 text-red-500'
                    : 'bg-white/5 text-white/50 hover:text-white'
                  }`}
              >
                <Heart
                  size={24}
                  fill={isFavorite(pokemon.id) ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Pokemon Image */}
            <div className="relative mb-6">
              <div className={`absolute inset-0 ${TYPE_COLORS[pokemon.type[0] as PokemonType]} 
                opacity-20 rounded-full blur-xl`}></div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-72 h-72 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Pokemon Name and Number */}
            <h1 className="text-5xl font-bold text-white mb-2">{pokemon.name}</h1>
            <p className="text-white/60 text-xl mb-4">#{String(pokemon.id).padStart(3, '0')}</p>

            {/* Types */}
            <div className="flex gap-3">
              {pokemon.type.map((type) => (
                <span
                  key={type}
                  className={`px-6 py-2 rounded-full text-white text-lg font-medium
                    ${TYPE_COLORS[type as PokemonType]} bg-opacity-80`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Pokemon Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Physical Characteristics */}
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-4">Physical Characteristics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-white/60">Height</div>
                    <div className="text-2xl font-bold text-white">{pokemon.height}m</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Weight</div>
                    <div className="text-2xl font-bold text-white">{pokemon.weight}kg</div>
                  </div>
                </div>
              </div>

              {/* Abilities */}
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-4">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities?.map((ability) => (
                    <span
                      key={ability}
                      className="px-4 py-2 bg-white/10 rounded-lg text-white"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-6">Base Stats</h2>
              <div className="space-y-4">
                {/* HP */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white opacity-80">HP</span>
                    <span className="text-sm font-bold text-white">{pokemon.hp}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStatColor('hp')} transition-all duration-1000`}
                      style={{ width: `${getStatPercentage(pokemon.hp)}%` }}
                    />
                  </div>
                </div>

                {/* Attack */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white opacity-80">Attack</span>
                    <span className="text-sm font-bold text-white">{pokemon.attack}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStatColor('attack')} transition-all duration-1000`}
                      style={{ width: `${getStatPercentage(pokemon.attack)}%` }}
                    />
                  </div>
                </div>

                {/* Defense */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white opacity-80">Defense</span>
                    <span className="text-sm font-bold text-white">{pokemon.defense}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStatColor('defense')} transition-all duration-1000`}
                      style={{ width: `${getStatPercentage(pokemon.defense)}%` }}
                    />
                  </div>
                </div>

                {/* Speed */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white opacity-80">Speed</span>
                    <span className="text-sm font-bold text-white">{pokemon.speed}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStatColor('speed')} transition-all duration-1000`}
                      style={{ width: `${getStatPercentage(pokemon.speed)}%` }}
                    />
                  </div>
                </div>

                {/* Special Attack */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white opacity-80">Sp. Attack</span>
                    <span className="text-sm font-bold text-white">{pokemon.sp_atk}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStatColor('sp_atk')} transition-all duration-1000`}
                      style={{ width: `${getStatPercentage(pokemon.sp_atk)}%` }}
                    />
                  </div>
                </div>

                {/* Special Defense */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white opacity-80">Sp. Defense</span>
                    <span className="text-sm font-bold text-white">{pokemon.sp_def}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStatColor('sp_def')} transition-all duration-1000`}
                      style={{ width: `${getStatPercentage(pokemon.sp_def)}%` }}
                    />
                  </div>
                </div>

                {/* Total */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-white">Total</span>
                    <span className="text-sm font-bold text-white">
                      {pokemon.hp + pokemon.attack + pokemon.defense +
                        pokemon.speed + pokemon.sp_atk + pokemon.sp_def}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-300 transition-all duration-1000"
                      style={{
                        width: `${((pokemon.hp + pokemon.attack + pokemon.defense +
                          pokemon.speed + pokemon.sp_atk + pokemon.sp_def) / (255 * 6)) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;