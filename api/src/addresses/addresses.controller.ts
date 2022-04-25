import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../users/users.decorator';
import { AddressesService } from './addresses.service';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { UpdateAddressesDto } from './dto/update-addresses.dto';

@Controller('addresses')
export class AddressesController {
    constructor(private addressesService: AddressesService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return this.addressesService.getAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.addressesService.get(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() data: CreateAddressesDto, @User() user) {
        return this.addressesService.create(user.id, data);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UpdateAddressesDto) {
        return this.addressesService.update(id, data);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.addressesService.delete(id);
    }
}
