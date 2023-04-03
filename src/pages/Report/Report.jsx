import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEmail } from 'redux/auth/authSelectors';
import {
  selectTotalExpenses,
  selectTotalIncomes,
} from 'redux/transaction/transactionSelectors';
import { getPeriodDataThunk } from 'redux/transaction/transactionOperations';
import { selectPeriod } from 'redux/date/periodSelectors';
import { selectReportType } from 'redux/reportType/reportTypeSelector';
import BalancePanel from 'components/BalancePanel/BalancePanel';
import CurrentPeriod from 'components/CurrentPeriod/CurrentPeriod';
import BarChart from 'components/BarChart/BarChart';
import ExpensesReport from 'components/ExpensesReport/ExpensesReport';
import IncomeReport from 'components/IncomeReport/IncomeReport';
import css from './report.module.scss';

const Report = () => {
  const user = useSelector(getUserEmail);
  const reportPeriod = useSelector(selectPeriod);
  const reportType = useSelector(selectReportType);
  const totalExpenses = useSelector(selectTotalExpenses);
  const totalIncomes = useSelector(selectTotalIncomes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    const year = new Date().toLocaleString('default', { year: 'numeric' });
    const month = new Date().toLocaleString('default', { month: '2-digit' });
    const currentPeriod = `${year}-${month}`;

    reportPeriod
      ? dispatch(getPeriodDataThunk(reportPeriod))
      : dispatch(getPeriodDataThunk(currentPeriod));
  }, [user, reportPeriod, dispatch]);

  return (
    <div className={css['mainBox']}>
      <section className={css['sectionBalance']}>
        <div className={css['balanceBox']}>
          <Link className={css['balanceLinkHome']} to="/">
            Home page
          </Link>
          <div className={css['balanceFlexBox']}>
            <CurrentPeriod />
            <div className={css['balanceWrapperMargin']}>
              <BalancePanel />
            </div>
          </div>
        </div>
      </section>

      <section className={css['sectionTotal']}>
        <div className={css['totalBox']}>
          <p className={css['totalExpenseTitle']}>
            Expenses:
            <span className={css['totalExpenseAmount']}>
              {totalExpenses === 0 ? '' : '- '}
              {totalExpenses?.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'UAH',
                currencyDisplay: 'code',
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
          <p className={css['totalIncomeTitle']}>
            Income:
            <span className={css['totalIncomeAmount']}>
              {totalIncomes === 0 ? <></> : '+ '}
              {totalIncomes?.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'UAH',
                currencyDisplay: 'code',
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
      </section>

      <section className={css['sectionStatistic']}>
        <div className={css['statisticBox']}>
          {reportType === 'expense' ? <ExpensesReport /> : <IncomeReport />}
        </div>
      </section>

      {reportType === 'expense' && totalExpenses > 0 && (
        <section className={css['sectionChart']}>
          <div className={css['chartBox']}>
            <BarChart />
          </div>
        </section>
      )}

      {reportType === 'income' && totalIncomes > 0 && (
        <section className={css['sectionChart']}>
          <div className={css['chartBox']}>
            <BarChart />
          </div>
        </section>
      )}
    </div>
  );
};

export default Report;
