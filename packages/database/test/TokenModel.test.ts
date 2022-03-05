import { Connection } from 'mongoose';
import { v4 as UUID } from 'uuid';
import {
  AuthorizationToken,
  Config,
} from '@kotletti/types';
import { mongoConnect, TokenModel } from '../src';

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

const createToken = (): AuthorizationToken => ({
  clientId: UUID(),
  refresh: UUID(),
  access: UUID(),
});

const defaultToken = createToken();

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

  it('Token should not be exists.', async () => {
    const token = await TokenModel.findOne({
      clientId: defaultToken.clientId,
    });

    expect(token).toBeFalsy();
  });

  it('Should create new token.', async () => {
    const session = await connect.startSession();

    session.startTransaction();

    const [token] = await TokenModel.create(
      [defaultToken],
      { session }
    );

    await session.abortTransaction();

    await session.endSession();

    expect(token.clientId).toBe(defaultToken.clientId);
  });
});
