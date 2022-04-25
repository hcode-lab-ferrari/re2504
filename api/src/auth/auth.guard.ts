import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthType } from './auth.type';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const Authorization = request.headers['authorization'];

        if (!Authorization) {
            throw new UnauthorizedException('Authorization token required.');
        }

        try {
            const token = Authorization.split(' ')[1];

            this.jwtService.verify(token);

            request.auth = this.jwtService.decode(token) as AuthType;

            request.user = await this.prisma.user.findFirst({
                where: { id: request.auth.id },
                include: { person: true },
            });

            if (!request.user) {
                throw new UnauthorizedException('User not found.');
            }

            return true;
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }
    }
}
