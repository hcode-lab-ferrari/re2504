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
                pageColor="green"
                title={
                    <Fragment>
                        <h1>Pagamento Efetuado<small>Confira os detalhes do pedido</small></h1>
                    </Fragment>
                }
                id="schedules-complete"
            >
                <header className="page-title">
                    <h2>Obrigado!</h2>
                    <hr />
                </header>

                <p>{format(
                    new Date(data.scheduleAt),
                    "d 'de' MMMM 'de' yyyy",
                    { locale }
                )}</p>
                <p>
                    Número do Pedido: {String(data.id).padStart(6, "0")}<small>Cartão de Crédito final {schedule.cardLastFourDigits}</small>
                </p>

                <Toast
                    type='danger'
                    open={Object.keys(errors).length > 0}
                    onClose={() => clearErrors()}
                >
                    {Object.keys(errors).map((err) => (
                        get(errors, `${err}.message`, 'Verifique os serviços selecionados.')
                    ))}
                </Toast>
                <Footer
                    buttons={[
                        {
                            value: "Agendamentos",
                            href: "/schedules",
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