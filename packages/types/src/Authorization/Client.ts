export type ClientRecovery = {
  isProcessing: boolean;
  password: string;
};

export type AuthorizationClient = {
  email: string;
  hash: string;
  salt: string;
  recovery: ClientRecovery;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
