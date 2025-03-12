interface PokemonBasic {
    id: number;
    name: string;
    types: {
        slot: number;
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

// Add this list of legendary Pokemon IDs
const LEGENDARY_POKEMON_IDS = new Set([
    144, 145, 146, // Articuno, Zapdos, Moltres
    150, 151,      // Mewtwo, Mew
    243, 244, 245, // Raikou, Entei, Suicune
    249, 250, 251, // Lugia, Ho-Oh, Celebi
    377, 378, 379, // Regirock, Regice, Registeel
    380, 381,      // Latias, Latios
    382, 383, 384, // Kyogre, Groudon, Rayquaza
    385, 386,      // Jirachi, Deoxys
    // Add more legendary Pokemon IDs as needed
]);

export const fetchAllPokemon = async () => {
    try {
        // Fetch first 1000 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        const results = data.results;

        // Add loading indicator for better UX
        const total = results.length;
        let loaded = 0;

        // Fetch detailed data for each Pokémon in smaller chunks
        const detailedPokemon = [];
        const chunkSize = 50; // Process 50 Pokémon at a time

        for (let i = 0; i < results.length; i += chunkSize) {
            const chunk = results.slice(i, i + chunkSize);
            const chunkData = await Promise.all(
                chunk.map(async (pokemon: { url: string }) => {
                    const detailResponse = await fetch(pokemon.url);
                    const pokemonData: PokemonBasic = await detailResponse.json();

                    // Update loading progress
                    loaded++;
                    if (loaded % 50 === 0) {
                        console.log(`Loading Pokémon: ${loaded}/${total}`);
                    }

                    return {
                        id: pokemonData.id,
                        name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
                        type: pokemonData.types.map((t: { type: { name: string } }) =>
                            t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                        ),
                        total: pokemonData.stats.reduce((sum: number, stat: { base_stat: number }) =>
                            sum + stat.base_stat, 0),
                        hp: pokemonData.stats[0].base_stat,
                        attack: pokemonData.stats[1].base_stat,
                        defense: pokemonData.stats[2].base_stat,
                        sp_atk: pokemonData.stats[3].base_stat,
                        sp_def: pokemonData.stats[4].base_stat,
                        speed: pokemonData.stats[5].base_stat,
                        isLegendary: LEGENDARY_POKEMON_IDS.has(pokemonData.id)
                    };
                })
            );

            detailedPokemon.push(...chunkData);
        }

        // Sort by ID to maintain proper order
        return detailedPokemon.sort((a, b) => a.id - b.id);
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        return [];
    }
}; 