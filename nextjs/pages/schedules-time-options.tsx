import { withIronSessionSsr } from 'iron-session/next';
import { NextPage, Redirect } from 'next';
import { Fragment, useState } from 'react';
import Header from '../components/Header';
import Page from '../components/Page';
import Footer from '../components/Page/Footer';
import { sessionOptions } from '../utils/session';
import { ScheduleSession } from '../types/ScheduleSession';
import { format, getDay, parse } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import axios from 'axios';
import { TimeOption } from '../types/TimeOption';

type ComponentPageProps = {
  schedule: ScheduleSession;
  timeOptions: TimeOption[];
}

const ComponentPage: NextPage<ComponentPageProps> = (props) => {

  const [scheduleAt] = useState(props.schedule.scheduleAt);
  const [timeOptions] = useState(props.timeOptions);

  return (
    <Fragment>
      <Header />
      <Page
        pageColor="blue"
        title="Escolha o Horário"
        id="time-options"
      >
        <header className="page-title">
          <h2>Horários do Dia</h2>
          <hr />
        </header>

        <form>
          <input
            type="hidden"
            name="schedule_at"
            value={scheduleAt}
          />

          <h3>{format(
            parse(scheduleAt!, 'yyyy-MM-dd', new Date()),
            "EEEE, d 'de' MMMM 'de' yyyy",
            { locale }
          )}</h3>

          <div className="options">
            <label>
              <input type="radio" name="option" value="9:00" checked />
              <span>9:00</span>
            </label>
          </div>

          <Footer />
        </form>
      </Page>
    </Fragment>
  );
};

export default ComponentPage;

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {

  const { schedule } = req.session;

  if (!schedule?.scheduleAt) {
    return {
      redirect: {
        destination: '/schedules-new',
      } as Redirect,
    };
  }

  const day = getDay(
    parse(String(schedule.scheduleAt), 'yyyy-MM-dd', new Date())
  );

  const { data: timeOptions } = await axios.get<TimeOption[]>("/time-options", {
    baseURL: process.env.API_URL,
    params: {
      day,
    },
  });

  return {
    props: {
      schedule,
      timeOptions,
    },
  };

}, sessionOptions);