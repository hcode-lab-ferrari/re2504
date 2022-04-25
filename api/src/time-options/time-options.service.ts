import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimeOptionsService {
    constructor(private prisma: PrismaService) {}

    async getAll(day?: number) {
        return this.prisma.timeOption.findMany(
            !isNaN(day)
                ? {
                      where: {
                          day,
                      },
                  }
                : undefined,
        );
    }

    async get(id: number) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is required.');
        }

        const timeOption = await this.prisma.timeOption.findUnique({
            where: {
                id,
            },
        });

        if (!timeOption) {
            throw new BadRequestException('Time option not found.');
        }

        return timeOption;
    }

    getDateFromTimeString(time: string) {
        const splittedTime = time.split(':');

        if (splittedTime.length !== 2) {
            throw new BadRequestException('Invalid time.');
        }

        const hours = Number(splittedTime[0]);
        const minutes = Number(splittedTime[1]);

        if (hours < 0 || hours > 23 || isNaN(hours)) {
            throw new BadRequestException('Invalid time.');
        }

        if (minutes < 0 || minutes > 59 || isNaN(minutes)) {
            throw new BadRequestException('Invalid time.');
        }

        const timeDate = new Date();

        timeDate.setHours(hours, minutes, 0);

        return timeDate;
    }

    async create({ day, time }: { day: number; time: string }) {
        if (isNaN(day) || day < 0 || day > 6) {
            throw new BadRequestException('Day is required.');
        }

        if (!time) {
            throw new BadRequestException('Time is required.');
        }

        day = Number(day);

        return this.prisma.timeOption.create({
            data: {
                day,
                time: this.getDateFromTimeString(time),
            },
        });
    }

    async update(
        id: number,
        {
            day,
            time,
        }: {
            day?: number;
            time?: string;
        },
    ) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is required.');
        }

        const dataTimeOption = {} as Prisma.TimeOptionUpdateInput;

        if (day) {
            dataTimeOption.day = Number(day);
        }

        if (time) {
            dataTimeOption.time = this.getDateFromTimeString(time);
        }

        return this.prisma.timeOption.update({
            data: dataTimeOption,
            where: {
                id,
            },
        });
    }

    async delete(id: number) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is required.');
        }

        const timeOption = await this.get(id);

        if (!timeOption) {
            throw new NotFoundException('Time option not found.');
        }

        await this.prisma.timeOption.delete({
            where: {
                id,
            },
        });

        return {
            success: true,
        };
    }
}
