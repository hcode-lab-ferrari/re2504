import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { TimeOptionsController } from './time-options.controller';
import { TimeOptionsService } from './time-options.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: `${process.env.JWT_EXPIRES}s` },
            }),
        }),
        PrismaModule,
    ],
    controllers: [TimeOptionsController],
    providers: [TimeOptionsService],
})
export class TimeOptionsModule {}
