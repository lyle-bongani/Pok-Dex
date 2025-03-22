import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Github, Twitter, Mail, Heart, Gamepad2, BookOpen, 
    Shield, Users, Star, Zap, Globe, HelpCircle, 
    BookMarked, Trophy, Info 
} from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-t from-red-700 to-red-600">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Gamepad2 className="w-6 h-6" />
                            PokéDex
                        </h3>
                        <p className="text-white/80">
                            Your ultimate guide to the world of Pokémon. Discover detailed stats,
                            types, and evolution information for every Pokémon.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                               className="text-white/80 hover:text-yellow-300 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
                               className="text-white/80 hover:text-yellow-300 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="mailto:your.email@example.com" 
                               className="text-white/80 hover:text-yellow-300 transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/pokemon" className="text-white/80 hover:text-yellow-300 transition-colors flex items-center gap-2">
                                    All Pokémon
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" className="text-white/80 hover:text-yellow-300 transition-colors flex items-center gap-2">
                                    <Heart className="w-4 h-4" />
                                    Favorites
                                </Link>
                            </li>
                            <li>
                                <Link to="/types" className="text-white/80 hover:text-yellow-300 transition-colors flex items-center gap-2">
                                    Types Guide
                                </Link>
                            </li>
                            <li>
                                <Link to="/generations" className="text-white/80 hover:text-yellow-300 transition-colors flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    Generations
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Features
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-white/80 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Detailed Pokémon Stats
                            </li>
                            <li className="text-white/80 flex items-center gap-2">
                                <BookMarked className="w-4 h-4" />
                                Type Effectiveness
                            </li>
                            <li className="text-white/80 flex items-center gap-2">
                                <Trophy className="w-4 h-4" />
                                Evolution Chains
                            </li>
                            <li className="text-white/80 flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                Favorite Collection
                            </li>
                        </ul>
                    </div>

                    {/* Community & Support */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Community & Support
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-white/80 flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Join Discord
                            </li>
                            <li className="text-white/80 flex items-center gap-2">
                                <Twitter className="w-4 h-4" />
                                Follow on Twitter
                            </li>
                            <li className="text-white/80 flex items-center gap-2">
                                <Github className="w-4 h-4" />
                                Contribute on GitHub
                            </li>
                            <li className="text-white/80 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4" />
                                Report Issues
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                            <Info className="w-5 h-5" />
                            About the Data
                        </h4>
                        <p className="text-white/80 text-sm">
                            All Pokémon data is sourced from the official PokéAPI. We strive to provide
                            accurate and up-to-date information about all Pokémon species.
                        </p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                            <HelpCircle className="w-5 h-5" />
                            Need Help?
                        </h4>
                        <p className="text-white/80 text-sm">
                            Check our FAQ or contact our support team for assistance with any questions
                            about using PokéDex.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-white/60 text-sm">
                                © 2025 PokéDex. All rights reserved.
                            </p>
                            <span className="text-white/40">|</span>
                            <p className="text-white/60 text-sm flex items-center gap-1">
                                Created with ❤️ by Lyle Bongani
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="text-white/60 hover:text-yellow-300 text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-white/60 hover:text-yellow-300 text-sm transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/sitemap" className="text-white/60 hover:text-yellow-300 text-sm transition-colors">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 