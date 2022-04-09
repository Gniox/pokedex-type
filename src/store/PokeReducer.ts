import { createSlice } from '@reduxjs/toolkit';
import { sortPokemon } from '../functions/sortPokemon';
import { fetchIndividualPokemon } from './fetchIndividualPokemon';
import { fetchPokemon } from './fetchPokemon';

type pokeSpecies = {
  name: string;
  url: string;
};

type ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type poke = {
  name: string;
  height: number;
  weight: number;
  abilities: ability[];
  stats: stat[];
};

type PokeState = {
  status: 'loading' | 'idle';
  error: string | null;
  arr: pokeSpecies[];
  value: number;
  pokemon: poke;
};

const initialState = {
  arr: [],
  error: null,
  status: 'idle',
  value: 1,
  pokemon: {
    name: '',
    height: 0,
    weight: 0,
    abilities: [],
    stats: [],
  },
} as PokeState;

export const pokeNumberSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value >= 2) {
        state.value -= 1;
      }
    },
    assignPokeNumber: (state, action) => {
      state.value = action.payload;
    },
    assignPokeList: (state, action) => {
      state.arr = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchPokemon.fulfilled, (state, { payload }) => {
      //May want to push to a new array, and assign it to generation...
      const sorted = sortPokemon(payload);
      state.arr = sorted;
      state.status = 'idle';
    });
    builder.addCase(fetchPokemon.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      state.status = 'idle';
    });
    builder.addCase(fetchIndividualPokemon.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchIndividualPokemon.fulfilled, (state, { payload }) => {
      //May want to push to a new array, and assign it to generation...
      state.pokemon = payload;
      state.status = 'idle';
    });
    builder.addCase(fetchIndividualPokemon.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      state.status = 'idle';
    });
  },
});

export const { increment, decrement, assignPokeNumber, assignPokeList } =
  pokeNumberSlice.actions;

export default pokeNumberSlice.reducer;
