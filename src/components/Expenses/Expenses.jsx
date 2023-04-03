import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NavLink, useLocation } from 'react-router-dom';
import { getUserBalance } from 'redux/auth/authSelectors';
import { getBalance } from 'redux/user/userSelectors';
import { setChange } from 'redux/change/changeSlice';
import { selectChange } from 'redux/change/changeSelector';
import { setTransactionType } from 'redux/transactionType/transactionTypeSlice';
import { selectExpensesSort } from 'redux/transaction/transactionSelectors';
import {
  getExpensesThunk,
  deleteTransactionThunk,
} from 'redux/transaction/transactionOperations';
import { updateBalanceThunk } from 'redux/user/userOperations';
import Calendar from 'components/Calendar/Calendar';
import Change from 'components/Change/Change';
import Summary from 'components/Summary/Summary';
import ModalExpense from 'components/ModalExpense/ModalExpense';
import { translateCategoryExpense } from 'helpers/translateCategoryExpense';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './expenses.module.scss';

const Expenses = () => {
  const screenMobile = useMediaQuery('(max-width: 767.9px)');
  const screenTablet = useMediaQuery(
    '(min-width: 768px) and (max-width: 1279.9px)'
  );
  const screenDesktop = useMediaQuery('(min-width: 1280px)');

  const transactionsArrayExpenses = useSelector(selectExpensesSort);
  const change = useSelector(selectChange);
  const balanceAuth = useSelector(getUserBalance);
  const balanceUser = useSelector(getBalance);
  const dispatch = useDispatch();
  const location = useLocation();

  const deleteContact = async (id, amount) => {
    await dispatch(deleteTransactionThunk(id));
    const newBalance =
      balanceUser === null
        ? balanceAuth + Number(amount)
        : balanceUser + Number(amount);
    await dispatch(getExpensesThunk());
    await dispatch(updateBalanceThunk({ newBalance }));
    Notify.success('Transaction successfully deleted!');
  };

  return (
    <>
      {(location.pathname === '/' || location.pathname === '/expenses') && (
        <>
          {screenMobile ? (
            <div className={css['expenses-wrapper']}>
              <ul className={css['expenses-transactionList']}>
                {transactionsArrayExpenses &&
                  transactionsArrayExpenses.map(
                    ({ _id, date, description, category, amount }) => {
                      return (
                        <li
                          key={_id}
                          className={css['expenses-transactionItem']}
                        >
                          <div className={css['expenses-descriptionBox']}>
                            <p className={css['expenses-description']}>
                              {description}
                            </p>
                            <div className={css['expenses-infoBox']}>
                              <p className={css['expenses-date']}>
                                {date.split('-').reverse().join('.')}
                              </p>
                              <p className={css['expenses-category']}>
                                {translateCategoryExpense(category)}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`${css['expenses-amount']} ${css['expenses-amountRed']}`}
                          >
                            {amount ? '-' : <></>}
                            {amount?.toLocaleString('fr-FR', {
                              style: 'currency',
                              currency: 'UAH',
                              currencyDisplay: 'code',
                              useGrouping: true,
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>

                          <button
                            className={css['expenses-btnChange']}
                            type="button"
                            onClick={() => {
                              dispatch(
                                setChange({
                                  _id,
                                  date,
                                  description,
                                  category,
                                  amount,
                                })
                              );
                              dispatch(setTransactionType('expense'));
                            }}
                          >
                            <div className={css['expenses-iconChange']}></div>
                          </button>

                          <button
                            className={css['expenses-btnDelete']}
                            type="button"
                            onClick={() => {
                              deleteContact(_id, amount);
                            }}
                          >
                            <div className={css['expenses-iconDelete']}></div>
                          </button>
                        </li>
                      );
                    }
                  )}
              </ul>
              <nav className={css['expenses-mobileNav']}>
                <NavLink
                  className={`${css['expenses-mobileNavLink']} ${css['NavLink--current']}`}
                >
                  Expenses
                </NavLink>
                <NavLink
                  to="/incomes"
                  className={css['expenses-mobileNavLink']}
                >
                  Income
                </NavLink>
              </nav>
            </div>
          ) : (
            <>
              <nav className={css['expenses-tabletNav']}>
                <NavLink
                  className={`${css['expenses-tabletNavLink']} ${css['NavLink--current']}`}
                >
                  Expenses
                </NavLink>
                <NavLink
                  to="/incomes"
                  className={css['expenses-tabletNavLink']}
                >
                  Income
                </NavLink>
              </nav>

              <div className={css['expenses-section']}>
                <div className={css['expenses-wrapperUp']}>
                  <Calendar />
                  <ModalExpense />
                </div>

                <div className={css['expenses-wrapperDesktop']}>
                  <div className={css['expenses-tableContainer']}>
                    <ul className={css['expenses-tableHead']}>
                      <li className={css['expenses-tableHeadDate']}>Date</li>
                      <li className={css['expenses-tableHeadDescription']}>
                        Description
                      </li>
                      <li className={css['expenses-tableHeadCategory']}>
                        Category
                      </li>
                      <li className={css['expenses-tableHeadSum']}>Sum</li>
                    </ul>

                    <ul className={css['expenses-tableBodyContainer']}>
                      {transactionsArrayExpenses &&
                        transactionsArrayExpenses.map(
                          ({ _id, date, description, category, amount }) => (
                            <li key={_id} className={css['expenses-tableItem']}>
                              <ul className={css['expenses-tableBody']}>
                                <li className={css['expenses-tableBodyDate']}>
                                  {date.split('-').reverse().join('.')}
                                </li>
                                <li
                                  className={
                                    css['expenses-tableBodyDescription']
                                  }
                                >
                                  {description}
                                </li>
                                <li
                                  className={css['expenses-tableBodyCategory']}
                                >
                                  {translateCategoryExpense(category)}
                                </li>
                                <li className={css['expenses-tableBodySum']}>
                                  {amount ? '-' : <></>}
                                  {amount?.toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'UAH',
                                    currencyDisplay: 'code',
                                    useGrouping: true,
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </li>
                                <li
                                  className={css['expenses-tableBodyBtnChange']}
                                >
                                  <button
                                    className={css['expenses-btnChange']}
                                    type="button"
                                    onClick={() => {
                                      dispatch(
                                        setChange({
                                          _id,
                                          date,
                                          description,
                                          category,
                                          amount,
                                        })
                                      );
                                      dispatch(setTransactionType('expense'));
                                    }}
                                  >
                                    <div
                                      className={css['expenses-iconChange']}
                                    ></div>
                                  </button>
                                </li>

                                <li
                                  className={css['expenses-tableBodyBtnDelete']}
                                >
                                  <button
                                    className={css['expenses-btnDelete']}
                                    type="button"
                                    onClick={() => {
                                      deleteContact(_id, amount);
                                    }}
                                  >
                                    <div
                                      className={css['expenses-iconDelete']}
                                    ></div>
                                  </button>
                                </li>
                              </ul>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                  {screenDesktop ? <Summary /> : <></>}
                </div>
              </div>

              {screenTablet ? <Summary /> : <></>}
            </>
          )}
        </>
      )}
      {change && <Change />}
    </>
  );
};

export default Expenses;
