import { configureStore } from '@reduxjs/toolkit';
import { createRootReducer } from './mainReducer';

const store = configureStore({ reducer: createRootReducer() });

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export { store };
