import { createSlice } from '@reduxjs/toolkit';

const initialState = 'expense';

const reportTypeSlice = createSlice({
  name: 'reportType',
  initialState,
  reducers: {
    setReportType: (_, { payload }) => payload,
  },
});

export const { setReportType } = reportTypeSlice.actions;
export const reportTypeReducer = reportTypeSlice.reducer;
