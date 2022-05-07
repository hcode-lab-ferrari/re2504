import { Schedule } from "./Schedule";
import { Service } from "./Service";

export type ScheduleService = {
    scheduleId: number;
    schedule?: Schedule;

    serviceId: number;
    service?: Service;
}