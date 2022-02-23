import {
  ClientModel,
  TokenModel,
} from '@kotletti/database';
import {
  CreateTokenPayload,
  TokenPayload,
} from '@kotletti/types';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { AuthUserContext } from '../utils';

// @TODO: Move to config package
const { JWT_SECRET = '' } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is undefined.');
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly expiresIn = {
    access: '1d',
    refresh: '30d',
  };

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

    // @TODO: Need validate for jwt token, prevent send random string
    const accessToken = await this.updateTokens(
      authorization
    );

    const user = jwt.decode(accessToken) as Omit<
      AuthUserContext,
      'token'
    >;

    if (!user) {
      console.log('Decoded user is undefined.');

      return false;
    }

    req.user = { ...user, token: accessToken };

    res.setHeader('Authorization', accessToken);

    return true;
  }

  createToken({
    type,
    payload,
  }: CreateTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: this.expiresIn[type],
    });
  }

  private async verifyToken(
    token: string
  ): Promise<TokenPayload> {
    const decoded = jwt.decode(token) as TokenPayload;

    return new Promise<TokenPayload>((resolve) => {
      jwt.verify(token, JWT_SECRET, (err) => {
        if (err) {
          const payload: TokenPayload = {
            ...decoded,
            expired: true,
          };
          resolve(payload);
        }

        resolve(decoded);
      });
    });
  }

  private async updateTokens(
    token: string
  ): Promise<string> {
    const {
      clientId,
      roles,
      expired: isAccessExpired,
    } = await this.verifyToken(token);

    if (isAccessExpired) {
      const client = await ClientModel.findById(clientId);

      if (!client) {
        throw new HttpException(
          `Can not find client by id: ${clientId}`,
          HttpStatus.FORBIDDEN
        );
      }

      const tokenRecord = await TokenModel.findOne({
        clientId,
        access: token,
      });

      if (!tokenRecord) {
        throw new HttpException(
          `Can not find tokens for client id: ${clientId}`,
          HttpStatus.FORBIDDEN
        );
      }

      const { refresh: refreshToken } = tokenRecord;

      const { expired: isRefreshExpired } =
        await this.verifyToken(refreshToken);

      if (isRefreshExpired) {
        await TokenModel.deleteOne({
          clientId,
          access: tokenRecord.access,
          refresh: tokenRecord.refresh,
        });

        throw new HttpException(
          'Expired refresh token.',
          HttpStatus.UNAUTHORIZED
        );
      }

      const accessToken = this.createToken({
        type: 'access',
        payload: { clientId, roles, expired: false },
      });

      await TokenModel.updateOne(
        { _id: tokenRecord._id },
        { access: accessToken }
      ).catch((err: Error) => {
        console.error(err);

        throw err;
      });

      return accessToken;
    }

    return token;
  }
}
