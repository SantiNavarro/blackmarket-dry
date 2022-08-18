/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';

export const selectSearchText = (state: RootState) => state.search.text;

export const selectSearchMatches = (state: RootState) => state.search.matches;
