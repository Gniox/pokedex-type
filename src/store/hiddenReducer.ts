import { createSlice } from '@reduxjs/toolkit';

export const hiddenSlice = createSlice({
  name: 'hidden',
  initialState: {
    value: true,
  },
  reducers: {
    isHidden: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { isHidden } = hiddenSlice.actions;

export default hiddenSlice.reducer;
