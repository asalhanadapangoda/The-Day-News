import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = configuredApiUrl
  ? (configuredApiUrl.endsWith('/api/australia')
      ? configuredApiUrl
      : configuredApiUrl.endsWith('/api')
        ? `${configuredApiUrl}/australia`
        : `${configuredApiUrl.replace(/\/+$/, '')}/api/australia`)
  : '/api/australia';

const api = axios.create({
  baseURL,
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const auAdminInfo = localStorage.getItem('auAdminInfo');
    if (auAdminInfo) {
      const parsedInfo = JSON.parse(auAdminInfo);
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
