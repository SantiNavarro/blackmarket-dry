/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';

export const handlers = [
  // Handles a POST login request
  rest.post('http://blackmarket-api.herokuapp.com/api/v1/auth/sign_in', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'Santi',
        email: 'santiago.navarro@rootstrap.com',
      })
    );
  }),
];
