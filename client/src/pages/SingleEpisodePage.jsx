import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { podcastAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import AudioPlayer from '../components/common/AudioPlayer';
import PodcastCard from '../components/common/PodcastCard';

const SingleEpisodePage = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [relatedPodcasts, setRelatedPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcast();
  }, [id]);

  const fetchPodcast = async () => {
    try {
      setLoading(true);
      const [podcastData, related] = await Promise.all([
        podcastAPI.getById(id),
        podcastAPI.getRelated(id),
      ]);
      setPodcast(podcastData);
      setRelatedPodcasts(related);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(podcast.name)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!podcast) return <ErrorMessage message="Podcast not found" />;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Episode Header */}
        <div className="mb-8">
          {podcast.coverImage && (
            <img
              src={podcast.coverImage}
              alt={podcast.name}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{podcast.name}</h1>
          {podcast.description && (
            <p className="text-xl text-gray-600 mb-4">{podcast.description}</p>
          )}
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <span>{formatDate(podcast.createdAt)}</span>
            {podcast.duration && <span>• {podcast.duration}</span>}
          </div>
        </div>

        {/* Audio Player */}
        {podcast.audioUrl && (
          <div className="mb-8">
            <AudioPlayer audioUrl={podcast.audioUrl} title={podcast.name} />
          </div>
        )}

        {/* Host/Guest Info */}
        {(podcast.host || podcast.guest) && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Episode Details</h3>
            <div className="space-y-2">
              {podcast.host && (
                <p>
                  <span className="font-medium">Host:</span> {podcast.host}
                </p>
              )}
              {podcast.guest && (
                <p>
                  <span className="font-medium">Guest:</span> {podcast.guest}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {podcast.tags && podcast.tags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {podcast.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Buttons */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Share this episode</h3>
          <div className="flex space-x-4">
            <button
              onClick={shareOnFacebook}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
            <button
              onClick={shareOnTwitter}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <span>Twitter</span>
            </button>
            <button
              onClick={copyLink}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy Link</span>
            </button>
          </div>
        </div>

        {/* Show Notes / Transcript */}
        {(podcast.showNotes || podcast.transcript) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Show Notes</h2>
            <div className="prose max-w-none">
              {podcast.showNotes && (
                <div className="text-gray-700 whitespace-pre-line mb-4">{podcast.showNotes}</div>
              )}
              {podcast.transcript && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transcript</h3>
                  <div className="text-gray-700 whitespace-pre-line">{podcast.transcript}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related Episodes */}
        {relatedPodcasts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Episodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPodcasts.map((related) => (
                <PodcastCard key={related._id} podcast={related} showPlayIcon={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleEpisodePage;

