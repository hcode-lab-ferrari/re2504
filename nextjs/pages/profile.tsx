import axios from "axios";
import { format } from "date-fns";
import { get } from "lodash";
import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../components/Header";
import Page from "../components/Page";
import Footer from "../components/Page/Footer";
import Title from "../components/Page/Title";
import Toast from "../components/Toast";
import { MeResponse } from "../types/MeResponse";
import { User } from "../types/User";
import { redirectToAuth } from "../utils/redirectToAuth";
import { withAuthentication } from "../utils/withAuthentication";

type FormData = {
    name: string;
    email: string;
    birthAt: string;
    server?: string;
}

type ComponentPageProps = {
    token: string;
    user: User;
}

const ComponentPage: NextPage<ComponentPageProps> = ({ token, user }) => {

    const [toastType, setToastType] = useState<'success' | 'danger'>('danger');
    const [toastOpen, setToastOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm<FormData>({
        defaultValues: {
            name: user.person?.name,
            email: user.email,
            birthAt: user.person?.birthAt ? format(new Date(String(user.person?.birthAt)), 'yyyy-MM-dd') : '',
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        axios.put(`/auth/profile`, data, {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(() => {
            setToastType('success');
            setToastOpen(true);
            setTimeout(() => {
                setToastOpen(false);
            }, 3000);
        }).catch((e) => {
            setToastType('danger');
            setError('server', e.messge);
            setToastOpen(true);
        });
    }

    useEffect(() => {

        if (Object.keys(errors).length) {
            setToastType('danger');
            setToastOpen(true);
        } else {
            setToastOpen(false);
        }

    }, [errors]);

    return <Fragment>
        <Header />
        <Page
            title={"Editar Dados"}
            id="profile"
        >
            <Title value="Dados Pessoais" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <input type="text" id="name" {...register('name', {
                        required: 'Nome é obrigatório',
                    })} />
                    <label htmlFor="name">Nome Completo</label>
                </div>

                <div className="field">
                    <input type="email" id="email" {...register('email', {
                        required: 'E-mail é obrigatório',
                    })} />
                    <label htmlFor="email">E-mail</label>
                </div>

                <div className="field">
                    <input type="date" id="birth_at" {...register('birthAt', {
                        valueAsDate: true
                    })} />
                    <label htmlFor="birth_at">Data de Nascimento</label>
                </div>

                <Toast
                    type={toastType}
                    open={toastOpen}
                    onClose={() => clearErrors()}
                >
                    {Object.keys(errors).map((err) => (
                        get(errors, `${err}.message`, 'Verifique os serviços selecionados.')
                    ))}
                    {Object.keys(errors).length === 0 && 'Dados atualizados com sucesso.'}
                </Toast>

                <Footer
                    buttons={[
                        {
                            value: "Salvar",
                            type: 'submit'
                        }
                    ]}
                />
            </form>

        </Page>
    </Fragment>
}

export default ComponentPage;

export const getServerSideProps = withAuthentication(async (context) => {

    try {

        const { token } = context.req.session;

        const { data: { user } } = await axios.get<MeResponse>('/auth/me', {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return {
            props: { token, user }
        }

    } catch (e) {
        return redirectToAuth(context);
    }

});