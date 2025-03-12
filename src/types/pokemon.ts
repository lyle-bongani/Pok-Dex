export type PokemonType =
    | 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice'
    | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic'
    | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';

export interface Pokemon {
    id: number;
    name: string;
    type: PokemonType[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
    };
} 