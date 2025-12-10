import { useEffect, useState } from 'react';
import { podcastAPI } from '../services/api';
import PodcastCard from '../components/common/PodcastCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const PodcastsPage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPodcasts();
  }, [currentPage, searchTerm]);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const data = await podcastAPI.getAll({
        page: currentPage,
        limit: 12,
        search: searchTerm,
      });
      setPodcasts(data.podcasts || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPodcasts();
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading && podcasts.length === 0) return <LoadingSpinner />;
  if (error && podcasts.length === 0) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Podcasts</h1>
        <p className="text-gray-600 mb-8">
          Discover our collection of insightful podcast episodes
        </p>

        {/* Search/Filter Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search podcasts..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Podcasts Grid */}
        {loading && podcasts.length > 0 ? (
          <LoadingSpinner />
        ) : podcasts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {podcasts.map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} showPlayIcon={true} />
              ))}
            </div>

            {/* Pagination / Load More */}
            {currentPage < totalPages && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No podcasts found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastsPage;

