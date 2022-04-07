import { createSlice } from '@reduxjs/toolkit';

export const colorSlice = createSlice({
  name: 'color',
  initialState: {
    currentValue: 'black',
  },
  reducers: {
    assignCurrentColor: (state, action) => {
      state.currentValue = action.payload;
    },
    //   assignPreviousColor: (state, action) => {
    //     state.previousValue= action.payload;
    //   },
    // },
  },
});

export const { assignCurrentColor } = colorSlice.actions;

export default colorSlice.reducer;
