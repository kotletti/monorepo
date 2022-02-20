import { Document, model, Schema } from 'mongoose';
import {
  AuthorizationClient,
  AuthorizationToken,
} from '@kotletti/types';

export type ClientDoc = AuthorizationClient & Document;

export type TokenDoc = AuthorizationToken & Document;

const [required, unique] = [true, true];

const tokenSchema = new Schema<TokenDoc>({
  clientId: {
    type: String,
    required,
  },
  access: {
    type: String,
    required,
    unique,
  },
  refresh: {
    type: String,
    required,
    unique,
  },
});

const recoverySchema = new Schema(
  {
    isProcessing: Boolean,
    password: String,
  },
  { _id: false }
);

const clientSchema = new Schema<ClientDoc>({
  email: {
    type: String,
    required,
    unique,
  },
  hash: {
    type: String,
    required,
    unique,
  },
  salt: {
    type: String,
    required,
  },
  recovery: recoverySchema,
  lastLogin: {
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: Date,
});

export const ClientModel = model<ClientDoc>(
  'Client',
  clientSchema,
  'Clients'
);

export const TokenModel = model<TokenDoc>(
  'Token',
  tokenSchema,
  'Tokens'
);
