import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';

const SearchResults = () => {
    const { searchResults, searchTerm, isSearching } = useSearch();

    if (!searchTerm) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg 
      max-h-96 overflow-y-auto z-50">
            {isSearching ? (
                <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No Pokémon found</div>
            ) : (
                <div className="p-2">
                    {searchResults.slice(0, 5).map((pokemon) => (
                        <Link
                            key={`${pokemon.id}-${pokemon.name}`}
                            to={`/pokemon/${pokemon.id}`}
                            className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                alt={pokemon.name}
                                className="w-12 h-12"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold">{pokemon.name}</h3>
                                <div className="flex gap-2">
                                    {pokemon.type.map((type) => (
                                        <span
                                            key={type}
                                            className="text-xs px-2 py-1 rounded-full bg-gray-200"
                                        >
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                    {searchResults.length > 5 && (
                        <Link
                            to="/pokemon"
                            className="block text-center py-2 text-sm text-blue-500 hover:text-blue-600"
                        >
                            View all {searchResults.length} results
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults; 