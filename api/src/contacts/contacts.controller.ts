import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
} from '@nestjs/common';
import { ContactService } from './contacts.service';
import { CreateContactsDto } from './dto/create-contacts.dto';

@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService) {}

    @Get(':id')
    async show(@Param('id') id) {
        return this.contactService.get(Number(id));
    }

    @Get()
    async list() {
        return this.contactService.list();
    }

    @Post()
    async create(@Body() data: CreateContactsDto) {
        return this.contactService.create(data);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id) {
        await this.contactService.delete(Number(id));
    }
}
