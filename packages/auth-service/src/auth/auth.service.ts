import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  ClientDoc,
  ClientModel,
  ClientSession,
  TokenModel,
} from '@kotletti/database';
import {
  isCorrectTextHash,
  generateRandomString,
  createTextHash,
} from '@kotletti/shared';
import { CreateTokenPayload } from '@kotletti/types';
import { SignDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { MongoProviderInstance } from './auth.module';

@Injectable()
export class AuthService {
  private authGuard: AuthGuard;

  private session: ClientSession;

  constructor(
    authGuard: AuthGuard,
    @Inject('MONGO_PROVIDER')
    mongoProvider: MongoProviderInstance
  ) {
    this.authGuard = authGuard;

    this.session = mongoProvider.session;
  }

  async deleteAllClients(): Promise<void> {
    const { session } = this;

    session.startTransaction();

    try {
      await ClientModel.deleteMany({}, { session });

      await session.commitTransaction();
    } catch (error) {
      console.error(error);

      await session.abortTransaction();
    }
  }

  async deleteAllTokens(): Promise<void> {
    const { session } = this;

    session.startTransaction();

    try {
      await TokenModel.deleteMany({}, { session });

      await session.commitTransaction();
    } catch (error) {
      console.error(error);

      await session.abortTransaction();
    }
  }

  async findOneClientById(
    clientId: string
  ): Promise<ClientDoc> {
    const { session } = this;

    const client = await ClientModel.findById(
      clientId,
      null,
      {
        session,
      }
    );

    if (!client) {
      throw new HttpException(
        `Can not find client by id: ${clientId}`,
        HttpStatus.NOT_FOUND
      );
    }

    return client;
  }

  async findOneClientByEmail(
    email: string
  ): Promise<ClientDoc> {
    const { session } = this;

    const client = await ClientModel.findOne(
      {
        email,
      },
      null,
      { session }
    );

    if (!client) {
      throw new HttpException(
        `Can not find client by email: ${email}`,
        HttpStatus.BAD_REQUEST
      );
    }

    return client;
  }

  async signIn(payload: SignDTO.SignIn): Promise<string> {
    const { email, password } = payload;

    const { session } = this;

    session.startTransaction();

    try {
      const {
        hash,
        salt,
        _id: clientId,
      } = await this.findOneClientByEmail(email);

      const isValid = isCorrectTextHash(password, {
        hash,
        salt,
      });

      if (!isValid) {
        throw new HttpException(
          'Invalid credentials.',
          HttpStatus.FORBIDDEN
        );
      }

      const tokenPayload: CreateTokenPayload['payload'] = {
        clientId,
        roles: ['user'],
        expired: false,
      };

      const [accessToken, refreshToken] = [
        this.authGuard.createToken({
          type: 'access',
          payload: tokenPayload,
        }),
        this.authGuard.createToken({
          type: 'refresh',
          payload: tokenPayload,
        }),
      ];

      await TokenModel.create(
        [
          {
            clientId,
            access: accessToken,
            refresh: refreshToken,
          },
        ],
        { session }
      );

      await session.commitTransaction();

      return accessToken;
    } catch (err) {
      console.error(err);

      await session.abortTransaction();

      throw err;
    }
  }

  async signUp(payload: SignDTO.SignUp): Promise<string> {
    const { email, password } = payload;

    const { session } = this;

    session.startTransaction();

    try {
      const candidateClient = await ClientModel.findOne(
        {
          email,
        },
        null,
        { session }
      );

      if (candidateClient) {
        throw new HttpException(
          `Client with email: ${email} already exists.`,
          HttpStatus.BAD_REQUEST
        );
      }

      const salt = generateRandomString(128);
      const hash = createTextHash(password, salt);

      const [client] = await ClientModel.create(
        [
          {
            email,
            hash,
            salt,
          },
        ],
        { session }
      );

      const tokenPayload: CreateTokenPayload['payload'] = {
        clientId: client._id,
        roles: ['user'],
        expired: false,
      };

      const [accessToken, refreshToken] = [
        this.authGuard.createToken({
          type: 'access',
          payload: tokenPayload,
        }),
        this.authGuard.createToken({
          type: 'refresh',
          payload: tokenPayload,
        }),
      ];

      await TokenModel.create(
        [
          {
            clientId: client._id,
            access: accessToken,
            refresh: refreshToken,
          },
        ],
        { session }
      );

      await session.commitTransaction();

      return accessToken;
    } catch (err) {
      console.error(err);

      await session.abortTransaction();

      throw err;
    }
  }

  async getMe(clientId: string): Promise<any> {
    const client = await this.findOneClientById(clientId);

    const tokenCount: number = await TokenModel.count({
      clientId,
    });

    return {
      client,
      tokenCount,
    };
  }
}
