# MERN Watchlist Application

A full-stack movie and TV show watchlist application built with the MERN stack (MongoDB, Express, React, Node.js)

## Features

- **User Authentication** - JWT-based authentication with secure password hashing
- **Search Movies & TV Shows** - Powered by TMDB API
- **Personal Watchlist** - Add, edit, delete items with ratings and thoughts
- **Watched Status** - Mark items as watched with confetti celebration
- **Statistics Dashboard** - View your watching statistics with animated counters
- **Export Feature** - Export your watchlist as JSON or CSV
- **Dark/Light Theme** - Toggle between themes
- **Infinite Scroll** - Smooth scrolling experience
- **Responsive Design** - Works on desktop and mobile

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Axios
- Canvas Confetti

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### External API
- [TMDB (The Movie Database)](https://www.themoviedb.org/) API

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- TMDB API Key

### Clone the repository
```bash
git clone https://github.com/rdvankck/Watchlist.git
cd Watchlist
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```

Start the backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:
```
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Start the frontend:
```bash
npm run dev
```

## Usage

1. Register a new account or login
2. Search for movies and TV shows
3. Add items to your watchlist
4. Mark items as watched, add ratings and thoughts
5. View your statistics on the Stats page
6. Export your watchlist as JSON or CSV

## Project Structure

```
Watchlist/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── App.jsx
│   └── public/
├── progress.md
└── README.md
```

## Screenshots

The application features a modern dark theme with gradient backgrounds, glassmorphism effects, and smooth animations.

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Watchlist
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add item to watchlist
- `PUT /api/watchlist/:id` - Update watchlist item
- `DELETE /api/watchlist/:id` - Delete watchlist item

### TMDB
- `GET /api/tmdb/search` - Search movies and TV shows

## License

MIT

## Author

[rdvankck](https://github.com/rdvankck)
