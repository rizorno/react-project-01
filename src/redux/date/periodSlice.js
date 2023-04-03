import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const periodSlice = createSlice({
  name: 'period',
  initialState,
  reducers: {
    setPeriod: (_, { payload }) => payload,
  },
});

export const { setPeriod } = periodSlice.actions;
export const periodReducer = periodSlice.reducer;
