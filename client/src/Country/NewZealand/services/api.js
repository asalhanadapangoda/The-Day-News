import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = configuredApiUrl
  ? (configuredApiUrl.endsWith('/api/newzealand')
      ? configuredApiUrl
      : configuredApiUrl.endsWith('/api')
        ? `${configuredApiUrl}/newzealand`
        : `${configuredApiUrl.replace(/\/+$/, '')}/api/newzealand`)
  : '/api/newzealand';

const api = axios.create({
  baseURL,
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const nzAdminInfo = localStorage.getItem('nzAdminInfo');
    if (nzAdminInfo) {
      const parsedInfo = JSON.parse(nzAdminInfo);
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
