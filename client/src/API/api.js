import axios from 'axios';
// let HOST = window.location.origin;

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

axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         console.log('You are not logged in');
         localStorage.removeItem('userToken');
         window.location.href = '/SignIn';
         return Promise.reject(error);
      }
      return Promise.reject(error);
   },
);

export default axiosInstance;
