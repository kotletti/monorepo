import { Connection } from 'mongoose';
import { v4 as UUID } from 'uuid';
import { Config } from '@kotletti/types';
import { mongoConnect, ClientModel } from '../src';
import { AuthorizationClient } from '@kotletti/types';

const { MONGO_URI, MONGO_DB_NAME } = process.env;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is undefined.');
}

if (!MONGO_DB_NAME) {
  throw new Error('MONGO_DB_NAME is undefined.');
}

const mongoConfig: Config['database']['mongo'] = {
  uri: MONGO_URI,
  dbName: MONGO_DB_NAME,
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

const defaultClient = createClient();

describe('Client model suits.', () => {
  let connect: Connection;

  beforeAll(async () => {
    connect = await mongoConnect(mongoConfig, {
      isReconnect: false,
    });

    connect.useDb(mongoConfig.dbName);
  });

  afterAll(async () => {
    await connect.close();
  });

  it('Client should not be exists.', async () => {
    const user = await ClientModel.findOne({
      email: defaultClient.email,
    });

    expect(user).toBeFalsy();
  });

  it('Should create new client.', async () => {
    const session = await connect.startSession();

    session.startTransaction();

    const [client] = await ClientModel.create(
      [defaultClient],
      { session }
    );

    await session.abortTransaction();

    await session.endSession();

    expect(client.email).toBe(defaultClient.email);
  });
});
