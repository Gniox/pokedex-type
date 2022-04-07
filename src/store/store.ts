import { configureStore } from '@reduxjs/toolkit';
import pokeNumberReducer from './PokeReducer';
import genReducer from './GenReducer';
import colorReducer from './colorReducer';
import hiddenReducer from './hiddenReducer';

export const store = configureStore({
  reducer: {
    pokeNumber: pokeNumberReducer,
    genNumber: genReducer,
    color: colorReducer,
    hidden: hiddenReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;
