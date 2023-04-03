import { createSelector } from '@reduxjs/toolkit';
import { translateCategoryExpense } from 'helpers/translateCategoryExpense';
import { translateCategoryIncome } from 'helpers/translateCategoryIncome';
import { translateCategoryExpenseRU } from 'helpers/translateCategoryExpenseRU';
import { translateCategoryIncomeRU } from 'helpers/translateCategoryIncomeRU';
import { translateMonth } from 'helpers/translateMonth';

export const selectTransactionsExpenses = state => state.transactions.expenses;
export const selectTransactionsIncomes = state => state.transactions.incomes;

export const selectExpenseCategoryRU = state =>
  state.transactions.expenseCategory;
export const selectIncomeCategoryRU = state =>
  state.transactions.incomeCategory;

export const selectExpenseCategory = createSelector(
  [selectExpenseCategoryRU],
  categories => {
    return categories.map(category => translateCategoryExpense(category));
  }
);

export const selectIncomeCategory = createSelector(
  [selectIncomeCategoryRU],
  categories => {
    return categories.map(category => translateCategoryIncome(category));
  }
);

export const selectExpenseSummary = state => state.transactions.expenseMonth;
export const selectIncomeSummary = state => state.transactions.incomeMonth;

export const selectExpenseTotalSummary = createSelector(
  [selectExpenseSummary],
  expenses => {
    const arr = Object.keys(expenses);
    const arrKeys = arr.map(element => translateMonth(element));
    const arrValues = Object.values(expenses);
    let obj = {};
    arrKeys.forEach((key, value) => (obj[key] = arrValues[value]));
    const arrEntries = Object.entries(obj);
    let arrSummaryExpense = [];
    // eslint-disable-next-line no-unused-vars, array-callback-return
    const newArr = arrEntries.map(element => {
      if (!element.includes('N/A')) {
        arrSummaryExpense.push(element);
      }
    });
    const totalSummaryExpense = arrSummaryExpense.reduce(
      (previousValue, number) => {
        const total = (previousValue * 100 + number[1] * 100) / 100;
        return total;
      },
      0
    );
    arrSummaryExpense.reverse();
    return { totalSummaryExpense, arrSummaryExpense };
  }
);

export const selectIncomeTotalSummary = createSelector(
  [selectIncomeSummary],
  incomes => {
    const arr = Object.keys(incomes);
    const arrKeys = arr.map(element => translateMonth(element));
    const arrValues = Object.values(incomes);
    let obj = {};
    arrKeys.forEach((key, value) => (obj[key] = arrValues[value]));
    const arrEntries = Object.entries(obj);
    let arrSummaryIncome = [];
    // eslint-disable-next-line no-unused-vars, array-callback-return
    const newArr = arrEntries.map(element => {
      if (!element.includes('N/A')) {
        arrSummaryIncome.push(element);
      }
    });
    const totalSummaryIncome = arrSummaryIncome.reduce(
      (previousValue, number) => {
        const total = (previousValue * 100 + number[1] * 100) / 100;
        return total;
      },
      0
    );
    arrSummaryIncome.reverse();
    return { totalSummaryIncome, arrSummaryIncome };
  }
);

export const selectExpenses = state => state.transactions.expenses;
export const selectIncomes = state => state.transactions.incomes;

export const selectTotalExpenses = state =>
  state.transactions.totalExpenses.expenseTotal;
export const selectTotalIncomes = state =>
  state.transactions.totalIncomes.incomeTotal;

export const selectTotalExpensesMontn = state =>
  state.transactions.totalExpenses.expensesData;
export const selectTotalIncomesMonth = state =>
  state.transactions.totalIncomes.incomesData;

export const selectExpensesSort = createSelector(
  [selectTransactionsExpenses],
  expenses => {
    return [...expenses].sort((a, b) => (b['date'] > a['date'] ? 1 : -1));
  }
);

export const selectIncomesSort = createSelector(
  [selectTransactionsIncomes],
  incomes => {
    return [...incomes].sort((a, b) => (b['date'] > a['date'] ? 1 : -1));
  }
);

export const selectExpenseMonth = createSelector(
  [selectTotalExpensesMontn],
  expenses => {
    if (!expenses) {
      return;
    } else {
      const arr = Object.keys(expenses);
      const arrKeys = arr.map(element => translateCategoryExpense(element));
      const arrValues = Object.values(expenses).flatMap(val => val.total);
      let obj = {};
      arrKeys.forEach((key, value) => (obj[key] = arrValues[value]));
      const arrEntries = Object.entries(obj);
      const result = [...arrEntries].sort((a, b) => b[1] - a[1]);
      return result;
    }
  }
);

export const selectIncomeMonth = createSelector(
  [selectTotalIncomesMonth],
  incomes => {
    if (!incomes) {
      return;
    } else {
      const arr = Object.keys(incomes);
      const arrKeys = arr.map(element => translateCategoryIncome(element));
      const arrValues = Object.values(incomes).flatMap(val => val.total);
      let obj = {};
      arrKeys.forEach((key, value) => (obj[key] = arrValues[value]));
      const arrEntries = Object.entries(obj);
      const result = [...arrEntries].sort((a, b) => b[1] - a[1]);
      return result;
    }
  }
);

export const selectCurrentCategory = state => state.categoryFilter;
export const selectCurrentType = state => state.reportType;

export const selectCurrentCategoryChart = createSelector(
  [
    selectExpenseMonth,
    selectIncomeMonth,
    selectTotalExpensesMontn,
    selectTotalIncomesMonth,
    selectCurrentCategory,
    selectCurrentType,
  ],
  (startExpenses, startIncomes, expenses, incomes, category, type) => {
    let labelsName = [];
    let labelsValue = [];
    let currentObj;

    if (category === '') {
      type === 'expense'
        ? (currentObj = startExpenses)
        : (currentObj = startIncomes);

      // eslint-disable-next-line no-unused-vars
      const arrKey = currentObj.map(element => {
        labelsName.push(element[0]);
        return labelsName;
      });

      //  eslint-disable-next-line no-unused-vars
      const arrValue = currentObj.map(element => {
        labelsValue.push(element[1]);
        return labelsValue;
      });
    } else {
      type === 'expense'
        ? (currentObj = expenses[`${translateCategoryExpenseRU(category)}`])
        : (currentObj = incomes[`${translateCategoryIncomeRU(category)}`]);

      const arrEntries = Object.entries(currentObj);
      // eslint-disable-next-line no-unused-vars
      const remove = arrEntries.shift();
      const arr = arrEntries.sort((a, b) => a[1] - b[1]).reverse();

      // eslint-disable-next-line no-unused-vars
      const arrKey = arr.map(element => {
        labelsName.push(element[0]);
        return labelsName;
      });

      //  eslint-disable-next-line no-unused-vars
      const arrValue = arr.map(element => {
        labelsValue.push(element[1]);
        return labelsValue;
      });
    }
    return { labelsName, labelsValue };
  }
);
