import axios from 'axios';

export const signInRequest = async (email: string, password: string) => {
  const response = await axios.post(
    `http://blackmarket-api.herokuapp.com/api/v1/auth/sign_in?password=${password}&email=${email}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
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
  const response = await axios.post('http://blackmarket-api.herokuapp.com/api/v1/auth', body);
  return response;
};
