import 'dotenv/config'
import fetch from 'node-fetch';
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

  export const searchMulti = async (query) => {
      try {
          const response = await fetch(
              `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
          );

          if (!response.ok) {
            console.error('TMDB API Response Status:', response.status);
            throw new Error(`TMDB API request failed: ${response.status}`);
        }           

          const data = await response.json();

          return data.results.filter(
              (item) => item.media_type === 'movie' || item.media_type === 'tv'
          );
        } catch (error) {
            console.error('TMDB Search Error:', error);
            throw new Error(error.message);
        }
  };

  export const getMovieDetails = async (tmdbId) => {
      try {
          const response = await fetch(
              `${BASE_URL}/movie/${tmdbId}?api_key=${API_KEY}&language=en-US`
          );

          if (!response.ok) {
            console.error('TMDB API Response Status:', response.status);
            throw new Error(`TMDB API request failed: ${response.status}`);
        }
          
          

          const data = await response.json();
          return data;
      } catch (error) {
        console.error('TMDB Search Error:', error);
          throw new Error(error.message);
      }
  };

  export const getTVDetails = async (tmdbId) => {
      try {
          const response = await fetch(
              `${BASE_URL}/tv/${tmdbId}?api_key=${API_KEY}&language=en-US`
          );
          if (!response.ok) {
            console.error('TMDB API Response Status:', response.status);
            throw new Error(`TMDB API request failed: ${response.status}`);
        }

          const data = await response.json();
          return data;
      } catch (error) {
        console.error('TMDB Search Error:', error);
          throw new Error(error.message);
      }
  };