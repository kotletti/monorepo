import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'src/pages';
import { persistor, RootState, store } from 'src/store';
import { UserThunk } from 'src/store/user';

const AppLoading: React.FC = () => (
  <div>
    <h1>Loading ...</h1>
  </div>
);

const AppInitialize: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const token = useSelector(
    (state: RootState) => state.auth.token
  );

  const user = useSelector(
    (state: RootState) => state.user.my
  );

  useEffect(() => {
    if (token && !user) {
      dispatch(UserThunk.my({ token }));
    }
  }, [token]);

  if (token && !user) {
    return <AppLoading />;
  }

  return <>{children}</>;
};

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate
        loading={<AppLoading />}
        persistor={persistor}
      >
        <BrowserRouter>
          <AppInitialize>
            <Router />
          </AppInitialize>
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
