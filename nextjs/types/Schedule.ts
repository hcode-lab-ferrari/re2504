import { ScheduleService } from "./ScheduleService";

export type Schedule = {
    id: number;
	personId: number;
	timeOptionId: number;
	paymentSituationId: number;
	billingAddressId: number;
	scheduleAt: Date;
	total: number;
	installments: number;
	document: string;
	paymentMethod: string;
	cardToken: string;
    ScheduleService: ScheduleService[];
}