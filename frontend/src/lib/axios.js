import axios from 'axios';  

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://sign-language-dictionary.onrender.com/api',
  withCredentials: true, // Enable sending cookies with requests
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    
  },    
});