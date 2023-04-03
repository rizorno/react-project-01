import { useDispatch, useSelector } from 'react-redux';
import {
  selectExpenseMonth,
  selectTotalExpenses,
} from 'redux/transaction/transactionSelectors';
import { setCategoryFilter } from 'redux/categoryFilter/categoryFilterSlice';
import { setReportType } from 'redux/reportType/reportTypeSlice';
import { GetExpenseSVG } from './GetExpenseSVG';
import css from './expenses-report.module.scss';

const refs = {
  selectedCategory: null,
};

const ExpensesReport = () => {
  const monthExpenses = useSelector(selectExpenseMonth);
  const totalExpenses = useSelector(selectTotalExpenses);
  const dispatch = useDispatch();

  const handleCurrentReport = () => {
    dispatch(setReportType('income'));
    dispatch(setCategoryFilter(''));
  };

  const handleCategoryClick = e => {
    if (refs.selectedCategory) {
      refs.selectedCategory.classList.remove(
        css['expensesReportActiveCategory']
      );
      if (refs.selectedCategory === e.currentTarget) {
        dispatch(setCategoryFilter(''));
        refs.selectedCategory = null;
        return;
      }
    }
    dispatch(setCategoryFilter(e.currentTarget.dataset['category']));
    e.currentTarget.classList.add(css['expensesReportActiveCategory']);
    refs.selectedCategory = e.currentTarget;
  };

  return (
    <>
      <div className={css['expensesReportBox']}>
        <button
          className={css['expensesReportBtnLeft']}
          type="button"
          onClick={handleCurrentReport}
        ></button>

        <p className={css['expensesReportTitle']}>Expenses</p>

        <button
          className={css['expensesReportBtnRight']}
          type="button"
          onClick={handleCurrentReport}
        ></button>
      </div>

      {totalExpenses > 0 && (
        <p className={css['expensesReportDetails']}>
          <span className={css['expensesReportSpan']}>* </span>
          Select a category for more details
        </p>
      )}

      {monthExpenses && (
        <ul className={css['expensesReportList']}>
          {monthExpenses.map(expense => (
            <li
              className={css['expensesReportItem']}
              key={expense[0]}
              data-category={expense[0]}
              onClick={handleCategoryClick}
            >
              <p className={css['expensesReportValue']}>
                {expense[1]?.toLocaleString('fr-FR', {
                  useGrouping: true,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              {GetExpenseSVG(expense[0])}

              <p className={css['expensesReportText']}>{expense[0]}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ExpensesReport;
