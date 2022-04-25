import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTimeOptionDto } from './dto/create-time-options.dto';
import { UpdateTimeOptionDto } from './dto/update-time-options.dto';
import { TimeOptionsService } from './time-options.service';

@Controller('time-options')
export class TimeOptionsController {
    constructor(private timeOptionsService: TimeOptionsService) {}

    @Get()
    async getAll(@Query('day') day) {
        return this.timeOptionsService.getAll(Number(day));
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.timeOptionsService.get(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() data: CreateTimeOptionDto) {
        return this.timeOptionsService.create(data);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateData: UpdateTimeOptionDto,
    ) {
        return this.timeOptionsService.update(id, updateData);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.timeOptionsService.delete(id);
    }
}
