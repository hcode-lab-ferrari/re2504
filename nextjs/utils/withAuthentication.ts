import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from "./session";
import { redirectToAuth } from "./redirectToAuth";

export function withAuthentication<P extends { [key: string]: unknown } = { [key: string]: unknown }>(

    handler?: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>

) {

    return withIronSessionSsr((context) => {

        const { token } = context.req.session;

        try {
            if (!token) {
                throw new Error('Não autorizado.');
            }

            const jwtDataBase64 = token.split('.')[1];

            const data = JSON.parse(
                Buffer.from(jwtDataBase64, 'base64').toString()
            );

            if (data.exp * 1000 < Date.now()) {
                throw new Error('Token expirado.');
            }

            if (typeof handler === 'function') {
                return handler(context);
            } else {
                return {
                    props: {} as P
                }
            }
        } catch (error: any) {
            return redirectToAuth(context);
        }

    }, sessionOptions);

}