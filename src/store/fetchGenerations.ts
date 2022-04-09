import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGenerations = createAsyncThunk(
  //first argument is action name:
  'generation/fetch',
  async () => {
    return fetch('https://pokeapi.co/api/v2/generation')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => data.results)
      .catch((error) => {
        console.log('Error fetching data: ' + error);
      });
  }
);
