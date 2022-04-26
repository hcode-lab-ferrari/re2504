import { Fragment } from "react";
import Calendar from "../components/Calendar";
import Header from "../components/Header";
import Page from "../components/Page";
import Footer from "../components/Page/Footer";

const SchedulesNew = () => {

    return (
        <Fragment>
            <Header />
            <Page
                pageColor="blue"
                title="Escolha a Data"
                id="schedules-new"
            >
                <Calendar />

                <form action="schedules-time-options.html">
                    <input type="hidden" name="schedule_at" />

                    <Footer />
                </form>
            </Page>
        </Fragment>
    );

}

export default SchedulesNew;