import { Address } from "./Address";
import { PaymentSituation } from "./PaymentSituation";
import { Person } from "./Person";
import { ScheduleService } from "./ScheduleService";
import { TimeOption } from "./TimeOption";

export type Schedule = {
	id: number;

	personId: number;
	person?: Person;

	timeOptionId: number;
	timeOption?: TimeOption;

	paymentSituationId: number;
	paymentSituation?: PaymentSituation;

	billingAddressId: number;
	billingAddress?: Address;

	scheduleAt: string;
	total: string;
	installments: number;
	document: string;
	paymentMethod: string;
	cardToken: string;

	ScheduleService?: ScheduleService[];

	address?: Address;


}