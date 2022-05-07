import { Fragment, useEffect, useState } from "react";
import { withAuthentication } from "../utils/withAuthentication";
import Header from "../components/Header";
import Page from "../components/Page";
import Footer from "../components/Page/Footer";
import { NextPage, Redirect } from "next";
import { ScheduleSession } from "../types/ScheduleSession";
import { format, parseJSON } from "date-fns";
import locale from "date-fns/locale/pt-BR";
import { Schedule } from "../types/Schedule";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { redirectToAuth } from "../utils/redirectToAuth";
import Title from "../components/Page/Title";
import { formatCurrency } from "../utils/formatCurrency";
import ScheduleItem from "../components/Schedule/ScheduleItem";

type FormData = {
    server?: unknown;
}

type ComponentPageProps = {
    schedules: Schedule[];
    token: string;
}

const ComponentPage: NextPage<ComponentPageProps> = ({ schedules, token }) => {

    const [nextSchedules, setNextSchedules] = useState<Schedule[]>(schedules.filter(s => new Date(s.scheduleAt).getTime() > new Date().getTime()));
    const [historySchedules, setHistorySchedules] = useState<Schedule[]>(schedules.filter(s => new Date(s.scheduleAt).getTime() <= new Date().getTime()));

    const onCanceled = () => {

        axios.get<Schedule[]>(`/schedules`, {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(({ data }) => {

            setNextSchedules(data.filter(s => new Date(s.scheduleAt).getTime() > new Date().getTime()));
            setHistorySchedules(data.filter(s => new Date(s.scheduleAt).getTime() <= new Date().getTime()));

        }).catch(console.error);

    }

    return (
        <Fragment>
            <Header />
            <Page
                title={"Agendamentos"}
                id="schedules"
            >
                <Title value="Próximos" />

                <ul>
                    {nextSchedules.length === 0 && <li>Não há próximos agendamentos.</li>}
                    {nextSchedules.map((schedule, index) => <ScheduleItem key={index} token={token} schedule={schedule} onCanceled={onCanceled} />)}
                </ul>

                <Title value="Histórico" />

                <ul>
                    {historySchedules.length === 0 && <li>Não há histórico de agendamentos.</li>}
                    {historySchedules.map((schedule, index) => <ScheduleItem key={index} token={token} schedule={schedule} />)}
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

export const getServerSideProps = withAuthentication(async (context) => {

    try {

        const { token } = context.req.session;

        const { data: schedules } = await axios.get(`/schedules`, {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return {
            props: {
                schedules,
                token
            },
        };

    } catch (e) {
        return redirectToAuth(context);
    }

});