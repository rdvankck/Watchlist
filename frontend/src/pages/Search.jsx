import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMulti } from '../api/tmdb';
import { addToWatchlist } from '../api/watchlist';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import Modal from '../components/Modal';

function Search(){
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [addedItems, setAddedItems] = useState(new Set());
    const { token, isAuthenticated } = useAuth();
    const toast = useToast();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            toast.warning('Please enter a search query');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await searchMulti(query, token);
            setResults(data);

            if (data.length === 0) {
                toast.info('No results found');
            } else {
                toast.success(`Found ${data.length} results`);
            }
        } catch (err) {
            setError('Search failed. Please try again.');
            setResults([]);
            toast.error('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToWatchlist = async (item) => {
        try {
            if (addedItems.has(item.id)) {
                toast.info('Already added to watchlist!');
                return;
            }

            const watchlistItem = {
                tmdbId: item.id,
                title: item.title || item.name,
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                mediaType: item.media_type,
                rating: item.vote_average || 0,
                releaseDate: item.release_date || item.first_air_date,
                overview: item.overview
            };

            console.log('Adding to watchlist:', watchlistItem);
            await addToWatchlist(watchlistItem, token);
            setAddedItems(prev => new Set(prev).add(item.id));
            toast.success(`${watchlistItem.title} added to watchlist!`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add to watchlist');
        }
    };
    const handleOpenDetail = (item) => {
        setSelectedItem(item);
        setIsDetailModalOpen(true);
    };
  
    const handleCloseDetail = () => {
        setIsDetailModalOpen(false);
        setSelectedItem(null);
    };
  
      return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
              <div className="max-w-7xl mx-auto">
                  <h2 className="text-4xl font-bold text-white text-center mb-8">Search Movies & TV Shows</h2>

                  <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12">
                      <div className="flex gap-4">
                          <input 
                              type="text"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder='Search for movies or TV shows...'
                              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white
  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                          />
                          <button 
                              type="submit" 
                              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition 
  duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          >
                              Search
                          </button>
                      </div>
                  </form>

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

                  {results.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {results.map((item) => (
                              <div
                              key={item.id}
                              onClick={() => handleOpenDetail(item)}
                              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border
                          border-white/20 hover:bg-white/20 transition duration-300 hover:scale-105 cursor-pointer"
                          >
                                  {item.poster_path ? (
                                      <img 
                                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                                          alt={item.title || item.name}
                                          className="w-full h-64 object-cover"
                                      />
                                  ) : (
                                      <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center 
  justify-center">
                                          <span className="text-white text-6xl">🎬</span>
                                      </div>
                                  )}
                                  <div className="p-4">
                                      <h3 className="text-xl font-bold text-white mb-2 truncate">
                                          {item.title || item.name}
                                      </h3>
                                      <p className="text-blue-400 text-sm font-medium mb-3">
                                          {item.media_type.toUpperCase()}
                                      </p>
                                      {item.vote_average && (
                                          <div className="flex items-center gap-2 mb-3">
                                              <span className="text-yellow-400">⭐</span>
                                              <span className="text-white text-sm">
                                                  {item.vote_average.toFixed(1)}
                                              </span>
                                          </div>
                                      )}
                                      {item.release_date && (
                                          <p className="text-gray-400 text-sm mb-3">
                                              {new Date(item.release_date).getFullYear()}
                                          </p>
                                      )}
                                      <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                                          {item.overview || 'No description available.'}
                                      </p>
                                      <button
                                          onClick={() => handleAddToWatchlist(item)}
                                          disabled={addedItems.has(item.id)}
                                          className={`w-full px-4 py-3 font-semibold rounded-xl transition duration-300 shadow-lg ${
                                              addedItems.has(item.id)
                                                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:-translate-y-1 hover:shadow-xl'
                                          }`}
                                      >
                                          {addedItems.has(item.id) ? '✓ Added' : '+ Add to Watchlist'}
                                      </button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  )}

                  {results.length === 0 && !loading && !error && (
                      <div className="text-center text-gray-400 py-12">
                          <p className="text-xl">Search for your favorite movies and TV shows</p>
                      </div>
                  )}
              </div>
              <Modal
      isOpen={isDetailModalOpen}
      onClose={handleCloseDetail}
      title={selectedItem?.title || selectedItem?.name || 'Details'}
  >
      <div className="space-y-4">
          {selectedItem?.poster_path && (
              <img 
                  src={`https://image.tmdb.org/t/p/w500${selectedItem.poster_path}`}
                  alt={selectedItem.title || selectedItem.name}
                  className="w-full max-w-xs mx-auto rounded-lg"
              />
          )}

          <div className="flex items-center gap-4">
              <span className="text-blue-400 font-semibold">
                  {selectedItem?.media_type?.toUpperCase()}
              </span>
              {selectedItem?.vote_average && (
                  <span className="text-yellow-400">⭐ {selectedItem.vote_average.toFixed(1)}</span>
              )}
              {selectedItem?.release_date && (
                  <span className="text-gray-400">
                      {new Date(selectedItem.release_date).getFullYear()}
                  </span>
              )}
          </div>

          <p className="text-gray-300 leading-relaxed">
              {selectedItem?.overview || 'No description available.'}
          </p>

          <button
              onClick={() => {
                  handleAddToWatchlist(selectedItem);
                  handleCloseDetail();
              }}
              disabled={addedItems.has(selectedItem?.id)}
              className={`w-full px-4 py-3 font-semibold rounded-xl transition duration-300 ${
                  addedItems.has(selectedItem?.id)
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
              }`}
          >
              {addedItems.has(selectedItem?.id) ? '✓ Added to Watchlist' : '+ Add to Watchlist'}
          </button>
      </div>
  </Modal>
          </div>
          
      );
  }

  export default Search;
