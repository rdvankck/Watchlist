import axios from "axios";

const API_URL = 'http://localhost:5001/api/tmdb';

export const searchMulti = async (query) => {
    const response = await axios.get(`${API_URL}/search?query=${query}`);
    return response.data;
};

export const getMovieDetails = async (id) => {

    const response = await axios.get(`${API_URL}/movie/${id}`);
    return response.data;
};

export const getTvDetails = async (id) => {
    const response = await axios.get(`${API_URL}/tv/${id}`);
    return response.data;
};