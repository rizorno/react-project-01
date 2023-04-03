import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPeriodDataAPI,
  getExpensesAPI,
  getIncomesAPI,
  getExpenseCategoriesAPI,
  getIncomeCategoriesAPI,
  addExpenseAPI,
  addIncomeAPI,
  deleteTransactionAPI,
} from 'services/transactionService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const getPeriodDataThunk = createAsyncThunk(
  'period/getPeriodData',
  async (date, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const data = await getPeriodDataAPI(date);
      Loading.remove();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getExpensesThunk = createAsyncThunk(
  'transitionExpense/getExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getExpensesAPI();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getIncomesThunk = createAsyncThunk(
  'transitionIncome/getIncomes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIncomesAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getExpenseCategoriesThunk = createAsyncThunk(
  'categoryExpense/getExpenseCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getExpenseCategoriesAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getIncomeCategoriesThunk = createAsyncThunk(
  'categoryIncome/getIncomeCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIncomeCategoriesAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addExpenseThunk = createAsyncThunk(
  'newExpenses/addExpense',
  async (newExpense, { rejectWithValue }) => {
    try {
      const data = await addExpenseAPI(newExpense);
      return data;
    } catch (error) {
      Notify.failure('Something went wrong, please try again later');
      return rejectWithValue(error.message);
    }
  }
);

export const addIncomeThunk = createAsyncThunk(
  'newIncome/addIcome',
  async (newIncome, { rejectWithValue }) => {
    try {
      const data = await addIncomeAPI(newIncome);
      return data;
    } catch (error) {
      Notify.failure('Something went wrong, please try again later');
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransactionThunk = createAsyncThunk(
  'delateExpenses/delateTransaction',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTransactionAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
