import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeOptionDto } from './create-time-options.dto';

export class UpdateTimeOptionDto extends PartialType(CreateTimeOptionDto) {}
