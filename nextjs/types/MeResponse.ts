import { User } from "./User";

export type MeResponse = {
    auth: {
        name: string;
        email: string;
        photo?: string;
        id: number;
        iat: number;
        exp: number;
    },
    user: User;
}