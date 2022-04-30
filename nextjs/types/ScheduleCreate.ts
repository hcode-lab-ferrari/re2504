export type ScheduleCreate = {
    timeOptionId: number;
	billingAddressId: number;
	scheduleAt: string;
	services: number[];
	installments: number;
	cardToken: string;
	paymentMethod: string;
	document: string;
}