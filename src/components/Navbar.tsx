import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, List, Heart, Search, Menu, X } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';

const Navbar: React.FC = () => {
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

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-red-600/95 backdrop-blur-md shadow-lg' : 'bg-red-600'
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
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive
                  ? 'text-yellow-300 font-bold bg-white/10'
                  : 'text-white hover:bg-white/10'
                }`
              }
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/pokemon"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive
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
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive
                  ? 'text-yellow-300 font-bold bg-white/10'
                  : 'text-white hover:bg-white/10'
                }`
              }
            >
              <Heart size={20} />
              <span>Favorites</span>
            </NavLink>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
            }`}
        >
          <div className="flex flex-col gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive
                  ? 'text-yellow-300 font-bold bg-white/10'
                  : 'text-white hover:bg-white/10'
                }`
              }
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/pokemon"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive
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
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive
                  ? 'text-yellow-300 font-bold bg-white/10'
                  : 'text-white hover:bg-white/10'
                }`
              }
            >
              <Heart size={20} />
              <span>Favorites</span>
            </NavLink>
            <div className="relative px-4 py-2">
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-white/10 text-white 
                  placeholder:text-white/60 focus:outline-none focus:ring-2 
                  focus:ring-yellow-300/50 focus:bg-white/20 transition-all"
              />
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
