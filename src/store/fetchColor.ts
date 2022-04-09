import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchColor = createAsyncThunk(
  'color/fetch',
  async (pokemon: number) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => data.color.name)
      .catch((error) => {
        console.log('Error fetching data: ' + error);
      });
  }
);
