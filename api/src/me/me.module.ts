import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { AddressesModule } from '../addresses/addresses.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressesController } from './addresses.controller';
import { SchedulesController } from './schedules.controller';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: `${process.env.JWT_EXPIRES}s` },
            }),
        }),
        PrismaModule,
        AddressesModule,
        SchedulesModule,
    ],
    controllers: [AddressesController, SchedulesController],
    providers: [],
})
export class MeModule {}
