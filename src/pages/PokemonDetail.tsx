import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useFavorites } from '../contexts/FavoritesContext';
import { TYPE_COLORS } from '../constants/pokemonTypes';
import type { PokemonType } from '../types/pokemon';

interface PokemonDetail {
  id: number;
  name: string;
  type: PokemonType[];
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
  height: number;
  weight: number;
  abilities: string[];
  description: string;
  evolution: { name: string; id: number }[];
  soundUrl: string;
}

// Define a type for the stats
type StatName = 'hp' | 'attack' | 'defense' | 'sp_atk' | 'sp_def' | 'speed';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const getEvolutionChain = (chain: any) => {
          const evolutions = [];
          let current = chain;
          while (current) {
            evolutions.push({
              name: current.species.name,
              id: parseInt(current.species.url.split('/').slice(-2, -1)[0], 10),
            });
            current = current.evolves_to[0];
          }
          return evolutions;
        };

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
          description: speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text,
          evolution: getEvolutionChain(evolutionData.chain),
          soundUrl: `https://pokemoncries.com/cries/${data.id}.mp3`, // Correct URL for Pokémon cries
        });
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  useEffect(() => {
    if (pokemon) {
      const audio = new Audio(pokemon.soundUrl);
      audio.play().catch(error => console.error('Error playing sound:', error));
    }
  }, [pokemon]);

  if (isLoading || !pokemon) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="text-white text-2xl">Loading Pokémon...</div>
      </div>
    );
  }

  const getStatPercentage = (stat: number) => {
    const maxStat = 255; // Maximum possible stat value in Pokémon
    return Math.min((stat / maxStat) * 100, 100);
  };

  const statColors: Record<StatName, string> = {
    hp: 'bg-red-500',
    attack: 'bg-orange-500',
    defense: 'bg-yellow-500',
    sp_atk: 'bg-blue-500',
    sp_def: 'bg-green-500',
    speed: 'bg-purple-500',
  };

  // Create a gradient based on the Pokémon's primary type
  const primaryTypeColor = TYPE_COLORS[pokemon.type[0] as PokemonType];
  const secondaryTypeColor = TYPE_COLORS[pokemon.type[1] as PokemonType] || primaryTypeColor;

  // Create structured data for the Pokémon
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": pokemon.name,
    "description": pokemon.description,
    "image": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    "identifier": `pokemon-${pokemon.id}`,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "HP",
        "value": pokemon.hp
      },
      {
        "@type": "PropertyValue",
        "name": "Attack",
        "value": pokemon.attack
      },
      {
        "@type": "PropertyValue",
        "name": "Defense",
        "value": pokemon.defense
      },
      {
        "@type": "PropertyValue",
        "name": "Special Attack",
        "value": pokemon.sp_atk
      },
      {
        "@type": "PropertyValue",
        "name": "Special Defense",
        "value": pokemon.sp_def
      },
      {
        "@type": "PropertyValue",
        "name": "Speed",
        "value": pokemon.speed
      },
      {
        "@type": "PropertyValue",
        "name": "Height",
        "value": `${pokemon.height}m`
      },
      {
        "@type": "PropertyValue",
        "name": "Weight",
        "value": `${pokemon.weight}kg`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{`${pokemon.name} - Pokédex Entry #${String(pokemon.id).padStart(3, '0')}`}</title>
        <meta name="description" content={`Learn about ${pokemon.name}, a ${pokemon.type.join('/')} type Pokémon. ${pokemon.description}`} />
        <meta property="og:title" content={`${pokemon.name} - Pokédex Entry #${String(pokemon.id).padStart(3, '0')}`} />
        <meta property="og:description" content={`Learn about ${pokemon.name}, a ${pokemon.type.join('/')} type Pokémon. ${pokemon.description}`} />
        <meta property="og:image" content={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pokemon.name} - Pokédex Entry #${String(pokemon.id).padStart(3, '0')}`} />
        <meta name="twitter:description" content={`Learn about ${pokemon.name}, a ${pokemon.type.join('/')} type Pokémon. ${pokemon.description}`} />
        <meta name="twitter:image" content={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className={`min-h-screen bg-gradient-to-b ${primaryTypeColor} to-transparent`}>
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Back Button */}
          <Link
            to={location.state?.from === 'list' ? '/pokemon' : '/'}
            className="inline-flex items-center gap-2 text-white 
              hover:text-yellow-300 transition-colors z-10 bg-black/20 px-4 py-2 
              rounded-lg backdrop-blur-sm mb-6"
            aria-label="Go back"
          >
            <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </Link>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Pokemon Image and Basic Info */}
            <div className="space-y-6">
              {/* Pokemon Card */}
              <div className={`bg-gradient-to-b ${primaryTypeColor} to-transparent
                backdrop-blur-md rounded-2xl p-8 relative overflow-hidden
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

                {/* Pokemon Image */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 ${primaryTypeColor} 
                    opacity-20 rounded-full blur-xl`}></div>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={`${pokemon.name} artwork`}
                    className="w-full h-96 object-contain drop-shadow-2xl"
                    loading="lazy"
                  />
                </div>

                {/* Pokemon Name and Number */}
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-5xl font-bold text-white">{pokemon.name}</h1>
                  <p className="text-white/60 text-2xl">#{String(pokemon.id).padStart(3, '0')}</p>
                </div>

                {/* Types */}
                <div className="flex gap-3 mb-6">
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

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(pokemon.id)}
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all transform hover:scale-110
                    ${isFavorite(pokemon.id)
                      ? 'bg-white/10 text-red-500'
                      : 'bg-white/5 text-white/50 hover:text-white'
                    }`}
                  aria-label={`${isFavorite(pokemon.id) ? 'Remove from' : 'Add to'} favorites`}
                >
                  <Heart
                    size={28}
                    fill={isFavorite(pokemon.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Description Card */}
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                <p className="text-white/80 leading-relaxed">{pokemon.description}</p>
              </div>
            </div>

            {/* Right Column - Stats and Details */}
            <div className="space-y-6">
              {/* Base Stats */}
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-6">Base Stats</h2>
                <div className="space-y-4">
                  {(['hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed'] as StatName[]).map((stat) => (
                    <div key={stat} className="flex items-center gap-4">
                      <span className="text-sm text-white opacity-80 w-20">{stat.toUpperCase()}</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${statColors[stat]} transition-all duration-1000`}
                          style={{ width: `${getStatPercentage(pokemon[stat])}%` }}
                          role="progressbar"
                          aria-valuenow={pokemon[stat]}
                          aria-valuemin={0}
                          aria-valuemax={255}
                        />
                      </div>
                      <span className="text-sm font-bold text-white w-12 text-right">{pokemon[stat]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-4">Abilities</h2>
                <div className="flex flex-wrap gap-3">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>

              {/* Evolution Chain */}
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-6">Evolution Chain</h2>
                <div className="flex flex-wrap justify-center gap-8">
                  {pokemon.evolution.map((evo, index) => (
                    <div key={evo.id} className="text-center">
                      <div className="relative">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`}
                          alt={`${evo.name} sprite`}
                          className="w-24 h-24 mx-auto drop-shadow-lg"
                          loading="lazy"
                        />
                        {index < pokemon.evolution.length - 1 && (
                          <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-white/50">
                            →
                          </div>
                        )}
                      </div>
                      <p className="text-white font-medium mt-2">
                        {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetail;