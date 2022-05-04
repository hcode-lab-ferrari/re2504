/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAuth } from "../AuthContext";

const FormForget = () => {

    const { onSubmitForget, loadingFormForget } = useAuth();

    useEffect(onSubmitForget, []);

    return <form id="auth-forget">
        <h1>Esqueci a senha</h1>

        <hr />

        {loadingFormForget && <div className="loading-wrap">
            <div className="loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Por favor, aguarde...</p>
        </div>}

        {!loadingFormForget && <div className="message">
            <img src="/images/check-circle.svg" alt="Ok" />
            <span>Verifique as instruções no seu e-mail.</span>
        </div>}
    </form>
}
export default FormForget;