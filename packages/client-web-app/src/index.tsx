import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'src/pages';
import {
  hydrate,
  RootState,
  StoreProvider,
} from 'src/store';

export const rootState = new RootState();

const AppInitialize: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const initialize = useCallback(() => {
    return Promise.all([hydrate('auth', rootState.auth)]);
  }, []);

  useEffect(() => {
    initialize().then(() => setLoading(false));
  }, [initialize]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return <>{children}</>;
};

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={rootState}>
      <AppInitialize>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppInitialize>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
