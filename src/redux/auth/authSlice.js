import { createSlice } from '@reduxjs/toolkit';
import {
  signUpThunk,
  googleAuthThunk,
  loginThunk,
  getUserThunk,
  refreshThunk,
  logoutThunk,
} from './authOperations';

const initialState = {
  accessToken: null,
  refreshToken: null,
  sid: null,
  userEmail: null,
  balance: null,
  isLoading: false,
  isLogin: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: builder => {
    builder
      //? signUp

      .addCase(signUpThunk.pending, handlePending)
      .addCase(signUpThunk.fulfilled, state => {
        state.error = null;
      })
      .addCase(signUpThunk.rejected, handleRejected)

      //? google auth

      .addCase(googleAuthThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLogin = true;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.sid = payload.sid;
        state.userEmail = null;
        state.balance = null;
        state.error = null;
      })

      //? login

      .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLogin = true;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.sid = payload.sid;
        state.userEmail = payload.userData.email;
        state.balance = payload.userData.balance;
        state.error = null;
      })
      .addCase(loginThunk.rejected, handleRejected)

      //? refresh

      .addCase(refreshThunk.pending, handlePending)
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLogin = true;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.sid = payload.sid;
        state.userEmail = payload.email;
        state.balance = payload.balance;
        state.error = null;
      })
      .addCase(refreshThunk.rejected, handleRejected)

      //? logout

      .addCase(logoutThunk.pending, handlePending)
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(logoutThunk.rejected, handleRejected)

      //? get User info

      .addCase(getUserThunk.pending, handlePending)
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userEmail = payload.email;
        state.balance = payload.balance;
        state.error = null;
      })
      .addCase(getUserThunk.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
