/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';

export const selectThemeStatus = (state: RootState) => state.theme.status;
