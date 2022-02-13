import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

export enum ApiStateList {
  initial = 'initial',
  pending = 'pending',
  success = 'success',
  failure = 'failure',
}

export class Api {
  private client: AxiosInstance;

  constructor(baseURL: string) {
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
