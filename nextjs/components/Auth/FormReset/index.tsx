import { useForm } from "react-hook-form";
import { FormDataPasswordReset } from "../../../types/Auth/FormDataPasswordReset";
import { useAuth } from "../AuthContext";

const FormReset = () => {

    const { register, handleSubmit } = useForm<FormDataPasswordReset>();
    const { onSubmitPasswordReset } = useAuth();

    return <form id="auth-reset" className="forget" onSubmit={handleSubmit<FormDataPasswordReset>(onSubmitPasswordReset)}>
        <h1>Redefinir senha</h1>

        <hr />

        <div className="field">
            <input type="password" id="password_reset" {...register('password', {
                required: 'Preencha a nova senha',
            })} />
            <label htmlFor="password_reset">Crie uma Nova Senha</label>
        </div>

        <div className="actions">
            <button type="submit">Redefinir</button>
        </div>
    </form>
}

export default FormReset;