import { Dispatch } from 'react';
import { Counter } from 'src/store/counter';

export type InitialState = {
  counter: Counter.InitialState;
};

export type GlobalStoreProps = {
  state: InitialState;
  dispatch: Dispatch<Counter.ActionList>;
};

export const initialState: InitialState = {
  counter: Counter.initialState,
};

export const rootReducer = (
  state: InitialState,
  action: Counter.ActionList
) => {
  const { counter } = state;

  const currentState: InitialState = {
    counter: Counter.reducer(counter, action),
  };

  return currentState;
};
