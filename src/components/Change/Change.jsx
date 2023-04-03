import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import SharedButton from 'commons/sharedButton/SharedButton';
import { getUserBalance } from 'redux/auth/authSelectors';
import { getBalance } from 'redux/user/userSelectors';
import {
  getExpensesThunk,
  getIncomesThunk,
  addExpenseThunk,
  addIncomeThunk,
  deleteTransactionThunk,
} from 'redux/transaction/transactionOperations';
import { updateBalanceThunk } from 'redux/user/userOperations';
import {
  selectExpenseCategory,
  selectIncomeCategory,
} from 'redux/transaction/transactionSelectors';
import {
  selectChange,
  selectChangeExpense,
  selectChangeIncome,
} from 'redux/change/changeSelector';
import { selectTransactionType } from 'redux/transactionType/transactionTypeSelector';
import { setChange } from 'redux/change/changeSlice';
import { translateCategoryExpenseRU } from 'helpers/translateCategoryExpenseRU';
import { translateCategoryIncomeRU } from 'helpers/translateCategoryIncomeRU';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './change.module.scss';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Change = () => {
  const transactionType = useSelector(selectTransactionType);
  const change = useSelector(selectChange);
  const initialChangeExpense = useSelector(selectChangeExpense);
  const initialChangeIncome = useSelector(selectChangeIncome);
  const balanceAuth = useSelector(getUserBalance);
  const balanceUser = useSelector(getBalance);
  const categoryExpense = useSelector(selectExpenseCategory);
  const categoryIncome = useSelector(selectIncomeCategory);
  const dispatch = useDispatch();

  //? get the date from the selected transaction
  let parseDate;
  transactionType === 'expense'
    ? (parseDate = initialChangeExpense.date)
    : (parseDate = initialChangeIncome.date);
  const moment = require('moment');
  const getDate = moment(parseDate)['_d'];
  const [startDate, setStartDate] = useState(getDate);

  //? get the id from the selected transaction
  const transactionId = change['_id'];

  useEffect(() => {
    //? close the modal window with ESC
    const closeBtnEscBackdrop = ({ code }) => {
      if (code === 'Escape') {
        dispatch(setChange(''));
      }
    };
    window.addEventListener('keydown', closeBtnEscBackdrop);
    return () => {
      window.removeEventListener('keydown', closeBtnEscBackdrop);
    };
  });

  //? close the modal window by click on the backdrop
  const closeBtnEscBackdrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      dispatch(setChange(''));
    }
  };

  //? dispatch data from the modal

  const handleChangeDate = () => {
    const parseData = Date.parse(startDate);
    const moment = require('moment');
    const getDate = moment(parseData);
    const result = getDate.format('YYYY-MM-DD');
    dispatch(setChange({ ...change, date: result }));
  };

  const handleChangeDescription = e => {
    const { value } = e.target;
    dispatch(setChange({ ...change, description: value }));
  };

  const handleChangeCategory = e => {
    const { value } = e.target;
    dispatch(setChange({ ...change, category: value }));
  };

  const handleChangeAmount = e => {
    const { value } = e.target;
    dispatch(setChange({ ...change, amount: value }));
  };

  //? submit data
  const onSubmitForm = async e => {
    e.preventDefault();

    if (transactionType === 'expense') {
      if (
        initialChangeExpense.date === change.date &&
        initialChangeExpense.description === change.description &&
        initialChangeExpense.category === change.category &&
        initialChangeExpense.amount === change.amount
      ) {
        Notify.warning('Try to change something first.');
        return;
      }
    }

    if (transactionType === 'income') {
      if (
        initialChangeIncome.date === change.date &&
        initialChangeIncome.description === change.description &&
        initialChangeIncome.category === change.category &&
        initialChangeIncome.amount === change.amount
      ) {
        Notify.warning('Try to change something first.');
        return;
      }
    }

    Notify.success('The transaction has been successfully changed.');
    dispatch(setChange(''));

    //? delete the selected transaction
    dispatch(deleteTransactionThunk(transactionId));

    //? collect data from the form
    const transaction = {
      date: change.date,
      description: change.description,
      category: change.category,
      amount: Number(change.amount),
    };

    //? get existing transactions and update balance
    let newBalance;
    if (transactionType === 'expense') {
      await dispatch(addExpenseThunk(transaction));

      newBalance =
        balanceUser === null
          ? balanceAuth +
            Number(initialChangeExpense.amount) -
            Number(change.amount)
          : balanceUser +
            Number(initialChangeExpense.amount) -
            Number(change.amount);
      await dispatch(getExpensesThunk());
    } else if (transactionType === 'income') {
      await dispatch(addIncomeThunk(transaction));
      newBalance =
        balanceUser === null
          ? balanceAuth -
            Number(initialChangeIncome.amount) +
            Number(change.amount)
          : balanceUser -
            Number(initialChangeIncome.amount) +
            Number(change.amount);
      await dispatch(getIncomesThunk());
    }
    await dispatch(updateBalanceThunk({ newBalance }));
  };

  const template = (
    <div className={css['overlay']} onClick={closeBtnEscBackdrop}>
      <div className={css['change-modal']}>
        <h2 className={css['contacts-subtitle']}>Change transaction</h2>
        <button
          type="button"
          className={css['change-modal__btn-close']}
          aria-label="Close"
          onClick={closeBtnEscBackdrop}
        />

        <form className={css['change-form']} onSubmit={onSubmitForm}>
          <label className={css['change-label']}>Date</label>

          <DatePicker
            dateFormat="dd.MM.yyyy"
            selected={startDate}
            onChange={date => setStartDate(date)}
            onCalendarClose={handleChangeDate}
            className={css['calendar-input']}
          />

          <label className={css['change-label']}>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description..."
            autoComplete="off"
            className={css['change-input']}
            value={change.description}
            onChange={handleChangeDescription}
          />

          <label className={css['change-label']}>Category</label>
          <select
            type="text"
            name="category"
            className={css['change-input']}
            value={change.category}
            onChange={handleChangeCategory}
          >
            {transactionType === 'expense' ? (
              <>
                <option value="category">Product category</option>
                {categoryExpense.map(item => (
                  <option key={item} value={translateCategoryExpenseRU(item)}>
                    {item}
                  </option>
                ))}
              </>
            ) : (
              <>
                <option value="category">Type of income</option>
                {categoryIncome.map(item => (
                  <option key={item} value={translateCategoryIncomeRU(item)}>
                    {item}
                  </option>
                ))}
              </>
            )}
          </select>

          <label className={css['change-label']}>Amount</label>
          <input
            // type="number"
            name="amount"
            pattern="/^[\d]+(\,[\d]+)?$/"
            placeholder="Amount..."
            autoComplete="off"
            className={css['change-input']}
            value={change['amount']}
            onChange={handleChangeAmount}
          />

          <div className={css['change-button']}>
            <SharedButton type="submit">Change</SharedButton>
          </div>
        </form>
      </div>
    </div>
  );
  return change ? (
    createPortal(template, document.getElementById('modal'))
  ) : (
    <></>
  );
};

export default Change;
