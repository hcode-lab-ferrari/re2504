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

            <main id="error">
                <div className="columns">
                    <div className="column">
                        <header>
                            <h1>
                                <span className="desktop"><b>Uno</b>&nbsp;problema ocorrido!</span>
                                <span className="mobile">Problema ocorrido no <b>Mobi</b>le!</span>
                            </h1>
                        </header>
                        <p>Tente novamente mais tarde.</p>
                    </div>
                    <div className="column">
                        <picture>
                            <source
                                srcSet="/images/uno.png"
                                media="(min-width: 1200px)"
                            />
                            <source
                                srcSet="/images/mobi@2x.png"
                                media="(min-width: 480px)"
                            />
                            <img src="/images/mobi.png" alt="Mobi" />
                        </picture>
                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>
    );
};

export default ComponentPage;
