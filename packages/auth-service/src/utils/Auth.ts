import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { AuthClientContext } from '@kotletti/types';

/**
 * @description: Decorator for injection auth user context
 */
export const ClientContext = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext
  ): AuthClientContext => {
    const {
      user: { clientId, roles, token },
    } = ctx.switchToHttp().getRequest();
    return { clientId, roles, token };
  }
);
