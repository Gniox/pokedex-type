import { createSlice } from '@reduxjs/toolkit';
import { fetchColor } from './fetchColor';
import { getContrastColor } from '../functions/color';

type ColorState = {
  status: 'loading' | 'idle';
  error: string | null;
  currentValue: string;
};

const initialState = {
  error: null,
  status: 'idle',
  currentValue: 'black',
} as ColorState;

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    assignCurrentColor: (state, action) => {
      state.currentValue = action.payload;
    },
    //   assignPreviousColor: (state, action) => {
    //     state.previousValue= action.payload;
    //   },
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchColor.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchColor.fulfilled, (state, { payload }) => {
      //May want to push to a new array, and assign it to generation...
      state.currentValue = getContrastColor(payload);
      state.status = 'idle';
    });
    builder.addCase(fetchColor.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload;
      state.status = 'idle';
    });
  },
});

export const { assignCurrentColor } = colorSlice.actions;

export default colorSlice.reducer;
