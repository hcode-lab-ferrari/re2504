import { CurrentFormType } from "./CurrentFormType";
import { FormDataLogin } from "./FormDataLogin";
import { FormDataPasswordReset } from "./FormDataPasswordReset";
import { FormDataRegister } from "./FormDataRegister";

export type AuthContextType = {
    currentForm: CurrentFormType;
    email: string;
    setEmail: (value: string) => void;
    onSubmitEmail: (event: React.FormEvent<HTMLFormElement>) => void;
    onSubmitLogin: (data: FormDataLogin) => void;
    onSubmitRegister: (data: FormDataRegister) => void;
    onSubmitPasswordReset: (data: FormDataPasswordReset) => void;
    onSubmitForget: () => void;
    loadingFormForget: boolean;
    token: string | null;
}