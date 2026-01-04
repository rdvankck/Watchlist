import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar(){

    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
        
    };
   

    return (
        <nav className="bg-slate-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition duration-300">
                            MERN Watchlist
                        </Link>
                        {isAuthenticated && (
                            <div className="flex gap-4">
                                <Link to="/search" className="text-white hover:text-blue-400 transition duration-300">Search</Link>
                                <Link to="/watchlist" className="text-white hover:text-blue-400 transition 
duration-300">WatchList</Link>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-4">
                        {!isAuthenticated ? (
                            <div className="flex gap-4">
                                <Link to="/login" className="text-white hover:text-blue-400 transition duration-300">Login</Link>
                                <Link to="/register" className="text-white hover:text-blue-400 transition duration-300">Register</Link>
                            </div>
                        ) : (
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg 
transition duration-300">Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;