import { AxiosError } from 'axios';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { AuthClientContext } from '@kotletti/types';
import { Api } from 'src/services';
import { RootState } from 'src/store';

export type SignInResponse = {
  token: string;
};

export type SignInEmailPayload = {
  email: string;
  password: string;
};

export type SignUpEmailPayload = {
  email: string;
  password: string;
};

type AuthState = {
  status: string;
  token: string;
};

const initialState: AuthState = {
  status: 'initial',
  token: '',
};

export namespace AuthThunk {
  export const signInEmail = createAsyncThunk(
    'auth/sign/in/email',
    async (
      payload: SignInEmailPayload
    ): Promise<SignInResponse> => {
      const api = new Api('auth');

      const resp = await api
        .post<SignInResponse>('/sign-in-email', payload)
        .catch((err: AxiosError) => {
          console.error(err);

          throw err;
        });

      return resp;
    }
  );

  export const signUpEmail = createAsyncThunk(
    'auth/sign/up/email',
    async (
      payload: SignUpEmailPayload
    ): Promise<AuthClientContext> => {
      const { email, password } = payload;

      const api = new Api('auth');

      const resp = await api
        .post<AuthClientContext>('/sign-up-email', {
          email,
          password,
        })
        .catch((err: AxiosError) => {
          console.error(err?.response);

          throw err;
        });

      return resp;
    }
  );
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<AuthState['token']>
    ) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      AuthThunk.signUpEmail.fulfilled,
      (state, action) => {
        const {
          payload: { token },
        } = action;

        state.token = token;
      }
    );
    builder.addCase(
      AuthThunk.signInEmail.fulfilled,
      (state, action) => {
        const {
          payload: { token },
        } = action;

        state.token = token;
      }
    );
  },
});

export namespace AuthAction {
  export const { setToken } = authSlice.actions;
}

export const selectToken = (state: RootState) =>
  state.auth.token;

export const authReducer = persistReducer(
  {
    key: 'auth',
    storage,
    whitelist: ['token'],
  },
  authSlice.reducer
);
