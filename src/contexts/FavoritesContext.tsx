import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import pokemonData from '../pokemonData.json';

interface FavoritesContextType {
    favorites: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
    getFavoritePokemon: () => typeof pokemonData;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem('pokemonFavorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(favId => favId !== id)
                : [...prev, id]
        );
    };

    const isFavorite = (id: number): boolean => {
        return favorites.includes(id);
    };

    const getFavoritePokemon = () =>
        pokemonData.filter(pokemon => favorites.includes(pokemon.id));

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite,
            getFavoritePokemon
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}; 