import axios from 'axios';  

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://sign-language-dictionary.onrender.com/api',
  withCredentials: true, // Enable sending cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },    
});