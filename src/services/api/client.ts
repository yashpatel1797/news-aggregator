import axios from 'axios';
import { API_CONFIG } from '@/config/api';

export const newsApiClient = axios.create({
  baseURL: API_CONFIG.NEWS_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`
  }
});

export const guardianApiClient = axios.create({
  baseURL: API_CONFIG.GUARDIAN_API_BASE_URL,
  params: {
    'api-key': import.meta.env.VITE_GUARDIAN_API_KEY
  }
});

export const nytimesApiClient = axios.create({
  baseURL: API_CONFIG.NYTIMES_API_BASE_URL,
  params: {
    'api-key': import.meta.env.VITE_NYTIMES_API_KEY
  }
});