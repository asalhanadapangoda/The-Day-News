import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = configuredApiUrl
  ? (configuredApiUrl.endsWith('/api/bangladesh')
      ? configuredApiUrl
      : configuredApiUrl.endsWith('/api')
        ? `${configuredApiUrl}/bangladesh`
        : `${configuredApiUrl.replace(/\/+$/, '')}/api/bangladesh`)
  : '/api/bangladesh';

const api = axios.create({
  baseURL,
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const bdAdminInfo = localStorage.getItem('bdAdminInfo');
    if (bdAdminInfo) {
      const parsedInfo = JSON.parse(bdAdminInfo);
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
