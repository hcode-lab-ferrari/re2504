import { ContactService } from './contacts.service';
import { ContactController } from './contacts.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}
