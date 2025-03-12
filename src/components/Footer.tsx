import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-t from-red-700 to-red-600">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">About PokéDex</h3>
                        <p className="text-white/80">
                            A comprehensive database of Pokémon with detailed stats,
                            types, and evolution information.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/pokemon" className="text-white/80 hover:text-yellow-300 transition-colors">
                                    All Pokémon
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" className="text-white/80 hover:text-yellow-300 transition-colors">
                                    Favorites
                                </Link>
                            </li>
                            <li>
                                <Link to="/types" className="text-white/80 hover:text-yellow-300 transition-colors">
                                    Types Guide
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://pokeapi.co/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 hover:text-yellow-300 transition-colors"
                                >
                                    PokéAPI
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://pokemon.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 hover:text-yellow-300 transition-colors"
                                >
                                    Official Site
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Connect</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-yellow-300 transition-colors"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-yellow-300 transition-colors"
                            >
                                <Twitter size={24} />
                            </a>
                            <a
                                href="mailto:contact@example.com"
                                className="text-white/80 hover:text-yellow-300 transition-colors"
                            >
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/60 text-sm">
                            © {new Date().getFullYear()} PokéDex. All rights reserved.
                        </p>
                        <p className="text-white/60 text-sm flex items-center gap-2">
                            Made with <Heart size={16} className="text-red-400" /> using React
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 