import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactsDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    message: string;
}
