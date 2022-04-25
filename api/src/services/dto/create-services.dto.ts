import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServicesDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
