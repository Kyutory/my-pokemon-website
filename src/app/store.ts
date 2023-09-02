import { configureStore } from '@reduxjs/toolkit';
import pokemonReducers from '../reducers/pokemon';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
