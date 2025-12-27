import axios from "axios";

const API_URL = 'http://localhost:5001/api/watchlist';


export const getWatchlist = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {Authorization:  `Bearer ${token}`}
    });
    return response.data;
};

export const addToWatchlist = async (itemData, token) => {
    const response = await axios.post(API_URL, itemData, {
        headers: {Authorization:  `Bearer ${token}`};
    });
    return response.data;
};

export const updateWatchlistItem = async (id, itemData, token) => {
    const response = await axios.put( `${API_URL}/${id}`, itemData, {
        headers: {Authorization:  `Bearer ${token}`};
    });
    return response.data;
};

export const deleteFromWatchlist = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`,{
        headers: {Authorization:  `Bearer ${token}`}
    });
};
