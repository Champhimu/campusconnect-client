import axios from "axios";

// Get JWT token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  return token;
};

// List of endpoints that do NOT require token
const publicEndpoints = [
  '/api/auth/login',
  '/api/auth/register'
];

// Create axios instance with default headers
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});

// Add JWT token to all requests except public endpoints
axiosInstance.interceptors.request.use(
  (config) => {
    // Skip token if request URL is in publicEndpoints
    const isPublic = publicEndpoints.some((url) => config.url.includes(url));
    if (!isPublic) {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;