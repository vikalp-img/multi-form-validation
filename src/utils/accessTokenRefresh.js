import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// interceptor is like a middleware for frontend requests that helps in handling request in between process , like token refresh here we are doing
api.interceptors.response.use(
  response => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/refresh') {
      originalRequest._retry = true;
      try {
        // Call backend refresh route (uses refreshToken cookie)
        const res = await api.get('/refresh');
        const newAccessToken = res?.data;

        // Save new access token (in localStorage or context)
        localStorage.setItem('accessToken', newAccessToken);

        // Update the failed request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry it
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }

    // If it's not 401, or already retried → just reject
    return Promise.reject(error);
  }
);

export default api;
