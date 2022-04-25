import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Response,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Auth } from './auth.decorator';
import { User } from '../users/users.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { dateStringToDate } from 'utils/dateStringToDate';
import { PhotoService } from 'src/photo/photo.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private photoService: PhotoService,
    ) {}

    @Post()
    async verifyLogin(@Body('email') email) {
        try {
            await this.usersService.getByEmail(email);
            return { exists: true };
        } catch (e) {
            return { exists: false };
        }
    }

    @Post('register')
    async register(
        @Body('name') name,
        @Body('email') email,
        @Body('password') password,
        @Body('passwordConfirm') passwordConfirm,
        @Body('birthAt') birthAt,
        @Body('document') document,
        @Body('phone') phone,
    ) {
        return this.authService.register({
            name,
            email,
            password,
            passwordConfirm,
            birthAt,
            document,
            phone,
        });
    }

    @Post('login')
    async login(@Body('email') email, @Body('password') password) {
        return this.authService.login(email, password);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Auth() auth, @User() user) {
        return { auth, user };
    }

    @Post('forget')
    async forgotPassword(@Body('email') email: string) {
        return this.authService.recovery(email);
    }

    @UseGuards(AuthGuard)
    @Put('profile')
    async updateProfile(@Body() body, @Auth('id') id: number) {
        if (body.birthAt) {
            body.birthAt = dateStringToDate(body.birthAt);
        }

        return this.usersService.update(id, body);
    }

    @UseGuards(AuthGuard)
    @Put('password')
    async changePassword(
        @Body('passwordCurrent') passwordCurrent: string,
        @Body('passwordNew') passwordNew: string,
        @User('id') id,
    ) {
        return this.usersService.changePassword(
            id,
            passwordCurrent,
            passwordNew,
        );
    }

    @Post('password-reset')
    async passwordReset(@Body('password') password, @Body('token') token) {
        return this.authService.reset({ password, token });
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            dest: './storage/photos',
            limits: {
                fileSize: 5 * 1024 * 1024,
                files: 1,
            },
        }),
    )
    @Put('photo')
    async uploadFile(@UploadedFile() file: Express.Multer.File, @User() user) {
        return this.usersService.setPhoto(user.id, file);
    }

    @UseGuards(AuthGuard)
    @Get('photo')
    getUserPhoto(
        @Response({ passthrough: true }) res,
        @User('photo') photo: string,
    ) {
        return this.photoService.getStreamableFile(photo, res);
    }

    @Post('reset-token')
    async resetToken(@Body('token') token) {
        return {
            valid: await this.authService.checkResetToken({ token }),
        };
    }
}
