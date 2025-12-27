import {searchMulti, getMovieDetails, getTVDetails} from '../services/tmdbService.js';

export const search = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Please provide a search query' });
        }
        const results = await searchMulti(query);
        res.json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error){
        res.status(500).json({ message: error.message });
    }
};

export const getMovie = async (req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({ message: 'Please provide a movie ID'});
        }

        const movie = await getMovieDetails(id);
        res.json({
            success: true,
            data: movie
        });
    } catch (error){
        res.status(500).json({ message: error.message });
    }
};

export const getTV = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Please provide a TV show ID' }); 
        }
         const show = await getTVDetails(id);

         res.json({
            success: true,
            data: show
         });
    } catch (error){
        res.status(500).json({ message: error.message });
    }
};