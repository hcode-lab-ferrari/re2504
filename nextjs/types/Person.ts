import { User } from "./User";

export type Person = {
    id: number;
    name: string;
    birthAt?: string;
    phone?: string;
    document?: string;

    User?: User[];
}