import {
    Body,
    Controller,
    Get,
    Param,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUsersDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    async show(@Param('id') id) {
        return this.userService.get(id);
    }

    @UseGuards(AuthGuard)
    @Get()
    async showByEmail(@Query('email') email) {
        return this.userService.getByEmail(email);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Param('id') id, @Body() body: UpdateUsersDto) {
        return this.userService.update(id, body);
    }
}
