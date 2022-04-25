import { PartialType } from '@nestjs/mapped-types';
import { CreateContactsDto } from './create-contacts.dto';

export class UpdateContactsDto extends PartialType(CreateContactsDto) {}
