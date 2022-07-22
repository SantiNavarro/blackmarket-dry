import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const signInRequest = async (email: string, password: string) => {
  const body = {
    user: {
      email,
      password,
    },
  };
  const response = await axios.post(`${baseUrl}/auth/sign_in`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
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
  const response = await axios.post(`${baseUrl}/auth`, body);
  return response;
};
