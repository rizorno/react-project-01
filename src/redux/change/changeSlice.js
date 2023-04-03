import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const changeSlice = createSlice({
  name: 'change',
  initialState,
  reducers: {
    setChange: (_, { payload }) => payload,
  },
});

export const { setChange } = changeSlice.actions;
export const changeReducer = changeSlice.reducer;
