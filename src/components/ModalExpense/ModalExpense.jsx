import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SharedButton from 'commons/sharedButton/SharedButton';
import { getUserBalance } from 'redux/auth/authSelectors';
import { getBalance } from 'redux/user/userSelectors';
import { selectDate } from 'redux/date/dateSelectors';
import {
  getExpensesThunk,
  addExpenseThunk,
} from 'redux/transaction/transactionOperations';
import { selectExpenseCategory } from 'redux/transaction/transactionSelectors';
import { updateBalanceThunk } from 'redux/user/userOperations';
import Calendar from 'components/Calendar/Calendar';
import { translateCategoryExpenseRU } from 'helpers/translateCategoryExpenseRU';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './modal-expense.module.scss';

const ModalExpense = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const date = useSelector(selectDate);
  const categories = useSelector(selectExpenseCategory);
  const balanceAuth = useSelector(getUserBalance);
  const balanceUser = useSelector(getBalance);
  const dispatch = useDispatch();

  const currentDate = new Date();
  const year = currentDate.toLocaleString('default', { year: 'numeric' });
  const month = currentDate.toLocaleString('default', { month: '2-digit' });
  const newDate = currentDate.toLocaleString('default', { day: '2-digit' });
  const fullDate = `${year}-${month}-${newDate}`;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!amount || !description || !category)
      return Notify.info('Fill in all fields');
    if (
      (balanceUser === null
        ? balanceAuth - Number(amount)
        : balanceUser - Number(amount)) < 1
    ) {
      Notify.warning('Insufficient funds on the balance sheet');
      return;
    }
    await dispatch(
      addExpenseThunk({
        description,
        amount: Number(amount),
        date: date.length === 10 ? date : fullDate,
        category,
      })
    );
    Notify.success('Transaction successfully added!');
    const newBalance =
      balanceUser === null
        ? balanceAuth - Number(amount)
        : balanceUser - Number(amount);
    await dispatch(getExpensesThunk());
    await dispatch(updateBalanceThunk({ newBalance }));
    handleClear();
  };

  const actions = {
    description: setDescription,
    category: setCategory,
    amount: value => {
      if (value.charAt(0) === '0' || value.charAt(0) === '-') {
        Notify.failure('Amount must be greater than 0');
        return;
      }
      setAmount(value);
    },
  };

  const handleChange = e => {
    const { name, value } = e.target;
    actions[name](value);
  };

  const handleClear = () => {
    setDescription('');
    setCategory('');
    setAmount('');
  };

  return (
    <div className={css['modalExpensesBox']}>
      <form onSubmit={handleSubmit}>
        <div className={css['modalExpensesInputBox']}>
          <input
            type="text"
            name="description"
            placeholder="Product description..."
            autoComplete="off"
            value={description}
            onChange={handleChange}
            className={css['modalExpensesDescription']}
          />

          <div className={css['modalExpensesSelectBox']}>
            <select
              name="category"
              value={category}
              onChange={handleChange}
              className={css['modalExpensesSelect']}
            >
              <option value="category">Product category</option>
              {categories.map(item => (
                <option key={item} value={translateCategoryExpenseRU(item)}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className={css['modalExpensesCountBox']}>
            <input
              //   type="number"
              name="amount"
              placeholder="0.00"
              autoComplete="off"
              value={amount.toLocaleString('fr-FR', {
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              onChange={handleChange}
              className={css['modalExpensesCount']}
            />
            <div className={css['modalExpensesIcon']} />
          </div>

          <div className={css['modalExpensesDateBox']}>
            <Calendar />
          </div>
        </div>

        <div className={css['modalExpensesBtnBox']}>
          <SharedButton type="submit">Input</SharedButton>
          <SharedButton type="button" onClick={handleClear}>
            Clear
          </SharedButton>
        </div>
      </form>
    </div>
  );
};

export default ModalExpense;
