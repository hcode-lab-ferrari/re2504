import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: `${process.env.JWT_EXPIRES}s` },
            }),
        }),
        PrismaModule,
        HttpModule,
    ],
    controllers: [AddressesController],
    providers: [AddressesService],
    exports: [AddressesService],
})
export class AddressesModule {}
