import { configureStore } from '@reduxjs/toolkit';
import pokeNumberReducer from './PokeReducer';
import genReducer from './GenReducer';
import colorReducer from './colorReducer';

export const store = configureStore({
  reducer: {
    pokeNumber: pokeNumberReducer,
    genNumber: genReducer,
    color: colorReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;
