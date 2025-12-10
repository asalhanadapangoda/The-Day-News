import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { podcastAPI } from '../services/api';
import PodcastCard from '../components/common/PodcastCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import AudioPlayer from '../components/common/AudioPlayer';
import logo from "../assets/thedaynews.png";


const HomePage = () => {
  const [featuredPodcasts, setFeaturedPodcasts] = useState([]);
  const [latestPodcast, setLatestPodcast] = useState(null);
  const [latestPodcasts, setLatestPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [featured, latest, latestList] = await Promise.all([
          podcastAPI.getFeatured(3),
          podcastAPI.getLatest(),
          podcastAPI.getAll({ limit: 6 }),
        ]);
        setFeaturedPodcasts(featured);
        setLatestPodcast(latest);
        setLatestPodcasts(latestList.podcasts || []);
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

  return (
    <div className="min-h-screen">
      {/* Hero/Featured Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-36">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Welcome to THE DAY NEWS</h2>
              <p className="text-xl mb-8 text-blue-100">
                සයිබර් අවකාශයේ ඔබේ මාධ්‍ය සහකරු <br /> Your Media Partner In Cyberspace
              </p>
            </div>

            <div>
              <img
                src={logo}
                alt="The Day News - Hero"
                className="w-120 h-72 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Featured Podcasts */}
          {featuredPodcasts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {featuredPodcasts.map((podcast) => (
                <div key={podcast._id} className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-2">{podcast.name}</h3>
                  <p className="text-blue-100 text-sm mb-4 line-clamp-2">
                    {podcast.description || podcast.shortDescription}
                  </p>
                  <Link
                    to={`/podcasts/${podcast._id}`}
                    className="text-white underline hover:text-blue-200"
                  >
                    Listen Now →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Podcast Widget */}
      {latestPodcast && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Podcast</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestPodcast.coverImage && (
                  <img
                    src={latestPodcast.coverImage}
                    alt={latestPodcast.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{latestPodcast.name}</h3>
                  <p className="text-gray-600 mb-4">{latestPodcast.description}</p>
                  {latestPodcast.audioUrl && (
                    <AudioPlayer audioUrl={latestPodcast.audioUrl} title={latestPodcast.name} />
                  )}
                  <Link
                    to={`/podcasts/${latestPodcast._id}`}
                    className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Full Episode
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Feed */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest</h2>
          {latestPodcasts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPodcasts.map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} showPlayIcon={true} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-12">No podcasts available yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

