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

  const handleClickIncrement = () =>
    dispatch(Counter.increment(1));

  const handleClickDecrement = () =>
    dispatch(Counter.decrement(1));

  return (
    <div>
      <p>Count: {counter.count}</p>
      <div>
        <button
          title="Increment"
          color="blue"
          onClick={handleClickIncrement}
        />
        <button
          title="Decrement"
          color="red"
          onClick={handleClickDecrement}
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
