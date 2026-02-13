import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchlist, updateWatchlistItem, deleteFromWatchlist } from '../api/watchlist';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import  Modal  from '../components/Modal';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token, isAuthenticated } = useAuth();
    const toast = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('date');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchWatchlist();
    }, [isAuthenticated, navigate]);

    const fetchWatchlist = async () => {
        setLoading(true);
        try {
            const data = await getWatchlist(token);
            console.log('Fetched watchlist:', data);
            setWatchlist(data);
            toast.success('Watchlist loaded successfully!');
        } catch (err) {
            setError('Failed to fetch watchlist');
            toast.error('Failed to load watchlist');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, updates) => {
        try {
            await updateWatchlistItem(id, updates, token);
            fetchWatchlist();
            toast.success('Item updated successfully!');
        } catch (err) {
            setError('Failed to update item');
            toast.error('Failed to update item');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            await deleteFromWatchlist(id, token);
            fetchWatchlist();
            toast.success('Item deleted successfully!');
        } catch (err) {
            setError('Failed to delete item');
            toast.error('Failed to delete item');
        }
    };

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const filteredWatchlist = watchlist.filter(item => {
       const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

       const matchesFilter =
       filter === 'all' ? true :
       filter === 'watched' ? item.watched :
       filter === 'toWatch' ? !item.watched :
       true;

       return matchesSearch && matchesFilter;
    });

    const sortedWatchlist = [...filteredWatchlist].sort((a,b) => {
        if(sortBy === 'date'){
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === 'rating') {
            return (b.rating || 0) - (a.rating || 0);
        } else if (sortBy === 'name') {
            return a.title.localeCompare(b.title);
        } 
        return 0;
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

<div className="flex gap-3 mb-8">
      <button
          onClick={() => setFilter('all')}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition duration-300 ${
              filter === 'all'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
      >
          All
      </button>
      <button
          onClick={() => setFilter('watched')}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition duration-300 ${
              filter === 'watched'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
      >
          Watched
      </button>
      <button
          onClick={() => setFilter('toWatch')}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition duration-300 ${
              filter === 'toWatch'
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
      >
          To Watch
      </button>
  </div>
  <div className="mb-8">
      <label className="text-white text-sm font-semibold mb-2 block">Sort by:</label>
      <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none
  focus:border-purple-500 text-lg cursor-pointer"
      >
          <option value="date" className="bg-slate-900">Date (Newest First)</option>
          <option value="rating" className="bg-slate-900">Rating (Highest First)</option>
          <option value="name" className="bg-slate-900">Name (A-Z)</option>
      </select>
  </div>


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
                    {sortedWatchlist.map((item) => (
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

                                {item.rating > 0 && (
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
                                        className="flex-1 px-4 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-400 border border-green-500 rounded-lg transition duration-300 text-sm font-medium"
                                    >
                                        {item.watched ? 'Mark Unwatched' : 'Mark Watched'}
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="flex-1 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 border border-blue-500 rounded-lg transition duration-300 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500 rounded-lg transition duration-300 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Edit Movie"
  >
      <div className="space-y-4">
          <div>
              <label className="block text-white text-sm font-medium mb-2">Rating (1-10)</label>
              <input
                  type="number"
                  min="1"
                  max="10"
                  value={selectedItem?.rating || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, rating: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
          </div>

          <div>
              <label className="block text-white text-sm font-medium mb-2">Thoughts</label>
              <textarea
                  value={selectedItem?.thoughts || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, thoughts: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500
  resize-none"
                  placeholder="Write your thoughts..."
              />
          </div>

          <div className="flex items-center gap-3">
              <input
                  type="checkbox"
                  checked={selectedItem?.watched || false}
                  onChange={(e) => setSelectedItem({ ...selectedItem, watched: e.target.checked })}
                  className="w-5 h-5 rounded cursor-pointer"
              />
              <label className="text-white cursor-pointer">Watched</label>
          </div>

          <div className="flex gap-3 pt-4">
              <button
                  onClick={() => {
                      handleUpdate(selectedItem._id, {
                          rating: selectedItem.rating,
                          thoughts: selectedItem.thoughts,
                          watched: selectedItem.watched
                      });
                      handleCloseModal();
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                  Save
              </button>
              <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                  Cancel
              </button>
          </div>
      </div>
  </Modal>
        </div>
    );
}

export default Watchlist;