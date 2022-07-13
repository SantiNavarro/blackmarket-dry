/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  name: string;
}

const initialState = { email: '', name: '' } as UserState;

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
