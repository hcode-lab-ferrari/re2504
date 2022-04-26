type PageColor = 'blue' | 'green' | 'yellow' | 'red';

type PageProps = {
    children: React.ReactNode;
    title: string;
    id: string;
    pageColor: PageColor;
};

const Page = ({
    children,
    title,
    id,
    pageColor,
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
        </section>
    );

}

export default Page;