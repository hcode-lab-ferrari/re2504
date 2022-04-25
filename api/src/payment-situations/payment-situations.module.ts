import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentSituationController } from './payment-situations.controller';
import { PaymentSituationService } from './payment-situations.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: Number(process.env.JWT_EXPIRES),
                },
            }),
        }),
        AuthModule,
        PrismaModule,
    ],
    controllers: [PaymentSituationController],
    providers: [PaymentSituationService],
})
export class PaymentSituationModule {}
