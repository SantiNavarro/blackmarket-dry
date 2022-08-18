/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import { CartProduct } from '../../slices/cartSlice';

export const selectCartProducts = (state: RootState): CartProduct[] => state.cart;

export const selectCartTotal = (state: RootState): number => {
  let total = 0;
  selectCartProducts(state)?.forEach((cartProduct: CartProduct) => {
    total += parseInt(cartProduct.price, 10) * cartProduct.amount;
  });
  return total;
};
