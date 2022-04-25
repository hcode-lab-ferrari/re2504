import { Injectable, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PhotoService {
    constructor(private usersService: UsersService) {}

    async getStreamableFile(path: string, response: Response) {
        let filePath = this.usersService.getStoragePhotoPath(path);

        if (!existsSync(filePath)) {
            filePath = this.usersService.getStoragePhotoPath('../nophoto.png');
        }

        const file = createReadStream(filePath);

        let mimeType = '';

        switch (filePath.split('.').pop().toLowerCase()) {
            case 'png':
                mimeType = 'image/png';
                break;

            case 'jpg':
            case 'jpeg':
            default:
                mimeType = 'image/jpeg';
        }

        response.set({
            'Content-Type': mimeType,
        });

        return new StreamableFile(file);
    }
}
