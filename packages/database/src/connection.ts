import mongoose, {
  SchemaOptions,
  Connection,
  ClientSession,
} from 'mongoose';
import { Config } from '@kotletti/types';
import { type } from 'os';

export type MongoConnectOptions = {
  isReconnect: boolean;
};

export const schemaOptions: SchemaOptions = {
  id: true,
  versionKey: false,
  timestamps: true,
};

export const mongoConnect = async (
  config: Config['database']['mongo'],
  options?: MongoConnectOptions
): Promise<Connection> => {
  const { uri, dbName } = config;
  const { isReconnect = true } = options || {};

  if (!uri) {
    throw new Error('Mongo uri is undefined.');
  }

  if (!dbName) {
    throw new Error('Mongo database name is undefined.');
  }

  const connect = new Promise<Connection>((resolve) => {
    mongoose
      .connect(uri, { dbName })
      .then(({ connection }) => {
        console.log(
          'Mongo success connection to %s',
          dbName
        );
        resolve(connection);
      });
  });

  await connect.catch((err: Error) => {
    throw err;
  });

  if (isReconnect) {
    const makeReconnect = () =>
      connect.then(() => {
        console.log('Mongo reconnected to %s', dbName);
      });

    mongoose.connection.on('disconnected', makeReconnect);
  }

  return connect;
};

export { Connection, ClientSession };
