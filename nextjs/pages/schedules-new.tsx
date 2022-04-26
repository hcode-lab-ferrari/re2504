import { Fragment, useCallback, useState } from 'react';
import Calendar from '../components/Calendar';
import Header from '../components/Header';
import Page from '../components/Page';
import Footer from '../components/Page/Footer';
import { format } from 'date-fns';

const SchedulesNew = () => {
  const [scheduleAt, setScheduleAt] = useState<Date | null>(null);

  const onSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      console.log(scheduleAt);
    },
    [scheduleAt]
  );

  return (
    <Fragment>
      <Header />
      <Page pageColor="blue" title="Escolha a Data" id="schedules-new">
        <Calendar selected={new Date()} onChange={setScheduleAt} />
        <form onSubmit={onSubmit}>
          <input
            type="hidden"
            name="schedule_at"
            value={scheduleAt ? format(scheduleAt, 'yyyy-MM-dd') : ''}
          />

          <Footer />
        </form>
      </Page>
    </Fragment>
  );
};

export default SchedulesNew;
