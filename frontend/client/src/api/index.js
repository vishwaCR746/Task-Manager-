// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://task-manager-kxd7.onrender.com/api', // ✅ updated to Render backend
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
