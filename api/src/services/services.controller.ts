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
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateServicesDto } from './dto/create-services.dto';
import { UpdateServicesDto } from './dto/update-services.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
    constructor(private servicesService: ServicesService) {}

    @Get()
    async getAll() {
        return this.servicesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.servicesService.get(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() data: CreateServicesDto) {
        return this.servicesService.create(data);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateData: UpdateServicesDto,
    ) {
        return this.servicesService.update(id, updateData);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.servicesService.delete(id);
    }
}
