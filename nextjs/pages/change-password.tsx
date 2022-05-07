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
    password: string;
    passwordNew: string;
    passwordConfirm: string;
    server?: string;
}

type ComponentPageProps = {
    token: string;
}

const ComponentPage: NextPage<ComponentPageProps> = ({ token }) => {

    const [toastType, setToastType] = useState<'success' | 'danger'>('danger');
    const [toastOpen, setToastOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = ({ password: passwordCurrent, passwordConfirm, passwordNew }) => {

        if (passwordNew !== passwordConfirm) {
            setError('passwordConfirm', { message: 'Confirme a senha corretamente.' });
            return false;
        }

        axios.put(`/auth/password`, {
            passwordCurrent,
            passwordNew,
        }, {
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
            title={"Alterar Senha"}
            id="change-password"
        >
            <Title value="Informe a sua Senha" />

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="field">
                    <input type="password" id="password" {...register('password', {
                        required: 'Senha é obrigatória',
                    })} />
                    <label htmlFor="password">Senha Atual</label>
                </div>

                <Title value="Crie uma Nova Senha" />

                <div className="field">
                    <input type="password" id="password_new" {...register('passwordNew', {
                        required: 'Nova Senha é obrigatória',
                    })} />
                    <label htmlFor="password_new">Nova Senha</label>
                </div>

                <div className="field">
                    <input
                        type="password"
                        id="password_confirm"
                        {...register('passwordConfirm', {
                            required: 'Confirmação de Senha é obrigatória',
                        })}
                    />
                    <label htmlFor="password_confirm">Confirme a Nova Senha</label>
                </div>

                <Toast
                    type={toastType}
                    open={toastOpen}
                    onClose={() => clearErrors()}
                >
                    {Object.keys(errors).map((err) => (
                        get(errors, `${err}.message`, 'Houve um problema, tente novamente mais tarde.')
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
    </Fragment >
}

export default ComponentPage;

export const getServerSideProps = withAuthentication(async ({ req: { session: { token } } }) => {

    return {
        props: {
            token
        }
    }

});