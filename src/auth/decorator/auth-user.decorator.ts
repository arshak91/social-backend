import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    console.log(_data);
    
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
