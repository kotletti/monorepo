import { Dispatch } from 'react';
import { Auth } from 'src/store/auth';
import { Counter } from 'src/store/counter';

type RootReducerActionList =
  | Auth.ActionList
  | Counter.ActionList;

export type InitialState = {
  auth: Auth.InitialState;
  counter: Counter.InitialState;
};

export type GlobalStoreProps = {
  state: InitialState;
  dispatch: Dispatch<Auth.ActionList | Counter.ActionList>;
};

export const initialState: InitialState = {
  auth: Auth.initialState,
  counter: Counter.initialState,
};

export const rootReducer = (
  state: InitialState,
  action: RootReducerActionList
) => {
  const { auth, counter } = state;

  const currentState: InitialState = {
    auth: Auth.reducer(auth, action as Auth.ActionList),
    counter: Counter.reducer(
      counter,
      action as Counter.ActionList
    ),
  };

  return currentState;
};
