import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { podcastAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const UpdatePodcast = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    shortVideoLink: '',
    fullVideoLink: '',
    audioUrl: '',
    thumbnail: '',
    coverImage: '',
    duration: '',
    showNotes: '',
    transcript: '',
    host: '',
    guest: '',
    tags: '',
    featured: false,
    published: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchPodcast();
  }, [id]);

  const fetchPodcast = async () => {
    try {
      setFetching(true);
      const podcast = await podcastAPI.getById(id);
      setFormData({
        ...podcast,
        tags: podcast.tags ? podcast.tags.join(', ') : '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag)
        : [];

      const podcastData = {
        ...formData,
        tags: tagsArray,
      };

      await podcastAPI.update(id, podcastData);
      navigate('/admin/dashboard/edit-podcast');
    } catch (err) {
      setError(err.message || 'Failed to update podcast');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Podcast</h2>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Podcast Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Podcast Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="shortDescription" className="block text-gray-700 font-medium mb-2">
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="shortVideoLink" className="block text-gray-700 font-medium mb-2">
              Short Video Link
            </label>
            <input
              type="url"
              id="shortVideoLink"
              name="shortVideoLink"
              value={formData.shortVideoLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="fullVideoLink" className="block text-gray-700 font-medium mb-2">
              Full Video Link
            </label>
            <input
              type="url"
              id="fullVideoLink"
              name="fullVideoLink"
              value={formData.fullVideoLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="audioUrl" className="block text-gray-700 font-medium mb-2">
            Audio URL
          </label>
          <input
            type="url"
            id="audioUrl"
            name="audioUrl"
            value={formData.audioUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="thumbnail" className="block text-gray-700 font-medium mb-2">
              Thumbnail URL
            </label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-gray-700 font-medium mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">
            Duration (e.g., "45:30")
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="showNotes" className="block text-gray-700 font-medium mb-2">
            Show Notes
          </label>
          <textarea
            id="showNotes"
            name="showNotes"
            value={formData.showNotes}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="host" className="block text-gray-700 font-medium mb-2">
            Host
          </label>
          <input
            type="text"
            id="host"
            name="host"
            value={formData.host}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="guest" className="block text-gray-700 font-medium mb-2">
            Guest
          </label>
          <input
            type="text"
            id="guest"
            name="guest"
            value={formData.guest}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="news, politics, technology"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Featured</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Published</span>
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Podcast'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard/edit-podcast')}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePodcast;

