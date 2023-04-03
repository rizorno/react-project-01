import axios from 'axios';

export const privateAPI = axios.create({
  baseURL: 'https://kapusta-backend.goit.global/',
});

export const publicAPI = axios.create({
  baseURL: 'https://kapusta-backend.goit.global/',
});

// Utility to add JWT
export const setAuthHeader = token => {
  privateAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  privateAPI.defaults.headers.common.Authorization = '';
};
