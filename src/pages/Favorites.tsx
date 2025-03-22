import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { TYPE_COLORS } from '../constants/pokemonTypes';
import type { Pokemon, PokemonType } from '../types/pokemon';

const Favorites: React.FC = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const promises = favorites.map(async (id) => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const data = await response.json();
                    return {
                        id: data.id,
                        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                        type: data.types.map((t: any) =>
                            t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                        ),
                        stats: {
                            hp: data.stats[0].base_stat,
                            attack: data.stats[1].base_stat,
                            defense: data.stats[2].base_stat,
                            speed: data.stats[5].base_stat,
                        }
                    };
                });

                const results = await Promise.all(promises);
                setPokemonData(results);
            } catch (error) {
                console.error('Error fetching Pokémon:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemonData();
    }, [favorites]);

    const filteredPokemon = pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-red-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading Favorites...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500">
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold text-white mb-8 pokemon-title">My Favorite Pokémon</h1>
                
                {favorites.length === 0 ? (
                    <div className="text-center py-16 bg-white/10 backdrop-blur-sm rounded-xl">
                        <p className="text-2xl text-white/90 mb-6">You haven't added any Pokémon to your favorites yet.</p>
                        <Link
                            to="/pokemon"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 
                                text-red-700 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg 
                                hover:shadow-yellow-300/50"
                        >
                            Browse Pokémon
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPokemon.map((pokemon) => (
                            <div key={pokemon.id} className="relative group">
                                <Link
                                    to={`/pokemon/${pokemon.id}`}
                                    state={{ from: 'favorites', pokemon }}
                                    className="block transform hover:scale-105 transition-all duration-300"
                                >
                                    <div
                                        className={`bg-gradient-to-b ${getTypeColor(pokemon.type[0] as PokemonType)} 
                                            to-transparent backdrop-blur-md rounded-xl p-6 transition-all 
                                            relative overflow-hidden hover:shadow-xl hover:shadow-white/10`}
                                    >
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
                                            <div className="relative mb-4">
                                                <div
                                                    className={`absolute inset-0 ${TYPE_COLORS[pokemon.type[0] as PokemonType]} 
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
                                                group-hover:text-yellow-300 transition-colors">
                                                {pokemon.name}
                                            </h2>

                                            <div className="flex gap-2 mb-4">
                                                {pokemon.type.map((type: string) => (
                                                    <span
                                                        key={type}
                                                        className={`px-3 py-1 rounded-full text-white text-sm 
                                                            font-medium ${TYPE_COLORS[type as PokemonType]} 
                                                            bg-opacity-80 transform group-hover:scale-110 
                                                            transition-all duration-300`}
                                                    >
                                                        {type}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 w-full">
                                                <div className="text-white">
                                                    <div className="text-sm opacity-80">HP</div>
                                                    <div className="text-lg font-bold">{pokemon.stats.hp}</div>
                                                </div>
                                                <div className="text-white">
                                                    <div className="text-sm opacity-80">Attack</div>
                                                    <div className="text-lg font-bold">{pokemon.stats.attack}</div>
                                                </div>
                                                <div className="text-white">
                                                    <div className="text-sm opacity-80">Defense</div>
                                                    <div className="text-lg font-bold">{pokemon.stats.defense}</div>
                                                </div>
                                                <div className="text-white">
                                                    <div className="text-sm opacity-80">Speed</div>
                                                    <div className="text-lg font-bold">{pokemon.stats.speed}</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleFavorite(pokemon.id);
                                                }}
                                                className="mt-4 p-2 rounded-full bg-white/10 text-red-500 
                                                    transition-all transform hover:scale-110"
                                            >
                                                <Heart size={20} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites; 