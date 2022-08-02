/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// mocking of images
export const enhanceProducts = (products: Product[]): Product[] =>
  products.map((product: Product) => ({
    ...product,
    image: 'https://cdn.ipadizate.com/2021/11/nuevo-MacBook-pro.jpg',
  }));

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
}

export const initialState = [] as Product[];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<Product[]>) => {
      state = enhanceProducts(action.payload);
      return state;
    },
  },
});

export const { getProducts } = productsSlice.actions;
export default productsSlice.reducer;
