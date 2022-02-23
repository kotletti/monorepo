import axios, { AxiosInstance } from 'axios';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthUserContext } from '../utils';

// @TODO: Move to config package
const { AUTH_SERVICE_HOST = '' } = process.env;

if (!AUTH_SERVICE_HOST) {
  throw new Error('AUTH_SERVICE_HOST is undefined.');
}

@Injectable()
export class UserGuard implements CanActivate {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: AUTH_SERVICE_HOST,
    });
  }

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const [req, res] = [
      context.switchToHttp().getRequest(),
      context.switchToHttp().getResponse(),
    ];

    // TODO: Add validation, later
    const {
      headers: { authorization = '' },
    } = req;

    if (!authorization) {
      throw new HttpException(
        'Token is not found.',
        HttpStatus.EXPECTATION_FAILED
      );
    }

    const { data: user, status } =
      await this.httpClient.get<AuthUserContext>(
        '/api/v1/client',
        {
          headers: {
            authorization,
          },
        }
      );

    if (status !== 200) {
      return false;
    }

    req.user = user;

    res.setHeader('Authorization', user.token);

    return true;
  }
}
