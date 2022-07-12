import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Item {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

interface UserCredentials {
  email: string;
  password: string;
}

type User = {
  name: string;
} & UserCredentials;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://blackmarket-api.herokuapp.com/api/v1',
    prepareHeaders(headers) {
      headers.set('Content-type', 'application/json');
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchItems: builder.query<Item[], number | void>({
        query(limit = 10) {
          return `/items?limit=${limit}`;
        },
      }),
      signUp: builder.mutation<User, Partial<User>>({
        query: newUser => ({
          url: '/auth',
          method: 'POST',
          body: newUser,
        }),
      }),
      signIn: builder.mutation<User, Partial<User>>({
        query: (credentials: UserCredentials) => ({
          url: `/auth/sign_in?password=${credentials.password}&email=${credentials.email}`,
          method: 'POST',
        }),
      }),
    };
  },
});

export const { useFetchItemsQuery, useSignUpMutation, useSignInMutation } = apiSlice;
