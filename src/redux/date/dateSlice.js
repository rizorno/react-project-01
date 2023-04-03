import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (_, { payload }) => payload,
  },
});

export const { setDate } = dateSlice.actions;
export const dateReducer = dateSlice.reducer;
