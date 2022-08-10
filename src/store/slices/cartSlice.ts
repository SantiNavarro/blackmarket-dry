/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

export const initialState = [] as Product[];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state = state.concat(action.payload);
      return state;
    },
    removeProductFromCart: (state, action: PayloadAction<Product>) => {
      state = state.filter((product: Product) => product.id !== action.payload.id);
      return state;
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
