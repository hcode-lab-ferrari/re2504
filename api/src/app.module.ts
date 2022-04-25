import { PhotoModule } from './photo/photo.module';
import { MeModule } from './me/me.module';
import { ZipcodeController } from './addresses/zipcode.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { TimeOptionsModule } from './time-options/time-options.module';
import { ServicesModule } from './services/services.module';
import { AddressesModule } from './addresses/addresses.module';
import { SchedulesModule } from './schedules/schedules.module';
import { PaymentSituationModule } from './payment-situations/payment-situations.module';
import { ContactModule } from './contacts/contacts.module';
import { PaymentModule } from './payment/payment.module';

@Module({
    imports: [
        PhotoModule,
        MeModule,
        UsersModule,
        AuthModule,
        MailModule,
        TimeOptionsModule,
        ServicesModule,
        AddressesModule,
        SchedulesModule,
        PaymentSituationModule,
        ContactModule,
        PaymentModule,
    ],
    controllers: [ZipcodeController],
    providers: [],
})
export class AppModule {}
