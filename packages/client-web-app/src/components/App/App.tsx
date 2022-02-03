import React from 'react';
import {
  useGlobalStore,
  GlobalStoreProvider,
} from 'src/providers';
import { Counter } from 'src/store/counter';

const FirstScreen: React.FC = () => {
  const {
    state: { counter },
    dispatch,
  } = useGlobalStore();

  return (
    <div>
      <p>Count: {counter.count}</p>
      <div>
        <button
          title="Increment"
          color="blue"
          onClick={() => dispatch(Counter.increment(1))}
        />
        <button
          title="Decrement"
          color="red"
          onClick={() => dispatch(Counter.decrement(1))}
        />
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <GlobalStoreProvider>
    <FirstScreen />
  </GlobalStoreProvider>
);
