import { createSlice } from '@reduxjs/toolkit';
import {
  getPeriodDataThunk,
  getExpensesThunk,
  getIncomesThunk,
  getExpenseCategoriesThunk,
  getIncomeCategoriesThunk,
  addExpenseThunk,
  addIncomeThunk,
  deleteTransactionThunk,
} from './transactionOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    expenses: [],
    incomes: [],
    expenseMonth: {},
    incomeMonth: {},
    expenseCategory: [],
    incomeCategory: [],
    totalExpenses: {},
    totalIncomes: {},
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder

      //? get transactions by period

      .addCase(getPeriodDataThunk.pending, handlePending)
      .addCase(getPeriodDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalExpenses = action.payload.expenses;
        state.totalIncomes = action.payload.incomes;
      })
      .addCase(getPeriodDataThunk.rejected, handleRejected)

      //? get expenses

      .addCase(getExpensesThunk.pending, handlePending)
      .addCase(getExpensesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload.expenses;
        state.expenseMonth = action.payload.monthsStats;
      })
      .addCase(getExpensesThunk.rejected, handleRejected)

      //? get incomes

      .addCase(getIncomesThunk.pending, handlePending)
      .addCase(getIncomesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.incomes = action.payload.incomes;
        state.incomeMonth = action.payload.monthsStats;
      })
      .addCase(getIncomesThunk.rejected, handleRejected)

      //? add expense

      .addCase(addExpenseThunk.pending, handlePending)
      .addCase(addExpenseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.expenses = [...state.expenses, payload.transaction];
        //   state.expenses.currentState = payload.transaction;
      })
      .addCase(addExpenseThunk.rejected, handleRejected)

      //? add income

      .addCase(addIncomeThunk.pending, handlePending)
      .addCase(addIncomeThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.incomes = [...state.incomes, payload.transaction];
      })
      .addCase(addIncomeThunk.rejected, handleRejected)

      //? get expense categories

      .addCase(getExpenseCategoriesThunk.pending, handlePending)
      .addCase(getExpenseCategoriesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.expenseCategory = payload;
      })
      .addCase(getExpenseCategoriesThunk.rejected, handleRejected)

      //? get income categories

      .addCase(getIncomeCategoriesThunk.pending, handlePending)
      .addCase(getIncomeCategoriesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.incomeCategory = payload;
      })
      .addCase(getIncomeCategoriesThunk.rejected, handleRejected)

      //? delete transaction

      .addCase(deleteTransactionThunk.pending, handlePending)
      .addCase(deleteTransactionThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.expenses = state.expenses.filter(
          expence => expence._id !== payload
        );
        state.incomes = state.incomes.filter(income => income._id !== payload);
      })
      .addCase(deleteTransactionThunk.rejected, handleRejected);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
