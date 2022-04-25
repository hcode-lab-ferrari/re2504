import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { join } from 'path';
import { createReadStream, existsSync, renameSync, unlinkSync } from 'fs';
import { UpdateUsersDto } from './dto/update-user.dto';
import { parse } from 'date-fns';
import { getOnlyNumbers } from 'utils/getOnlyNumbers';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private mailService: MailService,
    ) {}

    async get(id: number, hash = false) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is required');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                person: true,
            },
        });

        if (!hash) {
            delete user.password;
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async getByEmail(email: string) {
        if (!email) {
            throw new BadRequestException('E-mail is required');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                person: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        delete user.password;

        return user;
    }

    async create({
        name,
        email,
        password,
        birthAt,
        phone,
        document,
    }: {
        name: string;
        email: string;
        password: string;
        birthAt?: Date;
        phone?: string;
        document?: string;
    }) {
        if (!name) {
            throw new BadRequestException('Name is required.');
        }

        if (!email) {
            throw new BadRequestException('Email is required.');
        }

        if (!password) {
            throw new BadRequestException('Password is required.');
        }

        if (birthAt && birthAt.toString().toLowerCase() === 'invalid date') {
            throw new BadRequestException('Birth date is invalid');
        }

        let user = null;

        try {
            user = await this.getByEmail(email);
        } catch (e) {}

        if (user) {
            throw new BadRequestException('Email already exists');
        }

        const userCreated = await this.prisma.user.create({
            data: {
                person: {
                    create: {
                        name,
                        birthAt,
                        document,
                        phone,
                    },
                },
                email,
                password: bcrypt.hashSync(password, 10),
            },
            include: {
                person: true,
            },
        });

        delete userCreated.password;

        return userCreated;
    }

    async update(
        id: number,
        { name, email, birthAt, phone, document }: UpdateUsersDto,
    ) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is not a number');
        }

        const dataPerson = {} as Prisma.PersonUpdateInput;
        const dataUser = {} as Prisma.UserUpdateInput;

        if (name) {
            dataPerson.name = name;
        }

        if (birthAt) {
            try {
                dataPerson.birthAt = parse(birthAt, 'yyyy-MM-dd', new Date());
            } catch (e) {
                throw new BadRequestException('Birth date is invalid');
            }
        }

        if (phone) {
            dataPerson.phone = getOnlyNumbers(phone);
        }

        if (document) {
            dataPerson.document = getOnlyNumbers(document);
        }

        if (email) {
            dataUser.email = email;
        }

        const user = await this.get(id);

        if (dataPerson) {
            await this.prisma.person.update({
                where: {
                    id: user.personId,
                },
                data: dataPerson,
            });
        }

        if (dataUser) {
            await this.prisma.user.update({
                where: {
                    id,
                },
                data: dataUser,
            });
        }

        return this.get(id);
    }

    async checkPassword(id: number, password: string) {
        const user = await this.get(id, true);

        const checked = await bcrypt.compare(password, user.password);

        if (!checked) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        return true;
    }

    async updatePassword(id: number, password: string) {
        await this.get(id);

        const userUpdated = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password: bcrypt.hashSync(password, 10),
            },
            include: {
                person: true,
            },
        });

        delete userUpdated.password;

        await this.mailService.send({
            to: userUpdated.email,
            subject: 'Senha alterada com sucesso!',
            template: 'reset-password-confirm',
            data: {
                name: userUpdated.person.name,
            },
        });

        return userUpdated;
    }

    async changePassword(
        id: number,
        currentPassword: string,
        newPassword: string,
    ) {
        if (!newPassword) {
            throw new BadRequestException('New password is required');
        }

        await this.checkPassword(id, currentPassword);

        return this.updatePassword(id, newPassword);
    }

    getStoragePhotoPath(photo: string) {
        if (!photo) {
            throw new BadRequestException('Photo is required.');
        }

        const path = join(__dirname, '../', 'storage', 'photos', photo);

        return path;
    }

    async removePhoto(userId: number) {
        const { id, photo } = await this.get(userId);

        if (photo) {
            const currentPhoto = this.getStoragePhotoPath(photo);

            if (existsSync(currentPhoto)) {
                unlinkSync(currentPhoto);
            }
        }

        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                photo: null,
            },
        });
    }

    async setPhoto(id: number, file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is required.');
        }

        if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
            throw new BadRequestException('Invalid file type.');
        }

        await this.removePhoto(id);

        let ext = '';

        switch (file.mimetype) {
            case 'image/png':
                ext = 'png';
                break;

            default:
                ext = 'jpg';
        }

        const photo = `${file.filename}.${ext}`;
        const from = this.getStoragePhotoPath(file.filename);
        const to = this.getStoragePhotoPath(photo);

        renameSync(from, to);

        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                photo: null,
            },
        });
    }

    async getPhoto(id: number) {
        const { photo } = await this.get(id);

        let filePath = this.getStoragePhotoPath('../nophoto.png');

        if (photo) {
            filePath = this.getStoragePhotoPath(photo);
        }

        const file = createReadStream(filePath);

        const extension = filePath.split('.').pop();

        return {
            file,
            extension,
        };
    }
}
