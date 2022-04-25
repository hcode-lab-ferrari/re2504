import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { UpdatePaymentSituationDto } from './dto/update-payment-situation.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentSituationService } from './payment-situations.service';

@Controller('payment-situations')
export class PaymentSituationController {
    constructor(
        private readonly paymentSituationService: PaymentSituationService,
    ) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() data: CreatePaymentSituationDto) {
        return this.paymentSituationService.create(data);
    }

    @Get()
    findAll() {
        return this.paymentSituationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.paymentSituationService.findOne(+id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePaymentSituationDto: UpdatePaymentSituationDto,
    ) {
        return this.paymentSituationService.update(
            +id,
            updatePaymentSituationDto,
        );
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.paymentSituationService.remove(+id);
    }
}
