import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../../../types/Auth/AuthContextType";
import { AuthProviderProps } from "../../../types/Auth/AuthProviderProps";
import { CurrentFormType } from "../../../types/Auth/CurrentFormType";
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
    loadingFormForget: false,
});

const AuthProvider = ({ children }: AuthProviderProps) => {

    const router = useRouter();
    const [currentForm, setCurrentForm] = useState<CurrentFormType>('email');
    const [email, setEmail] = useState('');
    const [loadingFormForget, setLoadingFormForget] = useState(false);
    const [nextURL, setNextURL] = useState('/profile');
    const [token, setToken] = useState<string | null>(null);

    const onSubmitEmail = useCallback((e: React.FormEvent<HTMLFormElement>) => {
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
    }, [email]);

    const redirectToNextURL = useCallback(() => router.push(nextURL), [nextURL, router]);

    const onSubmitLogin = (data: FormDataLogin) => {

        axios.post<FormLoginResponse>(`/api/login`, data).then(({ data: { token } }) => {
            setToken(token);
            redirectToNextURL();

        }).catch(error => console.error(error));
    }

    const onSubmitRegister = (data: FormDataRegister) => {

        axios.post<FormLoginResponse>(`/api/register`, data).then(({ data: { token } }) => {

            setToken(token);
            redirectToNextURL();

        }).catch(error => console.error(error));
    }

    const onSubmitPasswordReset = useCallback((data: FormDataPasswordReset) => {

        data.token = String(router.query.token) as string;

        axios.post<FormLoginResponse>(`/api/password-reset`, data).then(({ data: { token } }) => {

            setToken(token);
            redirectToNextURL();

        }).catch(error => console.error(error));
    }, [router]);

    const onSubmitForget = useCallback(() => {

        setLoadingFormForget(true);

        axios.post<{ success: boolean }>(`/auth/forget`, { email }, {
            baseURL: process.env.API_URL
        }).then(({ data: { success } }) => {

            console.info({ success });

        }).catch(error => console.error(error)).finally(() => setLoadingFormForget(false));
    }, [email]);

    const getHashForm = useCallback(() => {
        let hash = window.location.hash.replace('#', '') as CurrentFormType;

        if (!['email', 'login', 'register', 'forget', 'reset'].includes(hash) || (!email && ['login', 'forget'].includes(hash))) {
            hash = 'email';
        }

        return hash;

    }, [email]);

    const handlerCurrentForm = useCallback(() => {

        setCurrentForm(getHashForm());

    }, [setCurrentForm, getHashForm]);

    useEffect(() => {

        window.addEventListener('load', handlerCurrentForm);
        window.addEventListener('hashchange', handlerCurrentForm);
        router.events.on('hashChangeComplete', handlerCurrentForm);

        return () => {
            window.removeEventListener('load', handlerCurrentForm);
            window.removeEventListener('hashchange', handlerCurrentForm);
            router.events.off('hashChangeComplete', handlerCurrentForm);
        }

    }, [router, handlerCurrentForm]);

    useEffect(() => {

        setCurrentForm(getHashForm());

        const params = new URLSearchParams(window.location.search);

        if (params.has('next')) {
            setNextURL(String(params.get('next')));
        }

    }, []);

    return <AuthContext.Provider value={{
        currentForm,
        email,
        setEmail,
        onSubmitEmail,
        onSubmitLogin,
        onSubmitRegister,
        onSubmitPasswordReset,
        onSubmitForget,
        loadingFormForget
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
