import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NavLink, useLocation } from 'react-router-dom';
import { getUserBalance } from 'redux/auth/authSelectors';
import { getBalance } from 'redux/user/userSelectors';
import { setChange } from 'redux/change/changeSlice';
import { selectChange } from 'redux/change/changeSelector';
import { setTransactionType } from 'redux/transactionType/transactionTypeSlice';
import { selectIncomesSort } from 'redux/transaction/transactionSelectors';
import {
  getIncomesThunk,
  deleteTransactionThunk,
} from 'redux/transaction/transactionOperations';
import { updateBalanceThunk } from 'redux/user/userOperations';
import Calendar from 'components/Calendar/Calendar';
import Change from 'components/Change/Change';
import Summury from 'components/Summary/Summary';
import ModalIncomes from 'components/ModalIncome/ModalIncome';
import { translateCategoryIncome } from 'helpers/translateCategoryIncome';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './incomes.module.scss';

const Incomes = () => {
  const screenMobile = useMediaQuery('(max-width: 767.9px)');
  const screenTablet = useMediaQuery(
    '(min-width: 768px) and (max-width: 1279.9px)'
  );
  const screenDesktop = useMediaQuery('(min-width: 1280px)');

  const transactionsArrayIncome = useSelector(selectIncomesSort);
  const change = useSelector(selectChange);
  const balanceAuth = useSelector(getUserBalance);
  const balanceUser = useSelector(getBalance);
  const dispatch = useDispatch();
  const location = useLocation();

  const deleteContact = async (id, amount) => {
    await dispatch(deleteTransactionThunk(id));
    const newBalance =
      balanceUser === null
        ? balanceAuth - Number(amount)
        : balanceUser - Number(amount);
    await dispatch(updateBalanceThunk({ newBalance }));
    await dispatch(getIncomesThunk());
    Notify.success('Transaction successfully deleted!');
  };

  return (
    <>
      {location.pathname === '/incomes' && (
        <>
          {screenMobile ? (
            <div className={css['incomes-wrapper']}>
              <ul className={css['incomes-transactionList']}>
                {transactionsArrayIncome &&
                  transactionsArrayIncome.map(
                    ({ _id, date, description, category, amount }) => {
                      return (
                        <li
                          key={_id}
                          className={css['incomes-transactionItem']}
                        >
                          <div className={css['incomes-descriptionBox']}>
                            <p className={css['incomes-description']}>
                              {description}
                            </p>
                            <div className={css['incomes-infoBox']}>
                              <p className={css['incomes-date']}>
                                {date.split('-').reverse().join('.')}
                              </p>
                              <p className={css['incomes-category']}>
                                {translateCategoryIncome(category)}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`${css['incomes-amount']} ${css['incomes-amountGreen']}`}
                          >
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
                            className={css['incomes-btnChange']}
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
                              dispatch(setTransactionType('income'));
                            }}
                          >
                            <div className={css['incomes-iconChange']}></div>
                          </button>

                          <button
                            className={css['incomes-btnDelete']}
                            type="button"
                            onClick={() => {
                              deleteContact(_id, amount);
                            }}
                          >
                            <div className={css['incomes-iconDelete']}></div>
                          </button>
                        </li>
                      );
                    }
                  )}
              </ul>
              <nav className={css['incomes-mobileNav']}>
                <NavLink
                  to="/expenses"
                  className={css['incomes-mobileNavLink']}
                >
                  Expenses
                </NavLink>
                <NavLink
                  className={`${css['incomes-mobileNavLink']} ${css['NavLink--current']}`}
                >
                  Income
                </NavLink>
              </nav>
            </div>
          ) : (
            <>
              <nav className={css['incomes-tabletNav']}>
                <NavLink
                  to="/expenses"
                  className={css['incomes-tabletNavLink']}
                >
                  Expenses
                </NavLink>
                <NavLink
                  className={`${css['incomes-tabletNavLink']} ${css['NavLink--current']}`}
                >
                  Income
                </NavLink>
              </nav>

              <div className={css['incomes-section']}>
                <div className={css['incomes-wrapperUp']}>
                  <Calendar />
                  <ModalIncomes />
                </div>

                <div className={css['incomes-wrapperDesktop']}>
                  <div className={css['incomes-tableContainer']}>
                    <ul className={css['incomes-tableHead']}>
                      <li className={css['incomes-tableHeadDate']}>Date</li>
                      <li className={css['incomes-tableHeadDescription']}>
                        Description
                      </li>
                      <li className={css['incomes-tableHeadCategory']}>
                        Category
                      </li>
                      <li className={css['incomes-tableHeadSum']}>Sum</li>
                      <li className={css['incomes-tableHeadButton']}></li>
                    </ul>

                    <ul className={css['incomes-tableBodyContainer']}>
                      {transactionsArrayIncome &&
                        transactionsArrayIncome.map(
                          ({ _id, date, description, category, amount }) => (
                            <li key={_id} className={css['incomes-tableItem']}>
                              <ul className={css['incomes-tableBody']}>
                                <li className={css['incomes-tableBodyDate']}>
                                  {date.split('-').reverse().join('.')}
                                </li>
                                <li
                                  className={
                                    css['incomes-tableBodyDescription']
                                  }
                                >
                                  {description}
                                </li>
                                <li
                                  className={css['incomes-tableBodyCategory']}
                                >
                                  {translateCategoryIncome(category)}
                                </li>
                                <li className={css['incomes-tableBodySum']}>
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
                                  className={css['incomes-tableBodyBtnChange']}
                                >
                                  <button
                                    className={css['incomes-btnChange']}
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
                                      dispatch(setTransactionType('income'));
                                    }}
                                  >
                                    <div
                                      className={css['incomes-iconChange']}
                                    ></div>
                                  </button>
                                </li>
                                <li
                                  className={css['incomes-tableBodyBtnDelete']}
                                >
                                  <button
                                    className={css['incomes-btnDelete']}
                                    type="button"
                                    onClick={() => {
                                      deleteContact(_id, amount);
                                    }}
                                  >
                                    <div
                                      className={css['incomes-iconDelete']}
                                    ></div>
                                  </button>
                                </li>
                              </ul>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                  {screenDesktop ? <Summury /> : <></>}
                </div>
              </div>

              {screenTablet ? <Summury /> : <></>}
            </>
          )}
        </>
      )}
      {change && <Change />}
    </>
  );
};

export default Incomes;
