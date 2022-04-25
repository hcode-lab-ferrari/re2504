import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServicesModule } from '../services/services.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { SchedulesModule } from 'src/schedules/schedules.module';

@Module({
    imports: [
        HttpModule,
        ServicesModule,
        SchedulesModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: `${process.env.JWT_EXPIRES}s` },
            }),
        }),
        PrismaModule,
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
