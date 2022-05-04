import axios from "axios"
import { NextPage } from "next"
import { Fragment } from "react"
import Header from "../components/Header"
import Page from "../components/Page"
import { withAuthentication } from "../utils/withAuthentication"

const ComponentPage: NextPage = () => {
    return <Fragment>
        <Header />
        <Page
            pageColor="blue"
            title="Endereços"
            id="schedules-payment"
        >
            <form></form>
        </Page></Fragment>
}

export default ComponentPage;

export const getServerSideProps = withAuthentication();