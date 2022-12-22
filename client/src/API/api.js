import axios from 'axios';

// let HOST = window.location.origin;
// baseURL: `${'http://localhost:3001'}/api`,

const axiosInstance = axios.create({
   baseURL: `${process.env.REACT_APP_API_RENDER_URL || ''}/api`,
   headers: {
      'Content-Type': 'application/json',
   },
});

axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('userToken');
      if (token && config.headers) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

export default axiosInstance;
