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
      image:
        'https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/4652cf1c21b547e6b5bcae3f012bcd7e_9366/ucl-pro-void-ball.jpg',
    }))
    .flatMap((product: Product) => [
      product,
      {
        ...product,
        id: Math.floor(Math.random() * 1000),
        image:
          'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/06/MacBook-Pro-M2-4.jpg?fit=1200%2C800&quality=50&strip=all&ssl=1',
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
