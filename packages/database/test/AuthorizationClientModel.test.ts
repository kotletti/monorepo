import { Connection } from 'mongoose';
import { v4 as UUID } from 'uuid';
import { Config } from '@kotletti/types';
import { mongoConnect, AuthorizationModel } from '../src';
import { AuthorizationClient } from '@kotletti/types/build/Authorization/Client';

const mongoConfig: Config['database']['mongo'] = {
  uri: 'mongodb://localhost:37017,localhost:37018,localhost:37019/',
  dbName: 'authorization',
};

const createClient = (): AuthorizationClient => ({
  email: UUID(),
  hash: UUID(),
  salt: UUID(),
  recovery: {
    isProcessing: false,
    password: '',
  },
  lastLogin: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
});

describe('Mongo suits.', () => {
  let connect: Connection;

  beforeAll(async () => {
    connect = await mongoConnect(mongoConfig, {
      isReconnect: false,
    });
  });

  afterAll(async () => {
    await connect.close();
  });

  it('Should be 0 clients', async () => {
    const count = await AuthorizationModel.count();

    expect(count).toEqual(0);
  });

  it('Check transaction', async () => {
    const session = await connect.startSession();

    session.startTransaction();

    const [client] = await AuthorizationModel.create(
      [createClient()],
      { session }
    );

    console.log(client);

    await session.abortTransaction();

    await session.endSession();
  });
});
