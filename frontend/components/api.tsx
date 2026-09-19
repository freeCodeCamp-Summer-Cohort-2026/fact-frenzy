import axios from 'axios';

// 1. Configure API base URL
const api = axios.create({
  baseURL: 'http://localhost:8000',
   headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptors for Authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Interceptors for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;