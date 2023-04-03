import { privateAPI } from './http';

export const getPeriodDataAPI = async period => {
  const { data } = await privateAPI.get(
    `transaction/period-data?date=${period}`
  );
  return data;
};

export const getExpensesAPI = async () => {
  const { data } = await privateAPI.get('transaction/expense');
  return data;
};

export const getIncomesAPI = async () => {
  const { data } = await privateAPI.get('transaction/income');
  return data;
};

export const getExpenseCategoriesAPI = async () => {
  const { data } = await privateAPI.get('transaction/expense-categories');
  return data;
};

export const getIncomeCategoriesAPI = async () => {
  const { data } = await privateAPI.get('transaction/income-categories');
  return data;
};

export const addExpenseAPI = async newExpense => {
  const { data } = await privateAPI.post('transaction/expense', newExpense);
  return data;
};

export const addIncomeAPI = async newIncome => {
  console.log();
  const { data } = await privateAPI.post('transaction/income', newIncome);
  return data;
};

export const deleteTransactionAPI = async id => {
  const { data } = await privateAPI.delete(`transaction/${id}`);
  return data;
};

export const updateBalanceAPI = async newBalance => {
  const { data } = await privateAPI.patch('user/balance', newBalance);
  return data;
};
