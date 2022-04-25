import { Injectable, NotFoundException } from '@nestjs/common';
import { isValidNumber } from '../../utils/validation-number';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { UpdatePaymentSituationDto } from './dto/update-payment-situation.dto';

@Injectable()
export class PaymentSituationService {
    constructor(private prismaService: PrismaService) {}

    async create(data: CreatePaymentSituationDto) {
        return this.prismaService.paymentSituation.create({
            data,
        });
    }

    async findAll() {
        return this.prismaService.paymentSituation.findMany();
    }

    async findOne(id: number) {
        return this.prismaService.paymentSituation.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });
    }

    async update(
        id: number,
        updatePaymentSituationDto: UpdatePaymentSituationDto,
    ) {
        return this.prismaService.paymentSituation.update({
            data: updatePaymentSituationDto,
            where: {
                id: isValidNumber(id),
            },
        });
    }

    async remove(id: number) {
        const paymentSituation = await this.findOne(id);

        if (!paymentSituation) {
            throw new NotFoundException('Payment situation not found');
        }

        return this.prismaService.paymentSituation.delete({
            where: {
                id: paymentSituation.id,
            },
        });
    }
}
