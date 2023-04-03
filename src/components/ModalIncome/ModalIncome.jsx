import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SharedButton from 'commons/sharedButton/SharedButton';
import { getUserBalance } from 'redux/auth/authSelectors';
import { getBalance } from 'redux/user/userSelectors';
import { selectDate } from 'redux/date/dateSelectors';
import {
  getIncomesThunk,
  addIncomeThunk,
} from 'redux/transaction/transactionOperations';
import { selectIncomeCategory } from 'redux/transaction/transactionSelectors';
import { updateBalanceThunk } from 'redux/user/userOperations';
import Calendar from 'components/Calendar/Calendar';
import { translateCategoryIncomeRU } from 'helpers/translateCategoryIncomeRU';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './modal-income.module.scss';

const ModalIncome = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const date = useSelector(selectDate);
  const categories = useSelector(selectIncomeCategory);
  const balanceAuth = useSelector(getUserBalance);
  const balanceUser = useSelector(getBalance);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!amount || !description || !category)
      return Notify.info('Fill in all fields');
    await dispatch(
      addIncomeThunk({
        description,
        amount: Number(amount),
        date,
        category,
      })
    );
    Notify.success('Transaction successfully added!');
    const newBalance =
      balanceUser === null
        ? balanceAuth + Number(amount)
        : balanceUser + Number(amount);
    await dispatch(updateBalanceThunk({ newBalance }));
    await dispatch(getIncomesThunk());
    handleClear();
  };

  const inputs = {
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
    inputs[name](value);
  };

  const handleClear = () => {
    setDescription('');
    setCategory('');
    setAmount('');
  };

  return (
    <div className={css['modalIncomeBox']}>
      <form onSubmit={handleSubmit}>
        <div className={css['modalIncomeInputBox']}>
          <input
            type="text"
            name="description"
            placeholder="Income description..."
            autoComplete="off"
            value={description}
            onChange={handleChange}
            className={css['modalIncomeDescription']}
          />

          <div className={css['modalIncomeSelectBox']}>
            <select
              name="category"
              value={category}
              onChange={handleChange}
              className={css['modalIncomeSelect']}
            >
              <option value="category">Type of income</option>
              {categories.map(item => (
                <option key={item} value={translateCategoryIncomeRU(item)}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className={css['modalIncomeCountBox']}>
            <input
              //   type="number"
              name="amount"
              placeholder="0.00"
              autoComplete="off"
              value={amount.toLocaleString('fr-FR', {
                useGrouping: true,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
              onChange={handleChange}
              className={css['modalIncomeCount']}
            />
            <div className={css['modalIncomeIcon']} />
          </div>

          <div className={css['modalIncomeDateBox']}>
            <Calendar />
          </div>
        </div>

        <div className={css['modalIncomeBtnBox']}>
          <SharedButton type="submit">Input</SharedButton>
          <SharedButton type="button" onClick={handleClear}>
            Clear
          </SharedButton>
        </div>
      </form>
    </div>
  );
};

export default ModalIncome;
