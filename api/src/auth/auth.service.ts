import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { parse } from 'date-fns';
import { getOnlyNumbers } from 'utils/getOnlyNumbers';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        private prisma: PrismaService,
        private mailService: MailService,
    ) {}

    async getToken(userId: number) {
        const { email, photo, id, person } = await this.userService.get(userId);
        const { name } = person;

        return this.jwtService.sign({ name, email, photo, id });
    }

    async login(email: string, password: string) {
        const user = await this.userService.getByEmail(email);

        await this.userService.checkPassword(user.id, password);

        const token = await this.getToken(user.id);

        return {
            token,
        };
    }

    async decodeToken(token: string) {
        try {
            await this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }

        return this.jwtService.decode(token);
    }

    async recovery(email: string) {
        const { id, person } = await this.userService.getByEmail(email);
        const { name } = person;

        const token = await this.jwtService.sign(
            { id },
            {
                expiresIn: 30 * 60,
            },
        );

        await this.prisma.passwordRecovery.create({
            data: {
                userId: id,
                token,
            },
        });

        await this.mailService.send({
            to: email,
            subject: 'Esqueci a senha',
            template: 'forget',
            data: {
                name,
                url: `${process.env.URL_FRONT}/auth?token=${token}#reset`,
            },
        });

        return { success: true };
    }

    async checkResetToken({ token }: { token: string }) {
        if (!token) {
            throw new BadRequestException('Token is required');
        }

        try {
            await this.jwtService.verify(token);
            return true;
        } catch (e) {
            return false;
        }
    }

    async reset({ password, token }: { password: string; token: string }) {
        if (!password) {
            throw new BadRequestException('Password is required');
        }

        try {
            await this.jwtService.verify(token);
        } catch (e) {
            throw new BadRequestException(e.message);
        }

        const passwordRecovery = await this.prisma.passwordRecovery.findFirst({
            where: {
                token,
                resetAt: null,
            },
        });

        if (!passwordRecovery) {
            throw new BadRequestException('Token used');
        }

        await this.prisma.passwordRecovery.update({
            where: {
                id: passwordRecovery.id,
            },
            data: {
                resetAt: new Date(),
            },
        });

        return this.userService.updatePassword(
            passwordRecovery.userId,
            password,
        );
    }

    async register({
        name,
        email,
        password,
        passwordConfirm,
        birthAt,
        document,
        phone,
    }: {
        name: string;
        email: string;
        password: string;
        passwordConfirm: string;
        birthAt: string;
        document: string;
        phone: string;
    }) {
        if (password !== passwordConfirm) {
            throw new BadRequestException(
                'Password and password confirm must be the same',
            );
        }

        let finalBirthAt = null;

        if (birthAt) {
            try {
                finalBirthAt = parse(birthAt, 'yyyy-MM-dd', new Date());
            } catch (e) {
                throw new BadRequestException('Birth date is invalid');
            }
        }

        phone = getOnlyNumbers(phone);
        document = getOnlyNumbers(document);

        const user = await this.userService.create({
            name,
            email,
            password,
            birthAt: finalBirthAt,
            document,
            phone,
        });

        const token = await this.getToken(user.id);

        return { token };
    }
}
