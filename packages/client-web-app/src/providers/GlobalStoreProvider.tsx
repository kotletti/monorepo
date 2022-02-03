import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';
import {
  GlobalStoreProps,
  initialState,
  rootReducer,
} from 'src/store';

export const GlobalStore = createContext<GlobalStoreProps>({
  state: initialState,
  dispatch: () => undefined,
});

export const useGlobalStore = () => useContext(GlobalStore);

export const GlobalStoreProvider: React.FC = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    rootReducer,
    initialState
  );

  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStore.Provider>
  );
};
