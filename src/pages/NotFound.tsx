import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found - PokéDex",
    "description": "The page you're looking for doesn't exist. Return to the PokéDex homepage to explore Pokémon.",
    "url": "https://pok-dex-iota.vercel.app/404"
  };

  return (
    <>
      <SEO 
        title="Page Not Found - PokéDex"
        description="The page you're looking for doesn't exist. Return to the PokéDex homepage to explore Pokémon."
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-xl animate-pulse"></div>
              <div className="animate-spin-slow w-32 h-32 mx-auto relative">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                  <circle cx="50" cy="50" r="45" fill="white" />
                  <path d="M5 50h90" stroke="black" strokeWidth="10" />
                  <circle cx="50" cy="50" r="15" fill="white" stroke="black" strokeWidth="10" />
                  <circle cx="50" cy="50" r="8" fill="white" />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold text-white mb-4 pokemon-title">404</h1>
          <h2 className="text-2xl font-bold text-white mb-4">Oops! Page Not Found</h2>
          <p className="text-white/80 mb-8 text-lg">
            The Pokémon you're looking for seems to have wandered off! 
            Let's get you back on track to explore the world of Pokémon.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 
                text-red-700 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg 
                hover:shadow-yellow-300/50 w-full justify-center"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            
            <Link
              to="/pokemon"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 
                text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg 
                hover:shadow-white/20 w-full justify-center"
            >
              <Search className="w-5 h-5" />
              Browse Pokémon
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <h3 className="text-white font-semibold mb-4">Popular Pokémon</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {[1, 25, 6, 150, 151].map(id => (
                <Link
                  key={id}
                  to={`/pokemon/${id}`}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full 
                    text-sm transition-all hover:scale-105"
                >
                  #{String(id).padStart(3, '0')}
                </Link>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white 
              transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound; 