import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { createRootReducer } from '../mainReducer';
import { Provider } from 'react-redux';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: createRootReducer(), preloadedState }),
    ...options
  } = {},
) {
  // @ts-ignore
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  // @ts-ignore
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react-native';
// override React Testing Library's render with our own
export { render };
