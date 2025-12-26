import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    tmdbId: {
        type: Number,
        required: true
    },
    mediaType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true
    },

    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        default: ''
    },
    releaseDate: {
        type: String,
        default: ''
    },
    overview: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    watched: {
        type: Boolean,
        default: false
    },
    dateWatched: {
        type: Date,
        default: null
    },
    thoughts: {
        type: String,
        default: '',
        maxlength: 1000
    },
    genres: {
        type: [String],
        default: []
    },
    streamingProviders: {
        type: [String],
        default: []
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
    }
}, {
    timestamps: true
});



watchlistSchema.index({ user: 1, tmdbId: 1 }, { unique: true });
export default mongoose.model('Watchlist', watchlistSchema);
