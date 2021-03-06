import axios from "axios"
import { NextPage } from "next"
import { Fragment, useEffect } from "react"
import Header from "../components/Header"
import Page from "../components/Page"
import { withAuthentication } from "../utils/withAuthentication"
import Link from "next/link";
import { redirectToAuth } from "../utils/redirectToAuth"
import { Address } from "../types/Address"
import Toast from "../components/Toast"
import { get } from "lodash"
import { SubmitHandler, useForm } from "react-hook-form"
import Footer from "../components/Page/Footer"
import { useRouter } from "next/router"

type FormData = {
    billingAddressId: string;   
}

type ComponentPageProps = {
    addresses: Address[];
    addressSelected: number;
}

const ComponentPage: NextPage<ComponentPageProps> = ({ addresses, addressSelected }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setError,
        setValue,
    } = useForm<FormData>();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormData> = ({ billingAddressId }) => {

        if (!Number(billingAddressId) || isNaN(Number(billingAddressId))) {
            setError("billingAddressId", {
                message: "Selecione um endereço de cobrança.",
            });
        }

        axios.post('/api/schedules/address', { billingAddressId, })
            .then(() => { router.push("/schedules-payment") })
            .catch((e: any) => {
                if (e.response.data.error === "Unauthorized") {
                    router.push(`/auth?next=${router.pathname}`);
                } else {
                    setError("billingAddressId", {
                        type: "required",
                        message: e.message,
                    });
                }
            });

    }

    useEffect(() => {
        if (addressSelected > 0) setValue("billingAddressId", String(addressSelected));
    }, [addressSelected]);
    
    return (
        <Fragment>
            <Header />
            <Page
                pageColor="blue"
                title="Endereço de Cobrança"
                id="schedules-address"
            >
                <form onSubmit={handleSubmit<FormData>(onSubmit)}>

                    <Link href="/schedules-address-create">
                        <a className="btn-create">Novo Endereço</a>
                    </Link>

                    <hr />

                    <div className="addresses">
                        {addresses.map(({
                            id,
                            street,
                            number,
                            complement,
                            district,
                            city,
                            state,
                            zipCode,
                        }) => (

                            <label key={String(id)}>
                                <div>
                                    <input
                                        type="radio"
                                        {...register("billingAddressId")}
                                        value={id}
                                    />
                                    <div className="circle">
                                        <div></div>
                                    </div>
                                    <address>
                                        <strong>{street}{number && <Fragment>, {number}</Fragment>}</strong>
                                        <br />
                                        {complement && <Fragment>{complement} - </Fragment>}
                                        {district}
                                        <br />
                                        {city} - {state}
                                        <br />
                                        {zipCode}
                                    </address>
                                </div>
                                <Link href={`/schedules-address-update?id=${id}`}>
                                    <a className="btn-update">Editar</a>
                                </Link>
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
        </Fragment>
    )
}

export default ComponentPage;

export const getServerSideProps = withAuthentication(async (context) => {

    try {

        const { data: addresses } = await axios.get<Address[]>("/me/addresses", {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${context.req.session.token}`,
            },
        });

        return {
            props: {
                addresses,
                addressSelected: Number(context.query.selected) ?? 0,
            },
        };

    } catch (e: any) {

        return redirectToAuth(context);

    }

});