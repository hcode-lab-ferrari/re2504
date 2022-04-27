import { NextPage } from 'next';
import { Fragment } from 'react';
import Header from '../components/Header';
import Page from '../components/Page';
import Footer from '../components/Page/Footer';

const ComponentPage: NextPage = () => {
  return (
    <Fragment>
      <Header />
      <Page
        pageColor="blue"
        title="Escolha o Horário"
        id="schedules-time-options"
      >
        <form>
          <Footer />
        </form>
      </Page>
    </Fragment>
  );
};

export default ComponentPage;
