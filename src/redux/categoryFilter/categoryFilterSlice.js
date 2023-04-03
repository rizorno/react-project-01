import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const categoryFilterSlice = createSlice({
  name: 'categoryFilter',
  initialState,
  reducers: {
    setCategoryFilter: (_, { payload }) => payload,
  },
});

export const { setCategoryFilter } = categoryFilterSlice.actions;
export const categoryFilterReducer = categoryFilterSlice.reducer;
