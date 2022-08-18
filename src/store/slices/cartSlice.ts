/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

export interface CartProduct extends Product {
  amount: number;
}

export const initialState = [] as CartProduct[];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state = initialState;
      return state;
    },

    addProductToCart: (state, action: PayloadAction<Product>) => {
      if (state.find((cartProduct: CartProduct) => cartProduct.id === action.payload.id)) {
        state = state.map((cartProduct: CartProduct) => {
          if (cartProduct.id === action.payload.id) {
            return { ...cartProduct, amount: cartProduct.amount + 1 };
          }
          return cartProduct;
        });
      } else {
        state = state.concat({ ...action.payload, amount: 1 });
      }
      return state;
    },
    removeProductFromCart: (state, action: PayloadAction<Product>) => {
      const currentState = current(state);
      const productMatch = currentState.find(
        (product: CartProduct) => product.id === action.payload.id
      );

      if (productMatch && productMatch.amount > 1) {
        state = currentState.map((cartProduct: CartProduct) => {
          if (cartProduct.id === action.payload.id) {
            return { ...cartProduct, amount: cartProduct.amount - 1 };
          }

          return cartProduct;
        });
      } else {
        state = currentState.filter((product: CartProduct) => product.id !== action.payload.id);
      }

      return state;
    },
  },
});

export const { addProductToCart, removeProductFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
