import { User } from '../User';

export type AuthClientContext = {
  clientId: string;
  roles: string[];
  token: string;
};

export type AuthContext = {
  client: AuthClientContext;
  user: User;
};
