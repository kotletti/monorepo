type ConfigDatabase = {
  mongo: {
    uri: string;
    dbName: string;
  };
};

export type Config = {
  http: {
    host: string;
    port: number;
  };
  database: ConfigDatabase;
};
