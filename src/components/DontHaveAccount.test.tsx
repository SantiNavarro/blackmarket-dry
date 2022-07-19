import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import DontHaveAccount from './DontHaveAccount';

test('renders Dont have an account? paragraph', () => {
  render(
    <BrowserRouter>
      <DontHaveAccount />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Dont have an account?/i);
  expect(linkElement).toBeInTheDocument(); 
});
