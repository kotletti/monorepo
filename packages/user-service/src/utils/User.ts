import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { AuthClientContext } from '@kotletti/types';

/**
 * @description: Decorator for injection auth user context
 */
export const UserContext = createParamDecorator(
  (
    _data: unknown,
    ctx: ExecutionContext
  ): AuthClientContext => {
    const {
      user: { token, roles, clientId },
    } = ctx.switchToHttp().getRequest();
    return { token, roles, clientId };
  }
);
