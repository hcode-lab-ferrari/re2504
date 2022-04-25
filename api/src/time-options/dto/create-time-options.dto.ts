import {
    IsMilitaryTime,
    IsNotEmpty,
    IsNumber,
    Max,
    Min,
} from 'class-validator';

export class CreateTimeOptionDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(6)
    day: number;

    @IsNotEmpty()
    @IsMilitaryTime()
    time: string;
}
