import { Prisma } from '@prisma/client';

export const include = {
    person: {
        include: {
            User: true,
        },
    },
    ScheduleService: {
        include: {
            service: true,
        },
    },
    address: true,
    paymentSituation: true,
    timeOption: true,
} as Prisma.ScheduleInclude;
