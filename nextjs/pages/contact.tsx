import type { NextPage } from 'next';
import { Fragment } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Contact from '../components/Home/Contact';

const ComponentPage: NextPage = () => {
  return (
    <Fragment>
      <Header />
      <Contact />
      <Footer />
    </Fragment>
  );
};

export default ComponentPage;
