import Watchlist from '../models/Watchlist.js';

  export const createWatchlistItem = async (req, res) => {
      try {
          const { tmdbId, mediaType, title, poster, releaseDate, overview, genres, streamingProviders } = req.body;

          if (!tmdbId || !mediaType || !title) {
              return res.status(400).json({ message: 'Please provide tmdbId, mediaType, and title' });
          }

          const existingItem = await Watchlist.findOne({
              user: req.user._id,
              tmdbId
          });

          if (existingItem) {
              return res.status(400).json({ message: 'Item already in watchlist' });
          }

          const item = await Watchlist.create({
              user: req.user._id,
              tmdbId,
              mediaType,
              title,
              poster,
              releaseDate,
              overview,
              genres,
              streamingProviders
          });

          res.status(201).json(item);
      } catch (error) {
          if (error.code === 11000) {
              return res.status(400).json({ message: 'Item already in watchlist' });
          }
          res.status(500).json({ message: error.message });
      }
  };

  export const getWatchlist = async (req, res) => {
      try {
          const { watched, mediaType } = req.query;

          const filter = { user: req.user._id };

          if (watched !== undefined) {
              filter.watched = watched === 'true';
          }

          if (mediaType) {
              filter.mediaType = mediaType;
          }

          const watchlist = await Watchlist.find(filter).sort({ createdAt: -1 });

          res.json(watchlist);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };

  export const updateWatchlistItem = async (req, res) => {
      try {
          const item = await Watchlist.findById(req.params.id);

          if (!item) {
              return res.status(404).json({ message: 'Item not found' });
          }

          if (item.user.toString() !== req.user._id.toString()) {
              return res.status(403).json({ message: 'Not authorized to update this item' });
          }

          const { rating, watched, thoughts, priority } = req.body;

          item.rating = rating !== undefined ? rating : item.rating;
          item.watched = watched !== undefined ? watched : item.watched;
          item.thoughts = thoughts !== undefined ? thoughts : item.thoughts;
          item.priority = priority !== undefined ? priority : item.priority;

          if (watched === true && !item.dateWatched) {
              item.dateWatched = new Date();
          }

          await item.save();

          res.json(item);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };

  export const deleteWatchlistItem = async (req, res) => {
      try {
          const item = await Watchlist.findById(req.params.id);

          if (!item) {
              return res.status(404).json({ message: 'Item not found' });
          }

          if (item.user.toString() !== req.user._id.toString()) {
              return res.status(403).json({ message: 'Not authorized to delete this item' });
          }

          await Watchlist.findByIdAndDelete(req.params.id);

          res.json({ message: 'Item deleted successfully' });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };