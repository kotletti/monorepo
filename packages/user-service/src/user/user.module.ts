import { getConfig } from '@kotletti/config';
import {
  ClientSession,
  Connection,
  mongoConnect,
} from '@kotletti/database';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

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
  controllers: [UserController],
  providers: [UserService, UserGuard, MongoProvider],
})
export class UserModule {}
