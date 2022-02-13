import localForage from 'localforage';
import { create as createMOBXPersisted } from 'mobx-persist';
import { createContext, useContext } from 'react';
import { Auth } from 'src/store/Auth';
import { ErrorHandler } from 'src/store/ErrorHandler';

localForage.config({
  name: 'client-web-app',
});

export class RootState {
  errHandler: ErrorHandler;
  auth: Auth;

  constructor() {
    this.errHandler = ErrorHandler.useHandler();

    this.auth = new Auth(this);
  }
}

export const StoreContext = createContext<RootState>(
  {} as RootState
);
export const StoreProvider = StoreContext.Provider;
export const useStore = (): RootState =>
  useContext(StoreContext);

export const hydrate = createMOBXPersisted({
  storage: localForage,
});
