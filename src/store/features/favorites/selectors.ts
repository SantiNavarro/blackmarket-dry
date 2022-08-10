/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';

export const selectCartProducts = (state: RootState) => state.favorites;
