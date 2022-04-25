import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    timeOptionId: number;

    @IsNotEmpty()
    @IsNumber()
    billingAddressId: number;

    @IsNotEmpty()
    @IsDateString()
    scheduleAt: string;

    @IsNotEmpty()
    @IsArray()
    services: number[];

    @IsNotEmpty()
    @IsNumber()
    installments: number;

    @IsNotEmpty()
    @IsString()
    cardToken: string;

    @IsNotEmpty()
    @IsString()
    paymentMethod: string;

    @IsNotEmpty()
    @IsString()
    document: string;
}
