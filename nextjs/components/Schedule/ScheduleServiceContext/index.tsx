import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Service } from "../../../types/Service";

type ScheduleServiceContextProps = {
    services: Service[];
    selecteds: Service[];
    addSelectedService: (serviceId: number) => void;
    removeSelectedService: (serviceId: number) => void;
}

const ScheduleServiceContext = createContext<ScheduleServiceContextProps>({
    services: [],
    selecteds: [],
    addSelectedService: () => { },
    removeSelectedService: () => { },
});

export default function ScheduleServiceProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [services, setServices] = useState<Service[]>([]);
    const [selecteds, setSelecteds] = useState<Service[]>([]);

    const addSelectedService = (serviceId: number) => {

        const service = services.find((service) => service.id === serviceId);

        if (service) {
            setSelecteds([...selecteds, service]);
        }

    };

    const removeSelectedService = (serviceId: number) => {

        const service = services.find((service) => service.id === serviceId);

        if (service) {
            setSelecteds(selecteds.filter((item) => item.id !== service.id));
        }

    };

    const loadServices = () => {
        axios
            .get<Service[]>(`/services`, {
                baseURL: process.env.API_URL,
            })
            .then(({ data }) => setServices(data));
    }

    useEffect(() => loadServices(), []);

    return (
        <ScheduleServiceContext.Provider
            value={{ services, selecteds, addSelectedService, removeSelectedService }}
        >
            {children}
        </ScheduleServiceContext.Provider>
    )

}

export function useScheduleService() {
    const context = useContext(ScheduleServiceContext);
    if (!context) {
        throw new Error('useScheduleService must be used within a ScheduleServiceProvider');
    }
    return context;
}