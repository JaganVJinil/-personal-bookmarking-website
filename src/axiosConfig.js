// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Placeholder — not used in this project
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can use this instance for future backend integration
export default axiosInstance;
