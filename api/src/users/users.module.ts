import { UsersService } from './users.service';
import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AddressesModule } from '../addresses/addresses.module';
import { SchedulesModule } from '../schedules/schedules.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: `${process.env.JWT_EXPIRES}s` },
            }),
        }),
        PrismaModule,
        MailModule,
        forwardRef(() => AddressesModule),
        SchedulesModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
