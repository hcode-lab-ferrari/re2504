import { Controller, Get, UseGuards } from '@nestjs/common';
import { AddressesService } from '../addresses/addresses.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../users/users.decorator';

@Controller('me/addresses')
export class AddressesController {
    constructor(private addressService: AddressesService) {}

    @UseGuards(AuthGuard)
    @Get()
    async listByPerson(@User() user) {
        return this.addressService.getAllByUser(user.id);
    }
}
