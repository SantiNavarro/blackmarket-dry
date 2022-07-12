import { apiSlice } from './api-slice';

export const selectSignInResult = () => apiSlice.endpoints.signIn.select('');

export const selectSignUpResult = apiSlice.endpoints.signUp.select('');

export const selectFetchItemsResult = apiSlice.endpoints.fetchItems.select();
