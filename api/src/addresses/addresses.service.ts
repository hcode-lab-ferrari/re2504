import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { UpdateAddressesDto } from './dto/update-addresses.dto';
import { HttpService } from '@nestjs/axios';
import { isValidNumber } from '../../utils/validation-number';

@Injectable()
export class AddressesService {
    constructor(
        private prisma: PrismaService,
        private httpService: HttpService,
    ) {}

    async findByPerson(personId: number) {
        return this.prisma.address.findMany({
            where: {
                personId: isValidNumber(personId),
            },
        });
    }

    async getAll() {
        return this.prisma.address.findMany();
    }

    async getAllByUser(userId: number) {
        return this.prisma.address.findMany({
            where: {
                person: {
                    User: {
                        some: {
                            id: isValidNumber(userId),
                        },
                    },
                },
            },
        });
    }

    async get(id: number) {
        const address = await this.prisma.address.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });

        if (!address) {
            throw new NotFoundException('Address not found.');
        }

        return address;
    }

    async create(
        userId: number,
        {
            street,
            number,
            complement,
            district,
            city,
            state,
            country,
            zipCode,
        }: CreateAddressesDto,
    ) {
        const { personId } = await this.prisma.user.findUnique({
            where: {
                id: isValidNumber(userId),
            },
            select: {
                personId: true,
            },
        });

        if (!personId) {
            throw new NotFoundException('Person not found.');
        }

        return this.prisma.address.create({
            data: {
                person: {
                    connect: {
                        id: personId,
                    },
                },
                street,
                number,
                complement,
                district,
                city,
                state,
                country,
                zipCode,
            },
        });
    }

    async update(id: number, data: UpdateAddressesDto) {
        const address = await this.get(id);
        return this.prisma.address.update({
            data,
            where: {
                id: address.id,
            },
        });
    }

    async delete(id: number) {
        const address = await this.get(id);

        await this.prisma.address.delete({
            where: {
                id: address.id,
            },
        });

        return {
            success: true,
        };
    }

    async searchZipCode(zipCode: string) {
        zipCode = zipCode.replace(/[^\d]+/g, '').substring(0, 8);

        try {
            const response = await lastValueFrom(
                this.httpService.request({
                    method: 'GET',
                    url: `https://viacep.com.br/ws/${zipCode}/json/`,
                }),
            );

            return response.data;
        } catch (e) {
            throw new BadRequestException('ZipCode not found.');
        }
    }
}
