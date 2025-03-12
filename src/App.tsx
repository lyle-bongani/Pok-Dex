import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import Favorites from './pages/Favorites';
import { SearchProvider } from './contexts/SearchContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      
        <Router>
        <SearchProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon" element={<PokemonList />} />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Layout>
          </SearchProvider>
        </Router>
     
    </FavoritesProvider>
  );
}

export default App;