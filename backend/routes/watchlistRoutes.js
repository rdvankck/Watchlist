import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    createWatchlistItem,
    getWatchlist,
    updateWatchlistItem,
    deleteWatchlistItem
} from '../controllers/watchlistController.js';

const router = express.Router();

router.use(protect);

router.post('/', createWatchlistItem);
router.get('/', getWatchlist);
router.put('/:id', updateWatchlistItem);
router.delete('/:id', deleteWatchlistItem);

export default router;