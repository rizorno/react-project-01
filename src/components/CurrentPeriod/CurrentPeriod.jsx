import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { setCategoryFilter } from 'redux/categoryFilter/categoryFilterSlice';
import { setPeriod } from 'redux/date/periodSlice';
import css from './current-period.module.scss';

const CurrentPeriod = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const setNewDate = date => {
    dispatch(setPeriod(date));
  };

  const handleClick = date => {
    Date.isLeapYear = year => {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };
    Date.getDaysInMonth = (year, month) => {
      return [
        31,
        Date.isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ][month];
    };

    // eslint-disable-next-line no-extend-native
    Date.prototype.isLeapYear = function () {
      return Date.isLeapYear(this.getFullYear());
    };

    // eslint-disable-next-line no-extend-native
    Date.prototype.getDaysInMonth = function () {
      return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    };

    // eslint-disable-next-line no-extend-native
    Date.prototype.addMonths = function (value) {
      let n = this.getDate();
      this.setDate(1);
      this.setMonth(this.getMonth() + value);
      this.setDate(Math.min(n, this.getDaysInMonth()));
      return this;
    };
    const myDate = new Date(startDate);
    const result1 = myDate.addMonths(date);
    return result1;
  };

  const handleMonthMinus = () => {
    setStartDate(handleClick(-1));
    setNewDate(handleClick(-1).toISOString().slice(0, 7));
    dispatch(setCategoryFilter(''));
  };

  const handleMonthPlus = () => {
    setStartDate(handleClick(1));
    setNewDate(handleClick(1).toISOString().slice(0, 7));
    dispatch(setCategoryFilter(''));
  };

  const handleCalendarClose = () => {
    dispatch(setCategoryFilter(''));
  };

  return (
    <div className={css['currentPeriodContainer']}>
      <p className={css['currentPeriodTitle']}>Current period:</p>

      <div className={css['currentPeriodBox']}>
        <button
          className={css['currentPeriodBtnLeft']}
          onClick={handleMonthMinus}
        ></button>

        <DatePicker
          className={css['currentPeriodCalendar']}
          selected={startDate}
          onChange={date => {
            setStartDate(date);
            setNewDate(date.toISOString().slice(0, 7));
          }}
          onCalendarClose={handleCalendarClose}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
        />

        <button
          className={css['currentPeriodBtnRight']}
          onClick={handleMonthPlus}
        ></button>
      </div>
    </div>
  );
};

export default CurrentPeriod;
