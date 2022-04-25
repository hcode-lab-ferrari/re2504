import { Controller, Get, Param } from '@nestjs/common';
import { AddressesService } from './addresses.service';

@Controller('addresses/zip-code')
export class ZipcodeController {
    constructor(private addressService: AddressesService) {}

    @Get('/:zipCode')
    async cep(@Param('zipCode') zipCode: string) {
        return this.addressService.searchZipCode(zipCode);
    }
}
