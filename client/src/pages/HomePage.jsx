import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { podcastAPI, upcomingAPI } from '../services/api';
import PodcastCard from '../components/common/PodcastCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const HomePage = () => {
  const [upcomingPodcasts, setUpcomingPodcasts] = useState([]);
  const [latestPodcasts, setLatestPodcasts] = useState([]);
  const [podcastsWithShortVideos, setPodcastsWithShortVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [upcoming, latestList] = await Promise.all([
          upcomingAPI.getAll(),
          podcastAPI.getAll({ limit: 100 }),
        ]);
        setUpcomingPodcasts(upcoming);
        // Sort by upload date (createdAt) and take only 4 for Latest section
        const sorted = (latestList.podcasts || [])
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setLatestPodcasts(sorted);
        
        // Get all podcasts with short videos for hero section
        const withShortVideos = (latestList.podcasts || [])
          .filter(p => p.shortVideoLink)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPodcastsWithShortVideos(withShortVideos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // Get upcoming podcasts (max 2)
  const displayUpcoming = upcomingPodcasts.slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero/Featured Section with Background Image - Keep existing top layout */}
      <section 
        className="relative text-white py-20 md:py-32 lg:py-40 gradient-blue-cyan"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-blue-900/50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-premium-lg drop-shadow-2xl">
              Welcome to THE DAY NEWS
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-100 drop-shadow-lg">
              Stay informed with the latest news and insightful podcasts
            </p>
          </div>

          {/* Short Videos Grid */}
          {podcastsWithShortVideos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto">
              {podcastsWithShortVideos.map((podcast, index) => (
                <div 
                  key={podcast._id} 
                  className="glass rounded-organic-lg p-5 md:p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-premium">{podcast.name}</h3>
                  {podcast.shortVideoLink && (
                    <div className="mb-4 rounded-organic overflow-hidden border border-white/20">
                      <iframe
                        src={podcast.shortVideoLink}
                        title={podcast.name}
                        className="w-full h-40 md:h-48"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  <p className="text-gray-100 text-sm md:text-base line-clamp-2 leading-relaxed">
                    {podcast.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

     

      {/* Upcoming Podcasts Section */}
      {displayUpcoming.length > 0 && (
        <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 gradient-blue-cyan opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-10 md:mb-12 text-center text-premium-lg">
              Upcoming Podcasts
            </h2>
            <div className={`max-w-7xl mx-auto ${displayUpcoming.length === 1 ? 'max-w-4xl' : ''}`}>
              <div className={`grid gap-6 md:gap-8 ${displayUpcoming.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {displayUpcoming.map((upcoming, index) => (
                  <div 
                    key={upcoming._id} 
                    className="glass-card rounded-organic-lg overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {upcoming.photo && (
                      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                        <img
                          src={upcoming.photo}
                          alt={upcoming.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6 md:p-8 lg:p-10">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 text-premium">
                        {upcoming.name}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {upcoming.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Feed */}
      <section className="py-16 md:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-10 md:mb-12 text-center text-premium-lg">
            Latest
          </h2>
          {latestPodcasts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
              {latestPodcasts.map((podcast, index) => (
                <div 
                  key={podcast._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PodcastCard podcast={podcast} showPlayIcon={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <p className="text-gray-600 text-lg md:text-xl">No podcasts available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

