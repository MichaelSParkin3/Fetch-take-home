import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import dogReducer from './dogSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    dogs: dogReducer,
  },
  devTools: true  // This enables Redux DevTools
});

export type RootState = ReturnType<typeof store.getState>;

export default store;