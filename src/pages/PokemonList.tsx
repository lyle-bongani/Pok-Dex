import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ArrowUp } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold mb-6 text-white pokemon-title">Pokémon Database</h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70
                  focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:bg-white/30"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
            </div>

            <div className="relative">
              <select
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
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-6 h-6 relative">
                  <div className="absolute inset-0 bg-white rounded-full opacity-80"></div>
                  <div className="absolute top-[45%] left-0 right-0 h-[2px] bg-black/80"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-2 h-2 rounded-full bg-black/80 border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Add a special banner for legendary filter */}
          {selectedType === 'Legendary' && (
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 
              border border-yellow-400/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-yellow-300">
                <span className="text-2xl">⭐</span>
                <span className="font-medium">Showing Legendary Pokémon</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPokemon.map((pokemon) => (
              <div key={pokemon.id} className="relative group">
                <Link
                  to={`/pokemon/${pokemon.id}`}
                  state={{ from: 'list', pokemon }}
                  className="block transform hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`bg-gradient-to-b ${getTypeColor(pokemon.type[0])} 
                      to-transparent backdrop-blur-md rounded-xl p-6 transition-all 
                      relative overflow-hidden hover:shadow-xl hover:shadow-white/10`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0 bg-repeat bg-center"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0a30 30 0 110 60 30 30 0 010-60zm0 15a15 15 0 100 30 15 15 0 000-30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                          backgroundSize: '30px 30px'
                        }}
                      />
                    </div>

                    <div className="relative flex flex-col items-center">
                      {/* Pokemon Image */}
                      <div className="relative mb-4">
                        <div
                          className={`absolute inset-0 ${TYPE_COLORS[pokemon.type[0]]} 
                            opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-all`}
                        />
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                          alt={pokemon.name}
                          className="w-32 h-32 object-contain drop-shadow-lg
                            group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <h2 className="text-xl font-bold mb-3 text-white 
                        group-hover:text-yellow-300 transition-colors"
                      >
                        {pokemon.name}
                      </h2>

                      {/* Types */}
                      <div className="flex gap-2 mb-4">
                        {pokemon.type.map((type) => (
                          <span
                            key={type}
                            className={`px-3 py-1 rounded-full text-white text-sm 
                              font-medium ${TYPE_COLORS[type]} bg-opacity-80
                              transform group-hover:scale-110 transition-all duration-300`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="text-white">
                          <div className="text-sm opacity-80">HP</div>
                          <div className="text-lg font-bold">{pokemon.hp}</div>
                        </div>
                        <div className="text-white">
                          <div className="text-sm opacity-80">Attack</div>
                          <div className="text-lg font-bold">{pokemon.attack}</div>
                        </div>
                        <div className="text-white">
                          <div className="text-sm opacity-80">Defense</div>
                          <div className="text-lg font-bold">{pokemon.defense}</div>
                        </div>
                        <div className="text-white">
                          <div className="text-sm opacity-80">Speed</div>
                          <div className="text-lg font-bold">{pokemon.speed}</div>
                        </div>
                      </div>

                      {/* Like Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(pokemon.id);
                        }}
                        className={`mt-4 p-2 rounded-full transition-all transform 
                          hover:scale-110 ${isFavorite(pokemon.id)
                            ? 'bg-white/10 text-red-500'
                            : 'bg-white/5 text-white/50 hover:text-white'
                          }`}
                      >
                        <Heart
                          size={20}
                          fill={isFavorite(pokemon.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 rounded-full 
          bg-gradient-to-b from-red-600 to-red-700
          border-2 border-yellow-400/50 text-white
          shadow-lg shadow-red-900/20 backdrop-blur-sm
          transform transition-all duration-300 z-50
          hover:scale-110 hover:shadow-xl hover:border-yellow-400
          ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
        aria-label="Back to top"
      >
        <div className="relative">
          {/* Pokéball-inspired design */}
          <div className="absolute inset-0 bg-white/10 rounded-full"></div>
          <ArrowUp className="relative z-10" size={24} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
        </div>
      </button>
    </div>
  );
};

export default PokemonList;