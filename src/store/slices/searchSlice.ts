/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { enhanceProducts, Product } from './productsSlice';

interface SearchState {
  text: string;
  matches: Product[];
}
export const initialState = {
  text: '',
  matches: [],
} as SearchState;

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    storeSearchMatches: (state, action: PayloadAction<Product[]>) => {
      state = { ...state, matches: enhanceProducts(action.payload) };
      return state;
    },
    storeSearchText: (state, action: PayloadAction<string>) => {
      state = { ...state, text: action.payload };
      return state;
    },
  },
});

export const { storeSearchMatches, storeSearchText } = searchSlice.actions;
export default searchSlice.reducer;
