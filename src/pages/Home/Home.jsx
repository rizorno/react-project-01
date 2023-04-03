import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { setDate } from 'redux/date/dateSlice';
import { setPeriod } from 'redux/date/periodSlice';
import { getUserEmail } from 'redux/auth/authSelectors';
import { setCategoryFilter } from 'redux/categoryFilter/categoryFilterSlice';
import { setReportType } from 'redux/reportType/reportTypeSlice';
import BalancePanel from 'components/BalancePanel/BalancePanel';
import Calendar from 'components/Calendar/Calendar';
import Expenses from 'components/Expenses/Expenses';
import ModalExpense from 'components/ModalExpense/ModalExpense';
import ModalIncome from 'components/ModalIncome/ModalIncome';
import css from './home.module.scss';

import {
  getExpensesThunk,
  getIncomesThunk,
  getExpenseCategoriesThunk,
  getIncomeCategoriesThunk,
} from 'redux/transaction/transactionOperations';

const Home = () => {
  const screenMobile = useMediaQuery('(max-width: 767.9px)');
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector(getUserEmail);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(getExpensesThunk());
    dispatch(getIncomesThunk());
    dispatch(getExpenseCategoriesThunk());
    dispatch(getIncomeCategoriesThunk());
    dispatch(setDate(new Date().toISOString().slice(0, 10)));
  }, [dispatch, user]);

  const btnOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleCurrentReport = () => {
    dispatch(setCategoryFilter(''));
    dispatch(setPeriod(new Date().toISOString().slice(0, 7)));
    if (location.pathname === '/' || location.pathname === '/expenses') {
      dispatch(setReportType('expense'));
    } else if (location.pathname === '/incomes') {
      dispatch(setReportType('income'));
    }
  };

  return (
    <div className={css['mainBox']}>
      {openModal ? (
        <div className={css['sectionModal']}>
          <p className={css['linkTransaction']} onClick={btnOpenModal}>
            go back
          </p>

          {location.pathname === '/' || location.pathname === '/expenses' ? (
            <ModalExpense />
          ) : (
            <ModalIncome />
          )}
        </div>
      ) : (
        <div
          className={
            location.pathname === '/'
              ? css['mainBoxFirst']
              : css['mainBoxSecond']
          }
        >
          {screenMobile ? (
            <p className={css['linkTransaction']} onClick={btnOpenModal}>
              to add a transaction
            </p>
          ) : (
            <></>
          )}

          <div className={css['homeBoxFlex']}>
            <Link
              to="/reports"
              className={css['linkReport']}
              onClick={handleCurrentReport}
            >
              Reports
            </Link>

            <BalancePanel />
          </div>

          {screenMobile ? <Calendar /> : <></>}

          {location.pathname === '/' ? (
            <div className={css['homeBoxInfo']}>
              <Expenses />
            </div>
          ) : (
            <></>
          )}

          {location.pathname === '/' ? (
            <></>
          ) : (
            <div className={css['homeBoxOutlet']}>
              <Outlet />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
