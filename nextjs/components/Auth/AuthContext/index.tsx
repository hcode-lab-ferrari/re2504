import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContextType } from "../../../types/Auth/AuthContextType";
import { AuthProviderProps } from "../../../types/Auth/AuthProviderProps";
import { CurrentFormType } from "../../../types/Auth/CurrentFormType";
import { FormDataForget } from "../../../types/Auth/FormDataForget";
import { FormDataLogin } from "../../../types/Auth/FormDataLogin";
import { FormDataPasswordReset } from "../../../types/Auth/FormDataPasswordReset";
import { FormDataRegister } from "../../../types/Auth/FormDataRegister";
import { FormEmailResponse } from "../../../types/Auth/FormEmailResponse";
import { FormLoginResponse } from "../../../types/Auth/FormLoginResponse";

const AuthContext = createContext<AuthContextType>({
    currentForm: 'email',
    email: '',
    setEmail: () => { },
    onSubmitEmail: () => { },
    onSubmitLogin: () => { },
    onSubmitRegister: () => { },
    onSubmitPasswordReset: () => { },
    onSubmitForget: () => { },
});

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [currentForm, setCurrentForm] = useState<CurrentFormType>('email');
    const [email, setEmail] = useState('');

    const onSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post<FormEmailResponse>(`/auth`, {
            email
        }, {
            baseURL: process.env.API_URL
        }).then(({ data: { exists } }) => {

            if (exists) {
                setCurrentForm('login');
            } else {
                setCurrentForm('register');
            }

        }).catch(error => console.error(error));
    }

    const onSubmitLogin = (data: FormDataLogin) => {

        axios.post<FormLoginResponse>(`/api/login`, data).then(({ data: { token } }) => {

            //TO DO

        }).catch(error => console.error(error));
    }

    const onSubmitRegister = (data: FormDataRegister) => {

        axios.post<FormLoginResponse>(`/api/register`, data).then(({ data: { token } }) => {

            //TO DO

        }).catch(error => console.error(error));
    }

    const onSubmitPasswordReset = (data: FormDataPasswordReset) => {

        axios.post<FormLoginResponse>(`/api/password-reset`, data).then(({ data: { token } }) => {

            //TO DO

        }).catch(error => console.error(error));
    }

    const onSubmitForget = (data: FormDataForget) => {

        axios.post<{ success: boolean }>(`/auth/forget`, data, {
            baseURL: process.env.API_URL
        }).then(({ data: { success } }) => {

            //TO DO

        }).catch(error => console.error(error));
    }

    return <AuthContext.Provider value={{
        currentForm,
        email,
        setEmail,
        onSubmitEmail,
        onSubmitLogin,
        onSubmitRegister,
        onSubmitPasswordReset,
        onSubmitForget
    }}>{children}</AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;

}
