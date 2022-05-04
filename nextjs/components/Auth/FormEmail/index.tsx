import Link from "next/link";
import React from "react";
import { useAuth } from "../AuthContext";

const FormEmail = () => {

    const { email, setEmail, onSubmitEmail } = useAuth();

    return <form id="auth-email" onSubmit={onSubmitEmail}>
        <h1>Autenticação</h1>

        <hr />

        <div className="field">
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email">E-mail</label>
        </div>

        <div className="actions">
            <Link href="/auth#register">
                <a className="link">Criar uma Conta</a>
            </Link>
            <button type="submit">Próxima</button>
        </div>
    </form>
}

export default FormEmail;