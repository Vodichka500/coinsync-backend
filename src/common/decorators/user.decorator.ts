// src/common/decorators/user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@/common/types/jwt_payload';

export const User = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    const user = request.user;
    console.log(request.user);
    console.log(request.user);
    return data ? user?.[data] : user;
  },
);
