export type TokenPayload = {
  iat: number;
  exp: number;
  expired: boolean;
  clientId: string;
  roles: string[];
};

export type CreateTokenPayload = {
  type: 'access' | 'refresh';
  payload: {
    clientId: string;
    roles: string[];
    expired: boolean;
  };
};

export type UpdateTokensResult = {
  accessToken: string;
  refreshToken: string;
};

export type AuthorizationToken = {
  clientId: string;
  access: string;
  refresh: string;
};
