import { Fragment, useEffect, useState } from "react";
import { withAuthentication } from "../utils/withAuthentication";
import Header from "../components/Header";
import Page from "../components/Page";
import Footer, { ButtonBack } from "../components/Page/Footer";
import { NextPage, Redirect } from "next";
import { ScheduleSession } from "../types/ScheduleSession";
import { format, parseJSON } from "date-fns";
import locale from "date-fns/locale/pt-BR";
import { Schedule } from "../types/Schedule";
import { formatCurrency } from "../utils/formatCurrency";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Toast from "../components/Toast";
import { get } from "lodash";

type FormData = {
    server?: unknown;
}

type ComponentPageProps = {
    schedule: ScheduleSession;
    data: Schedule;
}

const ComponentPage: NextPage<ComponentPageProps> = ({ schedule, data }) => {

    const {
        handleSubmit,
        setError,
        formState: { errors },
        clearErrors,
    } = useForm<FormData>();
    const router = useRouter();

    return (
        <Fragment>
            <Header />
            <Page
                title={"Agendamentos"}
                id="schedules"
            >
                <header className="page-title">
                    <h2>Próximos</h2>
                    <hr />
                </header>

                <ul>
                    <li>
                        <section>
                        <div>
                            <label>Data</label>
                            <span>02/07/2020 às 9:00</span>
                        </div>
                        <div>
                            <label>Status</label>
                            <span>Confirmado</span>
                        </div>
                        <div>
                            <label>Valor</label>
                            <span>R$ 100,00</span>
                        </div>
                        <div className="service">
                            <label>Serviço</label>
                            <span>Revisão do Veículo</span>
                        </div>
                        </section>
                        <button type="button" className="cancel">Cancelar</button>
                    </li>
                    <li>
                        <section>
                        <div>
                            <label>Data</label>
                            <span>02/07/2020 às 9:00</span>
                        </div>
                        <div>
                            <label>Status</label>
                            <span>Confirmado</span>
                        </div>
                        <div>
                            <label>Valor</label>
                            <span>R$ 100,00</span>
                        </div>
                        <div className="service">
                            <label>Serviço</label>
                            <span>Revisão do Veículo</span>
                        </div>
                        </section>
                        <button type="button" className="cancel">Cancelar</button>
                    </li>
                    <li>
                        <section>
                        <div>
                            <label>Data</label>
                            <span>02/07/2020 às 9:00</span>
                        </div>
                        <div>
                            <label>Status</label>
                            <span>Confirmado</span>
                        </div>
                        <div>
                            <label>Valor</label>
                            <span>R$ 100,00</span>
                        </div>
                        <div className="service">
                            <label>Serviço</label>
                            <span>Revisão do Veículo</span>
                        </div>
                        </section>
                        <button type="button" className="cancel">Cancelar</button>
                    </li>
                    <li>
                        <section>
                        <div>
                            <label>Data</label>
                            <span>02/07/2020 às 9:00</span>
                        </div>
                        <div>
                            <label>Status</label>
                            <span>Aguardando Pagamento</span>
                        </div>
                        <div>
                            <label>Valor</label>
                            <span>R$ 100,00</span>
                        </div>
                        <div className="service">
                            <label>Serviço</label>
                            <span>Revisão do Veículo</span>
                        </div>
                        </section>
                        <button type="button" className="cancel">Cancelar</button>
                    </li>
                </ul>

                <header className="page-title">
                    <h2>Histórico</h2>
                    <hr />
                </header>

                <ul>
                    <li>
                        <section>
                        <div>
                            <label>Data</label>
                            <span>02/07/2020 às 9:00</span>
                        </div>
                        <div>
                            <label>Status</label>
                            <span>Confirmado</span>
                        </div>
                        <div>
                            <label>Valor</label>
                            <span>R$ 100,00</span>
                        </div>
                        <div className="service">
                            <label>Serviço</label>
                            <span>Revisão do Veículo</span>
                        </div>
                        </section>
                        <button type="button" className="cancel">Cancelar</button>
                    </li>
                </ul>
                <Footer
                    buttons={[
                        {
                            value: "Novo Agendamento",
                            href: "/schedules-new",
                            className: "black",
                        }
                    ]}
                />
            </Page>
        </Fragment>
    );

}

export default ComponentPage;

export const getServerSideProps = withAuthentication(async ({ req }) => {

    try {

        const { token, schedule } = req.session;

        const { data } = await axios.get(`/schedules/${req.session.schedule.data?.id}`, {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return {
            props: {
                data,
                schedule,
            },
        };

    } catch (e) {
        return {
            redirect: {
                destination: '/schedules-summary',
            } as Redirect,
        };
    }

});