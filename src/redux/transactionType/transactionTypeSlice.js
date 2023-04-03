import { createSlice } from '@reduxjs/toolkit';

const initialState = 'expense';

const transactionTypeSlice = createSlice({
  name: 'transactionType',
  initialState,
  reducers: {
    setTransactionType: (_, { payload }) => payload,
  },
});

export const { setTransactionType } = transactionTypeSlice.actions;
export const transactionTypeReducer = transactionTypeSlice.reducer;
