import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearAuthHeader, setAuthHeader } from 'services/http';
import {
  registerUserAPI,
  loginUserAPI,
  refreshUserAPI,
  logoutUserAPI,
  getUserInfoAPI,
} from 'services/authService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (data, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const result = await registerUserAPI(data);
      Notify.success('SignUp is success!');
      Loading.remove();
      return result;
    } catch (error) {
      Notify.failure(`${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

export const googleAuthThunk = createAsyncThunk(
  'auth/googleAuth',
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      Notify.failure(`${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const result = await loginUserAPI(data);
      setAuthHeader(result.accessToken);
      Notify.success('Login is success!');
      Loading.remove();
      return result;
    } catch (error) {
      Notify.failure(`${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const result = await logoutUserAPI();
      clearAuthHeader();
      Notify.success('Logout is success!');
      Loading.remove();
      return result;
    } catch (error) {
      Notify.failure(`${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.refreshToken;
      const sid = getState().auth.sid;
      setAuthHeader(token);
      if (token === null) {
        return rejectWithValue('No token!');
      }
      const res = await refreshUserAPI(sid);
      setAuthHeader(res.newAccessToken);
      const result = await getUserInfoAPI();
      return {
        email: result.email,
        balance: result.balance,
        accessToken: res.newAccessToken,
        refreshToken: res.newRefreshToken,
        sid: res.newSid,
      };
    } catch (error) {
      Notify.failure(`${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;
      if (!token) {
        return rejectWithValue('No token!');
      }
      const result = await getUserInfoAPI();
      setAuthHeader(token);
      return result;
    } catch (error) {
      Notify.failure(`${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);
