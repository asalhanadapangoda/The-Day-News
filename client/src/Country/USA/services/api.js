import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = configuredApiUrl
  ? (configuredApiUrl.endsWith('/api/usa')
      ? configuredApiUrl
      : configuredApiUrl.endsWith('/api')
        ? `${configuredApiUrl}/usa`
        : `${configuredApiUrl.replace(/\/+$/, '')}/api/usa`)
  : '/api/usa';

const api = axios.create({
  baseURL,
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const usAdminInfo = localStorage.getItem('usAdminInfo');
    if (usAdminInfo) {
      const parsedInfo = JSON.parse(usAdminInfo);
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
