import axios from 'axios';

// const HOST = window.location.origin;
// const apiURL = process.env.REACT_APP_API_RENDER_URL;
const api = axios.create({
   baseURL: `${process.env.REACT_APP_API_RENDER_URL || ''}/api`,
});

export default api;
