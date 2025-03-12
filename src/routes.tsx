import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import Favorites from './pages/Favorites';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon" element={<PokemonList />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
};

export default AppRoutes;