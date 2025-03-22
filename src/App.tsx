import React, { useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import Favorites from './pages/Favorites';
import { SearchProvider } from './contexts/SearchContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

// Extend the Window interface
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
  }
}

// Create a new component for the audio player
const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.67; // Set volume to 2/3
      
      // Add event listeners for better error handling
      const handleError = (e: Event) => {
        console.error('Error playing background music:', e);
      };

      const handleCanPlay = () => {
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.error('Error playing background music:', error);
          });
        }
      };

      audioRef.current.addEventListener('error', handleError);
      audioRef.current.addEventListener('canplay', handleCanPlay);

      // Cleanup event listeners
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
        }
      };
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      src="/images/song.mp3"
      preload="auto"
      autoPlay
    />
  );
};

function App() {
  return (
    <HelmetProvider>
      <FavoritesProvider>
        <Router>
          <SearchProvider>
            <Layout>
              <AudioPlayer />
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
    </HelmetProvider>
  );
}

export default App;