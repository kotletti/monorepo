import { config as dotEnvConfig } from 'dotenv';
import { Config } from '@kotletti/types';

dotEnvConfig();

const { HTTP_HOST, HTTP_PORT, MONGO_URI, MONGO_DB_NAME } =
  process.env;

// @todo: Make deep frozen.
export const getConfig = (): Config => ({
  http: {
    host: HTTP_HOST || 'localhost',
    port: HTTP_PORT ? parseInt(HTTP_PORT) : 3000,
  },
  database: {
    mongo: {
      uri: MONGO_URI || 'localhost:27017',
      dbName: MONGO_DB_NAME || 'kotletti',
    },
  },
});
