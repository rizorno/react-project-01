import { createSelector } from '@reduxjs/toolkit';
import { selectExpensesSort } from 'redux/transaction/transactionSelectors';
import { selectIncomesSort } from 'redux/transaction/transactionSelectors';

export const selectChange = state => state.change;

export const selectChangeExpense = createSelector(
  [selectExpensesSort, selectChange],
  (expenses, change) => {
    const elementId = change['_id'];
    const result = expenses.find(expense => expense['_id'] === elementId);
    return result;
  }
);

export const selectChangeIncome = createSelector(
  [selectIncomesSort, selectChange],
  (incomes, change) => {
    const elementId = change['_id'];
    const result = incomes.find(income => income['_id'] === elementId);
    return result;
  }
);
