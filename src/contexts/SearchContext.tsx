import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemonData from '../pokemonData.json';

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    searchResults: typeof pokemonData;
    handleSearch: (term: string) => void;
    isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(pokemonData);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setIsSearching(true);

        if (term.length > 0) {
            const results = pokemonData.filter(pokemon =>
                pokemon.name.toLowerCase().includes(term.toLowerCase()) ||
                pokemon.type.some(type => type.toLowerCase().includes(term.toLowerCase()))
            );
            setSearchResults(results);
            navigate('/pokemon');
        } else {
            setSearchResults(pokemonData);
        }

        setIsSearching(false);
    };

    return (
        <SearchContext.Provider value={{
            searchTerm,
            setSearchTerm,
            searchResults,
            handleSearch,
            isSearching
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}; 