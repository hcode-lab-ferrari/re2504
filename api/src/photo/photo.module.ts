import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [PhotoController],
    providers: [PhotoService],
    exports: [PhotoService],
})
export class PhotoModule {}
