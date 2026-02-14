const SkeletonCard = () => {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20">
            <div className="w-full h-64 bg-gray-700/50 animate-pulse"></div>
            <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-700/50 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-700/50 rounded animate-pulse w-1/4"></div>
                <div className="h-4 bg-gray-700/50 rounded animate-pulse w-1/2"></div>
                <div className="h-16 bg-gray-700/50 rounded animate-pulse"></div>
                <div className="flex gap-2">
                    <div className="h-10 bg-gray-700/50 rounded animate-pulse flex-1"></div>
                    <div className="h-10 bg-gray-700/50 rounded animate-pulse flex-1"></div>
                    <div className="h-10 bg-gray-700/50 rounded animate-pulse w-16"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;