import { useCallback, useEffect, useState } from 'react';
import {
  startOfMonth,
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  differenceInSeconds,
  addDays,
} from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

type CalendarProps = {
  selected?: Date;
  onChange?: (date: Date | null) => void;
};

const Calendar = ({
  selected = undefined,
  onChange = () => {},
}: CalendarProps) => {
  const [startMonth, setStartMonth] = useState(startOfMonth(new Date()));
  const [dates, setDates] = useState<Date[]>([]);
  const [startAt, setStartAt] = useState(startOfWeek(startMonth));
  const [endAt, setEndAt] = useState(endOfWeek(endOfMonth(startMonth)));
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    selected ? selected : new Date()
  );

  const getDayClassName = useCallback(
    (dt: Date) => {
      return [
        format(dt, 'yyyyMM') < format(startMonth, 'yyyyMM') && 'month-prev',
        format(dt, 'yyyyMM') > format(startMonth, 'yyyyMM') && 'month-next',
        format(dt, 'yyyyMMdd') === format(new Date(), 'yyyyMMdd') && 'active',
        selectedDate &&
          format(dt, 'yyyyMMdd') === format(selectedDate, 'yyyyMMdd') &&
          'selected',
      ].join(' ');
    },
    [startMonth, selectedDate]
  );

  useEffect(() => {
    setStartAt(startOfWeek(startMonth));
    setEndAt(endOfWeek(endOfMonth(startMonth)));
  }, [startMonth]);

  useEffect(() => {
    const newDates: Date[] = [];
    let day = new Date(startAt.getTime());

    while (differenceInSeconds(endAt, day) > 0) {
      newDates.push(day);
      day = addDays(day, 1);
    }

    setDates(newDates);
  }, [startAt, endAt]);

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="calendar">
      <div className="month">
        <button
          type="button"
          className="btn-today"
          onClick={() => setStartMonth(startOfMonth(new Date()))}
        >
          Hoje
        </button>
        <h2>{format(startMonth, 'MMMM yyyy', { locale })}</h2>
        <nav>
          <button
            type="button"
            className="btn-prev"
            onClick={() => setStartMonth(subMonths(startMonth, 1))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7.41"
              height="12"
              viewBox="0 0 7.41 12"
            >
              <path
                d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z"
                transform="translate(16 18) rotate(180)"
                fill="#9a9a99"
              />
            </svg>
          </button>
          <button
            type="button"
            className="btn-next"
            onClick={() => setStartMonth(addMonths(startMonth, 1))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7.41"
              height="12"
              viewBox="0 0 7.41 12"
            >
              <path
                d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z"
                transform="translate(-8.59 -6)"
                fill="#9a9a99"
              />
            </svg>
          </button>
        </nav>
      </div>
      <ul className="weekdays">
        <li>Dom</li>
        <li>Seg</li>
        <li>Ter</li>
        <li>Qua</li>
        <li>Qui</li>
        <li>Sex</li>
        <li>Sáb</li>
      </ul>
      <ul className="days">
        {dates.map((dt, index) => (
          <li
            key={index}
            className={getDayClassName(dt)}
            onClick={() => setSelectedDate(dt)}
          >
            {format(dt, 'd')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
