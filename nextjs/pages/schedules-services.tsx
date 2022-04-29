import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import { NextPage } from "next";
import { ChangeEvent, Fragment, useEffect } from "react";
import Header from "../components/Header";
import Page from "../components/Page";
import Footer from "../components/Page/Footer";
import Toast from "../components/Toast";
import { ScheduleService } from "../types/ScheduleService";
import { formatCurrency } from "../utils/formatCurrency";
import { sessionOptions } from "../utils/session";
import Panel from "../components/Schedule/Panel";
import ScheduleServiceProvider, { useScheduleService } from "../components/Schedule/ScheduleServiceContext";
import MenuProvider from "../contexts/MenuContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { get } from "lodash";
import { useRouter } from "next/router";

type FormData = {
    services: number[];
    server?: unknown;
}

const SchedulesServicesPage = () => {

    const { services, selecteds, addSelectedService, removeSelectedService } = useScheduleService();

    const {
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
        clearErrors,
    } = useForm<FormData>();
    const router = useRouter();

    const onChangeService = (checked: boolean, serviceId: number) => {

        if (checked) {
            addSelectedService(serviceId);
        } else {
            removeSelectedService(serviceId);
        }

    }

    const save: SubmitHandler<FormData> = ({ services }) => {

        if (services.length === 0) {
            setError("services", {
                type: "required",
                message: "Escolha pelo menos um serviço.",
            });
            return false;
        }

        axios
            .post("/api/schedules/services", { services, })
            .then(() => router.push("/schedules-payment"))
            .catch((error) => {
                setError("server", {
                    message: error.response?.data.message ?? error.message,
                });
            });

    }

    useEffect(() => {

        setValue("services", selecteds.map((service) => service.id));

        if (selecteds.length > 0) {
            clearErrors();
        }

    }, [selecteds, setValue, clearErrors]);

    return (
        <Page
            pageColor="blue"
            title="Escolha os Serviços"
            id="schedules-services"
            panel={<Panel />}
        >
            <form onSubmit={handleSubmit(save)}>

                <input type="hidden" name="schedule_at" />
                <input type="hidden" name="option" />

                <div className="options">
                    {services.map(({ id, name, description, price }) => (
                        <label
                            key={String(id)}
                        >
                            <input
                                type="checkbox"
                                name="service"
                                value={id}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    onChangeService(event.target.checked, Number(id));
                                }}
                            />
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

                <Toast
                    type='danger'
                    open={Object.keys(errors).length > 0}
                    onClose={() => clearErrors()}
                >
                    {Object.keys(errors).map((err) => (
                        get(errors, `${err}.message`, 'Verifique os serviços selecionados.')
                    ))}
                </Toast>

                <Footer />
            </form>
        </Page>
    )

}

const ComponentPage: NextPage = () => {

    return (
        <ScheduleServiceProvider>
            <Header />
            <SchedulesServicesPage />
        </ScheduleServiceProvider>
    );

}

export default ComponentPage;