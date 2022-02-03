export namespace Counter {
  export enum ActionTypeList {
    increment = '/counter/increment',
    decrement = '/counter/decrement',
  }

  export type IncrementAction = {
    type: ActionTypeList.increment;
    payload: number;
  };

  export type DecrementAction = {
    type: ActionTypeList.decrement;
    payload: number;
  };

  export type ActionList =
    | IncrementAction
    | DecrementAction;

  export type InitialState = {
    count: number;
  };

  export const initialState: InitialState = {
    count: 0,
  };

  export const increment = (
    payload: number
  ): IncrementAction => ({
    type: ActionTypeList.increment,
    payload,
  });

  export const decrement = (
    payload: number
  ): DecrementAction => ({
    type: ActionTypeList.decrement,
    payload,
  });

  export const reducer = (
    state: InitialState,
    { type, payload }: ActionList
  ): InitialState => {
    switch (type) {
      case ActionTypeList.increment:
        return {
          ...state,
          count: state.count + payload,
        };
      case ActionTypeList.decrement:
        return {
          ...state,
          count: state.count - payload,
        };
      default:
        return state;
    }
  };
}
