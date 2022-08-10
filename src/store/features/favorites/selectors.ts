/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import { Product } from '../../slices/productsSlice';

export const selectFavoriteProducts = (state: RootState) => state.favorites;

export const selectFavoriteProductById = (state: RootState, id: number) =>
  !!state.favorites.find((product: Product) => product.id === id);
