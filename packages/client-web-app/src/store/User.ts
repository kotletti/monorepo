import {
  action,
  computed,
  makeObservable,
  observable,
  toJS,
} from 'mobx';
import {
  User as UserType,
  AuthContext,
} from '@kotletti/types';
import { RootState } from 'src/store';
import { Api, ApiStateList } from 'src/services';
import { ErrorHandler } from 'src/store/ErrorHandler';
import { AxiosError } from 'axios';

const { USER_API_HOST = '' } = process.env;

if (!USER_API_HOST) {
  throw new Error('USER_API_HOST is undefined.');
}

export class User {
  private api: Api;

  @observable me?: UserType;

  @observable state: ApiStateList;

  @observable private errHandler: ErrorHandler;

  @action.bound private createUserSuccess = ({
    user,
  }: AuthContext) => {
    this.errHandler.erase();

    this.me = user;

    this.state = ApiStateList.success;
  };

  @action.bound private createUserFailure = ({
    response,
  }: AxiosError) => {
    this.errHandler.erase();

    this.errHandler.add(response?.data.message);

    this.state = ApiStateList.failure;
  };

  @action createUser = (
    firstName: string,
    lastName: string,
    token: string
  ): void => {
    this.state = ApiStateList.pending;

    this.api
      .post<AuthContext>(
        '/user',
        {
          firstName,
          lastName,
        },
        { Authorization: token }
      )
      .then(this.createUserSuccess, this.createUserFailure);
  };

  @computed get errors(): string[] {
    return toJS(this.errHandler.list());
  }

  constructor(root: RootState) {
    makeObservable(this);

    this.errHandler = root.errHandler;

    this.api = new Api(USER_API_HOST);
    this.state = ApiStateList.initial;
  }
}
