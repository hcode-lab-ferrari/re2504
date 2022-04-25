import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesDto } from './create-services.dto';

export class UpdateServicesDto extends PartialType(CreateServicesDto) {}
