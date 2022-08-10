/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

export const initialState = [] as Product[];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addProductToFavorites: (state, action: PayloadAction<Product>) => {
      state = state.concat(action.payload);
      return state;
    },
    removeProductFromFavorites: (state, action: PayloadAction<Product>) => {
      state = state.filter((product: Product) => product.id !== action.payload.id);
      return state;
    },
  },
});

export const { addProductToFavorites, removeProductFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
