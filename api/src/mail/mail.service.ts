import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async send({
        to,
        subject,
        template,
        data,
    }: {
        to: string;
        subject: string;
        template: string;
        data: any;
    }) {
        return new Promise((resolve, reject) => {
            this.mailerService
                .sendMail({
                    to,
                    subject,
                    template,
                    context: data,
                })
                .then(resolve)
                .catch(error => {
                    reject(new BadRequestException(error.message));
                });
        });
    }
}
