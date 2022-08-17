import axios from 'axios';
import { UserCredentials } from '../store/slices/userSlice';

const baseUrl = process.env.REACT_APP_API_URL;
const baseHeaders = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  data: {},
};
export const signInRequest = async (email: string, password: string) => {
  const body = {
    user: {
      email,
      password,
    },
  };
  const response = await axios.post(`${baseUrl}/auth/sign_in`, body, baseHeaders);
  return response;
};

export const signUpRequest = async (email: string, password: string, name: string) => {
  const body = {
    user: {
      email,
      password,
      name,
    },
  };
  const response = await axios.post(`${baseUrl}/auth`, body, baseHeaders);
  return response;
};

export const getListOfProducts = async (userCredentials: UserCredentials, page = 1) => {
  const { uid, client, accessToken } = userCredentials;

  const headers = {
    ...baseHeaders.headers,
    client,
    uid,
    'access-token': accessToken,
  };
  const params = {
    headers,
    data: {
      page,
    },
  };

  const response = await axios.get(`${baseUrl}/products`, params);
  return response;
};

export const searchProducts = async (userCredentials: UserCredentials, text: string) => {
  const { uid, client, accessToken } = userCredentials;

  const headers = {
    ...baseHeaders.headers,
    client,
    uid,
    'access-token': accessToken,
  };
  const params = {
    headers,
    data: {
      text,
    },
    text,
    body: {
      text,
    },
  };

  const response = await axios.get(`${baseUrl}/search_products`, params);

  return response;
};
