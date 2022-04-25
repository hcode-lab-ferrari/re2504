import { Controller, Get, Param, Response } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
    constructor(private photoService: PhotoService) {}

    @Get(':photo')
    async show(@Param('photo') photo, @Response({ passthrough: true }) res) {
        return this.photoService.getStreamableFile(photo, res);
    }
}
