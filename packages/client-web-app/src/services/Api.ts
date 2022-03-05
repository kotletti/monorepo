import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

const { AUTH_API_HOST, USER_API_HOST } = process.env;

if (!AUTH_API_HOST) {
  throw new Error('AUTH_API_HOST is undefined.');
}

if (!USER_API_HOST) {
  throw new Error('USER_API_HOST is undefined.');
}

export enum ApiStateList {
  initial = 'initial',
  pending = 'pending',
  success = 'success',
  failure = 'failure',
}

export type ApiService = {
  [k in 'auth' | 'user']: string;
};

const apiService: ApiService = {
  auth: AUTH_API_HOST,
  user: USER_API_HOST,
};

export class Api {
  private client: AxiosInstance;

  constructor(url: keyof ApiService) {
    const baseURL = apiService[url];

    this.client = axios.create({
      baseURL,
    });
  }

  async post<T>(
    endpoint: string,
    payload: any,
    headers?: AxiosRequestConfig['headers']
  ): Promise<T> {
    const { data } = await this.client.post<T>(
      endpoint,
      payload,
      {
        ...(headers && { headers }),
      }
    );

    return data;
  }

  async get<T>(
    endpoint: string,
    params?: any,
    headers?: AxiosRequestConfig['headers']
  ): Promise<T> {
    const { data } = await this.client.get<T>(endpoint, {
      ...(params && { params }),
      ...(headers && { headers }),
    });

    return data;
  }
}
