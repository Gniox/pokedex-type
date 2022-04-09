import { createSlice } from '@reduxjs/toolkit';
import { fetchGenerations } from './fetchGenerations';

type genItem = {
  name: string;
  url: string;
};

type GenState = {
  status: 'loading' | 'idle';
  error: string | null;
  generation: genItem[];
  value: number;
};

const initialState = {
  generation: [],
  error: null,
  status: 'idle',
  value: 1,
} as GenState;

export const genSlice = createSlice({
  name: 'generation',
  initialState,

  reducers: {
    assignGenNumber: (state, action) => {
      state.value = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGenerations.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchGenerations.fulfilled, (state, { payload }) => {
      //May want to push to a new array, and assign it to generation...
      state.generation.push(...payload);
      state.status = 'idle';
    });
    builder.addCase(fetchGenerations.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      state.status = 'idle';
    });
  },
});

export const { assignGenNumber } = genSlice.actions;

export default genSlice.reducer;
