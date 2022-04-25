import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SchedulesService } from 'src/schedules/schedules.service';
import { User } from 'src/users/users.decorator';

@Controller('me/schedules')
export class SchedulesController {
    constructor(private schedulesService: SchedulesService) {}

    @UseGuards(AuthGuard)
    @Get()
    async listByPerson(@User() user) {
        return this.schedulesService.getAllByUser(user.id);
    }
}
