import axios from 'axios';

export const AUTH_TOKEN = 'token';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_GATEWAY}`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) config.headers.Authorization = token;
    return config;
  },
  error => {
    if (error?.response?.status === 403) {
      localStorage.removeItem(AUTH_TOKEN);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  config => config,
  error => {
    if (error?.response?.status === 403) {
      localStorage.removeItem(AUTH_TOKEN);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
