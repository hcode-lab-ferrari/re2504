import { PartialType } from '@nestjs/mapped-types';
import {
    IsDateString,
    IsEmail,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { CreateUsersDto } from './create-user.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsDateString()
    birthAt: string;

    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(19)
    phone: string;

    @IsOptional()
    @IsString()
    @MinLength(11)
    @MaxLength(19)
    document: string;
}
