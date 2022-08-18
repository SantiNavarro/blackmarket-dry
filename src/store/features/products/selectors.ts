/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';

export const selectProducts = (state: RootState) => state.products;

export const selectFirstFourProducts = (state: RootState) =>
  (state.products && state.products.length > 0 && state.products?.slice(0, 4)) || [];
