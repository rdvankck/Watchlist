import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchlist } from '../api/watchlist';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

function Stats() {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, isAuthenticated } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchStats();
    }, [isAuthenticated, navigate]);

    const fetchStats = async () => {
        try {
            const data = await getWatchlist(token);
            setWatchlist(data);
        } catch (err) {
            toast.error('Failed to load stats');
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        total: watchlist.length,
        watched: watchlist.filter(item => item.watched).length,
        toWatch: watchlist.filter(item => !item.watched).length,
        avgRating: watchlist.length > 0
            ? (watchlist.reduce((sum, item) => sum + (item.rating || 0), 0) / watchlist.length).toFixed(1)
            : 0,
        movies: watchlist.filter(item => item.mediaType === 'movie').length,
        tvShows: watchlist.filter(item => item.mediaType === 'tv').length
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading stats...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-white text-center mb-8">📊 My Statistics</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <StatCard title="Total" value={stats.total} icon="🎬" color="blue" />
                    <StatCard title="Watched" value={stats.watched} icon="✅" color="green" />
                    <StatCard title="To Watch" value={stats.toWatch} icon="⏳" color="yellow" />
                    <StatCard title="Avg Rating" value={stats.avgRating} icon="⭐" color="purple" />
                    <StatCard title="Movies" value={stats.movies} icon="🎥" color="blue" />
                    <StatCard title="TV Shows" value={stats.tvShows} icon="📺" color="purple" />
                </div>

               <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">Watch Progress</h3>
      <div className="w-full bg-gray-700 rounded-full h-6 mb-3 overflow-hidden">
          <div 
              className="bg-gradient-to-r from-green-500 to-emerald-400 h-6 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${stats.total > 0 ? (stats.watched / stats.total) * 100 : 0}%` }}
          >
              <div className="absolute inset-0  animate-pulse"></div>
          </div>
      </div>
      <div className="flex justify-between items-center">
          <p className="text-gray-400 text-sm">
              {stats.watched} of {stats.total} completed
          </p>
          <p className="text-green-400 font-bold text-lg">
              {stats.total > 0 ? Math.round((stats.watched / stats.total) * 100) : 0}%
          </p>
      </div>
  </div>
            </div>
        </div>
    );
}
const useCountUp = (end, duration = 500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [end, duration]);

    return count;
};

const StatCard = ({ title, value, icon, color }) => {
    const colors = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        yellow: 'from-yellow-500 to-yellow-600',
        purple: 'from-purple-500 to-purple-600'
    };

    const count = useCountUp(Number(value) || 0);

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center
            transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-white/40">
            <div className="text-3xl mb-2">{icon}</div>
            <div className={`text-3xl font-bold bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
                {title === 'Avg Rating' ? value : count}
            </div>
            <div className="text-gray-400 text-sm">{title}</div>
        </div>
    );
};

export default Stats;