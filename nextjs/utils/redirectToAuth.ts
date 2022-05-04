import { Redirect, GetServerSidePropsContext } from "next";

export function redirectToAuth({ resolvedUrl }: GetServerSidePropsContext) {
    return {
        redirect: {
            destination: `/auth?next=${encodeURIComponent(resolvedUrl)}`,
        } as Redirect
    }
}