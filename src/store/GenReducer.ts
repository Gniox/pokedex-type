import { createSlice } from '@reduxjs/toolkit';

export const genSlice = createSlice({
  name: 'genNumber',
  initialState: {
    value: 1,
  },
  reducers: {
    assignGenNumber: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { assignGenNumber } = genSlice.actions;

export default genSlice.reducer;
