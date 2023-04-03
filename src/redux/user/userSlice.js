import { createSlice } from '@reduxjs/toolkit';
import { updateBalanceThunk } from './userOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    newBalance: null,
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder.addCase(updateBalanceThunk.pending, handlePending);
    builder.addCase(updateBalanceThunk.fulfilled, (state, action) => {
      state.newBalance = Number(action.payload.newBalance);
      state.isLoading = false;
    });
    builder.addCase(updateBalanceThunk.rejected, handleRejected);
  },
});

export const userReducer = userSlice.reducer;
