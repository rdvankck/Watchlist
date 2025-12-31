import React, { useState } from 'react';
import { searchMulti } from '../api/tmdb';
import { useAuth } from '../context/AuthContext';

function Search(){
    const[query, setQuery] = useState('');
    const[results, setResults] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState('');
    const { token } = useAuth();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) return;

        setLoading(true);
        setError('');

        try {
            const data = await searchMulti(query, token);
            setResults(data);
        } catch (err) {
            setError('Search failed. Please try again.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
            <h2>Search Movies & TV Shows</h2>

            <form onSubmit={handleSearch}>
                <input type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for movies or TV shows...'
                style={{width: '70%', padding: '0.5rem'}} 
                />
                <button type="submit" style={{padding: '0.5rem 1rem'}}>Search</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p style={{color: 'red'}}> {error}</p>}

                <div style={{marginTop: '2rem'}}>
                    {results.map((item) => (
                        <div key={item.id} style={{border: '1px solid #ccc', padding:'1rem', marginBottom:'1rem'}}>
                            <h3>{item.title || item.name}</h3>
                            <p>{item.media_type.toUpperCase()}</p>
                            {item.poster_path && (
                                <img    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} 
                                alt={item.title || item.name}
                                style={{width: '100px'}}
                                />
                            )}
                            <p> {item.overview}</p>
                            </div>            
                    ))}
                </div>
                </div>

           
       
    );

}

export default Search;
