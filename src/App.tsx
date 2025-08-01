import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import { SearchProvider, useSearch } from './contexts/SearchContext';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { Home as HomeIcon, List, Heart, Search, X } from 'lucide-react';

// Extend the Window interface
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
  }
}

// Navigation component
const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { searchTerm, setSearchTerm, handleSearch } = useSearch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-red-600/95 backdrop-blur-md shadow-lg' : 'bg-red-600'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-2 text-white"
            >
              <div className="w-8 h-8">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="white" />
                  <path d="M5 50h90" stroke="black" strokeWidth="10" />
                  <circle cx="50" cy="50" r="15" fill="white" stroke="black" strokeWidth="10" />
                  <circle cx="50" cy="50" r="8" fill="white" />
                </svg>
              </div>
              <span className="text-xl font-bold pokemon-title hidden sm:block">Pokédex</span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-yellow-300 font-bold bg-white/10'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                <HomeIcon size={20} />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/pokemon"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-yellow-300 font-bold bg-white/10'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                <List size={20} />
                <span>Pokémon</span>
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-yellow-300 font-bold bg-white/10'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                <Heart size={20} />
                <span>Favorites</span>
              </NavLink>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                className="w-48 px-4 py-1.5 pl-10 rounded-lg bg-white/10 text-white 
                  placeholder:text-white/60 focus:outline-none focus:ring-2 
                  focus:ring-yellow-300/50 focus:bg-white/20 focus:w-64 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center group"
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Navigation Sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 bg-red-600 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-xl font-bold text-white">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'text-yellow-300 font-bold bg-white/10'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                <HomeIcon size={20} />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/pokemon"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'text-yellow-300 font-bold bg-white/10'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                <List size={20} />
                <span>Pokémon</span>
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'text-yellow-300 font-bold bg-white/10'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                <Heart size={20} />
                <span>Favorites</span>
              </NavLink>
              
              {/* Mobile Search Bar */}
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search Pokémon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-white/10 text-white 
                    placeholder:text-white/60 focus:outline-none focus:ring-2 
                    focus:ring-yellow-300/50 focus:bg-white/20 transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Audio Player component
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
    <Router>
      <FavoritesProvider>
        <SearchProvider>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navigation />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon" element={<PokemonList />} />
                <Route path="/pokemon/:id" element={<PokemonDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </SearchProvider>
      </FavoritesProvider>
    </Router>
  );
}

export default App;