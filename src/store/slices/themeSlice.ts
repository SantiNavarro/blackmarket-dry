/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  status: boolean;
}

export const initialState = { status: false } as ThemeState;

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state = { status: !state.status };
      return state;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
