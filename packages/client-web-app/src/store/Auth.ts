import {
  action,
  computed,
  flow,
  makeObservable,
  observable,
  toJS,
} from 'mobx';
import { AxiosError } from 'axios';
import { persist } from 'mobx-persist';
import { RootState } from 'src/store';
import { Api, ApiStateList } from 'src/services';
import { ErrorHandler } from 'src/store/ErrorHandler';
import { AuthClientContext } from '@kotletti/types';

const { AUTH_API_HOST = '' } = process.env;

if (!AUTH_API_HOST) {
  throw new Error('AUTH_API_HOST is undefined.');
}

export type AuthResponse = {
  token: string;
};

export class Auth {
  @persist @observable token?: string;

  @observable state: ApiStateList;

  @observable private errHandler: ErrorHandler;

  private api: Api;

  constructor(root: RootState) {
    makeObservable(this);

    this.errHandler = root.errHandler;

    this.api = new Api(AUTH_API_HOST);
    this.state = ApiStateList.initial;
  }

  @action.bound private signInEmailSuccess = ({
    token,
  }: AuthResponse) => {
    this.errHandler.erase();

    this.setAuth(token);
    this.state = ApiStateList.success;
  };

  @action.bound private signInEmailFailure = ({
    response,
  }: AxiosError) => {
    this.errHandler.erase();

    this.errHandler.add(response?.data.message);
    this.state = ApiStateList.failure;
  };

  @action.bound private signUpEmailSuccess = ({
    token,
  }: AuthResponse) => {
    this.setAuth(token);
    this.state = ApiStateList.success;
  };

  @action.bound private signUpEmailFailure = () => {
    this.state = ApiStateList.failure;
  };

  @action signUpEmail = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): void => {
    this.state = ApiStateList.pending;

    this.api
      .post<AuthResponse>('sign-up-email', {
        firstName,
        lastName,
        email,
        password,
      })
      .then(
        this.signUpEmailSuccess,
        this.signUpEmailFailure
      );
  };

  @action signInEmail = (
    email: string,
    password: string
  ): void => {
    this.state = ApiStateList.pending;

    this.api
      .post<AuthResponse>('sign-in-email', {
        email,
        password,
      })
      .then(
        this.signInEmailSuccess,
        this.signInEmailFailure
      );
  };

  @action signOut = (): void => {
    this.state = ApiStateList.initial;

    this.token = undefined;
  };

  @action private setAuth(token: string) {
    this.token = token;
  }

  @computed get errors(): string[] {
    return toJS(this.errHandler.list());
  }
}
