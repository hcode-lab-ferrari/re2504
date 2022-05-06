import axios from "axios"
import { NextPage } from "next"
import { Fragment, useCallback, useEffect } from "react"
import Header from "../components/Header"
import Page from "../components/Page"
import { withAuthentication } from "../utils/withAuthentication"
import Link from "next/link";
import { redirectToAuth } from "../utils/redirectToAuth"
import { Address } from "../types/Address"
import Toast from "../components/Toast"
import { get } from "lodash"
import { SubmitHandler, useForm } from "react-hook-form"
import Footer, { ButtonBack, ButtonContinue } from "../components/Page/Footer"
import { getOnlyNumbers } from "../utils/getOnlyNumbers"
import { useRouter } from "next/router"
import { useAuth } from "../components/Auth/AuthContext"

type ComponentPageProps = {
    address: Address;
}

type ZipCodeResponse = {
    cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
}

type FormData = {
    street: string;
    number?: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    id?: string;
}

type AddressUpdateResponse = Address;
type AddressApiResponse = Address;

const ComponentPage: NextPage<ComponentPageProps> = ({ address }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setError,
        watch,
        setValue,
    } = useForm<FormData>();

    const zipCode = watch("zipCode");
    const router = useRouter();
    const { token } = useAuth();

    const searchZipCode = useCallback((value: string) => {

        value = getOnlyNumbers(value);

        if (value.length >= 8 && value !== getOnlyNumbers(zipCode)) {

            axios.get<ZipCodeResponse>(`/addresses/zip-code/${value}`, {
                baseURL: process.env.API_URL,
            })
                .then(({ data }) => {
                    
                    clearErrors();

                    setValue("street", data.logradouro);
                    setValue("district", data.bairro);
                    setValue("complement", data.complemento);
                    setValue("city", data.localidade);
                    setValue("state", data.uf);
                    setValue("country", "Brasil");

                    const numberField = document.querySelector<HTMLInputElement>("#number");

                    if (numberField) {
                        numberField.focus();
                    }

                })
                .catch(() => {
                    setError("zipCode", {
                        type: "required",
                        message: "O CEP não foi encontrado."
                    })
                });

        }

    }, [zipCode]);

    const onSubmit: SubmitHandler<FormData> = (data) => {

        data.zipCode = getOnlyNumbers(zipCode);

        axios.put<AddressUpdateResponse>(`/addresses/${address.id}`, data, {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(({ data: address }) => {
                router.push(`/schedules-address?selected=${address.id}`);
            })
            .catch((e) => {
                if (e.response.data.error === "Unauthorized") {
                    router.push(`/auth?next=${router.pathname}`);
                } else {
                    setError("zipCode", {
                        type: "required",
                        message: e.message,
                    });
                }
            });

    }

    const onClickDelete = () => {

        if (confirm("Deseja realmente excluir o endereço?")) {

            axios.delete(`/addresses/${address.id}`, {
                baseURL: process.env.API_URL,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    router.push(`/schedules-address`);
                })
                .catch((e) => {
                    if (e.response.data.error === "Unauthorized") {
                        router.push(`/auth?next=${router.pathname}`);
                    } else {
                        setError("id", {
                            type: "required",
                            message: e.message,
                        });
                    }
                });

        }

    }
    
    return (
        <Fragment>
            <Header />
            <Page
                pageColor="blue"
                title="Novo Endereço"
                id="schedules-address-form"
            >
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="fields zipcode">
                        <div className="field">
                            <input
                                type="text"
                                id="zipcode"
                                {...register("zipCode", {
                                    required: "O campo CEP é obrigatório.",
                                    onChange: (event) => { searchZipCode(event.target.value) },
                                    value: address.zipCode
                                })}
                            />
                            <label htmlFor="zipcode">CEP</label>
                        </div>
                        <div className="field">
                            <button
                                type="button"
                                id="btn-search"
                                onClick={() => searchZipCode(zipCode)}
                            >Buscar</button>
                        </div>
                    </div>

                    <div className="fields address-number">
                        <div className="field">
                            <input
                                type="text"
                                id="address"
                                {...register("street", {
                                    required: "O campo endereço é obrigatório.",
                                    value: address.street,
                                })}
                            />
                            <label htmlFor="address">Endereço</label>
                        </div>

                        <div className="field">
                            <input
                                type="text"                                
                                id="number"
                                {...register("number", {
                                    value: address.number,
                                })}
                            />
                            <label htmlFor="number">Número</label>
                        </div>
                    </div>

                    <div className="field">
                        <input
                            type="text"
                            id="complement"
                            {...register("complement", {
                                value: address.complement,
                            })}
                        />
                        <label htmlFor="complement">Complemento</label>
                    </div>

                    <div className="field">
                        <input
                            type="text"
                            id="district"
                            {...register("district", {
                                required: "O campo bairro é obrigatório.",
                                value: address.district,
                            })}
                        />
                        <label htmlFor="district">Bairro</label>
                    </div>

                    <div className="field">
                        <input
                            type="text"
                            id="city"
                            {...register("city", {
                                required: "O campo cidade é obrigatório.",
                                value: address.city,
                            })}
                        />
                        <label htmlFor="city">Cidade</label>
                    </div>

                    <div className="fields">
                        <div className="field">
                            <input
                                type="text"
                                id="state"
                                {...register("state", {
                                    required: "O campo estado é obrigatório.",
                                    value: address.state,
                                })}
                            />
                            <label htmlFor="state">Estado</label>
                        </div>

                        <div className="field">
                            <input
                                type="text"
                                id="country"
                                {...register("country", {
                                    required: "O campo país é obrigatório",
                                    value: address.country,
                                })}
                            />
                            <label htmlFor="country">País</label>
                        </div>
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
                    <Footer
                        buttons={[
                            ButtonBack,
                            {
                                value: "Excluir",
                                type: "button",
                                onClick: onClickDelete,
                                className: "red",
                            },
                            ButtonContinue,
                        ]}
                    />

                </form>
            </Page>
        </Fragment>
    )
}

export default ComponentPage;

export const getServerSideProps = withAuthentication(async (context) => {

    try {

        const { data: address } = await axios.get<AddressApiResponse>(`/addresses/${context.query.id}`, {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${context.req.session.token}`,
            },
        });
    
        return {
            props: {
                address,
            },
        };

    } catch (e: any) {
        return redirectToAuth(context);
    }

});