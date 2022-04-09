import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIndividualPokemon = createAsyncThunk(
  'individualPokemon/fetch',
  async (pokemon: number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => data)
      .catch((error) => {
        console.log('Error fetching data: ' + error);
      });
  }
);
