import { useDispatch, useSelector } from 'react-redux';
import {
  selectIncomeMonth,
  selectTotalIncomes,
} from 'redux/transaction/transactionSelectors';
import { setCategoryFilter } from 'redux/categoryFilter/categoryFilterSlice';
import { setReportType } from 'redux/reportType/reportTypeSlice';
import { GetIncomeSVG } from 'components/IncomeReport/GetIncomeSVG';
import css from './income-report.module.scss';

const refs = {
  selectedCategory: null,
};

const IncomeReport = () => {
  const monthIncomes = useSelector(selectIncomeMonth);
  const totalIncomes = useSelector(selectTotalIncomes);
  const dispatch = useDispatch();

  const handleCurrentReport = () => {
    dispatch(setReportType('expense'));
    dispatch(setCategoryFilter(''));
  };

  const handleCategoryClick = e => {
    if (refs.selectedCategory) {
      refs.selectedCategory.classList.remove(css['incomeReportActiveCategory']);
      if (refs.selectedCategory === e.currentTarget) {
        dispatch(setCategoryFilter(''));
        refs.selectedCategory = null;
        return;
      }
    }
    dispatch(setCategoryFilter(e.currentTarget.dataset['category']));
    e.currentTarget.classList.add(css['incomeReportActiveCategory']);
    refs.selectedCategory = e.currentTarget;
  };

  return (
    <>
      <div className={css['incomeReportBox']}>
        <button
          className={css['incomeReportBtnLeft']}
          type="button"
          onClick={handleCurrentReport}
        ></button>

        <h3 className={css['incomeReportTitle']}>Income</h3>

        <button
          className={css['incomeReportBtnRight']}
          type="button"
          onClick={handleCurrentReport}
        ></button>
      </div>

      {totalIncomes > 0 && (
        <p className={css['incomeReportDetails']}>
          <span className={css['incomeReportSpan']}>* </span>
          Select a category for more details
        </p>
      )}

      {monthIncomes && (
        <ul className={css['incomeReportList']}>
          {monthIncomes.map(income => (
            <li
              className={css['incomeReportItem']}
              key={income[0]}
              data-category={income[0]}
              onClick={handleCategoryClick}
            >
              <p className={css['incomeReportValue']}>
                {income[1]?.toLocaleString('fr-FR', {
                  useGrouping: true,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              {GetIncomeSVG(income[0])}

              <p className={css['incomeReportValue']}>{income[0]}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default IncomeReport;
