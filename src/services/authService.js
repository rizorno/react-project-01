import { privateAPI, publicAPI } from './http';

export const registerUserAPI = async user => {
  const { data } = await publicAPI.post('auth/register', user);
  return data;
};

export const registerGoogleAPI = async () => {
  const { data } = await privateAPI.get('auth/google');
  return data;
};

export const loginUserAPI = async user => {
  const { data } = await publicAPI.post('auth/login', user);
  return data;
};

export const refreshUserAPI = async sid => {
  const { data } = await privateAPI.post('auth/refresh', { sid });
  return data;
};

export const logoutUserAPI = async () => {
  const { data } = await privateAPI.post('auth/logout');
  return data;
};

export const getUserInfoAPI = async () => {
  const { data } = await privateAPI.get('user');
  return data;
};
