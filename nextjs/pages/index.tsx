import type { NextPage } from 'next';
import { Fragment } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Banner from '../components/Home/Banner';
import Contact from '../components/Home/Contact';
import Service from '../components/Home/Service';

const ComponentPage: NextPage = () => {
  return (
    <Fragment>
      <Header />
      <Banner />
      <Service />
      <Contact />
      <Footer />
    </Fragment>
  );
};

export default ComponentPage;
