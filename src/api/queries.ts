import axios from 'axios';
import { UserCredentials } from '../store/slices/userSlice';

const baseUrl = process.env.REACT_APP_API_URL;
const baseHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
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
  const body = {
    page,
  };
  const headers = {
    ...baseHeaders.headers,
    client,
    uid,
    'access-token': accessToken,
  };
  const params = {
    body,
    headers,
  };

  const response = await axios.get(`${baseUrl}/products`, params);
  return response;
};
