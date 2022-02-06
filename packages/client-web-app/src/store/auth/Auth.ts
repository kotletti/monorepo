export namespace Auth {
  export enum ActionTypeList {
    signIn = 'signIn',
    signUp = 'signUp',
    signOut = 'signOut',
  }

  export type SignInAction = {
    type: ActionTypeList.signIn;
    payload: any;
  };

  export type SignUpAction = {
    type: ActionTypeList.signUp;
    payload: any;
  };

  export type SignOutAction = {
    type: ActionTypeList.signOut;
    payload: any;
  };

  export type ActionList =
    | SignInAction
    | SignUpAction
    | SignOutAction;

  export type InitialState = {
    [k in ActionTypeList]: {
      message?: string;
      error?: string;
      isLoading: boolean;
      status: 'initial' | 'pending' | 'success' | 'failure';
    };
  };

  export const initialState: InitialState = {
    signIn: { isLoading: false, status: 'initial' },
    signUp: { isLoading: false, status: 'initial' },
    signOut: { isLoading: false, status: 'initial' },
  };

  export const signIn = (payload: any): ActionList => ({
    type: ActionTypeList.signIn,
    payload,
  });

  export const signUp = (payload: any): ActionList => ({
    type: ActionTypeList.signUp,
    payload,
  });

  export const signOut = (payload: any): ActionList => ({
    type: ActionTypeList.signOut,
    payload,
  });

  export const reducer = (
    state: InitialState,
    { type, payload }: ActionList
  ): InitialState => {
    switch (type) {
      case ActionTypeList.signIn:
        return {
          ...state,
          signIn: { ...state.signIn, ...payload },
        };
      case ActionTypeList.signUp:
        return {
          ...state,
          signUp: { ...state.signUp, ...payload },
        };
      case ActionTypeList.signOut:
        return {
          ...state,
          signOut: { ...state.signOut, ...payload },
        };
      default:
        return state;
    }
  };
}
