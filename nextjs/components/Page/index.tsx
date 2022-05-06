import { ReactNode } from "react";

type PageColor = 'blue' | 'green' | 'yellow' | 'red';

type PageProps = {
    children: ReactNode;
    title: string | ReactNode;
    id: string;
    pageColor?: PageColor;
    panel?: ReactNode;
};

const Page = ({
    children,
    title,
    id,
    pageColor,
    panel,
}: PageProps) => {

    return (
        <section
            id={id}
            className={["page", pageColor].join(" ")}
        >
            <header>
                <h1>{title}</h1>
            </header>

            <main>
                {children}
            </main>

            {panel && panel}
        </section>
    );

}

export default Page;