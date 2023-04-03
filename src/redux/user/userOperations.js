import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateBalanceAPI } from 'services/transactionService';

export const updateBalanceThunk = createAsyncThunk(
  'user/addBalance',
  async (balance, { rejectWithValue }) => {
    try {
      const newBalance = await updateBalanceAPI(balance);
      return newBalance;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
