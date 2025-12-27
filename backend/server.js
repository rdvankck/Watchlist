import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import tmdbRoutes from './routes/tmdbRoutes.js';
import { protect } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
//app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/test', protect, (req, res) => {
    res.json({
        message: 'Protected route accessed!',
        user: req.user
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/tmdb', tmdbRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});