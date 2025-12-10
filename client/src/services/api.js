const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('token');
};

// Base fetch function
const fetchAPI = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Handle non-JSON responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || 'An error occurred');
    }

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Please make sure the backend is running.');
    }
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (username, password) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  getMe: () => fetchAPI('/auth/me'),
};

// Podcast API
export const podcastAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/podcasts?${queryString}`);
  },
  getById: (id) => fetchAPI(`/podcasts/${id}`),
  getLatest: () => fetchAPI('/podcasts/latest'),
  getFeatured: (limit = 3) => fetchAPI(`/podcasts/featured?limit=${limit}`),
  getRelated: (id) => fetchAPI(`/podcasts/${id}/related`),
  // Admin routes
  create: (data) =>
    fetchAPI('/podcasts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    fetchAPI(`/podcasts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    fetchAPI(`/podcasts/${id}`, {
      method: 'DELETE',
    }),
  getAllAdmin: () => fetchAPI('/podcasts/admin/all'),
};

export default API_URL;

