import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetch',
  async (generation: number) => {
    const url = `https://pokeapi.co/api/v2/generation/${generation}/`;
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => data.pokemon_species)
      .catch((error) => {
        console.log('Error fetching data: ' + error);
      });
  }
);
