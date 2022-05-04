import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { FormLoginResponse } from "../types/Auth/FormLoginResponse";

export function apiPostLogin<T extends FormLoginResponse>(url: string) {
    return async function handler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const { data } = await axios.post<T>(url, req.body, {
                baseURL: process.env.API_URL
            });

            req.session.token = data.token;

            await req.session.save();

            res.json(data);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }

    }
}