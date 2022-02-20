import { getConfig } from '@kotletti/config';
import {
  ClientSession,
  Connection,
  mongoConnect,
} from '@kotletti/database';
import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is undefined.');
}

export type MongoProviderInstance = {
  connection: Connection;
  session: ClientSession;
};

export const MongoProvider = {
  provide: 'MONGO_PROVIDER',
  useFactory: async (): Promise<MongoProviderInstance> => {
    const {
      database: { mongo },
    } = getConfig();

    const connection = await mongoConnect(mongo);

    const session = await connection.startSession();

    return { connection, session };
  },
};

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, MongoProvider],
})
export class AuthModule {}
