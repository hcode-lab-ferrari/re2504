import { Schedule } from "./Schedule";

export type ScheduleSession = {
  scheduleAt?: string;
  services?: number[];
  timeOptionId?: number;
  billingAddressId?: number;
  cardFirstSixDigits: string;
  cardLastFourDigits: string;
  paymentTypeId: string;
  data?: Schedule;
};
