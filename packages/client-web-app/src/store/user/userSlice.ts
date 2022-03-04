import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthContext, User } from '@kotletti/types';
import { Api, ApiStateList } from 'src/services';

export type GetMyUserPayload = {
  token: string;
};

export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  token: string;
};

type UserState = {
  status: ApiStateList;
  my: User | null;
  view: User | null;
};

const initialState: UserState = {
  status: ApiStateList.initial,
  my: null,
  view: null,
};

export namespace UserThunk {
  export const my = createAsyncThunk(
    'user/my',
    async (payload: GetMyUserPayload): Promise<User> => {
      const { token: Authorization } = payload;

      const api = new Api('user');

      const resp = await api
        .get<User>('/my', null, { Authorization })
        .catch((err: AxiosError) => {
          console.error(err);

          throw err;
        });

      return resp;
    }
  );

  export const create = createAsyncThunk(
    'user/create/new',
    async (
      payload: CreateUserPayload
    ): Promise<AuthContext> => {
      const { firstName, lastName, token } = payload;

      const api = new Api('user');

      const resp = await api
        .post<AuthContext>(
          '/user',
          { firstName, lastName },
          { Authorization: token }
        )
        .catch((err: AxiosError) => {
          console.error(err);

          throw err;
        });

      return resp;
    }
  );
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMy: (
      state,
      action: PayloadAction<UserState['my']>
    ) => {
      const { payload } = action;

      state.my = payload;
    },
    setView: (
      state,
      action: PayloadAction<UserState['view']>
    ) => {
      const { payload } = action;

      state.view = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      UserThunk.create.fulfilled,
      (state, action) => {
        const {
          payload: { user },
        } = action;

        state.my = user;
      }
    );
    builder.addCase(
      UserThunk.my.fulfilled,
      (state, action) => {
        const { payload } = action;

        state.my = payload;
      }
    );
  },
});

export namespace UserAction {
  export const { setMy, setView } = userSlice.actions;
}

export const userReducer = userSlice.reducer;
