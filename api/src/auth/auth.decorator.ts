import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthType } from './auth.type';

export const Auth = createParamDecorator(
    async (field, context: ExecutionContext) => {
        const req = context
            .switchToHttp()
            .getRequest<import('express').Request>();

        if (req['auth']) {
            const data = req['auth'] as AuthType;

            data.id = Number(data.id);

            if (field) {
                return data[field];
            } else {
                return data;
            }
        } else {
            return null;
        }
    },
);
