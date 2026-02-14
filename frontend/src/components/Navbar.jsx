import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar(){
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
  
                    <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition duration-300">
                        MERN Watchlist
                    </Link>
  
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {isAuthenticated && (
                            <div className="flex gap-4">
                                <Link to="/search" className="text-white hover:text-blue-400 transition duration-300">Search</Link>
                                <Link to="/watchlist" className="text-white hover:text-blue-400 transition duration-300">Watchlist</Link>
                            </div>
                        )}
                        {isAuthenticated && user && (
                            <span className="text-white text-sm">Welcome, {user.username || user.email}!</span>
                        )}
                        {!isAuthenticated ? (
                            <div className="flex gap-4">
                                <Link to="/login" className="text-white hover:text-blue-400 transition duration-300">Login</Link>
                                <Link to="/register" className="text-white hover:text-blue-400 transition duration-300">Register</Link>
                            </div>
                        ) : (
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition
    duration-300">Logout</button>
                        )}
                    </div>
  
                    {/* Hamburger Button - Mobile Only */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
  
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-white/10">
                        {isAuthenticated && (
                            <div className="flex flex-col gap-3 pt-4">
                                <Link 
                                    to="/search" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white hover:text-blue-400 transition duration-300 py-2"
                                >
                                    Search
                                </Link>
                                <Link 
                                    to="/watchlist" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white hover:text-blue-400 transition duration-300 py-2"
                                >
                                    Watchlist
                                </Link>
                            </div>
                        )}
                        {isAuthenticated && user && (
                            <span className="text-white text-sm py-2 block">Welcome, {user.username || user.email}!</span>
                        )}
                        {!isAuthenticated ? (
                            <div className="flex flex-col gap-3 pt-4">
                                <Link 
                                    to="/login" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white hover:text-blue-400 transition duration-300 py-2"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white hover:text-blue-400 transition duration-300 py-2"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <button 
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 mt-3 w-full"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;