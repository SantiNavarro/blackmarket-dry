/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';

export const selectUserData = (state: RootState) => state.user;
