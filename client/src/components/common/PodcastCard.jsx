import { Link } from 'react-router-dom';

const PodcastCard = ({ podcast, showPlayIcon = true }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateText = (text, length = 150) => {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <div className="glass-card rounded-organic overflow-hidden animate-fade-in">
      <Link to={`/podcasts/${podcast._id}`}>
        {podcast.thumbnail && (
          <div className="relative h-48 md:h-56 bg-gradient-to-br from-blue-100 to-cyan-100 overflow-hidden">
            <img
              src={podcast.thumbnail}
              alt={podcast.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            {showPlayIcon && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 glass rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 glow-blue-hover border-2 border-white/30">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-blue-600 ml-1 drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-2 text-premium">{podcast.name}</h3>
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 leading-relaxed">
            {truncateText(podcast.description || podcast.shortDescription)}
          </p>
          <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 mb-4">
            <span className="font-medium">{formatDate(podcast.createdAt)}</span>
            {podcast.duration && <span className="px-2 py-1 glass-blue rounded-full text-xs">{podcast.duration}</span>}
          </div>
        </div>
      </Link>
      <div className="px-5 md:px-6 pb-5 md:pb-6">
        {podcast.fullVideoLink ? (
          <a
            href={podcast.fullVideoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2.5 btn-liquid rounded-full text-white font-medium text-sm md:text-base ripple"
          >
            View Full Episode
          </a>
        ) : (
          <Link
            to={`/podcasts/${podcast._id}`}
            className="block w-full text-center px-4 py-2.5 btn-liquid rounded-full text-white font-medium text-sm md:text-base ripple"
          >
            View Full Episode
          </Link>
        )}
      </div>
    </div>
  );
};

export default PodcastCard;

