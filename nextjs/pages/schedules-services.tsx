import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import { NextPage } from "next";
import { Fragment } from "react";
import Header from "../components/Header";
import Page from "../components/Page";
import Footer from "../components/Page/Footer";
import Toast from "../components/Toast";
import { ScheduleService } from "../types/ScheduleService";
import { formatCurrency } from "../utils/formatCurrency";
import { sessionOptions } from "../utils/session";

type ComponentPageProps = {
    services: ScheduleService[];
}

const ComponentPage: NextPage<ComponentPageProps> = ({
    services
}) => {

    return (
        <Fragment>
            <Header />
            <Page
                pageColor="blue"
                title="Escolha os Serviços"
                id="schedules-services"
            >
                <form>

                    <input type="hidden" name="schedule_at" />
                    <input type="hidden" name="option" />

                    <div className="options">
                        {services.map(({ id, name, description, price }) => (
                            <label
                                key={String(id)}
                            >
                                <input type="checkbox" name="service" value={id} />
                                <div className="square">
                                    <div></div>
                                </div>
                                <div className="content">
                                    <span className="name">{name}</span>
                                    <span className="description">{description}</span>
                                    <span className="price">{formatCurrency(+price)}</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    <Footer />
                </form>
            </Page>
        </Fragment>
    );

}

export default ComponentPage;

export const getServerSideProps = withIronSessionSsr(async () => {

    const { data: services } = await axios.get<ScheduleService[]>(`/services`, {
        baseURL: process.env.API_URL,
    });

    return {
        props: {
            services,
        },
    };

}, sessionOptions);