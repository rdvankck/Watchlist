const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                        MERN Watchlist
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                        Movie & TV show watchlist application - Track your favorites, discover new content
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg 
font-semibold transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Get Started
                        </a>
                        <a href="/login" className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white
 px-8 py-4 rounded-xl text-lg font-semibold transition duration-300">
                            Login
                        </a>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition 
duration-300">
                        <div className="text-4xl mb-4">🎬</div>
                        <h3 className="text-2xl font-bold text-white mb-3">Search Movies</h3>
                        <p className="text-gray-300">Find your favorite movies and TV shows instantly</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition 
duration-300">
                        <div className="text-4xl mb-4">⭐</div>
                        <h3 className="text-2xl font-bold text-white mb-3">Track Favorites</h3>
                        <p className="text-gray-300">Build your personal watchlist and never miss a show</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition 
duration-300">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-2xl font-bold text-white mb-3">Secure Data</h3>
                        <p className="text-gray-300">Your watchlist is securely stored and synced</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;