import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export type AuthUserContext = {
  clientId: string;
  roles: string[];
  token: string;
};

/**
 * @description: Decorator for injection auth user context
 */
export const UserContext = createParamDecorator(
  (
    _data: unknown,
    ctx: ExecutionContext
  ): AuthUserContext => {
    const {
      user: { token, roles, clientId },
    } = ctx.switchToHttp().getRequest();
    return { token, roles, clientId };
  }
);
