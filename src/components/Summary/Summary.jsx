import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import {
  selectExpenseTotalSummary,
  selectIncomeTotalSummary,
} from 'redux/transaction/transactionSelectors';
import css from './summary.module.scss';

const Summary = () => {
  const expenseData = useSelector(selectExpenseTotalSummary);
  const incomeData = useSelector(selectIncomeTotalSummary);
  const location = useLocation();

  const { totalSummaryExpense, arrSummaryExpense } = expenseData;
  const { totalSummaryIncome, arrSummaryIncome } = incomeData;

  let monthSummary;
  let totalSummary;
  const summaryData = () => {
    if (location.pathname === '/' || location.pathname === '/expenses') {
      monthSummary = arrSummaryExpense ?? [];
      totalSummary = totalSummaryExpense ?? [];
    } else if (location.pathname === '/incomes') {
      monthSummary = arrSummaryIncome ?? [];
      totalSummary = totalSummaryIncome ?? [];
    }

    return (
      <>
        {monthSummary?.map(item => {
          return (
            <li className={css['summary-item']} key={`${item[0]}`}>
              <p className={css['summary-month']}>{item[0]}</p>
              <p className={css['summary-value']}>
                {item[1]?.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'UAH',
                  currencyDisplay: 'code',
                  useGrouping: true,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </li>
          );
        })}
      </>
    );
  };

  const year = new Date().toISOString().slice(0, 4);

  return (
    <div className={css['summary-container']}>
      {location.pathname === '/incomes' ? (
        <p className={css['summary-title']}>Incomes - {year}</p>
      ) : (
        <p className={css['summary-title']}>Expenses - {year}</p>
      )}

      <ul className={css['summary-list']}>{summaryData()}</ul>
      <div className={css['summary-itemTotal']}>
        <p className={css['summary-title']}>Total :</p>
        <p className={css['summary-title']}>
          {totalSummary?.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'UAH',
            currencyDisplay: 'code',
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
};

export default Summary;
