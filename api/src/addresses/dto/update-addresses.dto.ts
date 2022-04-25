import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressesDto } from './create-addresses.dto';

export class UpdateAddressesDto extends PartialType(CreateAddressesDto) {}
