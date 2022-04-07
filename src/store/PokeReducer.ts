import { createSlice } from '@reduxjs/toolkit';

export const pokeNumberSlice = createSlice({
  name: 'pokeNumber',
  initialState: {
    value: 1,
    arr: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
      },
    ],
  },
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
});

export const { increment, decrement, assignPokeNumber, assignPokeList } =
  pokeNumberSlice.actions;

export default pokeNumberSlice.reducer;
