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
    <Link
      to={`/podcasts/${podcast._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      {podcast.thumbnail && (
        <div className="relative h-48 bg-gray-200">
          <img
            src={podcast.thumbnail}
            alt={podcast.name}
            className="w-full h-full object-cover"
          />
          {showPlayIcon && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <svg
                  className="w-8 h-8 text-blue-600 hover:text-white ml-1"
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
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{podcast.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateText(podcast.description || podcast.shortDescription)}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{formatDate(podcast.createdAt)}</span>
          {podcast.duration && <span>{podcast.duration}</span>}
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard;

