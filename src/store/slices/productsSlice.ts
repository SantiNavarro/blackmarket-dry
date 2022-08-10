/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// mocking of images
export const enhanceProducts = (products: Product[]): Product[] =>
  products
    .map((product: Product) => ({
      ...product,
      // this is needed as part of the mock, given that we have only 2 items on our db, we need to make our items unique
      id: Math.floor(Math.random() * 1000),
      status: 'New',
      image: 'https://www.collinsdictionary.com/images/full/chair_583020097_1000.jpg',
    }))
    .flatMap((product: Product) => [
      product,
      {
        ...product,
        image:
          'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcS335HKPWiR1ei7g-3BPdEWsJJvB3jXPqqBL7oEqI_AA7DHy3CgTgS7i7Wd_5DJ9T7X6uRT4bczwGj-RLWoFNA',
        status: 'Restored',
      },
    ]);

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  status: string;
  image?: string;
}

export const initialState = [] as Product[];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    storeProducts: (state, action: PayloadAction<Product[]>) => {
      state = enhanceProducts(action.payload);
      return state;
    },
    storeNextPageOfProducts: (state, action: PayloadAction<Product[]>) => {
      state = state.concat(enhanceProducts(action.payload));
      return state;
    },
  },
});

export const { storeProducts, storeNextPageOfProducts } = productsSlice.actions;
export default productsSlice.reducer;
