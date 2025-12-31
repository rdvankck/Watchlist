import React, { useState, useEffect } from 'react';
  import { getWatchlist, updateWatchlistItem, deleteFromWatchlist } from '../api/watchlist';
  import { useAuth } from '../context/AuthContext';

  function Watchlist(){
      const [watchlist, setWatchlist] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      const { token } = useAuth();

      useEffect(() => {
          fetchWatchlist();
      }, []);

      const fetchWatchlist = async () => {
          setLoading(true);
          try {
              const data = await getWatchlist(token);
              setWatchlist(data);
          } catch (err) {
              setError('Failed to fetch watchlist');
          } finally {
              setLoading(false);
          }
      };

      const handleUpdate = async (id, updates) => {
          try {
              await updateWatchlistItem(id, updates, token);
              fetchWatchlist();
          } catch (err) {
              setError('Failed to update item');
          }
      };

      const handleDelete = async (id) => {
          if (!window.confirm('Are you sure you want to delete this item?')) return;
          try {
              await deleteFromWatchlist(id, token);
              fetchWatchlist();
          } catch (err) {
              setError('Failed to delete item');
          }
      };

      return (
          <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
              <h2>My Watchlist</h2>
              {loading && <p>Loading...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}

              {watchlist.length === 0 && !loading && (
                  <p>Your watchlist is empty. <a href="/search">Go add some movies!</a></p>
              )}

              {watchlist.map((item) => (
                  <div key={item._id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                          {item.poster && (
                              <img src={item.poster} alt={item.title} style={{ width: '100px' }} />
                          )}
                          <div style={{ flex: 1 }}>
                              <h3>{item.title}</h3>
                              <p>Rating: {item.rating}/10</p>
                              <p>Watched: {item.watched ? 'Yes' : 'No'}</p>
                              {item.thoughts && <p>Thoughts: {item.thoughts}</p>}
                          </div>
                      </div>
                      <div style={{ marginTop: '1rem' }}>
                          <button
                              onClick={() => handleUpdate(item._id, { watched: !item.watched })}
                              style={{ marginRight: '0.5rem', padding: '0.5rem' }}
                          >
                              Toggle Watched
                          </button>
                          <button
                              onClick={() => handleDelete(item._id)}
                              style={{ padding: '0.5rem', backgroundColor: '#ff4444', color: 'white', border: 'none' }}
                          >
                              Delete
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      );
  }

  export default Watchlist;