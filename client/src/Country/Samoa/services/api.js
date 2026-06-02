import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = configuredApiUrl
  ? (configuredApiUrl.endsWith('/api/samoa')
      ? configuredApiUrl
      : configuredApiUrl.endsWith('/api')
        ? `${configuredApiUrl}/samoa`
        : `${configuredApiUrl.replace(/\/+$/, '')}/api/samoa`)
  : '/api/samoa';

const api = axios.create({
  baseURL,
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const smAdminInfo = localStorage.getItem('smAdminInfo');
    if (smAdminInfo) {
      const parsedInfo = JSON.parse(smAdminInfo);
      if (parsedInfo.token) {
        config.headers.Authorization = `Bearer ${parsedInfo.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
