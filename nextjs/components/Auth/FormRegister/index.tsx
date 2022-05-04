import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormDataRegister } from "../../../types/Auth/FormDataRegister";
import { useAuth } from "../AuthContext";

const FormRegister = () => {

    const { register, handleSubmit } = useForm<FormDataRegister>();
    const { email, setEmail, onSubmitRegister } = useAuth();

    return <form id="auth-register" className="register" onSubmit={handleSubmit<FormDataRegister>(onSubmitRegister)}>
        <h1>Criar conta</h1>

        <hr />

        <div className="field">
            <input type="email" name="email" id="email-register" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email-register">E-mail</label>
        </div>

        <div className="field">
            <input type="text" id="name" {...register('name', {
                required: 'Preencha o campo nome.'
            })} />
            <label htmlFor="name">Nome Completo</label>
        </div>

        <div className="field">
            <input type="date" id="birth_at" {...register('birthAt')} />
            <label htmlFor="birth_at">Data de Nascimento</label>
        </div>

        <div className="field">
            <input type="password" id="password_new" {...register('password', {
                required: 'Preencha o campo senha.'
            })} />
            <label htmlFor="password_new">Crie uma Senha</label>
        </div>

        <div className="field">
            <input
                type="password"
                id="password_confirm"
                {...register('passwordConfirm', {
                    required: 'Preencha o campo confirmação de senha.',
                })}
            />
            <label htmlFor="password_confirm">Confirme a Senha</label>
        </div>

        <div className="actions">
            <Link href="/auth#login">
                <a className="link">Já tem uma conta?</a>
            </Link>
            <button type="submit">Cadastrar</button>
        </div>
    </form>
}

export default FormRegister;