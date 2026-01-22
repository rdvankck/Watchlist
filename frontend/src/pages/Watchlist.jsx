import React, { useState, useEffect } from 'react';
import { getWatchlist, updateWatchlistItem, deleteFromWatchlist } from '../api/watchlist';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useAuth();
    const { showToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        setLoading(true);
        try {
            const data = await getWatchlist(token);
            setWatchlist(data);
            showToast('Watchlist loaded successfully!', 'success');
        } catch (err) {
            setError('Failed to fetch watchlist');
            showToast('Failed to load watchlist', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, updates) => {
        try {
            await updateWatchlistItem(id, updates, token);
            fetchWatchlist();
            showToast('Item updated successfully!', 'success');
        } catch (err) {
            setError('Failed to update item');
            showToast('Failed to update item', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            await deleteFromWatchlist(id, token);
            fetchWatchlist();
            showToast('Item deleted successfully!', 'success');
        } catch (err) {
            setError('Failed to delete item');
            showToast('Failed to delete item', 'error');
        }
    };

    const filteredWatchlist = watchlist.filter(item => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white text-center mb-8">My Watchlist</h2>

                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 mb-8 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-400
focus:outline-none focus:border-purple-500 text-lg"
                />

                {loading && (
                    <div className="text-center text-white text-xl py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white 
border-t-transparent"></div>
                        <p className="mt-4">Loading...</p>
                    </div>
                )}

                {error && (
                    <div className="max-w-3xl mx-auto bg-red-500/20 border border-red-500 text-red-100 px-6 py-4 rounded-xl mb-8">
                        {error}
                    </div>
                )}

                {watchlist.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Your watchlist is empty</h3>
                        <p className="text-gray-400 text-lg mb-8">Start adding movies and TV shows to your watchlist!</p>
                        <a href="/search" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 
rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Go to Search
                        </a>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredWatchlist.map((item) => (
                        <div key={item._id} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 
hover:bg-white/20 transition duration-300 hover:scale-105">
                            {item.poster ? (
                                <img src={item.poster} alt={item.title} className="w-full h-64 object-cover" />
                            ) : (
                                <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center 
justify-center">
                                    <span className="text-white text-6xl">🎬</span>
                                </div>
                            )}
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white mb-2 truncate">{item.title}</h3>

                                {item.rating && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-yellow-400">⭐</span>
                                        <span className="text-white text-sm">{item.rating}/10</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.watched ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500'}`}>
                                        {item.watched ? '✓ Watched' : 'To Watch'}
                                    </span>
                                </div>

                                {item.thoughts && (
                                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.thoughts}</p>
                                )}

                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleUpdate(item._id, { watched: !item.watched })}
                                        className="flex-1 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 border
border-blue-500 rounded-lg transition duration-300 text-sm font-medium"
                                    >
                                        Toggle Watched
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500
rounded-lg transition duration-300 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Watchlist;