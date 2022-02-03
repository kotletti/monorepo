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
    data: unknown,
    ctx: ExecutionContext
  ): AuthUserContext => {
    const {
      user: { clientId, roles, token },
    } = ctx.switchToHttp().getRequest();
    return { clientId, roles, token };
  }
);
