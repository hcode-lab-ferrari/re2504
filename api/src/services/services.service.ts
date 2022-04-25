import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) {}

    async getAll(id?: number[]) {
        return this.prisma.service.findMany(
            id instanceof Array && id.length > 0
                ? { where: { id: { in: id } } }
                : undefined,
        );
    }

    async get(id: number) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is required.');
        }

        const service = await this.prisma.service.findUnique({
            where: {
                id,
            },
        });

        if (!service) {
            throw new NotFoundException('Service not found.');
        }

        return service;
    }

    async create({
        name,
        price,
        description,
    }: {
        name: string;
        price: number;
        description: string;
    }) {
        if (!name) {
            throw new BadRequestException('Name is required.');
        }

        if (!price) {
            throw new BadRequestException('Price is required.');
        }

        if (!description) {
            throw new BadRequestException('Description is required.');
        }

        price = Number(price);

        return this.prisma.service.create({
            data: {
                name,
                price,
                description,
            },
        });
    }

    async update(
        id: number,
        {
            name,
            price,
            description,
        }: {
            name?: string;
            price?: number;
            description?: string;
        },
    ) {
        id = Number(id);

        await this.get(id);

        const dataService = {} as Prisma.ServiceUpdateInput;

        if (name) {
            dataService.name = name;
        }

        if (price) {
            dataService.price = price;
        }

        if (description) {
            dataService.description = description;
        }

        return this.prisma.service.update({
            data: dataService,
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

        await this.get(id);

        await this.prisma.service.delete({
            where: {
                id,
            },
        });

        return {
            success: true,
        };
    }

    async getAmount(services: string): Promise<number> {
        const servicesId = services
            ? services
                  .split(',')
                  .map(id => Number(id))
                  .filter(id => !isNaN(id))
            : [];

        if (servicesId.length === 0) {
            throw new BadRequestException('Services are required.');
        }

        return Number(
            (await this.getAll(servicesId))
                .map(service => Number(service.price))
                .reduce((a, b) => a + b),
        );
    }
}
