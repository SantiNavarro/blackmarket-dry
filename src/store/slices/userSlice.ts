/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserCredentials {
  client: string;
  accessToken: string;
  uid: string;
}
export interface UserState extends UserCredentials {
  email: string;
  name: string;
}

export const initialState = {
  email: '',
  name: '',
  client: '',
  accessToken: '',
  uid: '',
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      return state;
    },
    signOut: state => {
      state = initialState;
      return state;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
