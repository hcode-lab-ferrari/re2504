import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ServicesService } from '../services/services.service';
import { User } from '../users/users.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(
        private servicesService: ServicesService,
        private paymentService: PaymentService,
    ) {}

    @Get()
    async paymentBefore(@Query('services') services) {
        return {
            amount: await this.servicesService.getAmount(services),
        };
    }

    @UseGuards(AuthGuard)
    @Post()
    async paymentCreate(@Body() data: CreatePaymentDto, @User() user) {
        return this.paymentService.create(data, user.personId);
    }

    @UseGuards(AuthGuard)
    @Post(':id')
    async paymentConfirm(@Param('id') id) {
        return this.paymentService.payment(Number(id));
    }
}
