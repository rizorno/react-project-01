import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setDate } from 'redux/date/dateSlice';
import css from './calendar.module.scss';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleCalendarClose = () => {
    // ? desition #1
    const parseData = Date.parse(startDate);
    const moment = require('moment');
    const getDate = moment(parseData);
    const result = getDate.format('YYYY-MM-DD');

    // ? desition #2
    //  const result = startDate.toISOString().slice(0, 10); // only for format 'YYYY-MM-DD'

    dispatch(setDate(result));

    return;
  };

  return (
    <div className={css['calendar-wrapper']}>
      <div className={css['calendar-icon']}></div>
      <DatePicker
        dateFormat="dd.MM.yyyy"
        selected={startDate}
        onChange={date => setStartDate(date)}
        onCalendarClose={handleCalendarClose}
        className={css['calendar-input']}
      />
    </div>
  );
};

export default Calendar;
