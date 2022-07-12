import { RootState } from '../..';
// import { apiSlice } from './api-slice';

export const selectApiData = (state: RootState) => state.api;

export const selectUserData = (state: RootState) => state.api;

// export const selectSignInResult = () => apiSlice.endpoints.signIn.select('');

// export const selectSignUpResult = apiSlice.endpoints.signUp.select('');

// export const selectFetchItemsResult = apiSlice.endpoints.fetchItems.select();
